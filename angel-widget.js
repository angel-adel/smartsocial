cat > angel-widget.js << 'EOF'
// ============================================================
//  👼 АНГЕЛ-ХРАНИТЕЛЬ SMART SOCIAL
//  Упрощённая гибридная версия для телефона
//  Версия: 7.0 (СТАБИЛЬНАЯ)
// ============================================================

// === БАЗА ЗНАНИЙ ===
var knowledgeBase = [
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

var OLLAMA_HOST = 'http://192.168.0.102:11434';
var MODEL_NAME = 'qwen2.5:0.5b';

function searchKnowledgeBase(query) {
    var lower = query.toLowerCase();
    for (var i = 0; i < knowledgeBase.length; i++) {
        var item = knowledgeBase[i];
        for (var j = 0; j < item.keywords.length; j++) {
            if (lower.includes(item.keywords[j]) || item.keywords[j].includes(lower)) {
                return item.answer;
            }
        }
    }
    return null;
}

// ============================================================
//  ВИДЖЕТ ДЛЯ САЙТА (БЕЗ require, БЕЗ axios)
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

function getSystemPrompt() {
    return `
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
}

function askOllamaBrowser(question) {
    return new Promise(function(resolve) {
        var systemPrompt = getSystemPrompt();
        var data = JSON.stringify({
            model: MODEL_NAME,
            prompt: systemPrompt + '\n\nВопрос: ' + question + '\n\nОтвет:',
            stream: false,
            options: {
                num_predict: 200,
                temperature: 0.2,
                top_p: 0.85,
                repeat_penalty: 1.2
            }
        });

        var xhr = new XMLHttpRequest();
        xhr.open('POST', OLLAMA_HOST + '/api/generate', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.timeout = 120000;

        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    var response = JSON.parse(xhr.responseText);
                    resolve(response.response || '❓ Не нашли ответа? Напишите нам: smartsocials@mail.ru');
                } catch (e) {
                    resolve('⚠️ Ошибка обработки ответа от оператора.');
                }
            } else {
                resolve('⚠️ Сервер вернул ошибку: ' + xhr.status);
            }
        };

        xhr.onerror = function() {
            resolve('⚠️ Сервер временно недоступен. Напишите на smartsocials@mail.ru');
        };

        xhr.ontimeout = function() {
            resolve('⏱️ Оператор думает слишком долго. Попробуйте позже.');
        };

        xhr.send(data);
    });
}

function initAngelWidget() {
    var style = document.createElement('style');
    style.textContent = getWidgetStyles();
    document.head.appendChild(style);

    document.body.insertAdjacentHTML('beforeend', getWidgetHTML());

    window.toggleAngelWindow = function() {
        var window = document.getElementById('angelWindow');
        var bubble = document.getElementById('angelBubble');
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

    window.searchKnowledge = function() {
        var query = document.getElementById('angelSearch').value.trim();
        if (!query) return;

        var resultsDiv = document.getElementById('angelResults');
        resultsDiv.innerHTML = '<div style="text-align:center; padding:10px;">⏳ Ищу ответ...</div>';

        var cached = searchKnowledgeBase(query);
        if (cached) {
            resultsDiv.innerHTML = '<div style="background:#f9f9f9; padding:12px; border-radius:8px; border-left:3px solid #4A6CF7;">📚 ' + cached + '</div>';
            return;
        }

        askOllamaBrowser(query).then(function(answer) {
            resultsDiv.innerHTML = '<div style="background:#f9f9f9; padding:12px; border-radius:8px; border-left:3px solid #4A6CF7;">🤖 ' + answer + '</div>';
        });
    };
}

// ============================================================
//  ЗАПУСК В БРАУЗЕРЕ
// ============================================================
if (typeof window !== 'undefined' && window.document) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAngelWidget);
    } else {
        setTimeout(initAngelWidget, 300);
    }
} else {
    // ============================================================
    //  ЗАПУСК В TERMUX (CLI)
    // ============================================================
    try {
        var axios = require('axios');
    } catch (e) {
        console.error('❌ Установи axios: npm install axios');
        process.exit(1);
    }

    var readline = require('readline');

    function askOllamaCLI(question) {
        return new Promise(function(resolve) {
            var systemPrompt = getSystemPrompt();
            axios.post(OLLAMA_HOST + '/api/generate', {
                model: MODEL_NAME,
                prompt: systemPrompt + '\n\nВопрос: ' + question + '\n\nОтвет:',
                stream: false,
                options: {
                    num_predict: 200,
                    temperature: 0.2,
                    top_p: 0.85,
                    repeat_penalty: 1.2
                }
            }, {
                timeout: 120000
            })
            .then(function(response) {
                resolve(response.data.response || '❓ Не нашли ответа? Напишите нам: smartsocials@mail.ru');
            })
            .catch(function(error) {
                if (error.code === 'ECONNABORTED') {
                    resolve('⏱️ Оператор думает слишком долго. Попробуйте позже.');
                } else {
                    resolve('⚠️ Сервер временно недоступен. Напишите на smartsocials@mail.ru');
                }
            });
        });
    }

    function handleQueryCLI(query) {
        if (!query || query.trim() === '') return Promise.resolve('❓ Напишите вопрос!');
        var cached = searchKnowledgeBase(query);
        if (cached) return Promise.resolve('📚 ' + cached);
        console.log('🤖 Обращаюсь к оператору...');
        return askOllamaCLI(query).then(function(answer) {
            return '🤖 ' + answer;
        });
    }

    function main() {
        console.log('👼 Ангел-Хранитель Smart Social v7.0 (CLI)');
        console.log('📡 Подключён к Ollama:', OLLAMA_HOST);
        console.log('🧠 Модель:', MODEL_NAME);
        console.log('📚 База знаний:', knowledgeBase.length, 'тем');
        console.log('💬 Введи вопрос о Smart Social (или "выход" для выхода):');

        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: '❓ '
        });

        rl.prompt();

        rl.on('line', function(line) {
            var input = line.trim();
            if (input.toLowerCase() === 'выход' || input.toLowerCase() === 'exit') {
                console.log('👋 До свидания!');
                rl.close();
                return;
            }

            var start = Date.now();
            handleQueryCLI(input).then(function(response) {
                var elapsed = ((Date.now() - start) / 1000).toFixed(2);
                console.log('\n' + response);
                console.log('⏱️ Ответ получен за ' + elapsed + ' сек.\n');
                rl.prompt();
            });
        });

        rl.on('close', function() {
            process.exit(0);
        });
    }

    if (process.argv[2]) {
        var query = process.argv.slice(2).join(' ');
        handleQueryCLI(query).then(function(answer) {
            console.log(answer);
        }).catch(function(err) {
            console.error('Ошибка:', err.message);
        });
    } else {
        main();
    }
}
EOF
