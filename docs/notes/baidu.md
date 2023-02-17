<!-- ### 百度语言合成 -->

<ul class="c-rainbow">
        <li class="c-rainbow__layer c-rainbow__layer--white">百度语言合成</li>
        <li class="c-rainbow__layer c-rainbow__layer--orange">百度语言合成</li>
        <li class="c-rainbow__layer c-rainbow__layer--red">百度语言合成</li>
        <li class="c-rainbow__layer c-rainbow__layer--violet">百度语言合成</li>
        <li class="c-rainbow__layer c-rainbow__layer--blue">百度语言合成</li>
        <li class="c-rainbow__layer c-rainbow__layer--green">百度语言合成</li>
        <li class="c-rainbow__layer c-rainbow__layer--yellow">百度语言合成</li>
    </ul>

<br>


?> 百度语言合成简单版，无法配置所有属性，无须配置`Key` 重点不要钱要钱的不演示

> #### 使用JQuery ：

```javascript

var zhText = "甲方普遍就是些智障";
    zhText = encodeURI(zhText);
    var audio = "<audio autoplay=\"autoplay\">" + 
    "<source src=\"http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=4&per=4&text=" + zhText + 
    "\" type=\"audio/mpeg\">" + 
    "<embed height=\"0\" width=\"0\" src=\"http://tts.baidu.com/text2audio?per=4&text=" + zhText + 
    "\">" + "</audio>";
    $('body').append(audio);

```

> #### 原生JS ：

```javascript

var zhText = "妈卖批,腾讯的API天天改是脑壳里有屎吗？";
    zhText = encodeURI(zhText);
    var audio = "<audio autoplay=\"autoplay\">" + 
    "<source src=\"http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=4&per=4&text=" + zhText + 
    "\" type=\"audio/mpeg\">" + 
    "<embed height=\"0\" width=\"0\" src=\"http://tts.baidu.com/text2audio?per=4&text=" + zhText + 
    "\">" + "</audio>";
    document.body.insertAdjacentHTML('beforeend', audio);
```

<br>

<button id="baiduVoice">点击播放</button>



### [Speech synthesis (语音合成，实验阶段）](https://developer.mozilla.org/zh-CN/docs/Web/API/SpeechSynthesisUtterance)

```javascript
const speak = message => {
  const msg = new SpeechSynthesisUtterance(message);
  msg.voice = window.speechSynthesis.getVoices()[0];
  window.speechSynthesis.speak(msg);
};

speak('Hello, World')
```

<script>
window.console = window.console || function(t) {};
if (document.location.search.match(/type=embed/gi)) {
            window.parent.postMessage("resize", "*");
        }
var btn = document.getElementById("baiduVoice");
    btn.onclick = function(){
        var zhText = "妈卖批,腾讯的API天天改是脑壳里有屎吗？";
        zhText = encodeURI(zhText);
        var audio = "<audio autoplay=\"autoplay\">" + 
        "<source src=\"http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=4&per=4&text=" + zhText + 
        "\" type=\"audio/mpeg\">" + 
        "<embed height=\"0\" width=\"0\" src=\"http://tts.baidu.com/text2audio?per=4&text=" + zhText + 
        "\">" + "</audio>";
        document.body.insertAdjacentHTML('beforeend', audio);
    }
</script>

<style>
        /* latin-ext */
        @font-face {
            font-family: 'Righteous';
            font-style: normal;
            font-weight: 400;
            src: local('Righteous'), local('Righteous-Regular'), url(https://fonts.gstatic.com/s/righteous/v8/1cXxaUPXBpj2rGoU7C9WhnGFucE.woff2) format('woff2');
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        /* latin */
        @font-face {
            font-family: 'Righteous';
            font-style: normal;
            font-weight: 400;
            src: local('Righteous'), local('Righteous-Regular'), url(https://fonts.gstatic.com/s/righteous/v8/1cXxaUPXBpj2rGoU7C9WiHGF.woff2) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        :root {
            --color-background: #31037D;
            --axis-x: 1px;
            --axis-y: 1rem;
            --delay: 10;
            --color-black: #000;
            --color-white: #fff;
            --color-orange: #D49C3D;
            --color-red: #D14B3D;
            --color-violet: #CF52EB;
            --color-blue: #44A3F7;
            --color-green: #5ACB3C;
            --color-yellow: #DEBF40;
            --color-foreground: var(--color-white);
            --font-name: Righteous;
        }
        .c-rainbow {
            counter-reset: rainbow;
            position: relative;
            display: block;
            list-style: none;
            padding: 0;
            margin: 0;
            font-family: var(--font-name);
        }
        
        .c-rainbow__layer {
            --text-color: var(--color-foreground);
            counter-increment: rainbow;
            font-size: 2rem;
            color: var(--text-color);
            text-shadow: -1px -1px 0 var(--color-black), 1px -1px 0 var(--color-black), -1px 1px 0 var(--color-black), 1px 1px 0 var(--color-black), 4px 4px 0 rgba(0, 0, 0, 0.2);
            animation: rainbow 1.5s ease-in-out infinite;
        }
        
        .c-rainbow__layer:nth-child(1) {
            animation-delay: calc( 1 / var(--delay) * 1s);
            left: calc(var(--axis-x) * 1);
            z-index: -10;
        }
        
        .c-rainbow__layer:nth-child(2) {
            animation-delay: calc( 2 / var(--delay) * 1s);
            left: calc(var(--axis-x) * 2);
            z-index: -20;
        }
        
        .c-rainbow__layer:nth-child(3) {
            animation-delay: calc( 3 / var(--delay) * 1s);
            left: calc(var(--axis-x) * 3);
            z-index: -30;
        }
        
        .c-rainbow__layer:nth-child(4) {
            animation-delay: calc( 4 / var(--delay) * 1s);
            left: calc(var(--axis-x) * 4);
            z-index: -40;
        }
        
        .c-rainbow__layer:nth-child(5) {
            animation-delay: calc( 5 / var(--delay) * 1s);
            left: calc(var(--axis-x) * 5);
            z-index: -50;
        }
        
        .c-rainbow__layer:nth-child(6) {
            animation-delay: calc( 6 / var(--delay) * 1s);
            left: calc(var(--axis-x) * 6);
            z-index: -60;
        }
        
        .c-rainbow__layer:nth-child(7) {
            animation-delay: calc( 7 / var(--delay) * 1s);
            left: calc(var(--axis-x) * 7);
            z-index: -70;
        }
        
        .c-rainbow__layer:not(:first-child) {
            position: absolute;
            top: 0;
        }
        
        .c-rainbow__layer--white {
            --text-color: var(--color-white);
        }
        
        .c-rainbow__layer--orange {
            --text-color: var(--color-orange);
        }
        
        .c-rainbow__layer--red {
            --text-color: var(--color-red);
        }
        
        .c-rainbow__layer--violet {
            --text-color: var(--color-violet);
        }
        
        .c-rainbow__layer--blue {
            --text-color: var(--color-blue);
        }
        
        .c-rainbow__layer--green {
            --text-color: var(--color-green);
        }
        
        .c-rainbow__layer--yellow {
            --text-color: var(--color-yellow);
        }
        
        @keyframes rainbow {
            0%,
            100% {
                transform: translatey(var(--axis-y));
            }
            50% {
                transform: translatey(calc(var(--axis-y) * -1));
            }
        }
        #baiduVoice{
            width: 85px;
            height: 35px;
            cursor: pointer;
            background: linear-gradient(90deg,#23ead8,#00ff7e,#93ff00);
            border: 0;
            border-radius: 3px;
            box-shadow: 0px 0px 6px 2px #e5ffcc;
            color: #fff;
            font-weight:600;
            outline:none;
        }
        .markdown-section ol, .markdown-section ul{
            padding-left:0;
        }
</style>