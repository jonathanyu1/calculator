let result = 0;

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