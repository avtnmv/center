    document.addEventListener("DOMContentLoaded", function() {
        const buttons = document.querySelectorAll(".currency-rates__button");
        const rateElements = document.querySelectorAll('.currency-rates__text');
        
        // Заглушка 
        const ratesData = {
            istanbul: ['0.4%', '3.05', '0.4%', '36.60', '1.0300', '105.50', '0.88', '1.0230'],
            alanya: ['-0.3%', '2.97', '-0.3%', '36.44', '1.0287', '105.38', '0.87', '1.0225'],
            antalya: ['0.1%', '2.99', '0.1%', '36.50', '1.0290', '105.40', '0.875', '1.0228'],
            mersin: ['-0.2%', '2.95', '-0.2%', '36.40', '1.0280', '105.35', '0.865', '1.0220']
        };

        function updateRates(city) {
            const rates = ratesData[city];
            if(rates && rates.length === rateElements.length) {
                rateElements.forEach((el, index) => {
                    el.textContent = rates[index];
                });
            }
        }
        buttons.forEach(button => {
            button.addEventListener("click", function() {
                buttons.forEach(btn => btn.classList.remove("currency-rates__button--active"));
                this.classList.add("currency-rates__button--active");
                updateRates(this.dataset.city);
            });
        });

        const initialCity = document.querySelector('.currency-rates__button--active').dataset.city;
        updateRates(initialCity);
    });