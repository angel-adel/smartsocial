
// admin/js/config.js
// Вставь сюда свои данные из Supabase (Project Settings -> API)
const SUPABASE_URL = 'https://твой-проект.supabase.co';
const SUPABASE_ANON_KEY = '';

// Создаем глобальный клиент
// (Он будет доступен во всех остальных модулях)
window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
