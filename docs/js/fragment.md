## 代码片段

---

### Array remove (移除数组中的元素)

?> 使用 Array.filter() 和 Array.reduce() 来查找返回真值的数组元素，使用 Array.splice() 来移除元素。 func 有三个参数(value, index, array)。

```js
const remove = (arr, func) =>
  Array.isArray(arr) ? arr.filter(func).reduce((acc, val) => {
    arr.splice(arr.indexOf(val), 1); return acc.concat(val);
    }, [])
  : [];

// console.log( remove([1, 2, 3, 4], n => n % 2 == 0) )
// [2,4]
```
---

### Average of array of numbers (求数字数组的平均数)

?> 使用 Array.reduce() 将数组中的每个值添加到一个累加器，使用 0 初始化，除以数组的 length (长度)。

```js
const average = arr => arr.reduce((acc, val) => acc + val, 0) / arr.length;

// console.log( average([1,2,3]) )
// -> 2
```
---

### Count occurrences of a value in array (计数数组中某个值的出现次数)

?> 每次遇到数组中的指定值时，使用 Array.reduce() 来递增计数器。

```js
const countOccurrences = (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0);

// console.log( countOccurrences([1,1,2,1,2,3], 1) )
// -> 3
```
---

### Unique values of array (数组去重)

?> 使用 ES6 的 Set 和 ...rest 操作符剔除重复的值。

```js
const unique = arr => [...new Set(arr)];

// console.log( unique([1,2,2,3,4,4,5]) )
// -> [1,2,3,4,5]
```


#### [代码片段传送门](https://www.css88.com/30-seconds-of-code/)