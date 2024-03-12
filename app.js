// const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
// const BASE_URL_API = 'http://openexchangerates.org/latest';
const BASE_URL = "https://v6.exchangerate-api.com/v6/da6910193d34f435302680b8/latest/USD";

const dropdown = document.querySelectorAll('.dropdown select');
const btn = document.querySelector("#btn");
let amount = document.querySelector(".amount input");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdown) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode == "USD") {
            newOption.selected = true;
        }
        else if(select.name === "to" && currCode == "INR") {
            newOption.selected = true;
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let flagImg = element.parentElement.querySelector(".flagImg");
    // console.log(newSrc);
    flagImg.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amtVal = amount.value;
    // console.log(amtVal); //for checking the value
    if(amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    // console.log(fromCurr.value.toLowerCase(), toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json()`;
    // let URL = `${BASE_URL}/`;  
    let response = await fetch(BASE_URL);
    // let response = await fetch(URL);
    let data = await response.json();
    const rate = data[toCurr.value.toLowerCase()];
    
    let finalAmount = amtVal * rate;
    console.log(finalAmount)
    msg.innerText = `${amtVal} ${fromCurr} = ${finalAmount} ${toCurr}`;
    
});