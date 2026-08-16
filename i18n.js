const i18n_dict = {
    ru: { 
        // Меню
        nav_feed: "📰 Лента", nav_search: "🔍 Поиск", nav_chat: " Чат", 
        nav_guests: " Гости", nav_friends: "👥 Друзья", nav_about: "ℹ️ О сайте", nav_logout: "Выйти",
        // Лента
        feed_placeholder: "Что у вас нового?", feed_link_placeholder: "Ссылка (YouTube, MP3...)",
        feed_publish: "Опубликовать", feed_loading: "Загрузка...",
        feed_limit_default: "Лимит: 10 постов в сутки", feed_limit_exhausted: "Лимит исчерпан на сегодня ✨",
        feed_night_mode: "Ночной режим 🌙", feed_night_alert: "🌙 Ночной режим: с 23:00 до 07:00 публикация запрещена. Отдохни, мир подождёт твоих мыслей до утра!",
        feed_publish_available: "Публикация доступна с 07:00 до 23:00", feed_posts_left: "Осталось постов сегодня: ",
        feed_read_more: "Читать еще...", feed_collapse: "Свернуть",
        feed_play: "▶ Играть / Показать", feed_hide: "⏸ Скрыть",
        feed_delete_confirm: "Удалить?", feed_edit_prompt: "Редактировать:",
        // Чат
        chat_placeholder: "Написать сообщение...", chat_empty: "Выберите диалог слева, чтобы начать общение 💬",
        chat_loading: "Загрузка...", chat_no_messages: "Пока нет сообщений", chat_start_first: "Начните общение первым! 👋",
        chat_edit_prompt: "Редактировать сообщение:", chat_delete_confirm: "Удалить сообщение?",
        // Профиль
        profile_edit: "✏️ Редактировать профиль", profile_save: "Сохранить", profile_cancel: "Отмена",
        profile_name: "Имя:", profile_bio: "Статус (о себе):", profile_bio_placeholder: "Пара слов о себе...",
        profile_posts: "📁 Мои публикации", profile_no_posts: "Публикаций пока нет 🌙",
        profile_days: "дней с нами", profile_posts_count: "постов", profile_likes_count: "лайков собрано",
        profile_edit_avatar: "Сменить аватар", profile_empty_name: "Имя не может быть пустым", profile_error_db: "Ошибка: ", profile_error_upload: "Не удалось загрузить аватар",
        profile_add_friend: " Добавить в друзья", profile_subscribed: "✓ Вы подписаны", 
        profile_pending: " Ожидает подтверждения", profile_accepted: " В друзьях", profile_accept_req: "✅ Принять заявку",
        profile_write: " Написать", profile_back: "← Вернуться в ленту", profile_not_found: "Пользователь не найден",
        // Гости
        guests_title: "👀 Мои гости", guests_empty: "Пока никто не заходил в гости 🌙",
        // Поиск
        search_placeholder: "Поиск по имени или статусу...", search_empty: "Введите минимум 2 символа для поиска",
        search_loading: "Ищем...", search_not_found: "Никого не найдено. Попробуй изменить запрос.",
        // Друзья
        friends_title: "👥 Мои друзья", friends_empty: "У тебя пока нет друзей. Найди их через поиск! 🔍",
        req_title: "Заявки в друзья", req_empty: "Нет новых заявок 🌙",
        btn_delete: "Удалить", btn_accept: "Принять", btn_reject: "Отклонить",
        delete_confirm: "Удалить ", friends_delete_confirm: " из друзей?", accept_confirm: "Вы уверены, что хотите принять заявку?", reject_confirm: "Вы уверены, что хотите отклонить заявку?"
    },
    en: { 
        nav_feed: "📰 Feed", nav_search: "🔍 Search", nav_chat: "💬 Chat", 
        nav_guests: "👀 Guests", nav_friends: "👥 Friends", nav_about: "ℹ️ About", nav_logout: "Logout",
        feed_placeholder: "What's new?", feed_link_placeholder: "Link (YouTube, MP3...)",
        feed_publish: "Publish", feed_loading: "Loading...",
        feed_limit_default: "Limit: 10 posts per day", feed_limit_exhausted: "Daily limit reached ✨",
        feed_night_mode: "Night mode 🌙", feed_night_alert: "🌙 Night mode: posting is disabled from 23:00 to 07:00. Rest, the world can wait!",
        feed_publish_available: "Posting available from 07:00 to 23:00", feed_posts_left: "Posts left today: ",
        feed_read_more: "Read more...", feed_collapse: "Collapse",
        feed_play: "▶ Play / Show", feed_hide: "⏸ Hide",
        feed_delete_confirm: "Delete?", feed_edit_prompt: "Edit:",
        chat_placeholder: "Type a message...", chat_empty: "Select a chat to start messaging 💬",
        chat_loading: "Loading...", chat_no_messages: "No messages yet", chat_start_first: "Start the conversation! 👋",
        chat_edit_prompt: "Edit message:", chat_delete_confirm: "Delete message?",
        profile_edit: "✏️ Edit profile", profile_save: "Save", profile_cancel: "Cancel",
        profile_name: "Name:", profile_bio: "Bio:", profile_bio_placeholder: "A few words about yourself...",
        profile_posts: "📁 My posts", profile_no_posts: "No posts yet 🌙",
        profile_days: "days with us", profile_posts_count: "posts", profile_likes_count: "likes collected",
        profile_edit_avatar: "Change avatar", profile_empty_name: "Name cannot be empty", profile_error_db: "Error: ", profile_error_upload: "Failed to upload avatar",
        profile_add_friend: " Add friend", profile_subscribed: "✓ Subscribed", 
        profile_pending: "⏳ Pending", profile_accepted: "👥 Friends", profile_accept_req: "✅ Accept request",
        profile_write: "💬 Message", profile_back: "← Back to feed", profile_not_found: "User not found",
        guests_title: "👀 My guests", guests_empty: "No guests yet 🌙",
        search_placeholder: "Search by name or status...", search_empty: "Enter at least 2 characters",
        search_loading: "Searching...", search_not_found: "Nobody found. Try a different query.",
        friends_title: "👥 My friends", friends_empty: "No friends yet. Find them via search! 🔍",
        req_title: "Friend requests", req_empty: "No new requests 🌙",
        btn_delete: "Delete", btn_accept: "Accept", btn_reject: "Reject",
        delete_confirm: "Delete ", friends_delete_confirm: " from friends?", accept_confirm: "Are you sure you want to accept?", reject_confirm: "Are you sure you want to reject?"
    },
    uk: { 
        nav_feed: "📰 Стрічка", nav_search: "🔍 Пошук", nav_chat: "💬 Чат", 
        nav_guests: "👀 Гості", nav_friends: "👥 Друзі", nav_about: "ℹ️ Про сайт", nav_logout: "Вийти",
        feed_placeholder: "Що нового?", feed_link_placeholder: "Посилання (YouTube, MP3...)",
        feed_publish: "Опублікувати", feed_loading: "Завантаження...",
        feed_limit_default: "Ліміт: 10 постів на добу", feed_limit_exhausted: "Ліміт вичерпано ",
        feed_night_mode: "Нічний режим 🌙", feed_night_alert: "🌙 Нічний режим: публікація заборонена з 23:00 до 07:00.",
        feed_publish_available: "Публікація доступна з 07:00 до 23:00", feed_posts_left: "Залишилось постів сьогодні: ",
        feed_read_more: "Читати далі...", feed_collapse: "Згорнути",
        feed_play: "▶ Грати / Показати", feed_hide: "⏸ Сховати",
        feed_delete_confirm: "Видалити?", feed_edit_prompt: "Редагувати:",
        chat_placeholder: "Написати повідомлення...", chat_empty: "Оберіть діалог зліва 💬",
        chat_loading: "Завантаження...", chat_no_messages: "Поки що немає повідомлень", chat_start_first: "Почніть спілкування першим! 👋",
        chat_edit_prompt: "Редагувати повідомлення:", chat_delete_confirm: "Видалити повідомлення?",
        profile_edit: "✏️ Редагувати профіль", profile_save: "Зберегти", profile_cancel: "Скасувати",
        profile_name: "Ім'я:", profile_bio: "Статус:", profile_bio_placeholder: "Кілька слів про себе...",
        profile_posts: "📁 Мої публікації", profile_no_posts: "Публікацій поки що немає 🌙",
        profile_days: "днів з нами", profile_posts_count: "постів", profile_likes_count: "лайків зібрано",
        profile_edit_avatar: "Змінити аватар", profile_empty_name: "Ім'я не може бути порожнім", profile_error_db: "Помилка: ", profile_error_upload: "Не вдалося завантажити аватар",
        profile_add_friend: "➕ Додати в друзі", profile_subscribed: "✓ Ви підписані", 
        profile_pending: "⏳ Очікує підтвердження", profile_accepted: " У друзях", profile_accept_req: "✅ Прийняти заявку",
        profile_write: "💬 Написати", profile_back: "← Повернутися до стрічки", profile_not_found: "Користувача не знайдено",
        guests_title: "👀 Мої гості", guests_empty: "Поки що ніхто не заходив 🌙",
        search_placeholder: "Пошук за ім'ям або статусом...", search_empty: "Введіть мінімум 2 символи",
        search_loading: "Шукаємо...", search_not_found: "Нікого не знайдено.",
        friends_title: "👥 Мої друзі", friends_empty: "У тебе поки що немає друзів ",
        req_title: "Заявки в друзі", req_empty: "Немає нових заявок 🌙",
        btn_delete: "Видалити", btn_accept: "Прийняти", btn_reject: "Відхилити",
        delete_confirm: "Видалити ", friends_delete_confirm: " з друзів?", accept_confirm: "Прийняти заявку?", reject_confirm: "Відхилити заявку?"
    },
    es: { 
        nav_feed: " Inicio", nav_search: "🔍 Buscar", nav_chat: "💬 Chat", 
        nav_guests: "👀 Visitas", nav_friends: "👥 Amigos", nav_about: "ℹ️ Acerca de", nav_logout: "Salir",
        feed_placeholder: "¿Qué hay de nuevo?", feed_link_placeholder: "Enlace (YouTube, MP3...)",
        feed_publish: "Publicar", feed_loading: "Cargando...",
        feed_limit_default: "Límite: 10 publicaciones al día", feed_limit_exhausted: "Límite diario alcanzado ✨",
        feed_night_mode: "Modo nocturno 🌙", feed_night_alert: " Modo nocturno: publicación deshabilitada de 23:00 a 07:00.",
        feed_publish_available: "Publicación disponible de 07:00 a 23:00", feed_posts_left: "Publicaciones restantes hoy: ",
        feed_read_more: "Leer más...", feed_collapse: "Contraer",
        feed_play: "▶ Reproducir / Mostrar", feed_hide: "⏸ Ocultar",
        feed_delete_confirm: "¿Eliminar?", feed_edit_prompt: "Editar:",
        chat_placeholder: "Escribe un mensaje...", chat_empty: "Selecciona un chat 💬",
        chat_loading: "Cargando...", chat_no_messages: "Aún no hay mensajes", chat_start_first: "¡Inicia la conversación! 👋",
        chat_edit_prompt: "Editar mensaje:", chat_delete_confirm: "¿Eliminar mensaje?",
        profile_edit: "✏️ Editar perfil", profile_save: "Guardar", profile_cancel: "Cancelar",
        profile_name: "Nombre:", profile_bio: "Bio:", profile_bio_placeholder: "Unas palabras sobre ti...",
        profile_posts: "📁 Mis publicaciones", profile_no_posts: "Aún no hay publicaciones 🌙",
        profile_days: "días con nosotros", profile_posts_count: "publicaciones", profile_likes_count: "me gusta",
        profile_edit_avatar: "Cambiar avatar", profile_empty_name: "El nombre no puede estar vacío", profile_error_db: "Error: ", profile_error_upload: "Error al subir avatar",
        profile_add_friend: "➕ Añadir amigo", profile_subscribed: "✓ Suscrito", 
        profile_pending: "⏳ Pendiente", profile_accepted: "👥 Amigos", profile_accept_req: "✅ Aceptar solicitud",
        profile_write: "💬 Mensaje", profile_back: "← Volver al inicio", profile_not_found: "Usuario no encontrado",
        guests_title: "👀 Mis visitas", guests_empty: "Aún nadie te ha visitado 🌙",
        search_placeholder: "Buscar por nombre o estado...", search_empty: "Introduce al menos 2 caracteres",
        search_loading: "Buscando...", search_not_found: "Nadie encontrado.",
        friends_title: " Mis amigos", friends_empty: "Aún no tienes amigos 🔍",
        req_title: "Solicitudes de amistad", req_empty: "No hay nuevas solicitudes 🌙",
        btn_delete: "Eliminar", btn_accept: "Aceptar", btn_reject: "Rechazar",
        delete_confirm: "¿Eliminar ", friends_delete_confirm: " de amigos?", accept_confirm: "¿Aceptar solicitud?", reject_confirm: "¿Rechazar solicitud?"
    },
    de: { 
        nav_feed: "📰 Feed", nav_search: "🔍 Suche", nav_chat: "💬 Chat", 
        nav_guests: "👀 Gäste", nav_friends: " Freunde", nav_about: "ℹ️ Über uns", nav_logout: "Abmelden",
        feed_placeholder: "Was gibt's Neues?", feed_link_placeholder: "Link (YouTube, MP3...)",
        feed_publish: "Veröffentlichen", feed_loading: "Laden...",
        feed_limit_default: "Limit: 10 Beiträge pro Tag", feed_limit_exhausted: "Tageslimit erreicht ✨",
        feed_night_mode: "Nachtmodus ", feed_night_alert: "🌙 Nachtmodus: Veröffentlichung von 23:00 bis 07:00 deaktiviert.",
        feed_publish_available: "Veröffentlichung von 07:00 bis 23:00 möglich", feed_posts_left: "Verbleibende Beiträge heute: ",
        feed_read_more: "Weiterlesen...", feed_collapse: "Einklappen",
        feed_play: "▶ Abspielen / Anzeigen", feed_hide: "⏸ Ausblenden",
        feed_delete_confirm: "Löschen?", feed_edit_prompt: "Bearbeiten:",
        chat_placeholder: "Nachricht schreiben...", chat_empty: "Wähle einen Chat 💬",
        chat_loading: "Laden...", chat_no_messages: "Noch keine Nachrichten", chat_start_first: "Starte das Gespräch! 👋",
        chat_edit_prompt: "Nachricht bearbeiten:", chat_delete_confirm: "Nachricht löschen?",
        profile_edit: "✏️ Profil bearbeiten", profile_save: "Speichern", profile_cancel: "Abbrechen",
        profile_name: "Name:", profile_bio: "Bio:", profile_bio_placeholder: "Ein paar Worte über dich...",
        profile_posts: "📁 Meine Beiträge", profile_no_posts: "Noch keine Beiträge ",
        profile_days: "Tage bei uns", profile_posts_count: "Beiträge", profile_likes_count: "Likes erhalten",
        profile_edit_avatar: "Avatar ändern", profile_empty_name: "Name darf nicht leer sein", profile_error_db: "Fehler: ", profile_error_upload: "Avatar-Upload fehlgeschlagen",
        profile_add_friend: "➕ Freund hinzufügen", profile_subscribed: "✓ Abonniert", 
        profile_pending: " Ausstehend", profile_accepted: " Freunde", profile_accept_req: "✅ Anfrage annehmen",
        profile_write: "💬 Nachricht", profile_back: "← Zurück zum Feed", profile_not_found: "Benutzer nicht gefunden",
        guests_title: "👀 Meine Gäste", guests_empty: "Noch keine Gäste 🌙",
        search_placeholder: "Suche nach Name oder Status...", search_empty: "Mindestens 2 Zeichen eingeben",
        search_loading: "Suche...", search_not_found: "Niemand gefunden.",
        friends_title: " Meine Freunde", friends_empty: "Du hast noch keine Freunde 🔍",
        req_title: "Freundschaftsanfragen", req_empty: "Keine neuen Anfragen 🌙",
        btn_delete: "Löschen", btn_accept: "Annehmen", btn_reject: "Ablehnen",
        delete_confirm: "Löschen ", friends_delete_confirm: " aus Freunden?", accept_confirm: "Anfrage annehmen?", reject_confirm: "Anfrage ablehnen?"
    }
};

function t(key) {
    const lang = localStorage.getItem('lang') || 'ru';
    return i18n_dict[lang]?.[key] || i18n_dict['ru'][key] || key; 
}

function applyTranslations() {
    const lang = localStorage.getItem('lang') || 'ru';
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
    const select = document.getElementById('langSelect');
    if (select) select.value = lang;
}

document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
    const select = document.getElementById('langSelect');
    if (select) {
        select.addEventListener('change', (e) => {
            localStorage.setItem('lang', e.target.value);
            applyTranslations();
        });
    }
});
