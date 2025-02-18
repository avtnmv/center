// Инициализация Swiper
let swiper = new Swiper('.mySwiper', {
    slidesPerView: 6,  // Количество слайдов
    spaceBetween: 10,  // Расстояние между слайдами
    navigation: {
        nextEl: '.custom-next',
        prevEl: '.custom-prev',
    },
    pagination: {
        el: '.custom-swiper-pagination',
        type: 'progressbar',
    },
    simulateTouch: true, // Разрешаем свайпы только для мобильных устройств
    keyboard: false,     // Отключаем управление с клавиатуры
    allowTouchMove: false, // Отключаем все свайпы на десктопе
    slideToClickedSlide: false, // Отключаем переход к слайду по клику
    breakpoints: {
      320: {
          slidesPerView: 2, // 2 слайда на мобильных
          spaceBetween: 10,
      },
      420: {
          slidesPerView: 2, // 2 слайда на экранах до 576px
          spaceBetween: 10,
      },
      576: {
          slidesPerView: 3, // 3 слайда на экранах до 576px
          spaceBetween: 15,
      },
      768: {
          slidesPerView: 3, // 3 слайда на экранах до 768px
          spaceBetween: 15,
      },
      950: {
          slidesPerView: 6, // 6 слайдов на экранах до 950px
          spaceBetween: 10,
          simulateTouch: false, // Отключаем свайпы на десктопе
          keyboard: false, // Отключаем управление с клавиатуры
          allowTouchMove: false, // Отключаем возможность свайпа на десктопе
      }
    },
    on: {
        init: function() {
            updateNavButtons(this);
        },
        slideChange: function() {
            updateNavButtons(this);
        }
    }
});

// Функция для обновления кнопок навигации
function updateNavButtons(swiper) {
    const prevButton = document.querySelector('.custom-prev');
    const nextButton = document.querySelector('.custom-next');

    if (swiper.isBeginning) {
        prevButton.classList.add('inactive');
    } else {
        prevButton.classList.remove('inactive');
    }

    if (swiper.isEnd) {
        nextButton.classList.add('inactive');
    } else {
        nextButton.classList.remove('inactive');
    }
}

