document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function () {
        const accordion = this.parentElement; // Родительский элемент .accordion
        const question = accordion.querySelector('.accordion-question'); // Элемент с вопросом
        const content = this.nextElementSibling; // Контент аккордеона
        const isActive = accordion.classList.contains('active');

        // Запрещаем скролл страницы на время анимации
        document.body.style.overflow = 'hidden';

        // Закрываем все открытые аккордеоны
        document.querySelectorAll('.accordion').forEach(accordionElement => {
            accordionElement.classList.remove('active');
            accordionElement.style.maxHeight = '110px'; // Возвращаем высоту к 110px
        });
        document.querySelectorAll('.accordion-question').forEach(questionElement => {
            questionElement.classList.remove('active');
        });
        document.querySelectorAll('.accordion-content').forEach(contentElement => {
            contentElement.style.maxHeight = null;
        });

        // Открываем текущий аккордеон, если он был закрыт
        if (!isActive) {
            accordion.classList.add('active');
            question.classList.add('active');
            content.style.maxHeight = content.scrollHeight + '300px'; // Расширяем до размера содержимого
            accordion.style.maxHeight = accordion.scrollHeight + '300px'; // Расширяем аккордеон
        }

        // Восстанавливаем скролл страницы после завершения анимации
        setTimeout(() => {
            document.body.style.overflow = 'auto';
        }, 300); // Время должно совпадать с длительностью анимации (0.3s)
    });
});