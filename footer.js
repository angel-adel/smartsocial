// footer.js
document.addEventListener('DOMContentLoaded', () => {
    const year = new Date().getFullYear();

    // Создаём обёртку, если её нет
    let container = document.querySelector('.container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'container';
        container.style.cssText = 'max-width: 600px; margin: 0 auto; padding: 0 16px;';
        // Переносим всё содержимое body в контейнер
        while (document.body.firstChild) {
            container.appendChild(document.body.firstChild);
        }
        document.body.appendChild(container);
    }

    // Добавляем футер внутрь контейнера
    const footer = document.createElement('footer');
    footer.style.cssText = `
        text-align: center;
        padding: 20px 0 10px;
        font-size: 13px;
        color: #6b6b80;
        border-top: 1px solid #e9d9ff;
        margin-top: 30px;
    `;
    footer.textContent = `© ${year} Smart Social. Все права защищены. 🌙`;
    container.appendChild(footer);
});
