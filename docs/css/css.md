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

- ### border style

<div class="border">
    <div class="dotted">dotted</div>
    <div class="dashed">dashed</div>
    <div class="solid">solid</div>
    <div class="double">double</div>
    <div class="groove">groove</div>
    <div class="ridge">ridge</div>
    <div class="inset">inset</div>
    <div class="outset">outset</div>
</div>

- none (没有边框，无论边框宽度设为多大) 
- dotted (点线式边框) 
- dashed (破折线式边框) 
- solid (直线式边框) 
- double (双线式边框) 
- groove (槽线式边框) 
- ridge(脊线式边框) 
- inset (内嵌效果的边框) 
- outset (突起效果的边框)


---

> #### display: none与visibility: hidden的区别

?> `visibility: hidden` 的隐藏依旧占据布局时所使用的空间，而 `display: none` 则如同DOM消失一样

- `visibility`具有继承性，给父元素设置`visibility:hidden;`子元素也会继承这个属性。但是如果重新给子元素设置`visibility: visible`,则子元素又会显示出来。这个和`display: none`有着质的区别

- `visibility: hidden`不会影响计数器的计数，如图所示，`visibility: hidden`虽然让一个元素不见了，但是其计数器仍在运行。这和`display: none`完全不一样

- CSS3的`transition`支持visibility属性，但是并不支持display，由于`transition`可以延迟执行，因此可以配合`visibility`使用纯CSS实现`hover`延时显示效果。提高用户体验。

<style>
.border{
    display:flex;
    flex-wrap: wrap;
}
.border>div{
    width:100px;
    height:100px;
    line-height:98px;
    text-align:center;
    margin:10px;
}

.dotted{
    border:2px dotted #333
}
.dashed{
    border:2px dashed #333
}
.solid{
    border:2px solid #333
}
.double{
    border:2px double #333
}
.groove{
    border:2px groove #333
}
.ridge{
    border:2px ridge #333
}
.inset{
    border:2px inset #333
}
.outset{
    border:2px outset #333
}
</style>