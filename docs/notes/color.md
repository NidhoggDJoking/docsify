## 颜色选择器

<hr>

>#### 纯 RGBA 版本

<iframe src="notes/color2.html" style="height:490px"></iframe >

```javascript
// (h, s, v) 为偏差值 转 RGB
const hsvToRgb = (h, s, v) => {
    var r, g, b;
    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            r = v, g = t, b = p;
        break;
        case 1:
            r = q, g = v, b = p;
        break;
        case 2:
            r = p, g = v, b = t;
        break;
        case 3:
            r = p, g = q, b = v;
        break;
        case 4:
            r = t, g = p, b = v;
        break;
        case 5:
            r = v, g = p, b = q;
        break;
    }

    return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];

}
```

```javascript
h = (transparency.value / 360).toFixed(2);

hexInput.value = "rgba(" + (hsvToRgb(h, s, v)) + "," + h + ")";

// RGBA 为 RGB 加上 透明度值
```

<hr>

>#### 纯 HEX 版本

<iframe src="notes/color3.html" style="height:490px"></iframe >

> #### 核心代码
```javascript
h = (transparency.value / 360).toFixed(2);
h = aToHex(h);
hexInput.value = rgbToHex(...hsvToRgb(h, s, v)) + h;
```
```javascript
// rgb 转 Hex
const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
```
```javascript
//  RGBA 中的A转成 HEX 格式
function aToHex(num) {
    return Math.round(num * 255).toString(16);
}
```
<hr>

>#### HEX ，RGBA 版本

<iframe src="notes/color.html" style="height:490px"></iframe >

<hr>

>#### 纯 HEX `+`复制功能 版本

<iframe src="notes/color4.html" style="height:500px"></iframe >

---

## Hexcode to RGB (Hex转RGB)

##### 使用`Array.slice()` , `Array.map()` 和 `match()` 将十六进制颜色代码（前缀为#）转换为RGB值的字符串。

```javascript
const hexToRgb = hex => `rgb(${hex.slice(1).match(/.{2}/g).map(x => parseInt(x, 16)).join()})`
// hexToRgb('#27ae60') -> 'rgb(39,174,96)'
```

## RGB to hexadecimal（RGB转hex）

##### 使用按位左移运算符`(<<)`和 `toString(16)` 将给定的RGB参数转换为十六进制字符串，然后使用 `padStart(6,'0')` 得到一个6位的十六进制值。

```javascript
const rgbToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
// rgbToHex(255, 165, 1) -> 'ffa501'
```

> #### 复制功能请参照  `JavaScript`  `H5点击复制文本`