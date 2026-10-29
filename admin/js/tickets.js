// admin/js/tickets.js

let allTickets = [];
let currentFilter = 'all';
let currentTicketId = null;

// Загрузка тикетов
async function loadTickets() {
    const tbody = document.getElementById('ticketsBody');
    if (!tbody) return;
    
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:15px;color:#888">Загрузка...</td></tr>';
    
    try {
        allTickets = await fetchTickets();
        renderTickets();
        updateStats();
    } catch (e) {
        console.error('Ошибка loadTickets:', e);
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:15px;color:#ff6b6b">Ошибка загрузки: ${e.message}</td></tr>`;
    }
}

// Отрисовка таблицы
function renderTickets() {
    const tbody = document.getElementById('ticketsBody');
    const search = document.getElementById('searchInput').value.toLowerCase();
    
    let filtered = allTickets;
    if (currentFilter !== 'all') {
        filtered = filtered.filter(t => t.status === currentFilter);
    }
    if (search) {
        filtered = filtered.filter(t => 
            (t.user_question || '').toLowerCase().includes(search) || 
            (t.user_email || '').toLowerCase().includes(search)
        );
    }

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:15px;color:#888">Тикетов не найдено</td></tr>';
        return;
    }

    tbody.innerHTML = filtered.map(t => {
        const date = formatDate(t.created_at);
        const shortQ = (t.user_question || '').substring(0, 40) + ((t.user_question || '').length > 40 ? '...' : '');
        
        const badgeClass = t.status === 'new' ? 'badge-new' : t.status === 'answered' ? 'badge-answered' : 'badge-closed';
        const statusText = t.status === 'new' ? 'Новый' : t.status === 'answered' ? 'Отвечен' : 'Закрыт';
        
        let actions = '';
        if (t.status === 'new') {
            actions += `<button class="btn btn-reply" onclick="openReply('${t.id}')">✉️ Ответить</button>`;
        } else if (t.status === 'answered') {
            actions += `<button class="btn btn-close" onclick="closeTicket('${t.id}')">Закрыть</button>`;
        } else {
            actions += `<button class="btn btn-reply" onclick="reopenTicket('${t.id}')">Открыть</button>`;
        }
        actions += `<button class="btn btn-del" onclick="deleteTicket('${t.id}')">🗑</button>`;

        return `
            <tr>
                <td>#${(t.id || '').substring(0, 5)}</td>
                <td>${date}</td>
                <td title="${escapeHtml(t.user_question)}">${escapeHtml(shortQ)}</td>
                <td>${escapeHtml(t.user_email || '-')}</td>
                <td><span class="badge ${badgeClass}">${statusText}</span></td>
                <td>${actions}</td>
            </tr>
        `;
    }).join('');
}

// Фильтры
function setFilter(f, btn) {
    currentFilter = f;
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTickets();
}

// Статистика
function updateStats() {
    document.getElementById('statNew').textContent = allTickets.filter(t => t.status === 'new').length;
    document.getElementById('statAnswered').textContent = allTickets.filter(t => t.status === 'answered').length;
    document.getElementById('statClosed').textContent = allTickets.filter(t => t.status === 'closed').length;
    document.getElementById('statTotal').textContent = allTickets.length;
}

// Модалка ответа
function openReply(id) {
    const ticket = allTickets.find(t => t.id === id);
    if (!ticket) return;
    
    currentTicketId = id;
    document.getElementById('modalQuestion').textContent = ticket.user_question;
    document.getElementById('modalAnswer').value = '';
    document.getElementById('addToKB').checked = true;
    document.getElementById('replyModal').classList.add('active');
}

function closeModal() {
    document.getElementById('replyModal').classList.remove('active');
    currentTicketId = null;
}

// Отправка ответа
async function sendReply() {
    const answer = document.getElementById('modalAnswer').value.trim();
    const toKB = document.getElementById('addToKB').checked;
    
    if (!answer) {
        toast('Введите ответ', true);
        return;
    }

    const ticket = allTickets.find(t => t.id === currentTicketId);
    if (!ticket) return;

    try {
        console.log('Отправка ответа для тикета:', currentTicketId);
        
        await updateTicketStatus(currentTicketId, { 
            admin_answer: answer, 
            status: 'answered', 
            answered_at: new Date().toISOString() 
        });

        if (toKB) {
            const stopWords = ['как', 'что', 'где', 'когда', 'почему', 'зачем', 'можно', 'ли', 'нужно', 'и', 'в', 'на', 'с', 'по'];
            const keywords = ticket.user_question.toLowerCase().replace(/[?!.,]/g, '').split(/\s+/).filter(w => w.length > 2 && !stopWords.includes(w));
            await addKBEntry(keywords, answer);
        }

        let mailSent = false;
        if (ticket.user_email && !ticket.user_email.endsWith('@smartsocial.app') && !ticket.user_email.endsWith('@smartsocial.local')) {
            try {
                console.log('Попытка отправки письма на:', ticket.user_email);
                const { data, error } = await window.supabaseClient.functions.invoke('send-email', {
                    body: {
                        to: ticket.user_email,
                        subject: 'Ответ поддержки SmartSocial',
                        body: answer
                    }
                });
                if (error) throw error;
                mailSent = true;
                console.log('Письмо отправлено успешно:', data);
            } catch (e) {
                console.warn('Ошибка отправки письма:', e);
            }
        }

        closeModal();
        await loadTickets();
        toast('Ответ сохранен' + (mailSent ? ' + письмо отправлено' : ''));
        
    } catch (e) {
        console.error('Ошибка sendReply:', e);
        toast('Ошибка: ' + e.message, true);
    }
}

// Закрытие тикета
async function closeTicket(id) {
    console.log('Нажата кнопка Закрыть для:', id);
    if (!confirm('Закрыть тикет?')) return;
    try {
        await updateTicketStatus(id, { status: 'closed', closed_at: new Date().toISOString() });
        await loadTickets();
        toast('Тикет закрыт');
    } catch (e) { 
        console.error('Ошибка closeTicket:', e);
        toast('Ошибка: ' + e.message, true); 
    }
}

// Открытие тикета заново
async function reopenTicket(id) {
    console.log('Нажата кнопка Открыть для:', id);
    try {
        await updateTicketStatus(id, { status: 'new', closed_at: null, answered_at: null });
        await loadTickets();
        toast('Тикет открыт заново');
    } catch (e) { 
        console.error('Ошибка reopenTicket:', e);
        toast('Ошибка: ' + e.message, true); 
    }
}

// Удаление тикета
async function deleteTicket(id) {
    console.log('Нажата кнопка Удалить для:', id);
    if (!confirm('Удалить тикет навсегда?')) return;
    try {
        await deleteTicketById(id);
        await loadTickets();
        toast('Тикет удален');
    } catch (e) { 
        console.error('Ошибка deleteTicket:', e);
        toast('Ошибка: ' + e.message, true); 
    }
}
