const dropList = document.querySelectorAll(".drop-list select"),
  getButton = document.querySelector("form button"),
  fromCurrency = document.querySelector(".from select"),
  toCurrency = document.querySelector(".to select");

for (let i = 0; i < dropList.length; i++) {
  for (currency_code in country_list) {
    let selected;
    if (i == 0) {
      selected = currency_code == "USD" ? "selected" : "";
    } else if (i == 1) {
      selected = currency_code == "INR" ? "selected" : "";
    }
    let optionTag = `<option value="${currency_code}" ${selected} >${currency_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
}

window.addEventListener("load", () => {
  getExchangeRate();
});

getButton.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () => {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  getExchangeRate();
});

function getExchangeRate() {
  const amount = document.querySelector(".amount input");
  let amountVal = amount.value;
  const exchangeRateText = document.querySelector(".exchange-rate");

  if (amountVal == "" || amountVal == "0") {
    amount.value = "1";
    amountVal = 1;
  }
  let url = `https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/${fromCurrency.value}`;
  fetch(url)
    .then((res) => res.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurrency.value];
      let totalExchange = (amountVal * exchangeRate).toFixed(2);

      exchangeRateText.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchange} ${toCurrency.value}`;
    })
    .catch(() => (exchangeRateText.innerText = "something went wrong.."));
}

// 293e767a2c0f56f0ff488f84
