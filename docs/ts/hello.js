// function sayHello(person) {
//     return 'Hello, ' + person;
// }
// var user = 'Tom';
// console.log(sayHello(user));

// let arr = [2, 4, 5, 6, 9, 10]

// Array.prototype.myFilter = function(fn, thisArgs) {
//     if (Object.prototype.toString.call(fn) !== '[object Function]') {
//         throw ('Error in params');
//     }
//     let curArr = this;
//     let result = [];
//     console.log(this)
//     for (let i = 0; i < curArr.length; i++) {

//         if (fn.call(thisArgs, curArr[i], i, curArr)) {
//             result.push(curArr[i])
//         }
//     }
//     return result;
// }

// let res = arr.myFilter((item, index, data) => {
//     return item > 3
// })

// console.log(res)


// Array.prototype.myMap = function(callback, thisArgs) {
//     if (this == undefined) {
//         throw new TypeError('this is null or not defined')
//     }
//     if (typeof callback !== 'function') {
//         throw new TypeError(callback + ' is null or not defined')
//     }
//     const res = []

//     const O = Object(this)
//     const len = O.lenght >>> 0
//     for (let i = 0; i < len; i++) {
//         if (i in O) {
//             res[i] = callback.call(thisArgs, O[i], i, this)
//         }
//     }
//     return res;
// }