// Personal information ***********************

let Birthday = 'December 5, 1996';

let Address = 'Hu Nan, China';

let Email = "250348426@qq.com";

let Phone = "15773594340";

let Github = 'https://github.com/NidhoggDJoking';

let linkedin = 'https://www.linkedin.com/in/%E5%BA%B7-%E8%83%A1-a53220180/';

$("li[title='Birthday']>i").after(Birthday);

$("li[title='Address']>i").after(Address);

$("li[title='E-mail']>a>i").after(Email);

$("li[title='E-mail']>a").prop('href', 'mailto:' + Email);

$("li[title='Phone']>i").after(Phone);

$("li[title='Github']>a>i").after(Github);

$("li[title='Github']>a").prop('href', Github);

let firstName = "Joking";

let lastName = "Nidhogg";

let middleName = "D";

// $(".weight--500").html(lastName);

$(".weight--500").after(lastName + ' ' + middleName + ' ' + firstName);

// Resume information *******************************************

let Position = "Front end engineer"

$(".badge--gray").html(Position)

// Copyright+[dates]+[author/owner]

// AllRightsReserved
var copyright = 'NidhoggDJoking&nbsp;&copy;&nbsp;';

copyright = copyright + new Date().getFullYear();

copyright = copyright + '&nbsp;AllRightsReserved';

$('.footer').html(copyright);


// Blog Post *******************

// var blogJosn = [
//           {href:'http://baidu.com',image:"assets/img/image_07.jpg",data:"Sep 13, 2019"},
//      ];
// $('.news-item__date').html()



// Bgsound ************************************************************

// window.onload=function(){
// var music = document.createElement('audio');
//     music.src = "assets/music/EGOIST.wav";
//     music.autoplay = 'autoplay';
//     document.getElementsByTagName('body')[0].appendChild(music);
//     console.log(music);
// }
function addm() {
    openMusic()
}
function openMusic() {
    var music = document.createElement('audio');
    music.src = "assets/music/EGOIST.wav";
    music.autoplay = 'autoplay';
    music.id = 'music';
    document.getElementsByTagName('body')[0].appendChild(music);
    document.getElementById("music").volume = 0.2;
    var audio = document.getElementById('music');
    // 回车暂停或播放
    $(document).keydown(function (event) {
        if (event.keyCode == 13) {
            if (audio.paused) {
                audio.play();
                close();
            } else {
                audio.pause();
                close();
            }
        }
    });
    star();
    audio.pause();
}

// 音乐进度清零
function rbf() {
    var audio = document.getElementById('music');
    audio.currentTime = 0;
}

// 暂停 与 播放
function bf() {
    var audio = document.getElementById('music');
    if (audio !== null) {

        //检测播放是否已暂停.audio.paused 在播放器播放时返回false.

        if (audio.paused) {
            audio.play(); // 这个就是播放
        } else {
            audio.pause(); // 这个就是暂停
        }
    }
}


// 'volume' property on 'HTMLMediaElement': The volume provided (10) is outside the range [0, 1].

function Tj(volume = 0.5) {
    document.getElementById("music").volume = volume;
}

function downFile(content = "这是一个靠JS生成的文件(我这个人比较懒没做简历,联系就在Github上吧)。", filename = "myCV.doc") {
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
    $('.WeChat').click(function (event) {
        $('.WeChat').fadeOut();
    });
}

// 歌词  ************************************************
function star() {
    var my_audio = document.getElementById("music");
    var songContent = '[00:10.60]EGOIST - エウテルペ\n [00:10.60]词：ryo\n [00:15.60]曲：ryo\n [00:22.87]咲いた野の花よ\n [00:30.88]ああ どうか教えておくれ\n [00:38.07]人は何故 傷つけあって\n [00:46.07]争うのでしょう\n [00:54.87]凛と咲く花よ\n [01:02.72]そこから何が見える\n [01:10.08]人は何故 許しあうこと\n [01:17.98]できないのでしょう\n [01:30.17]雨が過ぎて夏は\n [01:34.77]青を移した\n [01:38.82]一つになって\n [01:46.72]小さく揺れた\n [01:50.76]私の前で\n [01:54.81]何も言わずに\n [02:18.78]枯れていく友に\n [02:26.86]お前は何を思う\n [02:34.02]言葉を持たぬその葉で\n [02:40.06]なんと愛を伝える\n [02:54.10]夏の陽は陰って\n [02:58.71]風が靡いた\n [03:02.81]二つ重なって\n [03:10.68]生きた証を\n [03:14.78]私は唄おう\n [03:18.76]名もなき者のため\n';
    var lyric = parseLyric(songContent);
    // console.log(lyric)
    lyricContainer = document.getElementById('subtitles');
    my_audio.ontimeupdate = function () {
        for (var i = 0, l = lyric.length; i < l; i++) {
            if (this.currentTime > lyric[i][0]) {
                if (i >= 1) {
                    $("#subtitles").html(lyric[i][1]);
                    // PlanB
                    // $("#subtitles").attr('data-sub', lyric[i][1]);

                }
            };
        };
    };
}
// 歌词解析
function parseLyric(text) {
    //将文本分隔成一行一行，存入数组
    var lines = text.split('\n'),
        //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
        pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
        //保存最终结果的数组
        result = [];
    //去掉不含时间的行
    while (!pattern.test(lines[0])) {
        lines = lines.slice(1);
    };
    //上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
    lines[lines.length - 1].length === 0 && lines.pop();
    lines.forEach(function (v /*数组元素值*/, i /*元素索引*/, a /*数组本身*/) {
        //提取出时间[xx:xx.xx]
        var time = v.match(pattern),
            //提取歌词
            value = v.replace(pattern, '');
        //因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
        time.forEach(function (v1, i1, a1) {
            //去掉时间里的中括号得到xx:xx.xx
            var t = v1.slice(1, -1).split(':');
            //将结果压入最终数组
            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
        });
    });
    //最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
    result.sort(function (a, b) {
        return a[0] - b[0];
    });
    return result;
}


function close() {
    $('.con-subtitles').toggleClass('closesub');
}


// PWA 启用 serviceWorker
// if (typeof navigator.serviceWorker !== 'undefined') {
//     navigator.serviceWorker.register('sw.js')
// }

// Web Components 复用

// 全局的导航栏
//!  使用成功但无法享用外部CSS 和主体无法保持一致 (封印!)
/**
class JNavigation extends HTMLElement {
    constructor() {
        super();
        // 创建一个 shadow root
        let shadow = this.attachShadow({
            mode: 'open'
        });

        let dataList = [{
                'elaborate': 'About',
                'href': 'index.html',
                'active': true
            },
            {
                'elaborate': 'Resume',
                'href': 'resume.html',
                'active': false
            },
            {
                'elaborate': 'Portfolio',
                'href': 'portfolio.html',
                'active': false
            },
            {
                'elaborate': 'Blog',
                'href': 'blog.html',
                'active': false
            },
            {
                'elaborate': 'Contact',
                'href': 'contact.html',
                'active': false
            }
        ];

        const div = document.createElement('div');
        div.setAttribute('class', 'inner-menu');

        const ul = document.createElement('ul');
        ul.setAttribute('class', 'nav');

        for (let i = 0, len = dataList.length; i < len; i++){
            var li = document.createElement('li');
            li.setAttribute('class', 'nav__item');
            var a = document.createElement('a');
            a.setAttribute('href', dataList[i].href);
            a.setAttribute('class', dataList[i].active ? 'active' : '');
            a.innerText = dataList[i].elaborate;
            li.appendChild(a)
            ul.appendChild(li)
        }
        
        div.appendChild(ul)

        shadow.append(div);
    }
}

customElements.define('j-navigation', JNavigation);

**/