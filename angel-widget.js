// ============================================================
//  👼 АНГЕЛ-ХРАНИТЕЛЬ SMART SOCIAL
//  Версия: 8.0 (LIGHT — ТОЛЬКО БРАУЗЕР)
// ============================================================

// === НАСТРОЙКИ ===
var OLLAMA_HOST = 'https://f7d929e7eeb824.lhr.life'; // Твоя ссылка из localhost.run
var MODEL_NAME = 'qwen2.5:0.5b';

// === БАЗА ЗНАНИЙ (Fallback, если ИИ не отвечает) ===
var knowledgeBase = [
    { keywords: ['лимит', 'пост', 'публикация'], answer: '📊 В Smart Social лимит: 10 постов в сутки. Сброс в 00:00.' },
    { keywords: ['ночной', 'режим', 'ночь'], answer: '🌙 Ночной режим: публикации с 07:00 до 23:00.' },
    { keywords: ['аватар', 'фото', 'сменить'], answer: '📷 Сменить аватар в профиле, макс. 5MB.' },
    { keywords: ['пароль', 'сменить'], answer: '🔐 Сменить пароль в профиле. Минимум 6 символов.' },
    { keywords: ['друзья', 'заявка'], answer: '👥 Заявки в друзья в разделе "Друзья".' },
    { keywords: ['чат', 'сообщение'], answer: '💬 В чате можно писать, редактировать и удалять.' },
    { keywords: ['гости', 'заходил'], answer: '👀 Раздел "Гости" показывает визиты.' },
    { keywords: ['создатель', 'кто'], answer: '👤 Создатель Smart Social — Торопцев Дмитрий. Дата основания: 9 мая 2026 года.' },
    { keywords: ['сайт', 'ссылка', 'адрес'], answer: '🔗 Сайты: https://smartsocial-xi.vercel.app и https://angel-adel.github.io/smartsocial' },
    { keywords: ['почта', 'email', 'написать'], answer: '📧 Почта для связи: smartsocials@mail.ru' },
    { keywords: ['язык', 'перевод'], answer: '🌍 Доступны языки: русский, украинский, английский, испанский, немецкий.' },
    { keywords: ['тема', 'темная', 'светлая'], answer: '🎨 Переключи тему кнопкой 🌙/☀️.' },
    { keywords: ['ошибка', 'баг'], answer: '🆘 Обнови страницу (F5). Если не помогает — напиши на почту.' }
];

// === ПОИСК В БАЗЕ ЗНАНИЙ ===
function searchKnowledgeBase(query) {
    var lower = query.toLowerCase();
    for (var i = 0; i < knowledgeBase.length; i++) {
        var item = knowledgeBase[i];
        for (var j = 0; j < item.keywords.length; j++) {
            if (lower.includes(item.keywords[j])) {
                return item.answer;
            }
        }
    }
    return null;
}

// === СИСТЕМНЫЙ ПРОМПТ ===
function getSystemPrompt() {
    return `Ты — Ангел-Хранитель социальной сети Smart Social.
Создатель: Торопцев Дмитрий. Дата основания: 9 мая 2026 года.
Почта: smartsocials@mail.ru.
Отвечай ТОЛЬКО на русском, кратко (максимум 2-3 предложения), дружелюбно.
Отвечай ТОЛЬКО по теме Smart Social. НЕЛЬЗЯ: личные вопросы, политика, 18+.
Если не знаешь — предложи написать на smartsocials@mail.ru.`;
}
// === ЗАПРОС К OLLAMA ===
function askOllama(question) {
    return new Promise(function(resolve) {
        var data = JSON.stringify({
            model: MODEL_NAME,
            prompt: getSystemPrompt() + '\n\nВопрос: ' + question + '\n\nОтвет:',
            stream: false,
            options: {
                num_predict: 100,      // Короткий ответ = быстрая генерация
                temperature: 0.1,      // Меньше креатива = быстрее расчет
                top_p: 0.9,
                repeat_penalty: 1.1
            }
        });

        var xhr = new XMLHttpRequest();
        xhr.open('POST', OLLAMA_HOST + '/api/generate', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.timeout = 180000; // 3 минуты (на случай медленного телефона)

        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    var response = JSON.parse(xhr.responseText);
                    resolve(response.response || null);
                } catch (e) {
                    resolve(null);
                }
            } else {
                resolve(null);
            }
        };

        xhr.onerror = function() {
            resolve(null);
        };

        xhr.ontimeout = function() {
            resolve(null);
        };

        xhr.send(data);
    });
}

// === ОБРАБОТКА ВОПРОСА ===
function handleQuestion(question) {
    var resultsDiv = document.getElementById('angelResults');
    
    // Показываем индикатор загрузки    resultsDiv.innerHTML = '<div style="text-align:center; padding:20px;"><div style="font-size:24px; animation: spin 1s linear infinite;">⏳</div><div style="margin-top:10px; color:#666;">Ангел думает...</div></div>';
    
    // Сначала ищем в базе знаний (мгновенно)
    var cached = searchKnowledgeBase(question);
    if (cached) {
        resultsDiv.innerHTML = '<div style="background:#f0f4ff; padding:12px; border-radius:8px; border-left:3px solid #4A6CF7;">📚 ' + cached + '</div>';
        return;
    }
    
    // Если не нашли — спрашиваем ИИ
    askOllama(question).then(function(answer) {
        if (answer) {
            resultsDiv.innerHTML = '<div style="background:#f0f4ff; padding:12px; border-radius:8px; border-left:3px solid #4A6CF7;">🤖 ' + answer + '</div>';
        } else {
            // Если ИИ не ответил — даем общую подсказку
            resultsDiv.innerHTML = '<div style="background:#fff3cd; padding:12px; border-radius:8px; border-left:3px solid #ffc107;">⚠️ Ангел занят. Попробуйте позже или напишите на <a href="mailto:smartsocials@mail.ru" style="color:#4A6CF7;">smartsocials@mail.ru</a></div>';
        }
    });
}

// === HTML ВИДЖЕТА ===
function getWidgetHTML() {
    return `
<div class="angel-widget" id="angelWidget">
    <div class="angel-window" id="angelWindow">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <strong style="font-size:16px;">👼 Ангел-Хранитель</strong>
            <span style="cursor:pointer; font-size:18px; color:#666;" onclick="closeAngelWindow()">✕</span>
        </div>
        <div style="margin-bottom:12px;">
            <input type="text" id="angelSearch" placeholder="Спроси о Smart Social..."
                style="width:100%; padding:10px; border:1px solid #ddd; border-radius:8px;
                background:white; color:black; font-size:14px; outline:none; box-sizing:border-box;"
                onkeypress="if(event.key==='Enter') handleQuestion(this.value)">
        </div>
        <div id="angelResults" style="max-height:300px; overflow-y:auto; font-size:14px; line-height:1.5;">
            <div style="color:#888; text-align:center; padding:10px;">Задай вопрос о Малышке! 💫</div>
        </div>
        <div style="margin-top:12px; padding-top:12px; border-top:1px solid #eee;">
            <div style="font-size:12px; color:#888; margin-bottom:8px;">Популярные вопросы:</div>
            <div style="display:flex; flex-wrap:wrap; gap:6px;">
                <button onclick="quickSearch('кто создатель')">👤 Создатель</button>
                <button onclick="quickSearch('лимит постов')">📊 Лимит</button>
                <button onclick="quickSearch('где сайт')">🔗 Ссылки</button>
            </div>
        </div>
    </div>
    <div class="angel-bubble" id="angelBubble" onclick="toggleAngelWindow()">👼</div>
</div>
    `;}

// === СТИЛИ ===
function getWidgetStyles() {
    return `
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .angel-widget { position: fixed; bottom: 20px; right: 20px; z-index: 999999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; }
        .angel-bubble { width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.3); font-size: 28px; color: white; transition: all 0.3s ease; }
        .angel-bubble:hover { transform: scale(1.1); box-shadow: 0 6px 16px rgba(0,0,0,0.4); }
        .angel-window { position: absolute; bottom: 70px; right: 0; width: 340px; max-width: calc(100vw - 40px); background: white; border: 1px solid #e0e0e0; border-radius: 16px; padding: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.2); display: none; animation: slideUp 0.3s ease; color: black; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .angel-window button { background: #f5f5f5; border: 1px solid #ddd; padding: 6px 12px; border-radius: 12px; font-size: 12px; cursor: pointer; color: #333; transition: all 0.2s ease; }
        .angel-window button:hover { background: #667eea; color: white; border-color: #667eea; }
    `;
}

// === ИНИЦИАЛИЗАЦИЯ ===
function initAngelWidget() {
    console.log('👼 Инициализация Ангела-Хранителя...');
    
    var style = document.createElement('style');
    style.textContent = getWidgetStyles();
    document.head.appendChild(style);
    
    document.body.insertAdjacentHTML('beforeend', getWidgetHTML());
    
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
        handleQuestion(query);
    };
    
    console.log('✅ Ангел-Хранитель готов к работе!');}

// === ЗАПУСК ===
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAngelWidget);
} else {
    initAngelWidget();
}
