// Copyright+[dates]+[author/owner]
// AllRightsReserved
var copyright = 'NidhoggDJoking&nbsp;&copy;&nbsp;';

copyright = copyright + new Date().getFullYear();

copyright = copyright + '&nbsp;AllRightsReserved';

$('.footer').html(copyright);

// Personal information ***********************

let Birthday = 'December 5, 1996';

let Address = 'Hu Nan, China';

let Email = "250348426@qq.com";

let Phone = "15773594340";

let Github = 'https://github.com/NidhoggDJoking';

let linkedin='https://www.linkedin.com/in/%E5%BA%B7-%E8%83%A1-a53220180/';

$("li[title='Birthday']>i").after(Birthday);

$("li[title='Address']>i").after(Address);

$("li[title='E-mail']>a>i").after(Email);

$("li[title='E-mail']>a").prop('href','mailto:'+Email);

$("li[title='Phone']>i").after(Phone);

$("li[title='Github']>a>i").after(Github);

$("li[title='Github']>a").prop('href',Github);

let firstName = "Joking";

let lastName = "Nidhogg";

let middleName = "D";

	// $(".weight--500").html(lastName);

$(".weight--500").after(lastName + ' ' + middleName + ' ' +firstName);

// Resume information *******************************************

let Position = "Front end engineer"

$(".badge--gray").html(Position)




// Blog Post *******************

// var blogJosn = [
//           {href:'http://baidu.com',image:"assets/img/image_07.jpg",data:"Sep 13, 2019"},
//      ];
// $('.news-item__date').html()



// Bgsound ************************************************************

// window.onload=function(){
// 	var music = document.createElement('audio');
//         music.src = "assets/music/EGOIST.wav";
//         music.autoplay = 'autoplay';
//         document.getElementsByTagName('body')[0].appendChild(music);
//         console.log(music);
// }
function addm(){
		var music = document.createElement('audio');
        music.src = "assets/music/EGOIST.wav";
        music.autoplay = 'autoplay';
        music.id = 'music';
        document.getElementsByTagName('body')[0].appendChild(music);
        document.getElementById("music").volume = 0.2;
        var audio = document.getElementById('music');
        // 回车暂停或播放
        $(document).keydown(function(event){
	　　　　 if(event.keyCode == 13){
	　　　　　　if(audio.paused){              
				      audio.play();
				  }else{
				   	  audio.pause();
				  }
	　　　　 }
　　});
}

// 音乐进度清零
function rbf(){
	 var audio = document.getElementById('music'); 
	 audio.currentTime = 0;
}

// 暂停 与 播放
function bf(){
	 var audio = document.getElementById('music'); 
	 if(audio!==null){

	      //检测播放是否已暂停.audio.paused 在播放器播放时返回false.

		  if(audio.paused){              
		      audio.play();		// 这个就是播放  
		  }else{
		   	  audio.pause();	// 这个就是暂停
		  }
	 } 
}


// 'volume' property on 'HTMLMediaElement': The volume provided (10) is outside the range [0, 1].

function Tj(volume=0.5){
	document.getElementById("music").volume = volume;
}

function downFile(content="assets/download/README.md", filename="README.md") {
	// window.open('file:///E:/New/assets/download/README.md')

    // 创建隐藏的可下载链接
    var eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    // 字符内容转变成blob地址
    var blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
};


// WeChat  ********************************************

function WeChat() {
    $('.WeChat').fadeIn();
    $('.WeChat').click(function(event) {
           $('.WeChat').fadeOut();
    });
 }