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
console.log(hw14_adder(4));
console.log(hw14_adder(7));
console.log(hw14_adder(9));
console.log(hw14_adder(-698));


/*Даний масив з елементами різних типів. Створити функцію, яка вираховує середнє арифметичне лише числових елементів даного масиву.*/
let hw14_combinedArray = [1, 2, [3, {lebediDance : true, number: 4}, 'hello world', 5, [6, 7, [8, 9]]], "Hello", true];
function hw14_findAverage(array){
    let numsArray = [];
    let sum = 0;
    for (const key in array) {
        if(typeof array[key] == 'object'){
            console.log(`REcursive case: ${key} : ${array[key]} — ${sum}`);
            return hw14_findAverage(array[key]);
        }
        else{
            if(!isNaN(array[key]) && typeof array[key] != 'boolean'){
                console.log('Basic case');
                sum += array[key];
            } 
            
            
        }
        console.log(`${key} : ${array[key]} — ${sum}`);
    }
    return sum;
}
console.log(hw14_findAverage(hw14_combinedArray));


/*Написати функцію doMath(x, znak, y), яка отримує 3 аргументи: числа x та y, рядок znak. У змінній znak може бути значення +, -, *, /, %, ^ (ступінь). Вивести результат математичної дії, вказаної у змінній znak. Обидва числа та знак виходять від користувача.



/*Написати функцію заповнення даними користувача двомірного масиву. Довжину основного масиву та внутрішніх масивів задає користувач. Значення всіх елементів масивів задає користувач.*/


/*Створити функцію, яка видаляє з рядка всі символи, які ми передали другим аргументом. 'func("hello world", ['l', 'd'])' поверне нам "heo wor". Вихідний рядок та символи для видалення задає користувач*/