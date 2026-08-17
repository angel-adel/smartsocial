// === ВИДЖЕТ АНГЕЛА-ХРАНИТЕЛЯ С ПОИСКОМ ===

// База знаний (вопросы и ответы)
const knowledgeBase = [
    {
        keywords: ['лимит', 'пост', 'публикация', 'сколько', 'можно'],
        answer: ' Лимит публикаций: 10 постов в сутки. Сброс происходит в 00:00. Качество важнее количества!'
    },
    {
        keywords: ['ночной', 'режим', 'ночь', 'время', 'публикация', '23', '7'],
        answer: ' Ночной режим: Публикации доступны с 07:00 до 23:00. Дай себе и другим отдых!'
    },
    {
        keywords: ['аватар', 'фото', 'загрузить', 'сменить', 'картинка'],
        answer: '📷 Чтобы сменить аватар: нажми на иконку камеры на своей аватарке в профиле. Максимальный размер файла — 5MB.'
    },
    {
        keywords: ['пароль', 'сменить', 'изменить', 'безопасность'],
        answer: ' Сменить пароль можно в своём профиле, нажав кнопку "Сменить пароль". Введи текущий пароль и новый (минимум 6 символов).'
    },
    {
        keywords: ['друзья', 'заявка', 'добавить', 'принять', 'отклонить'],
        answer: '👥 Заявки в друзья приходят в раздел "Друзья". Там же можно принять или отклонить заявку. Красный бейдж показывает количество новых заявок.'
    },
    {
        keywords: ['сообщение', 'чат', 'написать', 'удалить', 'редактировать'],
        answer: '💬 В чате можно писать сообщения, редактировать (карандаш) и удалять (корзина) свои сообщения. Непрочитанные сообщения показываются красным бейджем.'
    },
    {
        keywords: ['гости', 'кто', 'заходил', 'профиль'],
        answer: '👀 Раздел "Гости" показывает, кто заходил в твой профиль. Красный бейдж указывает на непрочитанные визиты. При просмотре раздела визиты отмечаются как прочитанные.'
    },
    {
        keywords: ['удалить', 'аккаунт', 'профиль', 'удаление'],
        answer: '❌ Удаление аккаунта временно недоступно. Напиши администрации для помощи.'
    },
    {
        keywords: ['язык', 'перевод', 'русский', 'украинский', 'english'],
        answer: ' Выбери язык в выпадающем списке в шапке сайта. Доступны: русский, украинский, английский, испанский, немецкий.'
    },
    {
        keywords: ['тема', 'темная', 'светлая', 'ночная', 'дизайн'],
        answer: '🎨 Переключи тему оформления кнопкой 🌙/☀️ в левом нижнем углу. Твой выбор сохраняется.'
    },
    {
        keywords: ['поиск', 'найти', 'люди', 'пользователи'],
        answer: '🔍 В разделе "Поиск" можно найти других пользователей по имени или статусу. Просто введи текст в поле поиска.'
    },
    {
        keywords: ['ошибка', 'не работает', 'баг', 'проблема', 'помощь'],        answer: '🆘 Если что-то не работает, обнови страницу (F5). Если проблема осталась — напиши администрации с описанием проблемы.'
    },
    {
        keywords: ['регистрация', 'войти', 'логин', 'аккаунт', 'создать'],
        answer: '📝 Регистрация происходит через email и пароль. Если забыл пароль — используй функцию восстановления (в разработке).'
    }
];

function initAngelWidget() {
    // Создаем HTML виджета с поиском
    const widgetHTML = `
        <div class="angel-widget" id="angelWidget">
            <div class="angel-window" id="angelWindow">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                    <strong style="font-size:16px;"> Ангел-Хранитель</strong>
                    <span style="cursor:pointer; font-size:18px;" onclick="closeAngelWindow()"></span>
                </div>
                
                <!-- Поле поиска -->
                <div style="margin-bottom:12px;">
                    <input 
                        type="text" 
                        id="angelSearch" 
                        placeholder="Задай вопрос..." 
                        style="width:100%; padding:10px; border:1px solid var(--border); border-radius:8px; background:var(--bg-primary); color:var(--text-primary); font-size:14px; outline:none;"
                        onkeypress="handleAngelSearch(event)"
                    >
                </div>
                
                <!-- Результаты поиска -->
                <div id="angelResults" style="max-height:300px; overflow-y:auto; font-size:14px; line-height:1.5;">
                    <div style="color:var(--text-secondary); text-align:center; padding:10px;">
                        Задай вопрос, и я помогу! 💫
                    </div>
                </div>
                
                <!-- Быстрые подсказки -->
                <div style="margin-top:12px; padding-top:12px; border-top:1px solid var(--border);">
                    <div style="font-size:12px; color:var(--text-secondary); margin-bottom:8px;">Популярные вопросы:</div>
                    <div style="display:flex; flex-wrap:wrap; gap:6px;">
                        <button class="angel-quick-btn" onclick="quickSearch('лимит постов')">Лимит постов</button>
                        <button class="angel-quick-btn" onclick="quickSearch('как сменить аватар')">Аватар</button>
                        <button class="angel-quick-btn" onclick="quickSearch('ночной режим')">Ночной режим</button>
                        <button class="angel-quick-btn" onclick="quickSearch('друзья')">Друзья</button>
                    </div>
                </div>
            </div>
            <div class="angel-bubble" id="angelBubble" onclick="toggleAngelWindow()">👼</div>
        </div>
    `;    
    document.body.insertAdjacentHTML('beforeend', widgetHTML);
    addAngelStyles();
    setupScrollBehavior();
}

function toggleAngelWindow() {
    const window = document.getElementById('angelWindow');
    if (window.style.display === 'block') {
        closeAngelWindow();
    } else {
        window.style.display = 'block';
        document.getElementById('angelSearch').focus();
    }
}

function closeAngelWindow() {
    const window = document.getElementById('angelWindow');
    window.style.display = 'none';
}

function handleAngelSearch(event) {
    if (event.key === 'Enter') {
        const query = document.getElementById('angelSearch').value.trim();
        if (query) {
            searchKnowledgeBase(query);
        }
    }
}

function quickSearch(query) {
    document.getElementById('angelSearch').value = query;
    searchKnowledgeBase(query);
}

function searchKnowledgeBase(query) {
    const resultsDiv = document.getElementById('angelResults');
    const queryLower = query.toLowerCase();
    
    // Ищем совпадения по ключевым словам
    const results = knowledgeBase.filter(item => 
        item.keywords.some(keyword => queryLower.includes(keyword) || keyword.includes(queryLower))
    );
    
    if (results.length > 0) {
        // Показываем найденные ответы
        resultsDiv.innerHTML = results.map(item => `
            <div style="background:var(--bg-primary); padding:12px; border-radius:8px; margin-bottom:8px; border-left:3px solid var(--accent);">
                ${item.answer}
            </div>        `).join('');
    } else {
        // Если ничего не найдено
        resultsDiv.innerHTML = `
            <div style="background:var(--bg-primary); padding:12px; border-radius:8px; text-align:center; color:var(--text-secondary);">
                😔 Не удалось найти ответ на вопрос "<strong>${query}</strong>"<br><br>
                Попробуй сформулировать иначе или выбери из популярных вопросов ниже.
            </div>
        `;
    }
}

function addAngelStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .angel-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 999;
            transition: all 0.3s ease;
        }
        
        .angel-widget.hidden {
            transform: translateY(100px);
            opacity: 0;
        }
        
        .angel-bubble {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: var(--accent);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 12px var(--shadow);
            font-size: 28px;
            color: white;
            transition: all 0.3s ease;
            opacity: 0.85;
        }
        
        .angel-bubble:hover {
            opacity: 1;
            transform: scale(1.1);
        }
        
        .angel-window {            position: absolute;
            bottom: 70px;
            right: 0;
            width: 340px;
            max-width: calc(100vw - 40px);
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 16px;
            box-shadow: 0 8px 32px var(--shadow);
            display: none;
            animation: slideUp 0.3s ease;
        }
        
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .angel-quick-btn {
            background: var(--bg-primary);
            border: 1px solid var(--border);
            padding: 6px 12px;
            border-radius: 12px;
            font-size: 12px;
            cursor: pointer;
            color: var(--text-secondary);
            transition: all 0.2s ease;
        }
        
        .angel-quick-btn:hover {
            background: var(--accent);
            color: white;
            border-color: var(--accent);
        }
        
        @media (max-width: 768px) {
            .angel-bubble {
                width: 48px;
                height: 48px;
                font-size: 24px;
                opacity: 0.75;
            }
            
            .angel-window {
                width: 300px;
                bottom: 60px;
                right: -10px;
            }
        }        
        @media (max-width: 360px) {
            .angel-bubble {
                width: 44px;
                height: 44px;
                font-size: 22px;
            }
            
            .angel-window {
                width: 280px;
            }
        }
    `;
    document.head.appendChild(style);
}

function setupScrollBehavior() {
    let lastScrollY = window.scrollY;
    const widget = document.getElementById('angelWidget');
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            widget.classList.add('hidden');
        } else {
            widget.classList.remove('hidden');
        }
        
        lastScrollY = currentScrollY;
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            widget.classList.remove('hidden');
        }, 2000);
    }, { passive: true });
}

// Запускаем при загрузке
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAngelWidget);
} else {
    initAngelWidget();
          }
