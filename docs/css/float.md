## CSS 浮动

> #### `position:absolute`和`float`属性的异同

?>  `共同点`：对内联元素设置float和absolute属性，可以让元素脱离文档流，并且可以设置其宽高。

?>  `不同点`：float仍会占据位置，absolute会覆盖文档流中的其他元素。


|    | 脱离文档 | 原占位保留  | 清除方法 | z-index 属性 |
| :----------- | :-----: | :---: | :---: | :---: |
| 浮动(float)   | 是 | 否 | `clear:both` | 不支持 |
| 相对(relative)   | 否 | 是 | `position:static` | 不支持 |
| 绝对(absolute)   | 是 | 否 | `position:static` | 不支持 |
| 固定(fixed)   | 是 | 否 | `position:static` | 不支持 |
| 静态(static)   | 否 | 是 |  | 不支持 |