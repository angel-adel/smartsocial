
// admin/js/api.js

// Получить все тикеты
async function fetchTickets() {
    const { data, error } = await window.supabaseClient
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
}

// Обновить тикет (например, при ответе или закрытии)
async function updateTicketStatus(id, updates) {
    const { error } = await window.supabaseClient
        .from('tickets')
        .update(updates)
        .eq('id', id);
    if (error) throw error;
}

// Удалить тикет
async function deleteTicketById(id) {
    const { error } = await window.supabaseClient
        .from('tickets')
        .delete()
        .eq('id', id);
    if (error) throw error;
}

// Получить базу знаний
async function fetchKnowledgeBase() {
    const { data, error } = await window.supabaseClient
        .from('knowledge_base')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
}

// Добавить запись в БЗ
async function addKBEntry(keywords, answer) {
    const { error } = await window.supabaseClient
        .from('knowledge_base')
        .insert([{ keywords: keywords, answer: answer, is_active: true }]);
    if (error) throw error;
}
