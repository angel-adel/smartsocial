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
        // 1. Вход в Auth
        const { data: authData, error: authError } = await window.supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (authError) throw authError;

        // 2. ЖЕСТКАЯ ПРОВЕРКА: делаем запрос к admin_users
        // Используем maybeSingle(), чтобы не было ошибки, если юзера нет
        const { data: adminData, error: adminError } = await window.supabaseClient
            .from('admin_users')
            .select('user_id')
            .eq('user_id', authData.user.id)
            .maybeSingle();

        console.log('Результат проверки на админа:', adminData, adminError);

        // 3. Если данных нет (или есть ошибка), значит это НЕ АДМИН
        if (!adminData || adminError) {
            await window.supabaseClient.auth.signOut(); // Принудительный выход
            throw new Error('Доступ запрещен. Вы не являетесь администратором.');
        }

        // 4. Если всё ок — пускаем
        errEl.textContent = '';
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminApp').classList.add('active');
        
        if (typeof initApp === 'function') initApp();

    } catch (e) {
        errEl.textContent = 'Ошибка: ' + (e.message || 'Неверный логин или пароль');
        errEl.style.color = '#ff6b6b';
    }
}
