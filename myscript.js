let result = 0;
let history = '';
let currentOperator;
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
        case 'add':
            result = addNum(num1,num2);
            console.log(result);
            break;
        case 'subtract':
            result = subtractNum(num1,num2);
            console.log(result);
            break;
        case 'multiply':
            result = multiplyNum(num1,num2);
            console.log(result);
            break;
        case 'divide':
            result = divideNum(num1,num2);
            console.log(result);
            break;
        case 'modulo':
            result = modNum(num1,num2);
            console.log(result);
            break;
    }
}

// event listener

const operators = document.querySelectorAll('.operator');
operators.forEach((op)=>{
    op.addEventListener('click', function(e){
        // push current displayResult to historyResult
        // if displayHistory contains an operator and is not the last index
        // if it contains an operator and is last index, replace 
        displayHistory.textContent += displayResult.textContent;
        operatorArray.some(optr =>{
         if (operatorArray.some(optr=> displayHistory.textContent.includes(optr))){
             console.log('has op');
             console.log(optr);
             console.log(displayHistory.textContent);
             let operatorIndex=displayHistory.textContent.indexOf(optr);
             console.log(operatorIndex);
             // replace previous operator with current clicked
             if (operatorIndex=displayHistory.textContent.length-1){
                 displayHistory.textContent = displayHistory.textContent.slice(0,-1)+e.srcElement.innerText;
                 console.log(displayHistory.textContent);
             } else {
                 let num2 = Number(displayHistory.textContent.slice(operatorIndex+1,-1));
                 console.log(num2+'num2');
                 switch (optr){
                    case '+':
                        operate(result,num2,'add');
                        break;
                    case '-':
                        operate(result,num2,'subtract');
                        break;
                    case '*':
                        operate(result,num2,'multiply');
                        break;
                    case '÷':
                        operate(result,num2,'divide');
                        break;
                    case '%':
                        operate(result,num2,'modulo');
                        break;
                }
            }
         } else {
            displayHistory.textContent += e.srcElement.innerText;
         }
        });

        // store operator in temp variable operator
        currentOperator = e.srcElement.innerText;
        console.log(currentOperator+'curr');
        // convert displayResult into number, store in result
        result = Number(displayResult.textContent);
        displayResult.textContent='';
        // search historyResult if there is an operator
        // if so evaluate, and store in displayResult and result
        // clear historyResult when evaluate
    });
    });

const btns = document.querySelectorAll('.btn');
btns.forEach((btn)=>{
    btn.addEventListener('click', function(e){
        // add if statement where it clears current display result if button clicked after operator, otherwise append
        // check if current input has a decimal, if yes then prevent . from being pressed
        // if +/- pressed, add or remove - in front of input
        displayResult.textContent += (e.srcElement.innerText);
    });
});