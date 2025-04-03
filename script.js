
let firstOperand = null;
let operator = null;
let secondOperand = null;
let numDisplay = "";

const inputDisplay = document.querySelector(".current-entry");
const accDisplay = document.querySelector(".accumulation");
const nums = document.querySelectorAll(".num");
const binaryOps = document.querySelectorAll(".binary-op");
const clearAll = document.querySelector(".clear");
const del = document.querySelector(".del");
const equal = document.querySelector(".equal");
const sign = document.querySelector(".sign");
const decimal = document.querySelector(".decimal");

const operationDictionary = {
    "+": add,
    "-": subtract,
    "×": multiply,
    "÷": divide,
    "%": modulo,
}

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if (y==0) return NaN;
    return x / y;
}

function modulo(x, y) {
    return x % y;
}

function operate(x, y, operator) {
    return operationDictionary[operator](x, y);
}

function resetToNull() {
    firstOperand = operator = secondOperand = null;
    accDisplay.textContent = "";
    inputDisplay.textContent = "";
}

// Build the number
nums.forEach((num) => {
    num.addEventListener("click", (e) => {
        if (firstOperand !== null && !operator) {             // Clear the accumulated result and start with a new number
            firstOperand = null;
            accDisplay.textContent = "";
        }
        if ((numDisplay.charAt(0) === "-" && numDisplay.length <= 17 || numDisplay.length < 17) && 
            !(numDisplay === "0" && num.textContent === "0")) {

            if (numDisplay === "0") {                         // Replace 0 with any number
                numDisplay = num.textContent;
            } else {
                numDisplay += num.textContent;
            }
            inputDisplay.textContent = numDisplay;
        }
    })
})

// Perform the operation
binaryOps.forEach((binaryOp) => {
    binaryOp.addEventListener("click", (e) => {
        if (firstOperand === null && !operator) {              // Save the first operand
            firstOperand = +numDisplay;
            numDisplay = "";
            operator = binaryOp.textContent;
            accDisplay.textContent = `${firstOperand} ${operator}`;
        } else if (firstOperand !== null && !numDisplay) {     // Change the binary operation
            operator = binaryOp.textContent;
            accDisplay.textContent = `${firstOperand} ${operator}`;
        } else {                                               // Perform the binary operation using the second operand
            secondOperand = +numDisplay;
            numDisplay = "";
            firstOperand = operate(firstOperand, secondOperand, operator);
            accDisplay.textContent = `${firstOperand} ${operator}`
            inputDisplay.textContent = firstOperand;
            secondOperand = null;
        }
    })
})

clearAll.addEventListener("click", (e) => {
    numDisplay = "";
    resetToNull();
})

del.addEventListener("click", (e)=> {
    if (firstOperand && !operator && !secondOperand) {       // Delete digits from the result going right to left
        let temp = firstOperand.toString().substring(0, firstOperand.toString().length - 1)
        firstOperand = +temp;
        accDisplay.textContent = inputDisplay.textContent = firstOperand;
    } else if (numDisplay !== "") {                          // Delete digits from the next operand going right to left         
        numDisplay = numDisplay.substring(0, numDisplay.length - 1);
        inputDisplay.textContent = numDisplay;
    }
})

equal.addEventListener("click", (e) => {
    if (firstOperand !== null && operator && numDisplay) {
        secondOperand = +numDisplay;
        let res = operate(firstOperand, secondOperand, operator);
        accDisplay.textContent = `${firstOperand} ${operator} ${secondOperand} =`;
        firstOperand = inputDisplay.textContent = res;
        operator = secondOperand = null;
        numDisplay = "";
    }
})

sign.addEventListener("click", (e) => {
    if (firstOperand && !operator && !secondOperand) {     // Change the sign of the result
        firstOperand *= -1;
        accDisplay.textContent = inputDisplay.textContent = firstOperand;
    }

    if (numDisplay.length > 0 && numDisplay != 0) {        // Change the sign of the next operand
        if (numDisplay.charAt(0) == "-") {
            numDisplay = numDisplay.substring(1);
        } else {
            numDisplay = "-" + numDisplay;
        } 
        inputDisplay.textContent = numDisplay;
    }
})

decimal.addEventListener("click", (e) => {
    if (numDisplay.includes(".")) {
        return
    } else {
        numDisplay = numDisplay + ".";
    }
    inputDisplay.textContent = numDisplay;
})