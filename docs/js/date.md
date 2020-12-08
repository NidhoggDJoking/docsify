### 时间 `Data`:

```javascript
var myDate = new Date();
myDate.getYear(); //获取当前年份(2位)
myDate.getFullYear(); //获取完整的年份(4位,1970-????)
myDate.getMonth(); //获取当前月份(0-11,0代表1月)  所以获取当前月份是myDate.getMonth()+1;
myDate.getDate(); //获取当前日(1-31)
myDate.getDay(); //获取当前星期X(0-6,0代表星期天)  
myDate.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)  
myDate.getHours(); //获取当前小时数(0-23)
myDate.getMinutes(); //获取当前分钟数(0-59)
myDate.getSeconds(); //获取当前秒数(0-59)
myDate.getMilliseconds(); //获取当前毫秒数(0-999)  
myDate.toLocaleDateString(); //获取当前日期  "2020/4/26"
myDate.toLocaleTimeString(); //获取当前时间   "下午1:23:34"
myDate.toLocaleString( ); //获取日期与时间   "2020/4/26 下午3:31:25"
Date.parse(new Date()); // 获取时间戳  Ps:不推荐; 毫秒改成了000显示
(new Date()).valueOf(); // 获取时间戳
new Date().getTime(); // 获取时间戳
```
<br>

#### 基本格式转换

```javascript
const formatDateTime = function (date) {  
        var y = date.getFullYear();  
        var m = date.getMonth() + 1;  
        m = m < 10 ? ('0' + m) : m;  
        var d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        var h = date.getHours();  
        h=h < 10 ? ('0' + h) : h;  
        var minute = date.getMinutes();  
        minute = minute < 10 ? ('0' + minute) : minute;  
        var second=date.getSeconds();  
        second=second < 10 ? ('0' + second) : second;  
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
}; 

formatDate(new Date)
// 返回 "2020-04-26"
```

```javascript
const formatDateTime = function (date) {  
        var y = date.getFullYear();  
        var m = date.getMonth() + 1;  
        m = m < 10 ? ('0' + m) : m;  
        var d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        var h = date.getHours();  
        h=h < 10 ? ('0' + h) : h;  
        var minute = date.getMinutes();  
        minute = minute < 10 ? ('0' + minute) : minute;  
        var second=date.getSeconds();  
        second=second < 10 ? ('0' + second) : second;  
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
    };
formatDateTime(new Date)
// 返回 "2010-04-26 15:31:34"
```

<br>

#### 时间格式字符串转为时间戳`1970.01.01开始的毫秒数`

```javascript
var time='2010-04-26 15:31:37';
var date=new Date(time.replace(/-/g, '/'));  //开始时间
console.log(date.getTime());
// 返回 1272267097000
```
<br>

#### 字符串形式的日期转换成日期对象

```javascript
var strTime="2010-04-26";                 //字符串日期格式
var date= new Date(Date.parse(strTime.replace(/-/g,  "/")));      //转换成Data();
// 返回  Mon Apr 26 2010 00:00:00 GMT+0800 (中国标准时间)

// 也可以直接写在 `Date` 对象中

new Date(2010,4,26);
new Date("2010/4/26"); //此处有坑,滑至底部查看
new Date("2010-4-26"); //过去是不支持的现在已经支持了
// 返回  Mon Apr 26 2010 00:00:00 GMT+0800 (中国标准时间)

// 还可以封装成方法
const parserDate = function (date) {  
    var t = Date.parse(date);  
    if (!isNaN(t)) {  
        return new Date(Date.parse(date.replace(/-/g, "/")));  
    } else {  
        return new Date();  
    }  
}; 
parserDate('2010-04-26')
// 返回 Mon Apr 26 2010 00:00:00 GMT+0800 (中国标准时间)
```

<br>

#### 时间段效果

```javascript
var date = new Date();
// 把下述的 1 改为间隔期间的天数
var data2 = new Date(
    date.valueOf() + 1 * 24 * 60 * 60 * 1000
);
// 配合上面的方法
formatDateTime(data2)
// 返回 "2010-04-27 15:31:34" 在几天的时间上加了一天
```

!> `Android` 和 `IOS` **具有差异** &nbsp; ❗

```javascript
// 要创建一个指定时间的new Date对象时，通常的做法是：

new Date("2010-04-26"); // 然后就可以根据这个获取年月日等信息

// 这种格式在chrome,firefox,Android中都没有问题，但是，但是在IOS中就出问题了

// 在IOS中，new Date中指定的字符串要满足以下格式

new Date("2010/04/26"); //这样才能正确返回结果

// 所以 尽量使用这个
new Date("2010/04/26");
```

<style>
@import url('static/css/code3.css');
</style>