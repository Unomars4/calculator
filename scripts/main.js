const digits = document.querySelectorAll("[data-digits]");
const opButton = document.querySelectorAll("[data-op]");
const clearButton = document.querySelector("[data-clr]");
const delButton = document.querySelector(".delete");
const eqButton = document.querySelector(".equal");
const mainScreen = document.querySelector(".mainScreen");
const smallScreen = document.querySelector(".smallScreen");
let firstOp = "", op = "", secondOp = "", resetScreen = false; 
mainScreen.textContent = "0";

digits.forEach(btn => btn.addEventListener("click", () => updateMain(btn.dataset.digits)));
opButton.forEach(btn => btn.addEventListener("click", () => opPressed(btn.dataset.op)));
eqButton.addEventListener("click", equalPressed);
clearButton.addEventListener("click", clearHistory);

function updateMain(n) {
    if (mainScreen.textContent === "0" || resetScreen) {
        mainScreen.textContent = n;
        resetScreen = false;
    } else {
        mainScreen.textContent += n;
    }
}

function opPressed(item) {
    firstOp = mainScreen.textContent, op =  item;
    updateSmall(firstOp,secondOp, op);
    resetScreen = true;
}

function equalPressed() {
    if (firstOp && op && !(resetScreen)) {
        secondOp = mainScreen.textContent;
        updateSmall(firstOp, secondOp, op);
        resetScreen = true;
        firstOp = operate(firstOp, secondOp, op);
        updateMain(firstOp);
        secondOp = "";
    }
}

function updateSmall(a, b, op) {
    if (a && op && !(b)) {
        smallScreen.textContent = `${a} ${op} `;
    }
    else {
        smallScreen.textContent = `${a} ${op} ${b} =`;
    }
}

function clearHistory() {
    firstOp = "", secondOp = "", op = "";
    mainScreen.textContent = "0";
    smallScreen.textContent = "";
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