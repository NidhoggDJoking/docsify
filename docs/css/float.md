## CSS 浮动

> #### `position:absolute`和`float`属性的异同

?>  `共同点`：对内联元素设置float和absolute属性，可以让元素脱离文档流，并且可以设置其宽高。

?>  `不同点`：float仍会占据位置，absolute会覆盖文档流中的其他元素。


|                   | 脱离文档 | 原占位保留 |     清除方法      | z-index 属性 |
| :---------------- | :------: | :--------: | :---------------: | :----------: |
| 浮动 (`float`)    |    是    |     否     |   `clear:both`    |    不支持    |
| 相对 (`relative`) |    否    |     是     | `position:static` |    不支持    |
| 绝对 (`absolute`) |    是    |     否     | `position:static` |    不支持    |
| 固定 (`fixed`)    |    是    |     否     | `position:static` |    不支持    |
| 静态 (`static`)   |    否    |     是     |                   |    不支持    |

---

> #### 清除浮动

<div class="outer">
    <div class="div1">1</div>
    <div class="div2">2</div>
    <div class="div3">3</div>
    <div class="clear none"></div>
</div>

---

- #### 方法一：添加新的元素 `clear：both`

<div class="switch-box" >
    <div class="switch">
        <input type="checkbox" checked id="clear" style="display: none" />
        <label for="clear">
            <div></div>
        </label>
    </div>
    <span>使用clear</span>
</div>

- #### 方法二：父级div定义 `overflow: auto`

<div class="switch-box" >
    <div class="switch">
        <input type="checkbox" checked id="overflow" style="display: none" />
        <label for="overflow">
            <div></div>
        </label>
    </div>
    <span>使用overflow</span>
</div>

- #### 方法三：`:after` 方法：（注意：作用于浮动元素的父元素）

<div class="switch-box" >
    <div class="switch">
        <input type="checkbox" checked id="after" style="display: none" />
        <label for="after">
            <div></div>
        </label>
    </div>
    <span>使用after</span>
</div>

```html
<div class="outer /** over-flow over-after*/ ">
    <div class="div1">1</div>
    <div class="div2">2</div>
    <div class="div3">3</div>
    <!-- <div class="clear"></div> -->
</div>
```



```css
.outer{
    border: 1px solid #ccc;
    background: #fc9;
    color: #fff; margin: 50px auto;
    padding: 50px;
}

.outer>div{
    font-size: 32px;
    line-height: 80px;
    text-align: center;
}
.over-flow{
    overflow: auto;
    zoom: 1; /*zoom: 1; 是在处理兼容性问题 */
}
.div1{
    width: 80px;
    height: 80px;
    background: #f44336;
    float: left;}
.div2{width: 80px;
    height: 80px;
    background: #03a9f4;
    float: left;
}
.div3{
    width: 80px;
    height: 80px;
    background: #8bc34a;
    float: left;
}
.clear{
    clear:both;
    height: 0;
    line-height: 0;
    font-size: 0
}
```

<script>
const btn1 =  document.querySelector("#clear");
btn1.addEventListener("click", e => {
    // $(".switch-box input:not(#clear)").prop("checked", true);
    $(".clear").toggleClass("none");
});
const btn2 =  document.querySelector("#overflow");
btn2.addEventListener("click", e => {
    $(".outer").toggleClass("over-flow");
});
const btn3 =  document.querySelector("#after");
btn3.addEventListener("click", e => {
    $(".outer").toggleClass("over-after");
});
</script>


<style>
.outer{
    border: 1px solid #ccc;
    background: #fc9;
    color: #fff; margin: 50px auto;
    padding: 50px;
}
.over-after:after {
    clear:both;
    content:'';
    display:block;
    width: 0;
    height: 0;
    visibility:hidden;
}
.outer>div{
    font-size: 32px;
    line-height: 80px;
    text-align: center;
}
.over-flow{
    overflow: auto;
     zoom: 1; /*zoom: 1; 是在处理兼容性问题 */
}
.div1{
    width: 80px;
    height: 80px;
    background: #f44336;
    float: left;}
.div2{width: 80px;
    height: 80px;
    background: #03a9f4;
    float: left;
}
.div3{
    width: 80px;
    height: 80px;
    background: #8bc34a;
    float: left;
}
.clear{
    clear:both;
    height: 0;
    line-height: 0;
    font-size: 0
}
.none{display:none}

/* 按钮开始 */

.switch-box{
    display:flex;
    align-items:center;
}
.switch-box>span{
    font-size:20px;
    font-family: 'Comic Sans MS', cursive;
    margin-left:10px;
    padding: 10px;
}
.switch>label {
  display: flex;
  border-radius: 99px;
  height: 32px;
  width: 64px;
  background-color: #e74c3c;
  border: 1px solid #e74c3c;
  justify-content: flex-end;
}

.switch>input[type=checkbox]:checked+label {
  background-color: #f9f9f9;
  border: 1px solid #c5c5c5;
  justify-content: flex-start;
}

.switch>label>div {
  border-radius: 9999px;
  width: 32px;
  background-color: #FFF;
  border: 1px solid rgba(0, 0, 0, .3);
}

.switch>input[type=checkbox]:checked+label>div {
  border: 1px solid rgba(156, 156, 156, 0.3);
}
/* 按钮结束 */
</style>