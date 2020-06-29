## Less

<br>

>#### Less 是一门 CSS 预处理语言，它扩展了 CSS 语言，增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展。

```css
// 全局引用

@width:calc(100% - 1rem);

@flex: {
  display: flex;
  align-items: center;
  justify-content: space-between;
};

@margin: {
  width: @width;
  margin: 0 auto;
};

// 加快编程速度
.ClassName{
    @flex();
}

即:

.ClassName{
    display: flex;
    align-items: center;
    justify-content: space-between;
}

```

>#### Less 函数、访问器:

```css
.fover(@width:100%){
    max-width:@width;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.foverN(@num:2){
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: @num;
    -webkit-box-orient: vertical;
}

.ClassName{
    .fover();
}
```

### 全局使用Less

<br>

```css
<style lang='less'>
    @import '../src/styles/base.less';
</style>
```

> **上面的方法过于麻烦,也不符合全局引用的思想。尝试这个方法：**
 
 
 
**项目路径下执行** `vue add style-resources-loader`  或  `npm install style-resources-loader -D` 命令

!> `VSCode 的终端`可能会遇到运行失败建议在资源管理器里运行`cmd命令`打开终端

项目创建时没有安装Less需使用Lessd的安装命令

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

```base.less```

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