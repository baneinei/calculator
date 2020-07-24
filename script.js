const calcScreen = document.querySelector("#calc_screen");

let a; // first number
let operator; // the operation to be used
let b; // second number

// Stores the last button clicked, used mainly to clear the screen,
// when you click a number after an operator has been clicked.
let lastButtonClicked; 

function add(a,b) {
    return (parseFloat(a)+ parseFloat(b)).toFixed(4);
}

function subtract(a,b) {
    return (a-b).toFixed(4);
}

function multiply(a,b) {
    return (a*b).toFixed(4);
}

function divide(a,b) {
    return (a/b).toFixed(4);
}

function operate(operator,a,b) {
    if (operator == "*"){
        return multiply(a,b);
    }
    else if (operator == "/"){
        return divide(a,b);
    }
    else if (operator == "-"){
        return subtract(a,b);
    }
    else if (operator == "+"){
        return add(a,b);
    }
}

function replaceToScreen(inputValue) {
    clearScreen();
    appendToScreen(inputValue);
}

function clearScreen() {
    calcScreen.setAttribute("value","");
}

function appendToScreen(inputValue) {
    if (["*","+","-","/","="].includes(lastButtonClicked)) {
        clearScreen();
    }
    console.log(["*","+","-","/"].includes(lastButtonClicked));    
    calcScreen.setAttribute("value",calcScreen.getAttribute("value") + inputValue);
}

// adds an event listener to all the buttons.
const btns = document.querySelectorAll(".num_btn");
for (let i = 0 ;i < btns.length ; i++) {
    btns.item(i).addEventListener("click", () => {
        appendToScreen(btns.item(i).getAttribute("value")); // each button is equipped with a value attribute, which gets put to use here
        lastButtonClicked = btns.item(i).getAttribute("value"); // This must happen after appendToScreen, otherwise the screen
        // wont get cleared when you press a number after an operator has been pressed.
    });
}

// event listener for C
document.querySelector(".clr_btn").addEventListener("click",clearScreen);

//Functionality for the operators
const operator_btns = document.querySelectorAll(".operator_btn");
for (let i = 0 ;i < operator_btns.length ; i++) {
    operator_btns.item(i).addEventListener("click", () => {
        a = calcScreen.getAttribute("value");
        if (a != "") {
            operator_btns.item(i).classList.add("active"); // Gives the operator button the styling when it's pressed.
            lastButtonClicked = operator_btns.item(i).getAttribute("value");
            operator = operator_btns.item(i).getAttribute("value");
            addDotBtnListener();

        }
    });
}

function dotBtnEvents() {
    appendToScreen(dot_btn.getAttribute("value"));
    lastButtonClicked = dot_btn.getAttribute("value");
    removeDotBtnListener();
}

const dot_btn = document.querySelector(".dot_btn");
let dotBtnHasListener = false;
addDotBtnListener();
function addDotBtnListener() {
    if (dotBtnHasListener == false) {
        dotBtnHasListener = true;
        dot_btn.addEventListener("click", dotBtnEvents);
        dot_btn.classList.remove("inactive");
    }
}

function removeDotBtnListener() {
    if (dotBtnHasListener) {
        dot_btn.removeEventListener("click", dotBtnEvents);
        dotBtnHasListener = false;
        dot_btn.classList.add("inactive");
    }
    
}


//Functionality for the equals button
const equals_btn = document.querySelector(".equals_btn");
equals_btn.addEventListener("click",() => {

    for (let i = 0 ; i < operator_btns.length ; i++) {
        operator_btns.item(i).classList.remove("active");
    }

    lastButtonClicked = equals_btn.getAttribute("value");
    b = calcScreen.getAttribute("value");
    result = operate(operator,a,b);
    replaceToScreen(result);
    a = calcScreen.getAttribute("value");
    addDotBtnListener();
});
