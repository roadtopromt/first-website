// script.js
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleButton = document.getElementById('themeToggle');
    const body = document.body;
    
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme');
    
    // Если тема была сохранена, применяем ее
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        updateButtonText();
        console.log('Применили сохранённую тёмную тему');
    }
    
    // Вешаем обработчик на кнопку
    themeToggleButton.addEventListener('click', function() {
        console.log('Клик! Текущие классы body:', body.classList);
        
        // Переключаем тему
        body.classList.toggle('dark-theme');
        
        console.log('Классы после toggle:', body.classList);
        
        // Сохраняем выбор пользователя
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            console.log('Сохранили тёмную тему');
        } else {
            localStorage.setItem('theme', 'light');
            console.log('Сохранили светлую тему');
        }
        
        // Обновляем текст кнопки
        updateButtonText();
    });
    
    // Функция для обновления текста кнопки
    function updateButtonText() {
        if (body.classList.contains('dark-theme')) {
            themeToggleButton.textContent = '☀️ Светлая тема';
            console.log('Сменили текст на: Светлая тема');
        } else {
            themeToggleButton.textContent = '🌙 Тёмная тема';
            console.log('Сменили текст на: Тёмная тема');
        }
    }
});