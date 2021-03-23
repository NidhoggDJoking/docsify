## H5点击复制文本

```javascript
const btn = document.querySelector('#replication');
    //按钮点击
    btn.addEventListener('click',() => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    //文本内容:document.getElementById('recommended').innerHTML
    input.setAttribute('value', document.getElementById('recommended').value);
    input.select();
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        console.log('复制成功');
        }
     document.body.removeChild(input);
    })
```


<input type="text" id="recommended">
<!-- <buttom id="replication">复制</buttom> -->


<div class="button" role="button" id="replication2"><span>复制</span></div>

<br>

<hr/>

<br>

!>`execCommand不再推荐(即将废除)`：This feature is obsolete. Although it may still work in some browsers, its use is discouraged since it could be removed at any time. Try to avoid using it.

> #### 在未来应该是用`ClipboardEvent` 代替 `document.execCommand` 目前该方法

!> `不过这是一个实验中的功能`:
此功能某些浏览器尚在开发中，请参考浏览器兼容性表格以得到在不同浏览器中适合使用的前缀。由于该功能对应的标准文档可能被重新修订，所以在未来版本的浏览器中该功能的语法和行为可能随之改变。

#### [ClipboardEvent 传送门](https://developer.mozilla.org/zh-CN/docs/Web/API/ClipboardEvent)

<br>

`补充说明`
```javascript
// 这个方法可以直接获取IE这粘贴板的内容,其余的浏览器不行😂
// JavaScript 没有一个很完美的访问剪贴板的方案，没有跨浏览器支持window.clipboardData，它仅受IE支持。
// window.clipboardData被认为是一个安全问题，因为它允许您访问的每个网站都能读取当时发生在剪贴板中的任何内容。
window.clipboardData.getData("Text");
```


<br>

<br>

#### 如果停止思念可能我们连对面的容貌都会忘的一干二净，人的记忆好像一块不靠谱的磁盘永远不知道哪天它就消磁了。

<script>
    const btn = document.querySelector('#replication2');
    //按钮点击
    btn.addEventListener('click',() => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    //文本内容:document.getElementById('recommended').value
    input.setAttribute('value', document.getElementById('recommended').value);
    console.log(document.getElementById('recommended').value);
    input.select();
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        console.log('复制成功');
        alert('复制成功');
        }
     document.body.removeChild(input);
    })
</script>

<style>
/* @import url('static/css/code.css'); */
/* #recommended{
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    padding: 0 15px 0 20px;
    border: 1px solid #e3e3e3;
    color: #3e5063;
    outline: none;
    border-radius: 15px;
    margin-right: 10px;
    font-size:14px;
} */
#recommended{
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;
    padding: 0 15px 0 20px;
    border: 1px solid #e3e3e3;
    color: #3e5063;
    outline: none;
    border-radius: 25px;
    margin-right: 10px;
    font-size: 14px;
    width: 300px;
}
#replication{
    width:20px;
    height: 30px;
    line-height: 30px;
    font-size:14px;
    color: #3e5063;
    cursor: pointer;
}
[role="button"] {
    margin-top:25px;
    -webkit-appearance: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    cursor: pointer;
    width: 150px;
    height: 50px;
    background-image: linear-gradient(to top, #D8D9DB 0%, #fff 80%, #FDFDFD 100%);
    border-radius: 30px;
    border: 1px solid #8F9092;
    box-shadow: 0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 3px 0 #CECFD1;
    transition: all 0.2s ease;
    font-family: "Source Sans Pro", sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #606060;
    text-shadow: 0 1px #fff;
}
[role="button"]:active {
    box-shadow: 0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 5px 3px #999, inset 0 0 30px #aaa;
}
[role="button"]:focus {
    -webkit-animation: active 0.9s alternate infinite;
    animation: active 0.9s alternate infinite;
    outline: none;
}
[role="button"]:hover {
    box-shadow: 0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 3px 3px #CECFD1;
}
[role="button"] > *{
    font-family: HYRunYuan;
    color: #757575;
}
@keyframes active{
        0% {
        box-shadow: 0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 10px 0px rgba(0, 0, 250, 0.6);
    }
        100% {
        box-shadow: 0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 3px 3px #CECFD1;
    }
}
</style>