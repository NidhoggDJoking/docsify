### Object

```javascript
const obj = {
  prop: 1886
};

Object.freeze(obj);

obj.prop = 1933;
// Throws an error in strict mode

console.log(obj.prop);
// expected output: 1886
```