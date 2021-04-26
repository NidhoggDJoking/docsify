### CSS Grid（网格） 布局

---

#### 📌[阮一峰 の Grid 布局教程](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

<div id="container">
  <div class="item item-1">1</div>
  <div class="item item-2">2</div>
  <div class="item item-3">3</div>
  <div class="item item-4">4</div>
  <div class="item item-5">5</div>
</div>

```css
#container{
  max-width:600px;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  grid-template-rows: repeat(3,80px);
  grid-row-gap: 15px;
  grid-column-gap: 15px;
}
.item {
  font-size: 1em;
  padding:10px;
  color:#ffffff;
  border: 1px solid #e5e4e9;
}

.item-1 {
  grid-column:1/3;
  grid-row:1/3;
  background-color: #b03531;
}

.item-2 {
  background-color: #33a8a5;
}

.item-3 {
  background-color: #30997b;
}

.item-4 {
  background-color: #6a478f;
  grid-column:3/4;
  grid-row:2/4;
}

.item-5 {
  background-color: #da6f2b;
}
```

```html
<div id="container">
  <div class="item item-1">1</div>
  <div class="item item-2">2</div>
  <div class="item item-3">3</div>
  <div class="item item-4">4</div>
  <div class="item item-5">5</div>
</div>

```

<style>
#container{
  max-width:600px;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  grid-template-rows: repeat(3,80px);
  grid-row-gap: 15px;
  grid-column-gap: 15px;
}

.item {
  font-size: 1em;
  padding:10px;
  color:#ffffff;
  border: 1px solid #e5e4e9;
}

.item-1 {
  grid-column:1/3;
  grid-row:1/3;
  background-color: #b03531;
}

.item-2 {
  background-color: #33a8a5;
}

.item-3 {
  background-color: #30997b;
}

.item-4 {
  background-color: #6a478f;
  grid-column:3/4;
  grid-row:2/4;
}

.item-5 {
  background-color: #da6f2b;
}
</style>