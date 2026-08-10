// i18n.js — Мультиязычность Smart Social
const translations = {
    ru: {
        pageTitle: 'Вход | Smart Social',
        title: '🔐 Smart Social',
        subtitle: 'Войдите или создайте аккаунт. Если email не зарегистрирован, он создастся автоматически.',
        usernameLabel: 'Имя пользователя',
        usernamePlaceholder: 'Введите имя',
        passwordLabel: 'Пароль',
        passwordPlaceholder: 'Минимум 4 символа',
        genderLabel: 'Пол',
        male: 'Мужской',
        female: 'Женский',
        submitBtn: 'Войти / Зарегистрироваться',
        processing: 'Обработка...',
        forgotPassword: '📧 Забыли пароль?',
        aboutLink: '← О сайте',
        consoleTitle: '💻 Системный журнал',
        waiting: '⏳ Ожидание действий...',
        chatGreeting: 'Привет! Если не получается войти, проверь почту и пароль. 👋'
    },
    en: {
        pageTitle: 'Login | Smart Social',
        title: '🔐 Smart Social',
        subtitle: 'Sign in or create an account. If the email is not registered, it will be created automatically.',
        usernameLabel: 'Username',
        usernamePlaceholder: 'Enter username',
        passwordLabel: 'Password',
        passwordPlaceholder: 'At least 4 characters',
        genderLabel: 'Gender',
        male: 'Male',
        female: 'Female',
        submitBtn: 'Sign In / Register',
        processing: 'Processing...',
        forgotPassword: '📧 Forgot password?',
        aboutLink: '← About',
        consoleTitle: '💻 System Log',
        waiting: '⏳ Waiting for actions...',
        chatGreeting: 'Hi! If you can\'t log in, check your email and password. 👋'
    },
    es: {
        pageTitle: 'Entrada | Smart Social',
        title: '🔐 Smart Social',
        subtitle: 'Inicia sesión o crea una cuenta. Si el correo no está registrado, se creará automáticamente.',
        usernameLabel: 'Nombre de usuario',
        usernamePlaceholder: 'Ingresa nombre',
        passwordLabel: 'Contraseña',
        passwordPlaceholder: 'Mínimo 4 caracteres',
        genderLabel: 'Género',
        male: 'Masculino',        female: 'Femenino',
        submitBtn: 'Entrar / Registrarse',
        processing: 'Procesando...',
        forgotPassword: '📧 ¿Olvidaste la contraseña?',
        aboutLink: '← Acerca de',
        consoleTitle: '💻 Registro del sistema',
        waiting: '⏳ Esperando acciones...',
        chatGreeting: '¡Hola! Si no puedes entrar, revisa tu correo y contraseña. 👋'
    },
    uk: {
        pageTitle: 'Вхід | Smart Social',
        title: '🔐 Smart Social',
        subtitle: 'Увійдіть або створіть акаунт. Якщо email не зареєстровано, він створиться автоматично.',
        usernameLabel: "Ім'я користувача",
        usernamePlaceholder: "Введіть ім'я",
        passwordLabel: 'Пароль',
        passwordPlaceholder: 'Мінімум 4 символи',
        genderLabel: 'Стать',
        male: 'Чоловіча',
        female: 'Жіноча',
        submitBtn: 'Увійти / Зареєструватися',
        processing: 'Обробка...',
        forgotPassword: '📧 Забули пароль?',
        aboutLink: '← Про сайт',
        consoleTitle: '💻 Системний журнал',
        waiting: '⏳ Очікування дій...',
        chatGreeting: 'Привіт! Якщо не вдається увійти, перевір пошту та пароль. 👋'
    },
    de: {
        pageTitle: 'Anmeldung | Smart Social',
        title: '🔐 Smart Social',
        subtitle: 'Einloggen oder Konto erstellen. Wenn die E-Mail nicht registriert ist, wird sie automatisch erstellt.',
        usernameLabel: 'Benutzername',
        usernamePlaceholder: 'Name eingeben',
        passwordLabel: 'Passwort',
        passwordPlaceholder: 'Mindestens 4 Zeichen',
        genderLabel: 'Geschlecht',
        male: 'Männlich',
        female: 'Weiblich',
        submitBtn: 'Einloggen / Registrieren',
        processing: 'Verarbeitung...',
        forgotPassword: '📧 Passwort vergessen?',
        aboutLink: '← Über uns',
        consoleTitle: '💻 Systemprotokoll',
        waiting: '⏳ Warte auf Aktionen...',
        chatGreeting: 'Hallo! Wenn der Login nicht klappt, überprüfe E-Mail und Passwort. 👋'
    }
};

function applyLanguage(lang) {    const t = translations[lang];
    if (!t) return;

    document.title = t.pageTitle;
    
    const map = {
        '.auth-header h1': t.title,
        '.auth-header p': t.subtitle,
        'label[for="username"]': t.usernameLabel,
        'label[for="password"]': t.passwordLabel,
        '.gender-label': t.genderLabel,
        'label[for="male"]': t.male,
        'label[for="female"]': t.female,
        '.console-header': t.consoleTitle,
        '.footer-link a': t.forgotPassword,
        '.about-link': t.aboutLink
    };

    for (const [selector, text] of Object.entries(map)) {
        const el = document.querySelector(selector);
        if (el) el.textContent = text;
    }

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    if (usernameInput) usernameInput.placeholder = t.usernamePlaceholder;
    if (passwordInput) passwordInput.placeholder = t.passwordPlaceholder;

    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn && !submitBtn.disabled) {
        submitBtn.textContent = t.submitBtn;
    }

    // Обновляем приветствие чата, если бот уже отображается
    const chatText = document.querySelector('.chat-message-text');
    if (chatText) chatText.textContent = t.chatGreeting;
}