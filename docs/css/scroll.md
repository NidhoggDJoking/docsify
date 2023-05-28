<div class="content color1 fcenter">上面的内容</div>

<div id="scroll" class="scroll">
  <div class="sticky">
    <div id="scrollBox" class="scroll-box">
      <div class="scroll-item fcenter">1</div>
      <div class="scroll-item fcenter">2</div>
      <div class="scroll-item fcenter">3</div>
    </div>
  </div>
</div>

<div class="content color2 fcenter">下面的内容</div>

<script>
   const scroll = document.getElementById('scroll')
  const scrollBox = document.getElementById('scrollBox')
  const vw = document.body.clientWidth // 不包含滚动条的宽度
  const vh = window.innerHeight

  // 这里的高度设置为 length-1 个横向块 + 屏幕高度
  // 因为最后一块，滚动的距离并不是宽度，而是高度
  sHeight = vw * (scrollBox.children.length - 1) + vh
  scroll.style.height = sHeight + 'px'

  window.addEventListener('scroll', () => {
    // 获取scroll的位置信息
    const {top, bottom} = scroll.getBoundingClientRect();

    // top <= 0 时，代表容器元素到达视图顶部。
    if (top <= 0 && top > -vw * 2) {
      scrollBox.style.transform = `translateX(${top}px)`
    }
    if (top > 0) {
      scrollBox.style.transform = `translateX(0px)`
    }
    if (top < -vw * 2) {
      scrollBox.style.transform = `translateX(-${sHeight-vh}px)`
    }
  });
</script>


<style>
html, body {
          padding: 0;
          margin: 0;
      }

      .fcenter {
          display: flex;
          align-items: center;
          justify-content: center;
      }

      .content {
          width: calc(100vw - 18px);
          height: 100vh;
          background: #b9f5e0;
      }

      .scroll {
          position: relative;
          width: calc(100vw - 18px);
      }


      .sticky {
          position: sticky;
          top: 0;
          overflow: hidden;
      }

      .scroll-box {
          display: flex;
      }

      .scroll-item:nth-child(1) {
          background: #f6a2a2;
      }

      .scroll-item:nth-child(2) {
          background: #d1d1ff;
      }

      .scroll-item:nth-child(3) {
          background: #efefc3;
      }

      .scroll-item {
          width: calc(100vw - 18px);
          height: 100vh;
          flex-shrink: 0;
      }
</style>