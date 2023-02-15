$(document).ready(function () {
    var i = false;
    if (/Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $("html").addClass("touch");
        i = true
    } else {
        $("html").addClass("no-touch");
        i = false
    }
    var s = 4;
    var j = new TimelineMax({
        delay: s - 2
    });
    j.eventCallback("onComplete", function () {
        l()
    });
    $("body, .js-img-load").imagesLoaded({
        background: !0
    }).always(function (w) {
        k()
    });

    function k() {
        var w = new TimelineMax({
            paused: true
        });
        w.set(".preloader", {
            opacity: "1"
        }).addLabel("first").to(".preloader", 0.6, {
            delay: 1,
            opacity: "0",
            zIndex: "-1",
            ease: "Power3.easeInOut"
        }).to(".circle-pulse", 0.5, {
            opacity: 0,
            ease: "Power3.easeInOut"
        }, "+=.5").to(".preloader__progress span", 1, {
            width: "100%",
            ease: "Power3.easeInOut"
        }, "first+=.5");
        w.duration(s).play();
        return w
    }
    $(".hamburger").on("click", function () {
        $(this).toggleClass("is-active");
        $(".inner-menu").toggleClass("is-active");
        $("body").toggleClass("open-menu")
    });
    var b = $(".hamburger");
    var r = new TimelineMax({
        paused: true,
        reversed: true
    });
    if (window.matchMedia("(max-width: 580px)").matches) {
        $(".inner-menu").each(function (w) {
            r.timeScale(1);
            r.fromTo(".nav", 1, {
                width: "0"
            }, {
                width: "100%",
                ease: Back.easeOut
            }).staggerFrom(".nav__item", 0.2, {
                opacity: 0,
                x: 70,
                ease: Back.easeOut
            }, 0.06, "-=0.5")
        })
    } else {
        $(".inner-menu").each(function (w) {
            r.timeScale(1);
            r.fromTo(".nav", 1, {
                width: "0"
            }, {
                width: "100%",
                ease: "Bounce.easeOut"
            }).staggerFrom(".nav__item", 0.2, {
                opacity: 0,
                x: 70,
                ease: Back.easeOut
            }, 0.06, "-=0.25")
        })
    }
    b.on("click", function () {
        r.reversed() ? r.play() : r.reverse()
    });
    $(".js-carousel-review").each(function () {
        var w = new Swiper(".js-carousel-review", {
            slidesPerView: 2,
            spaceBetween: 30,
            grabCursor: true,
            watchOverflow: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                991: {
                    slidesPerView: 1,
                    spaceBetween: 0
                }
            }
        })
    });
    $(".js-carousel-clients").each(function () {
        var w = new Swiper(".js-carousel-clients", {
            slidesPerView: 4,
            spaceBetween: 30,
            grabCursor: true,
            watchOverflow: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 0
                },
                580: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                991: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        })
    });

    function d() {
        $(".sticky-column").stick_in_parent({
            parent: ".sticky-parent"
        });
        $(".sticky-column").on("sticky_kit:bottom", function (w) {
            $(this).parent().css("position", "static")
        }).on("sticky_kit:unbottom", function (w) {
            $(this).parent().css("position", "relative")
        })
    }
    d();

    function f() {
        $(".sticky-column").trigger("sticky_kit:detach")
    }
    var m = 1200;
    var t, v;
    v = $(window).width();
    if ((v < m)) {
        f()
    } else {
        d()
    }

    function u() {
        t = window.innerHeight ? window.innerHeight : $(window).height();
        v = window.innerWidth ? window.innerWidth : $(window).width()
    }
    u();

    function e(w, z, x) {
        var y;
        return function () {
            var C = this,
                A = arguments;
            var D = function () {
                y = null;
                if (!x) {
                    w.apply(C, A)
                }
            };
            var B = x && !y;
            clearTimeout(y);
            y = setTimeout(D, z);
            if (B) {
                w.apply(C, A)
            }
        }
    }
    $(window).resize(e(function () {
        u();
        $(document.body).trigger("sticky_kit:recalc");
        if (v < m) {
            f()
        } else {
            d()
        }
    }, 250));

    function l() {
        $(".progress").each(function () {
            var w = new ScrollMagic.Controller();
            new ScrollMagic.Scene({
                triggerElement: ".progress",
                triggerHook: "onEnter",
                duration: 300
            }).addTo(w).on("enter", function (x) {
                var y = $(".progress-bar");
                y.each(function (z) {
                    $(this).css({
                        width: $(this).attr("aria-valuenow") + "%",
                        "z-index": "2"
                    })
                })
            })
        })
    }

    function n() {
        $(window).on("scroll", function () {
            var z = $(window).scrollTop(),
                w = $(document).height(),
                y = $(window).height();
            var x = (z / (w - y)) * 100;
            $(".scroll-line").css("width", (x + "%"))
        })
    }
    n();

    function o() {
        var w = $(".back-to-top"),
            x = $(window).height();
        w.hide();
        $(window).scroll(function () {
            var y = $(window).scrollTop();
            if (y > x) {
                w.fadeIn("slow")
            } else {
                w.fadeOut("slow")
            }
        });
        w.on("click", function (y) {
            y.preventDefault();
            $(" body, html ").animate({
                scrollTop: 0
            }, "slow")
        })
    }
    o();
    $(".js-image").each(function () {
        var w = $(this).attr("data-image");
        $(this).css("background-image", "url(" + w + ")")
    });
    $("textarea").each(function () {
        autosize(this)
    });
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
    $(".select").on("click", ".placeholder", function () {
        var w = $(this).closest(".select");
        if (!w.hasClass("is-open")) {
            w.addClass("is-open");
            $(".select.is-open").not(w).removeClass("is-open")
        } else {
            w.removeClass("is-open")
        }
    }).on("click", "ul>li", function () {
        var w = $(this).closest(".select");
        w.removeClass("is-open").find(".placeholder").text($(this).text());
        w.find("input[type=hidden]").attr("value", $(this).attr("data-value"));
        $(".filter__item").removeClass("active");
        $(this).addClass("active");
        var x = $(this).attr("data-filter");
        $(".js-filter-container").isotope({
            filter: x
        });
        return false
    });
    var a = $(".js-masonry").isotope({
        itemSelector: ".gallery-grid__item",
        layoutMode: "fitRows",
        percentPosition: true,
        transitionDuration: "0.5s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        },
        fitRows: {
            gutter: ".gutter-sizer"
        },
        masonry: {
            columnWidth: ".gallery-grid__item",
            gutter: ".gutter-sizer",
            isAnimated: true
        }
    });
    a.imagesLoaded().progress(function () {
        a.isotope({
            columnWidth: ".gallery-grid__item",
            gutter: ".gutter-sizer",
            isAnimated: true,
            layoutMode: "fitRows",
            fitRows: {
                gutter: ".gutter-sizer"
            }
        })
    });
    $("textarea").niceScroll({
        horizrailenabled: false
    });
    $(function () {
        $(".emoji-wrap img").on("click", function () {
            var w = $(this).attr("title");
            $("#commentForm").val($("#commentForm").val() + " " + w + " ")
        })
    });
    mediumZoom("[data-zoom]", {
        margin: 30
    });
    lazySizes.init();
    var c = $("img.cover");
    objectFitImages(c);
    $("#contact-form").validator().on("submit", function (w) {
        if (w.isDefaultPrevented()) {
            g();
            q(false, "Please fill in the form...")
        } else {
            w.preventDefault();
            p()
        }
    });

    function p() {
        var y = $("#nameContact").val(),
            w = $("#emailContact").val(),
            x = $("#messageContact").val();
        // https://formspree.io
        var z = "https://formspree.io/f/mgepdpbb";
        $.ajax({
            type: "POST",
            url: z,
            data: "name=" + y + "&_replyto=" + w + "&message=" + x,
            dataType: "json",
            success: function (A) {
                if (A == "success") {
                    h()
                } else {
                    g();
                    q(false, A)
                }
                alert('邮件已发送!!!');
            },
            error: function (A) {
                alert("未知错误,发送失败");
            }
        })
        alert('使用了Formspree邮件代转国外接口反应稍慢可在开发者工具里查看响应');
        // window.location.href = 'error.html'
    }

    function h() {
        $("#contact-form")[0].reset();
        q(true, "Thanks! Your message has been sent.")
    }

    function g() {
        $("#contactForm").removeClass().addClass("shake animated").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
            $(this).removeClass()
        })
    }

    function q(y, w) {
        var x;
        if (y) {
            x = "validation-success"
        } else {
            x = "validation-danger"
        }
        $("#validator-contact").removeClass().addClass(x).text(w)
    }
});