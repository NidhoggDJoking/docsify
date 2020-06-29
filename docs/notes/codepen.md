<div class="clock">
	<div class="mainbody">
		<div class="backbody">
			<div class="colont"></div>
			<div class="colonb"></div>
			<div class="digit1">
				<div class="num1"></div>
				<div class="brace"></div>
			</div>
			<div class="digit2">
				<div class="num2"></div>
				<div class="brace"></div>
			</div>
			<div class="digit3">
				<div class="num3"></div>
				<div class="brace"></div>
			</div>
			<div class="digit4">
				<div class="num4"></div>
				<div class="brace"></div>
			</div>
		</div>
	</div>
	<div class="footl">
		<div class="inner"></div>
	</div>
	<div class="footr">
		<div class="inner"></div>
	</div>
	<div class="shadow"></div>
</div>

<style>
  @import url(https://fonts.googleapis.com/css?family=Lato:700);
body {
  background-color:#F3F1E9;
}
.clock {
  width: 150px;
  height:75px;
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
}
.mainbody {
  width:150px;
  height:60px;
  background-color:#ACAAA0;
  border-radius:3px;
  position:absolute;
  box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,0.2);
}
.backbody {
  background-color:#8C897D;
  position:absolute;
  top:4px;
  bottom:4px;
  left:4px;
  right:4px;
  box-shadow: inset 0 0 4px 1px rgba(0,0,0,0.2), inset 0 0 4px 0 rgba(0,0,0,0.2);
}
div[class^='colon'],div[class*=' colon']{
  background-color:#4E4D47;
  border-radius:1px;
  position:absolute;
  left:68px;
  right:68px;
}
.colont {
  top:18px;
  bottom:27px;
}
.colonb {
  top:30px;
  bottom:16px;
}
div[class^='digit'],div[class*=' digit']{
  width:30px;
  height:44px;
  position:absolute;
  top:4px;
  background-color:#4E4D47;
  border-radius:2px;
  box-shadow: inset 0 0 2px 0 rgba(0,0,0,0.2), 0 0 2px 0 rgba(0,0,0,0.1);
}
.digit1 {
  left: 4px;
}
.digit2 {
  left: 35px;
}
.digit3 {
  right: 35px;
}
.digit4 {
  right: 4px;
}
div[class^='num'],div[class*=' num']{
  font-family: 'Lato', sans-serif;
  color:#FAFAFA;
  font-size: 28px;
  position:absolute;
  top:4px;
  left:6px;
}
.brace {
  z-index:5;
  background-color:#8C897D;
  position:absolute;
  top:22px;
  bottom:20px;
  left:0px;
  right:0px;
  box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.2), 0px -1px 1px 0px rgba(0,0,0,0.2);
}
div[class^='foot'],div[class*=' foot']{
  width:8px;
  height:0px;
  position:absolute;
  border-top:13px solid #BA8B6D;
  border-left:3px solid transparent;
  border-right:3px solid transparent;
  top:60px;
}
.footl {
  left: 20px;
}
.footr {
  right: 20px;
}
div[class^='inner'],div[class*=' inner']{
  width:5px;
  height:0px;
  position:absolute;
  border-top:13px solid #CF9B7A;
  border-left:3px solid transparent;
  border-right:3px solid transparent;
  top:-13px;
  left:0px;
}
.shadow {
  z-index:-1;
  width:150px;
  height:4px;
  position:absolute;
  top:51px;
  background-color:transparent;
  box-shadow:0 20px 4px 0px rgba(0,0,0,0.1);
}
</style>
<script>
  $(document).ready(function(){
  setInterval(time);
  function time() {
    var date = new Date();
    if (date.getHours() < 10) {
      $('.num1').text("0");
      $('.num2').text(date.getHours());
    } else {
      $('.num1').text(date.getHours().toString()[0]);
      $('.num2').text(date.getHours().toString()[1]);
    }
    if (date.getMinutes() < 10) {
      $('.num3').text("0");
      $('.num4').text(date.getMinutes());
    } else {
      $('.num3').text(date.getMinutes().toString()[0]);
      $('.num4').text(date.getMinutes().toString()[1]);
    }
  }
});
</script>