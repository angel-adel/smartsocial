
// admin/js/auth.js

async function doLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const errEl = document.getElementById('loginError');
    
    errEl.textContent = '';
    
    if (!email || !password) {
        errEl.textContent = 'Введите email и пароль';
        return;
    }

    try {
        // Используем официальный метод Supabase для входа
        const { data, error } = await window.supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) throw error;

        // Если вход успешен, показываем админку
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminApp').classList.add('active');
        
        // Запускаем загрузку данных
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

// Проверка, вошел ли пользователь (при перезагрузке страницы)
window.supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session) {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminApp').classList.add('active');
    } else if (event === 'SIGNED_OUT') {
        document.getElementById('adminApp').classList.remove('active');
        document.getElementById('loginScreen').style.display = 'flex';
    }
});
