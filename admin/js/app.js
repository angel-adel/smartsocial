// admin/js/app.js

// Инициализация приложения после входа
function initApp() {
    console.log('Админка запущена');
    // Здесь мы будем вызывать загрузку тикетов и БЗ
    if (typeof loadTickets === 'function') loadTickets();
    if (typeof loadKB === 'function') loadKB();
}

// Переключение вкладок (Тикеты / База Знаний)
function switchTab(tabName, btn) {
    // Скрываем все секции
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    // Убираем активность со всех вкладок
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    
    // Показываем нужную секцию
    document.getElementById(`section-${tabName}`).classList.add('active');
    btn.classList.add('active');
}

// Проверяем сессию при загрузке страницы
document.addEventListener('DOMContentLoaded', async () => {
    const { data: { session } } = await window.supabaseClient.auth.getSession();
    if (session) {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminApp').classList.add('active');
        initApp();
    }
});
