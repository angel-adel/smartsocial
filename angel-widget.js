// ============================================================
//  👼 АНГЕЛ-ХРАНИТЕЛЬ SMART SOCIAL
//  Версия: 10.0 (БОЕВАЯ — Supabase + Тикеты + Живая БЗ)
// ============================================================

(function() {
    'use strict';

    // === НАСТРОЙКИ SUPABASE (вставь свои!) ===
    const SUPABASE_URL = 'https://wgewycchecbsulyvqfzj.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnZXd5Y2NoZWNic3VseXZxZnpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4NTg1NTYsImV4cCI6MjEwMTQzNDU1Nn0.y80cZy7KiLWKJ1Grh2lkjUdtCGsBos6uC6cNJmRiCTs';
    const CACHE_DURATION = 0; // 1 час кэша

    // === СТИЛИ ===
    const styles = `
        @keyframes angelBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes angelFadeIn { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }
        .angel-widget { position:fixed; bottom:20px; right:20px; z-index:999999; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; }
        .angel-bubble { width:60px; height:60px; border-radius:50%; background:linear-gradient(135deg,#667eea 0%,#764ba2 100%); display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 4px 15px rgba(102,126,234,0.4); font-size:30px; color:#fff; transition:all 0.3s; }
        .angel-bubble:hover { transform:scale(1.1); box-shadow:0 6px 20px rgba(102,126,234,0.6); }
        .angel-window { position:absolute; bottom:75px; right:0; width:350px; max-width:calc(100vw - 40px); background:#fff; border:1px solid #e0e0e0; border-radius:16px; padding:16px; box-shadow:0 10px 40px rgba(0,0,0,0.15); display:none; animation:angelFadeIn 0.3s ease; color:#333; }
        .angel-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; padding-bottom:8px; border-bottom:1px solid #eee; }
        .angel-header strong { font-size:16px; color:#333; }
        .angel-close { cursor:pointer; font-size:20px; color:#999; background:none; border:none; }
        .angel-search { width:100%; padding:10px 12px; border:1px solid #ddd; border-radius:8px; background:#f9f9f9; color:#333; font-size:14px; outline:none; box-sizing:border-box; margin-bottom:12px; }
        .angel-search:focus { border-color:#667eea; }
        .angel-results { max-height:280px; overflow-y:auto; font-size:14px; line-height:1.5; }
        .angel-answer { background:#f0f4ff; padding:12px; border-radius:8px; border-left:4px solid #667eea; animation:angelFadeIn 0.3s; }
        .angel-waiting { background:#fff8e1; padding:12px; border-radius:8px; border-left:4px solid #ffc107; animation:angelFadeIn 0.3s; }
        .angel-error { background:#ffebee; padding:12px; border-radius:8px; border-left:4px solid #f44336; }
        .angel-success { background:#e8f5e9; padding:12px; border-radius:8px; border-left:4px solid #4caf50; }
        .angel-quick-btns { display:flex; flex-wrap:wrap; gap:6px; margin-top:12px; padding-top:12px; border-top:1px solid #eee; }
        .angel-quick-btn { background:#f0f2f5; border:1px solid #e1e4e8; padding:6px 12px; border-radius:20px; font-size:12px; cursor:pointer; color:#444; transition:all 0.2s; }
        .angel-quick-btn:hover { background:#667eea; color:#fff; border-color:#667eea; }
        .angel-ticket-form { margin-top:10px; }
        .angel-ticket-input { width:100%; padding:8px; border:1px solid #ddd; border-radius:6px; font-size:13px; margin-bottom:8px; box-sizing:border-box; }
        .angel-ticket-btn { background:#667eea; color:#fff; border:none; padding:8px 16px; border-radius:20px; cursor:pointer; font-size:13px; }
        .angel-ticket-btn:hover { background:#5568d3; }
        @media(max-width:480px) { .angel-window { width:calc(100vw - 40px); right:-10px; } }
    `;

    // === HTML ВИДЖЕТА ===
    const html = `
        <div class="angel-widget" id="angelWidget">
            <div class="angel-window" id="angelWindow">
                <div class="angel-header">
                    <strong>👼 Ангел-Хранитель</strong>
                    <button class="angel-close" onclick="angelClose()">✕</button>
                </div>
                <input type="text" class="angel-search" id="angelSearch" placeholder="Спроси о Smart Social..." onkeypress="if(event.key==='Enter')angelAsk(this.value)">
                <div class="angel-results" id="angelResults">
                    <div style="color:#888; text-align:center; padding:15px;">Привет! Я знаю всё о Smart Social. 💫<br>Задай мне вопрос!</div>
                </div>
                <div class="angel-quick-btns">
                    <button class="angel-quick-btn" onclick="angelQuick('кто создатель')">👤 Создатель</button>
                    <button class="angel-quick-btn" onclick="angelQuick('лимит постов')">📊 Лимит</button>
                    <button class="angel-quick-btn" onclick="angelQuick('где сайт')">🔗 Ссылки</button>
                    <button class="angel-quick-btn" onclick="angelQuick('забыл пароль')">🔐 Пароль</button>
                </div>
            </div>
            <div class="angel-bubble" id="angelBubble" onclick="angelToggle()">👼</div>
        </div>
    `;
    // === СОСТОЯНИЕ И КЭШИРОВАНИЕ ===
    let knowledgeBase = [];
    let isKBLoaded = false;

    // Загрузка базы знаний из Supabase с кэшем
    async function loadKnowledgeBase() {
        const cacheKey = 'angel_kb_cache';
        const cacheTimeKey = 'angel_kb_cache_time';
        const cachedData = localStorage.getItem(cacheKey);
        const cachedTime = localStorage.getItem(cacheTimeKey);

        // Если кэш есть и ему меньше часа — используем его (мгновенно!)
        if (cachedData && cachedTime && (Date.now() - parseInt(cachedTime)) < CACHE_DURATION) {
            knowledgeBase = JSON.parse(cachedData);
            isKBLoaded = true;
            return;
        }

        // Иначе тянем свежую базу из Supabase
        try {
            const res = await fetch(`${SUPABASE_URL}/rest/v1/knowledge_base?is_active=eq.true&select=*`, {
                headers: { 'apikey': SUPABASE_ANON_KEY }
            });
            if (res.ok) {
                knowledgeBase = await res.json();
                // Сохраняем в кэш
                localStorage.setItem(cacheKey, JSON.stringify(knowledgeBase));
                localStorage.setItem(cacheTimeKey, Date.now().toString());
            }
        } catch (e) {
            console.error('Ошибка загрузки БЗ:', e);
            if (cachedData) knowledgeBase = JSON.parse(cachedData); // fallback на старый кэш
        }
        isKBLoaded = true;
    }

    // === УМНЫЙ ПОИСК ПО БАЗЕ ЗНАНИЙ ===
    function searchKnowledge(query) {
        const lowerQuery = query.toLowerCase().trim();
        if (!lowerQuery) return null;

        let bestMatch = null;
        let maxMatches = 0;

        for (let i = 0; i < knowledgeBase.length; i++) {
            const item = knowledgeBase[i];
            let matchCount = 0;
            // Проверяем ключевые слова (они приходят массивом из Supabase)
            if (item.keywords && Array.isArray(item.keywords)) {
                for (let j = 0; j < item.keywords.length; j++) {
                    if (lowerQuery.includes(item.keywords[j].toLowerCase())) {
                        matchCount++;
                    }
                }
            }
            if (matchCount > maxMatches) {
                maxMatches = matchCount;
                bestMatch = item.answer;
            }
        }
        return maxMatches > 0 ? bestMatch : null;
            }
   // === UI И ОБРАБОТКА ВОПРОСОВ ===
    window.angelToggle = function() {
        const win = document.getElementById('angelWindow');
        const bubble = document.getElementById('angelBubble');
        if (win.style.display === 'block') {
            win.style.display = 'none';
            bubble.style.display = 'flex';
        } else {
            win.style.display = 'block';
            bubble.style.display = 'none';
            document.getElementById('angelSearch').focus();
        }
    };

    window.angelClose = function() {
        document.getElementById('angelWindow').style.display = 'none';
        document.getElementById('angelBubble').style.display = 'flex';
    };

    window.angelQuick = function(q) {
        document.getElementById('angelSearch').value = q;
        angelAsk(q);
    };

    window.angelAsk = async function(question) {
        if (!question.trim()) return;
        const resDiv = document.getElementById('angelResults');
        resDiv.innerHTML = '<div style="text-align:center;padding:15px;"><div style="font-size:20px;animation:angelBounce 1s infinite">👼</div><div style="margin-top:8px;color:#666;font-size:13px">Ищу ответ...</div></div>';

        // Ждем загрузку БЗ, если еще не готова
        if (!isKBLoaded) await loadKnowledgeBase();

        const answer = searchKnowledge(question);

        setTimeout(() => {
            if (answer) {
                resDiv.innerHTML = `<div class="angel-answer">${answer}</div>`;
            } else {
                resDiv.innerHTML = `
                    <div class="angel-waiting">
                        🤔 Я пока не знаю ответа. Передать вопрос создателю?
                        <div class="angel-ticket-form">
                            <input type="email" class="angel-ticket-input" id="ticketEmail" placeholder="Ваша почта (необязательно)">
                            <button class="angel-ticket-btn" onclick="angelCreateTicket('${question.replace(/'/g, "\\'")}')">Отправить</button>
                        </div>
                    </div>`;
            }
        }, 300);
    };

    window.angelCreateTicket = async function(question) {
        const email = document.getElementById('ticketEmail').value.trim();
        const resDiv = document.getElementById('angelResults');
        resDiv.innerHTML = '<div style="text-align:center;padding:15px;color:#666">Отправляю...</div>';

        try {
            const res = await fetch(`${SUPABASE_URL}/rest/v1/angel_tickets`, {
                method: 'POST',
                headers: { 'apikey': SUPABASE_ANON_KEY, 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_question: question, user_email: email || null, status: 'new' })
            });
            if (res.ok) {
                resDiv.innerHTML = '<div class="angel-success">✅ Вопрос отправлен! Создатель ответит в ближайшее время.</div>';
            } else {
                throw new Error('Ошибка сети');
            }
        } catch (e) {
            resDiv.innerHTML = '<div class="angel-error">❌ Не удалось отправить. Напишите на smartsocials@mail.ru</div>';
        }
    };

    // === ИНИЦИАЛИЗАЦИЯ ===
    function init() {
        const style = document.createElement('style');
        style.textContent = styles;
        document.head.appendChild(style);
        document.body.insertAdjacentHTML('beforeend', html);
        loadKnowledgeBase(); // Загружаем БЗ в фоне
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})(); 
