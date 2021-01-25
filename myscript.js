let result = 0;
let history = '';
let currentOperator = '';
let numOperators=0;
let clearDisplayResult = 0;
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
            break;
        case '-':
            result = subtractNum(num1,num2);
            break;
        case '*':
            result = multiplyNum(num1,num2);
            break;
        case '÷': 
            if (num2==0){
                alert('You cannot divide by 0!');
                clearAll();
                break;
            }
            result = divideNum(num1,num2);
            break;
        case '%':
            result = modNum(num1,num2);
            break;
    }
    result = roundToTen(result);
    result = trimLength(result);
}

function trimLength(num){
    return Number(num.toString().slice(0,12));
}

function roundToTen(num){
    return +(Math.round(num + "e+10")  + "e-10");
}

// set all globals back to original value, clear screen
function clearAll(){
    result = 0;
    history = '';
    currentOperator = '';
    numOperators=0;
    clearDisplayResult = 0;
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

function evaluate(){
    num2=Number(displayResult.textContent);
    operate(result,num2,currentOperator);
    displayResult.textContent = result;
    clearDisplayResult += 1;
}

function equals(){
    if (numOperators == 1){
        if (displayResult.textContent !== ''){
            evaluate();
            displayHistory.textContent += num2 + '=';
            numOperators = 0;
        }
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
                equals();
                break;
        }

    });
});

const operators = document.querySelectorAll('.operator');
operators.forEach((op)=>{
    op.addEventListener('click', function(e){
        if (displayHistory.textContent.includes('=')){
            displayHistory.textContent = '';
        }
        displayHistory.textContent += displayResult.textContent;
        numOperators += 1;
        if (numOperators==1){
            result = Number(displayResult.textContent);
            displayHistory.textContent += e.srcElement.innerText;
            displayResult.textContent = '';
        } else if (numOperators==2){
            evaluate();
            currentOperator = e.srcElement.innerText;
            displayHistory.textContent = result + currentOperator;
            numOperators=1;
        }
        currentOperator = e.srcElement.innerText
    });
});

const btns = document.querySelectorAll('.btn');
btns.forEach((btn)=>{
    btn.addEventListener('click', function(e){
        // resets displayResult if a result is displayed, and a user inputs a number immediately after
        if (clearDisplayResult){
            displayResult.textContent = '';
            clearDisplayResult=0;
        }
        if (e.target.id == 'decimal' && displayResult.textContent.includes('.')){
            return;
        } else if (e.target.id == 'negate'){
            negate();
        } else if (displayResult.textContent.length>=10){
            return;
        } else {
            displayResult.textContent += (e.srcElement.innerText);
        }
    });
});