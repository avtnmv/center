document.addEventListener('DOMContentLoaded', function() {
    initSelects();
    selectOption('usdt', 'currency');
    updateReceivedAmount();
});

function initSelects() {
    const selects = {
        currency: {
            selector: '.currency-select .custom-select__selected',
            defaultValue: 'usdt'
        },
        city: {
            selector: '.city-select .custom-select__selected',
            defaultValue: 'Стамбул'
        },
        receive: {
            selector: '#receive-selected',
            defaultValue: 'try'
        }
    };

    Object.entries(selects).forEach(([type, config]) => {
        const selected = document.querySelector(config.selector);
        if (selected && !selected.dataset.value) {
            selected.dataset.value = config.defaultValue;
            if (type === 'receive') initReceiveOptions();
        }
    });
}

function initReceiveOptions() {
    updateReceiveOptions('usdt');
}

function updateReceiveOptions(selectedCurrency) {
    const receiveOptions = {
        usdt: [
            {value: "usd", text: "USD наличные", icon: "./assets/images/usd-icon.svg"},
            {value: "try", text: "TRY наличные", icon: "./assets/images/try-icon.svg"}
        ],
        rub: [
            {value: "try", text: "TRY наличные", icon: "./assets/images/try-icon.svg"},
            {value: "usd", text: "USD наличные", icon: "./assets/images/usd-icon.svg"}
        ],
        uah: [
            {value: "try", text: "TRY наличные", icon: "./assets/images/try-icon.svg"}
        ],
        usd: [
            {value: "usdt", text: "Tether USDT", icon: "./assets/images/usdt-icon.svg"},
            {value: "try", text: "TRY наличные", icon: "./assets/images/try-icon.svg"}
        ],
        eur: [
            {value: "usdt", text: "Tether USDT", icon: "./assets/images/usdt-icon.svg"}
        ]
    };

    const optionsContainer = document.getElementById("receive-select-options");
    optionsContainer.innerHTML = '';

    if (receiveOptions[selectedCurrency]) {
        receiveOptions[selectedCurrency].forEach(option => {
            const div = document.createElement("div");
            div.className = "custom-select__option";
            div.dataset.value = option.value;
            div.onclick = () => selectOption(option.value, 'receive');
            div.innerHTML = `
                <img src="${option.icon}" class="custom-select__icon" alt="${option.value}-icon">
                <span class="custom-select__text">${option.text}</span>
            `;
            optionsContainer.appendChild(div);
        });
    }

    if (receiveOptions[selectedCurrency]?.[0]) {
        const firstOption = receiveOptions[selectedCurrency][0];
        const selected = document.querySelector("#receive-selected");
        selected.innerHTML = `
            <div class="currency-preview">
                <img src="${firstOption.icon}" class="custom-select__icon" alt="${firstOption.value}-icon">
                <svg class="header__custom-select-arrow" viewBox="0 -4.5 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 1.39 18.594 0 9.987 8.261l-.918-.881.005.005L1.427.045 0 1.414 9.987 11z" fill-rule="evenodd"/>
                </svg>
            </div>
        `;
        selected.dataset.value = firstOption.value;
    }
}

function toggleCustomSelect(type) {
    const optionsMap = {
        currency: "#custom-select-options",
        city: "#city-select-options",
        receive: "#receive-select-options"
    };

    const link = document.querySelector(".header__link");
    const options = document.querySelector(optionsMap[type]);

    if (!options || !link) return;

    Object.values(optionsMap).forEach(selector => {
        const otherOptions = document.querySelector(selector);
        if (selector !== optionsMap[type]) {
            otherOptions.classList.remove('show');
        }
    });

    const wasOpen = options.classList.contains('show');
    options.classList.toggle('show');

    if (type === 'currency') {
        const windowWidth = window.innerWidth;
        link.style.marginTop = options.classList.contains('show') 
            ? (windowWidth > 920 ? "180px" : "64px")
            : "64px";
    } else {
        if (wasOpen) link.style.marginTop = "64px";
    }
}

function selectOption(value, type) {
    const selectors = {
        currency: {
            selected: ".currency-select .custom-select__selected",
            options: "#custom-select-options"
        },
        city: {
            selected: ".city-select .custom-select__selected",
            options: "#city-select-options"
        },
        receive: {
            selected: "#receive-selected",
            options: "#receive-select-options"
        }
    };

    const config = selectors[type];
    if (!config) return;

    const selectedElement = document.querySelector(config.selected);
    const optionsContainer = document.querySelector(config.options);

    if (optionsContainer) {
        const selectedOption = Array.from(optionsContainer.children)
            .find(option => option.dataset.value === value);

        if (selectedOption) {
            switch(type) {
                case 'city':
                    selectedElement.innerHTML = selectedOption.innerHTML;
                    selectedElement.dataset.value = value;
                    break;
                    
                case 'currency':
                    selectedElement.innerHTML = selectedOption.innerHTML;
                    selectedElement.dataset.value = value;
                    updateReceiveOptions(value);
                    break;
                    
                case 'receive':
                    const iconSrc = selectedOption.querySelector('img').src;
                    selectedElement.innerHTML = `
                        <div class="currency-preview">
                            <img src="${iconSrc}" class="custom-select__icon" alt="${value}-icon">
                            <svg class="header__custom-select-arrow" viewBox="0 -4.5 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 1.39 18.594 0 9.987 8.261l-.918-.881.005.005L1.427.045 0 1.414 9.987 11z" fill-rule="evenodd"/>
                            </svg>
                        </div>
                    `;
                    selectedElement.dataset.value = value;
                    break;
            }
            
            optionsContainer.classList.remove('show');
            if (type === 'currency') {
                document.querySelector(".header__link").style.marginTop = "64px";
            }
        }
    }
    updateReceivedAmount();
}

async function updateReceivedAmount() {
    const amountInput = document.getElementById("amount");
    const amount = parseFloat(amountInput.value);
    const currency = document.querySelector(".currency-select .custom-select__selected")?.dataset.value;
    const receiveCurrency = document.querySelector("#receive-selected")?.dataset.value;
    const outputElement = document.getElementById("received-amount");

    if (!amount || amount <= 0 || isNaN(amount) || !currency || !receiveCurrency) {
        outputElement.style.opacity = '0';
        outputElement.style.width = '0';
        return;
    }

    try {
        const exchangeRates = await fetchExchangeRates(currency, receiveCurrency);
        if (exchangeRates?.rate) {
            outputElement.textContent = (amount * exchangeRates.rate).toFixed(2);
            outputElement.style.opacity = '1';
            outputElement.style.width = 'auto';
        } else {
            outputElement.textContent = "Ошибка курса";
        }
    } catch (error) {
        console.error("Ошибка:", error);
        outputElement.textContent = "Ошибка";
    }
}

function validateInput(event) {
    const charCode = event.which || event.keyCode;
    const value = event.target.value;
    
    if ((charCode === 46 && value.includes('.')) || 
        (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57))) {
        return false;
    }
    return true;
}

document.addEventListener('click', function(e) {
    if (!e.target.closest('.custom-select')) {
        document.querySelectorAll('.custom-select__options').forEach(options => {
            options.classList.remove('show');
        });

        const currencyOptions = document.querySelector("#custom-select-options");
        if (currencyOptions.classList.contains('show')) {
            document.querySelector(".header__link").style.marginTop = "64px";
        }
    }
});

async function fetchExchangeRates(fromCurrency, toCurrency) {
    const mockRates = {
        'usdt-try': 32.5,
        'usdt-usd': 1.0,
        'rub-try': 0.35,
        'rub-usd': 0.011,
        'uah-try': 0.85,
        'usd-usdt': 1.0,
        'usd-try': 32.5,
        'eur-usdt': 1.05
    };
    
    await new Promise(resolve => setTimeout(resolve, 100));
    return {rate: mockRates[`${fromCurrency}-${toCurrency}`] || null};
}

document.getElementById("amount").addEventListener("input", updateReceivedAmount);
document.querySelectorAll('.custom-select').forEach(select => {
    select.addEventListener("click", function(e) {
        if (!e.target.closest('.custom-select__option')) {
            const type = this.classList.contains('city-select') ? 'city' 
                : this.classList.contains('receive-select') ? 'receive' 
                : 'currency';
            toggleCustomSelect(type);
        }
    });
});

//

