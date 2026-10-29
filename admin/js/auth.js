// admin/js/auth.js

async function doLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const errEl = document.getElementById('loginError');
    
    errEl.textContent = 'Проверка...';
    errEl.style.color = '#888';

    if (!email || !password) {
        errEl.textContent = 'Введите email и пароль';
        errEl.style.color = '#ff6b6b';
        return;
    }

    try {
        const { data: authData, error: authError } = await window.supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (authError) throw authError;

        const { data: adminData, error: adminError } = await window.supabaseClient
            .from('admin_users')
            .select('user_id')
            .eq('user_id', authData.user.id)
            .maybeSingle();

        if (!adminData || adminError) {
            await window.supabaseClient.auth.signOut();
            throw new Error('Доступ запрещен. Вы не являетесь администратором.');
        }

        errEl.textContent = '';
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminApp').classList.add('active');
        
        if (typeof initApp === 'function') initApp();

    } catch (e) {
        errEl.textContent = 'Ошибка: ' + (e.message || 'Неверный логин или пароль');
        errEl.style.color = '#ff6b6b';
    }
}

// Вот она, наша функция выхода
async function doLogout() {
    try {
        await window.supabaseClient.auth.signOut();
        localStorage.clear();
        sessionStorage.clear();
    } catch (e) {
        console.error('Ошибка выхода:', e);
    } finally {
        // Перезагружаем страницу в любом случае
        window.location.reload(); 
    }
}

// Проверка сессии при загрузке страницы
window.supabaseClient.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session) {
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
