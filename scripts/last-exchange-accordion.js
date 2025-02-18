document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.querySelector(".last-exchange__toggle");
    const hiddenItems = document.querySelectorAll(".last-exchange__item--hidden");
    let isOpen = false;

    toggleButton.addEventListener("click", function() {
        isOpen = !isOpen;
        hiddenItems.forEach(item => {
            if (isOpen) {
                item.classList.add("last-exchange__item--visible");
            } else {
                item.classList.remove("last-exchange__item--visible");
            }
        });
        toggleButton.classList.toggle("last-exchange__toggle--open");
    });
});