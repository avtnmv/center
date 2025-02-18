let swiper = new Swiper('.mySwiper', {
    slidesPerView: 6,  // Добавляем отображение двух слайдов
    spaceBetween: 10,  // Задаем расстояние между слайдами
    navigation: {
        nextEl: '.custom-next',
        prevEl: '.custom-prev',
    },
    pagination: {
        el: '.custom-swiper-pagination',
        type: 'progressbar',
    },
    breakpoints: {
      320: {
          slidesPerView: 2, // 2 слайда на мобильных
          spaceBetween: 10
      },
      420:{
          slidesPerView: 2, // 2 слайда на экранах до 576px
          spaceBetween: 10
      },
      576: {
          slidesPerView: 3, // 2 слайда на экранах до 576px
          spaceBetween: 15
      },
      768: {
          slidesPerView: 3, // 3 слайда на экранах до 768px
          spaceBetween: 15
      },
      950: {
          slidesPerView: 6, // 4 слайда на экранах до 950px
          spaceBetween: 10
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

// Блокировка слайдера при воспроизведении видео
const videos = document.querySelectorAll('.swiper-slide video');

videos.forEach(video => {
  video.addEventListener('click', function(event) {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
    // Блокируем прокрутку слайдера
    swiper.allowSlideNext = false;
    swiper.allowSlidePrev = false;
  });
  
  video.addEventListener('ended', function() {
    // Возвращаем возможность прокручивать слайдер после завершения видео
    swiper.allowSlideNext = true;
    swiper.allowSlidePrev = true;
  });
  
  video.addEventListener('pause', function() {
    // Возвращаем возможность прокручивать слайдер после паузы видео
    swiper.allowSlideNext = true;
    swiper.allowSlidePrev = true;
  });
});