// script.js
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleButton = document.getElementById('themeToggle');
    const body = document.body;
    const langButton = document.getElementById('translations');
    
    // Проверяем сохраненную тему и язык
    const savedTheme = localStorage.getItem('theme');
    const savedLang = localStorage.getItem('language') || 'ru';
    
    // Если тема была сохранена, применяем ее
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        console.log('Применили сохранённую тёмную тему');
    }
    
    // Устанавливаем язык при загрузке
    setLanguage(savedLang);
    updateLangButton(savedLang);
    updateThemeButtonText(); // Обновляем текст кнопки темы
    
    // Вешаем обработчик на кнопку темы
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
        
        // Обновляем текст кнопки темы
        updateThemeButtonText();
    });
    
    // Вешаем обработчик на кнопку перевода
    langButton.addEventListener('click', function() {
        const currentLang = localStorage.getItem('language') || 'ru';
        const newLang = currentLang === 'ru' ? 'en' : 'ru';
        
        setLanguage(newLang);
        updateLangButton(newLang);
        updateThemeButtonText(); // Обновляем также кнопку темы
    });
    
    // Функция для обновления текста кнопки темы
    function updateThemeButtonText() {
        const currentLang = localStorage.getItem('language') || 'ru';
        const isDarkTheme = body.classList.contains('dark-theme');
        
        // Определяем правильный ключ перевода
        const translationKey = isDarkTheme ? 'lightTheme' : 'darkTheme';
        
        // Обновляем текст кнопки
        themeToggleButton.textContent = translations[currentLang][translationKey];
        
        // Также обновляем data-translate атрибут для системы переводов
        themeToggleButton.setAttribute('data-translate', translationKey);
    }
    
    // Функция для обновления текста кнопки перевода
    function updateLangButton(lang) {
        langButton.textContent = translations[lang].langButton;
    }
});

// Структура для перевода (обновленная)
const translations = {
    ru: {
        title: "Моя страничка",
        greetings: "Привет, Меня зовут Никита и это мое начало в it",
        lightTheme: "Светлая тема", // Добавлено
        darkTheme: "Тёмная тема",   // Изменено с darktheme
        about: "Обо мне",
        age: "Мне 17 лет, и это мой первый опыт создания сайта.",
        hobby: "Люблю музыку, качественное кино, а также прокачивать свои навыки в чем либо.",
        media: "Соц.Сети:",
        skills: "Мои навыки",
        adaptation: "адаптация",
        musicaltaste: "музыкальный вкус",
        perseverance: "настойчивость",
        works: "Мои работы",
        linkgh: "А здесь я потом покажу свои проекты.",
        githubLink: "Мой GitHub",
        langButton: "🌐 English",
        resume: "📄 Скачать резюме",
        
    },
    en: {
        title: "My Page",
        greetings: "Hi, my name Nikita and this is my start in IT",
        lightTheme: "Light theme", // Добавлено
        darkTheme: "Dark theme",   // Изменено с darktheme
        about: "About Me",
        age: "I am 17 years old, and this is my first experience in creating a website.",
        hobby: "I love music, quality movies, and also improving my skills in anything.",
        media: "Social Media:",
        skills: "My Skills",
        adaptation: "adaptability",
        musicaltaste: "music taste",
        perseverance: "perseverance",
        works: "My Works",
        linkgh: "And here I will show my projects later.",
        githubLink: "My GitHub",
        langButton: "🌐 Русский",
        resume: "📄 Download resume",
        
    }
};

// Функция для установки языка
function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    
    // 1. Анимация исчезновения
    elements.forEach(element => {
        element.classList.add('fade-out');
    });
    
    // 2. Ждем завершения анимации и меняем текст
    setTimeout(() => {
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
            element.classList.remove('fade-out');
            element.classList.add('fade-in');
        });
        
        document.title = translations[lang].title;
        localStorage.setItem('language', lang);
        
        // 3. Убираем класс после анимации
        setTimeout(() => {
            elements.forEach(element => {
                element.classList.remove('fade-in');
            });
        }, 300);
        
    }, 300);
}