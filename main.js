const billInput = document.getElementById("bill-input");
const customTipOptionInput = document.getElementById("custom-tip-option");
const numberOfPeopleInput = document.getElementById("number-of-people-input");
const resetBTN = document.getElementById("resetBTN");
const billError = document.getElementById("bill-error");
const numberOfPeopleError = document.getElementById("number-of-people-error");
const tipAmount = document.getElementById("tip-per-person");
const total = document.getElementById("total-per-person");

function blueBorder(elm) {
    elm.style.border = "1px solid hsl(172, 67%, 45%)";
}
function noBorder(elm) {
    elm.style.border = "none";
}
function redBorder(elm) {
    elm.style.border = "1px solid #fd1a1a";
}
function showBillInputErrorMessage() {
    billError.style.display = "block";
}
function showNumberOfPeopleErrorMessage() {
    numberOfPeopleError.style.display = "block";
}

billInput.addEventListener("focus", () => blueBorder(billInput));
billInput.addEventListener("blur", () => noBorder(billInput));
numberOfPeopleInput.addEventListener("focus", () => blueBorder(numberOfPeopleInput));
numberOfPeopleInput.addEventListener("blur", () => noBorder(numberOfPeopleInput));

billInput.addEventListener("blur", () => billCheck(billInput));
numberOfPeopleInput.addEventListener("blur", () => numberOfPeopleCheck(numberOfPeopleInput));

billInput.addEventListener("blur", () => totalPerPerson());
numberOfPeopleInput.addEventListener("blur", () => totalPerPerson());

function billCheck(elm) {
    if (elm.value === "0" || elm.value === "") {
        redBorder(elm);
        showBillInputErrorMessage();
    } else {
        billError.style.display = "none";
    }
}
function numberOfPeopleCheck(elm) {
    if (elm.value === "0" || elm.value === "") {
        redBorder(elm);
        showNumberOfPeopleErrorMessage();
    } else {
        numberOfPeopleError.style.display = "none";
    }
}
let selectedTipPercentage = 0;

// Tips
const tipOptions = document.querySelectorAll('.tip-option');
let tipSelected = 0;
let customTipValue = 0;
let numberOfPeopleValue = 0;
let tipTotal = 0;
let grandTotal = 0;
tipOptions.forEach(tipOption => {
    tipOption.addEventListener("click", () => {
        // Removes activated-tip-option
        tipOptions.forEach(option => {
            option.classList.remove("activated-tip-option");
        });
        // Adds activated-tip-option 
        tipOption.classList.add("activated-tip-option");
        // Sets tipSelected     
        tipSelected = parseInt(tipOption.textContent)/100;
    })
});
// Add an event listener for the custom tip option input
customTipOptionInput.addEventListener("input", () => {
    // Get the value from the custom tip option input
    customTipValue = parseFloat(customTipOptionInput.value);
})
// Add an event listner for number of people input
numberOfPeopleInput.addEventListener("input", () => {
    // Get the value from number of people input
    numberOfPeopleValue = parseInt(numberOfPeopleInput.value);
})

function totalPerPerson() {
    tipTotal = ((tipSelected + customTipValue) * parseFloat(billInput.value)) / numberOfPeopleValue;  
    grandTotal = tipTotal + (parseFloat(billInput.value) / numberOfPeopleValue); 
    if (isNaN(tipTotal) || tipTotal === Infinity) {
        tipAmount.textContent = "$0.00";
        total.textContent = "$0.00";
    } else {
        tipAmount.textContent = "$" + tipTotal.toFixed(2).toString();
        total.textContent = "$" + grandTotal.toFixed(2).toString();
    }
}




