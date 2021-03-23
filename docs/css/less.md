### CSS 预处理之 Less

<br>

?> Less 是一门 CSS 预处理语言，它扩展了 CSS 语言，增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展。Less也是一种动态样式语言. 对CSS赋予了动态语言的特性，如变量，继承，运算， 函数. Less 既可以在客户端上运行 (支持IE 6+, Webkit, Firefox)，也可在服务端运行 (借助 Node.js)。

### 常用功能

>#### 1. 值变量： `less 的变量声明是以@开头`

```css
/* less */
@nice-blue: #5B83AD;
@light-blue: @nice-blue + #111;

#header {
  color: @light-blue;
}
```
>#### 2. 选择器变量： `选择器也可使用变量,变量需要用@{}包括`

```css
@mySelector: .wrap;
@{mySelector}{ //变量名 必须使用大括号包裹
  color: #999;
  width: 50%;
}
```

>#### 3. 属性变量： `属性名称使用变量`

```css
@borderStyle: border-style;
@Soild:solid;
#wrap{
  @{borderStyle}: @Soild;//变量名 必须使用大括号包裹
}
```

>#### 4. url变量：

```css
@images: "../img";//需要加引号
body {
  background: url("@{images}/dog.png");//变量名 必须使用大括号包裹
}
```

>#### 5. 声明变量：`类似于mixins,用于引入公共代码块`

```css
@background: {background:red;};
#main{
    @background();
}

// css
#main{
  background:red;
}
```

>#### 6. 变量作用域：`less 中变量的作用域是采用就近原则`

```css
/* Less */
@var: @a;
@a: 100%;
#wrap {
  width: @var;
  @a: 9%;
}
@a: 8%;

/* 生成的 CSS */
#wrap {
  width: 9%;
}
```

>#### 7. 基本层级嵌套：

```css
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }
}
```

>#### 8. 父选择&符：

```css
a {
  color: blue;
  &:hover {
    color: green;
  }
}
```
>#### 9. 嵌套指令冒泡：

```css
// less
.screen-color {
  @media screen {
    color: green;
    @media (min-width: 768px) {
      color: red;
    }
  }
}

/* css */
@media screen {
  .screen-color {
    color: green;
  }
}
@media screen and (min-width: 768px) {
  .screen-color {
    color: red;
  }
}
```

>#### 10. 运算符：

```css
@base: 5%;
@filler: @base * 2; // result is 10%
@other: @base + @filler; // result is 15%
```


>#### 11. extend 继承：`extend 是 Less 的一个伪类。它可继承 所匹配声明中的全部样式`

```css
/* Less */
.animation{
    transition: all .3s ease-out;
    .hide{
      transform:scale(0);
    }
}
#main{
    &:extend(.animation);
}
#con{
    &:extend(.animation .hide);
}

/*  CSS */
.animation,#main{
  transition: all .3s ease-out;
}
.animation .hide , #con{
    transform:scale(0);
}
```

>#### 12. all 全局搜索替换：`使用选择器匹配到的 全部声明`
```css
/* Less */
#main{
  width: 200px;
}
#main {
  &:after {
    content:"Less is good!";
  }
}
#wrap:extend(#main all) {}

/*  CSS */
#main,#wrap{
  width: 200px;
}
#main:after, #wrap:after {
    content: "Less is good!";
}
```

>#### 13. 函数：`less 提供多种函数可以使用`
```css
/* 判断类型 */
isnumber(#ff0);     // 判断给定的值 是否 是一个数字
iscolor(#ccc)      //判断给定的值 是否 是一个颜色
isurl("")         // 判断给定的值 是否 是一个 url

/* 颜色操作 */
rgb(90, 129, 32)   //  #5a8120
mix(#ff0000, #0000ff, 50%)   // #800080
hsl(90, 100%, 50%)   // #80ff00 
argb(rgba(90, 23, 148, 0.5)) // #805a1794
darken(hsl(90, 80%, 50%), 20%)  // #4d8a0f

/* 数学函数 */
ceil(2.4)  // 3  
floor(2.6)  // 2
percentage(0.5) // 50%
round(1.67, 1) // 1.7
sqrt(25cm)   // 5cm
abs(-18.6%)  // 18.6%
```

>#### 14. 避免编译：`使用 ~' 值 ' 结构可以避免被编译`

```css
/* Less */
#main{
  width:~'calc(300px-30px)';
}

/*  CSS */
#main{
  width:calc(300px-30px);
}
```

>#### 15. 条件语句when：`Less 没有 if else，它有 when用于做条件判断`

```css
/* Less */
#card{
    
    // and 运算符 ，相当于 与运算 &&，必须条件全部符合才会执行
    .border(@width,@color,@style) when (@width>100px) and(@color=#999){
        border:@style @color @width;
    }

    // not 运算符，相当于 非运算 !，条件为 不符合才会执行
    .background(@color) when not (@color>=#222){
        background:@color;
    }

    // , 逗号分隔符：相当于 或运算 ||，只要有一个符合条件就会执行
    .font(@size:20px) when (@size>50px) , (@size<100px){
        font-size: @size;
    }
}
#main{
    #card>.border(200px,#999,solid);
    #card .background(#111);
    #card > .font(40px);
}
/* 生成后的 CSS */
#main{
  border:solid #999 200px;
  background:#111;
  font-size:40px;
}
```

>#### 16. 导入：`导入 less 文件 可省略后缀`

```css
import "main"; 
//等价于
import "main.less";

/* 使用@import (reference)导入外部文件，但不会添加 把导入的文件 编译到最终输出中，只引用。 */

/* Less */
@import (reference) "bootstrap.less"; 

#wrap:extend(.navbar all){}
```

>#### 17. 注释：

```css
/* */ CSS原生注释，会被编译在 CSS 文件中。
/   / Less提供的一种注释，不会被编译在 CSS 文件中
```

>#### 18. 使用 JS：`Less 是由 JS 编写，所以 Less 能在代码中使用 Javascript`

```css
/* Less */
@content:`"aaa".toUpperCase()`;
#randomColor{
  @randomColor: ~"rgb(`Math.round(Math.random() * 256)`,`Math.round(Math.random() * 256)`,`Math.round(Math.random() * 256)`)";
}
#wrap{
  width: ~"`Math.round(Math.random() * 100)`px";
  &:after{
      content:@content;
  }
  height: ~"`window.innerHeight`px";
  alert:~"`alert(4396)`";
  #randomColor();
  background-color: @randomColor;
}
/* 生成后的 CSS */

// 弹出 4396
#wrap{
  width: 随机值（0~100）px;
  height: 743px;//由电脑而异
  background: 随机颜色;
}
#wrap::after{
  content:"AAA";
}
```

<hr>

### 全局使用Less

<br>

```css
<style lang='less'>
    @import '../src/styles/base.less';
</style>
```

> #### 上面的方法过于麻烦,也不符合全局引用的思想。尝试这个方法：
 
 <br>
 
#### 项目路径下执行 `vue add style-resources-loader`  或  `npm install style-resources-loader -D` 命令

<br>

!> `VSCode 的终端`可能会遇到运行失败建议在资源管理器里运行`cmd命令`打开终端

`项目创建时没有安装Less需使用Less的安装命令:`

```
npm install --save-dev less-loader less
```

 修改 `vue.config.js`

```js
const path = require("path");

module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/styles/base.less")]
    }
  },
  lintOnSave: true, //  eslint 验证
  devServer: {
    overlay: {
      warnings: true,
      error: true
    }
  }
};
```

> `main.js` 无须引入全局Less文件，直接使用即可:

### `base.less`

```css
@width:calc(100% - 1rem);

```

!> vue文件style标签下使用可以 单纯只使用变量可无须添加`lang="less"` 使用其他功能必须添加`lang="less"`否则报错无法运行。

```css
p {
  width: @width;
  margin: 0 auto;
};

```