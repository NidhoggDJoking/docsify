
*  CSS
  *  [CSS总篇](css/css.md)
  *  [CSS Button](css/button.md)
  *  [CSS Animation](css/animation.md)
  *  [CSS浮动](css/float.md)
  *  [Less](css/less.md)
  *  [Sass](css/sass.md)
  *  [瀑布流](css/waterfall.md)
    *  CSS 布局
        *  [CSS flex](css/flex.md)
        *  [CSS grid](css/grid.md)
        *  [CSS Layout](css/layout.md)
    *  图片相关 CSS
        *  [CSS 图片相关](css/photo.md)
        *  [CSS3 object-fit](css/fit.md)
        *  [CSS3 mask(遮罩)](css/mask.md)
        *  [CSS3 filter 属性](css/filter.md)
        *  [CSS3 filter 拓展](css/drop.md)
    *  文字相关 CSS
        *  [clip-path](css/clip.md)
        *  [CSS3 font](css/font.md)
        *  [CSS3 Font Family](css/family.md)
*  JavaScript
  *  [Js常用](js/often.md)
  *  [Js循环](js/for.md)
  *  [webGL](notes/webgl.md)
  *  [Js Async](notes/Async.md)
  *  [前端输入](js/keyboard.md)
  *  [深浅拷贝](js/deep.md)
  *  [文本复制](notes/copy.md)
  *  [Event 类](js/event.md)
  *  [文件下载](js/download.md)
  *  [JS原型链](js/prototype.md)
  *  [JS Date](js/date.md)
  *  [Js代码片段](js/fragment.md)
  *  [防抖和节流](notes/debounce.md)
  *  [Canvas拖拽](js/drag.md)
  *  [Web Components](js/components.md)
  *  [call、apply、bind](js/cab.md)
  *  [Event loop / 宏任务和微任务](js/loop.md)
    * 图片相关 JS
      *  [图片懒加载](js/lazy.md)
      *  [IntersectionObserver实现懒加载](js/intersection.md)
    * 算法相关 JS
      *  [Lintcode](js/lintcode.md)
      *  [十大经典排序算法](js/algorithm.md)
      *  [Js 写法与运行速度](js/speed.md)
    * 音视频相关
      *  [视频取帧](notes/video.md)
      *  [视频相关](js/barrage.md)
      *  [音频剪裁剪切复制播放](js/video.md)
    * ES
      *  [ES6 Class](js/class.md)
      *  [ES6 Symbol](js/symbol.md)
      *  [ES6 Promise](js/promise.md)
      *  [Js Future](js/future.md)
    * Vue
      *  [Vite](vue/vite.md)
      *  [Vuex](vue/vuex.md)
      *  [minio](vue/minio.md)
      *  [Axios](vue/axios.md)
      *  [Vue趋势](vue/vue3.md)
      *  [Vue相关](vue/directives.md)
      *  [双向数据绑定](vue/property.md)
      *  [Vue + JQuery](vue/jquery.md)
      *  [Vue + 百度地图](vue/map.md)
    * React
      *  [React](react/react.md)
    * TS
      *  [TypeScript](ts/ts.md)
    * Node
      *  [Node](node/node.md)
    * NPM
      *  [NVM](node/nvm.md)
      *  [Yarn](node/yarn.md)
      *  [发布NPM包](node/npm.md)
*  杂记篇
  *  [面筋儿](notes/face.md)
  *  [Gitee](notes/gitee.md)
  *  [客制化](notes/keyboard.md)
  *  [Canvas](notes/canvas.md)
  *  [CodePen](notes/codepen.md)
  *  [理论知识](notes/unimportance.md)
  *  [颜色选择器](notes/color.md)
  *  [百度语言合成](notes/baidu.md)
  *  [和风天气插件](notes/hefeng.md)
  *  [博客代码编辑器](notes/note.md)
  *  [Macbook快捷键](notes/mac.md)
      * Git
        *  [Git命令](git/basics.md)
      * SQL
        *  [SQL基础](sql/query.md)
      * Windows
        *  [命令提示符](win/bash.md)
        *  [Windows对象](win/tool.md)
      * uniApp
        *  [习惯文档](uniapp/base.md)
        *  [HbuildX](uniapp/uni.md)



<!-- 侧边栏样式 -->
<style>
.sidebar {
    user-select: none;
}
.sidebar-nav li>p {
  font-size: 16px;
  font-weight: 600;
  color: #545454;
  letter-spacing: 1px;
  text-shadow: 0px 0px 1px #ff91f1;
  animation: navText 12s infinite;
}

.sidebar ul li {
  font-size: 16px;
  font-weight:600;
  text-decoration: auto;
}
.sidebar ul li a{
  font-size: 15px;
}
.sidebar ul>li{
    color: #676767;
    font-size: 14px!important;
    font-family: 'Comic Sans MS', cursive;
}
.sidebar ul li a{
    font-family: 'Comic Sans MS', cursive;
    text-decoration: auto;
}
.sidebar ul li.active>a{
  font-size: 18px;
  text-decoration: auto;

  background: linear-gradient(to right, #00bcff, #00ff96,#fbff00,#ff7600);
  -webkit-background-clip: text;
  color: transparent;
  /* font-family: cursive; */
  /* color: #00de82; */
  /* text-shadow: 1px 1px 1px #0083a8; */
}

@keyframes navText {
  0% {
      text-shadow: 0px 0px 1px #ff0053;
  }

   25% {
      text-shadow: 0px 0px 1px #00ffa0;
  }

   50% {
      text-shadow: 0px 0px 1px #ff7500;
  }

   75% {
      text-shadow: 0px 0px 1px #2196f3;
  }

  100% {
      text-shadow: 0px 0px 1px #ff0053;
  }
}

</style>