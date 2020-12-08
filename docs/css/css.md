> #### 拓展 - CSS环境变量

?> `:root` 选择器匹配文档根元素。在 HTML 中，根元素始终是 html 元素

```css
:root{
  --bgColor:#000;
}
```

#### 变量声明就像变普通的样式声明语句一样，也可以使用内联样式.

```html
<body style="--bgColor:#000">
```

!> 变量只能作为属性值，不能作为属性名


```css
a{
    /* --bgColor:#000; */ 错误使用
}
```

> #### `var()`函数用来读取变量

```css
a{
  color:var(--bgColor);
}
```

- #### `var()`函数还可以使用第二个参数，表示变量的默认值。如果该变量不存在，就会使用这个默认值。

```css
color: var(--bgColor, #e5e5e5);
```

- #### 变量不支持`!important`

```css
background-color:--bgColor !important; 错误使用
```

- #### 如果变量值是字符串，则可以与其他字符串拼接

```css
{
    --far:'hello';
    --foo:var(--far)',world';
}
```

- #### 如果是数值，则不可以拼接

```css
{
    --far:20;
    --foo:var(--far)'px'; //无效
}
```

- #### 但可以通过`calc()`函数，将他们拼接起来

```css
{
    --far:20;
    --foo:calc(var(--far)*1px);
}
```

- #### 如果变量值带单位，则不能写成字符串形式

```css
--far:'20px';
margin-top:var(--far); //无效
 
--far:20px;
margin-top:var(--far); //有效
```

- #### CSS 变量可以和 JS 互相交互，但只能使用`getPropertyValue()`和`setProperty()`方法，而不能使用style属性

```html
<div id="box" style="--color:lightgreen;background-color: var(--color)">
    
</div>    
<script>　　
       var demo = document.getElementById('box');
       console.log(demo.style['--color']);  //undefined
       console.log(demo.style.getPropertyValue('--color')); //'lightgreen'
 
       oBtn.onclick = function(){
           oBox.style.setProperty('--color','red');
       }
</script>
```
