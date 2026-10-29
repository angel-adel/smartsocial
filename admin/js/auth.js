// admin/js/auth.js

async function doLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const errEl = document.getElementById('loginError');
    
    errEl.textContent = 'Проверка...';
    
    if (!email || !password) {
        errEl.textContent = 'Введите email и пароль';
        return;
    }

    try {
        // 1. Пытаемся войти через Supabase Auth
        const { data: authData, error: authError } = await window.supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (authError) throw authError;

        // 2. СРАЗУ ПРОВЕРЯЕМ, ЕСТЬ ЛИ ОН В ТАБЛИЦЕ АДМИНОВ
        const { data: adminData, error: adminError } = await window.supabaseClient
            .from('admin_users')
            .select('user_id')
            .eq('user_id', authData.user.id)
            .maybeSingle(); // maybeSingle не выдает ошибку, если ничего не найдено

        // Если данных нет — значит это не админ. Выкидываем!
        if (!adminData) {
            await window.supabaseClient.auth.signOut(); // Стираем сессию
            throw new Error('Доступ запрещен. Вы не являетесь администратором.');
        }

        // 3. Если всё ок — пускаем
        errEl.textContent = '';
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminApp').classList.add('active');
        
        if (typeof initApp === 'function') initApp();

    } catch (e) {
        errEl.textContent = 'Ошибка: ' + (e.message || 'Неверный логин или пароль');
    }
}

async function doLogout() {
    await window.supabaseClient.auth.signOut();
    document.getElementById('adminApp').classList.remove('active');
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('loginPassword').value = '';
}

// Проверка сессии при загрузке страницы
window.supabaseClient.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session) {
        // Проверяем, админ ли он, прежде чем показывать интерфейс
        const { data: adminData } = await window.supabaseClient
            .from('admin_users')
            .select('user_id')
            .eq('user_id', session.user.id)
            .maybeSingle();

        if (adminData) {
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('adminApp').classList.add('active');
            if (typeof initApp === 'function') initApp();
        } else {
            await window.supabaseClient.auth.signOut();
        }
    } else if (event === 'SIGNED_OUT') {
        document.getElementById('adminApp').classList.remove('active');
        document.getElementById('loginScreen').style.display = 'flex';
    }
});
