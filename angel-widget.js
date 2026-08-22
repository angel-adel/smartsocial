// ============================================================
//  👼 АНГЕЛ-ХРАНИТЕЛЬ SMART SOCIAL
//  Версия: 5.0 (ФИНАЛЬНАЯ)
//  Описание: Интеллектуальный помощник для соцсети "Малышка"
//  Автор: Торопцев Дмитрий
//  Лицензия: MIT
// ============================================================

const axios = require('axios');
const readline = require('readline');

// ============================================================
//  БАЗА ЗНАНИЙ (БЫСТРЫЕ ОТВЕТЫ)
// ============================================================
const knowledgeBase = [
    // === ПРАВИЛА СООБЩЕСТВА ===
    {
        keywords: ['лимит', 'пост', 'публикация', 'сколько', 'можно'],
        answer: '📊 В Smart Social действует лимит: 10 постов в сутки. Мы за качество, а не за спам! Сброс происходит в 00:00.'
    },
    {
        keywords: ['ночной', 'режим', 'ночь', 'время', '23', '7'],
        answer: '🌙 Ночной режим: публикации доступны только с 07:00 до 23:00. Давайте отдыхать друг другу!'
    },
    {
        keywords: ['аватар', 'фото', 'загрузить', 'сменить'],
        answer: '📷 Чтобы сменить аватар, зайди в свой профиль и нажми на иконку камеры. Максимальный размер файла — 5MB.'
    },
    {
        keywords: ['пароль', 'сменить', 'изменить', 'безопасность'],
        answer: '🔐 Сменить пароль можно в разделе "Профиль". Введи текущий пароль и новый (минимум 6 символов). Никогда не передавай пароль третьим лицам!'
    },
    {
        keywords: ['друзья', 'заявка', 'добавить', 'принять', 'отклонить'],
        answer: '👥 Заявки в друзья обрабатываются в разделе "Друзья". Там же можно принять или отклонить заявку. Красный бейдж показывает новые заявки.'
    },
    {
        keywords: ['чат', 'сообщение', 'написать', 'удалить', 'редактировать'],
        answer: '💬 В чате можно писать сообщения, редактировать (карандаш) и удалять (корзина) свои сообщения. Непрочитанные сообщения отображаются красным бейджем.'
    },
    {
        keywords: ['гости', 'заходил', 'профиль', 'визиты'],
        answer: '👀 Раздел "Гости" показывает, кто заходил в твой профиль. Красный бейдж указывает на непрочитанные визиты.'
    },
    {
        keywords: ['удалить', 'аккаунт', 'профиль'],
        answer: '❌ Удаление аккаунта временно недоступно. Если нужно — напиши в поддержку: smartsocials@mail.ru'
    },
    {
        keywords: ['язык', 'перевод', 'русский', 'украинский', 'english', 'español', 'deutsch'],
        answer: '🌍 Доступны языки: русский, украинский, английский, испанский, немецкий. Выбери в выпадающем списке в шапке сайта.'
    },
    {
        keywords: ['тема', 'темная', 'светлая', 'ночная'],
        answer: '🎨 Переключить тему оформления можно кнопкой 🌙/☀️ в левом нижнем углу. Твой выбор сохраняется.'
    },
    {
        keywords: ['поиск', 'найти', 'люди', 'пользователи'],
        answer: '🔍 В разделе "Поиск" можно найти других пользователей по имени или статусу. Просто введи текст в поле поиска.'
    },
    {
        keywords: ['ошибка', 'не работает', 'баг', 'проблема'],
        answer: '🆘 Обнови страницу (F5). Если проблема осталась — напиши в поддержку: smartsocials@mail.ru'
    },
    {
        keywords: ['регистрация', 'забыл пароль', 'восстановить', 'вход'],
        answer: '📝 Для восстановления пароля напиши на почту smartsocials@mail.ru с темой "Восстановление пароля". Укажи свой email и имя пользователя.'
    },
    {
        keywords: ['новости', 'обновления', 'канал'],
        answer: '📢 Следи за новостями Smart Social в официальном канале MAX: https://max.ru/channel_SmartSocial_news'
    },
    // === ОСОБЕННОСТИ ===
    {
        keywords: ['статус', 'исчезающий', '24 часа'],
        answer: '💫 В разработке! Скоро появится функция "Исчезающие статусы" — они будут автоматически удаляться через 24 часа.'
    },
    {
        keywords: ['голосовое', 'сообщение', 'аудио', 'звук'],
        answer: '🎤 В разработке! Голосовые сообщения в чате появятся в одном из ближайших обновлений.'
    }
];

// ============================================================
//  НАСТРОЙКИ
// ============================================================
const OLLAMA_HOST = 'http://192.168.0.102:11434';
const MODEL_NAME = 'qwen2.5:0.5b';
const TIMEOUT_MS = 120000; // 2 минуты

// ============================================================
//  ЛОГИКА ПОИСКА В БАЗЕ
// ============================================================
function searchKnowledgeBase(query) {
    const lower = query.toLowerCase();
    for (const item of knowledgeBase) {
        if (item.keywords.some(k => lower.includes(k) || k.includes(lower))) {
            return item.answer;
        }
    }
    return null;
}

// ============================================================
//  ЗАПРОС К OLLAMA (ЖЁСТКИЙ ПРОМПТ)
// ============================================================
async function askOllama(question) {
    try {
        const systemPrompt = `
Ты — Ангел-Хранитель социальной сети Smart Social (её ласково называют «Малышка»).

===== О ПРОЕКТЕ =====
• Название: Smart Social («Малышка»)
• Дата основания: 9 мая 2026 года
• Создатель: Торопцев Дмитрий (единственный разработчик)
• Миссия: создать уютную, безопасную и эстетичную соцсеть без токсичности и рекламы
• Адреса в интернете:
  — https://smartsocial-xi.vercel.app (основной)
  — https://angel-adel.github.io/smartsocial (зеркало)
• Почта поддержки: smartsocials@mail.ru

===== ИСТОРИЯ МИГРАЦИЙ =====
Проект прошёл через несколько хостингов:
1. Replit — первый прототип
2. PythonAnywhere — бэкенд на Flask
3. Render — деплой базы данных и API
4. GitHub — хранение кода и документации
5. Vercel — финальный фронтенд (актуальный)

===== ТЕХНОЛОГИИ =====
• Supabase — база данных и аутентификация
• Vercel — хостинг
• Vanilla JS — чистый фронтенд

===== ПРАВИЛА СООБЩЕСТВА =====
• Уважение: без оскорблений, буллинга и ненависти
• Лимит постов: 10 в сутки
• Ночной режим: публикации с 07:00 до 23:00
• Безопасность: никогда не передавай пароль

===== ПЛАНЫ РАЗВИТИЯ =====
• Исчезающие статусы (удаляются через 24 часа)
• Голосовые сообщения в чате

===== ТВОИ СТРОГИЕ ПРАВИЛА =====
1. Отвечай ТОЛЬКО на русском языке, грамотно и литературно.
2. Отвечай ТОЛЬКО по теме Smart Social. На все остальные вопросы отвечай: «Я — Ангел-Хранитель Smart Social и отвечаю только на вопросы о проекте. Задайте вопрос о соцсети!»
3. НЕЛЬЗЯ отвечать на:
   — вопросы личного характера (имя, возраст, место встречи)
   — вопросы про политику, религию
   — контент 18+ (скажи, что публиковать это запрещено)
   — погоду, новости и другие отвлечённые темы
4. Если пользователь спросит про функционал — дай развёрнутый ответ: для чего нужна каждая опция.
5. Если не знаешь ответа — предложи написать на почту smartsocials@mail.ru.
6. Отвечай тёпло, дружелюбно, но строго в рамках проекта.

===== КОНЕЦ ИНСТРУКЦИИ =====
`;

        const response = await axios.post(`${OLLAMA_HOST}/api/generate`, {
            model: MODEL_NAME,
            prompt: `${systemPrompt}\n\nВопрос пользователя: ${question}\n\nОтвет Ангела-Хранителя:`,
            stream: false,
            options: {
                num_predict: 200,
                temperature: 0.2,
                top_p: 0.85,
                repeat_penalty: 1.2,
                stop: ['\n\n\n']
            }
        }, {
            timeout: TIMEOUT_MS
        });

        let answer = response.data.response || '❓ Не нашли ответа? Напишите нам: smartsocials@mail.ru';
        return answer.trim();
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            return '⏱️ Оператор думает слишком долго. Попробуйте позже.';
        }
        console.error('❌ Ошибка Ollama:', error.message);
        return '⚠️ Сервер временно недоступен. Напишите на smartsocials@mail.ru';
    }
}

// ============================================================
//  ОБРАБОТЧИК ЗАПРОСОВ
// ============================================================
async function handleQuery(query) {
    if (!query || query.trim() === '') {
        return '❓ Напишите вопрос, и я помогу!';
    }

    // Поиск в базе знаний
    const cached = searchKnowledgeBase(query);
    if (cached) {
        return `📚 ${cached}`;
    }

    // Запрос к Ollama
    console.log('🤖 Обращаюсь к оператору...');
    const answer = await askOllama(query);
    return `🤖 ${answer}`;
}

// ============================================================
//  ВИДЖЕТ ДЛЯ БРАУЗЕРА
// ============================================================
function getWidgetHTML() {
    return `
<div class="angel-widget" id="angelWidget">
    <div class="angel-window" id="angelWindow">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <strong style="font-size:16px;">👼 Ангел-Хранитель</strong>
            <span style="cursor:pointer; font-size:18px;" onclick="closeAngelWindow()">✕</span>
        </div>
        <div style="margin-bottom:12px;">
            <input type="text" id="angelSearch" placeholder="Спроси о Smart Social..."
                style="width:100%; padding:10px; border:1px solid #ccc; border-radius:8px;
                background:white; color:black; font-size:14px; outline:none;"
                onkeypress="if(event.key==='Enter') searchKnowledge()">
        </div>
        <div id="angelResults" style="max-height:300px; overflow-y:auto; font-size:14px; line-height:1.5;">
            <div style="color:#888; text-align:center; padding:10px;">Задай вопрос о Малышке! 💫</div>
        </div>
        <div style="margin-top:12px; padding-top:12px; border-top:1px solid #ddd;">
            <div style="font-size:12px; color:#888; margin-bottom:8px;">Популярные вопросы:</div>
            <div style="display:flex; flex-wrap:wrap; gap:6px;">
                <button onclick="quickSearch('лимит постов')">📊 Лимит</button>
                <button onclick="quickSearch('как сменить аватар')">📷 Аватар</button>
                <button onclick="quickSearch('ночной режим')">🌙 Ночной режим</button>
                <button onclick="quickSearch('кто создатель')">👤 Создатель</button>
                <button onclick="quickSearch('где сайт')">🔗 Ссылки</button>
            </div>
        </div>
    </div>
    <div class="angel-bubble" id="angelBubble" onclick="toggleAngelWindow()">👼</div>
</div>
    `;
}

function getWidgetStyles() {
    return `
        .angel-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 999999;
            font-family: Arial, sans-serif;
        }
        .angel-bubble {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: #4A6CF7;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            font-size: 28px;
            color: white;
            transition: all 0.3s ease;
            opacity: 0.85;
        }
        .angel-bubble:hover {
            opacity: 1;
            transform: scale(1.1);
        }
        .angel-window {
            position: absolute;
            bottom: 70px;
            right: 0;
            width: 340px;
            max-width: calc(100vw - 40px);
            background: white;
            border: 1px solid #ddd;
            border-radius: 16px;
            padding: 16px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.2);
            display: none;
            animation: slideUp 0.3s ease;
            color: black;
        }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .angel-window button {
            background: #f0f0f0;
            border: 1px solid #ddd;
            padding: 6px 12px;
            border-radius: 12px;
            font-size: 12px;
            cursor: pointer;
            color: #333;
            transition: all 0.2s ease;
        }
        .angel-window button:hover {
            background: #4A6CF7;
            color: white;
            border-color: #4A6CF7;
        }
    `;
}

// ============================================================
//  ФУНКЦИИ ВИДЖЕТА
// ============================================================
function initAngelWidget() {
    const style = document.createElement('style');
    style.textContent = getWidgetStyles();
    document.head.appendChild(style);

    document.body.insertAdjacentHTML('beforeend', getWidgetHTML());

    window.toggleAngelWindow = function() {
        const window = document.getElementById('angelWindow');
        const bubble = document.getElementById('angelBubble');
        if (window.style.display === 'block') {
            window.style.display = 'none';
            bubble.style.display = 'flex';
        } else {
            window.style.display = 'block';
            bubble.style.display = 'none';
            document.getElementById('angelSearch').focus();
        }
    };

    window.closeAngelWindow = function() {
        document.getElementById('angelWindow').style.display = 'none';
        document.getElementById('angelBubble').style.display = 'flex';
    };

    window.quickSearch = function(query) {
        document.getElementById('angelSearch').value = query;
        window.searchKnowledge();
    };

    window.searchKnowledge = async function() {
        const query = document.getElementById('angelSearch').value.trim();
        if (!query) return;

        const resultsDiv = document.getElementById('angelResults');
        resultsDiv.innerHTML = '<div style="text-align:center; padding:10px;">⏳ Ищу ответ...</div>';

        const cached = searchKnowledgeBase(query);
        if (cached) {
            resultsDiv.innerHTML = `<div style="background:#f9f9f9; padding:12px; border-radius:8px; border-left:3px solid #4A6CF7;">📚 ${cached}</div>`;
            return;
        }

        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 120000);

            const response = await fetch(`http://192.168.0.102:3000/ask?q=${encodeURIComponent(query)}`, {
                signal: controller.signal
            });
            clearTimeout(timeout);

            const data = await response.json();
            resultsDiv.innerHTML = `<div style="background:#f9f9f9; padding:12px; border-radius:8px; border-left:3px solid #4A6CF7;">🤖 ${data.answer || 'Не удалось получить ответ'}</div>`;
        } catch (error) {
            if (error.name === 'AbortError') {
                resultsDiv.innerHTML = `<div style="background:#f9f9f9; padding:12px; border-radius:8px; border-left:3px solid #ff6b6b;">⏱️ Оператор думает слишком долго. Попробуйте позже.</div>`;
            } else {
                resultsDiv.innerHTML = `<div style="background:#f9f9f9; padding:12px; border-radius:8px; border-left:3px solid #ff6b6b;">⚠️ Оператор временно недоступен. Напишите на smartsocials@mail.ru</div>`;
            }
        }
    };
}

// ============================================================
//  ЗАПУСК В БРАУЗЕРЕ
// ============================================================
if (typeof window !== 'undefined' && window.document) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAngelWidget);
    } else {
        initAngelWidget();
    }
} else {
    // ============================================================
    //  ЗАПУСК В TERMUX (CLI)
    // ============================================================
    async function main() {
        console.log('👼 Ангел-Хранитель Smart Social v5.0 (ФИНАЛЬНАЯ)');
        console.log(`📡 Подключён к Ollama: ${OLLAMA_HOST}`);
        console.log(`🧠 Модель: ${MODEL_NAME}`);
        console.log(`📚 База знаний: ${knowledgeBase.length} тем`);
        console.log(`⏱️ Таймаут: ${TIMEOUT_MS / 1000} сек.`);
        console.log('💬 Введи вопрос о Smart Social (или "выход" для выхода):');

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: '❓ '
        });

        rl.prompt();

        rl.on('line', async (line) => {
            const input = line.trim();
            if (['выход', 'exit', 'quit'].includes(input.toLowerCase())) {
                console.log('👋 До свидания! Ангел-Хранитель всегда на связи.');
                rl.close();
                return;
            }

            const start = Date.now();
            const response = await handleQuery(input);
            const elapsed = ((Date.now() - start) / 1000).toFixed(2);

            console.log(`\n${response}`);
            console.log(`⏱️ Ответ получен за ${elapsed} сек.\n`);
            rl.prompt();
        });

        rl.on('close', () => process.exit(0));
    }

    if (process.argv[2]) {
        const query = process.argv.slice(2).join(' ');
        handleQuery(query)
            .then(answer => console.log(answer))
            .catch(err => console.error('Ошибка:', err.message));
    } else {
        main();
    }
        }
