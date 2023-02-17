## Web Components

<hr>

> #### 组件是前端的发展方向，现在流行的 React 和 Vue 都是组件框架

?> 谷歌公司由于掌握了 Chrome 浏览器，一直在推动浏览器的原生组件，即 Web Components API。<br>
相比第三方框架，原生组件简单直接，符合直觉，不用加载任何外部模块，代码量小。目前，它还在不断发展，但已经可用于生产环境

#### `简单示例`

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

> #### 声明模板，HTML和CSS都可以写入进来但JS不行
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

### [Web Components](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_custom_elements)

?> Web Components 标准非常重要的一个特性是，它使开发者能够将HTML页面的功能封装为 custom elements（自定义标签），而往常，开发者不得不写一大堆冗长、深层嵌套的标签来实现同样的页面功能。

<br>

> #### 组件模板继承`HTMLElement`
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

> #### 使用组件
```HTML
    <user-card
        image="https://cdn.jsdelivr.net/gh/nidhoggdjoking/CDN@1.0/img/inori.png"
        name="Inori"
        email="nidhoggdjoking@gmail.com">
    </user-card>
```

> #### 添加样式

自定义元素通过`window.customElements.define`注册后是可以直接在css中当做普通标签编写样式

```css
user-card {
  /* ... */
}
```


### Switch 开关

<div>
    <j-switch checked="true"></j-switch>
    <template id="switchTemplate">  
        <div class="switch">
            <input type="checkbox"  id="radio-switch-joking"  style="display: none" />
            <label for="radio-switch-joking">
                <div></div>
            </label>
        </div>
        <style>
        :host {
        }
        .switch>label {
                display: flex;
                border-radius: 99px;
                height: 32px;
                width: 64px;
                background-color: #f9f9f9;
                border: 1px solid #c5c5c5;
                justify-content: flex-start;
            }
            .switch>input[type=checkbox]:checked+label {
                background-color: #357edd;
                border: 1px solid #357edd;
                justify-content: flex-end;
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
        </style>
    </template>
</div>

```html
<!-- 使用 -->
<j-switch checked="true"></j-switch>

<!-- 模板 -->
<template id="switchTemplate">  
    <div class="switch">
        <input type="checkbox"  id="radio-switch-joking"  style="display: none" />
        <label for="radio-switch-joking">
            <div></div>
        </label>
    </div>
    <style>
    :host {
    }
    .switch>label {
        display: flex;
        border-radius: 99px;
        height: 32px;
        width: 64px;
        background-color: #f9f9f9;
        border: 1px solid #c5c5c5;
        justify-content: flex-start;
            }
    .switch>input[type=checkbox]:checked+label {
        background-color: #357edd;
        border: 1px solid #357edd;
        justify-content: flex-end;
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
    </style>
</template>
```

```js
class JSwitch extends HTMLElement {
    constructor() {
    super();
    var shadow2 = this.attachShadow( { mode: 'closed' } );
    var templateElem2 = document.getElementById('switchTemplate');
    var content = templateElem2.content.cloneNode(true);
    content.querySelector('#radio-switch-joking').checked = JSON.parse(this.getAttribute('checked'));
    shadow2.appendChild(content);
  }
}

window.customElements.define('j-switch', JSwitch);
```

<br/>

#### [Web Components 入门实例教程](http://www.ruanyifeng.com/blog/2019/08/web_components.html)

`例子一`

```javascript
class SearchInput extends HTMLElement {
    constructor() {
        super();
        // 创建一个 shadow root
        let shadow = this.attachShadow({mode: 'open'});

        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('class', 'input-vlaue');

        const button = document.createElement('input');
        button.setAttribute('type', 'button');
        button.setAttribute('value', 'Search');

        // 创建一些 CSS，并应用到 shadow dom上
        let style = document.createElement('style');
        style.textContent=".input-vlaue{margin:5px; color:red;}";


        shadow.append(input);
        shadow.append(button);
        shadow.append(style);
    }
}

// declare var customElements: CustomElementRegistry;
customElements.define('search-input', SearchInput);
```

`例子二`

```javascript
class JNavigation extends HTMLElement {
    constructor() {
        super();
        // 创建一个 shadow root
        let shadow = this.attachShadow({
            mode: 'open'
        });

        let dataList = [{
                'elaborate': 'About',
                'href': 'index.html',
                'active': true
            },
            {
                'elaborate': 'Resume',
                'href': 'resume.html',
                'active': false
            },
            {
                'elaborate': 'Portfolio',
                'href': 'portfolio.html',
                'active': false
            },
            {
                'elaborate': 'Blog',
                'href': 'blog.html',
                'active': false
            },
            {
                'elaborate': 'Contact',
                'href': 'contact.html',
                'active': false
            }
        ];

        const div = document.createElement('div');
        div.setAttribute('class', 'inner-menu');

        const ul = document.createElement('ul');
        ul.setAttribute('class', 'nav');

        for (let i = 0, len = dataList.length; i < len; i++){
            var li = document.createElement('li');
            li.setAttribute('class', 'nav__item');
            var a = document.createElement('a');
            a.setAttribute('href', dataList[i].href);
            a.setAttribute('class', dataList[i].active ? 'active' : '');
            a.innerText = dataList[i].elaborate;
            li.appendChild(a)
            ul.appendChild(li)
        }
        
        div.appendChild(ul)

        shadow.append(div);
    }
}

customElements.define('j-navigation', JNavigation);

```


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


class JSwitch extends HTMLElement {
    constructor() {
    super();
    var shadow2 = this.attachShadow( { mode: 'closed' } );
    var templateElem2 = document.getElementById('switchTemplate');
    var content = templateElem2.content.cloneNode(true);
    // console.log('checked',this.getAttribute('checked'))
    // console.log('checked-type',typeof this.getAttribute('checked'))
    // this.getAttribute 返回的是字符串
    // console.log('checked-bool',Boolean(this.getAttribute('checked')))
    // Boolean('false') === true;
    // console.log('checked-json',JSON.parse(this.getAttribute('checked')))
    // content.querySelector('#radio-switch-joking').checked = Boolean(this.getAttribute('checked'));
    content.querySelector('#radio-switch-joking').checked = JSON.parse(this.getAttribute('checked'));
    // console.log('joking',content.querySelector('#radio-switch-joking').checked)
    // content.querySelector('#radio-switch-joking').setAttribute('checked', this.getAttribute('checked'));
    shadow2.appendChild(content);
  }
}

window.customElements.define('j-switch', JSwitch);
</script>


<style>
/* @import url('static/css/code.css'); */
</style>