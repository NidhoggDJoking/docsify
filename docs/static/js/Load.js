function loadJS(url, callback) {
    var script = document.createElement('script'),
    fn = callback || function () { };
    script.type = 'text/javascript';

    //IE - readyState 是 IE 独有孤儿属性,其实这里可以省略的毕竟只有SB还在用IE
    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState == 'loaded' || script.readyState == 'complete') {
                script.onreadystatechange = null;
                fn();
            }
        };
    } else {
        //其他浏览器
        script.onload = function () {
            fn();
        };
    }
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);

}

// 例如:

// loadJS('https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js',function(){

//     console.log('加载成功!')

// });


var Joking = window.Joking || {};
// console.log(local)
Joking.load = {  
    loadJs: function (name, url, version, callback) {  
        if (window.localStorage) {  
            var xhr;  
            var js = localStorage.getItem(name);  
            if (js == null || js.length == 0 || version != localStorage.getItem(name+"version")) {  
                if (window.ActiveXObject) {  
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");  
                } else if (window.XMLHttpRequest) {  
                    xhr = new XMLHttpRequest();  
                }  
                if (xhr != null) {  
                    xhr.open("GET", url);  
                    xhr.send(null);
                    xhr.onreadystatechange = function () {  
                        if (xhr.readyState == 4 && xhr.status == 200) {  
                            js = xhr.responseText;  
                            localStorage.setItem(name, js);  
                            localStorage.setItem(name+"version", version);  
                            js = js == null ? "" : js;  
                            Joking.load.writeJs(js);  
                            if (callback != null) {  
                                callback(); 
                            }  
                        }  
                    };  
                }  
            } else {  
                Joking.load.writeJs(js);  
                if (callback != null) {  
                    callback(); 
                }  
            }  
        } else {  
            Joking.load.linkJs(url);  
        }  
    },  
    loadCss: function (name, url, version) {  
        if (window.localStorage) {  
            var xhr;  
            var css = localStorage.getItem(name);  
            if (css == null || css.length == 0 || version != localStorage.getItem(name+"version")) {  
                if (window.ActiveXObject) {  
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");  
                } else if (window.XMLHttpRequest) {  
                    xhr = new XMLHttpRequest();  
                }  
                if (xhr != null) {  
                    xhr.open("GET", url);  
                    xhr.send(null);  
                    xhr.onreadystatechange = function () {  
                        if (xhr.readyState == 4 && xhr.status == 200) {  
                            css = xhr.responseText;  
                            localStorage.setItem(name, css);  
                            localStorage.setItem(name+"version", version);  
                            css = css == null ? "" : css;  
                            Joking.load.writeCss(css);  
                        }  
                    };  
                }  
            } else {   
                Joking.load.writeCss(css);  
            }  
        } else {  
            Joking.load.linkCss(url);  
        }  
    },  
 
    writeJs: function (text) {  
        var head = document.getElementsByTagName('HEAD').item(0);  
        var link = document.createElement("script");  
        link.type = "text/javascript";  
        link.innerHTML = text;  
        head.appendChild(link);  
    },  

    writeCss: function (text) {  
        var head = document.getElementsByTagName('HEAD').item(0);  
        var link = document.createElement("style");  
        link.type = "text/css";  
        link.innerHTML = text;  
        head.appendChild(link);  
    },  
 
    linkJs: function (url) {  
        var head = document.getElementsByTagName('HEAD').item(0);  
        var link = document.createElement("script");  
        link.type = "text/javascript";  
        link.src = url;  
        head.appendChild(link);  
    },  
 
    linkCss: function (url) {  
        var head = document.getElementsByTagName('HEAD').item(0);  
        var link = document.createElement("link");  
        link.type = "text/css";  
        link.rel = "stylesheet";  
        link.rev = "stylesheet";  
        link.media = "screen";  
        link.href = url;  
        head.appendChild(link);  
    }  
}


// 

//入口配置 示例:
// Joking.load.loadJs("jquery", "js/jquery.min.js",1,function () { 
//     Joking.load.loadJs("app", "js/app.js",1, function() {
//         Joking.load.loadJs("index", "js/index.js",2,null);
//     });  
// });  
// Joking.load.loadCss("css", "css/app.css", 1);  




function fake_click(obj) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent(
        "click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null
    );
    obj.dispatchEvent(ev);
}

function download(name, data) {
    var urlObject = window.URL || window.webkitURL || window;

    var downloadData = new Blob([data]);

    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    save_link.href = urlObject.createObjectURL(downloadData);
    save_link.download = name;
    fake_click(save_link);
}

//调用方法
// download("save.docx","内容");
