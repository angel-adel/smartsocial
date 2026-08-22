cat > angel-widget.js << 'EOF'
// ============================================================
//  👼 АНГЕЛ-ХРАНИТЕЛЬ SMART SOCIAL
//  ГИБРИДНАЯ ВЕРСИЯ: CLI + ВИДЖЕТ ДЛЯ САЙТА
//  Версия: 5.1 (ФИНАЛЬНАЯ)
// ============================================================

// === БАЗА ЗНАНИЙ ===
const knowledgeBase = [
    { keywords: ['лимит', 'пост', 'публикация'], answer: '📊 В Smart Social лимит: 10 постов в сутки. Сброс в 00:00.' },
    { keywords: ['ночной', 'режим', 'ночь'], answer: '🌙 Ночной режим: публикации с 07:00 до 23:00.' },
    { keywords: ['аватар', 'фото', 'сменить'], answer: '📷 Сменить аватар в профиле, макс. 5MB.' },
    { keywords: ['пароль', 'сменить'], answer: '🔐 Сменить пароль в профиле. Минимум 6 символов.' },
    { keywords: ['друзья', 'заявка'], answer: '👥 Заявки в друзья в разделе "Друзья".' },
    { keywords: ['чат', 'сообщение'], answer: '💬 В чате можно писать, редактировать и удалять.' },
    { keywords: ['гости', 'заходил'], answer: '👀 Раздел "Гости" показывает визиты.' },
    { keywords: ['удалить', 'аккаунт'], answer: '❌ Удаление аккаунта временно недоступно.' },
    { keywords: ['язык', 'перевод'], answer: '🌍 Доступны языки: русский, украинский, английский, испанский, немецкий.' },
    { keywords: ['тема', 'темная', 'светлая'], answer: '🎨 Переключи тему кнопкой 🌙/☀️.' },
    { keywords: ['поиск', 'найти'], answer: '🔍 Раздел "Поиск" — ищи пользователей.' },
    { keywords: ['ошибка', 'баг'], answer: '🆘 Обнови страницу (F5). Если не помогает — напиши на почту.' },
    { keywords: ['регистрация', 'забыл пароль'], answer: '📝 Напиши на smartsocials@mail.ru для восстановления.' },
    { keywords: ['новости', 'обновления'], answer: '📢 Следи за новостями в канале MAX.' },
    { keywords: ['статус', 'исчезающий', '24 часа'], answer: '💫 В разработке! Исчезающие статусы — удаляются через 24 часа.' },
    { keywords: ['голосовое', 'сообщение', 'аудио'], answer: '🎤 В разработке! Голосовые сообщения в чате появятся скоро.' }
];

const OLLAMA_HOST = 'http://192.168.0.102:11434';
const MODEL_NAME = 'qwen2.5:0.5b';
const TIMEOUT_MS = 120000;

// === ЛОГИКА ===
function searchKnowledgeBase(query) {
    const lower = query.toLowerCase();
    for (const item of knowledgeBase) {
        if (item.keywords.some(k => lower.includes(k) || k.includes(lower))) {
            return item.answer;
        }
    }
    return null;
}

async function askOllama(question) {
    try {
        const axios = require('axios');
        const systemPrompt = `
Ты — Ангел-Хранитель социальной сети Smart Social («Малышка»).

===== О ПРОЕКТЕ =====
• Название: Smart Social («Малышка»)
• Дата основания: 9 мая 2026 года
• Создатель: Торопцев Дмитрий
• Миссия: уютная, безопасная соцсеть без токсичности и рекламы
• Адреса: https://smartsocial-xi.vercel.app и https://angel-adel.github.io/smartsocial
• Почта: smartsocials@mail.ru

===== ИСТОРИЯ МИГРАЦИЙ =====
Replit → PythonAnywhere → Render → GitHub → Vercel

===== ТЕХНОЛОГИИ =====
Supabase, Vercel, Vanilla JS

===== ПРАВИЛА =====
• Уважение, без оскорблений
• Лимит постов: 10 в сутки
• Ночной режим: 07:00–23:00
• Безопасность: не передавай пароль

===== ПЛАНЫ =====
• Исчезающие статусы (24 часа)
• Голосовые сообщения

===== ТВОИ ПРАВИЛА =====
1. Отвечай ТОЛЬКО на русском, грамотно.
2. Отвечай ТОЛЬКО по теме Smart Social.
3. НЕЛЬЗЯ: личные вопросы, политика, 18+, погода, отвлечённые темы.
4. Если не знаешь — предложи написать на почту.
5. Отвечай тёпло, дружелюбно, но строго в рамках проекта.
`;

        const response = await axios.post(`${OLLAMA_HOST}/api/generate`, {
            model: MODEL_NAME,
            prompt: `${systemPrompt}\n\nВопрос: ${question}\n\nОтвет:`,
            stream: false,
            options: {
                num_predict: 200,
                temperature: 0.2,
                top_p: 0.85,
                repeat_penalty: 1.2
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
        return '⚠️ Сервер временно недоступен. Напишите на smartsocials@mail.ru';
    }
}

async function handleQuery(query) {
    if (!query || query.trim() === '') return '❓ Напишите вопрос!';
    const cached = searchKnowledgeBase(query);
    if (cached) return `📚 ${cached}`;
    console.log('🤖 Обращаюсь к оператору...');
    return `🤖 ${await askOllama(query)}`;
}

// ============================================================
//  ВИДЖЕТ ДЛЯ САЙТА
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
    const readline = require('readline');

    async function main() {
        console.log('👼 Ангел-Хранитель Smart Social v5.1 (CLI + Виджет)');
        console.log(`📡 Подключён к Ollama: ${OLLAMA_HOST}`);
        console.log(`🧠 Модель: ${MODEL_NAME}`);
        console.log(`📚 База знаний: ${knowledgeBase.length} тем`);
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
                console.log('👋 До свидания!');
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
EOF
