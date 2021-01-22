let result = 0;
let history = '';
let currentOperator = '';
let numOperators=0;
let clearResultDisplay = 0;
const operatorArray = ['+','-','*','÷','%']
const displayHistory=document.getElementById('history');
const displayResult=document.getElementById('result');

// basic operations - add, subtract, multiply, divide, mod

function addNum(num1, num2){
    return num1+num2;
}

function subtractNum(num1,num2){
    return num1-num2;
}

function multiplyNum(num1,num2){
    return num1*num2;
}

function divideNum(num1,num2){
    return num1/num2;
}

function modNum(num1,num2){
    return num1%num2;
}
// takes operator and 2 numbers, calls corresponding function with 2 numbers

function operate(num1,num2,operator){
    switch (operator){
        case '+':
            result = addNum(num1,num2);
            console.log(result);
            break;
        case '-':
            result = subtractNum(num1,num2);
            console.log(result);
            break;
        case '*':
            result = multiplyNum(num1,num2);
            console.log(result);
            break;
        case '÷':
            result = divideNum(num1,num2);
            console.log(result);
            break;
        case '%':
            result = modNum(num1,num2);
            console.log(result);
            break;
    }
}

// set all globals back to original value, clear screen
function clearAll(){
    result = 0;
    history = '';
    currentOperator = '';
    numOperators=0;
    clearResultDisplay = 0;
    displayResult.textContent = '';
    displayHistory.textContent = '';
}

function negate(){
    if (displayResult.textContent.charAt(0) == '-'){
        displayResult.textContent = displayResult.textContent.slice(1);
    } else {
        displayResult.textContent = '-'+ displayResult.textContent;
    }
}

// event listener
const specialOperators = document.querySelectorAll('.specialOperator');
specialOperators.forEach((spOp)=>{
    spOp.addEventListener('click', function(e){
        switch (e.target.id){
            case 'clear':
                clearAll();
                break;
            case 'delete':
                // removes last char from string displayResult
                displayResult.textContent = displayResult.textContent.slice(0,-1);
                break;
            case 'equals':
                console.log(e.target.id);
                break;
        }

    });
});

const operators = document.querySelectorAll('.operator');
operators.forEach((op)=>{
    op.addEventListener('click', function(e){
        displayHistory.textContent += displayResult.textContent;
        numOperators += 1;
        // need to add case for equals 
        // need to add functionality for clear all, delete
        if (numOperators==1){
            result = Number(displayResult.textContent);
            displayHistory.textContent += e.srcElement.innerText;
            displayResult.textContent = '';
        } else if (numOperators==2){
            num2 = Number(displayResult.textContent);
            operate(result,num2,currentOperator);
            displayResult.textContent = result;
            currentOperator = e.srcElement.innerText;
            displayHistory.textContent = result + currentOperator;
            numOperators=1;
            clearResultDisplay += 1;
        }
        currentOperator = e.srcElement.innerText
    });
});

const btns = document.querySelectorAll('.btn');
btns.forEach((btn)=>{
    btn.addEventListener('click', function(e){
        // resets displayResult if a result is displayed, and a user inputs a number
        if (clearResultDisplay){
            displayResult.textContent = '';
            clearResultDisplay=0;
        }
        console.log(e.target.id);
        if (e.target.id == 'decimal' && displayResult.textContent.includes('.')){
            return;
        } else if (e.target.id == 'negate'){
            negate();
        } else {
            displayResult.textContent += (e.srcElement.innerText);
        }
    });
});