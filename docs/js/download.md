### 文件下载


> 当下载地址与当前网站不是同源 `donwloan` 将不生效

```js
downloadlink(url, name) {
	const elink = document.createElemnt('a')
	elink.style.display = none
	elink.target = '_blank'
	elink.donwloan = name
	elink.href = url
	elink.click()
	document.body.removeChild(elink)
}
```

```js
downloadlink(url, name) {
    let x = new XMLHttpRequest();
    x.open("GET", url, true);
    x.responseType = "blob";
    x.onload = function (e) {
      const url = window.URL.createObjectURL(x.response);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
    };
    x.send();
}
```