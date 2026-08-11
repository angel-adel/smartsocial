document.addEventListener('DOMContentLoaded', () => {
    // ===== 1. ПРОВЕРКА КОНФИГА =====
    if (typeof SUPABASE_URL === 'undefined' || typeof SUPABASE_ANON_KEY === 'undefined') {
        console.error('❌ КРИТИЧЕСКАЯ ОШИБКА: config.js не загружен!');
        return;
    }

    // ===== 2. DOM-ЭЛЕМЕНТЫ =====
    const form = document.getElementById('auth-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const submitBtn = document.getElementById('submit-btn');
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    const consoleBox = document.getElementById('console');
    const consoleOutput = document.getElementById('console-output');

    // ===== 3. ЛОГИРОВАНИЕ =====
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

    // ===== 4. ИНИЦИАЛИЗАЦИЯ =====
    if (typeof window.supabase === 'undefined') {
        log('КРИТИЧЕСКАЯ ОШИБКА: Библиотека Supabase не загружена!', 'error');
        return;
    }

    const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // ===== 5. ОБРАБОТКА ФОРМЫ =====
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = usernameInput.value.trim();
            const password = passwordInput.value;
            let gender = 'male';
            genderRadios.forEach(el => { if (el.checked) gender = el.value; });

            if (!username || password.length < 4) {
                log('Имя не может быть пустым, пароль минимум 4 символа.', 'error');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = 'Обработка...';
            consoleOutput.innerHTML = '';
            log('🔒 Инициализация протокола безопасности...');

            try {
                // === ИСПРАВЛЕНИЕ: Убираем пробелы и спецсимволы, меняем домен ===
                const safeUsername = username.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
                const fakeEmail = `${safeUsername}@smartsocial.app`; 
                
                log(`🔍 Генерация ID для [${safeUsername}]...`);
                await new Promise(r => setTimeout(r, 300));

                log('📡 Поиск пользователя...');
                let { data, error } = await supabaseClient.auth.signInWithPassword({
                    email: fakeEmail,
                    password: password
                });

                if (error) {
                    if (error.message.includes('Invalid login credentials')) {
                        log('👤 Пользователь не найден. Регистрация...', 'info');
                        await new Promise(r => setTimeout(r, 400));

                        log('🔐 Создание аккаунта...');
                        const { data: signUpData, error: signUpError } = await supabaseClient.auth.signUp({
                            email: fakeEmail,
                            password: password,
                            options: { data: { username: username, gender: gender } }
                        });

                        if (signUpError) throw signUpError;

                        // === ЗАПИСЬ В ТАБЛИЦУ USERS ===
                        if (signUpData.user) {
                            log('💾 Сохранение в таблицу users...', 'info');
                            const { error: dbError } = await supabaseClient.from('users').insert([{
                                id: signUpData.user.id,
                                username: username,
                                gender: gender,
                                created_at: new Date().toISOString()
                            }]);

                            if (dbError) {
                                log('⚠️ Ошибка записи в БД: ' + dbError.message, 'error');
                            } else {
                                log('✅ Профиль сохранён в БД!', 'success');
                            }
                        }

                        if (!signUpData.session) {
                            log('❌ Нет сессии. Проверь настройки Email в Supabase.', 'error');
                            submitBtn.disabled = false;
                            submitBtn.textContent = 'Войти / Зарегистрироваться';
                            return;
                        }

                        log('🚀 Успех! Перенаправление...', 'success');
                        await new Promise(r => setTimeout(r, 800));
                        window.location.href = 'feed.html';

                    } else {
                        throw error;
                    }
                } else {
                    log('✅ Вход выполнен. Перенаправление...', 'success');
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
