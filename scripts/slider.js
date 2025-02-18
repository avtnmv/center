// Инициализация Swiper для видео
let swiperVideos = new Swiper('.mySwiperVideos', {
    slidesPerView: 6,
    spaceBetween: 10,
    loop: false,
    navigation: {
        nextEl: '.custom-next-video',
        prevEl: '.custom-prev-video',
    },
    pagination: {
        el: '.custom-swiper-pagination-video',
        type: 'progressbar',
    },
    allowTouchMove: false,
    slideToClickedSlide: false,
    breakpoints: {
        320: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        576: {
            slidesPerView: 3,
            spaceBetween: 15,
        },
        950: {
            slidesPerView: 6,
            spaceBetween: 10,
            simulateTouch: false,
        }
    },
    on: {
        init: function () {
            if (this.isBeginning) {
                document.querySelector('.custom-prev-video').classList.add('disabled');
            }
            if (this.isEnd) {
                document.querySelector('.custom-next-video').classList.add('disabled');
            }
        },
        reachBeginning: function () {
            document.querySelector('.custom-prev-video').classList.add('disabled');
        },
        reachEnd: function () {
            document.querySelector('.custom-next-video').classList.add('disabled');
        },
        fromEdge: function () {
            document.querySelector('.custom-prev-video').classList.remove('disabled');
            document.querySelector('.custom-next-video').classList.remove('disabled');
        }
    }
});

// Инициализация Swiper для изображений
let swiperImages = new Swiper('.mySwiperImages', {
    slidesPerView: 6,
    spaceBetween: 10,
    loop: false,
    navigation: {
        nextEl: '.custom-next-image',
        prevEl: '.custom-prev-image',
    },
    pagination: {
        el: '.custom-swiper-pagination-image',
        type: 'progressbar',
    },
    allowTouchMove: false,
    slideToClickedSlide: false,
    breakpoints: {
        320: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        576: {
            slidesPerView: 3,
            spaceBetween: 15,
        },
        950: {
            slidesPerView: 6,
            spaceBetween: 10,
            simulateTouch: false,
        }
    },
    on: {
        init: function () {
            if (this.isBeginning) {
                document.querySelector('.custom-prev-image').classList.add('disabled');
            }
            if (this.isEnd) {
                document.querySelector('.custom-next-image').classList.add('disabled');
            }
        },
        reachBeginning: function () {
            document.querySelector('.custom-prev-image').classList.add('disabled');
        },
        reachEnd: function () {
            document.querySelector('.custom-next-image').classList.add('disabled');
        },
        fromEdge: function () {
            document.querySelector('.custom-prev-image').classList.remove('disabled');
            document.querySelector('.custom-next-image').classList.remove('disabled');
        }
    }
});