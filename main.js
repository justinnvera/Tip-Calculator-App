const billInput = document.getElementById("bill-input");
const customTipOptionInput = document.getElementById("custom-tip-option");
const numberOfPeopleInput = document.getElementById("number-of-people-input");
const resetBTN = document.getElementById("resetBTN");
const billError = document.getElementById("bill-error");
const numberOfPeopleError = document.getElementById("number-of-people-error");
const tipAmount = document.getElementById("tip-per-person-value");
const total = document.getElementById("total-per-person-value");
let activatedTip = document.querySelectorAll(".activated-tip-option");

// ! Border & Error Message Functions
// Adds blue border
function blueBorder(elm) {
    elm.style.border = "1px solid hsl(172, 67%, 45%)";
}
// Adds red border
function redBorder(elm) {
    elm.style.border = "1px solid #fd1a1a";
}
// Removes border
function noBorder(elm) {
    elm.style.border = "none";
}
// Shows Bill Input Error Message
function showBillInputErrorMessage() {
    billError.style.display = "block";
}
// Shows Number of People Error Message
function showNumberOfPeopleErrorMessage() {
    numberOfPeopleError.style.display = "block";
}
// ! Event Listeners
// ? Hover & Unhover Effects
// ? Hover Effects
// Adds "focus" event listeners to billInput & numberofPeopleInput. If activated, it calls for a blue border.
billInput.addEventListener("focus", () => blueBorder(billInput));
numberOfPeopleInput.addEventListener("focus", () => blueBorder(numberOfPeopleInput));
// ? Unhover Effects
// Adds "blur" event listeners to billInput & numberofPeopleInput. If activated, it calls for a red border.
billInput.addEventListener("blur", () => noBorder(billInput));
numberOfPeopleInput.addEventListener("blur", () => noBorder(numberOfPeopleInput));
// ? Calls to Validate
// Adds "blur" event listen to billInput & numberofPeopleInput. If activated, it calls for a check if the input is left empty or 0.
billInput.addEventListener("blur", () => billCheck(billInput));
numberOfPeopleInput.addEventListener("blur", () => numberOfPeopleCheck(numberOfPeopleInput));
// ? Calls to Calculate 
// Adds "blur" event listen to billInput & numberofPeopleInput. If activated, calls for the function to calculate the grand total / per person.
billInput.addEventListener("blur", () => totalPerPerson());
numberOfPeopleInput.addEventListener("blur", () => totalPerPerson());

// ! isInputEmpty Check Functions 
// Checks for Bill Input
function billCheck(elm) {
    // If billInput is empty. 
    if (elm.value === "0" || elm.value === "") {
        redBorder(elm); // Adds red border to billInput
        showBillInputErrorMessage(); // Shows error message for billInput
    } 
    // If billInput is not empty. 
    else {
        billError.style.display = "none"; // Removes error message for billInput
    }
}
// Checks for numberOfPeople
function numberOfPeopleCheck(elm) {
    // If numberOfPeople is empty
    if (elm.value === "0" || elm.value === "") {
        redBorder(elm); // Adds red border to numberOfPeopleInput
        showNumberOfPeopleErrorMessage(); // Shows error message for numberOfPeopleInput
    } 
    // If numberOfPeople is not empty
    else {
        numberOfPeopleError.style.display = "none"; // Removes error messag for numberOfPeopleInput
    }
}
// ! Value Extraction Logic 
// ? Calculation Variables
const tipOptions = document.querySelectorAll('.tip-option');
let selectedTipPercentage = 0;
let tipSelected = 0;
let customTipValue = 0;
let numberOfPeopleValue = 0;
let tipTotal = 0;
let grandTotal = 0;
// ? Tip Percentages Activated Logic
tipOptions.forEach(tipOption => {
    // Adds "click" listener to each tipOption which is the children of tipOptions.
    tipOption.addEventListener("click", () => {
        // Removes activated-tip-option from each "option" which is the labeled child for each tipOptions.
        tipOptions.forEach(option => {
            option.classList.remove("activated-tip-option");
        });
        // Adds ".activated-tip-option" to each tipOption.
        tipOption.classList.add("activated-tip-option");
        // Extracts the tipSelected which is the tipOption clicked     
        tipSelected = parseInt(tipOption.textContent)/100;
    })
    tipOption.addEventListener("click", () => {
        totalPerPerson();
    })
});
// ? Custom Tip Value Logic
// Add an event listener for the custom tip option input
customTipOptionInput.addEventListener("input", () => {
    // Get the value from the custom tip option input
    customTipValue = parseFloat(customTipOptionInput.value)/100;
})
// Add an event listner for number of people input
numberOfPeopleInput.addEventListener("input", () => {
    // Get the value from number of people input
    numberOfPeopleValue = parseInt(numberOfPeopleInput.value);
})
// Calls for calculation everytime the custom tip value is changed.
customTipOptionInput.addEventListener("input", () => {
    totalPerPerson();
})
// ! Calculation Logic
function totalPerPerson() {
    if (isNaN(tipSelected)) {
        tipSelected = 0;
    }
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
// ! Reset Button
// Adds event listener "click"
resetBTN.addEventListener("click", () => {
    billInput.value = ""; // removes billInput value
    // iterates through each tip-option and removes the ".activated-tip-option" class
    tipOptions.forEach(option => {
        option.classList.remove("activated-tip-option");
    });
    numberOfPeopleInput.value = ""; // removes numberOfPeopleInput value
    tipAmount.textContent = "$0.00"; // sets the tip amount to 0
    total.textContent = "$0.00"; // sets the total amount to 0
})




