function updateReceiveOptions(selectedCurrency) {
    const receiveSelect = document.getElementById("receive");

    const receiveOptions = {
        usdt: ["usd", "try"],
        rub: ["try", "usd"],
        uah: ["try"],
        usd: ["usdt", "try"],
        eur: ["usdt"]
    };

    const currencyNames = {
        usdt: "Tether USDT",
        rub: "RUB с карты",
        uah: "UAH с карты",
        usd: "USD наличные",
        eur: "EUR наличные",
        try: "TRY наличные"
    };

    const currencyFlags = {
        usdt: "./assets/images/usdt-icon.svg",
        rub: "./assets/images/rub-icon.svg",
        uah: "./assets/images/uah-icon.svg",
        usd: "./assets/images/usd-icon.svg",
        eur: "./assets/images/eur-icon.svg",
        try: "./assets/images/try-icon.svg"
    };

    receiveSelect.innerHTML = ""; 

    if (receiveOptions[selectedCurrency]) {
        receiveOptions[selectedCurrency].forEach(val => {
            let option = document.createElement("option");
            option.value = val;
            option.textContent = currencyNames[val]; 
            option.dataset.flag = currencyFlags[val]; 
            receiveSelect.appendChild(option);
        });
    }

    if (receiveSelect.options.length > 0) {
        receiveSelect.value = receiveSelect.options[0].value;
        updateFlag(receiveSelect); 
    }

    updateReceivedAmount(); 
}

function updateFlag(select) {
    const selectedOption = select.options[select.selectedIndex];
    const flagPath = selectedOption.dataset.flag;
    select.style.backgroundImage = `url(${flagPath})`;
    select.style.backgroundRepeat = "no-repeat";
    select.style.backgroundPosition = "left center";
    select.style.backgroundSize = "20px";
}

async function updateReceivedAmount() {
    const amount = parseFloat(document.getElementById("amount").value);
    const selected = document.querySelector(".custom-select__selected");
    const currency = selected ? selected.dataset.value : null; // Берем валюту из кастомного селекта
    const receiveSelect = document.getElementById("receive");

    if (!amount || amount <= 0 || !currency || receiveSelect.options.length === 0) {
        document.getElementById("received-amount").textContent = "";
        return;
    }

    const receiveCurrency = receiveSelect.value;

    try {
        const exchangeRates = await fetchExchangeRates(currency, receiveCurrency);
        if (exchangeRates && exchangeRates.rate) {
            const receivedAmount = (amount * exchangeRates.rate).toFixed(2);
            document.getElementById("received-amount").textContent = `${receivedAmount}`;
        } else {
            document.getElementById("received-amount").textContent = "Ошибка получения курса";
        }
    } catch (error) {
        console.error("Ошибка при получении курса:", error);
        document.getElementById("received-amount").textContent = "Ошибка получения курса";
    }
}

// Функция API (заглушка)
async function fetchExchangeRates(fromCurrency, toCurrency) {
    // Заглушка
    return { rate: 1.0 };
}

document.addEventListener('DOMContentLoaded', function () {
    const selected = document.querySelector(".custom-select__selected");
    if (selected && !selected.dataset.value) {
        selected.dataset.value = "usdt";
    }

    updateReceiveOptions('usdt');

    updateReceivedAmount();
});

const receiveSelect = document.getElementById("receive");
receiveSelect.addEventListener("change", function () {
    updateFlag(receiveSelect); 
    updateReceivedAmount(); 
});

function selectOption(value) {
    const selected = document.querySelector(".custom-select__selected");
    const options = document.querySelectorAll(".custom-select__option");
    const selectedOption = Array.from(options).find(option => option.dataset.value === value);

    if (selectedOption) {
        selected.innerHTML = selectedOption.innerHTML;
        selected.dataset.value = value;  
        updateReceiveOptions(value);  
    }

    toggleCustomSelect();
}

function toggleCustomSelect() {
    const options = document.getElementById("custom-select-options");
    options.classList.toggle("show");
}

window.onclick = function(event) {
    const customSelect = document.querySelector(".custom-select");
    const options = document.getElementById("custom-select-options");

    if (!customSelect.contains(event.target) && options.classList.contains('show')) {
        options.classList.remove('show');
    }
}

document.querySelectorAll('.custom-select').forEach(select => {
    select.addEventListener("click", function() {
        toggleCustomSelect();
    });
});

function toggleCustomSelect() {
    const options = document.getElementById("custom-select-options");
    const link = document.querySelector(".header__link");

    if (!options || !link) {
        console.error("Элементы не найдены: options или link");
        return;
    }

    options.classList.toggle("show");

    const windowWidth = window.innerWidth;

    if (options.classList.contains("show")) {
        if (windowWidth > 920) {
            link.style.marginTop = "180px";  
        } else {
            link.style.marginTop = "64px";  
        }
    } else {
        link.style.marginTop = "64px"; 
    }
}