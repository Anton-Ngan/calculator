
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
    "*": multiply,
    "÷": divide,
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
        if (firstOperand !== null && !operator) {
            firstOperand = null;
            accDisplay.textContent = "";
        }

        if ((numDisplay.charAt(0) === "-" && numDisplay.length <= 17 || numDisplay.length < 17) && 
            !(numDisplay === "0" && num.textContent === "0")) {

            if (numDisplay === "0") {
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
        if (firstOperand === null && !operator) {
            firstOperand = +numDisplay;
            numDisplay = "";
            operator = binaryOp.textContent;
            accDisplay.textContent = `${firstOperand} ${operator}`;
        } else if (firstOperand !== null && !numDisplay) {
            operator = binaryOp.textContent;
            accDisplay.textContent = `${firstOperand} ${operator}`;
        } else {
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
    if (firstOperand && !operator && !secondOperand) {
        let temp = firstOperand.toString().substring(0, firstOperand.toString().length - 1)
        firstOperand = +temp;
        inputDisplay.textContent = firstOperand;
        accDisplay.textContent = firstOperand;
    } else if (numDisplay !== "") {
        numDisplay = numDisplay.substring(0, numDisplay.length - 1);
        inputDisplay.textContent = numDisplay;
    }
})

equal.addEventListener("click", (e) => {
    if (firstOperand !== null && operator && numDisplay) {
        secondOperand = +numDisplay;
        let res = operate(firstOperand, secondOperand, operator);
        accDisplay.textContent = `${firstOperand} ${operator} ${secondOperand} =`;
        inputDisplay.textContent = res;
        firstOperand = res;
        operator = secondOperand = null;
        numDisplay = "";
    }
})

sign.addEventListener("click", (e) => {
    if (firstOperand && !operator && !secondOperand) {
        firstOperand *= -1;
        inputDisplay.textContent = firstOperand;
        accDisplay.textContent = firstOperand;
    }

    if (numDisplay.length > 0 && numDisplay != 0) {
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