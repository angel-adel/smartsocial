
// admin/js/config.js
// Вставь сюда свои данные из Supabase (Project Settings -> API)
const SUPABASE_URL = 'https://wgewycchecbsulyvqfzj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnZXd5Y2NoZWNic3VseXZxZnpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4NTg1NTYsImV4cCI6MjEwMTQzNDU1Nn0.y80cZy7KiLWKJ1Grh2lkjUdtCGsBos6uC6cNJmRiCTs';

// Создаем глобальный клиент
// (Он будет доступен во всех остальных модулях)
window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
