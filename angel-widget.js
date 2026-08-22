cat > angel-widget.js << 'EOF'
#!/usr/bin/env node

// ============================================================
//  👼 АНГЕЛ-ХРАНИТЕЛЬ SMART SOCIAL
//  Версия: 3.0
//  Описание: Интеллектуальный помощник с интеграцией Ollama
//  Автор: Торопцев Дмитрий
//  Лицензия: MIT
// ============================================================

const axios = require('axios');
const readline = require('readline');

// ============================================================
//  БАЗА ЗНАНИЙ (быстрые ответы без Ollama)
// ============================================================
const knowledgeBase = [
    {
        keywords: ['лимит', 'пост', 'публикация', 'сколько', 'можно'],
        answer: '📊 Лимит публикаций: 10 постов в сутки. Сброс в 00:00.'
    },
    {
        keywords: ['ночной', 'режим', 'ночь', 'время', '23', '7'],
        answer: '🌙 Ночной режим: публикации доступны с 07:00 до 23:00.'
    },
    {
        keywords: ['аватар', 'фото', 'загрузить', 'сменить'],
        answer: '📷 Сменить аватар можно в профиле. Максимальный размер — 5MB.'
    },
    {
        keywords: ['пароль', 'сменить', 'изменить', 'безопасность'],
        answer: '🔐 Сменить пароль можно в разделе "Профиль". Минимум 6 символов.'
    },
    {
        keywords: ['друзья', 'заявка', 'добавить', 'принять'],
        answer: '👥 Заявки в друзья обрабатываются в разделе "Друзья".'
    },
    {
        keywords: ['чат', 'сообщение', 'написать', 'удалить'],
        answer: '💬 В чате можно писать, редактировать и удалять свои сообщения.'
    },
    {
        keywords: ['гости', 'заходил', 'профиль', 'визиты'],
        answer: '👀 Раздел "Гости" показывает, кто заходил в ваш профиль.'
    },
    {
        keywords: ['удалить', 'аккаунт', 'профиль'],
        answer: '❌ Удаление аккаунта временно недоступно. Обратитесь в поддержку.'
    },
    {
        keywords: ['язык', 'перевод', 'русский', 'украинский', 'english'],
        answer: '🌍 Доступны языки: русский, украинский, английский, испанский, немецкий.'
    },
    {
        keywords: ['тема', 'темная', 'светлая', 'ночная'],
        answer: '🎨 Переключить тему можно кнопкой 🌙/☀️ в левом нижнем углу.'
    },
    {
        keywords: ['поиск', 'найти', 'люди', 'пользователи'],
        answer: '🔍 В разделе "Поиск" можно найти пользователей по имени или статусу.'
    },
    {
        keywords: ['ошибка', 'не работает', 'баг', 'проблема'],
        answer: '🆘 Обновите страницу (F5). Если проблема осталась — напишите в поддержку.'
    },
    {
        keywords: ['регистрация', 'забыл пароль', 'восстановить'],
        answer: '📝 Для восстановления пароля напишите на почту smartsocials@mail.ru'
    },
    {
        keywords: ['новости', 'обновления', 'канал', 'max'],
        answer: '📢 Следите за новостями в канале MAX: https://max.ru/channel_SmartSocial_news'
    }
];

// ============================================================
//  НАСТРОЙКИ ПОДКЛЮЧЕНИЯ
// ============================================================
const OLLAMA_HOST = 'http://192.168.0.102:11434';
const MODEL_NAME = 'qwen2.5:1.5b';

// ============================================================
//  ПОИСК В БАЗЕ ЗНАНИЙ
// ============================================================
function searchKnowledgeBase(query) {
    const lower = query.toLowerCase();
    for (const item of knowledgeBase) {
        if (item.keywords.some(keyword => lower.includes(keyword) || keyword.includes(lower))) {
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
Ты — Ангел-Хранитель социальной сети Smart Social.

ПРАВИЛА ОТВЕТОВ:
1. Отвечай ТОЛЬКО на русском языке, грамотно и литературно.
2. Не коверкай слова. Пиши чётко, как редактор.
3. Структура: факт → пояснение → вывод (если нужно).
4. Не повторяйся. Не используй шаблонные фразы.
5. Если вопрос не по теме — мягко направь пользователя.
6. Если не знаешь ответа — предложи написать на почту.

ИНФОРМАЦИЯ О ПРОЕКТЕ:
• Название: Smart Social
• Дата основания: 9 мая 2026 года
• Создатель: Торопцев Дмитрий
• Миссия: умная, безопасная и вдохновляющая соцсеть с ИИ
• Сайты:
  — https://smartsocial-xi.vercel.app
  — https://angel-adel.github.io/smartsocial
• Почта поддержки: smartsocials@mail.ru

ТЫ — ЭКСПЕРТ. Отвечай уверенно, ясно, без воды.
`;

        const response = await axios.post(`${OLLAMA_HOST}/api/generate`, {
            model: MODEL_NAME,
            prompt: `${systemPrompt}\n\nВопрос пользователя: ${question}\n\nОтвет:`,
            stream: false,
            options: {
                num_predict: 200,
                temperature: 0.2,
                top_p: 0.85,
                repeat_penalty: 1.2,
                stop: ['\n\n\n']
            }
        });

        let answer = response.data.response || '❓ Не нашли ответа? Напишите нам: smartsocials@mail.ru';
        return answer.trim();
    } catch (error) {
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
//  CLI-ИНТЕРФЕЙС
// ============================================================
async function main() {
    console.log('👼 Ангел-Хранитель Smart Social v3.0');
    console.log(`📡 Подключён к Ollama: ${OLLAMA_HOST}`);
    console.log(`🧠 Модель: ${MODEL_NAME}`);
    console.log(`📚 База знаний: ${knowledgeBase.length} тем`);
    console.log('💬 Введите вопрос (или "выход" для выхода):');

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

// ============================================================
//  ТЕСТОВЫЙ РЕЖИМ
// ============================================================
if (process.argv[2]) {
    const query = process.argv.slice(2).join(' ');
    handleQuery(query)
        .then(answer => console.log(answer))
        .catch(err => console.error('Ошибка:', err.message));
} else {
    main();
}
EOF
