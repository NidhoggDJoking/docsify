## JavaScript 常用方法

---

#### 数组 相关:


##### `Array.prototype.slice()`

> `slice()` 方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的`浅拷贝`（包括 begin，不包括end）。原始数组不会被改变。

- 浅拷贝只复制某个对象的引用，而不复制对象本身，新旧对象还是共享同一块内存
- 深拷贝会创造一个一摸一样的对象，新对象和原对象不共享内存，修改新对象不会改变原对对象。

?> `begi` *可选* <br>
提取起始处的索引（从 0 开始），从该索引开始提取原数组元素。如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取，slice(-2) 表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）。如果省略 begin，则 slice 从索引 0 开始。如果 begin 超出原数组的索引范围，则会返回空数组。

?> `end` *可选* <br>
提取终止处的索引（从 0 开始），在该索引处结束提取原数组元素。slice 会提取原数组中索引从 begin 到 end 的所有元素（包含 begin，但不包含 end）。slice(1,4) 会提取原数组中从第二个元素开始一直到第四个元素的所有元素 （索引为 1, 2, 3的元素）。如果该参数为负数， 则它表示在原数组中的倒数第几个元素结束抽取。 slice(-2,-1) 表示抽取了原数组中的倒数第二个元素到最后一个元素（不包含最后一个元素，也就是只有倒数第二个元素）。如果 end 被省略，则 slice 会一直提取到原数组末尾。如果 end 大于数组的长度，slice 也会一直提取到原数组末尾。

```js
var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
var citrus = fruits.slice(1, 3);

// fruits contains ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']
// citrus contains ['Orange','Lemon']
```


##### `Array.prototype.splice()`

> `splice()` 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式`返回被修改的内容`。`此方法会改变原数组`。

```js
var myFish = ["angel", "clown", "mandarin", "sturgeon"];
var removed = myFish.splice(2, 0, "drum");

// 运算后的 myFish: ["angel", "clown", "drum", "mandarin", "sturgeon"]
// 被删除的元素: [], 没有元素被删除
```

```js
var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
var removed = myFish.splice(2, 0, 'drum', 'guitar');

// 运算后的 myFish: ["angel", "clown", "drum", "guitar", "mandarin", "sturgeon"]
// 被删除的元素: [], 没有元素被删除
```

```js
var myFish = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon'];
var removed = myFish.splice(3, 1);

// 运算后的 myFish: ["angel", "clown", "drum", "sturgeon"]
// 被删除的元素: ["mandarin"]
```

```js
var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
var removed = myFish.splice(2);

// 运算后的 myFish: ["angel", "clown"]
// 被删除的元素: ["mandarin", "sturgeon"]
```

```js
var myFish = ['angel', 'clown', 'trumpet', 'sturgeon'];
var removed = myFish.splice(0, 2, 'parrot', 'anemone', 'blue');

// 运算后的 myFish: ["parrot", "anemone", "blue", "trumpet", "sturgeon"]
// 被删除的元素: ["angel", "clown"]
```


##### `Array.prototype.toString()`

> `toString()` 返回一个字符串，表示指定的数组及其元素。`数组转字符串`

```js
const array1 = [1, 2, 'a', '1a'];

console.log(array1.toString());
// expected output: "1,2,a,1a"
```

##### `Array.prototype.concat()`

> `concat()` 方法用于合并两个或多个数组。此方法`不会更改现有数组，而是返回一个新数组`。

```js
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

console.log(array3);
// expected output: Array ["a", "b", "c", "d", "e", "f"]
```

---

#### 字符串 相关

##### `String.prototype.split()`

> `split()` 方法使用指定的分隔符字符串将一个String对象分割成子字符串数组，以一个指定的分割字串来决定每个拆分的位置。`字符串转数组`

```js
var str="How are you doing today?";
var n=str.split(" ");
//expected output n: How,are,you,doing,today?
```

```js
var myString = "Hello World. How are you doing?";
var splits = myString.split(" ", 3);

console.log(splits);
//expected output: ["Hello", "World.", "How"]
```