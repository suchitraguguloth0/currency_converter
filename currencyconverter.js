const countryList = {
    USD: "US",
    INR: "IN",
    EUR: "EU",
    AUD: "AU",
    GBP: "GB",
    JPY: "JP",
    CAD: "CA"
};

const dropdowns = document.querySelectorAll("select");
const btn = document.querySelector("button");
const msg = document.querySelector(".msg");
const amountInput = document.querySelector(".amount input");

for (let select of dropdowns) {
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

function updateFlag(element) {
    let currCode = element.value;
    let countryCode = countryList[currCode];

    let img = element.parentElement.querySelector("img");

    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

btn.addEventListener("click", async (e) => {
    e.preventDefault();

    let amount = amountInput.value;

    if (amount === "" || amount < 1) {
        amount = 1;
        amountInput.value = "1";
    }

    const fromCurr = document.querySelector("[name='from']").value;
    const toCurr = document.querySelector("[name='to']").value;

    const URL = `https://open.er-api.com/v6/latest/${fromCurr}`;

    try {
        const response = await fetch(URL);
        const data = await response.json();

        let rate = data.rates[toCurr];

        let finalAmount = amount * rate;

        msg.innerText =
            `${amount} ${fromCurr} = ${finalAmount.toFixed(2)} ${toCurr}`;
    }
    catch (error) {
        msg.innerText = "Error fetching exchange rate";
        console.log(error);
    }
});