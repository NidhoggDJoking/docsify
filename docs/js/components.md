## Web Components

<hr>

> #### 组件是前端的发展方向，现在流行的 React 和 Vue 都是组件框架

?> 谷歌公司由于掌握了 Chrome 浏览器，一直在推动浏览器的原生组件，即 Web Components API。<br>
相比第三方框架，原生组件简单直接，符合直觉，不用加载任何外部模块，代码量小。目前，它还在不断发展，但已经可用于生产环境

# `简单示例`

<div>
    <user-card
        image="https://cdn.jsdelivr.net/gh/nidhoggdjoking/CDN@1.0/img/inori.png"
        name="Inori"
        email="nidhoggdjoking@gmail.com">
    </user-card>
    <template id="userCardTemplate">  
        <img class="image">
        <div class="container">
            <p class="name"></p>
            <p class="email"></p>
            <button class="button">All Alone With You</button>
        </div>
        <style>
        :host {
            display: flex;
            align-items: center;
            width: 430px;
            height: 180px;
            background-color: #fff8fa;
            border: 1px solid #ececec;
            box-shadow: 1px 1px 10px 1px rgba(250, 0, 254, 0.07);
            border-radius: 14px;
            overflow: hidden;
            padding: 13px;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }
        .image {
            flex: 0 0 auto;
            width: 150px;
            height: 150px;
            vertical-align: middle;
            border-radius: 10px;
        }
        .container {
            box-sizing: border-box;
            padding: 10px 20px;
            height: 150px;
        }
        .container > .name {
            font-size: 20px;
            font-weight: 600;
            line-height: 1;
            margin: 0;
        }
        .container > .email {
            font-size: 12px;
            opacity: 0.75;
            line-height: 1;
            font-weight: 600;
            margin: 20px 0 25px 0;
            color:#00112b;
        }
        .container > .button {
            padding: 11px 25px;
            font-size: 12px;
            border-radius: 5px;
            text-transform: uppercase;
            outline: none;
            background: #d9ffea;
            color: #ff6363;
        }
        </style>
        <script>
            console.log("模板运行了JS")
        </script>
    </template>
</div>

> ##### 声明模板，HTML和CSS都可以写入进来但JS不行
```HTML
    <template id="userCardTemplate">  
        <img class="image">
        <div class="container">
            <p class="name"></p>
            <p class="email"></p>
            <button class="button">All Alone With You</button>
        </div>
        <style>
        :host {
            display: flex;
            align-items: center;
            width: 430px;
            height: 180px;
            background-color: #fff8fa;
            border: 1px solid #ececec;
            box-shadow: 1px 1px 10px 1px rgba(250, 0, 254, 0.07);
            border-radius: 14px;
            overflow: hidden;
            padding: 13px;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }
        .image {
            flex: 0 0 auto;
            width: 150px;
            height: 150px;
            vertical-align: middle;
            border-radius: 10px;
        }
        .container {
            box-sizing: border-box;
            padding: 10px 20px;
            height: 150px;
        }
        .container > .name {
            font-size: 20px;
            font-weight: 600;
            line-height: 1;
            margin: 0;
        }
        .container > .email {
            font-size: 12px;
            opacity: 0.75;
            line-height: 1;
            font-weight: 600;
            margin: 20px 0 25px 0;
            color:#00112b;
        }
        .container > .button {
            padding: 11px 25px;
            font-size: 12px;
            border-radius: 5px;
            text-transform: uppercase;
            outline: none;
            background: #d9ffea;
            color: #ff6363;
        }
        </style>
        <script>
            // 无法运行JS
            console.log("模板运行了JS")
        </script>
    </template>
```

> ##### 组件模板继承`HTMLElement`
```javascript
class UserCard extends HTMLElement {
  constructor() {
    super();
    var shadow = this.attachShadow( { mode: 'closed' } );
    
    var templateElem = document.getElementById('userCardTemplate');
    var content = templateElem.content.cloneNode(true);
    content.querySelector('img').setAttribute('src', this.getAttribute('image'));
    content.querySelector('.container>.name').innerText = this.getAttribute('name');
    content.querySelector('.container>.email').innerText = this.getAttribute('email');

    shadow.appendChild(content);
  }
}
window.customElements.define('user-card', UserCard);
```

> ##### 使用组件
```HTML
    <user-card
        image="https://cdn.jsdelivr.net/gh/nidhoggdjoking/CDN@1.0/img/inori.png"
        name="Inori"
        email="nidhoggdjoking@gmail.com">
    </user-card>
```

<br/>

#### [Web Components 入门实例教程](http://www.ruanyifeng.com/blog/2019/08/web_components.html)


<script>
class UserCard extends HTMLElement {
  constructor() {
    super();
    var shadow = this.attachShadow( { mode: 'closed' } );
    
    var templateElem = document.getElementById('userCardTemplate');
    var content = templateElem.content.cloneNode(true);
    content.querySelector('img').setAttribute('src', this.getAttribute('image'));
    content.querySelector('.container>.name').innerText = this.getAttribute('name');
    content.querySelector('.container>.email').innerText = this.getAttribute('email');

    shadow.appendChild(content);
  }
}
window.customElements.define('user-card', UserCard);
</script>


<style>
/* @import url('static/css/code.css'); */
</style>