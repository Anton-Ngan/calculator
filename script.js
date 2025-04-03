
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

const operationDictionary = {
    "+": add,
    "-": subtract,
    "*": multiply,
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
}

// Build the number
nums.forEach((num) => {
    num.addEventListener("click", (e) => {
        numDisplay += num.textContent;
        inputDisplay.textContent = numDisplay;
    })
})

// Perform the operation
binaryOps.forEach((binaryOp) => {
    binaryOp.addEventListener("click", (e) => {
        if (!firstOperand && !operator) {
            firstOperand = +numDisplay;
            numDisplay = "";
            operator = binaryOp.textContent;
            accDisplay.textContent = `${firstOperand} ${operator}`;
        } else if (firstOperand && !numDisplay) {
            operator = binaryOp.textContent;
            accDisplay.textContent = `${firstOperand} ${operator}`;
        } else {
            operator = binaryOp.textContent;
            secondOperand = +numDisplay;
            numDisplay = "";
            firstOperand = operate(firstOperand, secondOperand, operator);
            accDisplay.textContent = `${firstOperand} ${operator}`
            inputDisplay.textContent = firstOperand;
            operator = secondOperand = null;
        }
    })
})

clearAll.addEventListener("click", (e) => {
    numDisplay = "";
    firstOperand = operator = secondOperand = null;
    accDisplay.textContent = "";
    inputDisplay.textContent = "";
})

del.addEventListener("click", (e)=> {
    numDisplay = numDisplay.substring(0, numDisplay.length - 1);
    inputDisplay.textContent = numDisplay;
})