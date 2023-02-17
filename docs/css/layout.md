### CSS 日常布局

---

> #### 水平居中

<div class="parent3">
    <div class="child3">DEMO</div>
</div>

```css
.parent3{
    text-align:center;
}

.child3{
    display:inline-block;
}
```

<div class="parent4">
    <div class="child4">DEMO</div>
</div>

```css
.parent4{}

.child4{
    display:table;
    /* or width:xxpx */
    margin:0 auto;
}
```

> #### 垂直居中

<div class="parent5">
    <div class="child5">DEMO</div>
</div>

```css
.parent5 {
    display:table-cell;
    vertical-align:middle;
}
```

<div class="parent6">
    <div class="child6">DEMO</div>
</div>

```css
.parent6 {
    width:200px;
    height:200px;
    background: #fab1a0;
}
.child6 {
    line-height: 200px;
}
```


> #### 水平/垂直居中

<div class="parent1">
    <div class="child1">DEMO</div>
</div>

```css
.parent1 {
    position:relative;
}
.child1 {
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
}
```

<div class="parent2">
    <div class="child2">DEMO</div>
</div>

```css
.parent2 {
    display:flex;
    justify-content:center;
    align-items:center;
}
```

<div class="parent7">
    <div class="child7">DEMO</div>
</div>

```css
.parent7 {
    display:table-cell;
    text-align:center;
    vertical-align:middle;
}
.child7 {
    display:inline-block;
}
```

<style>
.parent1 {
    width:200px;
    height:200px;
    position:relative;
    background: #fab1a0;
}
.child1 {
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    font-family: 'Comic Sans MS', cursive;
    font-weight:600;
    font-size:26px;
    color: #333;
}
.parent2 {
    display:flex;
    justify-content:center;
    align-items:center;
    width:200px;
    height:200px;
    background: #fab1a0;
}
.child2 {
    font-family: 'Comic Sans MS', cursive;
    font-weight:600;
    font-size:26px;
    color: #333;
}
.child3{
    display:inline-block;
    font-family: 'Comic Sans MS', cursive;
    font-weight:600;
    font-size:26px;
    color: #333;
}
.parent3{
    text-align:center;
    width:200px;
    height:200px;
    background: #fab1a0;
}

.parent4{
    width:200px;
    height:200px;
    background: #fab1a0;
}
.child4 {
    display:table;
    margin:0 auto;
    font-family: 'Comic Sans MS', cursive;
    font-weight:600;
    font-size:26px;
    color: #333;
}

.parent5 {
    display:table-cell;
    vertical-align:middle;
    width:200px;
    height:200px;
    background: #fab1a0;
}
.child5 {
    font-family: 'Comic Sans MS', cursive;
    font-weight:600;
    font-size:26px;
    color: #333;
}
.parent6 {
    width:200px;
    height:200px;
    background: #fab1a0;
}
.child6 {
    line-height: 200px;
    font-family: 'Comic Sans MS', cursive;
    font-weight:600;
    font-size:26px;
    color: #333;
}

.parent7 {
    display:table-cell;
    text-align:center;
    vertical-align:middle;
    width:200px;
    height:200px;
    background: #fab1a0;
}
.child7 {
    display:inline-block;
    font-family: 'Comic Sans MS', cursive;
    font-weight:600;
    font-size:26px;
    color: #333;
}
</style>