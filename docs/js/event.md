## Event 类

<hr>

> #### 用一个拖拽的Demo完成


```HTML
<div class="event-container">
    <div id="event-box"></div>
</div>
```

```css
.event-container{
    position: relative;
    width:300px;
    height:300px;
    background: #ffdef3;
}

#event-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    background: #ff5722;
    cursor: all-scroll;
}
```

<div class="event-container">
    <div id="event-box"></div>
</div>

> #### 编写继承类 

```javascript
class Event {
    constructor() {
        this.handlers = { // 记录所有的事件和处理函数

        }
    }
    /* *
    * on 添加事件监听
    * @param type 事件类型
    * @param handler 事件回调
    * on('click', ()=>{})
    * */
    on(type, handler, once=false) {
        if (!this.handlers[type]) {
            this.handlers[type] = [];
        }
        if (!this.handlers[type].includes(handler)) {
            this.handlers[type].push(handler);
            handler.once = once;
        }
    }
    /* *
    * off 取消事件监听
    * 
    *  */
    off(type, handler) {
        if (this.handlers[type]) {
            if (handler === undefined) {
                this.handlers[type] = []
            } else {
                this.handlers[type] = this.handlers[type].filter((f)=>{
                    return f!=handler
                })
            }
        }
    }
    /* *
    * @param type 要执行哪个类型的函数
    * @param eventData事件对象
    * @param point this指向
    * 
    *  */
    trigger(type, eventData = {}, point=this) {
        if (this.handlers[type]) {
            this.handlers[type].forEach(f => {
                f.call(point, eventData);
                if (f.once) {
                    this.off(type, f)
                }
            });
        }
    }
    /* *
    * once 函数执行一次
    * @param type 事件处理
    * @param handle 事件处理函数
    *  */
    once(type, handler) {
        this.on(type, handler, true);
    }
}
```

> #### 继承 `Event`

```javascript
    class Drag extends Event{
        // 构造函数
        constructor(el) {
            super(); // 继承
            this.el = el;
            this.startOffset = null; // 鼠标摁下时元素的位置
            this.startPoint = null; // 鼠标的坐标
            let move = (e)=>{
                this.move(e)
            }
            let end = (e)=>{
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', end);
                this.end(e)
            }
            el.addEventListener('mousedown', (e)=> {
                this.start(e);

                document.addEventListener('mousemove', move);
                document.addEventListener('mouseup', end);
            })
            
            
        }
        start(e) {
            let {el} = this;
            // console.log(this)
            // console.log(el)
            this.startOffset = {
                x: el.offsetLeft,
                y: el.offsetTop
            }
            this.startPoint = {
                x: e.clientX,
                y: e.clientY
            }
            this.trigger('dragstart', e, this.el)
        }
        end(e) {
            this.trigger('dragend',e, this.el)
        }
        move(e) {
            let {el, startOffset, startPoint} = this;
            let nowPoint = {
                x: e.clientX,
                y: e.clientY
            }
            let dis = {
                x: nowPoint.x - startPoint.x,
                y: nowPoint.y - startPoint.y
            }
            // el.style.left = dis.x + startOffset.x + 'px';
            // el.style.top = dis.y + startOffset.y + 'px';
            // console.log(dis.x + startOffset.x)
            // console.log(dis.y + startOffset.y)
            // 这里限制下活动范围

            let wid = 200; // 300的容器 - 100的方格
            if(dis.y + startOffset.y < 0) el.style.top = 0;
            else if (dis.y + startOffset.y > wid) el.style.top = wid + 'px';
            else el.style.top = dis.y + startOffset.y + 'px';

            if(dis.x + startOffset.x < 0) el.style.left = 0;
            else if(dis.x + startOffset.x > wid) el.style.left = wid + 'px';
            else el.style.left = dis.x + startOffset.x + 'px';

            this.trigger('dragmove', e, el)
        }
    }
```

> #### 启动方法

```javascript
(function() {
        let box = document.querySelector('#event-box');
        let dragBox = new Drag(box);

        dragBox.on('dragstart', function(e) {
            console.log(e);
            console.log(this);
            this.style.background = '#4caf50';
    })
        dragBox.on('dragend', function(e) {
            console.log('b')
            this.style.background = '#03a9f4';
    })
        dragBox.once('dragmove', function(e) {
            console.log('c')
            // this.style.background = 'blue';
    })
        console.log(dragBox)
})()
```

---

#### 实现 `LazyMan`

```javascript
class _LazyMan {
  constructor(name) {
    this.tasks = [];
    const task = () => {
      console.log(`Hi! This is ${name}`);
      this.next();
    };
    this.tasks.push(task);
    setTimeout(() => {
      // 把 this.next() 放到调用栈清空之后执行
      this.next();
    }, 0);
  }
  next() {
    const task = this.tasks.shift(); // 取第一个任务执行
    task && task(); // if(task) task()
  }
  sleep(time) {
    this._sleepWrapper(time, false);
    return this; // 链式调用
  }
  sleepFirst(time) {
    this._sleepWrapper(time, true);
    return this;
  }
  _sleepWrapper(time, first) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`);
        this.next();
      }, time * 1000);
    };
    if (first) {
      this.tasks.unshift(task); // 放到任务队列顶部
    } else {
      this.tasks.push(task); // 放到任务队列尾部
    }
  }
  eat(name) {
    const task = () => {
      console.log(`Eat ${name}`);
      this.next();
    };
    this.tasks.push(task);
    return this;
  }
}
function LazyMan(name) {
  return new _LazyMan(name);
}
```

```javascript
实现一个LazyMan，可以按照以下方式调用:
LazyMan("Hank")
输出:
Hi! This is Hank!

LazyMan("Hank").sleep(10).eat("dinner")
输出:
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~

LazyMan("Hank").eat("dinner").eat("supper")
输出:
Hi This is Hank!
Eat dinner~
Eat supper~

LazyMan("Hank").eat("supper").sleepFirst(5)
输出:
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper

```

<style>
/* @import url('static/css/code2.css'); */

    .event-container{
        position: relative;
        width:300px;
        height:300px;
        background: #ffdef3;
    }
    #event-box {
        position: absolute;
        top: 100px;
        left: 100px;
        width: 100px;
        height: 100px;
        background: #ff5722;
        cursor: all-scroll;
    }
</style>

<script>
    class Event {
    constructor() {
        this.handlers = { // 记录所有的事件和处理函数

        }
    }
    /* *
    * on 添加事件监听
    * @param type 事件类型
    * @param handler 事件回调
    * on('click', ()=>{})
    * */
    on(type, handler, once=false) {
        if (!this.handlers[type]) {
            this.handlers[type] = [];
        }
        if (!this.handlers[type].includes(handler)) {
            this.handlers[type].push(handler);
            handler.once = once;
        }
    }
    /* *
    * off 取消事件监听
    * 
    *  */
    off(type, handler) {
        if (this.handlers[type]) {
            if (handler === undefined) {
                this.handlers[type] = []
            } else {
                this.handlers[type] = this.handlers[type].filter((f)=>{
                    return f!=handler
                })
            }
        }
    }
    /* *
    * @param type 要执行哪个类型的函数
    * @param eventData事件对象
    * @param point this指向
    * 
    *  */
    trigger(type, eventData = {}, point=this) {
        if (this.handlers[type]) {
            this.handlers[type].forEach(f => {
                f.call(point, eventData);
                if (f.once) {
                    this.off(type, f)
                }
            });
        }
    }
    /* *
    * once 函数执行一次
    * @param type 事件处理
    * @param handle 事件处理函数
    *  */
    once(type, handler) {
        this.on(type, handler, true);
    }
}
        /* 
        * 1.记录摁下时鼠标的位置和元素位置
        * 鼠标位置-摁下时的鼠标位置 = 鼠标移动的位置
        * 元素位置=鼠标移动距离+摁下时元素位置
        **/
    class Drag extends Event{
        // 构造函数
        constructor(el) {
            super(); // 继承
            this.el = el;
            this.startOffset = null; // 鼠标摁下时元素的位置
            this.startPoint = null; // 鼠标的坐标
            let move = (e)=>{
                this.move(e)
            }
            let end = (e)=>{
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', end);
                this.end(e)
            }
            el.addEventListener('mousedown', (e)=> {
                this.start(e);

                document.addEventListener('mousemove', move);
                document.addEventListener('mouseup', end);
            })
            
            
        }
        start(e) {
            let {el} = this;
            // console.log(this)
            // console.log(el)
            this.startOffset = {
                x: el.offsetLeft,
                y: el.offsetTop
            }
            this.startPoint = {
                x: e.clientX,
                y: e.clientY
            }
            this.trigger('dragstart', e, this.el)
        }
        end(e) {
            this.trigger('dragend',e, this.el)
        }
        move(e) {
            let {el, startOffset, startPoint} = this;
            let nowPoint = {
                x: e.clientX,
                y: e.clientY
            }
            let dis = {
                x: nowPoint.x - startPoint.x,
                y: nowPoint.y - startPoint.y
            }
            // el.style.left = dis.x + startOffset.x + 'px';
            // el.style.top = dis.y + startOffset.y + 'px';
            // console.log(dis.x + startOffset.x)
            // console.log(dis.y + startOffset.y)
            // 这里限制下活动范围

            let wid = 200; // 300的容器 - 100的方格
            if(dis.y + startOffset.y < 0) el.style.top = 0;
            else if (dis.y + startOffset.y > wid) el.style.top = wid + 'px';
            else el.style.top = dis.y + startOffset.y + 'px';

            if(dis.x + startOffset.x < 0) el.style.left = 0;
            else if(dis.x + startOffset.x > wid) el.style.left = wid + 'px';
            else el.style.left = dis.x + startOffset.x + 'px';

            this.trigger('dragmove', e, el)
        }
    }
        
    (function() {
        let box = document.querySelector('#event-box');
        let dragBox = new Drag(box);

        dragBox.on('dragstart', function(e) {
            // console.log(e);
            // console.log(this);
            this.style.background = '#4caf50';
    })
        dragBox.on('dragend', function(e) {
            // console.log('b')
            this.style.background = '#03a9f4';
    })
        dragBox.once('dragmove', function(e) {
            // console.log('c')
            // this.style.background = 'blue';
    })
        // console.log(dragBox)
    })()
    </script>