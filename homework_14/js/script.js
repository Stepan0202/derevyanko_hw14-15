'use strict'
/*
Написати функцію, яка приймає один параметр. При першому виклику вона запам'ятовує його, при другому — підсумовує переданий параметр з тим, що передали перший раз і тд. Все це із замиканнями, наприклад: sum(3) = 3 sum(5) = 8 sum(20) = 28*/

function hw14_sum() {
    let number = 0;
    return function(num){
        number +=num;
        return number;
    }
}
let hw14_adder = hw14_sum();
console.log(`Task 1. Add 4: ${hw14_adder(4)}`);
console.log(`Task 1. Add 7: ${hw14_adder(7)}`);
console.log(`Task 1. Add 9: ${hw14_adder(9)}`);
console.log(`Task 1. Add -698: ${hw14_adder(-698)}`);


/*Даний масив з елементами різних типів. Створити функцію, яка вираховує середнє арифметичне лише числових елементів даного масиву.*/
let hw14_combinedArray = [1, 35, [34, {lebediDance : true, someNum: 2}, 'hello world', -98, [567, 2345]], "Hello", true, 8];
function hw14_makeOnlyNumbersArray(array){
    let numsArray = [];
    for (const key in array) {
        if(typeof array[key] == 'object'){
            numsArray.push(hw14_makeOnlyNumbersArray(array[key]).flat());  
            numsArray.flat();
        }
        else{
            if(!isNaN(array[key]) && typeof array[key] != 'boolean') numsArray.push(array[key]);
        }
    }
    let result = numsArray.flat();
    return result;
}
function hw14_findAverage(array){
    const numsArray = hw14_makeOnlyNumbersArray(array);
    let sum = 0;
    let average;
    numsArray.forEach(el => sum += el);
    average = sum / array.length;
    return average;
}
console.dir("Inner array " + hw14_combinedArray);
console.log(`Task 2, Average: ${hw14_findAverage(hw14_combinedArray)}`);

/*Написати функцію doMath(x, znak, y), яка отримує 3 аргументи: числа x та y, рядок znak. У змінній znak може бути значення +, -, *, /, %, ^ (ступінь). Вивести результат математичної дії, вказаної у змінній znak. Обидва числа та знак виходять від користувача.*/
const hw14_submit = document.querySelector("#hw14_t3_submit");
const signs = ["+","-","*","/","%","^"];
hw14_submit.addEventListener('click', (e) => {
    e.preventDefault();
    const firstNum = document.querySelector("#hw14_t3_num1").value;
    const sign = document.querySelector("#hw14_t3_num2").value;
    const secondNum = document.querySelector("#hw14_t3_num3").value;
    if(isNaN(firstNum)) alert("Enter a number in the first field!");
    if(isNaN(secondNum)) alert("Enter a number in the third field!");
    if(signs.indexOf(sign) < 0) alert("Enter a +, -, *, /, % or ^ in the second field!");
    function makeOperation(sign, firstNum, secondNum){
        let result;
        const a = parseFloat(firstNum);
        const b = parseFloat(secondNum);
        switch (sign){
            case "+":
                result = a+b;
                break;
            case "-":
                result = a-b;
                break;
            case "*":
                result = a*b;
                break;
            case "/":
                result = a/b;
                break;
            case "%":
                result = a%b;
                break;
            case "^":
                result = Math.pow(a,b);
                break;
        }
        return result;
    }
    console.log(`Task 3: ${makeOperation(sign, firstNum, secondNum)}`);
});

/*Написати функцію заповнення даними користувача двомірного масиву. Довжину основного масиву та внутрішніх масивів задає користувач. Значення всіх елементів масивів задає користувач.*/
const hw14_t4_submit = document.querySelector("#hw14_t4_submit");
hw14_t4_submit.addEventListener('click', (e) => {
    e.preventDefault();
    const userInput = document.querySelector('#hw14_t4').value;
    let userInputArray = userInput.split(',').map(parseUserStringToArray);
    console.log(parseUserArrayTo2DArray(userInputArray));

});
function parseUserStringToArray(el){
    let resultArray = [];
    el = el.trim();
    el = tryToParseEl(el);
    resultArray.push(el);
    return el;
}
function parseUserArrayTo2DArray(userArray){ 
    let resultArray = [];
    console.log(Boolean('false'))
    for(let i = 0; i < userArray.length; i++){
        let el = userArray[i];
        if (isNaN(el) && el.substring(0,1) == '['){
            let bufferArray = [];
            let isContinue = true;
            bufferArray.push(tryToParseEl(el.substring(1)));
            i++;
            while(isContinue){
                let currentEl = userArray[i];
                if(isNaN(currentEl) && currentEl.substring(currentEl.length-1) == ']'){
                    el = userArray[i].substring(0, currentEl.length-1);
                    el = tryToParseEl(el);
                    bufferArray.push(el);
                    isContinue = false;
                }
                else{
                    bufferArray.push(userArray[i]);
                    i++;
                }               
            }
            resultArray.push(bufferArray);
        }
        else{
            resultArray.push(el);
        }
    }

    return resultArray;
}
function tryToParseEl(el){
    if(!isNaN(parseFloat(el))) {
        el = parseFloat(el);     }
    else if(el) {
        switch(el){
            case 'true':
                el = true;
                break;
            case 'false':
                el = false;
                break;
        }
    }
    return el;
}

/*Створити функцію, яка видаляє з рядка всі символи, які ми передали другим аргументом. 'func("hello world", ['l', 'd'])' поверне нам "heo wor". Вихідний рядок та символи для видалення задає користувач*/
function deleteSymbols(string, symbolsToDelete){
    const stringArray = string.split("");
    let resultString = "";
    stringArray.forEach(el => {
        let isAdd = true;
        for(let i = 0; i < symbolsToDelete.length; i++){
            if(el == symbolsToDelete[i]) isAdd = false;
        }
        if (isAdd) resultString += el;
    })
    return resultString;
}
const hw14_t5_ans = deleteSymbols('string 4 split lalal. 1 Hello 2 World! []!.,$%^1234', ['L', 'd']);
console.log(`Task 5: ${hw14_t5_ans}`);