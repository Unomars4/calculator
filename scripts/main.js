const digits = document.querySelectorAll("[data-digits]");
const opButton = document.querySelectorAll("[data-op]");
const clearButton = document.querySelector("[data-clr]");
const delButton = document.querySelector(".delete");
const eqButton = document.querySelector(".equal");
const dotButton = document.querySelector(".dot");
const mainScreen = document.querySelector(".mainScreen");
const smallScreen = document.querySelector(".smallScreen");
let firstOperand = "", currentOperator = "", secondOperand = "", resetScreen = false;
mainScreen.textContent = "0";


digits.forEach(btn => btn.addEventListener("click", () => updateMain(btn.dataset.digits)));
opButton.forEach(btn => btn.addEventListener("click", () => setOperator(btn.dataset.op)));
eqButton.addEventListener("click", doCalculation);
clearButton.addEventListener("click", clearHistory);
delButton.addEventListener("click", deleteDigit);
dotButton.addEventListener("click", addDot);

function updateMain(n) {
    if (mainScreen.textContent === "0" || resetScreen) {
        mainScreen.textContent = n;
        resetScreen = false;
    } else {
        mainScreen.textContent += n;
    }
}

function screenReset() {
    resetScreen = true;
}

function setOperator(item) {
    if (firstOperand && currentOperator) {
        let tempOperator = currentOperator;
        secondOperand = mainScreen.textContent;
        mainScreen.textContent = operate(firstOperand,secondOperand,tempOperator);
        secondOperand = "";
        firstOperand = mainScreen.textContent;
        currentOperator = item;
    }else {
        firstOperand = mainScreen.textContent; 
        currentOperator = item;
    }
    updateSmall();
    screenReset();
}

function doCalculation() {
    if (resetScreen) return;
    if ((!(firstOperand) || !(currentOperator)) || 
    (firstOperand && !(currentOperator))) return;
    secondOperand = mainScreen.textContent;
    screenReset();
    updateMain(operate(firstOperand, secondOperand, currentOperator));
    updateSmall();
    secondOperand = "";
    currentOperator = "";
}

function updateSmall() {
    if (firstOperand && currentOperator && !(secondOperand)) {
        smallScreen.textContent = `${firstOperand} ${currentOperator} `;
    }
    else {
        smallScreen.textContent = `${firstOperand} ${currentOperator} ${secondOperand} =`;
    }
}

function clearHistory() {
    firstOperand = "", secondOperand = "", currentOperator = "";
    mainScreen.textContent = "0";
    smallScreen.textContent = "";
}

function deleteDigit() {
    if (mainScreen.textContent.length == 1) return mainScreen.textContent = "0";
    if (mainScreen.textContent == "0") return;
    let value = mainScreen.textContent.split("")
    .slice(0, -1)
    .join("");
    screenReset();
    mainScreen.textContent = value;
}

function addDot() {
    if (mainScreen.textContent.includes(".")) return;
    updateMain(".");
}

function operate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "/":
            return divide(a, b);
        case "x":
            return muliply(a, b);
        default:
            break;
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a,b) {
    return a -b;
}

function muliply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) return "You can't divide by 0"; 
    return Math.round((a / b), 1);
}