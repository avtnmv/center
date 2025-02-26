document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.querySelector(".last-exchange__toggle");
    let hiddenItems = [];
    let isOpen = false;

    // Инициализация скрытых элементов
    function init() {
        const items = document.querySelectorAll(".last-exchange__item");
        const isDesktop = window.matchMedia("(min-width: 768px)").matches;
        
        items.forEach((item, index) => {
            if (isDesktop && index >= 4) {
                item.classList.add("last-exchange__item--hidden");
                hiddenItems.push(item);
            } else if (!isDesktop && index >= 2) {
                item.classList.add("last-exchange__item--hidden");
                hiddenItems.push(item);
            }
        });
    }

    init();

    toggleButton.addEventListener("click", function() {
        isOpen = !isOpen;
        const showItems = window.matchMedia("(min-width: 768px)").matches ? 4 : 6;
        
        hiddenItems.slice(0, showItems).forEach(item => {
            item.classList.toggle("last-exchange__item--hidden", !isOpen);
        });
        
        this.classList.toggle("last-exchange__toggle--open", isOpen);
        
    });
});