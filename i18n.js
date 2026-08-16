// 1. СЛОВАРЬ ПЕРЕВОДОВ
const i18n_dict = {
    ru: { 
        nav_feed: "📰 Лента", nav_search: " Поиск", nav_chat: "💬 Чат", 
        nav_guests: "👀 Гости", nav_friends: "👥 Друзья", nav_about: "ℹ️ О сайте", nav_logout: "Выйти",
        profile_edit: "✏️ Редактировать профиль", profile_save: "Сохранить", profile_cancel: "Отмена",
        profile_posts: "📁 Мои публикации", profile_no_posts: "Публикаций пока нет ",
        profile_days: "дней с нами", profile_posts_count: "постов", profile_likes_count: "лайков собрано",
        btn_add_friend: "➕ Добавить в друзья", btn_subscribed: "✓ Вы подписаны", 
        btn_pending: "⏳ Ожидает подтверждения", btn_accepted: " В друзьях", btn_accept_req: "✅ Принять заявку",
        btn_write: "💬 Написать", btn_back: "← Вернуться в ленту",
        guests_title: "👀 Мои гости", guests_empty: "Пока никто не заходил в гости 🌙",
        chat_placeholder: "Написать сообщение...", chat_empty: "Выберите диалог слева 💬",
        search_placeholder: "Поиск по имени или статусу...", search_empty: "Введите минимум 2 символа ✏️",
        search_not_found: "Никого не найдено 😔",
        friends_title: "👥 Мои друзья", friends_empty: "У тебя пока нет друзей 🔍",
        req_title: "Заявки в друзья", req_empty: "Нет новых заявок 🌙",
        btn_delete: "Удалить", btn_accept: "Принять", btn_reject: "Отклонить"
    },
    en: { 
        nav_feed: "📰 Feed", nav_search: "🔍 Search", nav_chat: "💬 Chat", 
        nav_guests: "👀 Guests", nav_friends: " Friends", nav_about: "ℹ️ About", nav_logout: "Logout",
        profile_edit: "✏️ Edit profile", profile_save: "Save", profile_cancel: "Cancel",
        profile_posts: "📁 My posts", profile_no_posts: "No posts yet 🌙",
        profile_days: "days with us", profile_posts_count: "posts", profile_likes_count: "likes collected",
        btn_add_friend: "➕ Add friend", btn_subscribed: "✓ Subscribed", 
        btn_pending: "⏳ Pending", btn_accepted: " Friends", btn_accept_req: "✅ Accept request",
        btn_write: "💬 Message", btn_back: "← Back to feed",
        guests_title: "👀 My guests", guests_empty: "No guests yet 🌙",
        chat_placeholder: "Type a message...", chat_empty: "Select a chat 💬",
        search_placeholder: "Search by name or status...", search_empty: "Enter at least 2 chars ✏️",
        search_not_found: "Nobody found 😔",
        friends_title: "👥 My friends", friends_empty: "No friends yet 🔍",
        req_title: "Friend requests", req_empty: "No new requests 🌙",
        btn_delete: "Delete", btn_accept: "Accept", btn_reject: "Reject"
    },
    uk: { 
        nav_feed: "📰 Стрічка", nav_search: "🔍 Пошук", nav_chat: "💬 Чат", 
        nav_guests: "👀 Гості", nav_friends: "👥 Друзі", nav_about: "ℹ️ Про сайт", nav_logout: "Вийти",
        profile_edit: "✏️ Редагувати профіль", profile_save: "Зберегти", profile_cancel: "Скасувати",
        profile_posts: "📁 Мої публікації", profile_no_posts: "Публікацій поки що немає 🌙",
        profile_days: "днів з нами", profile_posts_count: "постів", profile_likes_count: "лайків зібрано",
        btn_add_friend: "➕ Додати в друзі", btn_subscribed: "✓ Ви підписані", 
        btn_pending: "⏳ Очікує підтвердження", btn_accepted: "👥 У друзях", btn_accept_req: "✅ Прийняти заявку",
        btn_write: "💬 Написати", btn_back: "← Повернутися до стрічки",
        guests_title: "👀 Мої гості", guests_empty: "Поки що ніхто не заходив 🌙",
        chat_placeholder: "Написати повідомлення...", chat_empty: "Оберіть діалог зліва ",
        search_placeholder: "Пошук за ім'ям або статусом...", search_empty: "Введіть мінімум 2 символи ✏️",
        search_not_found: "Нікого не знайдено 😔",
        friends_title: "👥 Мої друзі", friends_empty: "У тебе поки що немає друзів 🔍",
        req_title: "Заявки в друзі", req_empty: "Немає нових заявок 🌙",
        btn_delete: "Видалити", btn_accept: "Прийняти", btn_reject: "Відхилити"
    },
    es: { 
        nav_feed: "📰 Inicio", nav_search: "🔍 Buscar", nav_chat: "💬 Chat", 
        nav_guests: "👀 Visitas", nav_friends: "👥 Amigos", nav_about: "ℹ️ Acerca de", nav_logout: "Salir",
        profile_edit: "✏️ Editar perfil", profile_save: "Guardar", profile_cancel: "Cancelar",
        profile_posts: " Mis publicaciones", profile_no_posts: "Aún no hay publicaciones 🌙",
        profile_days: "días con nosotros", profile_posts_count: "publicaciones", profile_likes_count: "me gusta",
        btn_add_friend: "➕ Añadir amigo", btn_subscribed: "✓ Suscrito", 
        btn_pending: "⏳ Pendiente", btn_accepted: " Amigos", btn_accept_req: "✅ Aceptar solicitud",
        btn_write: "💬 Mensaje", btn_back: "← Volver al inicio",
        guests_title: "👀 Mis visitas", guests_empty: "Aún nadie te ha visitado 🌙",
        chat_placeholder: "Escribe un mensaje...", chat_empty: "Selecciona un chat 💬",
        search_placeholder: "Buscar por nombre o estado...", search_empty: "Introduce al menos 2 caracteres ✏️",
        search_not_found: "Nadie encontrado 😔",
        friends_title: "👥 Mis amigos", friends_empty: "Aún no tienes amigos 🔍",
        req_title: "Solicitudes de amistad", req_empty: "No hay nuevas solicitudes 🌙",
        btn_delete: "Eliminar", btn_accept: "Aceptar", btn_reject: "Rechazar"
    },
    de: { 
        nav_feed: " Feed", nav_search: "🔍 Suche", nav_chat: "💬 Chat", 
        nav_guests: "👀 Gäste", nav_friends: "👥 Freunde", nav_about: "️ Über uns", nav_logout: "Abmelden",
        profile_edit: "✏️ Profil bearbeiten", profile_save: "Speichern", profile_cancel: "Abbrechen",
        profile_posts: "📁 Meine Beiträge", profile_no_posts: "Noch keine Beiträge 🌙",
        profile_days: "Tage bei uns", profile_posts_count: "Beiträge", profile_likes_count: "Likes erhalten",
        btn_add_friend: "➕ Freund hinzufügen", btn_subscribed: "✓ Abonniert", 
        btn_pending: "⏳ Ausstehend", btn_accepted: "👥 Freunde", btn_accept_req: "✅ Anfrage annehmen",
        btn_write: "💬 Nachricht", btn_back: "← Zurück zum Feed",
        guests_title: " Meine Gäste", guests_empty: "Noch keine Gäste 🌙",
        chat_placeholder: "Nachricht schreiben...", chat_empty: "Wähle einen Chat 💬",
        search_placeholder: "Suche nach Name oder Status...", search_empty: "Mindestens 2 Zeichen eingeben ✏️",
        search_not_found: "Niemand gefunden 😔",
        friends_title: "👥 Meine Freunde", friends_empty: "Du hast noch keine Freunde 🔍",
        req_title: "Freundschaftsanfragen", req_empty: "Keine neuen Anfragen 🌙",
        btn_delete: "Löschen", btn_accept: "Annehmen", btn_reject: "Ablehnen"
    }
};

// 2. ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ (для использования внутри JS-кода)
function t(key) {
    const lang = localStorage.getItem('lang') || 'ru';
    // Возвращаем перевод, если нет — русский, если нет — сам ключ
    return i18n_dict[lang]?.[key] || i18n_dict['ru'][key] || key; 
}

// 3. ГЛАВНАЯ ФУНКЦИЯ ПРИМЕНЕНИЯ (для статического HTML)
function applyTranslations() {
    const lang = localStorage.getItem('lang') || 'ru';
    
    // Меняем текст у всех элементов с атрибутом data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });

    // Синхронизируем выпадающий список, если он есть на странице
    const select = document.getElementById('langSelect');
    if (select) select.value = lang;
}

// 4. АВТОМАТИЧЕСКИЙ ЗАПУСК
document.addEventListener('DOMContentLoaded', () => {
    applyTranslations(); // Применяем язык при загрузке страницы
    
    // Вешаем слушатель на переключатель языка
    const select = document.getElementById('langSelect');
    if (select) {
        select.addEventListener('change', (e) => {
            localStorage.setItem('lang', e.target.value);
            applyTranslations(); // Мгновенно меняем текст без перезагрузки
        });
    }
});
