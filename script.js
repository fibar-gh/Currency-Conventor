// Get DOM elements for amount input, currency selects, and result display
const amountInput = document.querySelector(".Amount");
const fromCurrencySelect = document.querySelectorAll(".select-currency")[0];
const toCurrencySelect = document.querySelectorAll(".select-currency")[1];
const exchangeRateResult = document.querySelector(".result");
const apiKey = '8b4c1ab32c1011ba51f29d73';


const countryList = {
  AED: "ae",
  AFN: "af",
  ALL: "al",
  AMD: "am",
  ANG: "an",
  AOA: "ao",
  ARS: "ar",
  AUD: "au",
  AWG: "aw",
  AZN: "az",
  BBD: "bb",
  BDT: "bd",
  BGN: "bg",
  BHD: "bh",
  BMD: "bm",
  BND: "bn",
  BOB: "bo",
  BRL: "br",
  BSD: "bs",
  BTN: "bt",
  BWP: "bw",
  BYN: "by",
  BZD: "bz",
  CAD: "ca",
  CHF: "ch",
  CLP: "cl",
  CNY: "cn",
  COP: "co",
  CRC: "cr",
  CUP: "cu",
  CZK: "cz",
  DKK: "dk",
  DOP: "do",
  DZD: "dz",
  EGP: "eg",
  ETB: "et",
  EUR: "eu",
  FJD: "fj",
  GBP: "gb",
  GEL: "ge",
  GHS: "gh",
  GMD: "gm",
  GTQ: "gt",
  GYD: "gy",
  HKD: "hk",
  HNL: "hn",
  HRK: "hr",
  HTG: "ht",
  HUF: "hu",
  IDR: "id",
  ILS: "il",
  INR: "in",
  IQD: "iq",
  IRR: "ir",
  ISK: "is",
  JMD: "jm",
  JOD: "jo",
  JPY: "jp",
  KES: "ke",
  KGS: "kg",
  KHR: "kh",
  KMF: "km",
  KRW: "kr",
  KWD: "kw",
  KYD: "ky",
  KZT: "kz",
  LAK: "la",
  LBP: "lb",
  LKR: "lk",
  LSL: "ls",
  MAD: "ma",
  MDL: "md",
  MGA: "mg",
  MKD: "mk",
  MMK: "mm",
  MNT: "mn",
  MOP: "mo",
  MRU: "mr",
  MUR: "mu",
  MVR: "mv",
  MWK: "mw",
  MXN: "mx",
  MYR: "my",
  MZN: "mz",
  NAD: "na",
  NGN: "ng",
  NIO: "ni",
  NOK: "no",
  NPR: "np",
  NZD: "nz",
  OMR: "om",
  PAB: "pa",
  PEN: "pe",
  PGK: "pg",
  PHP: "ph",
  PKR: "pk",
  PLN: "pl",
  PYG: "py",
  QAR: "qa",
  RON: "ro",
  RSD: "rs",
  RUB: "ru",
  RWF: "rw",
  SAR: "sa",
  SBD: "sb",
  SCR: "sc",
  SDG: "sd",
  SEK: "se",
  SGD: "sg",
  SHP: "sh",
  SLL: "sl",
  SOS: "so",
  SRD: "sr",
  STN: "st",
  SYP: "sy",
  SZL: "sz",
  THB: "th",
  TJS: "tj",
  TMT: "tm",
  TND: "tn",
  TOP: "to",
  TRY: "tr",
  TTD: "tt",
  TWD: "tw",
  TZS: "tz",
  UAH: "ua",
  UGX: "ug",
  USD: "us",
  UYU: "uy",
  UZS: "uz",
  VND: "vn",
  VUV: "vu",
  WST: "ws",
  XAF: "cm",
  XCD: "ag",
  XOF: "sn",
  YER: "ye",
  ZAR: "za",
  ZMW: "zm",
  ZWL: "zw"
};

// Set flag image for the selected currency in the select element
function loadFlag(element) {
  let countryCode = element.value;
  let imgTag = element.parentElement.querySelector("img");
  if (imgTag && countryList[countryCode]) {
    imgTag.src = `https://flagcdn.com/48x36/${countryList[countryCode]}.png`;
  }
}

// Populate currency select options and add change event listeners
[ fromCurrencySelect, toCurrencySelect ].forEach((select, index) => {
  for (let currencyCode in countryList) {
    let selected = "";
    // Set default selected currencies
    if (index === 0 && currencyCode === "USD") selected = "selected";
    if (index === 1 && currencyCode === "INR") selected = "selected";
    let optionTag = `<option value="${currencyCode}" ${selected}>${currencyCode}</option>`;
    select.insertAdjacentHTML("beforeend", optionTag);
    let option=document.createElement('option')
    option.value=currencyCode;
    option.text= currencyCode
    option.select=selected =="selected"
    select.appendChild(option)
  }
  // Update flag and exchange rate on currency change
  select.addEventListener("change", () => {
    loadFlag(select);
    getExchangeRate();
  });
});

// Fetch and display the exchange rate
function getExchangeRate() {
  let amount = amountInput.value;
  exchangeRateResult.innerHTML = "fetching rate...";
  let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrencySelect.value}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      let rate = data.conversion_rates[toCurrencySelect.value];
      if (!rate) {
        exchangeRateResult.innerHTML = "Something went wrong";
        return;
      }
      let totalExchangeRate = (amount * rate).toFixed(2);
      // Show the result in the result element
      exchangeRateResult.value = `${amount} ${fromCurrencySelect.value} = ${totalExchangeRate} ${toCurrencySelect.value}`;
      loadFlag(fromCurrencySelect);
      loadFlag(toCurrencySelect);
    })
    .catch((error) => {
      console.error('Error fetching exchange rate:', error);
      exchangeRateResult.innerHTML = "Error fetching exchange rate";
    });
}

// Initial flag and exchange rate setup
loadFlag(fromCurrencySelect);
loadFlag(toCurrencySelect);
getExchangeRate();



// Add Enter key event for amount input and both currency selects
[amountInput, fromCurrencySelect, toCurrencySelect].forEach(element => {
  element.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      getExchangeRate();
    }
  });
});

// Calendar input and image logic
const calendarInput = document.querySelector('.calendar');
const calendarImg = document.querySelector('.img-calendar');

if (calendarImg && calendarInput) {
  calendarImg.style.cursor = "pointer";
  // Show date picker when calendar image is clicked
  calendarImg.addEventListener("click", () => {
    if (typeof calendarInput.showPicker === "function") {
      calendarInput.showPicker();
    } else {
      calendarInput.focus();
    }
  });
  // Make the input not focusable by mouse
  calendarInput.style.pointerEvents = "none";
  calendarInput.style.background = "#f5f5f5"; // Optional: make it look disabled
}
