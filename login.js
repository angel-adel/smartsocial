document.addEventListener('DOMContentLoaded', () => {
    // ===== КЛЮЧИ ИЗ CONFIG.JS =====
    if (typeof SUPABASE_URL === 'undefined' || typeof SUPABASE_ANON_KEY === 'undefined') {
        console.error('КРИТИЧЕСКАЯ ОШИБКА: config.js не загружен!');
        return;
    }

    const form = document.getElementById('auth-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const submitBtn = document.getElementById('submit-btn');
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    const consoleBox = document.getElementById('console');
    const consoleOutput = document.getElementById('console-output');

    function log(message, type = 'info') {
        if (!consoleBox || !consoleOutput) return;
        consoleBox.classList.remove('hidden');
        const time = new Date().toLocaleTimeString('ru-RU', { hour12: false });
        const color = type === 'error' ? '#ff4d4d' : '#ffd700';
        const line = document.createElement('div');
        line.style.color = color;
        line.textContent = `[${time}] ${message}`;
        consoleOutput.appendChild(line);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }

    if (typeof window.supabase === 'undefined') {
        log('❌ Supabase не загружен!', 'error');
        return;
    }

    const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    if (!form) {
        console.error('Форма #auth-form не найдена в DOM!');
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        let gender = 'male';
        genderRadios.forEach(el => { if (el.checked) gender = el.value; });

        if (!username || password.length < 4) {
            log('❌ Имя пустое или пароль < 4 символов', 'error');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Обработка...';
        consoleOutput.innerHTML = '';
        log('🔒 Инициализация...');

        try {
            const fakeEmail = `${username.toLowerCase()}@smartsocial.local`;
            
            let { error } = await supabaseClient.auth.signInWithPassword({ email: fakeEmail, password });

            if (error && error.message.includes('Invalid login credentials')) {
                log('👤 Регистрация нового пользователя...');
                const { data: signUpData, error: signUpError } = await supabaseClient.auth.signUp({
                    email: fakeEmail,
                    password,
                    options: { data: { username, gender } }
                });

                if (signUpError) throw signUpError;

                // ЗАПИСЬ В ТАБЛИЦУ USERS
                if (signUpData.user) {
                    const { error: dbErr } = await supabaseClient.from('users').insert([{
                        id: signUpData.user.id,
                        username,
                        gender
                    }]);
                    if (dbErr) log('⚠️ Ошибка записи в БД: ' + dbErr.message, 'error');
                    else log('✅ Профиль сохранён в БД!', 'success');
                }

                if (!signUpData.session) {
                    log('❌ Нет сессии (проверь Email Confirmation в Supabase)', 'error');
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Войти / Зарегистрироваться';
                    return;
                }
                
                log('🚀 Успех! Редирект...', 'success');
                setTimeout(() => window.location.href = 'feed.html', 800);

            } else if (error) {
                throw error;
            } else {
                log('✅ Вход выполнен. Редирект...', 'success');
                setTimeout(() => window.location.href = 'feed.html', 800);
            }
        } catch (err) {
            log('❌ ' + (err.message || String(err)), 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Войти / Зарегистрироваться';
        }
    });
});
