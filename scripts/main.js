const date = document.querySelector(".date");
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
year = new Date();
date.textContent = year.getFullYear();


digits.forEach(btn => btn.addEventListener("click", () => updateMain(btn.dataset.digits)));
opButton.forEach(btn => btn.addEventListener("click", () => setOperator(btn.dataset.op)));
eqButton.addEventListener("click", doCalculation);
clearButton.addEventListener("click", clearHistory);
delButton.addEventListener("click", deleteDigit);
dotButton.addEventListener("click", addDot);
window.addEventListener("keydown", keyboardAction);

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
    if (currentOperator) doCalculation();
    firstOperand = mainScreen.textContent;
    currentOperator = item;
    updateSmall();
    screenReset();
}

function doCalculation() {
    if (!(currentOperator)) return;
    secondOperand = mainScreen.textContent;
    if (currentOperator === "/" &&  secondOperand === "0") return alert("You can't divide by 0");
    screenReset();
    updateMain(operate(firstOperand, secondOperand, currentOperator));
    screenReset();
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

function keyboardAction(e) {
    if ( e.key >= "0" && e.key <= "9" ) updateMain(e.key);
    if (e.key === "+" ||
        e.key === "-" ||
        e.key === "/" ||
        e.key === "*") {
                setOperator(e.key);
    }
    if (e.key == ".") addDot();
    if (e.key === "=" || e.key === "Enter")doCalculation();
    if (e.key == "Backspace") deleteDigit();
    if (e.key == "Escape") clearHistory();
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
        case "*":
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
    return Math.round((a / b), 1);
}