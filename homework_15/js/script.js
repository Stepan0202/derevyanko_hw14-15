'use strict'
function memo(fn){
    let cache = {};
    let cacheArr = [];
    let iterator = 0;
    return function(num){
        if (cache[num] == undefined) {
            cache[num] = fn(num);
            cacheArr.push(num);
            if(++iterator > 10){
                let elToDelete = cacheArr.shift();
                console.log("Deleting from cache: " + elToDelete);
                delete cache[elToDelete];
            }
        }
        console.log("Cache:");
        console.table(cache);
        return cache[num];
    }
}
function getCall(phoneNum){
    return `tel: ${phoneNum}`;
}

let testMemo = memo(getCall);
console.log(testMemo(1234));
console.log(testMemo(1334));
console.log(testMemo(1334));
console.log(testMemo(132));
console.log(testMemo(3));
console.log(testMemo(4));
console.log(testMemo(5));
console.log(testMemo(6));
console.log(testMemo(7));
console.log(testMemo(8));
console.log(testMemo(9));
console.log(testMemo(10));
console.log(testMemo(11));
console.log(testMemo(12));
console.log(testMemo(13));
console.log(testMemo(12));