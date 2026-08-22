// ============================================================
//  👼 АНГЕЛ-ХРАНИТЕЛЬ SMART SOCIAL
//  ГИБРИДНАЯ ВЕРСИЯ: CLI + ВИДЖЕТ ДЛЯ САЙТА
//  Версия: 7.1 (ИСПРАВЛЕНА ОШИБКА ИСЧЕЗНОВЕНИЯ НА VERCEL)
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

// === НАСТРОЙКИ ПОДКЛЮЧЕНИЯ К OLLAMA ===
// ВНИМАНИЕ: Для работы в браузере с Vercel нужен HTTPS или туннель (ngrok/localtunnel)!
var OLLAMA_HOST = 'http://192.168.0.102:11434';  
var MODEL_NAME = 'qwen2.5:0.5b';

// === ПОИСК В БАЗЕ ЗНАНИЙ ===
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

// === СИСТЕМНЫЙ ПРОМПТ ===
function getSystemPrompt() {
    return `
Ты — Ангел-Хранитель социальной сети Smart Social («Малышка»).
Название: Smart Social. Дата основания: 9 мая 2026 года. Создатель: Торопцев Дмитрий.Миссия: уютная, безопасная соцсеть без токсичности и рекламы.
Адреса: https://smartsocial-xi.vercel.app и https://angel-adel.github.io/smartsocial
Почта: smartsocials@mail.ru
ПРАВИЛА: Отвечай ТОЛЬКО на русском, грамотно. ТОЛЬКО по теме Smart Social. 
НЕЛЬЗЯ: личные вопросы, политика, 18+, погода. Отвечай тёпло, дружелюбно, но строго.
`;
}

// ============================================================
//  ЧАСТЬ 1: ВИДЖЕТ ДЛЯ БРАУЗЕРА
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
        .angel-widget { position: fixed; bottom: 20px; right: 20px; z-index: 999999; font-family: Arial, sans-serif; }
        .angel-bubble { width: 56px; height: 56px; border-radius: 50%; background: #4A6CF7; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.3); font-size: 28px; color: white; transition: all 0.3s ease; opacity: 0.85; }
        .angel-bubble:hover { opacity: 1; transform: scale(1.1); }
        .angel-window { position: absolute; bottom: 70px; right: 0; width: 340px; max-width: calc(100vw - 40px); background: white; border: 1px solid #ddd; border-radius: 16px; padding: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.2); display: none; animation: slideUp 0.3s ease; color: black; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }        .angel-window button { background: #f0f0f0; border: 1px solid #ddd; padding: 6px 12px; border-radius: 12px; font-size: 12px; cursor: pointer; color: #333; transition: all 0.2s ease; }
        .angel-window button:hover { background: #4A6CF7; color: white; border-color: #4A6CF7; }
    `;
}

function askOllamaBrowser(question) {
    return new Promise(function(resolve) {
        // Проверка на Mixed Content (HTTPS сайт -> HTTP Ollama)
        if (window.location.protocol === 'https:' && OLLAMA_HOST.startsWith('http:')) {
            resolve('⚠️ <b>Внимание:</b> Браузер заблокировал запрос к локальному серверу из-за безопасности (HTTPS → HTTP). Для теста откройте сайт по http://localhost или настройте туннель (ngrok).');
            return;
        }

        var systemPrompt = getSystemPrompt();
        var data = JSON.stringify({
            model: MODEL_NAME,
            prompt: systemPrompt + '\n\nВопрос: ' + question + '\n\nОтвет:',
            stream: false,
            options: { num_predict: 200, temperature: 0.2, top_p: 0.85, repeat_penalty: 1.2 }
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
                    resolve('⚠️ Ошибка обработки ответа.');
                }
            } else {
                resolve('⚠️ Сервер вернул ошибку: ' + xhr.status + '. Проверьте, запущен ли Ollama и разрешен ли CORS (OLLAMA_ORIGINS="*").');
            }
        };

        xhr.onerror = function() {
            resolve('⚠️ Не удалось связаться с сервером. <br>1. Проверьте, что вы в одной Wi-Fi сети с сервером.<br>2. Проверьте консоль браузера (F12) на наличие ошибок CORS.');
        };

        xhr.ontimeout = function() {
            resolve('⏱️ Оператор думает слишком долго.');
        };

        xhr.send(data);
    });
}
function initAngelWidget() {
    console.log('👼 Инициализация виджета Ангела-Хранителя...');
    try {
        var style = document.createElement('style');
        style.textContent = getWidgetStyles();
        document.head.appendChild(style);

        document.body.insertAdjacentHTML('beforeend', getWidgetHTML());
        console.log('✅ HTML виджета успешно добавлен на страницу.');

        window.toggleAngelWindow = function() {
            var win = document.getElementById('angelWindow');
            var bubble = document.getElementById('angelBubble');
            if (win.style.display === 'block') {
                win.style.display = 'none';
                bubble.style.display = 'flex';
            } else {
                win.style.display = 'block';
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
            });        };
    } catch (error) {
        console.error('❌ Критическая ошибка при инициализации виджета:', error);
    }
}

// ============================================================
//  ЗАПУСК: ОПРЕДЕЛЕНИЕ ОКРУЖЕНИЯ
// ============================================================

// 1. ПРОВЕРКА БРАУЗЕРА (безопасная, не вызовет ошибку require)
if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAngelWidget);
    } else {
        setTimeout(initAngelWidget, 300);
    }
} 
// 2. ПРОВЕРКА NODE.JS (TERMUX)
else if (typeof process !== 'undefined' && process.versions && process.versions.node) {
    console.log('🖥️ Запуск в среде Node.js (CLI)');
    
    // Теперь require вызывается ТОЛЬКО когда мы точно в Node.js
    var axios = require('axios');
    var readline = require('readline');

    function askOllamaCLI(question) {
        return new Promise(function(resolve) {
            var systemPrompt = getSystemPrompt();
            axios.post(OLLAMA_HOST + '/api/generate', {
                model: MODEL_NAME,
                prompt: systemPrompt + '\n\nВопрос: ' + question + '\n\nОтвет:',
                stream: false,
                options: { num_predict: 200, temperature: 0.2, top_p: 0.85, repeat_penalty: 1.2 }
            }, { timeout: 120000 })
            .then(function(response) {
                resolve(response.data.response || '❓ Не нашли ответа?');
            })
            .catch(function(error) {
                resolve('⚠️ Ошибка связи с Ollama: ' + (error.message || 'Неизвестная ошибка'));
            });
        });
    }

    function handleQueryCLI(query) {
        if (!query || query.trim() === '') return Promise.resolve('❓ Напишите вопрос!');
        var cached = searchKnowledgeBase(query);
        if (cached) return Promise.resolve('📚 ' + cached);
        console.log('🤖 Обращаюсь к оператору...');
        return askOllamaCLI(query).then(function(answer) {            return '🤖 ' + answer;
        });
    }

    function main() {
        console.log('👼 Ангел-Хранитель Smart Social v7.1 (CLI)');
        console.log('📡 Подключён к Ollama:', OLLAMA_HOST);
        console.log('🧠 Модель:', MODEL_NAME);
        console.log('💬 Введи вопрос (или "выход"):');

        var rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '❓ ' });
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
                console.log('\n' + response);
                console.log('⏱️ Ответ получен за ' + ((Date.now() - start) / 1000).toFixed(2) + ' сек.\n');
                rl.prompt();
            });
        });
        rl.on('close', function() { process.exit(0); });
    }

    if (process.argv[2]) {
        handleQueryCLI(process.argv.slice(2).join(' ')).then(console.log).catch(console.error);
    } else {
        main();
    }
         }
