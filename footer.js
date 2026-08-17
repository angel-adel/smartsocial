document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ footer.js загружен');
    const year = new Date().getFullYear();
    const footer = document.createElement('footer');
    footer.style.cssText = `
        text-align: center;
        padding: 20px 0 10px;
        font-size: 13px;
        color: #6b6b80;
        border-top: 1px solid #e9d9ff;
        margin-top: 30px;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    `;
    footer.textContent = `© ${year} Smart Social. Все права защищены. 🌙`;
    document.body.appendChild(footer);
});
