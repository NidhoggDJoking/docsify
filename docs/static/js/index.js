// var music = document.createElement('audio');
// music.src = "static/music/EGOIST - Departures~あなたにおくるアイの歌~ (Departures ～送给你的爱之歌～).mp3";
// music.autoplay = 'autoplay';
// music.id = 'music';
// document.getElementsByTagName('body')[0].appendChild(music);
// document.getElementById("music").volume = 0.2;
// var audio = document.getElementById('music');
// audio.pause();
// ctrl + 回车销毁
// $(document).keydown(function (e) {
//     if (e.ctrlKey && e.keyCode == 13) {
//         $("#music").remove();
//     }
// });
// 回车暂停或播放
// $(document).keydown(function (event) {
//     if (event.keyCode == 13) {
//         if (audio.paused) {
//             audio.play();
//         } else {
//             audio.pause();
//         }
//     }
// });
// TOP  Cat
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        $('.iframe-top').fadeIn();
    } else {
        $('.iframe-top').fadeOut();
    }
};

// 在Iframe 调用承载页方法
function parentJO() {
    $('.iframe-top').css('animation', 'cat 1s')
    $('.iframe-top').css('animation-fill-mode', 'forwards')
    var djs = setInterval(function () {
        var oTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (oTop > 0) {
            document.body.scrollTop = document.documentElement.scrollTop = oTop - 50;
        } else {
            clearInterval(djs);
            $('.iframe-top').css('animation', 'none')
            $('.iframe-top').hide();
        }
    }, 10);
}
