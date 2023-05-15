#  waterfall

---


<div class="htmleaf-container">
        <div id="columns">
            <figure>
                <img src="static/png/1980/4.jpg">
            </figure>
            <figure>
                <img src="static/png/waterfall/5.jpg">
            </figure>
            <figure>
                <img src="static/png/1980/7.jpg">
            </figure>
            <figure>
                <img src="static/png/waterfall/1.jpg">
            </figure>
            <figure>
                <img src="static/png/1980/8.jpg">
            </figure>
            <figure>
                <img src="static/png/waterfall/2.jpg">-
            </figure>
            <figure>
                <img src="static/png/1980/10.jpg">
            </figure>
            <figure>
                <img src="static/png/waterfall/3.jpg">
            </figure>
            <figure>
                <img src="static/png/waterfall/6.jpg">
            </figure>
        </div>
    </div>



<div class="code-mid">

```HTML
<div class="htmleaf-container">
    <div id="columns">
        <figure>
            <img src="static/png/waterfall/1.jpg">
        </figure>
        <figure>
            <img src="static/png/waterfall/2.jpg">
        </figure>
            ...省略
    </div>
</div>
```
</div>

<div class="code-mid">

```css
    body {
        background: url(static/png/waterfall/bg.png);
        font-family: Calluna, Arial, sans-serif;
        min-height: 1000px;
    }

    #columns {
        column-width: 320px;
        column-gap: 15px;
        width: 90%;
        max-width: 1100px;
        margin: 50px auto;
    }

    div#columns figure {
        background: #fefefe;
        border: 2px solid #fcfcfc;
        border-radius: 1px;
        box-shadow: 0 1px 2px rgba(34, 25, 25, 0.4);
        margin: 0 2px 15px;
        padding: 15px;
        padding-bottom: 10px;
        transition: opacity .4s ease-in-out;
        display: inline-block;
        column-break-inside: avoid;
    }

    div#columns figure img {
        width: 100%;
        height: auto;
        border-radius: 1px;
        margin-bottom: 5px;
    }


    div#columns:hover figure:not(:hover) {
        opacity: 0.5;
    }

    @media screen and (max-width: 750px) {
        #columns {
            column-gap: 0px;
        }

        #columns figure {
            width: 100%;
        }
    }
```

</div>

<script>
function random(){
   return Math.ceil(Math.random()*150); 
}
</script> 

<style>
/* @import url('static/css/code2.css'); */


    body {
        background: url(static/png/waterfall/bg.png);
        font-family: Calluna, Arial, sans-serif;
        min-height: 1000px;
    }

    #columns {
        column-width: 320px;
        column-gap: 15px;
        width: 90%;
        max-width: 1100px;
        margin: 50px auto;
    }

    div#columns figure {
        background: #fefefe;
        border: 2px solid #fcfcfc;
        border-radius: 1px;
        box-shadow: 0 1px 2px rgba(34, 25, 25, 0.4);
        margin: 0 2px 15px;
        padding: 15px;
        padding-bottom: 10px;
        transition: opacity .4s ease-in-out;
        display: inline-block;
        column-break-inside: avoid;
    }

    div#columns figure img {
        width: 100%;
        height: auto;
        border-radius: 1px;
        margin-bottom: 5px;
    }


    div#columns:hover figure:not(:hover) {
        opacity: 0.4;
    }

    @media screen and (max-width: 750px) {
        #columns {
            column-gap: 0px;
        }

        #columns figure {
            width: 100%;
        }
    }

    .code-mid{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .code-mid>pre{
        width:80%;
    }
</style>