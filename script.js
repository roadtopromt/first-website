// script.js
// Глобальная переменная для текущего языка
let currentLang = localStorage.getItem('language') || 'ru';

// Структура для перевода
const translations = {
    ru: {
        title: "Моя страничка",
        greetings: "Привет, Меня зовут Никита и это мое начало в it",
        lightTheme: "Светлая тема",
        darkTheme: "Тёмная тема",
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
        projects: "Мои проекты",
        project1Title: "Персональный сайт-портфолио",
        project1Desc: "Сайт, который вы сейчас просматриваете. Реализована тёмная тема, многоязычность и адаптивный дизайн.",
        project2Title: "Игра 'Викторина'",
        project2Desc: "Интерактивная викторина с вопросами по программированию. В разработке.",
        project3Title: "Погодное приложение", 
        project3Desc: "Приложение для просмотра погоды с использованием API. В разработке."
    },
    en: {
        title: "My Page",
        greetings: "Hi, my name Nikita and this is my start in IT",
        lightTheme: "Light theme",
        darkTheme: "Dark theme",
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
        projects: "My Projects",
        project1Title: "Personal Portfolio Website",
        project1Desc: "The website you are currently viewing. Features dark theme, multilingual support and responsive design.",
        project2Title: "Quiz Game",
        project2Desc: "Interactive programming quiz game. In development.",
        project3Title: "Weather App",
        project3Desc: "Weather application using API. In development."
    }
};

// Данные для модальных окон (только статические данные)
const projectsData = {
    portfolio: {
        technologies: ['HTML', 'CSS', 'JavaScript', 'Git'],
        github: 'https://github.com/roadtopromt/first-website',
        demo: 'https://roadtopromt.github.io/first-website'
    },
    quiz: {
        technologies: ['HTML', 'CSS', 'JavaScript'],
        github: '#',
        demo: '#'
    },
    weather: {
        technologies: ['API', 'JavaScript', 'CSS'],
        github: '#',
        demo: '#'
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
        currentLang = lang; // Обновляем глобальную переменную
        
        // 3. Убираем класс после анимации
        setTimeout(() => {
            elements.forEach(element => {
                element.classList.remove('fade-in');
            });
        }, 300);
        
    }, 300);
}

// Функция для обновления текста кнопки темы
function updateThemeButtonText() {
    const currentLang = localStorage.getItem('language') || 'ru';
    const isDarkTheme = document.body.classList.contains('dark-theme');
    const translationKey = isDarkTheme ? 'lightTheme' : 'darkTheme';
    const themeToggleButton = document.getElementById('themeToggle');
    
    if (themeToggleButton && translations[currentLang]) {
        themeToggleButton.textContent = translations[currentLang][translationKey];
        themeToggleButton.setAttribute('data-translate', translationKey);
    }
}

// Функция для обновления текста кнопки перевода
function updateLangButton(lang) {
    const langButton = document.getElementById('translations');
    if (langButton && translations[lang]) {
        langButton.textContent = translations[lang].langButton;
    }
}

// Функция для анимаций при скролле
function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll(
        '.project-card, section, h2, h1, .gallery'
    );
    
    // Добавляем классы для анимации
    elementsToAnimate.forEach((element, index) => {
        element.classList.add('fade-in');
        element.classList.add(`delay-${index % 4}`);
    });
    
    // Создаем наблюдатель
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 100);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '-50px'
    });
    
    // Начинаем наблюдать за элементами
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Функция открытия модального окна
function openModal(projectType) {
    const modal = document.getElementById('projectModal');
    const project = projectsData[projectType];
    const currentLang = localStorage.getItem('language') || 'ru';

    // Получаем переводы для заголовка и описания
    let titleKey, descKey;
    
    switch(projectType) {
        case 'portfolio':
            titleKey = 'project1Title';
            descKey = 'project1Desc';
            break;
        case 'quiz':
            titleKey = 'project2Title';
            descKey = 'project2Desc';
            break;
        case 'weather':
            titleKey = 'project3Title';
            descKey = 'project3Desc';
            break;
        default:
            titleKey = 'project1Title';
            descKey = 'project1Desc';
    }

    // Заполняем данными
    document.getElementById('modalTitle').textContent = translations[currentLang][titleKey];
    document.getElementById('modalDescription').textContent = translations[currentLang][descKey];
    
    // Технологии
    const modalTech = document.getElementById('modalTech');
    modalTech.innerHTML = '';
    project.technologies.forEach(tech => {
        const span = document.createElement('span');
        span.textContent = tech;
        modalTech.appendChild(span);
    });
    
    // Ссылки
    document.getElementById('modalGitHub').href = project.github;
    document.getElementById('modalDemo').href = project.demo;

    // Показываем модальное окно
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Функция закрытия модального окна
function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Инициализация модального окна
function initModal() {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close-modal');
    const projectCards = document.querySelectorAll('.project-card');

    // Открытие модального окна
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Проверяем, что клик не по ссылке внутри карточки
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            const projectType = this.getAttribute('data-project');
            if (projectType) {
                openModal(projectType);
            }
        });
    });

    // Закрытие модального окна
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });

    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
}

// Главная функция инициализации
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleButton = document.getElementById('themeToggle');
    const body = document.body;
    const langButton = document.getElementById('translations');
    
    // Проверяем сохраненную тему и язык
    const savedTheme = localStorage.getItem('theme');
    const savedLang = localStorage.getItem('language') || 'ru';
    
    // Обновляем глобальную переменную
    currentLang = savedLang;
    
    // Если тема была сохранена, применяем ее
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }
    
    // Устанавливаем язык при загрузке
    setLanguage(savedLang);
    updateLangButton(savedLang);
    updateThemeButtonText();
    
    // Вешаем обработчик на кнопку темы
    themeToggleButton.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
        
        updateThemeButtonText();
    });
    
    // Вешаем обработчик на кнопку перевода
    langButton.addEventListener('click', function() {
        const currentLang = localStorage.getItem('language') || 'ru';
        const newLang = currentLang === 'ru' ? 'en' : 'ru';
        
        setLanguage(newLang);
        updateLangButton(newLang);
        updateThemeButtonText();
    });
    
    // Инициализируем модальные окна
    initModal();
    
    // Инициализируем анимации скролла
    initScrollAnimations();
});

