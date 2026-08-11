document.addEventListener('DOMContentLoaded', () => {
    console.log('[SmartSocial] login.js загружен');

    // ===== КЛЮЧИ ИЗ CONFIG.JS =====
    if (typeof SUPABASE_URL === 'undefined' || typeof SUPABASE_ANON_KEY === 'undefined') {
        console.error('❌ КРИТИЧЕСКАЯ ОШИБКА: config.js не загружен или ключи отсутствуют!');
        alert('Ошибка: config.js не найден. Проверь подключение.');
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
        console.log(`[LOG ${type}] ${message}`); // Дублируем в браузерную консоль
        if (!consoleBox || !consoleOutput) {
            console.warn('Консоль не найдена в DOM');
            return;
        }
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
        log('❌ Supabase SDK не загружен!', 'error');
        return;
    }

    const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    log('✅ Supabase клиент инициализирован');

    if (!form) {
        log('❌ Форма #auth-form не найдена!', 'error');
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        log('🚀 Форма отправлена, начинаем обработку...');
        
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
        if (consoleOutput) consoleOutput.innerHTML = '';

        try {
            const fakeEmail = `${username.toLowerCase()}@smartsocial.local`;
            log(`🔍 Поиск ${fakeEmail}...`);
            
            let { error } = await supabaseClient.auth.signInWithPassword({ email: fakeEmail, password });

            if (error && error.message.includes('Invalid login credentials')) {
                log('👤 Пользователь не найден. Регистрация...', 'info');
                
                const { data: signUpData, error: signUpError } = await supabaseClient.auth.signUp({
                    email: fakeEmail,
                    password,
                    options: { data: { username, gender } }
                });

                if (signUpError) throw signUpError;

                // === ЗАПИСЬ В ТАБЛИЦУ USERS ===
                if (signUpData.user) {
                    log('💾 Запись в таблицу users...', 'info');
                    const { error: dbErr } = await supabaseClient.from('users').insert([{
                        id: signUpData.user.id,
                        username,
                        gender
                    }]);
                    
                    if (dbErr) {
                        log('⚠️ Ошибка RLS/БД: ' + dbErr.message, 'error');
                    } else {
                        log('✅ Профиль сохранён в БД!', 'success');
                    }
                }

                if (!signUpData.session) {
                    log('❌ Нет сессии! Проверь Email Confirmation в Supabase.', 'error');
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Войти / Зарегистрироваться';
                    return;
                }
                
                log('🎉 Успех! Редирект на feed.html...', 'success');
                setTimeout(() => window.location.href = 'feed.html', 1000);

            } else if (error) {
                throw error;
            } else {
                log('✅ Вход выполнен. Редирект...', 'success');
                setTimeout(() => window.location.href = 'feed.html', 1000);
            }
        } catch (err) {
            log('❌ Ошибка: ' + (err.message || String(err)), 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Войти / Зарегистрироваться';
        }
    });
});
