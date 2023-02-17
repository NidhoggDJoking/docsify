# TinyMCE XSS 问题


## 奇安信代码卫士团队 报告精简


#### TinyMCE的5.2.1和更早版本中存在跨站脚本（XSS）漏洞，允许远程攻击者在经典编辑模式下，可以插入恶意脚本导致敏感信息的泄露、特权升级和帐户接管。



-  **影响版本：TinyMCE<= 5.2.1**


#### Bishop Fox 公司的研究员在2020年4月份发现 TinyMCE 易受XSS漏洞影响，而影响严重程度取决于使用该编辑器的应用程序。该漏洞是 CVE-2020-12648，影响5.2.1及更早版本，7月份发布版本4.9.11和5.4.1修复该漏洞。漏洞如遭利用，可导致攻击者提权、窃取信息甚至劫持目标用户的账户。

#### 即：4.x版本需要升至4.9.11，5.x需要升至 5.4.1及以上版本(当前最高版本Ver 5.10.0 2021.10.11)



####  [相关文章📌](https://blog.csdn.net/smellycat000/article/details/108016566)

#### [(CVE-2020-12648)TinyMCE 跨站脚本(XSS)漏洞 演复现示](https://blog.csdn.net/qq_41832837/article/details/110749433)

#### [TingMCE 语言包地址](https://www.tiny.cloud/get-tiny/language-packages/)

#### [TinyMCE中文文档](http://tinymce.ax-z.cn/)



```vue
<template>
  <div>
    <textarea id="tinydemo"></textarea>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme'
export default {
  name: 'App',
  mounted() {
    console.log(tinymce)
    tinymce.init({
      selector: '#tinydemo',
      browser_spellcheck: true, // 拼写检查
      branding: false, // 去水印
      elementpath: false, //禁用编辑器底部的状态栏
      statusbar: false, // 隐藏编辑器底部的状态栏
      paste_data_images: true, // 允许粘贴图像
      menubar: false, // 隐藏最上方menu
      skin_url: '/tinymce/skins/ui/oxide',
      icons_url: '/tinymce/icons/default/icons.js' // load icon pack
    })
  }
}
</script>

<style>
</style>

```

