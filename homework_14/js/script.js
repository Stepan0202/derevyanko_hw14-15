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
const hw14_t4_form = document.querySelector("#form_hw14_t4_mainArray");
const hw14_t4_formsContainer = document.querySelector("#containerFormsForinnerArrays")
const hw14_t4_form2 = document.querySelector("#formsForInnerArrays")
const hw14_t4_form3 = document.querySelector("#formsForValues")
const hw14_t4_array = [];
let arrayLength = 0;
hw14_t4_form.addEventListener('submit', (e) => {
    e.preventDefault()
    arrayLength = parseInt(e.target.hw14_t4.value)
    let header = document.createElement("h2");
    header.innerHTML = "input length of your  inner arrays";
    hw14_t4_formsContainer.appendChild(header);
    hw14_t4_formsContainer.appendChild(hw14_t4_form2);
    for(let i = 0; i < arrayLength; i++){
        let input = document.createElement("input")
        input.setAttribute("type", "number");
        input.setAttribute("name", i);
        hw14_t4_form2.appendChild(input)
    }
    const button = document.createElement('button');
    button.setAttribute("type", "submit");
    button.innerHTML = "NEXT"
    hw14_t4_form2.appendChild(button)
    hw14_t4_form2.addEventListener('submit', (e) => {
        e.preventDefault();
        const header = document.createElement("h2");
        header.innerHTML = "input values in your inner arrays";
        hw14_t4_formsContainer.insertAdjacentElement("afterbegin", header)
        for(let i = 0; i < arrayLength; i++){
            const length = parseInt(e.target[i].value)
            let arrNum = document.createElement('p');
            arrNum.innerHTML = `Array ${i}`;
            hw14_t4_form3.appendChild(arrNum)
            hw14_t4_array.push([])
            for(let j = 0; j < length; j++){
                const inputData = document.createElement("input")
                inputData.setAttribute("type", "text");
                inputData.setAttribute("name", `${i}${j}`);
                inputData.setAttribute("data-i", i);
                inputData.setAttribute("data-j", j);
                arrNum.appendChild(inputData);
            } 
        }
        const submitButton = document.createElement('button');
        submitButton.setAttribute('type', 'submit');
        submitButton.innerHTML = "Get my array";
        hw14_t4_form3.appendChild(submitButton);
        hw14_t4_form3.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = e.target;
            for(let i = 0; i < formData.length-1; i++){
                const inputi = formData[i].dataset.i;
                hw14_t4_array[inputi].push(formData[i].value);
            }
            hw14_t4_formsContainer.innerHTML = `Your array is ${JSON.stringify(hw14_t4_array)}`;
    
        })     

    })

})

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



/*
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
} */