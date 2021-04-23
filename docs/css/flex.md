### CSS Flex（弹性） 布局

---

#### [弹性布局教程:语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html) 🔰 [弹性布局教程:实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

<br>

---

> #### 案例通用

```html
<div class="flex-box">
    <div class="flex-item"></div>
    <div class="flex-item"></div>
    <div class="flex-item"></div>
</div>
```

#### `align-items`属性定义项目在交叉轴上如何对齐。

<br>

<div class="flex-box1">
    <div class="flex-item"></div>
    <div class="flex-item"></div>
    <div class="flex-item"></div>
</div>

<h4>align-items :</h4>

<div class="switch-box" >
    <div class="switch">
        <input type="checkbox" checked id="flex-start" style="display: none" />
        <label for="flex-start">
            <div></div>
        </label>
    </div>
    <span>flex-start</span>
</div>

<div class="switch-box" >
    <div class="switch">
        <input type="checkbox" checked id="center" style="display: none" />
        <label for="center">
            <div></div>
        </label>
    </div>
    <span>center</span>
</div>

<div class="switch-box" >
    <div class="switch">
        <input type="checkbox" checked id="flex-end" style="display: none" />
        <label for="flex-end">
            <div></div>
        </label>
    </div>
    <span>flex-end</span>
</div>

<div class="switch-box" >
    <div class="switch">
        <input type="checkbox" checked id="stretch" style="display: none" />
        <label for="stretch">
            <div></div>
        </label>
    </div>
    <span>stretch</span>
</div>

---

#### `justify-content`属性定义了项目在主轴上的对齐方式。

<br>

<div class="flex-box2">
    <div class="flex-item"></div>
    <div class="flex-item"></div>
    <div class="flex-item"></div>
</div>

<h4>justify-content :</h4>

<div class="switch-box" >
    <div class="switch">
        <input type="checkbox" checked id="flex-start2" style="display: none" />
        <label for="flex-start2">
            <div></div>
        </label>
    </div>
    <span>flex-start</span>
</div>

<div class="switch-box" >
    <div class="switch">
        <input type="checkbox" checked id="center2" style="display: none" />
        <label for="center2">
            <div></div>
        </label>
    </div>
    <span>center</span>
</div>

<div class="switch-box" >
    <div class="switch">
        <input type="checkbox" checked id="flex-end2" style="display: none" />
        <label for="flex-end2">
            <div></div>
        </label>
    </div>
    <span>flex-end</span>
</div>

<div class="switch-box" >
    <div class="switch">
        <input type="checkbox" checked id="space-between" style="display: none" />
        <label for="space-between">
            <div></div>
        </label>
    </div>
    <span>space-between</span>
</div>

<div class="switch-box" >
    <div class="switch">
        <input type="checkbox" checked id="space-around" style="display: none" />
        <label for="space-around">
            <div></div>
        </label>
    </div>
    <span>space-around</span>
</div>



<script>
const box1 = document.querySelector(".flex-box1");
const boxStyle1 = box1.style;

const box2 = document.querySelector(".flex-box2");
const boxStyle2 = box2.style;

const btn1 =  document.querySelector("#flex-start");
const btn2 =  document.querySelector("#center");
const btn3 =  document.querySelector("#flex-end");
const btn4 =  document.querySelector("#stretch");

const btn1t =  document.querySelector("#flex-start2");
const btn2t =  document.querySelector("#center2");
const btn3t =  document.querySelector("#flex-end2");
const btn4t =  document.querySelector("#space-between");
const btn5t =  document.querySelector("#space-around");

btn1.addEventListener("click", e => {
    boxStyle1.setProperty("--aligni", `${e.target.id}`);
    $(".switch-box input:not(#flex-start)").prop("checked", true);
});

btn2.addEventListener("click", e => {
    boxStyle1.setProperty("--aligni", `${e.target.id}`);
    $(".switch-box input:not(#center)").prop("checked", true);
});

btn3.addEventListener("click", e => {
    boxStyle1.setProperty("--aligni", `${e.target.id}`);
    $(".switch-box input:not(#flex-end)").prop("checked", true);
});

btn4.addEventListener("click", e => {
    boxStyle1.setProperty("--aligni", `${e.target.id}`);
    $(".switch-box input:not(#stretch)").prop("checked", true);
});

btn1t.addEventListener("click", e => {
    boxStyle2.setProperty("--justc", `flex-start`);
    $(".switch-box input:not(#flex-start2)").prop("checked", true);
});

btn2t.addEventListener("click", e => {
    boxStyle2.setProperty("--justc", `center`);
    $(".switch-box input:not(#center2)").prop("checked", true);
});

btn3t.addEventListener("click", e => {
    boxStyle2.setProperty("--justc", `flex-end`);
    $(`.switch-box input:not(#${e.target.id})`).prop("checked", true);
});

btn4t.addEventListener("click", e => {
    boxStyle2.setProperty("--justc", `${e.target.id}`);
    $(`.switch-box input:not(#${e.target.id})`).prop("checked", true);
});

btn5t.addEventListener("click", e => {
    boxStyle2.setProperty("--justc", `${e.target.id}`);
    $(`.switch-box input:not(#${e.target.id})`).prop("checked", true);
});
</script>


<style>
.flex-box1{
    width:100%;
    max-width:450px;
    height:300px;
    background-color: #e74c3c;
    display:flex;
    justify-content:var(--justc);
    align-items:var(--aligni)
}
.flex-box1>.flex-item{
    width:150px;
    height:100px;
}
.flex-box2{
    width:100%;
    max-width:450px;
    height:300px;
    background-color: #e74c3c;
    display:flex;
    justify-content:var(--justc);
    align-items:var(--aligni)
}
.flex-box2>.flex-item{
    width:100px;
    height:100px;
    background-color: #f1c40f;
}
.flex-box1>.flex-item:nth-child(1){
    background-color: #ff9b87;
}
.flex-box1>.flex-item:nth-child(2){
    background-color: #fb5656
}
.flex-box1>.flex-item:nth-child(3){
    background-color: #ff7979;
}

.flex-box2>.flex-item:nth-child(1){
    background-color: #ff9b87;
}
.flex-box2>.flex-item:nth-child(2){
    background-color: #fb5656
}
.flex-box2>.flex-item:nth-child(3){
    background-color: #ff7979;
}

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