const calcScreen = document.querySelector("#calc_screen");

function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    return a/b;
}

function operate(operator,a,b) {
    if (operator == "*"){
        multiply(a,b);
    }
    else if (operator == "/"){
        divide(a,b);
    }
    else if (operator == "-"){
        subtract(a,b);
    }
    else if (operator == "+"){
        add(a,b);
    }
}

function appendToScreen(inputValue) {
    calcScreen.setAttribute("value",calcScreen.getAttribute("value") + inputValue);
}

const btns = document.querySelectorAll(".num_btn");
for (let i = 0 ;i < btns.length ; i++) {
    btns.item(i).addEventListener("click", () => {
        appendToScreen(btns.item(i).getAttribute("value"));
    });
}