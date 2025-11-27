const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#convert");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Add currency list to dropdown
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode;
    option.textContent = currCode;

    if (select.name === "from" && currCode === "USD") option.selected = true;
    if (select.name === "to" && currCode === "INR") option.selected = true;

    select.append(option);
  }

  select.addEventListener("change", (e) => updateFlag(e.target));
}

// Update flag image
function updateFlag(element) {
  let code = element.value;
  let countryCode = countryList[code];
  element.parentElement.querySelector("img").src =
    `https://flagsapi.com/${countryCode}/flat/64.png`;
}

// ✅ Working API
async function updateExchangeRate() {
  let amountInput = document.querySelector(".amount input");
  let amount = parseFloat(amountInput.value);

  if (!amount || amount < 1) {
    amount = 1;
    amountInput.value = 1;
  }

  const URL = `https://api.exchangerate-api.com/v4/latest/${fromCurr.value}`;

  let res = await fetch(URL);
  let data = await res.json();

  let rate = data.rates[toCurr.value];
  let finalAmount = (amount * rate).toFixed(2);

  msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

// Button click
btn.addEventListener("click", updateExchangeRate);

// on load
window.addEventListener("load", updateExchangeRate);
