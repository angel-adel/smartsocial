// admin/js/kb.js

async function loadKB() {
    const kbList = document.getElementById('kbList');
    if (!kbList) return;
    
    kbList.innerHTML = 'Загрузка...';
    try {
        const kbData = await fetchKnowledgeBase();
        
        if (kbData.length === 0) {
            kbList.innerHTML = '<p style="color:#888">База знаний пуста.</p>';
            return;
        }

        kbList.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Ключевые слова</th>
                        <th>Ответ</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    ${kbData.map(k => `
                        <tr>
                            <td>${escapeHtml(k.keywords ? k.keywords.join(', ') : '')}</td>
                            <td>${escapeHtml(k.answer || '')}</td>
                            <td>
                                <button class="btn btn-del" onclick="deleteKB('${k.id}')">🗑 Удалить</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } catch (e) {
        kbList.innerHTML = `<p style="color:#ff6b6b">Ошибка: ${e.message}</p>`;
    }
}

// Удаление записи из БЗ
async function deleteKB(id) {
    if (!confirm('Удалить этот ответ из базы знаний?')) return;
    try {
        const { error } = await window.supabaseClient
            .from('knowledge_base')
            .delete()
            .eq('id', id);
        if (error) throw error;
        
        await loadKB(); // Обновляем список
        toast('Удалено из базы знаний');
    } catch (e) {
        toast('Ошибка удаления: ' + e.message, true);
    }
}
