class Dep {                  // 订阅池
    constructor(name) {
        this.id = new Date() //这里简单的运用时间戳做订阅池的ID
        this.subs = []       //该事件下被订阅对象的集合
    }
    defined() {              // 添加订阅者
        Dep.watch.add(this);
    }
    notify() {              //通知订阅者有变化
        this.subs.forEach((e, i) => {
            if (typeof e.update === 'function') {
                try {
                    e.update.apply(e)  //触发订阅者更新函数
                } catch (err) {
                    console.warr(err)
                }
            }
        })
    }

}
Dep.watch = null;

class Watch {
    constructor(name, fn) {
        this.name = name;       //订阅消息的名称
        this.id = new Date();   //这里简单的运用时间戳做订阅者的ID
        this.callBack = fn;     //订阅消息发送改变时->订阅者执行的回调函数     
    }
    add(dep) {                  //将订阅者放入dep订阅池
        dep.subs.push(this);
    }
    update() {                  //将订阅者更新方法
        var cb = this.callBack; //赋值为了不改变函数内调用的this
        cb(this.name);
    }
}


var addHistoryMethod = (function () {
    var historyDep = new Dep();
    return function (name) {
        if (name === 'historychange') {
            return function (name, fn) {
                var event = new Watch(name, fn)
                Dep.watch = event;
                historyDep.defined();
                Dep.watch = null;       //置空供下一个订阅者使用
            }
        } else if (name === 'pushState' || name === 'replaceState') {
            var method = history[name];
            return function () {
                method.apply(history, arguments);
                historyDep.notify();
            }
        }

    }
}())

window.addHistoryListener = addHistoryMethod('historychange');

history.pushState = addHistoryMethod('pushState');

history.replaceState = addHistoryMethod('replaceState');

// window.addHistoryListener('history', function () {
//     console.log('窗口的history改变了');
// })

// history.pushState({parameter:'vaule'}, "新页面的标题", "/newUrl")


// history.pushState方法接受三个参数，依次为：

// state：一个与指定网址相关的状态对象，popstate事件触发时，该对象会传入回调函数。如果不需要这个对象，此处可以填null。

// title：新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填null。

// url：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。