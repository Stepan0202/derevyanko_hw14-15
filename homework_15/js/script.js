'use strict'
function memo(fn){
    let cache = {};
    let cacheArr = [];
    let iterator = 0;
    return function(num){
        if (cache[num] == undefined) {
            cache[num] = fn(num);
            cacheArr.push(num);
            iterator++;
            if(iterator > 10){
                let elDoDelete = cacheArr.shift();
                console.log(elDoDelete);
                delete cache[elDoDelete];
            }
        }
        console.table(cache)
        console.log(`Cache array: ${cacheArr}`)
        return cache[num];
    }
}
function getCall(phoneNum){
    return `tel: ${phoneNum}`;
}

let testMemo = memo(getCall);
console.log(testMemo(1));
console.log(testMemo(1));
console.log(testMemo(1));
console.log(testMemo(2));
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
