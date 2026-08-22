cat > angel-widget-test.js << 'EOF'
(function() {
    console.log('👼 Тестовый виджет загружен');

    function initAngelWidget() {
        console.log('👼 initAngelWidget вызван');

        var style = document.createElement('style');
        style.textContent = `
            .angel-widget { position: fixed; bottom: 20px; right: 20px; z-index: 999999; }
            .angel-bubble {
                width: 56px; height: 56px; border-radius: 50%;
                background: #4A6CF7; display: flex; align-items: center; justify-content: center;
                cursor: pointer; font-size: 28px; color: white;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            }
            .angel-window {
                position: absolute; bottom: 70px; right: 0;
                width: 340px; background: white; border: 1px solid #ddd;
                border-radius: 16px; padding: 16px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.2);
                display: none; color: black;
            }
        `;
        document.head.appendChild(style);

        document.body.insertAdjacentHTML('beforeend', `
            <div class="angel-widget" id="angelWidget">
                <div class="angel-window" id="angelWindow">
                    <div style="display:flex; justify-content:space-between;">
                        <strong>👼 Ангел-Хранитель</strong>
                        <span style="cursor:pointer;" onclick="closeAngelWindow()">✕</span>
                    </div>
                    <div style="margin:10px 0;">
                        <input type="text" id="angelSearch" placeholder="Спроси о Smart Social..."
                            style="width:100%; padding:10px; border:1px solid #ccc; border-radius:8px;">
                    </div>
                    <div id="angelResults">Тестовый виджет работает! ✅</div>
                    <button onclick="quickSearch('тест')">Тест</button>
                </div>
                <div class="angel-bubble" id="angelBubble" onclick="toggleAngelWindow()">👼</div>
            </div>
        `);

        window.toggleAngelWindow = function() {
            var window = document.getElementById('angelWindow');
            var bubble = document.getElementById('angelBubble');
            if (window.style.display === 'block') {
                window.style.display = 'none';
                bubble.style.display = 'flex';
            } else {
                window.style.display = 'block';
                bubble.style.display = 'none';
            }
        };

        window.closeAngelWindow = function() {
            document.getElementById('angelWindow').style.display = 'none';
            document.getElementById('angelBubble').style.display = 'flex';
        };

        window.quickSearch = function() {
            document.getElementById('angelResults').innerHTML = '✅ Кнопка работает!';
        };

        console.log('👼 Виджет успешно инициализирован');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAngelWidget);
    } else {
        initAngelWidget();
    }
})();
EOF
