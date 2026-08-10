document.addEventListener('DOMContentLoaded', () => {
    // ===== КЛЮЧИ ИЗ CONFIG.JS =====
    if (typeof SUPABASE_URL === 'undefined' || typeof SUPABASE_ANON_KEY === 'undefined') {
        console.error('КРИТИЧЕСКАЯ ОШИБКА: config.js не загружен или не содержит ключи!');
        return;
    }

    // ===== DOM-ЭЛЕМЕНТЫ =====
    const form = document.getElementById('auth-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const submitBtn = document.getElementById('submit-btn');
    const genderRadios = document.querySelectorAll('input[name="gender"]');

    // ===== КОНСОЛЬ =====
    const consoleBox = document.getElementById('console');
    const consoleOutput = document.getElementById('console-output');

    function log(message, type = 'info') {
        if (!consoleBox || !consoleOutput) return;
        consoleBox.classList.remove('hidden');
        const time = new Date().toLocaleTimeString('ru-RU', { hour12: false });
        const prefix = type === 'error' ? '❌ ERROR:' : '>';
        const color = type === 'error' ? '#ff4d4d' : '#ffd700';
        const line = document.createElement('div');
        line.style.color = color;
        line.textContent = `[${time}] ${prefix} ${message}`;
        consoleOutput.appendChild(line);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }

    // ===== ПРОВЕРКА ЗАГРУЗКИ SUPABASE =====
    if (typeof window.supabase === 'undefined') {
        log('КРИТИЧЕСКАЯ ОШИБКА: Библиотека Supabase не загружена! Проверь интернет.', 'error');
        return;
    }

    // Инициализация клиента с ключами из глобальной области (из config.js)
    const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // ===== ОБРАБОТКА ФОРМЫ =====
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = usernameInput.value.trim();
            const password = passwordInput.value;
            let gender = 'male';
            genderRadios.forEach(el => {
                if (el.checked) gender = el.value;            });

            if (!username || password.length < 4) {
                log('Имя не может быть пустым, пароль минимум 4 символа.', 'error');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = 'Обработка...';
            consoleOutput.innerHTML = '';

            log('🔒 Инициализация протокола безопасности...');

            try {
                const safeUsername = username.toLowerCase().replace(/[^a-z0-9_]/g, '');
                const fakeEmail = `${safeUsername}@smartsocial.local`;

                log(`🔍 Генерация системного ID для [${username}]...`);
                await new Promise(r => setTimeout(r, 300));

                log('📡 Поиск пользователя в защищённой базе...');
                let { data, error } = await supabaseClient.auth.signInWithPassword({
                    email: fakeEmail,
                    password: password
                });

                if (error) {
                    if (error.message.includes('Invalid login credentials')) {
                        log('👤 Пользователь не найден. Инициирую протокол регистрации...', 'info');
                        await new Promise(r => setTimeout(r, 400));

                        log('🔐 Генерация bcrypt-хеша пароля...');
                        const { data: signUpData, error: signUpError } = await supabaseClient.auth.signUp({
                            email: fakeEmail,
                            password: password,
                            options: {
                                data: {
                                    username: username,
                                    gender: gender
                                }
                            }
                        });

                        if (signUpError) throw signUpError;

                        log('✅ Аккаунт создан! Триггер синхронизировал профиль.', 'success');

                        if (!signUpData.session) {
                            log('❌ Ошибка сессии. Проверьте настройки Email Confirmation в Supabase.', 'error');
                            submitBtn.disabled = false;                            submitBtn.textContent = 'Войти / Зарегистрироваться';
                            return;
                        } else {
                            log('🚀 Успешная авторизация. Перенаправление...', 'success');
                            await new Promise(r => setTimeout(r, 800));
                            window.location.href = 'feed.html';
                        }
                    } else {
                        throw error;
                    }
                } else {
                    log('✅ Хеш пароля совпал. Сессия активна.', 'success');
                    log('🚀 Успешный вход. Перенаправление...', 'success');
                    await new Promise(r => setTimeout(r, 800));
                    window.location.href = 'feed.html';
                }
            } catch (err) {
                const errorMsg = err.message || err.error_description || err.msg || String(err);
                log('❌ Подробности: ' + errorMsg, 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Войти / Зарегистрироваться';
            }
        });
    }
});