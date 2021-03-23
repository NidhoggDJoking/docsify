! function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).CodeMirror = t()
}(this, function () {
    "use strict";
    var e = navigator.userAgent,
        t = navigator.platform,
        r = /gecko\/\d/i.test(e),
        n = /MSIE \d/.test(e),
        i = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(e),
        o = /Edge\/(\d+)/.exec(e),
        l = n || i || o,
        a = l && (n ? document.documentMode || 6 : +(o || i)[1]),
        s = !o && /WebKit\//.test(e),
        u = s && /Qt\/\d+\.\d+/.test(e),
        c = !o && /Chrome\//.test(e),
        f = /Opera\//.test(e),
        h = /Apple Computer/.test(navigator.vendor),
        d = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(e),
        p = /PhantomJS/.test(e),
        g = !o && /AppleWebKit/.test(e) && /Mobile\/\w+/.test(e),
        v = /Android/.test(e),
        m = g || v || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(e),
        y = g || /Mac/.test(t),
        b = /\bCrOS\b/.test(e),
        w = /win/i.test(t),
        x = f && e.match(/Version\/(\d*\.\d*)/);
    x && (x = Number(x[1])), x && x >= 15 && (f = !1, s = !0);
    var C = y && (u || f && (null == x || x < 12.11)),
        k = r || l && a >= 9;

    function S(e) {
        return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*")
    }
    var L, T = function (e, t) {
        var r = e.className,
            n = S(t).exec(r);
        if (n) {
            var i = r.slice(n.index + n[0].length);
            e.className = r.slice(0, n.index) + (i ? n[1] + i : "")
        }
    };

    function M(e) {
        for (var t = e.childNodes.length; t > 0; --t) e.removeChild(e.firstChild);
        return e
    }

    function N(e, t) {
        return M(e).appendChild(t)
    }

    function A(e, t, r, n) {
        var i = document.createElement(e);
        if (r && (i.className = r), n && (i.style.cssText = n), "string" == typeof t) i.appendChild(document.createTextNode(t));
        else if (t)
            for (var o = 0; o < t.length; ++o) i.appendChild(t[o]);
        return i
    }

    function O(e, t, r, n) {
        var i = A(e, t, r, n);
        return i.setAttribute("role", "presentation"), i
    }

    function D(e, t) {
        if (3 == t.nodeType && (t = t.parentNode), e.contains) return e.contains(t);
        do {
            if (11 == t.nodeType && (t = t.host), t == e) return !0
        } while (t = t.parentNode)
    }

    function W() {
        var e;
        try {
            e = document.activeElement
        } catch (t) {
            e = document.body || null
        }
        for (; e && e.shadowRoot && e.shadowRoot.activeElement;) e = e.shadowRoot.activeElement;
        return e
    }

    function H(e, t) {
        var r = e.className;
        S(t).test(r) || (e.className += (r ? " " : "") + t)
    }

    function E(e, t) {
        for (var r = e.split(" "), n = 0; n < r.length; n++) r[n] && !S(r[n]).test(t) && (t += " " + r[n]);
        return t
    }
    L = document.createRange ? function (e, t, r, n) {
        var i = document.createRange();
        return i.setEnd(n || e, r), i.setStart(e, t), i
    } : function (e, t, r) {
        var n = document.body.createTextRange();
        try {
            n.moveToElementText(e.parentNode)
        } catch (e) {
            return n
        }
        return n.collapse(!0), n.moveEnd("character", r), n.moveStart("character", t), n
    };
    var F = function (e) {
        e.select()
    };

    function P(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return function () {
            return e.apply(null, t)
        }
    }

    function I(e, t, r) {
        for (var n in t || (t = {}), e) !e.hasOwnProperty(n) || !1 === r && t.hasOwnProperty(n) || (t[n] = e[n]);
        return t
    }

    function z(e, t, r, n, i) {
        null == t && -1 == (t = e.search(/[^\s\u00a0]/)) && (t = e.length);
        for (var o = n || 0, l = i || 0;;) {
            var a = e.indexOf("\t", o);
            if (a < 0 || a >= t) return l + (t - o);
            l += a - o, l += r - l % r, o = a + 1
        }
    }
    g ? F = function (e) {
        e.selectionStart = 0, e.selectionEnd = e.value.length
    } : l && (F = function (e) {
        try {
            e.select()
        } catch (e) {}
    });
    var R = function () {
        this.id = null, this.f = null, this.time = 0, this.handler = P(this.onTimeout, this)
    };

    function B(e, t) {
        for (var r = 0; r < e.length; ++r)
            if (e[r] == t) return r;
        return -1
    }
    R.prototype.onTimeout = function (e) {
        e.id = 0, e.time <= +new Date ? e.f() : setTimeout(e.handler, e.time - +new Date)
    }, R.prototype.set = function (e, t) {
        this.f = t;
        var r = +new Date + e;
        (!this.id || r < this.time) && (clearTimeout(this.id), this.id = setTimeout(this.handler, e), this.time = r)
    };
    var j = 50,
        V = {
            toString: function () {
                return "CodeMirror.Pass"
            }
        },
        G = {
            scroll: !1
        },
        U = {
            origin: "*mouse"
        },
        K = {
            origin: "+move"
        };

    function X(e, t, r) {
        for (var n = 0, i = 0;;) {
            var o = e.indexOf("\t", n); - 1 == o && (o = e.length);
            var l = o - n;
            if (o == e.length || i + l >= t) return n + Math.min(l, t - i);
            if (i += o - n, n = o + 1, (i += r - i % r) >= t) return n
        }
    }
    var $ = [""];

    function _(e) {
        for (; $.length <= e;) $.push(Y($) + " ");
        return $[e]
    }

    function Y(e) {
        return e[e.length - 1]
    }

    function q(e, t) {
        for (var r = [], n = 0; n < e.length; n++) r[n] = t(e[n], n);
        return r
    }

    function Z() {}

    function Q(e, t) {
        var r;
        return Object.create ? r = Object.create(e) : (Z.prototype = e, r = new Z), t && I(t, r), r
    }
    var J = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;

    function ee(e) {
        return /\w/.test(e) || e > "" && (e.toUpperCase() != e.toLowerCase() || J.test(e))
    }

    function te(e, t) {
        return t ? !!(t.source.indexOf("\\w") > -1 && ee(e)) || t.test(e) : ee(e)
    }

    function re(e) {
        for (var t in e)
            if (e.hasOwnProperty(t) && e[t]) return !1;
        return !0
    }
    var ne = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;

    function ie(e) {
        return e.charCodeAt(0) >= 768 && ne.test(e)
    }

    function oe(e, t, r) {
        for (;
            (r < 0 ? t > 0 : t < e.length) && ie(e.charAt(t));) t += r;
        return t
    }

    function le(e, t, r) {
        for (var n = t > r ? -1 : 1;;) {
            if (t == r) return t;
            var i = (t + r) / 2,
                o = n < 0 ? Math.ceil(i) : Math.floor(i);
            if (o == t) return e(o) ? t : r;
            e(o) ? r = o : t = o + n
        }
    }
    var ae = null;

    function se(e, t, r) {
        var n;
        ae = null;
        for (var i = 0; i < e.length; ++i) {
            var o = e[i];
            if (o.from < t && o.to > t) return i;
            o.to == t && (o.from != o.to && "before" == r ? n = i : ae = i), o.from == t && (o.from != o.to && "before" != r ? n = i : ae = i)
        }
        return null != n ? n : ae
    }
    var ue = function () {
        var e = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN",
            t = "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111";
        var r = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
            n = /[stwN]/,
            i = /[LRr]/,
            o = /[Lb1n]/,
            l = /[1n]/;

        function a(e, t, r) {
            this.level = e, this.from = t, this.to = r
        }
        return function (s, u) {
            var c = "ltr" == u ? "L" : "R";
            if (0 == s.length || "ltr" == u && !r.test(s)) return !1;
            for (var f, h = s.length, d = [], p = 0; p < h; ++p) d.push((f = s.charCodeAt(p)) <= 247 ? e.charAt(f) : 1424 <= f && f <= 1524 ? "R" : 1536 <= f && f <= 1785 ? t.charAt(f - 1536) : 1774 <= f && f <= 2220 ? "r" : 8192 <= f && f <= 8203 ? "w" : 8204 == f ? "b" : "L");
            for (var g = 0, v = c; g < h; ++g) {
                var m = d[g];
                "m" == m ? d[g] = v : v = m
            }
            for (var y = 0, b = c; y < h; ++y) {
                var w = d[y];
                "1" == w && "r" == b ? d[y] = "n" : i.test(w) && (b = w, "r" == w && (d[y] = "R"))
            }
            for (var x = 1, C = d[0]; x < h - 1; ++x) {
                var k = d[x];
                "+" == k && "1" == C && "1" == d[x + 1] ? d[x] = "1" : "," != k || C != d[x + 1] || "1" != C && "n" != C || (d[x] = C), C = k
            }
            for (var S = 0; S < h; ++S) {
                var L = d[S];
                if ("," == L) d[S] = "N";
                else if ("%" == L) {
                    var T = void 0;
                    for (T = S + 1; T < h && "%" == d[T]; ++T);
                    for (var M = S && "!" == d[S - 1] || T < h && "1" == d[T] ? "1" : "N", N = S; N < T; ++N) d[N] = M;
                    S = T - 1
                }
            }
            for (var A = 0, O = c; A < h; ++A) {
                var D = d[A];
                "L" == O && "1" == D ? d[A] = "L" : i.test(D) && (O = D)
            }
            for (var W = 0; W < h; ++W)
                if (n.test(d[W])) {
                    var H = void 0;
                    for (H = W + 1; H < h && n.test(d[H]); ++H);
                    for (var E = "L" == (W ? d[W - 1] : c), F = E == ("L" == (H < h ? d[H] : c)) ? E ? "L" : "R" : c, P = W; P < H; ++P) d[P] = F;
                    W = H - 1
                } for (var I, z = [], R = 0; R < h;)
                if (o.test(d[R])) {
                    var B = R;
                    for (++R; R < h && o.test(d[R]); ++R);
                    z.push(new a(0, B, R))
                } else {
                    var j = R,
                        V = z.length,
                        G = "rtl" == u ? 1 : 0;
                    for (++R; R < h && "L" != d[R]; ++R);
                    for (var U = j; U < R;)
                        if (l.test(d[U])) {
                            j < U && (z.splice(V, 0, new a(1, j, U)), V += G);
                            var K = U;
                            for (++U; U < R && l.test(d[U]); ++U);
                            z.splice(V, 0, new a(2, K, U)), V += G, j = U
                        } else ++U;
                    j < R && z.splice(V, 0, new a(1, j, R))
                } return "ltr" == u && (1 == z[0].level && (I = s.match(/^\s+/)) && (z[0].from = I[0].length, z.unshift(new a(0, 0, I[0].length))), 1 == Y(z).level && (I = s.match(/\s+$/)) && (Y(z).to -= I[0].length, z.push(new a(0, h - I[0].length, h)))), "rtl" == u ? z.reverse() : z
        }
    }();

    function ce(e, t) {
        var r = e.order;
        return null == r && (r = e.order = ue(e.text, t)), r
    }
    var fe = [],
        he = function (e, t, r) {
            if (e.addEventListener) e.addEventListener(t, r, !1);
            else if (e.attachEvent) e.attachEvent("on" + t, r);
            else {
                var n = e._handlers || (e._handlers = {});
                n[t] = (n[t] || fe).concat(r)
            }
        };

    function de(e, t) {
        return e._handlers && e._handlers[t] || fe
    }

    function pe(e, t, r) {
        if (e.removeEventListener) e.removeEventListener(t, r, !1);
        else if (e.detachEvent) e.detachEvent("on" + t, r);
        else {
            var n = e._handlers,
                i = n && n[t];
            if (i) {
                var o = B(i, r);
                o > -1 && (n[t] = i.slice(0, o).concat(i.slice(o + 1)))
            }
        }
    }

    function ge(e, t) {
        var r = de(e, t);
        if (r.length)
            for (var n = Array.prototype.slice.call(arguments, 2), i = 0; i < r.length; ++i) r[i].apply(null, n)
    }

    function ve(e, t, r) {
        return "string" == typeof t && (t = {
            type: t,
            preventDefault: function () {
                this.defaultPrevented = !0
            }
        }), ge(e, r || t.type, e, t), Ce(t) || t.codemirrorIgnore
    }

    function me(e) {
        var t = e._handlers && e._handlers.cursorActivity;
        if (t)
            for (var r = e.curOp.cursorActivityHandlers || (e.curOp.cursorActivityHandlers = []), n = 0; n < t.length; ++n) - 1 == B(r, t[n]) && r.push(t[n])
    }

    function ye(e, t) {
        return de(e, t).length > 0
    }

    function be(e) {
        e.prototype.on = function (e, t) {
            he(this, e, t)
        }, e.prototype.off = function (e, t) {
            pe(this, e, t)
        }
    }

    function we(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1
    }

    function xe(e) {
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
    }

    function Ce(e) {
        return null != e.defaultPrevented ? e.defaultPrevented : 0 == e.returnValue
    }

    function ke(e) {
        we(e), xe(e)
    }

    function Se(e) {
        return e.target || e.srcElement
    }

    function Le(e) {
        var t = e.which;
        return null == t && (1 & e.button ? t = 1 : 2 & e.button ? t = 3 : 4 & e.button && (t = 2)), y && e.ctrlKey && 1 == t && (t = 3), t
    }
    var Te, Me, Ne = function () {
        if (l && a < 9) return !1;
        var e = A("div");
        return "draggable" in e || "dragDrop" in e
    }();

    function Ae(e) {
        if (null == Te) {
            var t = A("span", "​");
            N(e, A("span", [t, document.createTextNode("x")])), 0 != e.firstChild.offsetHeight && (Te = t.offsetWidth <= 1 && t.offsetHeight > 2 && !(l && a < 8))
        }
        var r = Te ? A("span", "​") : A("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px");
        return r.setAttribute("cm-text", ""), r
    }

    function Oe(e) {
        if (null != Me) return Me;
        var t = N(e, document.createTextNode("AخA")),
            r = L(t, 0, 1).getBoundingClientRect(),
            n = L(t, 1, 2).getBoundingClientRect();
        return M(e), !(!r || r.left == r.right) && (Me = n.right - r.right < 3)
    }
    var De, We = 3 != "\n\nb".split(/\n/).length ? function (e) {
            for (var t = 0, r = [], n = e.length; t <= n;) {
                var i = e.indexOf("\n", t); - 1 == i && (i = e.length);
                var o = e.slice(t, "\r" == e.charAt(i - 1) ? i - 1 : i),
                    l = o.indexOf("\r"); - 1 != l ? (r.push(o.slice(0, l)), t += l + 1) : (r.push(o), t = i + 1)
            }
            return r
        } : function (e) {
            return e.split(/\r\n?|\n/)
        },
        He = window.getSelection ? function (e) {
            try {
                return e.selectionStart != e.selectionEnd
            } catch (e) {
                return !1
            }
        } : function (e) {
            var t;
            try {
                t = e.ownerDocument.selection.createRange()
            } catch (e) {}
            return !(!t || t.parentElement() != e) && 0 != t.compareEndPoints("StartToEnd", t)
        },
        Ee = "oncopy" in (De = A("div")) || (De.setAttribute("oncopy", "return;"), "function" == typeof De.oncopy),
        Fe = null;
    var Pe = {},
        Ie = {};

    function ze(e) {
        if ("string" == typeof e && Ie.hasOwnProperty(e)) e = Ie[e];
        else if (e && "string" == typeof e.name && Ie.hasOwnProperty(e.name)) {
            var t = Ie[e.name];
            "string" == typeof t && (t = {
                name: t
            }), (e = Q(t, e)).name = t.name
        } else {
            if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+xml$/.test(e)) return ze("application/xml");
            if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+json$/.test(e)) return ze("application/json")
        }
        return "string" == typeof e ? {
            name: e
        } : e || {
            name: "null"
        }
    }

    function Re(e, t) {
        t = ze(t);
        var r = Pe[t.name];
        if (!r) return Re(e, "text/plain");
        var n = r(e, t);
        if (Be.hasOwnProperty(t.name)) {
            var i = Be[t.name];
            for (var o in i) i.hasOwnProperty(o) && (n.hasOwnProperty(o) && (n["_" + o] = n[o]), n[o] = i[o])
        }
        if (n.name = t.name, t.helperType && (n.helperType = t.helperType), t.modeProps)
            for (var l in t.modeProps) n[l] = t.modeProps[l];
        return n
    }
    var Be = {};

    function je(e, t) {
        I(t, Be.hasOwnProperty(e) ? Be[e] : Be[e] = {})
    }

    function Ve(e, t) {
        if (!0 === t) return t;
        if (e.copyState) return e.copyState(t);
        var r = {};
        for (var n in t) {
            var i = t[n];
            i instanceof Array && (i = i.concat([])), r[n] = i
        }
        return r
    }

    function Ge(e, t) {
        for (var r; e.innerMode && (r = e.innerMode(t)) && r.mode != e;) t = r.state, e = r.mode;
        return r || {
            mode: e,
            state: t
        }
    }

    function Ue(e, t, r) {
        return !e.startState || e.startState(t, r)
    }
    var Ke = function (e, t, r) {
        this.pos = this.start = 0, this.string = e, this.tabSize = t || 8, this.lastColumnPos = this.lastColumnValue = 0, this.lineStart = 0, this.lineOracle = r
    };

    function Xe(e, t) {
        if ((t -= e.first) < 0 || t >= e.size) throw new Error("There is no line " + (t + e.first) + " in the document.");
        for (var r = e; !r.lines;)
            for (var n = 0;; ++n) {
                var i = r.children[n],
                    o = i.chunkSize();
                if (t < o) {
                    r = i;
                    break
                }
                t -= o
            }
        return r.lines[t]
    }

    function $e(e, t, r) {
        var n = [],
            i = t.line;
        return e.iter(t.line, r.line + 1, function (e) {
            var o = e.text;
            i == r.line && (o = o.slice(0, r.ch)), i == t.line && (o = o.slice(t.ch)), n.push(o), ++i
        }), n
    }

    function _e(e, t, r) {
        var n = [];
        return e.iter(t, r, function (e) {
            n.push(e.text)
        }), n
    }

    function Ye(e, t) {
        var r = t - e.height;
        if (r)
            for (var n = e; n; n = n.parent) n.height += r
    }

    function qe(e) {
        if (null == e.parent) return null;
        for (var t = e.parent, r = B(t.lines, e), n = t.parent; n; t = n, n = n.parent)
            for (var i = 0; n.children[i] != t; ++i) r += n.children[i].chunkSize();
        return r + t.first
    }

    function Ze(e, t) {
        var r = e.first;
        e: do {
            for (var n = 0; n < e.children.length; ++n) {
                var i = e.children[n],
                    o = i.height;
                if (t < o) {
                    e = i;
                    continue e
                }
                t -= o, r += i.chunkSize()
            }
            return r
        } while (!e.lines);
        for (var l = 0; l < e.lines.length; ++l) {
            var a = e.lines[l].height;
            if (t < a) break;
            t -= a
        }
        return r + l
    }

    function Qe(e, t) {
        return t >= e.first && t < e.first + e.size
    }

    function Je(e, t) {
        return String(e.lineNumberFormatter(t + e.firstLineNumber))
    }

    function et(e, t, r) {
        if (void 0 === r && (r = null), !(this instanceof et)) return new et(e, t, r);
        this.line = e, this.ch = t, this.sticky = r
    }

    function tt(e, t) {
        return e.line - t.line || e.ch - t.ch
    }

    function rt(e, t) {
        return e.sticky == t.sticky && 0 == tt(e, t)
    }

    function nt(e) {
        return et(e.line, e.ch)
    }

    function it(e, t) {
        return tt(e, t) < 0 ? t : e
    }

    function ot(e, t) {
        return tt(e, t) < 0 ? e : t
    }

    function lt(e, t) {
        return Math.max(e.first, Math.min(t, e.first + e.size - 1))
    }

    function at(e, t) {
        if (t.line < e.first) return et(e.first, 0);
        var r = e.first + e.size - 1;
        return t.line > r ? et(r, Xe(e, r).text.length) : function (e, t) {
            var r = e.ch;
            return null == r || r > t ? et(e.line, t) : r < 0 ? et(e.line, 0) : e
        }(t, Xe(e, t.line).text.length)
    }

    function st(e, t) {
        for (var r = [], n = 0; n < t.length; n++) r[n] = at(e, t[n]);
        return r
    }
    Ke.prototype.eol = function () {
        return this.pos >= this.string.length
    }, Ke.prototype.sol = function () {
        return this.pos == this.lineStart
    }, Ke.prototype.peek = function () {
        return this.string.charAt(this.pos) || void 0
    }, Ke.prototype.next = function () {
        if (this.pos < this.string.length) return this.string.charAt(this.pos++)
    }, Ke.prototype.eat = function (e) {
        var t = this.string.charAt(this.pos);
        if ("string" == typeof e ? t == e : t && (e.test ? e.test(t) : e(t))) return ++this.pos, t
    }, Ke.prototype.eatWhile = function (e) {
        for (var t = this.pos; this.eat(e););
        return this.pos > t
    }, Ke.prototype.eatSpace = function () {
        for (var e = this.pos;
            /[\s\u00a0]/.test(this.string.charAt(this.pos));) ++this.pos;
        return this.pos > e
    }, Ke.prototype.skipToEnd = function () {
        this.pos = this.string.length
    }, Ke.prototype.skipTo = function (e) {
        var t = this.string.indexOf(e, this.pos);
        if (t > -1) return this.pos = t, !0
    }, Ke.prototype.backUp = function (e) {
        this.pos -= e
    }, Ke.prototype.column = function () {
        return this.lastColumnPos < this.start && (this.lastColumnValue = z(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? z(this.string, this.lineStart, this.tabSize) : 0)
    }, Ke.prototype.indentation = function () {
        return z(this.string, null, this.tabSize) - (this.lineStart ? z(this.string, this.lineStart, this.tabSize) : 0)
    }, Ke.prototype.match = function (e, t, r) {
        if ("string" != typeof e) {
            var n = this.string.slice(this.pos).match(e);
            return n && n.index > 0 ? null : (n && !1 !== t && (this.pos += n[0].length), n)
        }
        var i = function (e) {
            return r ? e.toLowerCase() : e
        };
        if (i(this.string.substr(this.pos, e.length)) == i(e)) return !1 !== t && (this.pos += e.length), !0
    }, Ke.prototype.current = function () {
        return this.string.slice(this.start, this.pos)
    }, Ke.prototype.hideFirstChars = function (e, t) {
        this.lineStart += e;
        try {
            return t()
        } finally {
            this.lineStart -= e
        }
    }, Ke.prototype.lookAhead = function (e) {
        var t = this.lineOracle;
        return t && t.lookAhead(e)
    }, Ke.prototype.baseToken = function () {
        var e = this.lineOracle;
        return e && e.baseToken(this.pos)
    };
    var ut = function (e, t) {
            this.state = e, this.lookAhead = t
        },
        ct = function (e, t, r, n) {
            this.state = t, this.doc = e, this.line = r, this.maxLookAhead = n || 0, this.baseTokens = null, this.baseTokenPos = 1
        };

    function ft(e, t, r, n) {
        var i = [e.state.modeGen],
            o = {};
        wt(e, t.text, e.doc.mode, r, function (e, t) {
            return i.push(e, t)
        }, o, n);
        for (var l = r.state, a = function (n) {
                r.baseTokens = i;
                var a = e.state.overlays[n],
                    s = 1,
                    u = 0;
                r.state = !0, wt(e, t.text, a.mode, r, function (e, t) {
                    for (var r = s; u < e;) {
                        var n = i[s];
                        n > e && i.splice(s, 1, e, i[s + 1], n), s += 2, u = Math.min(e, n)
                    }
                    if (t)
                        if (a.opaque) i.splice(r, s - r, e, "overlay " + t), s = r + 2;
                        else
                            for (; r < s; r += 2) {
                                var o = i[r + 1];
                                i[r + 1] = (o ? o + " " : "") + "overlay " + t
                            }
                }, o), r.state = l, r.baseTokens = null, r.baseTokenPos = 1
            }, s = 0; s < e.state.overlays.length; ++s) a(s);
        return {
            styles: i,
            classes: o.bgClass || o.textClass ? o : null
        }
    }

    function ht(e, t, r) {
        if (!t.styles || t.styles[0] != e.state.modeGen) {
            var n = dt(e, qe(t)),
                i = t.text.length > e.options.maxHighlightLength && Ve(e.doc.mode, n.state),
                o = ft(e, t, n);
            i && (n.state = i), t.stateAfter = n.save(!i), t.styles = o.styles, o.classes ? t.styleClasses = o.classes : t.styleClasses && (t.styleClasses = null), r === e.doc.highlightFrontier && (e.doc.modeFrontier = Math.max(e.doc.modeFrontier, ++e.doc.highlightFrontier))
        }
        return t.styles
    }

    function dt(e, t, r) {
        var n = e.doc,
            i = e.display;
        if (!n.mode.startState) return new ct(n, !0, t);
        var o = function (e, t, r) {
                for (var n, i, o = e.doc, l = r ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100), a = t; a > l; --a) {
                    if (a <= o.first) return o.first;
                    var s = Xe(o, a - 1),
                        u = s.stateAfter;
                    if (u && (!r || a + (u instanceof ut ? u.lookAhead : 0) <= o.modeFrontier)) return a;
                    var c = z(s.text, null, e.options.tabSize);
                    (null == i || n > c) && (i = a - 1, n = c)
                }
                return i
            }(e, t, r),
            l = o > n.first && Xe(n, o - 1).stateAfter,
            a = l ? ct.fromSaved(n, l, o) : new ct(n, Ue(n.mode), o);
        return n.iter(o, t, function (r) {
            pt(e, r.text, a);
            var n = a.line;
            r.stateAfter = n == t - 1 || n % 5 == 0 || n >= i.viewFrom && n < i.viewTo ? a.save() : null, a.nextLine()
        }), r && (n.modeFrontier = a.line), a
    }

    function pt(e, t, r, n) {
        var i = e.doc.mode,
            o = new Ke(t, e.options.tabSize, r);
        for (o.start = o.pos = n || 0, "" == t && gt(i, r.state); !o.eol();) vt(i, o, r.state), o.start = o.pos
    }

    function gt(e, t) {
        if (e.blankLine) return e.blankLine(t);
        if (e.innerMode) {
            var r = Ge(e, t);
            return r.mode.blankLine ? r.mode.blankLine(r.state) : void 0
        }
    }

    function vt(e, t, r, n) {
        for (var i = 0; i < 10; i++) {
            n && (n[0] = Ge(e, r).mode);
            var o = e.token(t, r);
            if (t.pos > t.start) return o
        }
        throw new Error("Mode " + e.name + " failed to advance stream.")
    }
    ct.prototype.lookAhead = function (e) {
        var t = this.doc.getLine(this.line + e);
        return null != t && e > this.maxLookAhead && (this.maxLookAhead = e), t
    }, ct.prototype.baseToken = function (e) {
        if (!this.baseTokens) return null;
        for (; this.baseTokens[this.baseTokenPos] <= e;) this.baseTokenPos += 2;
        var t = this.baseTokens[this.baseTokenPos + 1];
        return {
            type: t && t.replace(/( |^)overlay .*/, ""),
            size: this.baseTokens[this.baseTokenPos] - e
        }
    }, ct.prototype.nextLine = function () {
        this.line++, this.maxLookAhead > 0 && this.maxLookAhead--
    }, ct.fromSaved = function (e, t, r) {
        return t instanceof ut ? new ct(e, Ve(e.mode, t.state), r, t.lookAhead) : new ct(e, Ve(e.mode, t), r)
    }, ct.prototype.save = function (e) {
        var t = !1 !== e ? Ve(this.doc.mode, this.state) : this.state;
        return this.maxLookAhead > 0 ? new ut(t, this.maxLookAhead) : t
    };
    var mt = function (e, t, r) {
        this.start = e.start, this.end = e.pos, this.string = e.current(), this.type = t || null, this.state = r
    };

    function yt(e, t, r, n) {
        var i, o, l = e.doc,
            a = l.mode,
            s = Xe(l, (t = at(l, t)).line),
            u = dt(e, t.line, r),
            c = new Ke(s.text, e.options.tabSize, u);
        for (n && (o = []);
            (n || c.pos < t.ch) && !c.eol();) c.start = c.pos, i = vt(a, c, u.state), n && o.push(new mt(c, i, Ve(l.mode, u.state)));
        return n ? o : new mt(c, i, u.state)
    }

    function bt(e, t) {
        if (e)
            for (;;) {
                var r = e.match(/(?:^|\s+)line-(background-)?(\S+)/);
                if (!r) break;
                e = e.slice(0, r.index) + e.slice(r.index + r[0].length);
                var n = r[1] ? "bgClass" : "textClass";
                null == t[n] ? t[n] = r[2] : new RegExp("(?:^|\\s)" + r[2] + "(?:$|\\s)").test(t[n]) || (t[n] += " " + r[2])
            }
        return e
    }

    function wt(e, t, r, n, i, o, l) {
        var a = r.flattenSpans;
        null == a && (a = e.options.flattenSpans);
        var s, u = 0,
            c = null,
            f = new Ke(t, e.options.tabSize, n),
            h = e.options.addModeClass && [null];
        for ("" == t && bt(gt(r, n.state), o); !f.eol();) {
            if (f.pos > e.options.maxHighlightLength ? (a = !1, l && pt(e, t, n, f.pos), f.pos = t.length, s = null) : s = bt(vt(r, f, n.state, h), o), h) {
                var d = h[0].name;
                d && (s = "m-" + (s ? d + " " + s : d))
            }
            if (!a || c != s) {
                for (; u < f.start;) i(u = Math.min(f.start, u + 5e3), c);
                c = s
            }
            f.start = f.pos
        }
        for (; u < f.pos;) {
            var p = Math.min(f.pos, u + 5e3);
            i(p, c), u = p
        }
    }
    var xt = !1,
        Ct = !1;

    function kt(e, t, r) {
        this.marker = e, this.from = t, this.to = r
    }

    function St(e, t) {
        if (e)
            for (var r = 0; r < e.length; ++r) {
                var n = e[r];
                if (n.marker == t) return n
            }
    }

    function Lt(e, t) {
        for (var r, n = 0; n < e.length; ++n) e[n] != t && (r || (r = [])).push(e[n]);
        return r
    }

    function Tt(e, t) {
        if (t.full) return null;
        var r = Qe(e, t.from.line) && Xe(e, t.from.line).markedSpans,
            n = Qe(e, t.to.line) && Xe(e, t.to.line).markedSpans;
        if (!r && !n) return null;
        var i = t.from.ch,
            o = t.to.ch,
            l = 0 == tt(t.from, t.to),
            a = function (e, t, r) {
                var n;
                if (e)
                    for (var i = 0; i < e.length; ++i) {
                        var o = e[i],
                            l = o.marker;
                        if (null == o.from || (l.inclusiveLeft ? o.from <= t : o.from < t) || o.from == t && "bookmark" == l.type && (!r || !o.marker.insertLeft)) {
                            var a = null == o.to || (l.inclusiveRight ? o.to >= t : o.to > t);
                            (n || (n = [])).push(new kt(l, o.from, a ? null : o.to))
                        }
                    }
                return n
            }(r, i, l),
            s = function (e, t, r) {
                var n;
                if (e)
                    for (var i = 0; i < e.length; ++i) {
                        var o = e[i],
                            l = o.marker;
                        if (null == o.to || (l.inclusiveRight ? o.to >= t : o.to > t) || o.from == t && "bookmark" == l.type && (!r || o.marker.insertLeft)) {
                            var a = null == o.from || (l.inclusiveLeft ? o.from <= t : o.from < t);
                            (n || (n = [])).push(new kt(l, a ? null : o.from - t, null == o.to ? null : o.to - t))
                        }
                    }
                return n
            }(n, o, l),
            u = 1 == t.text.length,
            c = Y(t.text).length + (u ? i : 0);
        if (a)
            for (var f = 0; f < a.length; ++f) {
                var h = a[f];
                if (null == h.to) {
                    var d = St(s, h.marker);
                    d ? u && (h.to = null == d.to ? null : d.to + c) : h.to = i
                }
            }
        if (s)
            for (var p = 0; p < s.length; ++p) {
                var g = s[p];
                if (null != g.to && (g.to += c), null == g.from) St(a, g.marker) || (g.from = c, u && (a || (a = [])).push(g));
                else g.from += c, u && (a || (a = [])).push(g)
            }
        a && (a = Mt(a)), s && s != a && (s = Mt(s));
        var v = [a];
        if (!u) {
            var m, y = t.text.length - 2;
            if (y > 0 && a)
                for (var b = 0; b < a.length; ++b) null == a[b].to && (m || (m = [])).push(new kt(a[b].marker, null, null));
            for (var w = 0; w < y; ++w) v.push(m);
            v.push(s)
        }
        return v
    }

    function Mt(e) {
        for (var t = 0; t < e.length; ++t) {
            var r = e[t];
            null != r.from && r.from == r.to && !1 !== r.marker.clearWhenEmpty && e.splice(t--, 1)
        }
        return e.length ? e : null
    }

    function Nt(e) {
        var t = e.markedSpans;
        if (t) {
            for (var r = 0; r < t.length; ++r) t[r].marker.detachLine(e);
            e.markedSpans = null
        }
    }

    function At(e, t) {
        if (t) {
            for (var r = 0; r < t.length; ++r) t[r].marker.attachLine(e);
            e.markedSpans = t
        }
    }

    function Ot(e) {
        return e.inclusiveLeft ? -1 : 0
    }

    function Dt(e) {
        return e.inclusiveRight ? 1 : 0
    }

    function Wt(e, t) {
        var r = e.lines.length - t.lines.length;
        if (0 != r) return r;
        var n = e.find(),
            i = t.find(),
            o = tt(n.from, i.from) || Ot(e) - Ot(t);
        if (o) return -o;
        var l = tt(n.to, i.to) || Dt(e) - Dt(t);
        return l || t.id - e.id
    }

    function Ht(e, t) {
        var r, n = Ct && e.markedSpans;
        if (n)
            for (var i = void 0, o = 0; o < n.length; ++o)(i = n[o]).marker.collapsed && null == (t ? i.from : i.to) && (!r || Wt(r, i.marker) < 0) && (r = i.marker);
        return r
    }

    function Et(e) {
        return Ht(e, !0)
    }

    function Ft(e) {
        return Ht(e, !1)
    }

    function Pt(e, t) {
        var r, n = Ct && e.markedSpans;
        if (n)
            for (var i = 0; i < n.length; ++i) {
                var o = n[i];
                o.marker.collapsed && (null == o.from || o.from < t) && (null == o.to || o.to > t) && (!r || Wt(r, o.marker) < 0) && (r = o.marker)
            }
        return r
    }

    function It(e, t, r, n, i) {
        var o = Xe(e, t),
            l = Ct && o.markedSpans;
        if (l)
            for (var a = 0; a < l.length; ++a) {
                var s = l[a];
                if (s.marker.collapsed) {
                    var u = s.marker.find(0),
                        c = tt(u.from, r) || Ot(s.marker) - Ot(i),
                        f = tt(u.to, n) || Dt(s.marker) - Dt(i);
                    if (!(c >= 0 && f <= 0 || c <= 0 && f >= 0) && (c <= 0 && (s.marker.inclusiveRight && i.inclusiveLeft ? tt(u.to, r) >= 0 : tt(u.to, r) > 0) || c >= 0 && (s.marker.inclusiveRight && i.inclusiveLeft ? tt(u.from, n) <= 0 : tt(u.from, n) < 0))) return !0
                }
            }
    }

    function zt(e) {
        for (var t; t = Et(e);) e = t.find(-1, !0).line;
        return e
    }

    function Rt(e, t) {
        var r = Xe(e, t),
            n = zt(r);
        return r == n ? t : qe(n)
    }

    function Bt(e, t) {
        if (t > e.lastLine()) return t;
        var r, n = Xe(e, t);
        if (!jt(e, n)) return t;
        for (; r = Ft(n);) n = r.find(1, !0).line;
        return qe(n) + 1
    }

    function jt(e, t) {
        var r = Ct && t.markedSpans;
        if (r)
            for (var n = void 0, i = 0; i < r.length; ++i)
                if ((n = r[i]).marker.collapsed) {
                    if (null == n.from) return !0;
                    if (!n.marker.widgetNode && 0 == n.from && n.marker.inclusiveLeft && Vt(e, t, n)) return !0
                }
    }

    function Vt(e, t, r) {
        if (null == r.to) {
            var n = r.marker.find(1, !0);
            return Vt(e, n.line, St(n.line.markedSpans, r.marker))
        }
        if (r.marker.inclusiveRight && r.to == t.text.length) return !0;
        for (var i = void 0, o = 0; o < t.markedSpans.length; ++o)
            if ((i = t.markedSpans[o]).marker.collapsed && !i.marker.widgetNode && i.from == r.to && (null == i.to || i.to != r.from) && (i.marker.inclusiveLeft || r.marker.inclusiveRight) && Vt(e, t, i)) return !0
    }

    function Gt(e) {
        for (var t = 0, r = (e = zt(e)).parent, n = 0; n < r.lines.length; ++n) {
            var i = r.lines[n];
            if (i == e) break;
            t += i.height
        }
        for (var o = r.parent; o; o = (r = o).parent)
            for (var l = 0; l < o.children.length; ++l) {
                var a = o.children[l];
                if (a == r) break;
                t += a.height
            }
        return t
    }

    function Ut(e) {
        if (0 == e.height) return 0;
        for (var t, r = e.text.length, n = e; t = Et(n);) {
            var i = t.find(0, !0);
            n = i.from.line, r += i.from.ch - i.to.ch
        }
        for (n = e; t = Ft(n);) {
            var o = t.find(0, !0);
            r -= n.text.length - o.from.ch, r += (n = o.to.line).text.length - o.to.ch
        }
        return r
    }

    function Kt(e) {
        var t = e.display,
            r = e.doc;
        t.maxLine = Xe(r, r.first), t.maxLineLength = Ut(t.maxLine), t.maxLineChanged = !0, r.iter(function (e) {
            var r = Ut(e);
            r > t.maxLineLength && (t.maxLineLength = r, t.maxLine = e)
        })
    }
    var Xt = function (e, t, r) {
        this.text = e, At(this, t), this.height = r ? r(this) : 1
    };

    function $t(e) {
        e.parent = null, Nt(e)
    }
    Xt.prototype.lineNo = function () {
        return qe(this)
    }, be(Xt);
    var _t = {},
        Yt = {};

    function qt(e, t) {
        if (!e || /^\s*$/.test(e)) return null;
        var r = t.addModeClass ? Yt : _t;
        return r[e] || (r[e] = e.replace(/\S+/g, "cm-$&"))
    }

    function Zt(e, t) {
        var r = O("span", null, null, s ? "padding-right: .1px" : null),
            n = {
                pre: O("pre", [r], "CodeMirror-line"),
                content: r,
                col: 0,
                pos: 0,
                cm: e,
                trailingSpace: !1,
                splitSpaces: e.getOption("lineWrapping")
            };
        t.measure = {};
        for (var i = 0; i <= (t.rest ? t.rest.length : 0); i++) {
            var o = i ? t.rest[i - 1] : t.line,
                l = void 0;
            n.pos = 0, n.addToken = Jt, Oe(e.display.measure) && (l = ce(o, e.doc.direction)) && (n.addToken = er(n.addToken, l)), n.map = [], rr(o, n, ht(e, o, t != e.display.externalMeasured && qe(o))), o.styleClasses && (o.styleClasses.bgClass && (n.bgClass = E(o.styleClasses.bgClass, n.bgClass || "")), o.styleClasses.textClass && (n.textClass = E(o.styleClasses.textClass, n.textClass || ""))), 0 == n.map.length && n.map.push(0, 0, n.content.appendChild(Ae(e.display.measure))), 0 == i ? (t.measure.map = n.map, t.measure.cache = {}) : ((t.measure.maps || (t.measure.maps = [])).push(n.map), (t.measure.caches || (t.measure.caches = [])).push({}))
        }
        if (s) {
            var a = n.content.lastChild;
            (/\bcm-tab\b/.test(a.className) || a.querySelector && a.querySelector(".cm-tab")) && (n.content.className = "cm-tab-wrap-hack")
        }
        return ge(e, "renderLine", e, t.line, n.pre), n.pre.className && (n.textClass = E(n.pre.className, n.textClass || "")), n
    }

    function Qt(e) {
        var t = A("span", "•", "cm-invalidchar");
        return t.title = "\\u" + e.charCodeAt(0).toString(16), t.setAttribute("aria-label", t.title), t
    }

    function Jt(e, t, r, n, i, o, s) {
        if (t) {
            var u, c = e.splitSpaces ? function (e, t) {
                    if (e.length > 1 && !/  /.test(e)) return e;
                    for (var r = t, n = "", i = 0; i < e.length; i++) {
                        var o = e.charAt(i);
                        " " != o || !r || i != e.length - 1 && 32 != e.charCodeAt(i + 1) || (o = " "), n += o, r = " " == o
                    }
                    return n
                }(t, e.trailingSpace) : t,
                f = e.cm.state.specialChars,
                h = !1;
            if (f.test(t)) {
                u = document.createDocumentFragment();
                for (var d = 0;;) {
                    f.lastIndex = d;
                    var p = f.exec(t),
                        g = p ? p.index - d : t.length - d;
                    if (g) {
                        var v = document.createTextNode(c.slice(d, d + g));
                        l && a < 9 ? u.appendChild(A("span", [v])) : u.appendChild(v), e.map.push(e.pos, e.pos + g, v), e.col += g, e.pos += g
                    }
                    if (!p) break;
                    d += g + 1;
                    var m = void 0;
                    if ("\t" == p[0]) {
                        var y = e.cm.options.tabSize,
                            b = y - e.col % y;
                        (m = u.appendChild(A("span", _(b), "cm-tab"))).setAttribute("role", "presentation"), m.setAttribute("cm-text", "\t"), e.col += b
                    } else "\r" == p[0] || "\n" == p[0] ? ((m = u.appendChild(A("span", "\r" == p[0] ? "␍" : "␤", "cm-invalidchar"))).setAttribute("cm-text", p[0]), e.col += 1) : ((m = e.cm.options.specialCharPlaceholder(p[0])).setAttribute("cm-text", p[0]), l && a < 9 ? u.appendChild(A("span", [m])) : u.appendChild(m), e.col += 1);
                    e.map.push(e.pos, e.pos + 1, m), e.pos++
                }
            } else e.col += t.length, u = document.createTextNode(c), e.map.push(e.pos, e.pos + t.length, u), l && a < 9 && (h = !0), e.pos += t.length;
            if (e.trailingSpace = 32 == c.charCodeAt(t.length - 1), r || n || i || h || o) {
                var w = r || "";
                n && (w += n), i && (w += i);
                var x = A("span", [u], w, o);
                if (s)
                    for (var C in s) s.hasOwnProperty(C) && "style" != C && "class" != C && x.setAttribute(C, s[C]);
                return e.content.appendChild(x)
            }
            e.content.appendChild(u)
        }
    }

    function er(e, t) {
        return function (r, n, i, o, l, a, s) {
            i = i ? i + " cm-force-border" : "cm-force-border";
            for (var u = r.pos, c = u + n.length;;) {
                for (var f = void 0, h = 0; h < t.length && !((f = t[h]).to > u && f.from <= u); h++);
                if (f.to >= c) return e(r, n, i, o, l, a, s);
                e(r, n.slice(0, f.to - u), i, o, null, a, s), o = null, n = n.slice(f.to - u), u = f.to
            }
        }
    }

    function tr(e, t, r, n) {
        var i = !n && r.widgetNode;
        i && e.map.push(e.pos, e.pos + t, i), !n && e.cm.display.input.needsContentAttribute && (i || (i = e.content.appendChild(document.createElement("span"))), i.setAttribute("cm-marker", r.id)), i && (e.cm.display.input.setUneditable(i), e.content.appendChild(i)), e.pos += t, e.trailingSpace = !1
    }

    function rr(e, t, r) {
        var n = e.markedSpans,
            i = e.text,
            o = 0;
        if (n)
            for (var l, a, s, u, c, f, h, d = i.length, p = 0, g = 1, v = "", m = 0;;) {
                if (m == p) {
                    s = u = c = a = "", h = null, f = null, m = 1 / 0;
                    for (var y = [], b = void 0, w = 0; w < n.length; ++w) {
                        var x = n[w],
                            C = x.marker;
                        if ("bookmark" == C.type && x.from == p && C.widgetNode) y.push(C);
                        else if (x.from <= p && (null == x.to || x.to > p || C.collapsed && x.to == p && x.from == p)) {
                            if (null != x.to && x.to != p && m > x.to && (m = x.to, u = ""), C.className && (s += " " + C.className), C.css && (a = (a ? a + ";" : "") + C.css), C.startStyle && x.from == p && (c += " " + C.startStyle), C.endStyle && x.to == m && (b || (b = [])).push(C.endStyle, x.to), C.title && ((h || (h = {})).title = C.title), C.attributes)
                                for (var k in C.attributes)(h || (h = {}))[k] = C.attributes[k];
                            C.collapsed && (!f || Wt(f.marker, C) < 0) && (f = x)
                        } else x.from > p && m > x.from && (m = x.from)
                    }
                    if (b)
                        for (var S = 0; S < b.length; S += 2) b[S + 1] == m && (u += " " + b[S]);
                    if (!f || f.from == p)
                        for (var L = 0; L < y.length; ++L) tr(t, 0, y[L]);
                    if (f && (f.from || 0) == p) {
                        if (tr(t, (null == f.to ? d + 1 : f.to) - p, f.marker, null == f.from), null == f.to) return;
                        f.to == p && (f = !1)
                    }
                }
                if (p >= d) break;
                for (var T = Math.min(d, m);;) {
                    if (v) {
                        var M = p + v.length;
                        if (!f) {
                            var N = M > T ? v.slice(0, T - p) : v;
                            t.addToken(t, N, l ? l + s : s, c, p + N.length == m ? u : "", a, h)
                        }
                        if (M >= T) {
                            v = v.slice(T - p), p = T;
                            break
                        }
                        p = M, c = ""
                    }
                    v = i.slice(o, o = r[g++]), l = qt(r[g++], t.cm.options)
                }
            } else
                for (var A = 1; A < r.length; A += 2) t.addToken(t, i.slice(o, o = r[A]), qt(r[A + 1], t.cm.options))
    }

    function nr(e, t, r) {
        this.line = t, this.rest = function (e) {
            for (var t, r; t = Ft(e);) e = t.find(1, !0).line, (r || (r = [])).push(e);
            return r
        }(t), this.size = this.rest ? qe(Y(this.rest)) - r + 1 : 1, this.node = this.text = null, this.hidden = jt(e, t)
    }

    function ir(e, t, r) {
        for (var n, i = [], o = t; o < r; o = n) {
            var l = new nr(e.doc, Xe(e.doc, o), o);
            n = o + l.size, i.push(l)
        }
        return i
    }
    var or = null;
    var lr = null;

    function ar(e, t) {
        var r = de(e, t);
        if (r.length) {
            var n, i = Array.prototype.slice.call(arguments, 2);
            or ? n = or.delayedCallbacks : lr ? n = lr : (n = lr = [], setTimeout(sr, 0));
            for (var o = function (e) {
                    n.push(function () {
                        return r[e].apply(null, i)
                    })
                }, l = 0; l < r.length; ++l) o(l)
        }
    }

    function sr() {
        var e = lr;
        lr = null;
        for (var t = 0; t < e.length; ++t) e[t]()
    }

    function ur(e, t, r, n) {
        for (var i = 0; i < t.changes.length; i++) {
            var o = t.changes[i];
            "text" == o ? hr(e, t) : "gutter" == o ? pr(e, t, r, n) : "class" == o ? dr(e, t) : "widget" == o && gr(e, t, n)
        }
        t.changes = null
    }

    function cr(e) {
        return e.node == e.text && (e.node = A("div", null, null, "position: relative"), e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text), e.node.appendChild(e.text), l && a < 8 && (e.node.style.zIndex = 2)), e.node
    }

    function fr(e, t) {
        var r = e.display.externalMeasured;
        return r && r.line == t.line ? (e.display.externalMeasured = null, t.measure = r.measure, r.built) : Zt(e, t)
    }

    function hr(e, t) {
        var r = t.text.className,
            n = fr(e, t);
        t.text == t.node && (t.node = n.pre), t.text.parentNode.replaceChild(n.pre, t.text), t.text = n.pre, n.bgClass != t.bgClass || n.textClass != t.textClass ? (t.bgClass = n.bgClass, t.textClass = n.textClass, dr(e, t)) : r && (t.text.className = r)
    }

    function dr(e, t) {
        ! function (e, t) {
            var r = t.bgClass ? t.bgClass + " " + (t.line.bgClass || "") : t.line.bgClass;
            if (r && (r += " CodeMirror-linebackground"), t.background) r ? t.background.className = r : (t.background.parentNode.removeChild(t.background), t.background = null);
            else if (r) {
                var n = cr(t);
                t.background = n.insertBefore(A("div", null, r), n.firstChild), e.display.input.setUneditable(t.background)
            }
        }(e, t), t.line.wrapClass ? cr(t).className = t.line.wrapClass : t.node != t.text && (t.node.className = "");
        var r = t.textClass ? t.textClass + " " + (t.line.textClass || "") : t.line.textClass;
        t.text.className = r || ""
    }

    function pr(e, t, r, n) {
        if (t.gutter && (t.node.removeChild(t.gutter), t.gutter = null), t.gutterBackground && (t.node.removeChild(t.gutterBackground), t.gutterBackground = null), t.line.gutterClass) {
            var i = cr(t);
            t.gutterBackground = A("div", null, "CodeMirror-gutter-background " + t.line.gutterClass, "left: " + (e.options.fixedGutter ? n.fixedPos : -n.gutterTotalWidth) + "px; width: " + n.gutterTotalWidth + "px"), e.display.input.setUneditable(t.gutterBackground), i.insertBefore(t.gutterBackground, t.text)
        }
        var o = t.line.gutterMarkers;
        if (e.options.lineNumbers || o) {
            var l = cr(t),
                a = t.gutter = A("div", null, "CodeMirror-gutter-wrapper", "left: " + (e.options.fixedGutter ? n.fixedPos : -n.gutterTotalWidth) + "px");
            if (e.display.input.setUneditable(a), l.insertBefore(a, t.text), t.line.gutterClass && (a.className += " " + t.line.gutterClass), !e.options.lineNumbers || o && o["CodeMirror-linenumbers"] || (t.lineNumber = a.appendChild(A("div", Je(e.options, r), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + n.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e.display.lineNumInnerWidth + "px"))), o)
                for (var s = 0; s < e.display.gutterSpecs.length; ++s) {
                    var u = e.display.gutterSpecs[s].className,
                        c = o.hasOwnProperty(u) && o[u];
                    c && a.appendChild(A("div", [c], "CodeMirror-gutter-elt", "left: " + n.gutterLeft[u] + "px; width: " + n.gutterWidth[u] + "px"))
                }
        }
    }

    function gr(e, t, r) {
        t.alignable && (t.alignable = null);
        for (var n = S("CodeMirror-linewidget"), i = t.node.firstChild, o = void 0; i; i = o) o = i.nextSibling, n.test(i.className) && t.node.removeChild(i);
        mr(e, t, r)
    }

    function vr(e, t, r, n) {
        var i = fr(e, t);
        return t.text = t.node = i.pre, i.bgClass && (t.bgClass = i.bgClass), i.textClass && (t.textClass = i.textClass), dr(e, t), pr(e, t, r, n), mr(e, t, n), t.node
    }

    function mr(e, t, r) {
        if (yr(e, t.line, t, r, !0), t.rest)
            for (var n = 0; n < t.rest.length; n++) yr(e, t.rest[n], t, r, !1)
    }

    function yr(e, t, r, n, i) {
        if (t.widgets)
            for (var o = cr(r), l = 0, a = t.widgets; l < a.length; ++l) {
                var s = a[l],
                    u = A("div", [s.node], "CodeMirror-linewidget" + (s.className ? " " + s.className : ""));
                s.handleMouseEvents || u.setAttribute("cm-ignore-events", "true"), br(s, u, r, n), e.display.input.setUneditable(u), i && s.above ? o.insertBefore(u, r.gutter || r.text) : o.appendChild(u), ar(s, "redraw")
            }
    }

    function br(e, t, r, n) {
        if (e.noHScroll) {
            (r.alignable || (r.alignable = [])).push(t);
            var i = n.wrapperWidth;
            t.style.left = n.fixedPos + "px", e.coverGutter || (i -= n.gutterTotalWidth, t.style.paddingLeft = n.gutterTotalWidth + "px"), t.style.width = i + "px"
        }
        e.coverGutter && (t.style.zIndex = 5, t.style.position = "relative", e.noHScroll || (t.style.marginLeft = -n.gutterTotalWidth + "px"))
    }

    function wr(e) {
        if (null != e.height) return e.height;
        var t = e.doc.cm;
        if (!t) return 0;
        if (!D(document.body, e.node)) {
            var r = "position: relative;";
            e.coverGutter && (r += "margin-left: -" + t.display.gutters.offsetWidth + "px;"), e.noHScroll && (r += "width: " + t.display.wrapper.clientWidth + "px;"), N(t.display.measure, A("div", [e.node], null, r))
        }
        return e.height = e.node.parentNode.offsetHeight
    }

    function xr(e, t) {
        for (var r = Se(t); r != e.wrapper; r = r.parentNode)
            if (!r || 1 == r.nodeType && "true" == r.getAttribute("cm-ignore-events") || r.parentNode == e.sizer && r != e.mover) return !0
    }

    function Cr(e) {
        return e.lineSpace.offsetTop
    }

    function kr(e) {
        return e.mover.offsetHeight - e.lineSpace.offsetHeight
    }

    function Sr(e) {
        if (e.cachedPaddingH) return e.cachedPaddingH;
        var t = N(e.measure, A("pre", "x", "CodeMirror-line-like")),
            r = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle,
            n = {
                left: parseInt(r.paddingLeft),
                right: parseInt(r.paddingRight)
            };
        return isNaN(n.left) || isNaN(n.right) || (e.cachedPaddingH = n), n
    }

    function Lr(e) {
        return j - e.display.nativeBarWidth
    }

    function Tr(e) {
        return e.display.scroller.clientWidth - Lr(e) - e.display.barWidth
    }

    function Mr(e) {
        return e.display.scroller.clientHeight - Lr(e) - e.display.barHeight
    }

    function Nr(e, t, r) {
        if (e.line == t) return {
            map: e.measure.map,
            cache: e.measure.cache
        };
        for (var n = 0; n < e.rest.length; n++)
            if (e.rest[n] == t) return {
                map: e.measure.maps[n],
                cache: e.measure.caches[n]
            };
        for (var i = 0; i < e.rest.length; i++)
            if (qe(e.rest[i]) > r) return {
                map: e.measure.maps[i],
                cache: e.measure.caches[i],
                before: !0
            }
    }

    function Ar(e, t, r, n) {
        return Wr(e, Dr(e, t), r, n)
    }

    function Or(e, t) {
        if (t >= e.display.viewFrom && t < e.display.viewTo) return e.display.view[sn(e, t)];
        var r = e.display.externalMeasured;
        return r && t >= r.lineN && t < r.lineN + r.size ? r : void 0
    }

    function Dr(e, t) {
        var r = qe(t),
            n = Or(e, r);
        n && !n.text ? n = null : n && n.changes && (ur(e, n, r, rn(e)), e.curOp.forceUpdate = !0), n || (n = function (e, t) {
            var r = qe(t = zt(t)),
                n = e.display.externalMeasured = new nr(e.doc, t, r);
            n.lineN = r;
            var i = n.built = Zt(e, n);
            return n.text = i.pre, N(e.display.lineMeasure, i.pre), n
        }(e, t));
        var i = Nr(n, t, r);
        return {
            line: t,
            view: n,
            rect: null,
            map: i.map,
            cache: i.cache,
            before: i.before,
            hasHeights: !1
        }
    }

    function Wr(e, t, r, n, i) {
        t.before && (r = -1);
        var o, s = r + (n || "");
        return t.cache.hasOwnProperty(s) ? o = t.cache[s] : (t.rect || (t.rect = t.view.text.getBoundingClientRect()), t.hasHeights || (! function (e, t, r) {
            var n = e.options.lineWrapping,
                i = n && Tr(e);
            if (!t.measure.heights || n && t.measure.width != i) {
                var o = t.measure.heights = [];
                if (n) {
                    t.measure.width = i;
                    for (var l = t.text.firstChild.getClientRects(), a = 0; a < l.length - 1; a++) {
                        var s = l[a],
                            u = l[a + 1];
                        Math.abs(s.bottom - u.bottom) > 2 && o.push((s.bottom + u.top) / 2 - r.top)
                    }
                }
                o.push(r.bottom - r.top)
            }
        }(e, t.view, t.rect), t.hasHeights = !0), (o = function (e, t, r, n) {
            var i, o = Fr(t.map, r, n),
                s = o.node,
                u = o.start,
                c = o.end,
                f = o.collapse;
            if (3 == s.nodeType) {
                for (var h = 0; h < 4; h++) {
                    for (; u && ie(t.line.text.charAt(o.coverStart + u));) --u;
                    for (; o.coverStart + c < o.coverEnd && ie(t.line.text.charAt(o.coverStart + c));) ++c;
                    if ((i = l && a < 9 && 0 == u && c == o.coverEnd - o.coverStart ? s.parentNode.getBoundingClientRect() : Pr(L(s, u, c).getClientRects(), n)).left || i.right || 0 == u) break;
                    c = u, u -= 1, f = "right"
                }
                l && a < 11 && (i = function (e, t) {
                    if (!window.screen || null == screen.logicalXDPI || screen.logicalXDPI == screen.deviceXDPI || ! function (e) {
                            if (null != Fe) return Fe;
                            var t = N(e, A("span", "x")),
                                r = t.getBoundingClientRect(),
                                n = L(t, 0, 1).getBoundingClientRect();
                            return Fe = Math.abs(r.left - n.left) > 1
                        }(e)) return t;
                    var r = screen.logicalXDPI / screen.deviceXDPI,
                        n = screen.logicalYDPI / screen.deviceYDPI;
                    return {
                        left: t.left * r,
                        right: t.right * r,
                        top: t.top * n,
                        bottom: t.bottom * n
                    }
                }(e.display.measure, i))
            } else {
                var d;
                u > 0 && (f = n = "right"), i = e.options.lineWrapping && (d = s.getClientRects()).length > 1 ? d["right" == n ? d.length - 1 : 0] : s.getBoundingClientRect()
            }
            if (l && a < 9 && !u && (!i || !i.left && !i.right)) {
                var p = s.parentNode.getClientRects()[0];
                i = p ? {
                    left: p.left,
                    right: p.left + tn(e.display),
                    top: p.top,
                    bottom: p.bottom
                } : Er
            }
            for (var g = i.top - t.rect.top, v = i.bottom - t.rect.top, m = (g + v) / 2, y = t.view.measure.heights, b = 0; b < y.length - 1 && !(m < y[b]); b++);
            var w = b ? y[b - 1] : 0,
                x = y[b],
                C = {
                    left: ("right" == f ? i.right : i.left) - t.rect.left,
                    right: ("left" == f ? i.left : i.right) - t.rect.left,
                    top: w,
                    bottom: x
                };
            i.left || i.right || (C.bogus = !0);
            e.options.singleCursorHeightPerLine || (C.rtop = g, C.rbottom = v);
            return C
        }(e, t, r, n)).bogus || (t.cache[s] = o)), {
            left: o.left,
            right: o.right,
            top: i ? o.rtop : o.top,
            bottom: i ? o.rbottom : o.bottom
        }
    }
    var Hr, Er = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };

    function Fr(e, t, r) {
        for (var n, i, o, l, a, s, u = 0; u < e.length; u += 3)
            if (a = e[u], s = e[u + 1], t < a ? (i = 0, o = 1, l = "left") : t < s ? o = (i = t - a) + 1 : (u == e.length - 3 || t == s && e[u + 3] > t) && (i = (o = s - a) - 1, t >= s && (l = "right")), null != i) {
                if (n = e[u + 2], a == s && r == (n.insertLeft ? "left" : "right") && (l = r), "left" == r && 0 == i)
                    for (; u && e[u - 2] == e[u - 3] && e[u - 1].insertLeft;) n = e[2 + (u -= 3)], l = "left";
                if ("right" == r && i == s - a)
                    for (; u < e.length - 3 && e[u + 3] == e[u + 4] && !e[u + 5].insertLeft;) n = e[(u += 3) + 2], l = "right";
                break
            } return {
            node: n,
            start: i,
            end: o,
            collapse: l,
            coverStart: a,
            coverEnd: s
        }
    }

    function Pr(e, t) {
        var r = Er;
        if ("left" == t)
            for (var n = 0; n < e.length && (r = e[n]).left == r.right; n++);
        else
            for (var i = e.length - 1; i >= 0 && (r = e[i]).left == r.right; i--);
        return r
    }

    function Ir(e) {
        if (e.measure && (e.measure.cache = {}, e.measure.heights = null, e.rest))
            for (var t = 0; t < e.rest.length; t++) e.measure.caches[t] = {}
    }

    function zr(e) {
        e.display.externalMeasure = null, M(e.display.lineMeasure);
        for (var t = 0; t < e.display.view.length; t++) Ir(e.display.view[t])
    }

    function Rr(e) {
        zr(e), e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null, e.options.lineWrapping || (e.display.maxLineChanged = !0), e.display.lineNumChars = null
    }

    function Br() {
        return c && v ? -(document.body.getBoundingClientRect().left - parseInt(getComputedStyle(document.body).marginLeft)) : window.pageXOffset || (document.documentElement || document.body).scrollLeft
    }

    function jr() {
        return c && v ? -(document.body.getBoundingClientRect().top - parseInt(getComputedStyle(document.body).marginTop)) : window.pageYOffset || (document.documentElement || document.body).scrollTop
    }

    function Vr(e) {
        var t = 0;
        if (e.widgets)
            for (var r = 0; r < e.widgets.length; ++r) e.widgets[r].above && (t += wr(e.widgets[r]));
        return t
    }

    function Gr(e, t, r, n, i) {
        if (!i) {
            var o = Vr(t);
            r.top += o, r.bottom += o
        }
        if ("line" == n) return r;
        n || (n = "local");
        var l = Gt(t);
        if ("local" == n ? l += Cr(e.display) : l -= e.display.viewOffset, "page" == n || "window" == n) {
            var a = e.display.lineSpace.getBoundingClientRect();
            l += a.top + ("window" == n ? 0 : jr());
            var s = a.left + ("window" == n ? 0 : Br());
            r.left += s, r.right += s
        }
        return r.top += l, r.bottom += l, r
    }

    function Ur(e, t, r) {
        if ("div" == r) return t;
        var n = t.left,
            i = t.top;
        if ("page" == r) n -= Br(), i -= jr();
        else if ("local" == r || !r) {
            var o = e.display.sizer.getBoundingClientRect();
            n += o.left, i += o.top
        }
        var l = e.display.lineSpace.getBoundingClientRect();
        return {
            left: n - l.left,
            top: i - l.top
        }
    }

    function Kr(e, t, r, n, i) {
        return n || (n = Xe(e.doc, t.line)), Gr(e, n, Ar(e, n, t.ch, i), r)
    }

    function Xr(e, t, r, n, i, o) {
        function l(t, l) {
            var a = Wr(e, i, t, l ? "right" : "left", o);
            return l ? a.left = a.right : a.right = a.left, Gr(e, n, a, r)
        }
        n = n || Xe(e.doc, t.line), i || (i = Dr(e, n));
        var a = ce(n, e.doc.direction),
            s = t.ch,
            u = t.sticky;
        if (s >= n.text.length ? (s = n.text.length, u = "before") : s <= 0 && (s = 0, u = "after"), !a) return l("before" == u ? s - 1 : s, "before" == u);

        function c(e, t, r) {
            var n = 1 == a[t].level;
            return l(r ? e - 1 : e, n != r)
        }
        var f = se(a, s, u),
            h = ae,
            d = c(s, f, "before" == u);
        return null != h && (d.other = c(s, h, "before" != u)), d
    }

    function $r(e, t) {
        var r = 0;
        t = at(e.doc, t), e.options.lineWrapping || (r = tn(e.display) * t.ch);
        var n = Xe(e.doc, t.line),
            i = Gt(n) + Cr(e.display);
        return {
            left: r,
            right: r,
            top: i,
            bottom: i + n.height
        }
    }

    function _r(e, t, r, n, i) {
        var o = et(e, t, r);
        return o.xRel = i, n && (o.outside = n), o
    }

    function Yr(e, t, r) {
        var n = e.doc;
        if ((r += e.display.viewOffset) < 0) return _r(n.first, 0, null, -1, -1);
        var i = Ze(n, r),
            o = n.first + n.size - 1;
        if (i > o) return _r(n.first + n.size - 1, Xe(n, o).text.length, null, 1, 1);
        t < 0 && (t = 0);
        for (var l = Xe(n, i);;) {
            var a = Jr(e, l, i, t, r),
                s = Pt(l, a.ch + (a.xRel > 0 || a.outside > 0 ? 1 : 0));
            if (!s) return a;
            var u = s.find(1);
            if (u.line == i) return u;
            l = Xe(n, i = u.line)
        }
    }

    function qr(e, t, r, n) {
        n -= Vr(t);
        var i = t.text.length,
            o = le(function (t) {
                return Wr(e, r, t - 1).bottom <= n
            }, i, 0);
        return {
            begin: o,
            end: i = le(function (t) {
                return Wr(e, r, t).top > n
            }, o, i)
        }
    }

    function Zr(e, t, r, n) {
        return r || (r = Dr(e, t)), qr(e, t, r, Gr(e, t, Wr(e, r, n), "line").top)
    }

    function Qr(e, t, r, n) {
        return !(e.bottom <= r) && (e.top > r || (n ? e.left : e.right) > t)
    }

    function Jr(e, t, r, n, i) {
        i -= Gt(t);
        var o = Dr(e, t),
            l = Vr(t),
            a = 0,
            s = t.text.length,
            u = !0,
            c = ce(t, e.doc.direction);
        if (c) {
            var f = (e.options.lineWrapping ? function (e, t, r, n, i, o, l) {
                var a = qr(e, t, n, l),
                    s = a.begin,
                    u = a.end;
                /\s/.test(t.text.charAt(u - 1)) && u--;
                for (var c = null, f = null, h = 0; h < i.length; h++) {
                    var d = i[h];
                    if (!(d.from >= u || d.to <= s)) {
                        var p = 1 != d.level,
                            g = Wr(e, n, p ? Math.min(u, d.to) - 1 : Math.max(s, d.from)).right,
                            v = g < o ? o - g + 1e9 : g - o;
                        (!c || f > v) && (c = d, f = v)
                    }
                }
                c || (c = i[i.length - 1]);
                c.from < s && (c = {
                    from: s,
                    to: c.to,
                    level: c.level
                });
                c.to > u && (c = {
                    from: c.from,
                    to: u,
                    level: c.level
                });
                return c
            } : function (e, t, r, n, i, o, l) {
                var a = le(function (a) {
                        var s = i[a],
                            u = 1 != s.level;
                        return Qr(Xr(e, et(r, u ? s.to : s.from, u ? "before" : "after"), "line", t, n), o, l, !0)
                    }, 0, i.length - 1),
                    s = i[a];
                if (a > 0) {
                    var u = 1 != s.level,
                        c = Xr(e, et(r, u ? s.from : s.to, u ? "after" : "before"), "line", t, n);
                    Qr(c, o, l, !0) && c.top > l && (s = i[a - 1])
                }
                return s
            })(e, t, r, o, c, n, i);
            a = (u = 1 != f.level) ? f.from : f.to - 1, s = u ? f.to : f.from - 1
        }
        var h, d, p = null,
            g = null,
            v = le(function (t) {
                var r = Wr(e, o, t);
                return r.top += l, r.bottom += l, !!Qr(r, n, i, !1) && (r.top <= i && r.left <= n && (p = t, g = r), !0)
            }, a, s),
            m = !1;
        if (g) {
            var y = n - g.left < g.right - n,
                b = y == u;
            v = p + (b ? 0 : 1), d = b ? "after" : "before", h = y ? g.left : g.right
        } else {
            u || v != s && v != a || v++, d = 0 == v ? "after" : v == t.text.length ? "before" : Wr(e, o, v - (u ? 1 : 0)).bottom + l <= i == u ? "after" : "before";
            var w = Xr(e, et(r, v, d), "line", t, o);
            h = w.left, m = i < w.top ? -1 : i >= w.bottom ? 1 : 0
        }
        return _r(r, v = oe(t.text, v, 1), d, m, n - h)
    }

    function en(e) {
        if (null != e.cachedTextHeight) return e.cachedTextHeight;
        if (null == Hr) {
            Hr = A("pre", null, "CodeMirror-line-like");
            for (var t = 0; t < 49; ++t) Hr.appendChild(document.createTextNode("x")), Hr.appendChild(A("br"));
            Hr.appendChild(document.createTextNode("x"))
        }
        N(e.measure, Hr);
        var r = Hr.offsetHeight / 50;
        return r > 3 && (e.cachedTextHeight = r), M(e.measure), r || 1
    }

    function tn(e) {
        if (null != e.cachedCharWidth) return e.cachedCharWidth;
        var t = A("span", "xxxxxxxxxx"),
            r = A("pre", [t], "CodeMirror-line-like");
        N(e.measure, r);
        var n = t.getBoundingClientRect(),
            i = (n.right - n.left) / 10;
        return i > 2 && (e.cachedCharWidth = i), i || 10
    }

    function rn(e) {
        for (var t = e.display, r = {}, n = {}, i = t.gutters.clientLeft, o = t.gutters.firstChild, l = 0; o; o = o.nextSibling, ++l) {
            var a = e.display.gutterSpecs[l].className;
            r[a] = o.offsetLeft + o.clientLeft + i, n[a] = o.clientWidth
        }
        return {
            fixedPos: nn(t),
            gutterTotalWidth: t.gutters.offsetWidth,
            gutterLeft: r,
            gutterWidth: n,
            wrapperWidth: t.wrapper.clientWidth
        }
    }

    function nn(e) {
        return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left
    }

    function on(e) {
        var t = en(e.display),
            r = e.options.lineWrapping,
            n = r && Math.max(5, e.display.scroller.clientWidth / tn(e.display) - 3);
        return function (i) {
            if (jt(e.doc, i)) return 0;
            var o = 0;
            if (i.widgets)
                for (var l = 0; l < i.widgets.length; l++) i.widgets[l].height && (o += i.widgets[l].height);
            return r ? o + (Math.ceil(i.text.length / n) || 1) * t : o + t
        }
    }

    function ln(e) {
        var t = e.doc,
            r = on(e);
        t.iter(function (e) {
            var t = r(e);
            t != e.height && Ye(e, t)
        })
    }

    function an(e, t, r, n) {
        var i = e.display;
        if (!r && "true" == Se(t).getAttribute("cm-not-content")) return null;
        var o, l, a = i.lineSpace.getBoundingClientRect();
        try {
            o = t.clientX - a.left, l = t.clientY - a.top
        } catch (e) {
            return null
        }
        var s, u = Yr(e, o, l);
        if (n && u.xRel > 0 && (s = Xe(e.doc, u.line).text).length == u.ch) {
            var c = z(s, s.length, e.options.tabSize) - s.length;
            u = et(u.line, Math.max(0, Math.round((o - Sr(e.display).left) / tn(e.display)) - c))
        }
        return u
    }

    function sn(e, t) {
        if (t >= e.display.viewTo) return null;
        if ((t -= e.display.viewFrom) < 0) return null;
        for (var r = e.display.view, n = 0; n < r.length; n++)
            if ((t -= r[n].size) < 0) return n
    }

    function un(e, t, r, n) {
        null == t && (t = e.doc.first), null == r && (r = e.doc.first + e.doc.size), n || (n = 0);
        var i = e.display;
        if (n && r < i.viewTo && (null == i.updateLineNumbers || i.updateLineNumbers > t) && (i.updateLineNumbers = t), e.curOp.viewChanged = !0, t >= i.viewTo) Ct && Rt(e.doc, t) < i.viewTo && fn(e);
        else if (r <= i.viewFrom) Ct && Bt(e.doc, r + n) > i.viewFrom ? fn(e) : (i.viewFrom += n, i.viewTo += n);
        else if (t <= i.viewFrom && r >= i.viewTo) fn(e);
        else if (t <= i.viewFrom) {
            var o = hn(e, r, r + n, 1);
            o ? (i.view = i.view.slice(o.index), i.viewFrom = o.lineN, i.viewTo += n) : fn(e)
        } else if (r >= i.viewTo) {
            var l = hn(e, t, t, -1);
            l ? (i.view = i.view.slice(0, l.index), i.viewTo = l.lineN) : fn(e)
        } else {
            var a = hn(e, t, t, -1),
                s = hn(e, r, r + n, 1);
            a && s ? (i.view = i.view.slice(0, a.index).concat(ir(e, a.lineN, s.lineN)).concat(i.view.slice(s.index)), i.viewTo += n) : fn(e)
        }
        var u = i.externalMeasured;
        u && (r < u.lineN ? u.lineN += n : t < u.lineN + u.size && (i.externalMeasured = null))
    }

    function cn(e, t, r) {
        e.curOp.viewChanged = !0;
        var n = e.display,
            i = e.display.externalMeasured;
        if (i && t >= i.lineN && t < i.lineN + i.size && (n.externalMeasured = null), !(t < n.viewFrom || t >= n.viewTo)) {
            var o = n.view[sn(e, t)];
            if (null != o.node) {
                var l = o.changes || (o.changes = []); - 1 == B(l, r) && l.push(r)
            }
        }
    }

    function fn(e) {
        e.display.viewFrom = e.display.viewTo = e.doc.first, e.display.view = [], e.display.viewOffset = 0
    }

    function hn(e, t, r, n) {
        var i, o = sn(e, t),
            l = e.display.view;
        if (!Ct || r == e.doc.first + e.doc.size) return {
            index: o,
            lineN: r
        };
        for (var a = e.display.viewFrom, s = 0; s < o; s++) a += l[s].size;
        if (a != t) {
            if (n > 0) {
                if (o == l.length - 1) return null;
                i = a + l[o].size - t, o++
            } else i = a - t;
            t += i, r += i
        }
        for (; Rt(e.doc, r) != r;) {
            if (o == (n < 0 ? 0 : l.length - 1)) return null;
            r += n * l[o - (n < 0 ? 1 : 0)].size, o += n
        }
        return {
            index: o,
            lineN: r
        }
    }

    function dn(e) {
        for (var t = e.display.view, r = 0, n = 0; n < t.length; n++) {
            var i = t[n];
            i.hidden || i.node && !i.changes || ++r
        }
        return r
    }

    function pn(e) {
        e.display.input.showSelection(e.display.input.prepareSelection())
    }

    function gn(e, t) {
        void 0 === t && (t = !0);
        for (var r = e.doc, n = {}, i = n.cursors = document.createDocumentFragment(), o = n.selection = document.createDocumentFragment(), l = 0; l < r.sel.ranges.length; l++)
            if (t || l != r.sel.primIndex) {
                var a = r.sel.ranges[l];
                if (!(a.from().line >= e.display.viewTo || a.to().line < e.display.viewFrom)) {
                    var s = a.empty();
                    (s || e.options.showCursorWhenSelecting) && vn(e, a.head, i), s || yn(e, a, o)
                }
            } return n
    }

    function vn(e, t, r) {
        var n = Xr(e, t, "div", null, null, !e.options.singleCursorHeightPerLine),
            i = r.appendChild(A("div", " ", "CodeMirror-cursor"));
        if (i.style.left = n.left + "px", i.style.top = n.top + "px", i.style.height = Math.max(0, n.bottom - n.top) * e.options.cursorHeight + "px", n.other) {
            var o = r.appendChild(A("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"));
            o.style.display = "", o.style.left = n.other.left + "px", o.style.top = n.other.top + "px", o.style.height = .85 * (n.other.bottom - n.other.top) + "px"
        }
    }

    function mn(e, t) {
        return e.top - t.top || e.left - t.left
    }

    function yn(e, t, r) {
        var n = e.display,
            i = e.doc,
            o = document.createDocumentFragment(),
            l = Sr(e.display),
            a = l.left,
            s = Math.max(n.sizerWidth, Tr(e) - n.sizer.offsetLeft) - l.right,
            u = "ltr" == i.direction;

        function c(e, t, r, n) {
            t < 0 && (t = 0), t = Math.round(t), n = Math.round(n), o.appendChild(A("div", null, "CodeMirror-selected", "position: absolute; left: " + e + "px;\n                             top: " + t + "px; width: " + (null == r ? s - e : r) + "px;\n                             height: " + (n - t) + "px"))
        }

        function f(t, r, n) {
            var o, l, f = Xe(i, t),
                h = f.text.length;

            function d(r, n) {
                return Kr(e, et(t, r), "div", f, n)
            }

            function p(t, r, n) {
                var i = Zr(e, f, null, t),
                    o = "ltr" == r == ("after" == n) ? "left" : "right";
                return d("after" == n ? i.begin : i.end - (/\s/.test(f.text.charAt(i.end - 1)) ? 2 : 1), o)[o]
            }
            var g = ce(f, i.direction);
            return function (e, t, r, n) {
                if (!e) return n(t, r, "ltr", 0);
                for (var i = !1, o = 0; o < e.length; ++o) {
                    var l = e[o];
                    (l.from < r && l.to > t || t == r && l.to == t) && (n(Math.max(l.from, t), Math.min(l.to, r), 1 == l.level ? "rtl" : "ltr", o), i = !0)
                }
                i || n(t, r, "ltr")
            }(g, r || 0, null == n ? h : n, function (e, t, i, f) {
                var v = "ltr" == i,
                    m = d(e, v ? "left" : "right"),
                    y = d(t - 1, v ? "right" : "left"),
                    b = null == r && 0 == e,
                    w = null == n && t == h,
                    x = 0 == f,
                    C = !g || f == g.length - 1;
                if (y.top - m.top <= 3) {
                    var k = (u ? w : b) && C,
                        S = (u ? b : w) && x ? a : (v ? m : y).left,
                        L = k ? s : (v ? y : m).right;
                    c(S, m.top, L - S, m.bottom)
                } else {
                    var T, M, N, A;
                    v ? (T = u && b && x ? a : m.left, M = u ? s : p(e, i, "before"), N = u ? a : p(t, i, "after"), A = u && w && C ? s : y.right) : (T = u ? p(e, i, "before") : a, M = !u && b && x ? s : m.right, N = !u && w && C ? a : y.left, A = u ? p(t, i, "after") : s), c(T, m.top, M - T, m.bottom), m.bottom < y.top && c(a, m.bottom, null, y.top), c(N, y.top, A - N, y.bottom)
                }(!o || mn(m, o) < 0) && (o = m), mn(y, o) < 0 && (o = y), (!l || mn(m, l) < 0) && (l = m), mn(y, l) < 0 && (l = y)
            }), {
                start: o,
                end: l
            }
        }
        var h = t.from(),
            d = t.to();
        if (h.line == d.line) f(h.line, h.ch, d.ch);
        else {
            var p = Xe(i, h.line),
                g = Xe(i, d.line),
                v = zt(p) == zt(g),
                m = f(h.line, h.ch, v ? p.text.length + 1 : null).end,
                y = f(d.line, v ? 0 : null, d.ch).start;
            v && (m.top < y.top - 2 ? (c(m.right, m.top, null, m.bottom), c(a, y.top, y.left, y.bottom)) : c(m.right, m.top, y.left - m.right, m.bottom)), m.bottom < y.top && c(a, m.bottom, null, y.top)
        }
        r.appendChild(o)
    }

    function bn(e) {
        if (e.state.focused) {
            var t = e.display;
            clearInterval(t.blinker);
            var r = !0;
            t.cursorDiv.style.visibility = "", e.options.cursorBlinkRate > 0 ? t.blinker = setInterval(function () {
                return t.cursorDiv.style.visibility = (r = !r) ? "" : "hidden"
            }, e.options.cursorBlinkRate) : e.options.cursorBlinkRate < 0 && (t.cursorDiv.style.visibility = "hidden")
        }
    }

    function wn(e) {
        e.state.focused || (e.display.input.focus(), Cn(e))
    }

    function xn(e) {
        e.state.delayingBlurEvent = !0, setTimeout(function () {
            e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1, kn(e))
        }, 100)
    }

    function Cn(e, t) {
        e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1), "nocursor" != e.options.readOnly && (e.state.focused || (ge(e, "focus", e, t), e.state.focused = !0, H(e.display.wrapper, "CodeMirror-focused"), e.curOp || e.display.selForContextMenu == e.doc.sel || (e.display.input.reset(), s && setTimeout(function () {
            return e.display.input.reset(!0)
        }, 20)), e.display.input.receivedFocus()), bn(e))
    }

    function kn(e, t) {
        e.state.delayingBlurEvent || (e.state.focused && (ge(e, "blur", e, t), e.state.focused = !1, T(e.display.wrapper, "CodeMirror-focused")), clearInterval(e.display.blinker), setTimeout(function () {
            e.state.focused || (e.display.shift = !1)
        }, 150))
    }

    function Sn(e) {
        for (var t = e.display, r = t.lineDiv.offsetTop, n = 0; n < t.view.length; n++) {
            var i = t.view[n],
                o = e.options.lineWrapping,
                s = void 0,
                u = 0;
            if (!i.hidden) {
                if (l && a < 8) {
                    var c = i.node.offsetTop + i.node.offsetHeight;
                    s = c - r, r = c
                } else {
                    var f = i.node.getBoundingClientRect();
                    s = f.bottom - f.top, !o && i.text.firstChild && (u = i.text.firstChild.getBoundingClientRect().right - f.left - 1)
                }
                var h = i.line.height - s;
                if ((h > .005 || h < -.005) && (Ye(i.line, s), Ln(i.line), i.rest))
                    for (var d = 0; d < i.rest.length; d++) Ln(i.rest[d]);
                if (u > e.display.sizerWidth) {
                    var p = Math.ceil(u / tn(e.display));
                    p > e.display.maxLineLength && (e.display.maxLineLength = p, e.display.maxLine = i.line, e.display.maxLineChanged = !0)
                }
            }
        }
    }

    function Ln(e) {
        if (e.widgets)
            for (var t = 0; t < e.widgets.length; ++t) {
                var r = e.widgets[t],
                    n = r.node.parentNode;
                n && (r.height = n.offsetHeight)
            }
    }

    function Tn(e, t, r) {
        var n = r && null != r.top ? Math.max(0, r.top) : e.scroller.scrollTop;
        n = Math.floor(n - Cr(e));
        var i = r && null != r.bottom ? r.bottom : n + e.wrapper.clientHeight,
            o = Ze(t, n),
            l = Ze(t, i);
        if (r && r.ensure) {
            var a = r.ensure.from.line,
                s = r.ensure.to.line;
            a < o ? (o = a, l = Ze(t, Gt(Xe(t, a)) + e.wrapper.clientHeight)) : Math.min(s, t.lastLine()) >= l && (o = Ze(t, Gt(Xe(t, s)) - e.wrapper.clientHeight), l = s)
        }
        return {
            from: o,
            to: Math.max(l, o + 1)
        }
    }

    function Mn(e, t) {
        var r = e.display,
            n = en(e.display);
        t.top < 0 && (t.top = 0);
        var i = e.curOp && null != e.curOp.scrollTop ? e.curOp.scrollTop : r.scroller.scrollTop,
            o = Mr(e),
            l = {};
        t.bottom - t.top > o && (t.bottom = t.top + o);
        var a = e.doc.height + kr(r),
            s = t.top < n,
            u = t.bottom > a - n;
        if (t.top < i) l.scrollTop = s ? 0 : t.top;
        else if (t.bottom > i + o) {
            var c = Math.min(t.top, (u ? a : t.bottom) - o);
            c != i && (l.scrollTop = c)
        }
        var f = e.curOp && null != e.curOp.scrollLeft ? e.curOp.scrollLeft : r.scroller.scrollLeft,
            h = Tr(e) - (e.options.fixedGutter ? r.gutters.offsetWidth : 0),
            d = t.right - t.left > h;
        return d && (t.right = t.left + h), t.left < 10 ? l.scrollLeft = 0 : t.left < f ? l.scrollLeft = Math.max(0, t.left - (d ? 0 : 10)) : t.right > h + f - 3 && (l.scrollLeft = t.right + (d ? 0 : 10) - h), l
    }

    function Nn(e, t) {
        null != t && (Dn(e), e.curOp.scrollTop = (null == e.curOp.scrollTop ? e.doc.scrollTop : e.curOp.scrollTop) + t)
    }

    function An(e) {
        Dn(e);
        var t = e.getCursor();
        e.curOp.scrollToPos = {
            from: t,
            to: t,
            margin: e.options.cursorScrollMargin
        }
    }

    function On(e, t, r) {
        null == t && null == r || Dn(e), null != t && (e.curOp.scrollLeft = t), null != r && (e.curOp.scrollTop = r)
    }

    function Dn(e) {
        var t = e.curOp.scrollToPos;
        t && (e.curOp.scrollToPos = null, Wn(e, $r(e, t.from), $r(e, t.to), t.margin))
    }

    function Wn(e, t, r, n) {
        var i = Mn(e, {
            left: Math.min(t.left, r.left),
            top: Math.min(t.top, r.top) - n,
            right: Math.max(t.right, r.right),
            bottom: Math.max(t.bottom, r.bottom) + n
        });
        On(e, i.scrollLeft, i.scrollTop)
    }

    function Hn(e, t) {
        Math.abs(e.doc.scrollTop - t) < 2 || (r || oi(e, {
            top: t
        }), En(e, t, !0), r && oi(e), ei(e, 100))
    }

    function En(e, t, r) {
        t = Math.max(0, Math.min(e.display.scroller.scrollHeight - e.display.scroller.clientHeight, t)), (e.display.scroller.scrollTop != t || r) && (e.doc.scrollTop = t, e.display.scrollbars.setScrollTop(t), e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t))
    }

    function Fn(e, t, r, n) {
        t = Math.max(0, Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth)), (r ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) && !n || (e.doc.scrollLeft = t, si(e), e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t), e.display.scrollbars.setScrollLeft(t))
    }

    function Pn(e) {
        var t = e.display,
            r = t.gutters.offsetWidth,
            n = Math.round(e.doc.height + kr(e.display));
        return {
            clientHeight: t.scroller.clientHeight,
            viewHeight: t.wrapper.clientHeight,
            scrollWidth: t.scroller.scrollWidth,
            clientWidth: t.scroller.clientWidth,
            viewWidth: t.wrapper.clientWidth,
            barLeft: e.options.fixedGutter ? r : 0,
            docHeight: n,
            scrollHeight: n + Lr(e) + t.barHeight,
            nativeBarWidth: t.nativeBarWidth,
            gutterWidth: r
        }
    }
    var In = function (e, t, r) {
        this.cm = r;
        var n = this.vert = A("div", [A("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"),
            i = this.horiz = A("div", [A("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
        n.tabIndex = i.tabIndex = -1, e(n), e(i), he(n, "scroll", function () {
            n.clientHeight && t(n.scrollTop, "vertical")
        }), he(i, "scroll", function () {
            i.clientWidth && t(i.scrollLeft, "horizontal")
        }), this.checkedZeroWidth = !1, l && a < 8 && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px")
    };
    In.prototype.update = function (e) {
        var t = e.scrollWidth > e.clientWidth + 1,
            r = e.scrollHeight > e.clientHeight + 1,
            n = e.nativeBarWidth;
        if (r) {
            this.vert.style.display = "block", this.vert.style.bottom = t ? n + "px" : "0";
            var i = e.viewHeight - (t ? n : 0);
            this.vert.firstChild.style.height = Math.max(0, e.scrollHeight - e.clientHeight + i) + "px"
        } else this.vert.style.display = "", this.vert.firstChild.style.height = "0";
        if (t) {
            this.horiz.style.display = "block", this.horiz.style.right = r ? n + "px" : "0", this.horiz.style.left = e.barLeft + "px";
            var o = e.viewWidth - e.barLeft - (r ? n : 0);
            this.horiz.firstChild.style.width = Math.max(0, e.scrollWidth - e.clientWidth + o) + "px"
        } else this.horiz.style.display = "", this.horiz.firstChild.style.width = "0";
        return !this.checkedZeroWidth && e.clientHeight > 0 && (0 == n && this.zeroWidthHack(), this.checkedZeroWidth = !0), {
            right: r ? n : 0,
            bottom: t ? n : 0
        }
    }, In.prototype.setScrollLeft = function (e) {
        this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e), this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz")
    }, In.prototype.setScrollTop = function (e) {
        this.vert.scrollTop != e && (this.vert.scrollTop = e), this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert, "vert")
    }, In.prototype.zeroWidthHack = function () {
        var e = y && !d ? "12px" : "18px";
        this.horiz.style.height = this.vert.style.width = e, this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none", this.disableHoriz = new R, this.disableVert = new R
    }, In.prototype.enableZeroWidthBar = function (e, t, r) {
        e.style.pointerEvents = "auto", t.set(1e3, function n() {
            var i = e.getBoundingClientRect();
            ("vert" == r ? document.elementFromPoint(i.right - 1, (i.top + i.bottom) / 2) : document.elementFromPoint((i.right + i.left) / 2, i.bottom - 1)) != e ? e.style.pointerEvents = "none" : t.set(1e3, n)
        })
    }, In.prototype.clear = function () {
        var e = this.horiz.parentNode;
        e.removeChild(this.horiz), e.removeChild(this.vert)
    };
    var zn = function () {};

    function Rn(e, t) {
        t || (t = Pn(e));
        var r = e.display.barWidth,
            n = e.display.barHeight;
        Bn(e, t);
        for (var i = 0; i < 4 && r != e.display.barWidth || n != e.display.barHeight; i++) r != e.display.barWidth && e.options.lineWrapping && Sn(e), Bn(e, Pn(e)), r = e.display.barWidth, n = e.display.barHeight
    }

    function Bn(e, t) {
        var r = e.display,
            n = r.scrollbars.update(t);
        r.sizer.style.paddingRight = (r.barWidth = n.right) + "px", r.sizer.style.paddingBottom = (r.barHeight = n.bottom) + "px", r.heightForcer.style.borderBottom = n.bottom + "px solid transparent", n.right && n.bottom ? (r.scrollbarFiller.style.display = "block", r.scrollbarFiller.style.height = n.bottom + "px", r.scrollbarFiller.style.width = n.right + "px") : r.scrollbarFiller.style.display = "", n.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter ? (r.gutterFiller.style.display = "block", r.gutterFiller.style.height = n.bottom + "px", r.gutterFiller.style.width = t.gutterWidth + "px") : r.gutterFiller.style.display = ""
    }
    zn.prototype.update = function () {
        return {
            bottom: 0,
            right: 0
        }
    }, zn.prototype.setScrollLeft = function () {}, zn.prototype.setScrollTop = function () {}, zn.prototype.clear = function () {};
    var jn = {
        native: In,
        null: zn
    };

    function Vn(e) {
        e.display.scrollbars && (e.display.scrollbars.clear(), e.display.scrollbars.addClass && T(e.display.wrapper, e.display.scrollbars.addClass)), e.display.scrollbars = new jn[e.options.scrollbarStyle](function (t) {
            e.display.wrapper.insertBefore(t, e.display.scrollbarFiller), he(t, "mousedown", function () {
                e.state.focused && setTimeout(function () {
                    return e.display.input.focus()
                }, 0)
            }), t.setAttribute("cm-not-content", "true")
        }, function (t, r) {
            "horizontal" == r ? Fn(e, t) : Hn(e, t)
        }, e), e.display.scrollbars.addClass && H(e.display.wrapper, e.display.scrollbars.addClass)
    }
    var Gn = 0;

    function Un(e) {
        var t;
        e.curOp = {
            cm: e,
            viewChanged: !1,
            startHeight: e.doc.height,
            forceUpdate: !1,
            updateInput: 0,
            typing: !1,
            changeObjs: null,
            cursorActivityHandlers: null,
            cursorActivityCalled: 0,
            selectionChanged: !1,
            updateMaxLine: !1,
            scrollLeft: null,
            scrollTop: null,
            scrollToPos: null,
            focus: !1,
            id: ++Gn
        }, t = e.curOp, or ? or.ops.push(t) : t.ownsGroup = or = {
            ops: [t],
            delayedCallbacks: []
        }
    }

    function Kn(e) {
        var t = e.curOp;
        t && function (e, t) {
            var r = e.ownsGroup;
            if (r) try {
                ! function (e) {
                    var t = e.delayedCallbacks,
                        r = 0;
                    do {
                        for (; r < t.length; r++) t[r].call(null);
                        for (var n = 0; n < e.ops.length; n++) {
                            var i = e.ops[n];
                            if (i.cursorActivityHandlers)
                                for (; i.cursorActivityCalled < i.cursorActivityHandlers.length;) i.cursorActivityHandlers[i.cursorActivityCalled++].call(null, i.cm)
                        }
                    } while (r < t.length)
                }(r)
            } finally {
                or = null, t(r)
            }
        }(t, function (e) {
            for (var t = 0; t < e.ops.length; t++) e.ops[t].cm.curOp = null;
            ! function (e) {
                for (var t = e.ops, r = 0; r < t.length; r++) Xn(t[r]);
                for (var n = 0; n < t.length; n++)(i = t[n]).updatedDisplay = i.mustUpdate && ni(i.cm, i.update);
                var i;
                for (var o = 0; o < t.length; o++) $n(t[o]);
                for (var l = 0; l < t.length; l++) _n(t[l]);
                for (var a = 0; a < t.length; a++) Yn(t[a])
            }(e)
        })
    }

    function Xn(e) {
        var t = e.cm,
            r = t.display;
        ! function (e) {
            var t = e.display;
            !t.scrollbarsClipped && t.scroller.offsetWidth && (t.nativeBarWidth = t.scroller.offsetWidth - t.scroller.clientWidth, t.heightForcer.style.height = Lr(e) + "px", t.sizer.style.marginBottom = -t.nativeBarWidth + "px", t.sizer.style.borderRightWidth = Lr(e) + "px", t.scrollbarsClipped = !0)
        }(t), e.updateMaxLine && Kt(t), e.mustUpdate = e.viewChanged || e.forceUpdate || null != e.scrollTop || e.scrollToPos && (e.scrollToPos.from.line < r.viewFrom || e.scrollToPos.to.line >= r.viewTo) || r.maxLineChanged && t.options.lineWrapping, e.update = e.mustUpdate && new ri(t, e.mustUpdate && {
            top: e.scrollTop,
            ensure: e.scrollToPos
        }, e.forceUpdate)
    }

    function $n(e) {
        var t = e.cm,
            r = t.display;
        e.updatedDisplay && Sn(t), e.barMeasure = Pn(t), r.maxLineChanged && !t.options.lineWrapping && (e.adjustWidthTo = Ar(t, r.maxLine, r.maxLine.text.length).left + 3, t.display.sizerWidth = e.adjustWidthTo, e.barMeasure.scrollWidth = Math.max(r.scroller.clientWidth, r.sizer.offsetLeft + e.adjustWidthTo + Lr(t) + t.display.barWidth), e.maxScrollLeft = Math.max(0, r.sizer.offsetLeft + e.adjustWidthTo - Tr(t))), (e.updatedDisplay || e.selectionChanged) && (e.preparedSelection = r.input.prepareSelection())
    }

    function _n(e) {
        var t = e.cm;
        null != e.adjustWidthTo && (t.display.sizer.style.minWidth = e.adjustWidthTo + "px", e.maxScrollLeft < t.doc.scrollLeft && Fn(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0), t.display.maxLineChanged = !1);
        var r = e.focus && e.focus == W();
        e.preparedSelection && t.display.input.showSelection(e.preparedSelection, r), (e.updatedDisplay || e.startHeight != t.doc.height) && Rn(t, e.barMeasure), e.updatedDisplay && ai(t, e.barMeasure), e.selectionChanged && bn(t), t.state.focused && e.updateInput && t.display.input.reset(e.typing), r && wn(e.cm)
    }

    function Yn(e) {
        var t = e.cm,
            r = t.display,
            n = t.doc;
        (e.updatedDisplay && ii(t, e.update), null == r.wheelStartX || null == e.scrollTop && null == e.scrollLeft && !e.scrollToPos || (r.wheelStartX = r.wheelStartY = null), null != e.scrollTop && En(t, e.scrollTop, e.forceScroll), null != e.scrollLeft && Fn(t, e.scrollLeft, !0, !0), e.scrollToPos) && function (e, t) {
            if (!ve(e, "scrollCursorIntoView")) {
                var r = e.display,
                    n = r.sizer.getBoundingClientRect(),
                    i = null;
                if (t.top + n.top < 0 ? i = !0 : t.bottom + n.top > (window.innerHeight || document.documentElement.clientHeight) && (i = !1), null != i && !p) {
                    var o = A("div", "​", null, "position: absolute;\n                         top: " + (t.top - r.viewOffset - Cr(e.display)) + "px;\n                         height: " + (t.bottom - t.top + Lr(e) + r.barHeight) + "px;\n                         left: " + t.left + "px; width: " + Math.max(2, t.right - t.left) + "px;");
                    e.display.lineSpace.appendChild(o), o.scrollIntoView(i), e.display.lineSpace.removeChild(o)
                }
            }
        }(t, function (e, t, r, n) {
            var i;
            null == n && (n = 0), e.options.lineWrapping || t != r || (r = "before" == (t = t.ch ? et(t.line, "before" == t.sticky ? t.ch - 1 : t.ch, "after") : t).sticky ? et(t.line, t.ch + 1, "before") : t);
            for (var o = 0; o < 5; o++) {
                var l = !1,
                    a = Xr(e, t),
                    s = r && r != t ? Xr(e, r) : a,
                    u = Mn(e, i = {
                        left: Math.min(a.left, s.left),
                        top: Math.min(a.top, s.top) - n,
                        right: Math.max(a.left, s.left),
                        bottom: Math.max(a.bottom, s.bottom) + n
                    }),
                    c = e.doc.scrollTop,
                    f = e.doc.scrollLeft;
                if (null != u.scrollTop && (Hn(e, u.scrollTop), Math.abs(e.doc.scrollTop - c) > 1 && (l = !0)), null != u.scrollLeft && (Fn(e, u.scrollLeft), Math.abs(e.doc.scrollLeft - f) > 1 && (l = !0)), !l) break
            }
            return i
        }(t, at(n, e.scrollToPos.from), at(n, e.scrollToPos.to), e.scrollToPos.margin));
        var i = e.maybeHiddenMarkers,
            o = e.maybeUnhiddenMarkers;
        if (i)
            for (var l = 0; l < i.length; ++l) i[l].lines.length || ge(i[l], "hide");
        if (o)
            for (var a = 0; a < o.length; ++a) o[a].lines.length && ge(o[a], "unhide");
        r.wrapper.offsetHeight && (n.scrollTop = t.display.scroller.scrollTop), e.changeObjs && ge(t, "changes", t, e.changeObjs), e.update && e.update.finish()
    }

    function qn(e, t) {
        if (e.curOp) return t();
        Un(e);
        try {
            return t()
        } finally {
            Kn(e)
        }
    }

    function Zn(e, t) {
        return function () {
            if (e.curOp) return t.apply(e, arguments);
            Un(e);
            try {
                return t.apply(e, arguments)
            } finally {
                Kn(e)
            }
        }
    }

    function Qn(e) {
        return function () {
            if (this.curOp) return e.apply(this, arguments);
            Un(this);
            try {
                return e.apply(this, arguments)
            } finally {
                Kn(this)
            }
        }
    }

    function Jn(e) {
        return function () {
            var t = this.cm;
            if (!t || t.curOp) return e.apply(this, arguments);
            Un(t);
            try {
                return e.apply(this, arguments)
            } finally {
                Kn(t)
            }
        }
    }

    function ei(e, t) {
        e.doc.highlightFrontier < e.display.viewTo && e.state.highlight.set(t, P(ti, e))
    }

    function ti(e) {
        var t = e.doc;
        if (!(t.highlightFrontier >= e.display.viewTo)) {
            var r = +new Date + e.options.workTime,
                n = dt(e, t.highlightFrontier),
                i = [];
            t.iter(n.line, Math.min(t.first + t.size, e.display.viewTo + 500), function (o) {
                if (n.line >= e.display.viewFrom) {
                    var l = o.styles,
                        a = o.text.length > e.options.maxHighlightLength ? Ve(t.mode, n.state) : null,
                        s = ft(e, o, n, !0);
                    a && (n.state = a), o.styles = s.styles;
                    var u = o.styleClasses,
                        c = s.classes;
                    c ? o.styleClasses = c : u && (o.styleClasses = null);
                    for (var f = !l || l.length != o.styles.length || u != c && (!u || !c || u.bgClass != c.bgClass || u.textClass != c.textClass), h = 0; !f && h < l.length; ++h) f = l[h] != o.styles[h];
                    f && i.push(n.line), o.stateAfter = n.save(), n.nextLine()
                } else o.text.length <= e.options.maxHighlightLength && pt(e, o.text, n), o.stateAfter = n.line % 5 == 0 ? n.save() : null, n.nextLine();
                if (+new Date > r) return ei(e, e.options.workDelay), !0
            }), t.highlightFrontier = n.line, t.modeFrontier = Math.max(t.modeFrontier, n.line), i.length && qn(e, function () {
                for (var t = 0; t < i.length; t++) cn(e, i[t], "text")
            })
        }
    }
    var ri = function (e, t, r) {
        var n = e.display;
        this.viewport = t, this.visible = Tn(n, e.doc, t), this.editorIsHidden = !n.wrapper.offsetWidth, this.wrapperHeight = n.wrapper.clientHeight, this.wrapperWidth = n.wrapper.clientWidth, this.oldDisplayWidth = Tr(e), this.force = r, this.dims = rn(e), this.events = []
    };

    function ni(e, t) {
        var r = e.display,
            n = e.doc;
        if (t.editorIsHidden) return fn(e), !1;
        if (!t.force && t.visible.from >= r.viewFrom && t.visible.to <= r.viewTo && (null == r.updateLineNumbers || r.updateLineNumbers >= r.viewTo) && r.renderedView == r.view && 0 == dn(e)) return !1;
        ui(e) && (fn(e), t.dims = rn(e));
        var i = n.first + n.size,
            o = Math.max(t.visible.from - e.options.viewportMargin, n.first),
            l = Math.min(i, t.visible.to + e.options.viewportMargin);
        r.viewFrom < o && o - r.viewFrom < 20 && (o = Math.max(n.first, r.viewFrom)), r.viewTo > l && r.viewTo - l < 20 && (l = Math.min(i, r.viewTo)), Ct && (o = Rt(e.doc, o), l = Bt(e.doc, l));
        var a = o != r.viewFrom || l != r.viewTo || r.lastWrapHeight != t.wrapperHeight || r.lastWrapWidth != t.wrapperWidth;
        ! function (e, t, r) {
            var n = e.display;
            0 == n.view.length || t >= n.viewTo || r <= n.viewFrom ? (n.view = ir(e, t, r), n.viewFrom = t) : (n.viewFrom > t ? n.view = ir(e, t, n.viewFrom).concat(n.view) : n.viewFrom < t && (n.view = n.view.slice(sn(e, t))), n.viewFrom = t, n.viewTo < r ? n.view = n.view.concat(ir(e, n.viewTo, r)) : n.viewTo > r && (n.view = n.view.slice(0, sn(e, r)))), n.viewTo = r
        }(e, o, l), r.viewOffset = Gt(Xe(e.doc, r.viewFrom)), e.display.mover.style.top = r.viewOffset + "px";
        var u = dn(e);
        if (!a && 0 == u && !t.force && r.renderedView == r.view && (null == r.updateLineNumbers || r.updateLineNumbers >= r.viewTo)) return !1;
        var c = function (e) {
            if (e.hasFocus()) return null;
            var t = W();
            if (!t || !D(e.display.lineDiv, t)) return null;
            var r = {
                activeElt: t
            };
            if (window.getSelection) {
                var n = window.getSelection();
                n.anchorNode && n.extend && D(e.display.lineDiv, n.anchorNode) && (r.anchorNode = n.anchorNode, r.anchorOffset = n.anchorOffset, r.focusNode = n.focusNode, r.focusOffset = n.focusOffset)
            }
            return r
        }(e);
        return u > 4 && (r.lineDiv.style.display = "none"),
            function (e, t, r) {
                var n = e.display,
                    i = e.options.lineNumbers,
                    o = n.lineDiv,
                    l = o.firstChild;

                function a(t) {
                    var r = t.nextSibling;
                    return s && y && e.display.currentWheelTarget == t ? t.style.display = "none" : t.parentNode.removeChild(t), r
                }
                for (var u = n.view, c = n.viewFrom, f = 0; f < u.length; f++) {
                    var h = u[f];
                    if (h.hidden);
                    else if (h.node && h.node.parentNode == o) {
                        for (; l != h.node;) l = a(l);
                        var d = i && null != t && t <= c && h.lineNumber;
                        h.changes && (B(h.changes, "gutter") > -1 && (d = !1), ur(e, h, c, r)), d && (M(h.lineNumber), h.lineNumber.appendChild(document.createTextNode(Je(e.options, c)))), l = h.node.nextSibling
                    } else {
                        var p = vr(e, h, c, r);
                        o.insertBefore(p, l)
                    }
                    c += h.size
                }
                for (; l;) l = a(l)
            }(e, r.updateLineNumbers, t.dims), u > 4 && (r.lineDiv.style.display = ""), r.renderedView = r.view,
            function (e) {
                if (e && e.activeElt && e.activeElt != W() && (e.activeElt.focus(), !/^(INPUT|TEXTAREA)$/.test(e.activeElt.nodeName) && e.anchorNode && D(document.body, e.anchorNode) && D(document.body, e.focusNode))) {
                    var t = window.getSelection(),
                        r = document.createRange();
                    r.setEnd(e.anchorNode, e.anchorOffset), r.collapse(!1), t.removeAllRanges(), t.addRange(r), t.extend(e.focusNode, e.focusOffset)
                }
            }(c), M(r.cursorDiv), M(r.selectionDiv), r.gutters.style.height = r.sizer.style.minHeight = 0, a && (r.lastWrapHeight = t.wrapperHeight, r.lastWrapWidth = t.wrapperWidth, ei(e, 400)), r.updateLineNumbers = null, !0
    }

    function ii(e, t) {
        for (var r = t.viewport, n = !0;; n = !1) {
            if (n && e.options.lineWrapping && t.oldDisplayWidth != Tr(e)) n && (t.visible = Tn(e.display, e.doc, r));
            else if (r && null != r.top && (r = {
                    top: Math.min(e.doc.height + kr(e.display) - Mr(e), r.top)
                }), t.visible = Tn(e.display, e.doc, r), t.visible.from >= e.display.viewFrom && t.visible.to <= e.display.viewTo) break;
            if (!ni(e, t)) break;
            Sn(e);
            var i = Pn(e);
            pn(e), Rn(e, i), ai(e, i), t.force = !1
        }
        t.signal(e, "update", e), e.display.viewFrom == e.display.reportedViewFrom && e.display.viewTo == e.display.reportedViewTo || (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo), e.display.reportedViewFrom = e.display.viewFrom, e.display.reportedViewTo = e.display.viewTo)
    }

    function oi(e, t) {
        var r = new ri(e, t);
        if (ni(e, r)) {
            Sn(e), ii(e, r);
            var n = Pn(e);
            pn(e), Rn(e, n), ai(e, n), r.finish()
        }
    }

    function li(e) {
        var t = e.gutters.offsetWidth;
        e.sizer.style.marginLeft = t + "px"
    }

    function ai(e, t) {
        e.display.sizer.style.minHeight = t.docHeight + "px", e.display.heightForcer.style.top = t.docHeight + "px", e.display.gutters.style.height = t.docHeight + e.display.barHeight + Lr(e) + "px"
    }

    function si(e) {
        var t = e.display,
            r = t.view;
        if (t.alignWidgets || t.gutters.firstChild && e.options.fixedGutter) {
            for (var n = nn(t) - t.scroller.scrollLeft + e.doc.scrollLeft, i = t.gutters.offsetWidth, o = n + "px", l = 0; l < r.length; l++)
                if (!r[l].hidden) {
                    e.options.fixedGutter && (r[l].gutter && (r[l].gutter.style.left = o), r[l].gutterBackground && (r[l].gutterBackground.style.left = o));
                    var a = r[l].alignable;
                    if (a)
                        for (var s = 0; s < a.length; s++) a[s].style.left = o
                } e.options.fixedGutter && (t.gutters.style.left = n + i + "px")
        }
    }

    function ui(e) {
        if (!e.options.lineNumbers) return !1;
        var t = e.doc,
            r = Je(e.options, t.first + t.size - 1),
            n = e.display;
        if (r.length != n.lineNumChars) {
            var i = n.measure.appendChild(A("div", [A("div", r)], "CodeMirror-linenumber CodeMirror-gutter-elt")),
                o = i.firstChild.offsetWidth,
                l = i.offsetWidth - o;
            return n.lineGutter.style.width = "", n.lineNumInnerWidth = Math.max(o, n.lineGutter.offsetWidth - l) + 1, n.lineNumWidth = n.lineNumInnerWidth + l, n.lineNumChars = n.lineNumInnerWidth ? r.length : -1, n.lineGutter.style.width = n.lineNumWidth + "px", li(e.display), !0
        }
        return !1
    }

    function ci(e, t) {
        for (var r = [], n = !1, i = 0; i < e.length; i++) {
            var o = e[i],
                l = null;
            if ("string" != typeof o && (l = o.style, o = o.className), "CodeMirror-linenumbers" == o) {
                if (!t) continue;
                n = !0
            }
            r.push({
                className: o,
                style: l
            })
        }
        return t && !n && r.push({
            className: "CodeMirror-linenumbers",
            style: null
        }), r
    }

    function fi(e) {
        var t = e.gutters,
            r = e.gutterSpecs;
        M(t), e.lineGutter = null;
        for (var n = 0; n < r.length; ++n) {
            var i = r[n],
                o = i.className,
                l = i.style,
                a = t.appendChild(A("div", null, "CodeMirror-gutter " + o));
            l && (a.style.cssText = l), "CodeMirror-linenumbers" == o && (e.lineGutter = a, a.style.width = (e.lineNumWidth || 1) + "px")
        }
        t.style.display = r.length ? "" : "none", li(e)
    }

    function hi(e) {
        fi(e.display), un(e), si(e)
    }
    ri.prototype.signal = function (e, t) {
        ye(e, t) && this.events.push(arguments)
    }, ri.prototype.finish = function () {
        for (var e = 0; e < this.events.length; e++) ge.apply(null, this.events[e])
    };
    var di = 0,
        pi = null;

    function gi(e) {
        var t = e.wheelDeltaX,
            r = e.wheelDeltaY;
        return null == t && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail), null == r && e.detail && e.axis == e.VERTICAL_AXIS ? r = e.detail : null == r && (r = e.wheelDelta), {
            x: t,
            y: r
        }
    }

    function vi(e) {
        var t = gi(e);
        return t.x *= pi, t.y *= pi, t
    }

    function mi(e, t) {
        var n = gi(t),
            i = n.x,
            o = n.y,
            l = e.display,
            a = l.scroller,
            u = a.scrollWidth > a.clientWidth,
            c = a.scrollHeight > a.clientHeight;
        if (i && u || o && c) {
            if (o && y && s) e: for (var h = t.target, d = l.view; h != a; h = h.parentNode)
                for (var p = 0; p < d.length; p++)
                    if (d[p].node == h) {
                        e.display.currentWheelTarget = h;
                        break e
                    } if (i && !r && !f && null != pi) return o && c && Hn(e, Math.max(0, a.scrollTop + o * pi)), Fn(e, Math.max(0, a.scrollLeft + i * pi)), (!o || o && c) && we(t), void(l.wheelStartX = null);
            if (o && null != pi) {
                var g = o * pi,
                    v = e.doc.scrollTop,
                    m = v + l.wrapper.clientHeight;
                g < 0 ? v = Math.max(0, v + g - 50) : m = Math.min(e.doc.height, m + g + 50), oi(e, {
                    top: v,
                    bottom: m
                })
            }
            di < 20 && (null == l.wheelStartX ? (l.wheelStartX = a.scrollLeft, l.wheelStartY = a.scrollTop, l.wheelDX = i, l.wheelDY = o, setTimeout(function () {
                if (null != l.wheelStartX) {
                    var e = a.scrollLeft - l.wheelStartX,
                        t = a.scrollTop - l.wheelStartY,
                        r = t && l.wheelDY && t / l.wheelDY || e && l.wheelDX && e / l.wheelDX;
                    l.wheelStartX = l.wheelStartY = null, r && (pi = (pi * di + r) / (di + 1), ++di)
                }
            }, 200)) : (l.wheelDX += i, l.wheelDY += o))
        }
    }
    l ? pi = -.53 : r ? pi = 15 : c ? pi = -.7 : h && (pi = -1 / 3);
    var yi = function (e, t) {
        this.ranges = e, this.primIndex = t
    };
    yi.prototype.primary = function () {
        return this.ranges[this.primIndex]
    }, yi.prototype.equals = function (e) {
        if (e == this) return !0;
        if (e.primIndex != this.primIndex || e.ranges.length != this.ranges.length) return !1;
        for (var t = 0; t < this.ranges.length; t++) {
            var r = this.ranges[t],
                n = e.ranges[t];
            if (!rt(r.anchor, n.anchor) || !rt(r.head, n.head)) return !1
        }
        return !0
    }, yi.prototype.deepCopy = function () {
        for (var e = [], t = 0; t < this.ranges.length; t++) e[t] = new bi(nt(this.ranges[t].anchor), nt(this.ranges[t].head));
        return new yi(e, this.primIndex)
    }, yi.prototype.somethingSelected = function () {
        for (var e = 0; e < this.ranges.length; e++)
            if (!this.ranges[e].empty()) return !0;
        return !1
    }, yi.prototype.contains = function (e, t) {
        t || (t = e);
        for (var r = 0; r < this.ranges.length; r++) {
            var n = this.ranges[r];
            if (tt(t, n.from()) >= 0 && tt(e, n.to()) <= 0) return r
        }
        return -1
    };
    var bi = function (e, t) {
        this.anchor = e, this.head = t
    };

    function wi(e, t, r) {
        var n = e && e.options.selectionsMayTouch,
            i = t[r];
        t.sort(function (e, t) {
            return tt(e.from(), t.from())
        }), r = B(t, i);
        for (var o = 1; o < t.length; o++) {
            var l = t[o],
                a = t[o - 1],
                s = tt(a.to(), l.from());
            if (n && !l.empty() ? s > 0 : s >= 0) {
                var u = ot(a.from(), l.from()),
                    c = it(a.to(), l.to()),
                    f = a.empty() ? l.from() == l.head : a.from() == a.head;
                o <= r && --r, t.splice(--o, 2, new bi(f ? c : u, f ? u : c))
            }
        }
        return new yi(t, r)
    }

    function xi(e, t) {
        return new yi([new bi(e, t || e)], 0)
    }

    function Ci(e) {
        return e.text ? et(e.from.line + e.text.length - 1, Y(e.text).length + (1 == e.text.length ? e.from.ch : 0)) : e.to
    }

    function ki(e, t) {
        if (tt(e, t.from) < 0) return e;
        if (tt(e, t.to) <= 0) return Ci(t);
        var r = e.line + t.text.length - (t.to.line - t.from.line) - 1,
            n = e.ch;
        return e.line == t.to.line && (n += Ci(t).ch - t.to.ch), et(r, n)
    }

    function Si(e, t) {
        for (var r = [], n = 0; n < e.sel.ranges.length; n++) {
            var i = e.sel.ranges[n];
            r.push(new bi(ki(i.anchor, t), ki(i.head, t)))
        }
        return wi(e.cm, r, e.sel.primIndex)
    }

    function Li(e, t, r) {
        return e.line == t.line ? et(r.line, e.ch - t.ch + r.ch) : et(r.line + (e.line - t.line), e.ch)
    }

    function Ti(e) {
        e.doc.mode = Re(e.options, e.doc.modeOption), Mi(e)
    }

    function Mi(e) {
        e.doc.iter(function (e) {
            e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null)
        }), e.doc.modeFrontier = e.doc.highlightFrontier = e.doc.first, ei(e, 100), e.state.modeGen++, e.curOp && un(e)
    }

    function Ni(e, t) {
        return 0 == t.from.ch && 0 == t.to.ch && "" == Y(t.text) && (!e.cm || e.cm.options.wholeLineUpdateBefore)
    }

    function Ai(e, t, r, n) {
        function i(e) {
            return r ? r[e] : null
        }

        function o(e, r, i) {
            ! function (e, t, r, n) {
                e.text = t, e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null), null != e.order && (e.order = null), Nt(e), At(e, r);
                var i = n ? n(e) : 1;
                i != e.height && Ye(e, i)
            }(e, r, i, n), ar(e, "change", e, t)
        }

        function l(e, t) {
            for (var r = [], o = e; o < t; ++o) r.push(new Xt(u[o], i(o), n));
            return r
        }
        var a = t.from,
            s = t.to,
            u = t.text,
            c = Xe(e, a.line),
            f = Xe(e, s.line),
            h = Y(u),
            d = i(u.length - 1),
            p = s.line - a.line;
        if (t.full) e.insert(0, l(0, u.length)), e.remove(u.length, e.size - u.length);
        else if (Ni(e, t)) {
            var g = l(0, u.length - 1);
            o(f, f.text, d), p && e.remove(a.line, p), g.length && e.insert(a.line, g)
        } else if (c == f)
            if (1 == u.length) o(c, c.text.slice(0, a.ch) + h + c.text.slice(s.ch), d);
            else {
                var v = l(1, u.length - 1);
                v.push(new Xt(h + c.text.slice(s.ch), d, n)), o(c, c.text.slice(0, a.ch) + u[0], i(0)), e.insert(a.line + 1, v)
            }
        else if (1 == u.length) o(c, c.text.slice(0, a.ch) + u[0] + f.text.slice(s.ch), i(0)), e.remove(a.line + 1, p);
        else {
            o(c, c.text.slice(0, a.ch) + u[0], i(0)), o(f, h + f.text.slice(s.ch), d);
            var m = l(1, u.length - 1);
            p > 1 && e.remove(a.line + 1, p - 1), e.insert(a.line + 1, m)
        }
        ar(e, "change", e, t)
    }

    function Oi(e, t, r) {
        ! function e(n, i, o) {
            if (n.linked)
                for (var l = 0; l < n.linked.length; ++l) {
                    var a = n.linked[l];
                    if (a.doc != i) {
                        var s = o && a.sharedHist;
                        r && !s || (t(a.doc, s), e(a.doc, n, s))
                    }
                }
        }(e, null, !0)
    }

    function Di(e, t) {
        if (t.cm) throw new Error("This document is already in use.");
        e.doc = t, t.cm = e, ln(e), Ti(e), Wi(e), e.options.lineWrapping || Kt(e), e.options.mode = t.modeOption, un(e)
    }

    function Wi(e) {
        ("rtl" == e.doc.direction ? H : T)(e.display.lineDiv, "CodeMirror-rtl")
    }

    function Hi(e) {
        this.done = [], this.undone = [], this.undoDepth = 1 / 0, this.lastModTime = this.lastSelTime = 0, this.lastOp = this.lastSelOp = null, this.lastOrigin = this.lastSelOrigin = null, this.generation = this.maxGeneration = e || 1
    }

    function Ei(e, t) {
        var r = {
            from: nt(t.from),
            to: Ci(t),
            text: $e(e, t.from, t.to)
        };
        return Ri(e, r, t.from.line, t.to.line + 1), Oi(e, function (e) {
            return Ri(e, r, t.from.line, t.to.line + 1)
        }, !0), r
    }

    function Fi(e) {
        for (; e.length;) {
            if (!Y(e).ranges) break;
            e.pop()
        }
    }

    function Pi(e, t, r, n) {
        var i = e.history;
        i.undone.length = 0;
        var o, l, a = +new Date;
        if ((i.lastOp == n || i.lastOrigin == t.origin && t.origin && ("+" == t.origin.charAt(0) && i.lastModTime > a - (e.cm ? e.cm.options.historyEventDelay : 500) || "*" == t.origin.charAt(0))) && (o = function (e, t) {
                return t ? (Fi(e.done), Y(e.done)) : e.done.length && !Y(e.done).ranges ? Y(e.done) : e.done.length > 1 && !e.done[e.done.length - 2].ranges ? (e.done.pop(), Y(e.done)) : void 0
            }(i, i.lastOp == n))) l = Y(o.changes), 0 == tt(t.from, t.to) && 0 == tt(t.from, l.to) ? l.to = Ci(t) : o.changes.push(Ei(e, t));
        else {
            var s = Y(i.done);
            for (s && s.ranges || zi(e.sel, i.done), o = {
                    changes: [Ei(e, t)],
                    generation: i.generation
                }, i.done.push(o); i.done.length > i.undoDepth;) i.done.shift(), i.done[0].ranges || i.done.shift()
        }
        i.done.push(r), i.generation = ++i.maxGeneration, i.lastModTime = i.lastSelTime = a, i.lastOp = i.lastSelOp = n, i.lastOrigin = i.lastSelOrigin = t.origin, l || ge(e, "historyAdded")
    }

    function Ii(e, t, r, n) {
        var i = e.history,
            o = n && n.origin;
        r == i.lastSelOp || o && i.lastSelOrigin == o && (i.lastModTime == i.lastSelTime && i.lastOrigin == o || function (e, t, r, n) {
            var i = t.charAt(0);
            return "*" == i || "+" == i && r.ranges.length == n.ranges.length && r.somethingSelected() == n.somethingSelected() && new Date - e.history.lastSelTime <= (e.cm ? e.cm.options.historyEventDelay : 500)
        }(e, o, Y(i.done), t)) ? i.done[i.done.length - 1] = t : zi(t, i.done), i.lastSelTime = +new Date, i.lastSelOrigin = o, i.lastSelOp = r, n && !1 !== n.clearRedo && Fi(i.undone)
    }

    function zi(e, t) {
        var r = Y(t);
        r && r.ranges && r.equals(e) || t.push(e)
    }

    function Ri(e, t, r, n) {
        var i = t["spans_" + e.id],
            o = 0;
        e.iter(Math.max(e.first, r), Math.min(e.first + e.size, n), function (r) {
            r.markedSpans && ((i || (i = t["spans_" + e.id] = {}))[o] = r.markedSpans), ++o
        })
    }

    function Bi(e) {
        if (!e) return null;
        for (var t, r = 0; r < e.length; ++r) e[r].marker.explicitlyCleared ? t || (t = e.slice(0, r)) : t && t.push(e[r]);
        return t ? t.length ? t : null : e
    }

    function ji(e, t) {
        var r = function (e, t) {
                var r = t["spans_" + e.id];
                if (!r) return null;
                for (var n = [], i = 0; i < t.text.length; ++i) n.push(Bi(r[i]));
                return n
            }(e, t),
            n = Tt(e, t);
        if (!r) return n;
        if (!n) return r;
        for (var i = 0; i < r.length; ++i) {
            var o = r[i],
                l = n[i];
            if (o && l) e: for (var a = 0; a < l.length; ++a) {
                for (var s = l[a], u = 0; u < o.length; ++u)
                    if (o[u].marker == s.marker) continue e;
                o.push(s)
            } else l && (r[i] = l)
        }
        return r
    }

    function Vi(e, t, r) {
        for (var n = [], i = 0; i < e.length; ++i) {
            var o = e[i];
            if (o.ranges) n.push(r ? yi.prototype.deepCopy.call(o) : o);
            else {
                var l = o.changes,
                    a = [];
                n.push({
                    changes: a
                });
                for (var s = 0; s < l.length; ++s) {
                    var u = l[s],
                        c = void 0;
                    if (a.push({
                            from: u.from,
                            to: u.to,
                            text: u.text
                        }), t)
                        for (var f in u)(c = f.match(/^spans_(\d+)$/)) && B(t, Number(c[1])) > -1 && (Y(a)[f] = u[f], delete u[f])
                }
            }
        }
        return n
    }

    function Gi(e, t, r, n) {
        if (n) {
            var i = e.anchor;
            if (r) {
                var o = tt(t, i) < 0;
                o != tt(r, i) < 0 ? (i = t, t = r) : o != tt(t, r) < 0 && (t = r)
            }
            return new bi(i, t)
        }
        return new bi(r || t, t)
    }

    function Ui(e, t, r, n, i) {
        null == i && (i = e.cm && (e.cm.display.shift || e.extend)), Yi(e, new yi([Gi(e.sel.primary(), t, r, i)], 0), n)
    }

    function Ki(e, t, r) {
        for (var n = [], i = e.cm && (e.cm.display.shift || e.extend), o = 0; o < e.sel.ranges.length; o++) n[o] = Gi(e.sel.ranges[o], t[o], null, i);
        Yi(e, wi(e.cm, n, e.sel.primIndex), r)
    }

    function Xi(e, t, r, n) {
        var i = e.sel.ranges.slice(0);
        i[t] = r, Yi(e, wi(e.cm, i, e.sel.primIndex), n)
    }

    function $i(e, t, r, n) {
        Yi(e, xi(t, r), n)
    }

    function _i(e, t, r) {
        var n = e.history.done,
            i = Y(n);
        i && i.ranges ? (n[n.length - 1] = t, qi(e, t, r)) : Yi(e, t, r)
    }

    function Yi(e, t, r) {
        qi(e, t, r), Ii(e, e.sel, e.cm ? e.cm.curOp.id : NaN, r)
    }

    function qi(e, t, r) {
        (ye(e, "beforeSelectionChange") || e.cm && ye(e.cm, "beforeSelectionChange")) && (t = function (e, t, r) {
            var n = {
                ranges: t.ranges,
                update: function (t) {
                    this.ranges = [];
                    for (var r = 0; r < t.length; r++) this.ranges[r] = new bi(at(e, t[r].anchor), at(e, t[r].head))
                },
                origin: r && r.origin
            };
            return ge(e, "beforeSelectionChange", e, n), e.cm && ge(e.cm, "beforeSelectionChange", e.cm, n), n.ranges != t.ranges ? wi(e.cm, n.ranges, n.ranges.length - 1) : t
        }(e, t, r)), Zi(e, Ji(e, t, r && r.bias || (tt(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1), !0)), r && !1 === r.scroll || !e.cm || An(e.cm)
    }

    function Zi(e, t) {
        t.equals(e.sel) || (e.sel = t, e.cm && (e.cm.curOp.updateInput = 1, e.cm.curOp.selectionChanged = !0, me(e.cm)), ar(e, "cursorActivity", e))
    }

    function Qi(e) {
        Zi(e, Ji(e, e.sel, null, !1))
    }

    function Ji(e, t, r, n) {
        for (var i, o = 0; o < t.ranges.length; o++) {
            var l = t.ranges[o],
                a = t.ranges.length == e.sel.ranges.length && e.sel.ranges[o],
                s = to(e, l.anchor, a && a.anchor, r, n),
                u = to(e, l.head, a && a.head, r, n);
            (i || s != l.anchor || u != l.head) && (i || (i = t.ranges.slice(0, o)), i[o] = new bi(s, u))
        }
        return i ? wi(e.cm, i, t.primIndex) : t
    }

    function eo(e, t, r, n, i) {
        var o = Xe(e, t.line);
        if (o.markedSpans)
            for (var l = 0; l < o.markedSpans.length; ++l) {
                var a = o.markedSpans[l],
                    s = a.marker,
                    u = "selectLeft" in s ? !s.selectLeft : s.inclusiveLeft,
                    c = "selectRight" in s ? !s.selectRight : s.inclusiveRight;
                if ((null == a.from || (u ? a.from <= t.ch : a.from < t.ch)) && (null == a.to || (c ? a.to >= t.ch : a.to > t.ch))) {
                    if (i && (ge(s, "beforeCursorEnter"), s.explicitlyCleared)) {
                        if (o.markedSpans) {
                            --l;
                            continue
                        }
                        break
                    }
                    if (!s.atomic) continue;
                    if (r) {
                        var f = s.find(n < 0 ? 1 : -1),
                            h = void 0;
                        if ((n < 0 ? c : u) && (f = ro(e, f, -n, f && f.line == t.line ? o : null)), f && f.line == t.line && (h = tt(f, r)) && (n < 0 ? h < 0 : h > 0)) return eo(e, f, t, n, i)
                    }
                    var d = s.find(n < 0 ? -1 : 1);
                    return (n < 0 ? u : c) && (d = ro(e, d, n, d.line == t.line ? o : null)), d ? eo(e, d, t, n, i) : null
                }
            }
        return t
    }

    function to(e, t, r, n, i) {
        var o = n || 1,
            l = eo(e, t, r, o, i) || !i && eo(e, t, r, o, !0) || eo(e, t, r, -o, i) || !i && eo(e, t, r, -o, !0);
        return l || (e.cantEdit = !0, et(e.first, 0))
    }

    function ro(e, t, r, n) {
        return r < 0 && 0 == t.ch ? t.line > e.first ? at(e, et(t.line - 1)) : null : r > 0 && t.ch == (n || Xe(e, t.line)).text.length ? t.line < e.first + e.size - 1 ? et(t.line + 1, 0) : null : new et(t.line, t.ch + r)
    }

    function no(e) {
        e.setSelection(et(e.firstLine(), 0), et(e.lastLine()), G)
    }

    function io(e, t, r) {
        var n = {
            canceled: !1,
            from: t.from,
            to: t.to,
            text: t.text,
            origin: t.origin,
            cancel: function () {
                return n.canceled = !0
            }
        };
        return r && (n.update = function (t, r, i, o) {
            t && (n.from = at(e, t)), r && (n.to = at(e, r)), i && (n.text = i), void 0 !== o && (n.origin = o)
        }), ge(e, "beforeChange", e, n), e.cm && ge(e.cm, "beforeChange", e.cm, n), n.canceled ? (e.cm && (e.cm.curOp.updateInput = 2), null) : {
            from: n.from,
            to: n.to,
            text: n.text,
            origin: n.origin
        }
    }

    function oo(e, t, r) {
        if (e.cm) {
            if (!e.cm.curOp) return Zn(e.cm, oo)(e, t, r);
            if (e.cm.state.suppressEdits) return
        }
        if (!(ye(e, "beforeChange") || e.cm && ye(e.cm, "beforeChange")) || (t = io(e, t, !0))) {
            var n = xt && !r && function (e, t, r) {
                var n = null;
                if (e.iter(t.line, r.line + 1, function (e) {
                        if (e.markedSpans)
                            for (var t = 0; t < e.markedSpans.length; ++t) {
                                var r = e.markedSpans[t].marker;
                                !r.readOnly || n && -1 != B(n, r) || (n || (n = [])).push(r)
                            }
                    }), !n) return null;
                for (var i = [{
                        from: t,
                        to: r
                    }], o = 0; o < n.length; ++o)
                    for (var l = n[o], a = l.find(0), s = 0; s < i.length; ++s) {
                        var u = i[s];
                        if (!(tt(u.to, a.from) < 0 || tt(u.from, a.to) > 0)) {
                            var c = [s, 1],
                                f = tt(u.from, a.from),
                                h = tt(u.to, a.to);
                            (f < 0 || !l.inclusiveLeft && !f) && c.push({
                                from: u.from,
                                to: a.from
                            }), (h > 0 || !l.inclusiveRight && !h) && c.push({
                                from: a.to,
                                to: u.to
                            }), i.splice.apply(i, c), s += c.length - 3
                        }
                    }
                return i
            }(e, t.from, t.to);
            if (n)
                for (var i = n.length - 1; i >= 0; --i) lo(e, {
                    from: n[i].from,
                    to: n[i].to,
                    text: i ? [""] : t.text,
                    origin: t.origin
                });
            else lo(e, t)
        }
    }

    function lo(e, t) {
        if (1 != t.text.length || "" != t.text[0] || 0 != tt(t.from, t.to)) {
            var r = Si(e, t);
            Pi(e, t, r, e.cm ? e.cm.curOp.id : NaN), uo(e, t, r, Tt(e, t));
            var n = [];
            Oi(e, function (e, r) {
                r || -1 != B(n, e.history) || (po(e.history, t), n.push(e.history)), uo(e, t, null, Tt(e, t))
            })
        }
    }

    function ao(e, t, r) {
        var n = e.cm && e.cm.state.suppressEdits;
        if (!n || r) {
            for (var i, o = e.history, l = e.sel, a = "undo" == t ? o.done : o.undone, s = "undo" == t ? o.undone : o.done, u = 0; u < a.length && (i = a[u], r ? !i.ranges || i.equals(e.sel) : i.ranges); u++);
            if (u != a.length) {
                for (o.lastOrigin = o.lastSelOrigin = null;;) {
                    if (!(i = a.pop()).ranges) {
                        if (n) return void a.push(i);
                        break
                    }
                    if (zi(i, s), r && !i.equals(e.sel)) return void Yi(e, i, {
                        clearRedo: !1
                    });
                    l = i
                }
                var c = [];
                zi(l, s), s.push({
                    changes: c,
                    generation: o.generation
                }), o.generation = i.generation || ++o.maxGeneration;
                for (var f = ye(e, "beforeChange") || e.cm && ye(e.cm, "beforeChange"), h = function (r) {
                        var n = i.changes[r];
                        if (n.origin = t, f && !io(e, n, !1)) return a.length = 0, {};
                        c.push(Ei(e, n));
                        var o = r ? Si(e, n) : Y(a);
                        uo(e, n, o, ji(e, n)), !r && e.cm && e.cm.scrollIntoView({
                            from: n.from,
                            to: Ci(n)
                        });
                        var l = [];
                        Oi(e, function (e, t) {
                            t || -1 != B(l, e.history) || (po(e.history, n), l.push(e.history)), uo(e, n, null, ji(e, n))
                        })
                    }, d = i.changes.length - 1; d >= 0; --d) {
                    var p = h(d);
                    if (p) return p.v
                }
            }
        }
    }

    function so(e, t) {
        if (0 != t && (e.first += t, e.sel = new yi(q(e.sel.ranges, function (e) {
                return new bi(et(e.anchor.line + t, e.anchor.ch), et(e.head.line + t, e.head.ch))
            }), e.sel.primIndex), e.cm)) {
            un(e.cm, e.first, e.first - t, t);
            for (var r = e.cm.display, n = r.viewFrom; n < r.viewTo; n++) cn(e.cm, n, "gutter")
        }
    }

    function uo(e, t, r, n) {
        if (e.cm && !e.cm.curOp) return Zn(e.cm, uo)(e, t, r, n);
        if (t.to.line < e.first) so(e, t.text.length - 1 - (t.to.line - t.from.line));
        else if (!(t.from.line > e.lastLine())) {
            if (t.from.line < e.first) {
                var i = t.text.length - 1 - (e.first - t.from.line);
                so(e, i), t = {
                    from: et(e.first, 0),
                    to: et(t.to.line + i, t.to.ch),
                    text: [Y(t.text)],
                    origin: t.origin
                }
            }
            var o = e.lastLine();
            t.to.line > o && (t = {
                from: t.from,
                to: et(o, Xe(e, o).text.length),
                text: [t.text[0]],
                origin: t.origin
            }), t.removed = $e(e, t.from, t.to), r || (r = Si(e, t)), e.cm ? function (e, t, r) {
                var n = e.doc,
                    i = e.display,
                    o = t.from,
                    l = t.to,
                    a = !1,
                    s = o.line;
                e.options.lineWrapping || (s = qe(zt(Xe(n, o.line))), n.iter(s, l.line + 1, function (e) {
                    if (e == i.maxLine) return a = !0, !0
                }));
                n.sel.contains(t.from, t.to) > -1 && me(e);
                Ai(n, t, r, on(e)), e.options.lineWrapping || (n.iter(s, o.line + t.text.length, function (e) {
                    var t = Ut(e);
                    t > i.maxLineLength && (i.maxLine = e, i.maxLineLength = t, i.maxLineChanged = !0, a = !1)
                }), a && (e.curOp.updateMaxLine = !0));
                (function (e, t) {
                    if (e.modeFrontier = Math.min(e.modeFrontier, t), !(e.highlightFrontier < t - 10)) {
                        for (var r = e.first, n = t - 1; n > r; n--) {
                            var i = Xe(e, n).stateAfter;
                            if (i && (!(i instanceof ut) || n + i.lookAhead < t)) {
                                r = n + 1;
                                break
                            }
                        }
                        e.highlightFrontier = Math.min(e.highlightFrontier, r)
                    }
                })(n, o.line), ei(e, 400);
                var u = t.text.length - (l.line - o.line) - 1;
                t.full ? un(e) : o.line != l.line || 1 != t.text.length || Ni(e.doc, t) ? un(e, o.line, l.line + 1, u) : cn(e, o.line, "text");
                var c = ye(e, "changes"),
                    f = ye(e, "change");
                if (f || c) {
                    var h = {
                        from: o,
                        to: l,
                        text: t.text,
                        removed: t.removed,
                        origin: t.origin
                    };
                    f && ar(e, "change", e, h), c && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(h)
                }
                e.display.selForContextMenu = null
            }(e.cm, t, n) : Ai(e, t, n), qi(e, r, G), e.cantEdit && to(e, et(e.firstLine(), 0)) && (e.cantEdit = !1)
        }
    }

    function co(e, t, r, n, i) {
        var o;
        n || (n = r), tt(n, r) < 0 && (r = (o = [n, r])[0], n = o[1]), "string" == typeof t && (t = e.splitLines(t)), oo(e, {
            from: r,
            to: n,
            text: t,
            origin: i
        })
    }

    function fo(e, t, r, n) {
        r < e.line ? e.line += n : t < e.line && (e.line = t, e.ch = 0)
    }

    function ho(e, t, r, n) {
        for (var i = 0; i < e.length; ++i) {
            var o = e[i],
                l = !0;
            if (o.ranges) {
                o.copied || ((o = e[i] = o.deepCopy()).copied = !0);
                for (var a = 0; a < o.ranges.length; a++) fo(o.ranges[a].anchor, t, r, n), fo(o.ranges[a].head, t, r, n)
            } else {
                for (var s = 0; s < o.changes.length; ++s) {
                    var u = o.changes[s];
                    if (r < u.from.line) u.from = et(u.from.line + n, u.from.ch), u.to = et(u.to.line + n, u.to.ch);
                    else if (t <= u.to.line) {
                        l = !1;
                        break
                    }
                }
                l || (e.splice(0, i + 1), i = 0)
            }
        }
    }

    function po(e, t) {
        var r = t.from.line,
            n = t.to.line,
            i = t.text.length - (n - r) - 1;
        ho(e.done, r, n, i), ho(e.undone, r, n, i)
    }

    function go(e, t, r, n) {
        var i = t,
            o = t;
        return "number" == typeof t ? o = Xe(e, lt(e, t)) : i = qe(t), null == i ? null : (n(o, i) && e.cm && cn(e.cm, i, r), o)
    }

    function vo(e) {
        this.lines = e, this.parent = null;
        for (var t = 0, r = 0; r < e.length; ++r) e[r].parent = this, t += e[r].height;
        this.height = t
    }

    function mo(e) {
        this.children = e;
        for (var t = 0, r = 0, n = 0; n < e.length; ++n) {
            var i = e[n];
            t += i.chunkSize(), r += i.height, i.parent = this
        }
        this.size = t, this.height = r, this.parent = null
    }
    bi.prototype.from = function () {
        return ot(this.anchor, this.head)
    }, bi.prototype.to = function () {
        return it(this.anchor, this.head)
    }, bi.prototype.empty = function () {
        return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
    }, vo.prototype = {
        chunkSize: function () {
            return this.lines.length
        },
        removeInner: function (e, t) {
            for (var r = e, n = e + t; r < n; ++r) {
                var i = this.lines[r];
                this.height -= i.height, $t(i), ar(i, "delete")
            }
            this.lines.splice(e, t)
        },
        collapse: function (e) {
            e.push.apply(e, this.lines)
        },
        insertInner: function (e, t, r) {
            this.height += r, this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));
            for (var n = 0; n < t.length; ++n) t[n].parent = this
        },
        iterN: function (e, t, r) {
            for (var n = e + t; e < n; ++e)
                if (r(this.lines[e])) return !0
        }
    }, mo.prototype = {
        chunkSize: function () {
            return this.size
        },
        removeInner: function (e, t) {
            this.size -= t;
            for (var r = 0; r < this.children.length; ++r) {
                var n = this.children[r],
                    i = n.chunkSize();
                if (e < i) {
                    var o = Math.min(t, i - e),
                        l = n.height;
                    if (n.removeInner(e, o), this.height -= l - n.height, i == o && (this.children.splice(r--, 1), n.parent = null), 0 == (t -= o)) break;
                    e = 0
                } else e -= i
            }
            if (this.size - t < 25 && (this.children.length > 1 || !(this.children[0] instanceof vo))) {
                var a = [];
                this.collapse(a), this.children = [new vo(a)], this.children[0].parent = this
            }
        },
        collapse: function (e) {
            for (var t = 0; t < this.children.length; ++t) this.children[t].collapse(e)
        },
        insertInner: function (e, t, r) {
            this.size += t.length, this.height += r;
            for (var n = 0; n < this.children.length; ++n) {
                var i = this.children[n],
                    o = i.chunkSize();
                if (e <= o) {
                    if (i.insertInner(e, t, r), i.lines && i.lines.length > 50) {
                        for (var l = i.lines.length % 25 + 25, a = l; a < i.lines.length;) {
                            var s = new vo(i.lines.slice(a, a += 25));
                            i.height -= s.height, this.children.splice(++n, 0, s), s.parent = this
                        }
                        i.lines = i.lines.slice(0, l), this.maybeSpill()
                    }
                    break
                }
                e -= o
            }
        },
        maybeSpill: function () {
            if (!(this.children.length <= 10)) {
                var e = this;
                do {
                    var t = new mo(e.children.splice(e.children.length - 5, 5));
                    if (e.parent) {
                        e.size -= t.size, e.height -= t.height;
                        var r = B(e.parent.children, e);
                        e.parent.children.splice(r + 1, 0, t)
                    } else {
                        var n = new mo(e.children);
                        n.parent = e, e.children = [n, t], e = n
                    }
                    t.parent = e.parent
                } while (e.children.length > 10);
                e.parent.maybeSpill()
            }
        },
        iterN: function (e, t, r) {
            for (var n = 0; n < this.children.length; ++n) {
                var i = this.children[n],
                    o = i.chunkSize();
                if (e < o) {
                    var l = Math.min(t, o - e);
                    if (i.iterN(e, l, r)) return !0;
                    if (0 == (t -= l)) break;
                    e = 0
                } else e -= o
            }
        }
    };
    var yo = function (e, t, r) {
        if (r)
            for (var n in r) r.hasOwnProperty(n) && (this[n] = r[n]);
        this.doc = e, this.node = t
    };

    function bo(e, t, r) {
        Gt(t) < (e.curOp && e.curOp.scrollTop || e.doc.scrollTop) && Nn(e, r)
    }
    yo.prototype.clear = function () {
        var e = this.doc.cm,
            t = this.line.widgets,
            r = this.line,
            n = qe(r);
        if (null != n && t) {
            for (var i = 0; i < t.length; ++i) t[i] == this && t.splice(i--, 1);
            t.length || (r.widgets = null);
            var o = wr(this);
            Ye(r, Math.max(0, r.height - o)), e && (qn(e, function () {
                bo(e, r, -o), cn(e, n, "widget")
            }), ar(e, "lineWidgetCleared", e, this, n))
        }
    }, yo.prototype.changed = function () {
        var e = this,
            t = this.height,
            r = this.doc.cm,
            n = this.line;
        this.height = null;
        var i = wr(this) - t;
        i && (jt(this.doc, n) || Ye(n, n.height + i), r && qn(r, function () {
            r.curOp.forceUpdate = !0, bo(r, n, i), ar(r, "lineWidgetChanged", r, e, qe(n))
        }))
    }, be(yo);
    var wo = 0,
        xo = function (e, t) {
            this.lines = [], this.type = t, this.doc = e, this.id = ++wo
        };

    function Co(e, t, r, n, i) {
        if (n && n.shared) return function (e, t, r, n, i) {
            (n = I(n)).shared = !1;
            var o = [Co(e, t, r, n, i)],
                l = o[0],
                a = n.widgetNode;
            return Oi(e, function (e) {
                a && (n.widgetNode = a.cloneNode(!0)), o.push(Co(e, at(e, t), at(e, r), n, i));
                for (var s = 0; s < e.linked.length; ++s)
                    if (e.linked[s].isParent) return;
                l = Y(o)
            }), new ko(o, l)
        }(e, t, r, n, i);
        if (e.cm && !e.cm.curOp) return Zn(e.cm, Co)(e, t, r, n, i);
        var o = new xo(e, i),
            l = tt(t, r);
        if (n && I(n, o, !1), l > 0 || 0 == l && !1 !== o.clearWhenEmpty) return o;
        if (o.replacedWith && (o.collapsed = !0, o.widgetNode = O("span", [o.replacedWith], "CodeMirror-widget"), n.handleMouseEvents || o.widgetNode.setAttribute("cm-ignore-events", "true"), n.insertLeft && (o.widgetNode.insertLeft = !0)), o.collapsed) {
            if (It(e, t.line, t, r, o) || t.line != r.line && It(e, r.line, t, r, o)) throw new Error("Inserting collapsed marker partially overlapping an existing one");
            Ct = !0
        }
        o.addToHistory && Pi(e, {
            from: t,
            to: r,
            origin: "markText"
        }, e.sel, NaN);
        var a, s = t.line,
            u = e.cm;
        if (e.iter(s, r.line + 1, function (e) {
                u && o.collapsed && !u.options.lineWrapping && zt(e) == u.display.maxLine && (a = !0), o.collapsed && s != t.line && Ye(e, 0),
                    function (e, t) {
                        e.markedSpans = e.markedSpans ? e.markedSpans.concat([t]) : [t], t.marker.attachLine(e)
                    }(e, new kt(o, s == t.line ? t.ch : null, s == r.line ? r.ch : null)), ++s
            }), o.collapsed && e.iter(t.line, r.line + 1, function (t) {
                jt(e, t) && Ye(t, 0)
            }), o.clearOnEnter && he(o, "beforeCursorEnter", function () {
                return o.clear()
            }), o.readOnly && (xt = !0, (e.history.done.length || e.history.undone.length) && e.clearHistory()), o.collapsed && (o.id = ++wo, o.atomic = !0), u) {
            if (a && (u.curOp.updateMaxLine = !0), o.collapsed) un(u, t.line, r.line + 1);
            else if (o.className || o.startStyle || o.endStyle || o.css || o.attributes || o.title)
                for (var c = t.line; c <= r.line; c++) cn(u, c, "text");
            o.atomic && Qi(u.doc), ar(u, "markerAdded", u, o)
        }
        return o
    }
    xo.prototype.clear = function () {
        if (!this.explicitlyCleared) {
            var e = this.doc.cm,
                t = e && !e.curOp;
            if (t && Un(e), ye(this, "clear")) {
                var r = this.find();
                r && ar(this, "clear", r.from, r.to)
            }
            for (var n = null, i = null, o = 0; o < this.lines.length; ++o) {
                var l = this.lines[o],
                    a = St(l.markedSpans, this);
                e && !this.collapsed ? cn(e, qe(l), "text") : e && (null != a.to && (i = qe(l)), null != a.from && (n = qe(l))), l.markedSpans = Lt(l.markedSpans, a), null == a.from && this.collapsed && !jt(this.doc, l) && e && Ye(l, en(e.display))
            }
            if (e && this.collapsed && !e.options.lineWrapping)
                for (var s = 0; s < this.lines.length; ++s) {
                    var u = zt(this.lines[s]),
                        c = Ut(u);
                    c > e.display.maxLineLength && (e.display.maxLine = u, e.display.maxLineLength = c, e.display.maxLineChanged = !0)
                }
            null != n && e && this.collapsed && un(e, n, i + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, e && Qi(e.doc)), e && ar(e, "markerCleared", e, this, n, i), t && Kn(e), this.parent && this.parent.clear()
        }
    }, xo.prototype.find = function (e, t) {
        var r, n;
        null == e && "bookmark" == this.type && (e = 1);
        for (var i = 0; i < this.lines.length; ++i) {
            var o = this.lines[i],
                l = St(o.markedSpans, this);
            if (null != l.from && (r = et(t ? o : qe(o), l.from), -1 == e)) return r;
            if (null != l.to && (n = et(t ? o : qe(o), l.to), 1 == e)) return n
        }
        return r && {
            from: r,
            to: n
        }
    }, xo.prototype.changed = function () {
        var e = this,
            t = this.find(-1, !0),
            r = this,
            n = this.doc.cm;
        t && n && qn(n, function () {
            var i = t.line,
                o = qe(t.line),
                l = Or(n, o);
            if (l && (Ir(l), n.curOp.selectionChanged = n.curOp.forceUpdate = !0), n.curOp.updateMaxLine = !0, !jt(r.doc, i) && null != r.height) {
                var a = r.height;
                r.height = null;
                var s = wr(r) - a;
                s && Ye(i, i.height + s)
            }
            ar(n, "markerChanged", n, e)
        })
    }, xo.prototype.attachLine = function (e) {
        if (!this.lines.length && this.doc.cm) {
            var t = this.doc.cm.curOp;
            t.maybeHiddenMarkers && -1 != B(t.maybeHiddenMarkers, this) || (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this)
        }
        this.lines.push(e)
    }, xo.prototype.detachLine = function (e) {
        if (this.lines.splice(B(this.lines, e), 1), !this.lines.length && this.doc.cm) {
            var t = this.doc.cm.curOp;
            (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this)
        }
    }, be(xo);
    var ko = function (e, t) {
        this.markers = e, this.primary = t;
        for (var r = 0; r < e.length; ++r) e[r].parent = this
    };

    function So(e) {
        return e.findMarks(et(e.first, 0), e.clipPos(et(e.lastLine())), function (e) {
            return e.parent
        })
    }

    function Lo(e) {
        for (var t = function (t) {
                var r = e[t],
                    n = [r.primary.doc];
                Oi(r.primary.doc, function (e) {
                    return n.push(e)
                });
                for (var i = 0; i < r.markers.length; i++) {
                    var o = r.markers[i]; - 1 == B(n, o.doc) && (o.parent = null, r.markers.splice(i--, 1))
                }
            }, r = 0; r < e.length; r++) t(r)
    }
    ko.prototype.clear = function () {
        if (!this.explicitlyCleared) {
            this.explicitlyCleared = !0;
            for (var e = 0; e < this.markers.length; ++e) this.markers[e].clear();
            ar(this, "clear")
        }
    }, ko.prototype.find = function (e, t) {
        return this.primary.find(e, t)
    }, be(ko);
    var To = 0,
        Mo = function (e, t, r, n, i) {
            if (!(this instanceof Mo)) return new Mo(e, t, r, n, i);
            null == r && (r = 0), mo.call(this, [new vo([new Xt("", null)])]), this.first = r, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.cleanGeneration = 1, this.modeFrontier = this.highlightFrontier = r;
            var o = et(r, 0);
            this.sel = xi(o), this.history = new Hi(null), this.id = ++To, this.modeOption = t, this.lineSep = n, this.direction = "rtl" == i ? "rtl" : "ltr", this.extend = !1, "string" == typeof e && (e = this.splitLines(e)), Ai(this, {
                from: o,
                to: o,
                text: e
            }), Yi(this, xi(o), G)
        };
    Mo.prototype = Q(mo.prototype, {
        constructor: Mo,
        iter: function (e, t, r) {
            r ? this.iterN(e - this.first, t - e, r) : this.iterN(this.first, this.first + this.size, e)
        },
        insert: function (e, t) {
            for (var r = 0, n = 0; n < t.length; ++n) r += t[n].height;
            this.insertInner(e - this.first, t, r)
        },
        remove: function (e, t) {
            this.removeInner(e - this.first, t)
        },
        getValue: function (e) {
            var t = _e(this, this.first, this.first + this.size);
            return !1 === e ? t : t.join(e || this.lineSeparator())
        },
        setValue: Jn(function (e) {
            var t = et(this.first, 0),
                r = this.first + this.size - 1;
            oo(this, {
                from: t,
                to: et(r, Xe(this, r).text.length),
                text: this.splitLines(e),
                origin: "setValue",
                full: !0
            }, !0), this.cm && On(this.cm, 0, 0), Yi(this, xi(t), G)
        }),
        replaceRange: function (e, t, r, n) {
            co(this, e, t = at(this, t), r = r ? at(this, r) : t, n)
        },
        getRange: function (e, t, r) {
            var n = $e(this, at(this, e), at(this, t));
            return !1 === r ? n : n.join(r || this.lineSeparator())
        },
        getLine: function (e) {
            var t = this.getLineHandle(e);
            return t && t.text
        },
        getLineHandle: function (e) {
            if (Qe(this, e)) return Xe(this, e)
        },
        getLineNumber: function (e) {
            return qe(e)
        },
        getLineHandleVisualStart: function (e) {
            return "number" == typeof e && (e = Xe(this, e)), zt(e)
        },
        lineCount: function () {
            return this.size
        },
        firstLine: function () {
            return this.first
        },
        lastLine: function () {
            return this.first + this.size - 1
        },
        clipPos: function (e) {
            return at(this, e)
        },
        getCursor: function (e) {
            var t = this.sel.primary();
            return null == e || "head" == e ? t.head : "anchor" == e ? t.anchor : "end" == e || "to" == e || !1 === e ? t.to() : t.from()
        },
        listSelections: function () {
            return this.sel.ranges
        },
        somethingSelected: function () {
            return this.sel.somethingSelected()
        },
        setCursor: Jn(function (e, t, r) {
            $i(this, at(this, "number" == typeof e ? et(e, t || 0) : e), null, r)
        }),
        setSelection: Jn(function (e, t, r) {
            $i(this, at(this, e), at(this, t || e), r)
        }),
        extendSelection: Jn(function (e, t, r) {
            Ui(this, at(this, e), t && at(this, t), r)
        }),
        extendSelections: Jn(function (e, t) {
            Ki(this, st(this, e), t)
        }),
        extendSelectionsBy: Jn(function (e, t) {
            Ki(this, st(this, q(this.sel.ranges, e)), t)
        }),
        setSelections: Jn(function (e, t, r) {
            if (e.length) {
                for (var n = [], i = 0; i < e.length; i++) n[i] = new bi(at(this, e[i].anchor), at(this, e[i].head));
                null == t && (t = Math.min(e.length - 1, this.sel.primIndex)), Yi(this, wi(this.cm, n, t), r)
            }
        }),
        addSelection: Jn(function (e, t, r) {
            var n = this.sel.ranges.slice(0);
            n.push(new bi(at(this, e), at(this, t || e))), Yi(this, wi(this.cm, n, n.length - 1), r)
        }),
        getSelection: function (e) {
            for (var t, r = this.sel.ranges, n = 0; n < r.length; n++) {
                var i = $e(this, r[n].from(), r[n].to());
                t = t ? t.concat(i) : i
            }
            return !1 === e ? t : t.join(e || this.lineSeparator())
        },
        getSelections: function (e) {
            for (var t = [], r = this.sel.ranges, n = 0; n < r.length; n++) {
                var i = $e(this, r[n].from(), r[n].to());
                !1 !== e && (i = i.join(e || this.lineSeparator())), t[n] = i
            }
            return t
        },
        replaceSelection: function (e, t, r) {
            for (var n = [], i = 0; i < this.sel.ranges.length; i++) n[i] = e;
            this.replaceSelections(n, t, r || "+input")
        },
        replaceSelections: Jn(function (e, t, r) {
            for (var n = [], i = this.sel, o = 0; o < i.ranges.length; o++) {
                var l = i.ranges[o];
                n[o] = {
                    from: l.from(),
                    to: l.to(),
                    text: this.splitLines(e[o]),
                    origin: r
                }
            }
            for (var a = t && "end" != t && function (e, t, r) {
                    for (var n = [], i = et(e.first, 0), o = i, l = 0; l < t.length; l++) {
                        var a = t[l],
                            s = Li(a.from, i, o),
                            u = Li(Ci(a), i, o);
                        if (i = a.to, o = u, "around" == r) {
                            var c = e.sel.ranges[l],
                                f = tt(c.head, c.anchor) < 0;
                            n[l] = new bi(f ? u : s, f ? s : u)
                        } else n[l] = new bi(s, s)
                    }
                    return new yi(n, e.sel.primIndex)
                }(this, n, t), s = n.length - 1; s >= 0; s--) oo(this, n[s]);
            a ? _i(this, a) : this.cm && An(this.cm)
        }),
        undo: Jn(function () {
            ao(this, "undo")
        }),
        redo: Jn(function () {
            ao(this, "redo")
        }),
        undoSelection: Jn(function () {
            ao(this, "undo", !0)
        }),
        redoSelection: Jn(function () {
            ao(this, "redo", !0)
        }),
        setExtending: function (e) {
            this.extend = e
        },
        getExtending: function () {
            return this.extend
        },
        historySize: function () {
            for (var e = this.history, t = 0, r = 0, n = 0; n < e.done.length; n++) e.done[n].ranges || ++t;
            for (var i = 0; i < e.undone.length; i++) e.undone[i].ranges || ++r;
            return {
                undo: t,
                redo: r
            }
        },
        clearHistory: function () {
            var e = this;
            this.history = new Hi(this.history.maxGeneration), Oi(this, function (t) {
                return t.history = e.history
            }, !0)
        },
        markClean: function () {
            this.cleanGeneration = this.changeGeneration(!0)
        },
        changeGeneration: function (e) {
            return e && (this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null), this.history.generation
        },
        isClean: function (e) {
            return this.history.generation == (e || this.cleanGeneration)
        },
        getHistory: function () {
            return {
                done: Vi(this.history.done),
                undone: Vi(this.history.undone)
            }
        },
        setHistory: function (e) {
            var t = this.history = new Hi(this.history.maxGeneration);
            t.done = Vi(e.done.slice(0), null, !0), t.undone = Vi(e.undone.slice(0), null, !0)
        },
        setGutterMarker: Jn(function (e, t, r) {
            return go(this, e, "gutter", function (e) {
                var n = e.gutterMarkers || (e.gutterMarkers = {});
                return n[t] = r, !r && re(n) && (e.gutterMarkers = null), !0
            })
        }),
        clearGutter: Jn(function (e) {
            var t = this;
            this.iter(function (r) {
                r.gutterMarkers && r.gutterMarkers[e] && go(t, r, "gutter", function () {
                    return r.gutterMarkers[e] = null, re(r.gutterMarkers) && (r.gutterMarkers = null), !0
                })
            })
        }),
        lineInfo: function (e) {
            var t;
            if ("number" == typeof e) {
                if (!Qe(this, e)) return null;
                if (t = e, !(e = Xe(this, e))) return null
            } else if (null == (t = qe(e))) return null;
            return {
                line: t,
                handle: e,
                text: e.text,
                gutterMarkers: e.gutterMarkers,
                textClass: e.textClass,
                bgClass: e.bgClass,
                wrapClass: e.wrapClass,
                widgets: e.widgets
            }
        },
        addLineClass: Jn(function (e, t, r) {
            return go(this, e, "gutter" == t ? "gutter" : "class", function (e) {
                var n = "text" == t ? "textClass" : "background" == t ? "bgClass" : "gutter" == t ? "gutterClass" : "wrapClass";
                if (e[n]) {
                    if (S(r).test(e[n])) return !1;
                    e[n] += " " + r
                } else e[n] = r;
                return !0
            })
        }),
        removeLineClass: Jn(function (e, t, r) {
            return go(this, e, "gutter" == t ? "gutter" : "class", function (e) {
                var n = "text" == t ? "textClass" : "background" == t ? "bgClass" : "gutter" == t ? "gutterClass" : "wrapClass",
                    i = e[n];
                if (!i) return !1;
                if (null == r) e[n] = null;
                else {
                    var o = i.match(S(r));
                    if (!o) return !1;
                    var l = o.index + o[0].length;
                    e[n] = i.slice(0, o.index) + (o.index && l != i.length ? " " : "") + i.slice(l) || null
                }
                return !0
            })
        }),
        addLineWidget: Jn(function (e, t, r) {
            return function (e, t, r, n) {
                var i = new yo(e, r, n),
                    o = e.cm;
                return o && i.noHScroll && (o.display.alignWidgets = !0), go(e, t, "widget", function (t) {
                    var r = t.widgets || (t.widgets = []);
                    if (null == i.insertAt ? r.push(i) : r.splice(Math.min(r.length - 1, Math.max(0, i.insertAt)), 0, i), i.line = t, o && !jt(e, t)) {
                        var n = Gt(t) < e.scrollTop;
                        Ye(t, t.height + wr(i)), n && Nn(o, i.height), o.curOp.forceUpdate = !0
                    }
                    return !0
                }), o && ar(o, "lineWidgetAdded", o, i, "number" == typeof t ? t : qe(t)), i
            }(this, e, t, r)
        }),
        removeLineWidget: function (e) {
            e.clear()
        },
        markText: function (e, t, r) {
            return Co(this, at(this, e), at(this, t), r, r && r.type || "range")
        },
        setBookmark: function (e, t) {
            var r = {
                replacedWith: t && (null == t.nodeType ? t.widget : t),
                insertLeft: t && t.insertLeft,
                clearWhenEmpty: !1,
                shared: t && t.shared,
                handleMouseEvents: t && t.handleMouseEvents
            };
            return Co(this, e = at(this, e), e, r, "bookmark")
        },
        findMarksAt: function (e) {
            var t = [],
                r = Xe(this, (e = at(this, e)).line).markedSpans;
            if (r)
                for (var n = 0; n < r.length; ++n) {
                    var i = r[n];
                    (null == i.from || i.from <= e.ch) && (null == i.to || i.to >= e.ch) && t.push(i.marker.parent || i.marker)
                }
            return t
        },
        findMarks: function (e, t, r) {
            e = at(this, e), t = at(this, t);
            var n = [],
                i = e.line;
            return this.iter(e.line, t.line + 1, function (o) {
                var l = o.markedSpans;
                if (l)
                    for (var a = 0; a < l.length; a++) {
                        var s = l[a];
                        null != s.to && i == e.line && e.ch >= s.to || null == s.from && i != e.line || null != s.from && i == t.line && s.from >= t.ch || r && !r(s.marker) || n.push(s.marker.parent || s.marker)
                    }++i
            }), n
        },
        getAllMarks: function () {
            var e = [];
            return this.iter(function (t) {
                var r = t.markedSpans;
                if (r)
                    for (var n = 0; n < r.length; ++n) null != r[n].from && e.push(r[n].marker)
            }), e
        },
        posFromIndex: function (e) {
            var t, r = this.first,
                n = this.lineSeparator().length;
            return this.iter(function (i) {
                var o = i.text.length + n;
                if (o > e) return t = e, !0;
                e -= o, ++r
            }), at(this, et(r, t))
        },
        indexFromPos: function (e) {
            var t = (e = at(this, e)).ch;
            if (e.line < this.first || e.ch < 0) return 0;
            var r = this.lineSeparator().length;
            return this.iter(this.first, e.line, function (e) {
                t += e.text.length + r
            }), t
        },
        copy: function (e) {
            var t = new Mo(_e(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep, this.direction);
            return t.scrollTop = this.scrollTop, t.scrollLeft = this.scrollLeft, t.sel = this.sel, t.extend = !1, e && (t.history.undoDepth = this.history.undoDepth, t.setHistory(this.getHistory())), t
        },
        linkedDoc: function (e) {
            e || (e = {});
            var t = this.first,
                r = this.first + this.size;
            null != e.from && e.from > t && (t = e.from), null != e.to && e.to < r && (r = e.to);
            var n = new Mo(_e(this, t, r), e.mode || this.modeOption, t, this.lineSep, this.direction);
            return e.sharedHist && (n.history = this.history), (this.linked || (this.linked = [])).push({
                    doc: n,
                    sharedHist: e.sharedHist
                }), n.linked = [{
                    doc: this,
                    isParent: !0,
                    sharedHist: e.sharedHist
                }],
                function (e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var n = t[r],
                            i = n.find(),
                            o = e.clipPos(i.from),
                            l = e.clipPos(i.to);
                        if (tt(o, l)) {
                            var a = Co(e, o, l, n.primary, n.primary.type);
                            n.markers.push(a), a.parent = n
                        }
                    }
                }(n, So(this)), n
        },
        unlinkDoc: function (e) {
            if (e instanceof kl && (e = e.doc), this.linked)
                for (var t = 0; t < this.linked.length; ++t) {
                    if (this.linked[t].doc == e) {
                        this.linked.splice(t, 1), e.unlinkDoc(this), Lo(So(this));
                        break
                    }
                }
            if (e.history == this.history) {
                var r = [e.id];
                Oi(e, function (e) {
                    return r.push(e.id)
                }, !0), e.history = new Hi(null), e.history.done = Vi(this.history.done, r), e.history.undone = Vi(this.history.undone, r)
            }
        },
        iterLinkedDocs: function (e) {
            Oi(this, e)
        },
        getMode: function () {
            return this.mode
        },
        getEditor: function () {
            return this.cm
        },
        splitLines: function (e) {
            return this.lineSep ? e.split(this.lineSep) : We(e)
        },
        lineSeparator: function () {
            return this.lineSep || "\n"
        },
        setDirection: Jn(function (e) {
            var t;
            ("rtl" != e && (e = "ltr"), e != this.direction) && (this.direction = e, this.iter(function (e) {
                return e.order = null
            }), this.cm && qn(t = this.cm, function () {
                Wi(t), un(t)
            }))
        })
    }), Mo.prototype.eachLine = Mo.prototype.iter;
    var No = 0;

    function Ao(e) {
        var t = this;
        if (Oo(t), !ve(t, e) && !xr(t.display, e)) {
            we(e), l && (No = +new Date);
            var r = an(t, e, !0),
                n = e.dataTransfer.files;
            if (r && !t.isReadOnly())
                if (n && n.length && window.FileReader && window.File)
                    for (var i = n.length, o = Array(i), a = 0, s = function () {
                            ++a == i && Zn(t, function () {
                                var e = {
                                    from: r = at(t.doc, r),
                                    to: r,
                                    text: t.doc.splitLines(o.filter(function (e) {
                                        return null != e
                                    }).join(t.doc.lineSeparator())),
                                    origin: "paste"
                                };
                                oo(t.doc, e), _i(t.doc, xi(at(t.doc, r), at(t.doc, Ci(e))))
                            })()
                        }, u = function (e, r) {
                            if (t.options.allowDropFileTypes && -1 == B(t.options.allowDropFileTypes, e.type)) s();
                            else {
                                var n = new FileReader;
                                n.onerror = function () {
                                    return s()
                                }, n.onload = function () {
                                    var e = n.result;
                                    /[\x00-\x08\x0e-\x1f]{2}/.test(e) ? s() : (o[r] = e, s())
                                }, n.readAsText(e)
                            }
                        }, c = 0; c < n.length; c++) u(n[c], c);
                else {
                    if (t.state.draggingText && t.doc.sel.contains(r) > -1) return t.state.draggingText(e), void setTimeout(function () {
                        return t.display.input.focus()
                    }, 20);
                    try {
                        var f = e.dataTransfer.getData("Text");
                        if (f) {
                            var h;
                            if (t.state.draggingText && !t.state.draggingText.copy && (h = t.listSelections()), qi(t.doc, xi(r, r)), h)
                                for (var d = 0; d < h.length; ++d) co(t.doc, "", h[d].anchor, h[d].head, "drag");
                            t.replaceSelection(f, "around", "paste"), t.display.input.focus()
                        }
                    } catch (e) {}
                }
        }
    }

    function Oo(e) {
        e.display.dragCursor && (e.display.lineSpace.removeChild(e.display.dragCursor), e.display.dragCursor = null)
    }

    function Do(e) {
        if (document.getElementsByClassName) {
            for (var t = document.getElementsByClassName("CodeMirror"), r = [], n = 0; n < t.length; n++) {
                var i = t[n].CodeMirror;
                i && r.push(i)
            }
            r.length && r[0].operation(function () {
                for (var t = 0; t < r.length; t++) e(r[t])
            })
        }
    }
    var Wo = !1;

    function Ho() {
        var e;
        Wo || (he(window, "resize", function () {
            null == e && (e = setTimeout(function () {
                e = null, Do(Eo)
            }, 100))
        }), he(window, "blur", function () {
            return Do(kn)
        }), Wo = !0)
    }

    function Eo(e) {
        var t = e.display;
        t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null, t.scrollbarsClipped = !1, e.setSize()
    }
    for (var Fo = {
            3: "Pause",
            8: "Backspace",
            9: "Tab",
            13: "Enter",
            16: "Shift",
            17: "Ctrl",
            18: "Alt",
            19: "Pause",
            20: "CapsLock",
            27: "Esc",
            32: "Space",
            33: "PageUp",
            34: "PageDown",
            35: "End",
            36: "Home",
            37: "Left",
            38: "Up",
            39: "Right",
            40: "Down",
            44: "PrintScrn",
            45: "Insert",
            46: "Delete",
            59: ";",
            61: "=",
            91: "Mod",
            92: "Mod",
            93: "Mod",
            106: "*",
            107: "=",
            109: "-",
            110: ".",
            111: "/",
            145: "ScrollLock",
            173: "-",
            186: ";",
            187: "=",
            188: ",",
            189: "-",
            190: ".",
            191: "/",
            192: "`",
            219: "[",
            220: "\\",
            221: "]",
            222: "'",
            224: "Mod",
            63232: "Up",
            63233: "Down",
            63234: "Left",
            63235: "Right",
            63272: "Delete",
            63273: "Home",
            63275: "End",
            63276: "PageUp",
            63277: "PageDown",
            63302: "Insert"
        }, Po = 0; Po < 10; Po++) Fo[Po + 48] = Fo[Po + 96] = String(Po);
    for (var Io = 65; Io <= 90; Io++) Fo[Io] = String.fromCharCode(Io);
    for (var zo = 1; zo <= 12; zo++) Fo[zo + 111] = Fo[zo + 63235] = "F" + zo;
    var Ro = {};

    function Bo(e) {
        var t, r, n, i, o = e.split(/-(?!$)/);
        e = o[o.length - 1];
        for (var l = 0; l < o.length - 1; l++) {
            var a = o[l];
            if (/^(cmd|meta|m)$/i.test(a)) i = !0;
            else if (/^a(lt)?$/i.test(a)) t = !0;
            else if (/^(c|ctrl|control)$/i.test(a)) r = !0;
            else {
                if (!/^s(hift)?$/i.test(a)) throw new Error("Unrecognized modifier name: " + a);
                n = !0
            }
        }
        return t && (e = "Alt-" + e), r && (e = "Ctrl-" + e), i && (e = "Cmd-" + e), n && (e = "Shift-" + e), e
    }

    function jo(e) {
        var t = {};
        for (var r in e)
            if (e.hasOwnProperty(r)) {
                var n = e[r];
                if (/^(name|fallthrough|(de|at)tach)$/.test(r)) continue;
                if ("..." == n) {
                    delete e[r];
                    continue
                }
                for (var i = q(r.split(" "), Bo), o = 0; o < i.length; o++) {
                    var l = void 0,
                        a = void 0;
                    o == i.length - 1 ? (a = i.join(" "), l = n) : (a = i.slice(0, o + 1).join(" "), l = "...");
                    var s = t[a];
                    if (s) {
                        if (s != l) throw new Error("Inconsistent bindings for " + a)
                    } else t[a] = l
                }
                delete e[r]
            } for (var u in t) e[u] = t[u];
        return e
    }

    function Vo(e, t, r, n) {
        var i = (t = Xo(t)).call ? t.call(e, n) : t[e];
        if (!1 === i) return "nothing";
        if ("..." === i) return "multi";
        if (null != i && r(i)) return "handled";
        if (t.fallthrough) {
            if ("[object Array]" != Object.prototype.toString.call(t.fallthrough)) return Vo(e, t.fallthrough, r, n);
            for (var o = 0; o < t.fallthrough.length; o++) {
                var l = Vo(e, t.fallthrough[o], r, n);
                if (l) return l
            }
        }
    }

    function Go(e) {
        var t = "string" == typeof e ? e : Fo[e.keyCode];
        return "Ctrl" == t || "Alt" == t || "Shift" == t || "Mod" == t
    }

    function Uo(e, t, r) {
        var n = e;
        return t.altKey && "Alt" != n && (e = "Alt-" + e), (C ? t.metaKey : t.ctrlKey) && "Ctrl" != n && (e = "Ctrl-" + e), (C ? t.ctrlKey : t.metaKey) && "Mod" != n && (e = "Cmd-" + e), !r && t.shiftKey && "Shift" != n && (e = "Shift-" + e), e
    }

    function Ko(e, t) {
        if (f && 34 == e.keyCode && e.char) return !1;
        var r = Fo[e.keyCode];
        return null != r && !e.altGraphKey && (3 == e.keyCode && e.code && (r = e.code), Uo(r, e, t))
    }

    function Xo(e) {
        return "string" == typeof e ? Ro[e] : e
    }

    function $o(e, t) {
        for (var r = e.doc.sel.ranges, n = [], i = 0; i < r.length; i++) {
            for (var o = t(r[i]); n.length && tt(o.from, Y(n).to) <= 0;) {
                var l = n.pop();
                if (tt(l.from, o.from) < 0) {
                    o.from = l.from;
                    break
                }
            }
            n.push(o)
        }
        qn(e, function () {
            for (var t = n.length - 1; t >= 0; t--) co(e.doc, "", n[t].from, n[t].to, "+delete");
            An(e)
        })
    }

    function _o(e, t, r) {
        var n = oe(e.text, t + r, r);
        return n < 0 || n > e.text.length ? null : n
    }

    function Yo(e, t, r) {
        var n = _o(e, t.ch, r);
        return null == n ? null : new et(t.line, n, r < 0 ? "after" : "before")
    }

    function qo(e, t, r, n, i) {
        if (e) {
            "rtl" == t.doc.direction && (i = -i);
            var o = ce(r, t.doc.direction);
            if (o) {
                var l, a = i < 0 ? Y(o) : o[0],
                    s = i < 0 == (1 == a.level) ? "after" : "before";
                if (a.level > 0 || "rtl" == t.doc.direction) {
                    var u = Dr(t, r);
                    l = i < 0 ? r.text.length - 1 : 0;
                    var c = Wr(t, u, l).top;
                    l = le(function (e) {
                        return Wr(t, u, e).top == c
                    }, i < 0 == (1 == a.level) ? a.from : a.to - 1, l), "before" == s && (l = _o(r, l, 1))
                } else l = i < 0 ? a.to : a.from;
                return new et(n, l, s)
            }
        }
        return new et(n, i < 0 ? r.text.length : 0, i < 0 ? "before" : "after")
    }
    Ro.basic = {
        Left: "goCharLeft",
        Right: "goCharRight",
        Up: "goLineUp",
        Down: "goLineDown",
        End: "goLineEnd",
        Home: "goLineStartSmart",
        PageUp: "goPageUp",
        PageDown: "goPageDown",
        Delete: "delCharAfter",
        Backspace: "delCharBefore",
        "Shift-Backspace": "delCharBefore",
        Tab: "defaultTab",
        "Shift-Tab": "indentAuto",
        Enter: "newlineAndIndent",
        Insert: "toggleOverwrite",
        Esc: "singleSelection"
    }, Ro.pcDefault = {
        "Ctrl-A": "selectAll",
        "Ctrl-D": "deleteLine",
        "Ctrl-Z": "undo",
        "Shift-Ctrl-Z": "redo",
        "Ctrl-Y": "redo",
        "Ctrl-Home": "goDocStart",
        "Ctrl-End": "goDocEnd",
        "Ctrl-Up": "goLineUp",
        "Ctrl-Down": "goLineDown",
        "Ctrl-Left": "goGroupLeft",
        "Ctrl-Right": "goGroupRight",
        "Alt-Left": "goLineStart",
        "Alt-Right": "goLineEnd",
        "Ctrl-Backspace": "delGroupBefore",
        "Ctrl-Delete": "delGroupAfter",
        "Ctrl-S": "save",
        "Ctrl-F": "find",
        "Ctrl-G": "findNext",
        "Shift-Ctrl-G": "findPrev",
        "Shift-Ctrl-F": "replace",
        "Shift-Ctrl-R": "replaceAll",
        "Ctrl-[": "indentLess",
        "Ctrl-]": "indentMore",
        "Ctrl-U": "undoSelection",
        "Shift-Ctrl-U": "redoSelection",
        "Alt-U": "redoSelection",
        fallthrough: "basic"
    }, Ro.emacsy = {
        "Ctrl-F": "goCharRight",
        "Ctrl-B": "goCharLeft",
        "Ctrl-P": "goLineUp",
        "Ctrl-N": "goLineDown",
        "Alt-F": "goWordRight",
        "Alt-B": "goWordLeft",
        "Ctrl-A": "goLineStart",
        "Ctrl-E": "goLineEnd",
        "Ctrl-V": "goPageDown",
        "Shift-Ctrl-V": "goPageUp",
        "Ctrl-D": "delCharAfter",
        "Ctrl-H": "delCharBefore",
        "Alt-D": "delWordAfter",
        "Alt-Backspace": "delWordBefore",
        "Ctrl-K": "killLine",
        "Ctrl-T": "transposeChars",
        "Ctrl-O": "openLine"
    }, Ro.macDefault = {
        "Cmd-A": "selectAll",
        "Cmd-D": "deleteLine",
        "Cmd-Z": "undo",
        "Shift-Cmd-Z": "redo",
        "Cmd-Y": "redo",
        "Cmd-Home": "goDocStart",
        "Cmd-Up": "goDocStart",
        "Cmd-End": "goDocEnd",
        "Cmd-Down": "goDocEnd",
        "Alt-Left": "goGroupLeft",
        "Alt-Right": "goGroupRight",
        "Cmd-Left": "goLineLeft",
        "Cmd-Right": "goLineRight",
        "Alt-Backspace": "delGroupBefore",
        "Ctrl-Alt-Backspace": "delGroupAfter",
        "Alt-Delete": "delGroupAfter",
        "Cmd-S": "save",
        "Cmd-F": "find",
        "Cmd-G": "findNext",
        "Shift-Cmd-G": "findPrev",
        "Cmd-Alt-F": "replace",
        "Shift-Cmd-Alt-F": "replaceAll",
        "Cmd-[": "indentLess",
        "Cmd-]": "indentMore",
        "Cmd-Backspace": "delWrappedLineLeft",
        "Cmd-Delete": "delWrappedLineRight",
        "Cmd-U": "undoSelection",
        "Shift-Cmd-U": "redoSelection",
        "Ctrl-Up": "goDocStart",
        "Ctrl-Down": "goDocEnd",
        fallthrough: ["basic", "emacsy"]
    }, Ro.default = y ? Ro.macDefault : Ro.pcDefault;
    var Zo = {
        selectAll: no,
        singleSelection: function (e) {
            return e.setSelection(e.getCursor("anchor"), e.getCursor("head"), G)
        },
        killLine: function (e) {
            return $o(e, function (t) {
                if (t.empty()) {
                    var r = Xe(e.doc, t.head.line).text.length;
                    return t.head.ch == r && t.head.line < e.lastLine() ? {
                        from: t.head,
                        to: et(t.head.line + 1, 0)
                    } : {
                        from: t.head,
                        to: et(t.head.line, r)
                    }
                }
                return {
                    from: t.from(),
                    to: t.to()
                }
            })
        },
        deleteLine: function (e) {
            return $o(e, function (t) {
                return {
                    from: et(t.from().line, 0),
                    to: at(e.doc, et(t.to().line + 1, 0))
                }
            })
        },
        delLineLeft: function (e) {
            return $o(e, function (e) {
                return {
                    from: et(e.from().line, 0),
                    to: e.from()
                }
            })
        },
        delWrappedLineLeft: function (e) {
            return $o(e, function (t) {
                var r = e.charCoords(t.head, "div").top + 5;
                return {
                    from: e.coordsChar({
                        left: 0,
                        top: r
                    }, "div"),
                    to: t.from()
                }
            })
        },
        delWrappedLineRight: function (e) {
            return $o(e, function (t) {
                var r = e.charCoords(t.head, "div").top + 5,
                    n = e.coordsChar({
                        left: e.display.lineDiv.offsetWidth + 100,
                        top: r
                    }, "div");
                return {
                    from: t.from(),
                    to: n
                }
            })
        },
        undo: function (e) {
            return e.undo()
        },
        redo: function (e) {
            return e.redo()
        },
        undoSelection: function (e) {
            return e.undoSelection()
        },
        redoSelection: function (e) {
            return e.redoSelection()
        },
        goDocStart: function (e) {
            return e.extendSelection(et(e.firstLine(), 0))
        },
        goDocEnd: function (e) {
            return e.extendSelection(et(e.lastLine()))
        },
        goLineStart: function (e) {
            return e.extendSelectionsBy(function (t) {
                return Qo(e, t.head.line)
            }, {
                origin: "+move",
                bias: 1
            })
        },
        goLineStartSmart: function (e) {
            return e.extendSelectionsBy(function (t) {
                return Jo(e, t.head)
            }, {
                origin: "+move",
                bias: 1
            })
        },
        goLineEnd: function (e) {
            return e.extendSelectionsBy(function (t) {
                return function (e, t) {
                    var r = Xe(e.doc, t),
                        n = function (e) {
                            for (var t; t = Ft(e);) e = t.find(1, !0).line;
                            return e
                        }(r);
                    n != r && (t = qe(n));
                    return qo(!0, e, r, t, -1)
                }(e, t.head.line)
            }, {
                origin: "+move",
                bias: -1
            })
        },
        goLineRight: function (e) {
            return e.extendSelectionsBy(function (t) {
                var r = e.cursorCoords(t.head, "div").top + 5;
                return e.coordsChar({
                    left: e.display.lineDiv.offsetWidth + 100,
                    top: r
                }, "div")
            }, K)
        },
        goLineLeft: function (e) {
            return e.extendSelectionsBy(function (t) {
                var r = e.cursorCoords(t.head, "div").top + 5;
                return e.coordsChar({
                    left: 0,
                    top: r
                }, "div")
            }, K)
        },
        goLineLeftSmart: function (e) {
            return e.extendSelectionsBy(function (t) {
                var r = e.cursorCoords(t.head, "div").top + 5,
                    n = e.coordsChar({
                        left: 0,
                        top: r
                    }, "div");
                return n.ch < e.getLine(n.line).search(/\S/) ? Jo(e, t.head) : n
            }, K)
        },
        goLineUp: function (e) {
            return e.moveV(-1, "line")
        },
        goLineDown: function (e) {
            return e.moveV(1, "line")
        },
        goPageUp: function (e) {
            return e.moveV(-1, "page")
        },
        goPageDown: function (e) {
            return e.moveV(1, "page")
        },
        goCharLeft: function (e) {
            return e.moveH(-1, "char")
        },
        goCharRight: function (e) {
            return e.moveH(1, "char")
        },
        goColumnLeft: function (e) {
            return e.moveH(-1, "column")
        },
        goColumnRight: function (e) {
            return e.moveH(1, "column")
        },
        goWordLeft: function (e) {
            return e.moveH(-1, "word")
        },
        goGroupRight: function (e) {
            return e.moveH(1, "group")
        },
        goGroupLeft: function (e) {
            return e.moveH(-1, "group")
        },
        goWordRight: function (e) {
            return e.moveH(1, "word")
        },
        delCharBefore: function (e) {
            return e.deleteH(-1, "char")
        },
        delCharAfter: function (e) {
            return e.deleteH(1, "char")
        },
        delWordBefore: function (e) {
            return e.deleteH(-1, "word")
        },
        delWordAfter: function (e) {
            return e.deleteH(1, "word")
        },
        delGroupBefore: function (e) {
            return e.deleteH(-1, "group")
        },
        delGroupAfter: function (e) {
            return e.deleteH(1, "group")
        },
        indentAuto: function (e) {
            return e.indentSelection("smart")
        },
        indentMore: function (e) {
            return e.indentSelection("add")
        },
        indentLess: function (e) {
            return e.indentSelection("subtract")
        },
        insertTab: function (e) {
            return e.replaceSelection("\t")
        },
        insertSoftTab: function (e) {
            for (var t = [], r = e.listSelections(), n = e.options.tabSize, i = 0; i < r.length; i++) {
                var o = r[i].from(),
                    l = z(e.getLine(o.line), o.ch, n);
                t.push(_(n - l % n))
            }
            e.replaceSelections(t)
        },
        defaultTab: function (e) {
            e.somethingSelected() ? e.indentSelection("add") : e.execCommand("insertTab")
        },
        transposeChars: function (e) {
            return qn(e, function () {
                for (var t = e.listSelections(), r = [], n = 0; n < t.length; n++)
                    if (t[n].empty()) {
                        var i = t[n].head,
                            o = Xe(e.doc, i.line).text;
                        if (o)
                            if (i.ch == o.length && (i = new et(i.line, i.ch - 1)), i.ch > 0) i = new et(i.line, i.ch + 1), e.replaceRange(o.charAt(i.ch - 1) + o.charAt(i.ch - 2), et(i.line, i.ch - 2), i, "+transpose");
                            else if (i.line > e.doc.first) {
                            var l = Xe(e.doc, i.line - 1).text;
                            l && (i = new et(i.line, 1), e.replaceRange(o.charAt(0) + e.doc.lineSeparator() + l.charAt(l.length - 1), et(i.line - 1, l.length - 1), i, "+transpose"))
                        }
                        r.push(new bi(i, i))
                    } e.setSelections(r)
            })
        },
        newlineAndIndent: function (e) {
            return qn(e, function () {
                for (var t = e.listSelections(), r = t.length - 1; r >= 0; r--) e.replaceRange(e.doc.lineSeparator(), t[r].anchor, t[r].head, "+input");
                t = e.listSelections();
                for (var n = 0; n < t.length; n++) e.indentLine(t[n].from().line, null, !0);
                An(e)
            })
        },
        openLine: function (e) {
            return e.replaceSelection("\n", "start")
        },
        toggleOverwrite: function (e) {
            return e.toggleOverwrite()
        }
    };

    function Qo(e, t) {
        var r = Xe(e.doc, t),
            n = zt(r);
        return n != r && (t = qe(n)), qo(!0, e, n, t, 1)
    }

    function Jo(e, t) {
        var r = Qo(e, t.line),
            n = Xe(e.doc, r.line),
            i = ce(n, e.doc.direction);
        if (!i || 0 == i[0].level) {
            var o = Math.max(r.ch, n.text.search(/\S/)),
                l = t.line == r.line && t.ch <= o && t.ch;
            return et(r.line, l ? 0 : o, r.sticky)
        }
        return r
    }

    function el(e, t, r) {
        if ("string" == typeof t && !(t = Zo[t])) return !1;
        e.display.input.ensurePolled();
        var n = e.display.shift,
            i = !1;
        try {
            e.isReadOnly() && (e.state.suppressEdits = !0), r && (e.display.shift = !1), i = t(e) != V
        } finally {
            e.display.shift = n, e.state.suppressEdits = !1
        }
        return i
    }
    var tl = new R;

    function rl(e, t, r, n) {
        var i = e.state.keySeq;
        if (i) {
            if (Go(t)) return "handled";
            if (/\'$/.test(t) ? e.state.keySeq = null : tl.set(50, function () {
                    e.state.keySeq == i && (e.state.keySeq = null, e.display.input.reset())
                }), nl(e, i + " " + t, r, n)) return !0
        }
        return nl(e, t, r, n)
    }

    function nl(e, t, r, n) {
        var i = function (e, t, r) {
            for (var n = 0; n < e.state.keyMaps.length; n++) {
                var i = Vo(t, e.state.keyMaps[n], r, e);
                if (i) return i
            }
            return e.options.extraKeys && Vo(t, e.options.extraKeys, r, e) || Vo(t, e.options.keyMap, r, e)
        }(e, t, n);
        return "multi" == i && (e.state.keySeq = t), "handled" == i && ar(e, "keyHandled", e, t, r), "handled" != i && "multi" != i || (we(r), bn(e)), !!i
    }

    function il(e, t) {
        var r = Ko(t, !0);
        return !!r && (t.shiftKey && !e.state.keySeq ? rl(e, "Shift-" + r, t, function (t) {
            return el(e, t, !0)
        }) || rl(e, r, t, function (t) {
            if ("string" == typeof t ? /^go[A-Z]/.test(t) : t.motion) return el(e, t)
        }) : rl(e, r, t, function (t) {
            return el(e, t)
        }))
    }
    var ol = null;

    function ll(e) {
        var t = this;
        if (!(e.target && e.target != t.display.input.getField() || (t.curOp.focus = W(), ve(t, e)))) {
            l && a < 11 && 27 == e.keyCode && (e.returnValue = !1);
            var n = e.keyCode;
            t.display.shift = 16 == n || e.shiftKey;
            var i = il(t, e);
            f && (ol = i ? n : null, !i && 88 == n && !Ee && (y ? e.metaKey : e.ctrlKey) && t.replaceSelection("", null, "cut")), r && !y && !i && 46 == n && e.shiftKey && !e.ctrlKey && document.execCommand && document.execCommand("cut"), 18 != n || /\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) || function (e) {
                var t = e.display.lineDiv;

                function r(e) {
                    18 != e.keyCode && e.altKey || (T(t, "CodeMirror-crosshair"), pe(document, "keyup", r), pe(document, "mouseover", r))
                }
                H(t, "CodeMirror-crosshair"), he(document, "keyup", r), he(document, "mouseover", r)
            }(t)
        }
    }

    function al(e) {
        16 == e.keyCode && (this.doc.sel.shift = !1), ve(this, e)
    }

    function sl(e) {
        var t = this;
        if (!(e.target && e.target != t.display.input.getField() || xr(t.display, e) || ve(t, e) || e.ctrlKey && !e.altKey || y && e.metaKey)) {
            var r = e.keyCode,
                n = e.charCode;
            if (f && r == ol) return ol = null, void we(e);
            if (!f || e.which && !(e.which < 10) || !il(t, e)) {
                var i = String.fromCharCode(null == n ? r : n);
                "\b" != i && (function (e, t, r) {
                    return rl(e, "'" + r + "'", t, function (t) {
                        return el(e, t, !0)
                    })
                }(t, e, i) || t.display.input.onKeyPress(e))
            }
        }
    }
    var ul, cl, fl = function (e, t, r) {
        this.time = e, this.pos = t, this.button = r
    };

    function hl(e) {
        var t = this,
            r = t.display;
        if (!(ve(t, e) || r.activeTouch && r.input.supportsTouch()))
            if (r.input.ensurePolled(), r.shift = e.shiftKey, xr(r, e)) s || (r.scroller.draggable = !1, setTimeout(function () {
                return r.scroller.draggable = !0
            }, 100));
            else if (!gl(t, e)) {
            var n = an(t, e),
                i = Le(e),
                o = n ? function (e, t) {
                    var r = +new Date;
                    return cl && cl.compare(r, e, t) ? (ul = cl = null, "triple") : ul && ul.compare(r, e, t) ? (cl = new fl(r, e, t), ul = null, "double") : (ul = new fl(r, e, t), cl = null, "single")
                }(n, i) : "single";
            window.focus(), 1 == i && t.state.selectingText && t.state.selectingText(e), n && function (e, t, r, n, i) {
                var o = "Click";
                "double" == n ? o = "Double" + o : "triple" == n && (o = "Triple" + o);
                return rl(e, Uo(o = (1 == t ? "Left" : 2 == t ? "Middle" : "Right") + o, i), i, function (t) {
                    if ("string" == typeof t && (t = Zo[t]), !t) return !1;
                    var n = !1;
                    try {
                        e.isReadOnly() && (e.state.suppressEdits = !0), n = t(e, r) != V
                    } finally {
                        e.state.suppressEdits = !1
                    }
                    return n
                })
            }(t, i, n, o, e) || (1 == i ? n ? function (e, t, r, n) {
                l ? setTimeout(P(wn, e), 0) : e.curOp.focus = W();
                var i, o = function (e, t, r) {
                        var n = e.getOption("configureMouse"),
                            i = n ? n(e, t, r) : {};
                        if (null == i.unit) {
                            var o = b ? r.shiftKey && r.metaKey : r.altKey;
                            i.unit = o ? "rectangle" : "single" == t ? "char" : "double" == t ? "word" : "line"
                        }(null == i.extend || e.doc.extend) && (i.extend = e.doc.extend || r.shiftKey);
                        null == i.addNew && (i.addNew = y ? r.metaKey : r.ctrlKey);
                        null == i.moveOnDrag && (i.moveOnDrag = !(y ? r.altKey : r.ctrlKey));
                        return i
                    }(e, r, n),
                    u = e.doc.sel;
                e.options.dragDrop && Ne && !e.isReadOnly() && "single" == r && (i = u.contains(t)) > -1 && (tt((i = u.ranges[i]).from(), t) < 0 || t.xRel > 0) && (tt(i.to(), t) > 0 || t.xRel < 0) ? function (e, t, r, n) {
                    var i = e.display,
                        o = !1,
                        u = Zn(e, function (t) {
                            s && (i.scroller.draggable = !1), e.state.draggingText = !1, pe(i.wrapper.ownerDocument, "mouseup", u), pe(i.wrapper.ownerDocument, "mousemove", c), pe(i.scroller, "dragstart", f), pe(i.scroller, "drop", u), o || (we(t), n.addNew || Ui(e.doc, r, null, null, n.extend), s && !h || l && 9 == a ? setTimeout(function () {
                                i.wrapper.ownerDocument.body.focus({
                                    preventScroll: !0
                                }), i.input.focus()
                            }, 20) : i.input.focus())
                        }),
                        c = function (e) {
                            o = o || Math.abs(t.clientX - e.clientX) + Math.abs(t.clientY - e.clientY) >= 10
                        },
                        f = function () {
                            return o = !0
                        };
                    s && (i.scroller.draggable = !0);
                    e.state.draggingText = u, u.copy = !n.moveOnDrag, i.scroller.dragDrop && i.scroller.dragDrop();
                    he(i.wrapper.ownerDocument, "mouseup", u), he(i.wrapper.ownerDocument, "mousemove", c), he(i.scroller, "dragstart", f), he(i.scroller, "drop", u), xn(e), setTimeout(function () {
                        return i.input.focus()
                    }, 20)
                }(e, n, t, o) : function (e, t, r, n) {
                    var i = e.display,
                        o = e.doc;
                    we(t);
                    var l, a, s = o.sel,
                        u = s.ranges;
                    n.addNew && !n.extend ? (a = o.sel.contains(r), l = a > -1 ? u[a] : new bi(r, r)) : (l = o.sel.primary(), a = o.sel.primIndex);
                    if ("rectangle" == n.unit) n.addNew || (l = new bi(r, r)), r = an(e, t, !0, !0), a = -1;
                    else {
                        var c = dl(e, r, n.unit);
                        l = n.extend ? Gi(l, c.anchor, c.head, n.extend) : c
                    }
                    n.addNew ? -1 == a ? (a = u.length, Yi(o, wi(e, u.concat([l]), a), {
                        scroll: !1,
                        origin: "*mouse"
                    })) : u.length > 1 && u[a].empty() && "char" == n.unit && !n.extend ? (Yi(o, wi(e, u.slice(0, a).concat(u.slice(a + 1)), 0), {
                        scroll: !1,
                        origin: "*mouse"
                    }), s = o.sel) : Xi(o, a, l, U) : (a = 0, Yi(o, new yi([l], 0), U), s = o.sel);
                    var f = r;

                    function h(t) {
                        if (0 != tt(f, t))
                            if (f = t, "rectangle" == n.unit) {
                                for (var i = [], u = e.options.tabSize, c = z(Xe(o, r.line).text, r.ch, u), h = z(Xe(o, t.line).text, t.ch, u), d = Math.min(c, h), p = Math.max(c, h), g = Math.min(r.line, t.line), v = Math.min(e.lastLine(), Math.max(r.line, t.line)); g <= v; g++) {
                                    var m = Xe(o, g).text,
                                        y = X(m, d, u);
                                    d == p ? i.push(new bi(et(g, y), et(g, y))) : m.length > y && i.push(new bi(et(g, y), et(g, X(m, p, u))))
                                }
                                i.length || i.push(new bi(r, r)), Yi(o, wi(e, s.ranges.slice(0, a).concat(i), a), {
                                    origin: "*mouse",
                                    scroll: !1
                                }), e.scrollIntoView(t)
                            } else {
                                var b, w = l,
                                    x = dl(e, t, n.unit),
                                    C = w.anchor;
                                tt(x.anchor, C) > 0 ? (b = x.head, C = ot(w.from(), x.anchor)) : (b = x.anchor, C = it(w.to(), x.head));
                                var k = s.ranges.slice(0);
                                k[a] = function (e, t) {
                                    var r = t.anchor,
                                        n = t.head,
                                        i = Xe(e.doc, r.line);
                                    if (0 == tt(r, n) && r.sticky == n.sticky) return t;
                                    var o = ce(i);
                                    if (!o) return t;
                                    var l = se(o, r.ch, r.sticky),
                                        a = o[l];
                                    if (a.from != r.ch && a.to != r.ch) return t;
                                    var s, u = l + (a.from == r.ch == (1 != a.level) ? 0 : 1);
                                    if (0 == u || u == o.length) return t;
                                    if (n.line != r.line) s = (n.line - r.line) * ("ltr" == e.doc.direction ? 1 : -1) > 0;
                                    else {
                                        var c = se(o, n.ch, n.sticky),
                                            f = c - l || (n.ch - r.ch) * (1 == a.level ? -1 : 1);
                                        s = c == u - 1 || c == u ? f < 0 : f > 0
                                    }
                                    var h = o[u + (s ? -1 : 0)],
                                        d = s == (1 == h.level),
                                        p = d ? h.from : h.to,
                                        g = d ? "after" : "before";
                                    return r.ch == p && r.sticky == g ? t : new bi(new et(r.line, p, g), n)
                                }(e, new bi(at(o, C), b)), Yi(o, wi(e, k, a), U)
                            }
                    }
                    var d = i.wrapper.getBoundingClientRect(),
                        p = 0;

                    function g(t) {
                        e.state.selectingText = !1, p = 1 / 0, t && (we(t), i.input.focus()), pe(i.wrapper.ownerDocument, "mousemove", v), pe(i.wrapper.ownerDocument, "mouseup", m), o.history.lastSelOrigin = null
                    }
                    var v = Zn(e, function (t) {
                            0 !== t.buttons && Le(t) ? function t(r) {
                                var l = ++p;
                                var a = an(e, r, !0, "rectangle" == n.unit);
                                if (!a) return;
                                if (0 != tt(a, f)) {
                                    e.curOp.focus = W(), h(a);
                                    var s = Tn(i, o);
                                    (a.line >= s.to || a.line < s.from) && setTimeout(Zn(e, function () {
                                        p == l && t(r)
                                    }), 150)
                                } else {
                                    var u = r.clientY < d.top ? -20 : r.clientY > d.bottom ? 20 : 0;
                                    u && setTimeout(Zn(e, function () {
                                        p == l && (i.scroller.scrollTop += u, t(r))
                                    }), 50)
                                }
                            }(t) : g(t)
                        }),
                        m = Zn(e, g);
                    e.state.selectingText = m, he(i.wrapper.ownerDocument, "mousemove", v), he(i.wrapper.ownerDocument, "mouseup", m)
                }(e, n, t, o)
            }(t, n, o, e) : Se(e) == r.scroller && we(e) : 2 == i ? (n && Ui(t.doc, n), setTimeout(function () {
                return r.input.focus()
            }, 20)) : 3 == i && (k ? t.display.input.onContextMenu(e) : xn(t)))
        }
    }

    function dl(e, t, r) {
        if ("char" == r) return new bi(t, t);
        if ("word" == r) return e.findWordAt(t);
        if ("line" == r) return new bi(et(t.line, 0), at(e.doc, et(t.line + 1, 0)));
        var n = r(e, t);
        return new bi(n.from, n.to)
    }

    function pl(e, t, r, n) {
        var i, o;
        if (t.touches) i = t.touches[0].clientX, o = t.touches[0].clientY;
        else try {
            i = t.clientX, o = t.clientY
        } catch (e) {
            return !1
        }
        if (i >= Math.floor(e.display.gutters.getBoundingClientRect().right)) return !1;
        n && we(t);
        var l = e.display,
            a = l.lineDiv.getBoundingClientRect();
        if (o > a.bottom || !ye(e, r)) return Ce(t);
        o -= a.top - l.viewOffset;
        for (var s = 0; s < e.display.gutterSpecs.length; ++s) {
            var u = l.gutters.childNodes[s];
            if (u && u.getBoundingClientRect().right >= i) return ge(e, r, e, Ze(e.doc, o), e.display.gutterSpecs[s].className, t), Ce(t)
        }
    }

    function gl(e, t) {
        return pl(e, t, "gutterClick", !0)
    }

    function vl(e, t) {
        xr(e.display, t) || function (e, t) {
            if (!ye(e, "gutterContextMenu")) return !1;
            return pl(e, t, "gutterContextMenu", !1)
        }(e, t) || ve(e, t, "contextmenu") || k || e.display.input.onContextMenu(t)
    }

    function ml(e) {
        e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), Rr(e)
    }
    fl.prototype.compare = function (e, t, r) {
        return this.time + 400 > e && 0 == tt(t, this.pos) && r == this.button
    };
    var yl = {
            toString: function () {
                return "CodeMirror.Init"
            }
        },
        bl = {},
        wl = {};

    function xl(e, t, r) {
        if (!t != !(r && r != yl)) {
            var n = e.display.dragFunctions,
                i = t ? he : pe;
            i(e.display.scroller, "dragstart", n.start), i(e.display.scroller, "dragenter", n.enter), i(e.display.scroller, "dragover", n.over), i(e.display.scroller, "dragleave", n.leave), i(e.display.scroller, "drop", n.drop)
        }
    }

    function Cl(e) {
        e.options.lineWrapping ? (H(e.display.wrapper, "CodeMirror-wrap"), e.display.sizer.style.minWidth = "", e.display.sizerWidth = null) : (T(e.display.wrapper, "CodeMirror-wrap"), Kt(e)), ln(e), un(e), Rr(e), setTimeout(function () {
            return Rn(e)
        }, 100)
    }

    function kl(e, t) {
        var n = this;
        if (!(this instanceof kl)) return new kl(e, t);
        this.options = t = t ? I(t) : {}, I(bl, t, !1);
        var i = t.value;
        "string" == typeof i ? i = new Mo(i, t.mode, null, t.lineSeparator, t.direction) : t.mode && (i.modeOption = t.mode), this.doc = i;
        var o = new kl.inputStyles[t.inputStyle](this),
            u = this.display = new function (e, t, n, i) {
                var o = this;
                this.input = n, o.scrollbarFiller = A("div", null, "CodeMirror-scrollbar-filler"), o.scrollbarFiller.setAttribute("cm-not-content", "true"), o.gutterFiller = A("div", null, "CodeMirror-gutter-filler"), o.gutterFiller.setAttribute("cm-not-content", "true"), o.lineDiv = O("div", null, "CodeMirror-code"), o.selectionDiv = A("div", null, null, "position: relative; z-index: 1"), o.cursorDiv = A("div", null, "CodeMirror-cursors"), o.measure = A("div", null, "CodeMirror-measure"), o.lineMeasure = A("div", null, "CodeMirror-measure"), o.lineSpace = O("div", [o.measure, o.lineMeasure, o.selectionDiv, o.cursorDiv, o.lineDiv], null, "position: relative; outline: none");
                var u = O("div", [o.lineSpace], "CodeMirror-lines");
                o.mover = A("div", [u], null, "position: relative"), o.sizer = A("div", [o.mover], "CodeMirror-sizer"), o.sizerWidth = null, o.heightForcer = A("div", null, null, "position: absolute; height: " + j + "px; width: 1px;"), o.gutters = A("div", null, "CodeMirror-gutters"), o.lineGutter = null, o.scroller = A("div", [o.sizer, o.heightForcer, o.gutters], "CodeMirror-scroll"), o.scroller.setAttribute("tabIndex", "-1"), o.wrapper = A("div", [o.scrollbarFiller, o.gutterFiller, o.scroller], "CodeMirror"), l && a < 8 && (o.gutters.style.zIndex = -1, o.scroller.style.paddingRight = 0), s || r && m || (o.scroller.draggable = !0), e && (e.appendChild ? e.appendChild(o.wrapper) : e(o.wrapper)), o.viewFrom = o.viewTo = t.first, o.reportedViewFrom = o.reportedViewTo = t.first, o.view = [], o.renderedView = null, o.externalMeasured = null, o.viewOffset = 0, o.lastWrapHeight = o.lastWrapWidth = 0, o.updateLineNumbers = null, o.nativeBarWidth = o.barHeight = o.barWidth = 0, o.scrollbarsClipped = !1, o.lineNumWidth = o.lineNumInnerWidth = o.lineNumChars = null, o.alignWidgets = !1, o.cachedCharWidth = o.cachedTextHeight = o.cachedPaddingH = null, o.maxLine = null, o.maxLineLength = 0, o.maxLineChanged = !1, o.wheelDX = o.wheelDY = o.wheelStartX = o.wheelStartY = null, o.shift = !1, o.selForContextMenu = null, o.activeTouch = null, o.gutterSpecs = ci(i.gutters, i.lineNumbers), fi(o), n.init(o)
            }(e, i, o, t);
        for (var c in u.wrapper.CodeMirror = this, ml(this), t.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), Vn(this), this.state = {
                    keyMaps: [],
                    overlays: [],
                    modeGen: 0,
                    overwrite: !1,
                    delayingBlurEvent: !1,
                    focused: !1,
                    suppressEdits: !1,
                    pasteIncoming: -1,
                    cutIncoming: -1,
                    selectingText: !1,
                    draggingText: !1,
                    highlight: new R,
                    keySeq: null,
                    specialChars: null
                }, t.autofocus && !m && u.input.focus(), l && a < 11 && setTimeout(function () {
                    return n.display.input.reset(!0)
                }, 20),
                function (e) {
                    var t = e.display;
                    he(t.scroller, "mousedown", Zn(e, hl)), he(t.scroller, "dblclick", l && a < 11 ? Zn(e, function (t) {
                        if (!ve(e, t)) {
                            var r = an(e, t);
                            if (r && !gl(e, t) && !xr(e.display, t)) {
                                we(t);
                                var n = e.findWordAt(r);
                                Ui(e.doc, n.anchor, n.head)
                            }
                        }
                    }) : function (t) {
                        return ve(e, t) || we(t)
                    });
                    he(t.scroller, "contextmenu", function (t) {
                        return vl(e, t)
                    }), he(t.input.getField(), "contextmenu", function (r) {
                        t.scroller.contains(r.target) || vl(e, r)
                    });
                    var r, n = {
                        end: 0
                    };

                    function i() {
                        t.activeTouch && (r = setTimeout(function () {
                            return t.activeTouch = null
                        }, 1e3), (n = t.activeTouch).end = +new Date)
                    }

                    function o(e, t) {
                        if (null == t.left) return !0;
                        var r = t.left - e.left,
                            n = t.top - e.top;
                        return r * r + n * n > 400
                    }
                    he(t.scroller, "touchstart", function (i) {
                        if (!ve(e, i) && ! function (e) {
                                if (1 != e.touches.length) return !1;
                                var t = e.touches[0];
                                return t.radiusX <= 1 && t.radiusY <= 1
                            }(i) && !gl(e, i)) {
                            t.input.ensurePolled(), clearTimeout(r);
                            var o = +new Date;
                            t.activeTouch = {
                                start: o,
                                moved: !1,
                                prev: o - n.end <= 300 ? n : null
                            }, 1 == i.touches.length && (t.activeTouch.left = i.touches[0].pageX, t.activeTouch.top = i.touches[0].pageY)
                        }
                    }), he(t.scroller, "touchmove", function () {
                        t.activeTouch && (t.activeTouch.moved = !0)
                    }), he(t.scroller, "touchend", function (r) {
                        var n = t.activeTouch;
                        if (n && !xr(t, r) && null != n.left && !n.moved && new Date - n.start < 300) {
                            var l, a = e.coordsChar(t.activeTouch, "page");
                            l = !n.prev || o(n, n.prev) ? new bi(a, a) : !n.prev.prev || o(n, n.prev.prev) ? e.findWordAt(a) : new bi(et(a.line, 0), at(e.doc, et(a.line + 1, 0))), e.setSelection(l.anchor, l.head), e.focus(), we(r)
                        }
                        i()
                    }), he(t.scroller, "touchcancel", i), he(t.scroller, "scroll", function () {
                        t.scroller.clientHeight && (Hn(e, t.scroller.scrollTop), Fn(e, t.scroller.scrollLeft, !0), ge(e, "scroll", e))
                    }), he(t.scroller, "mousewheel", function (t) {
                        return mi(e, t)
                    }), he(t.scroller, "DOMMouseScroll", function (t) {
                        return mi(e, t)
                    }), he(t.wrapper, "scroll", function () {
                        return t.wrapper.scrollTop = t.wrapper.scrollLeft = 0
                    }), t.dragFunctions = {
                        enter: function (t) {
                            ve(e, t) || ke(t)
                        },
                        over: function (t) {
                            ve(e, t) || (! function (e, t) {
                                var r = an(e, t);
                                if (r) {
                                    var n = document.createDocumentFragment();
                                    vn(e, r, n), e.display.dragCursor || (e.display.dragCursor = A("div", null, "CodeMirror-cursors CodeMirror-dragcursors"), e.display.lineSpace.insertBefore(e.display.dragCursor, e.display.cursorDiv)), N(e.display.dragCursor, n)
                                }
                            }(e, t), ke(t))
                        },
                        start: function (t) {
                            return function (e, t) {
                                if (l && (!e.state.draggingText || +new Date - No < 100)) ke(t);
                                else if (!ve(e, t) && !xr(e.display, t) && (t.dataTransfer.setData("Text", e.getSelection()), t.dataTransfer.effectAllowed = "copyMove", t.dataTransfer.setDragImage && !h)) {
                                    var r = A("img", null, null, "position: fixed; left: 0; top: 0;");
                                    r.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", f && (r.width = r.height = 1, e.display.wrapper.appendChild(r), r._top = r.offsetTop), t.dataTransfer.setDragImage(r, 0, 0), f && r.parentNode.removeChild(r)
                                }
                            }(e, t)
                        },
                        drop: Zn(e, Ao),
                        leave: function (t) {
                            ve(e, t) || Oo(e)
                        }
                    };
                    var s = t.input.getField();
                    he(s, "keyup", function (t) {
                        return al.call(e, t)
                    }), he(s, "keydown", Zn(e, ll)), he(s, "keypress", Zn(e, sl)), he(s, "focus", function (t) {
                        return Cn(e, t)
                    }), he(s, "blur", function (t) {
                        return kn(e, t)
                    })
                }(this), Ho(), Un(this), this.curOp.forceUpdate = !0, Di(this, i), t.autofocus && !m || this.hasFocus() ? setTimeout(P(Cn, this), 20) : kn(this), wl) wl.hasOwnProperty(c) && wl[c](this, t[c], yl);
        ui(this), t.finishInit && t.finishInit(this);
        for (var d = 0; d < Sl.length; ++d) Sl[d](this);
        Kn(this), s && t.lineWrapping && "optimizelegibility" == getComputedStyle(u.lineDiv).textRendering && (u.lineDiv.style.textRendering = "auto")
    }
    kl.defaults = bl, kl.optionHandlers = wl;
    var Sl = [];

    function Ll(e, t, r, n) {
        var i, o = e.doc;
        null == r && (r = "add"), "smart" == r && (o.mode.indent ? i = dt(e, t).state : r = "prev");
        var l = e.options.tabSize,
            a = Xe(o, t),
            s = z(a.text, null, l);
        a.stateAfter && (a.stateAfter = null);
        var u, c = a.text.match(/^\s*/)[0];
        if (n || /\S/.test(a.text)) {
            if ("smart" == r && ((u = o.mode.indent(i, a.text.slice(c.length), a.text)) == V || u > 150)) {
                if (!n) return;
                r = "prev"
            }
        } else u = 0, r = "not";
        "prev" == r ? u = t > o.first ? z(Xe(o, t - 1).text, null, l) : 0 : "add" == r ? u = s + e.options.indentUnit : "subtract" == r ? u = s - e.options.indentUnit : "number" == typeof r && (u = s + r), u = Math.max(0, u);
        var f = "",
            h = 0;
        if (e.options.indentWithTabs)
            for (var d = Math.floor(u / l); d; --d) h += l, f += "\t";
        if (h < u && (f += _(u - h)), f != c) return co(o, f, et(t, 0), et(t, c.length), "+input"), a.stateAfter = null, !0;
        for (var p = 0; p < o.sel.ranges.length; p++) {
            var g = o.sel.ranges[p];
            if (g.head.line == t && g.head.ch < c.length) {
                var v = et(t, c.length);
                Xi(o, p, new bi(v, v));
                break
            }
        }
    }
    kl.defineInitHook = function (e) {
        return Sl.push(e)
    };
    var Tl = null;

    function Ml(e) {
        Tl = e
    }

    function Nl(e, t, r, n, i) {
        var o = e.doc;
        e.display.shift = !1, n || (n = o.sel);
        var l = +new Date - 200,
            a = "paste" == i || e.state.pasteIncoming > l,
            s = We(t),
            u = null;
        if (a && n.ranges.length > 1)
            if (Tl && Tl.text.join("\n") == t) {
                if (n.ranges.length % Tl.text.length == 0) {
                    u = [];
                    for (var c = 0; c < Tl.text.length; c++) u.push(o.splitLines(Tl.text[c]))
                }
            } else s.length == n.ranges.length && e.options.pasteLinesPerSelection && (u = q(s, function (e) {
                return [e]
            }));
        for (var f = e.curOp.updateInput, h = n.ranges.length - 1; h >= 0; h--) {
            var d = n.ranges[h],
                p = d.from(),
                g = d.to();
            d.empty() && (r && r > 0 ? p = et(p.line, p.ch - r) : e.state.overwrite && !a ? g = et(g.line, Math.min(Xe(o, g.line).text.length, g.ch + Y(s).length)) : a && Tl && Tl.lineWise && Tl.text.join("\n") == s.join("\n") && (p = g = et(p.line, 0)));
            var v = {
                from: p,
                to: g,
                text: u ? u[h % u.length] : s,
                origin: i || (a ? "paste" : e.state.cutIncoming > l ? "cut" : "+input")
            };
            oo(e.doc, v), ar(e, "inputRead", e, v)
        }
        t && !a && Ol(e, t), An(e), e.curOp.updateInput < 2 && (e.curOp.updateInput = f), e.curOp.typing = !0, e.state.pasteIncoming = e.state.cutIncoming = -1
    }

    function Al(e, t) {
        var r = e.clipboardData && e.clipboardData.getData("Text");
        if (r) return e.preventDefault(), t.isReadOnly() || t.options.disableInput || qn(t, function () {
            return Nl(t, r, 0, null, "paste")
        }), !0
    }

    function Ol(e, t) {
        if (e.options.electricChars && e.options.smartIndent)
            for (var r = e.doc.sel, n = r.ranges.length - 1; n >= 0; n--) {
                var i = r.ranges[n];
                if (!(i.head.ch > 100 || n && r.ranges[n - 1].head.line == i.head.line)) {
                    var o = e.getModeAt(i.head),
                        l = !1;
                    if (o.electricChars) {
                        for (var a = 0; a < o.electricChars.length; a++)
                            if (t.indexOf(o.electricChars.charAt(a)) > -1) {
                                l = Ll(e, i.head.line, "smart");
                                break
                            }
                    } else o.electricInput && o.electricInput.test(Xe(e.doc, i.head.line).text.slice(0, i.head.ch)) && (l = Ll(e, i.head.line, "smart"));
                    l && ar(e, "electricInput", e, i.head.line)
                }
            }
    }

    function Dl(e) {
        for (var t = [], r = [], n = 0; n < e.doc.sel.ranges.length; n++) {
            var i = e.doc.sel.ranges[n].head.line,
                o = {
                    anchor: et(i, 0),
                    head: et(i + 1, 0)
                };
            r.push(o), t.push(e.getRange(o.anchor, o.head))
        }
        return {
            text: t,
            ranges: r
        }
    }

    function Wl(e, t, r, n) {
        e.setAttribute("autocorrect", r ? "" : "off"), e.setAttribute("autocapitalize", n ? "" : "off"), e.setAttribute("spellcheck", !!t)
    }

    function Hl() {
        var e = A("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none"),
            t = A("div", [e], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
        return s ? e.style.width = "1000px" : e.setAttribute("wrap", "off"), g && (e.style.border = "1px solid black"), Wl(e), t
    }

    function El(e, t, r, n, i) {
        var o = t,
            l = r,
            a = Xe(e, t.line),
            s = i && "rtl" == e.direction ? -r : r;

        function u(n) {
            var o, l;
            if (null == (o = i ? function (e, t, r, n) {
                    var i = ce(t, e.doc.direction);
                    if (!i) return Yo(t, r, n);
                    r.ch >= t.text.length ? (r.ch = t.text.length, r.sticky = "before") : r.ch <= 0 && (r.ch = 0, r.sticky = "after");
                    var o = se(i, r.ch, r.sticky),
                        l = i[o];
                    if ("ltr" == e.doc.direction && l.level % 2 == 0 && (n > 0 ? l.to > r.ch : l.from < r.ch)) return Yo(t, r, n);
                    var a, s = function (e, r) {
                            return _o(t, e instanceof et ? e.ch : e, r)
                        },
                        u = function (r) {
                            return e.options.lineWrapping ? (a = a || Dr(e, t), Zr(e, t, a, r)) : {
                                begin: 0,
                                end: t.text.length
                            }
                        },
                        c = u("before" == r.sticky ? s(r, -1) : r.ch);
                    if ("rtl" == e.doc.direction || 1 == l.level) {
                        var f = 1 == l.level == n < 0,
                            h = s(r, f ? 1 : -1);
                        if (null != h && (f ? h <= l.to && h <= c.end : h >= l.from && h >= c.begin)) {
                            var d = f ? "before" : "after";
                            return new et(r.line, h, d)
                        }
                    }
                    var p = function (e, t, n) {
                            for (var o = function (e, t) {
                                    return t ? new et(r.line, s(e, 1), "before") : new et(r.line, e, "after")
                                }; e >= 0 && e < i.length; e += t) {
                                var l = i[e],
                                    a = t > 0 == (1 != l.level),
                                    u = a ? n.begin : s(n.end, -1);
                                if (l.from <= u && u < l.to) return o(u, a);
                                if (u = a ? l.from : s(l.to, -1), n.begin <= u && u < n.end) return o(u, a)
                            }
                        },
                        g = p(o + n, n, c);
                    if (g) return g;
                    var v = n > 0 ? c.end : s(c.begin, -1);
                    return null == v || n > 0 && v == t.text.length || !(g = p(n > 0 ? 0 : i.length - 1, n, u(v))) ? null : g
                }(e.cm, a, t, r) : Yo(a, t, r))) {
                if (n || (l = t.line + s) < e.first || l >= e.first + e.size || (t = new et(l, t.ch, t.sticky), !(a = Xe(e, l)))) return !1;
                t = qo(i, e.cm, a, t.line, s)
            } else t = o;
            return !0
        }
        if ("char" == n) u();
        else if ("column" == n) u(!0);
        else if ("word" == n || "group" == n)
            for (var c = null, f = "group" == n, h = e.cm && e.cm.getHelper(t, "wordChars"), d = !0; !(r < 0) || u(!d); d = !1) {
                var p = a.text.charAt(t.ch) || "\n",
                    g = te(p, h) ? "w" : f && "\n" == p ? "n" : !f || /\s/.test(p) ? null : "p";
                if (!f || d || g || (g = "s"), c && c != g) {
                    r < 0 && (r = 1, u(), t.sticky = "after");
                    break
                }
                if (g && (c = g), r > 0 && !u(!d)) break
            }
        var v = to(e, t, o, l, !0);
        return rt(o, v) && (v.hitSide = !0), v
    }

    function Fl(e, t, r, n) {
        var i, o, l = e.doc,
            a = t.left;
        if ("page" == n) {
            var s = Math.min(e.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight),
                u = Math.max(s - .5 * en(e.display), 3);
            i = (r > 0 ? t.bottom : t.top) + r * u
        } else "line" == n && (i = r > 0 ? t.bottom + 3 : t.top - 3);
        for (;
            (o = Yr(e, a, i)).outside;) {
            if (r < 0 ? i <= 0 : i >= l.height) {
                o.hitSide = !0;
                break
            }
            i += 5 * r
        }
        return o
    }
    var Pl = function (e) {
        this.cm = e, this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null, this.polling = new R, this.composing = null, this.gracePeriod = !1, this.readDOMTimeout = null
    };

    function Il(e, t) {
        var r = Or(e, t.line);
        if (!r || r.hidden) return null;
        var n = Xe(e.doc, t.line),
            i = Nr(r, n, t.line),
            o = ce(n, e.doc.direction),
            l = "left";
        o && (l = se(o, t.ch) % 2 ? "right" : "left");
        var a = Fr(i.map, t.ch, l);
        return a.offset = "right" == a.collapse ? a.end : a.start, a
    }

    function zl(e, t) {
        return t && (e.bad = !0), e
    }

    function Rl(e, t, r) {
        var n;
        if (t == e.display.lineDiv) {
            if (!(n = e.display.lineDiv.childNodes[r])) return zl(e.clipPos(et(e.display.viewTo - 1)), !0);
            t = null, r = 0
        } else
            for (n = t;; n = n.parentNode) {
                if (!n || n == e.display.lineDiv) return null;
                if (n.parentNode && n.parentNode == e.display.lineDiv) break
            }
        for (var i = 0; i < e.display.view.length; i++) {
            var o = e.display.view[i];
            if (o.node == n) return Bl(o, t, r)
        }
    }

    function Bl(e, t, r) {
        var n = e.text.firstChild,
            i = !1;
        if (!t || !D(n, t)) return zl(et(qe(e.line), 0), !0);
        if (t == n && (i = !0, t = n.childNodes[r], r = 0, !t)) {
            var o = e.rest ? Y(e.rest) : e.line;
            return zl(et(qe(o), o.text.length), i)
        }
        var l = 3 == t.nodeType ? t : null,
            a = t;
        for (l || 1 != t.childNodes.length || 3 != t.firstChild.nodeType || (l = t.firstChild, r && (r = l.nodeValue.length)); a.parentNode != n;) a = a.parentNode;
        var s = e.measure,
            u = s.maps;

        function c(t, r, n) {
            for (var i = -1; i < (u ? u.length : 0); i++)
                for (var o = i < 0 ? s.map : u[i], l = 0; l < o.length; l += 3) {
                    var a = o[l + 2];
                    if (a == t || a == r) {
                        var c = qe(i < 0 ? e.line : e.rest[i]),
                            f = o[l] + n;
                        return (n < 0 || a != t) && (f = o[l + (n ? 1 : 0)]), et(c, f)
                    }
                }
        }
        var f = c(l, a, r);
        if (f) return zl(f, i);
        for (var h = a.nextSibling, d = l ? l.nodeValue.length - r : 0; h; h = h.nextSibling) {
            if (f = c(h, h.firstChild, 0)) return zl(et(f.line, f.ch - d), i);
            d += h.textContent.length
        }
        for (var p = a.previousSibling, g = r; p; p = p.previousSibling) {
            if (f = c(p, p.firstChild, -1)) return zl(et(f.line, f.ch + g), i);
            g += p.textContent.length
        }
    }
    Pl.prototype.init = function (e) {
        var t = this,
            r = this,
            n = r.cm,
            i = r.div = e.lineDiv;

        function o(e) {
            for (var t = e.target; t; t = t.parentNode) {
                if (t == i) return !0;
                if (/\bCodeMirror-(?:line)?widget\b/.test(t.className)) break
            }
            return !1
        }

        function l(e) {
            if (o(e) && !ve(n, e)) {
                if (n.somethingSelected()) Ml({
                    lineWise: !1,
                    text: n.getSelections()
                }), "cut" == e.type && n.replaceSelection("", null, "cut");
                else {
                    if (!n.options.lineWiseCopyCut) return;
                    var t = Dl(n);
                    Ml({
                        lineWise: !0,
                        text: t.text
                    }), "cut" == e.type && n.operation(function () {
                        n.setSelections(t.ranges, 0, G), n.replaceSelection("", null, "cut")
                    })
                }
                if (e.clipboardData) {
                    e.clipboardData.clearData();
                    var l = Tl.text.join("\n");
                    if (e.clipboardData.setData("Text", l), e.clipboardData.getData("Text") == l) return void e.preventDefault()
                }
                var a = Hl(),
                    s = a.firstChild;
                n.display.lineSpace.insertBefore(a, n.display.lineSpace.firstChild), s.value = Tl.text.join("\n");
                var u = document.activeElement;
                F(s), setTimeout(function () {
                    n.display.lineSpace.removeChild(a), u.focus(), u == i && r.showPrimarySelection()
                }, 50)
            }
        }
        Wl(i, n.options.spellcheck, n.options.autocorrect, n.options.autocapitalize), he(i, "paste", function (e) {
            !o(e) || ve(n, e) || Al(e, n) || a <= 11 && setTimeout(Zn(n, function () {
                return t.updateFromDOM()
            }), 20)
        }), he(i, "compositionstart", function (e) {
            t.composing = {
                data: e.data,
                done: !1
            }
        }), he(i, "compositionupdate", function (e) {
            t.composing || (t.composing = {
                data: e.data,
                done: !1
            })
        }), he(i, "compositionend", function (e) {
            t.composing && (e.data != t.composing.data && t.readFromDOMSoon(), t.composing.done = !0)
        }), he(i, "touchstart", function () {
            return r.forceCompositionEnd()
        }), he(i, "input", function () {
            t.composing || t.readFromDOMSoon()
        }), he(i, "copy", l), he(i, "cut", l)
    }, Pl.prototype.screenReaderLabelChanged = function (e) {
        e ? this.div.setAttribute("aria-label", e) : this.div.removeAttribute("aria-label")
    }, Pl.prototype.prepareSelection = function () {
        var e = gn(this.cm, !1);
        return e.focus = document.activeElement == this.div, e
    }, Pl.prototype.showSelection = function (e, t) {
        e && this.cm.display.view.length && ((e.focus || t) && this.showPrimarySelection(), this.showMultipleSelections(e))
    }, Pl.prototype.getSelection = function () {
        return this.cm.display.wrapper.ownerDocument.getSelection()
    }, Pl.prototype.showPrimarySelection = function () {
        var e = this.getSelection(),
            t = this.cm,
            n = t.doc.sel.primary(),
            i = n.from(),
            o = n.to();
        if (t.display.viewTo == t.display.viewFrom || i.line >= t.display.viewTo || o.line < t.display.viewFrom) e.removeAllRanges();
        else {
            var l = Rl(t, e.anchorNode, e.anchorOffset),
                a = Rl(t, e.focusNode, e.focusOffset);
            if (!l || l.bad || !a || a.bad || 0 != tt(ot(l, a), i) || 0 != tt(it(l, a), o)) {
                var s = t.display.view,
                    u = i.line >= t.display.viewFrom && Il(t, i) || {
                        node: s[0].measure.map[2],
                        offset: 0
                    },
                    c = o.line < t.display.viewTo && Il(t, o);
                if (!c) {
                    var f = s[s.length - 1].measure,
                        h = f.maps ? f.maps[f.maps.length - 1] : f.map;
                    c = {
                        node: h[h.length - 1],
                        offset: h[h.length - 2] - h[h.length - 3]
                    }
                }
                if (u && c) {
                    var d, p = e.rangeCount && e.getRangeAt(0);
                    try {
                        d = L(u.node, u.offset, c.offset, c.node)
                    } catch (e) {}
                    d && (!r && t.state.focused ? (e.collapse(u.node, u.offset), d.collapsed || (e.removeAllRanges(), e.addRange(d))) : (e.removeAllRanges(), e.addRange(d)), p && null == e.anchorNode ? e.addRange(p) : r && this.startGracePeriod()), this.rememberSelection()
                } else e.removeAllRanges()
            }
        }
    }, Pl.prototype.startGracePeriod = function () {
        var e = this;
        clearTimeout(this.gracePeriod), this.gracePeriod = setTimeout(function () {
            e.gracePeriod = !1, e.selectionChanged() && e.cm.operation(function () {
                return e.cm.curOp.selectionChanged = !0
            })
        }, 20)
    }, Pl.prototype.showMultipleSelections = function (e) {
        N(this.cm.display.cursorDiv, e.cursors), N(this.cm.display.selectionDiv, e.selection)
    }, Pl.prototype.rememberSelection = function () {
        var e = this.getSelection();
        this.lastAnchorNode = e.anchorNode, this.lastAnchorOffset = e.anchorOffset, this.lastFocusNode = e.focusNode, this.lastFocusOffset = e.focusOffset
    }, Pl.prototype.selectionInEditor = function () {
        var e = this.getSelection();
        if (!e.rangeCount) return !1;
        var t = e.getRangeAt(0).commonAncestorContainer;
        return D(this.div, t)
    }, Pl.prototype.focus = function () {
        "nocursor" != this.cm.options.readOnly && (this.selectionInEditor() && document.activeElement == this.div || this.showSelection(this.prepareSelection(), !0), this.div.focus())
    }, Pl.prototype.blur = function () {
        this.div.blur()
    }, Pl.prototype.getField = function () {
        return this.div
    }, Pl.prototype.supportsTouch = function () {
        return !0
    }, Pl.prototype.receivedFocus = function () {
        var e = this;
        this.selectionInEditor() ? this.pollSelection() : qn(this.cm, function () {
            return e.cm.curOp.selectionChanged = !0
        }), this.polling.set(this.cm.options.pollInterval, function t() {
            e.cm.state.focused && (e.pollSelection(), e.polling.set(e.cm.options.pollInterval, t))
        })
    }, Pl.prototype.selectionChanged = function () {
        var e = this.getSelection();
        return e.anchorNode != this.lastAnchorNode || e.anchorOffset != this.lastAnchorOffset || e.focusNode != this.lastFocusNode || e.focusOffset != this.lastFocusOffset
    }, Pl.prototype.pollSelection = function () {
        if (null == this.readDOMTimeout && !this.gracePeriod && this.selectionChanged()) {
            var e = this.getSelection(),
                t = this.cm;
            if (v && c && this.cm.display.gutterSpecs.length && function (e) {
                    for (var t = e; t; t = t.parentNode)
                        if (/CodeMirror-gutter-wrapper/.test(t.className)) return !0;
                    return !1
                }(e.anchorNode)) return this.cm.triggerOnKeyDown({
                type: "keydown",
                keyCode: 8,
                preventDefault: Math.abs
            }), this.blur(), void this.focus();
            if (!this.composing) {
                this.rememberSelection();
                var r = Rl(t, e.anchorNode, e.anchorOffset),
                    n = Rl(t, e.focusNode, e.focusOffset);
                r && n && qn(t, function () {
                    Yi(t.doc, xi(r, n), G), (r.bad || n.bad) && (t.curOp.selectionChanged = !0)
                })
            }
        }
    }, Pl.prototype.pollContent = function () {
        null != this.readDOMTimeout && (clearTimeout(this.readDOMTimeout), this.readDOMTimeout = null);
        var e, t, r, n = this.cm,
            i = n.display,
            o = n.doc.sel.primary(),
            l = o.from(),
            a = o.to();
        if (0 == l.ch && l.line > n.firstLine() && (l = et(l.line - 1, Xe(n.doc, l.line - 1).length)), a.ch == Xe(n.doc, a.line).text.length && a.line < n.lastLine() && (a = et(a.line + 1, 0)), l.line < i.viewFrom || a.line > i.viewTo - 1) return !1;
        l.line == i.viewFrom || 0 == (e = sn(n, l.line)) ? (t = qe(i.view[0].line), r = i.view[0].node) : (t = qe(i.view[e].line), r = i.view[e - 1].node.nextSibling);
        var s, u, c = sn(n, a.line);
        if (c == i.view.length - 1 ? (s = i.viewTo - 1, u = i.lineDiv.lastChild) : (s = qe(i.view[c + 1].line) - 1, u = i.view[c + 1].node.previousSibling), !r) return !1;
        for (var f = n.doc.splitLines(function (e, t, r, n, i) {
                var o = "",
                    l = !1,
                    a = e.doc.lineSeparator(),
                    s = !1;

                function u() {
                    l && (o += a, s && (o += a), l = s = !1)
                }

                function c(e) {
                    e && (u(), o += e)
                }

                function f(t) {
                    if (1 == t.nodeType) {
                        var r = t.getAttribute("cm-text");
                        if (r) return void c(r);
                        var o, h = t.getAttribute("cm-marker");
                        if (h) {
                            var d = e.findMarks(et(n, 0), et(i + 1, 0), (v = +h, function (e) {
                                return e.id == v
                            }));
                            return void(d.length && (o = d[0].find(0)) && c($e(e.doc, o.from, o.to).join(a)))
                        }
                        if ("false" == t.getAttribute("contenteditable")) return;
                        var p = /^(pre|div|p|li|table|br)$/i.test(t.nodeName);
                        if (!/^br$/i.test(t.nodeName) && 0 == t.textContent.length) return;
                        p && u();
                        for (var g = 0; g < t.childNodes.length; g++) f(t.childNodes[g]);
                        /^(pre|p)$/i.test(t.nodeName) && (s = !0), p && (l = !0)
                    } else 3 == t.nodeType && c(t.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " "));
                    var v
                }
                for (; f(t), t != r;) t = t.nextSibling, s = !1;
                return o
            }(n, r, u, t, s)), h = $e(n.doc, et(t, 0), et(s, Xe(n.doc, s).text.length)); f.length > 1 && h.length > 1;)
            if (Y(f) == Y(h)) f.pop(), h.pop(), s--;
            else {
                if (f[0] != h[0]) break;
                f.shift(), h.shift(), t++
            } for (var d = 0, p = 0, g = f[0], v = h[0], m = Math.min(g.length, v.length); d < m && g.charCodeAt(d) == v.charCodeAt(d);) ++d;
        for (var y = Y(f), b = Y(h), w = Math.min(y.length - (1 == f.length ? d : 0), b.length - (1 == h.length ? d : 0)); p < w && y.charCodeAt(y.length - p - 1) == b.charCodeAt(b.length - p - 1);) ++p;
        if (1 == f.length && 1 == h.length && t == l.line)
            for (; d && d > l.ch && y.charCodeAt(y.length - p - 1) == b.charCodeAt(b.length - p - 1);) d--, p++;
        f[f.length - 1] = y.slice(0, y.length - p).replace(/^\u200b+/, ""), f[0] = f[0].slice(d).replace(/\u200b+$/, "");
        var x = et(t, d),
            C = et(s, h.length ? Y(h).length - p : 0);
        return f.length > 1 || f[0] || tt(x, C) ? (co(n.doc, f, x, C, "+input"), !0) : void 0
    }, Pl.prototype.ensurePolled = function () {
        this.forceCompositionEnd()
    }, Pl.prototype.reset = function () {
        this.forceCompositionEnd()
    }, Pl.prototype.forceCompositionEnd = function () {
        this.composing && (clearTimeout(this.readDOMTimeout), this.composing = null, this.updateFromDOM(), this.div.blur(), this.div.focus())
    }, Pl.prototype.readFromDOMSoon = function () {
        var e = this;
        null == this.readDOMTimeout && (this.readDOMTimeout = setTimeout(function () {
            if (e.readDOMTimeout = null, e.composing) {
                if (!e.composing.done) return;
                e.composing = null
            }
            e.updateFromDOM()
        }, 80))
    }, Pl.prototype.updateFromDOM = function () {
        var e = this;
        !this.cm.isReadOnly() && this.pollContent() || qn(this.cm, function () {
            return un(e.cm)
        })
    }, Pl.prototype.setUneditable = function (e) {
        e.contentEditable = "false"
    }, Pl.prototype.onKeyPress = function (e) {
        0 == e.charCode || this.composing || (e.preventDefault(), this.cm.isReadOnly() || Zn(this.cm, Nl)(this.cm, String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), 0))
    }, Pl.prototype.readOnlyChanged = function (e) {
        this.div.contentEditable = String("nocursor" != e)
    }, Pl.prototype.onContextMenu = function () {}, Pl.prototype.resetPosition = function () {}, Pl.prototype.needsContentAttribute = !0;
    var jl = function (e) {
        this.cm = e, this.prevInput = "", this.pollingFast = !1, this.polling = new R, this.hasSelection = !1, this.composing = null
    };
    jl.prototype.init = function (e) {
            var t = this,
                r = this,
                n = this.cm;
            this.createField(e);
            var i = this.textarea;

            function o(e) {
                if (!ve(n, e)) {
                    if (n.somethingSelected()) Ml({
                        lineWise: !1,
                        text: n.getSelections()
                    });
                    else {
                        if (!n.options.lineWiseCopyCut) return;
                        var t = Dl(n);
                        Ml({
                            lineWise: !0,
                            text: t.text
                        }), "cut" == e.type ? n.setSelections(t.ranges, null, G) : (r.prevInput = "", i.value = t.text.join("\n"), F(i))
                    }
                    "cut" == e.type && (n.state.cutIncoming = +new Date)
                }
            }
            e.wrapper.insertBefore(this.wrapper, e.wrapper.firstChild), g && (i.style.width = "0px"), he(i, "input", function () {
                l && a >= 9 && t.hasSelection && (t.hasSelection = null), r.poll()
            }), he(i, "paste", function (e) {
                ve(n, e) || Al(e, n) || (n.state.pasteIncoming = +new Date, r.fastPoll())
            }), he(i, "cut", o), he(i, "copy", o), he(e.scroller, "paste", function (t) {
                if (!xr(e, t) && !ve(n, t)) {
                    if (!i.dispatchEvent) return n.state.pasteIncoming = +new Date, void r.focus();
                    var o = new Event("paste");
                    o.clipboardData = t.clipboardData, i.dispatchEvent(o)
                }
            }), he(e.lineSpace, "selectstart", function (t) {
                xr(e, t) || we(t)
            }), he(i, "compositionstart", function () {
                var e = n.getCursor("from");
                r.composing && r.composing.range.clear(), r.composing = {
                    start: e,
                    range: n.markText(e, n.getCursor("to"), {
                        className: "CodeMirror-composing"
                    })
                }
            }), he(i, "compositionend", function () {
                r.composing && (r.poll(), r.composing.range.clear(), r.composing = null)
            })
        }, jl.prototype.createField = function (e) {
            this.wrapper = Hl(), this.textarea = this.wrapper.firstChild
        }, jl.prototype.screenReaderLabelChanged = function (e) {
            e ? this.textarea.setAttribute("aria-label", e) : this.textarea.removeAttribute("aria-label")
        }, jl.prototype.prepareSelection = function () {
            var e = this.cm,
                t = e.display,
                r = e.doc,
                n = gn(e);
            if (e.options.moveInputWithCursor) {
                var i = Xr(e, r.sel.primary().head, "div"),
                    o = t.wrapper.getBoundingClientRect(),
                    l = t.lineDiv.getBoundingClientRect();
                n.teTop = Math.max(0, Math.min(t.wrapper.clientHeight - 10, i.top + l.top - o.top)), n.teLeft = Math.max(0, Math.min(t.wrapper.clientWidth - 10, i.left + l.left - o.left))
            }
            return n
        }, jl.prototype.showSelection = function (e) {
            var t = this.cm.display;
            N(t.cursorDiv, e.cursors), N(t.selectionDiv, e.selection), null != e.teTop && (this.wrapper.style.top = e.teTop + "px", this.wrapper.style.left = e.teLeft + "px")
        }, jl.prototype.reset = function (e) {
            if (!this.contextMenuPending && !this.composing) {
                var t = this.cm;
                if (t.somethingSelected()) {
                    this.prevInput = "";
                    var r = t.getSelection();
                    this.textarea.value = r, t.state.focused && F(this.textarea), l && a >= 9 && (this.hasSelection = r)
                } else e || (this.prevInput = this.textarea.value = "", l && a >= 9 && (this.hasSelection = null))
            }
        }, jl.prototype.getField = function () {
            return this.textarea
        }, jl.prototype.supportsTouch = function () {
            return !1
        }, jl.prototype.focus = function () {
            if ("nocursor" != this.cm.options.readOnly && (!m || W() != this.textarea)) try {
                this.textarea.focus()
            } catch (e) {}
        }, jl.prototype.blur = function () {
            this.textarea.blur()
        }, jl.prototype.resetPosition = function () {
            this.wrapper.style.top = this.wrapper.style.left = 0
        }, jl.prototype.receivedFocus = function () {
            this.slowPoll()
        }, jl.prototype.slowPoll = function () {
            var e = this;
            this.pollingFast || this.polling.set(this.cm.options.pollInterval, function () {
                e.poll(), e.cm.state.focused && e.slowPoll()
            })
        }, jl.prototype.fastPoll = function () {
            var e = !1,
                t = this;
            t.pollingFast = !0, t.polling.set(20, function r() {
                t.poll() || e ? (t.pollingFast = !1, t.slowPoll()) : (e = !0, t.polling.set(60, r))
            })
        }, jl.prototype.poll = function () {
            var e = this,
                t = this.cm,
                r = this.textarea,
                n = this.prevInput;
            if (this.contextMenuPending || !t.state.focused || He(r) && !n && !this.composing || t.isReadOnly() || t.options.disableInput || t.state.keySeq) return !1;
            var i = r.value;
            if (i == n && !t.somethingSelected()) return !1;
            if (l && a >= 9 && this.hasSelection === i || y && /[\uf700-\uf7ff]/.test(i)) return t.display.input.reset(), !1;
            if (t.doc.sel == t.display.selForContextMenu) {
                var o = i.charCodeAt(0);
                if (8203 != o || n || (n = "​"), 8666 == o) return this.reset(), this.cm.execCommand("undo")
            }
            for (var s = 0, u = Math.min(n.length, i.length); s < u && n.charCodeAt(s) == i.charCodeAt(s);) ++s;
            return qn(t, function () {
                Nl(t, i.slice(s), n.length - s, null, e.composing ? "*compose" : null), i.length > 1e3 || i.indexOf("\n") > -1 ? r.value = e.prevInput = "" : e.prevInput = i, e.composing && (e.composing.range.clear(), e.composing.range = t.markText(e.composing.start, t.getCursor("to"), {
                    className: "CodeMirror-composing"
                }))
            }), !0
        }, jl.prototype.ensurePolled = function () {
            this.pollingFast && this.poll() && (this.pollingFast = !1)
        }, jl.prototype.onKeyPress = function () {
            l && a >= 9 && (this.hasSelection = null), this.fastPoll()
        }, jl.prototype.onContextMenu = function (e) {
            var t = this,
                r = t.cm,
                n = r.display,
                i = t.textarea;
            t.contextMenuPending && t.contextMenuPending();
            var o = an(r, e),
                u = n.scroller.scrollTop;
            if (o && !f) {
                r.options.resetSelectionOnContextMenu && -1 == r.doc.sel.contains(o) && Zn(r, Yi)(r.doc, xi(o), G);
                var c, h = i.style.cssText,
                    d = t.wrapper.style.cssText,
                    p = t.wrapper.offsetParent.getBoundingClientRect();
                if (t.wrapper.style.cssText = "position: static", i.style.cssText = "position: absolute; width: 30px; height: 30px;\n      top: " + (e.clientY - p.top - 5) + "px; left: " + (e.clientX - p.left - 5) + "px;\n      z-index: 1000; background: " + (l ? "rgba(255, 255, 255, .05)" : "transparent") + ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);", s && (c = window.scrollY), n.input.focus(), s && window.scrollTo(null, c), n.input.reset(), r.somethingSelected() || (i.value = t.prevInput = " "), t.contextMenuPending = m, n.selForContextMenu = r.doc.sel, clearTimeout(n.detectingSelectAll), l && a >= 9 && v(), k) {
                    ke(e);
                    var g = function () {
                        pe(window, "mouseup", g), setTimeout(m, 20)
                    };
                    he(window, "mouseup", g)
                } else setTimeout(m, 50)
            }

            function v() {
                if (null != i.selectionStart) {
                    var e = r.somethingSelected(),
                        o = "​" + (e ? i.value : "");
                    i.value = "⇚", i.value = o, t.prevInput = e ? "" : "​", i.selectionStart = 1, i.selectionEnd = o.length, n.selForContextMenu = r.doc.sel
                }
            }

            function m() {
                if (t.contextMenuPending == m && (t.contextMenuPending = !1, t.wrapper.style.cssText = d, i.style.cssText = h, l && a < 9 && n.scrollbars.setScrollTop(n.scroller.scrollTop = u), null != i.selectionStart)) {
                    (!l || l && a < 9) && v();
                    var e = 0,
                        o = function () {
                            n.selForContextMenu == r.doc.sel && 0 == i.selectionStart && i.selectionEnd > 0 && "​" == t.prevInput ? Zn(r, no)(r) : e++ < 10 ? n.detectingSelectAll = setTimeout(o, 500) : (n.selForContextMenu = null, n.input.reset())
                        };
                    n.detectingSelectAll = setTimeout(o, 200)
                }
            }
        }, jl.prototype.readOnlyChanged = function (e) {
            e || this.reset(), this.textarea.disabled = "nocursor" == e
        }, jl.prototype.setUneditable = function () {}, jl.prototype.needsContentAttribute = !1,
        function (e) {
            var t = e.optionHandlers;

            function r(r, n, i, o) {
                e.defaults[r] = n, i && (t[r] = o ? function (e, t, r) {
                    r != yl && i(e, t, r)
                } : i)
            }
            e.defineOption = r, e.Init = yl, r("value", "", function (e, t) {
                return e.setValue(t)
            }, !0), r("mode", null, function (e, t) {
                e.doc.modeOption = t, Ti(e)
            }, !0), r("indentUnit", 2, Ti, !0), r("indentWithTabs", !1), r("smartIndent", !0), r("tabSize", 4, function (e) {
                Mi(e), Rr(e), un(e)
            }, !0), r("lineSeparator", null, function (e, t) {
                if (e.doc.lineSep = t, t) {
                    var r = [],
                        n = e.doc.first;
                    e.doc.iter(function (e) {
                        for (var i = 0;;) {
                            var o = e.text.indexOf(t, i);
                            if (-1 == o) break;
                            i = o + t.length, r.push(et(n, o))
                        }
                        n++
                    });
                    for (var i = r.length - 1; i >= 0; i--) co(e.doc, t, r[i], et(r[i].line, r[i].ch + t.length))
                }
            }), r("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b-\u200c\u200e\u200f\u2028\u2029\ufeff\ufff9-\ufffc]/g, function (e, t, r) {
                e.state.specialChars = new RegExp(t.source + (t.test("\t") ? "" : "|\t"), "g"), r != yl && e.refresh()
            }), r("specialCharPlaceholder", Qt, function (e) {
                return e.refresh()
            }, !0), r("electricChars", !0), r("inputStyle", m ? "contenteditable" : "textarea", function () {
                throw new Error("inputStyle can not (yet) be changed in a running editor")
            }, !0), r("spellcheck", !1, function (e, t) {
                return e.getInputField().spellcheck = t
            }, !0), r("autocorrect", !1, function (e, t) {
                return e.getInputField().autocorrect = t
            }, !0), r("autocapitalize", !1, function (e, t) {
                return e.getInputField().autocapitalize = t
            }, !0), r("rtlMoveVisually", !w), r("wholeLineUpdateBefore", !0), r("theme", "default", function (e) {
                ml(e), hi(e)
            }, !0), r("keyMap", "default", function (e, t, r) {
                var n = Xo(t),
                    i = r != yl && Xo(r);
                i && i.detach && i.detach(e, n), n.attach && n.attach(e, i || null)
            }), r("extraKeys", null), r("configureMouse", null), r("lineWrapping", !1, Cl, !0), r("gutters", [], function (e, t) {
                e.display.gutterSpecs = ci(t, e.options.lineNumbers), hi(e)
            }, !0), r("fixedGutter", !0, function (e, t) {
                e.display.gutters.style.left = t ? nn(e.display) + "px" : "0", e.refresh()
            }, !0), r("coverGutterNextToScrollbar", !1, function (e) {
                return Rn(e)
            }, !0), r("scrollbarStyle", "native", function (e) {
                Vn(e), Rn(e), e.display.scrollbars.setScrollTop(e.doc.scrollTop), e.display.scrollbars.setScrollLeft(e.doc.scrollLeft)
            }, !0), r("lineNumbers", !1, function (e, t) {
                e.display.gutterSpecs = ci(e.options.gutters, t), hi(e)
            }, !0), r("firstLineNumber", 1, hi, !0), r("lineNumberFormatter", function (e) {
                return e
            }, hi, !0), r("showCursorWhenSelecting", !1, pn, !0), r("resetSelectionOnContextMenu", !0), r("lineWiseCopyCut", !0), r("pasteLinesPerSelection", !0), r("selectionsMayTouch", !1), r("readOnly", !1, function (e, t) {
                "nocursor" == t && (kn(e), e.display.input.blur()), e.display.input.readOnlyChanged(t)
            }), r("screenReaderLabel", null, function (e, t) {
                t = "" === t ? null : t, e.display.input.screenReaderLabelChanged(t)
            }), r("disableInput", !1, function (e, t) {
                t || e.display.input.reset()
            }, !0), r("dragDrop", !0, xl), r("allowDropFileTypes", null), r("cursorBlinkRate", 530), r("cursorScrollMargin", 0), r("cursorHeight", 1, pn, !0), r("singleCursorHeightPerLine", !0, pn, !0), r("workTime", 100), r("workDelay", 100), r("flattenSpans", !0, Mi, !0), r("addModeClass", !1, Mi, !0), r("pollInterval", 100), r("undoDepth", 200, function (e, t) {
                return e.doc.history.undoDepth = t
            }), r("historyEventDelay", 1250), r("viewportMargin", 10, function (e) {
                return e.refresh()
            }, !0), r("maxHighlightLength", 1e4, Mi, !0), r("moveInputWithCursor", !0, function (e, t) {
                t || e.display.input.resetPosition()
            }), r("tabindex", null, function (e, t) {
                return e.display.input.getField().tabIndex = t || ""
            }), r("autofocus", null), r("direction", "ltr", function (e, t) {
                return e.doc.setDirection(t)
            }, !0), r("phrases", null)
        }(kl),
        function (e) {
            var t = e.optionHandlers,
                r = e.helpers = {};
            e.prototype = {
                constructor: e,
                focus: function () {
                    window.focus(), this.display.input.focus()
                },
                setOption: function (e, r) {
                    var n = this.options,
                        i = n[e];
                    n[e] == r && "mode" != e || (n[e] = r, t.hasOwnProperty(e) && Zn(this, t[e])(this, r, i), ge(this, "optionChange", this, e))
                },
                getOption: function (e) {
                    return this.options[e]
                },
                getDoc: function () {
                    return this.doc
                },
                addKeyMap: function (e, t) {
                    this.state.keyMaps[t ? "push" : "unshift"](Xo(e))
                },
                removeKeyMap: function (e) {
                    for (var t = this.state.keyMaps, r = 0; r < t.length; ++r)
                        if (t[r] == e || t[r].name == e) return t.splice(r, 1), !0
                },
                addOverlay: Qn(function (t, r) {
                    var n = t.token ? t : e.getMode(this.options, t);
                    if (n.startState) throw new Error("Overlays may not be stateful.");
                    ! function (e, t, r) {
                        for (var n = 0, i = r(t); n < e.length && r(e[n]) <= i;) n++;
                        e.splice(n, 0, t)
                    }(this.state.overlays, {
                        mode: n,
                        modeSpec: t,
                        opaque: r && r.opaque,
                        priority: r && r.priority || 0
                    }, function (e) {
                        return e.priority
                    }), this.state.modeGen++, un(this)
                }),
                removeOverlay: Qn(function (e) {
                    for (var t = this.state.overlays, r = 0; r < t.length; ++r) {
                        var n = t[r].modeSpec;
                        if (n == e || "string" == typeof e && n.name == e) return t.splice(r, 1), this.state.modeGen++, void un(this)
                    }
                }),
                indentLine: Qn(function (e, t, r) {
                    "string" != typeof t && "number" != typeof t && (t = null == t ? this.options.smartIndent ? "smart" : "prev" : t ? "add" : "subtract"), Qe(this.doc, e) && Ll(this, e, t, r)
                }),
                indentSelection: Qn(function (e) {
                    for (var t = this.doc.sel.ranges, r = -1, n = 0; n < t.length; n++) {
                        var i = t[n];
                        if (i.empty()) i.head.line > r && (Ll(this, i.head.line, e, !0), r = i.head.line, n == this.doc.sel.primIndex && An(this));
                        else {
                            var o = i.from(),
                                l = i.to(),
                                a = Math.max(r, o.line);
                            r = Math.min(this.lastLine(), l.line - (l.ch ? 0 : 1)) + 1;
                            for (var s = a; s < r; ++s) Ll(this, s, e);
                            var u = this.doc.sel.ranges;
                            0 == o.ch && t.length == u.length && u[n].from().ch > 0 && Xi(this.doc, n, new bi(o, u[n].to()), G)
                        }
                    }
                }),
                getTokenAt: function (e, t) {
                    return yt(this, e, t)
                },
                getLineTokens: function (e, t) {
                    return yt(this, et(e), t, !0)
                },
                getTokenTypeAt: function (e) {
                    e = at(this.doc, e);
                    var t, r = ht(this, Xe(this.doc, e.line)),
                        n = 0,
                        i = (r.length - 1) / 2,
                        o = e.ch;
                    if (0 == o) t = r[2];
                    else
                        for (;;) {
                            var l = n + i >> 1;
                            if ((l ? r[2 * l - 1] : 0) >= o) i = l;
                            else {
                                if (!(r[2 * l + 1] < o)) {
                                    t = r[2 * l + 2];
                                    break
                                }
                                n = l + 1
                            }
                        }
                    var a = t ? t.indexOf("overlay ") : -1;
                    return a < 0 ? t : 0 == a ? null : t.slice(0, a - 1)
                },
                getModeAt: function (t) {
                    var r = this.doc.mode;
                    return r.innerMode ? e.innerMode(r, this.getTokenAt(t).state).mode : r
                },
                getHelper: function (e, t) {
                    return this.getHelpers(e, t)[0]
                },
                getHelpers: function (e, t) {
                    var n = [];
                    if (!r.hasOwnProperty(t)) return n;
                    var i = r[t],
                        o = this.getModeAt(e);
                    if ("string" == typeof o[t]) i[o[t]] && n.push(i[o[t]]);
                    else if (o[t])
                        for (var l = 0; l < o[t].length; l++) {
                            var a = i[o[t][l]];
                            a && n.push(a)
                        } else o.helperType && i[o.helperType] ? n.push(i[o.helperType]) : i[o.name] && n.push(i[o.name]);
                    for (var s = 0; s < i._global.length; s++) {
                        var u = i._global[s];
                        u.pred(o, this) && -1 == B(n, u.val) && n.push(u.val)
                    }
                    return n
                },
                getStateAfter: function (e, t) {
                    var r = this.doc;
                    return dt(this, (e = lt(r, null == e ? r.first + r.size - 1 : e)) + 1, t).state
                },
                cursorCoords: function (e, t) {
                    var r = this.doc.sel.primary();
                    return Xr(this, null == e ? r.head : "object" == typeof e ? at(this.doc, e) : e ? r.from() : r.to(), t || "page")
                },
                charCoords: function (e, t) {
                    return Kr(this, at(this.doc, e), t || "page")
                },
                coordsChar: function (e, t) {
                    return Yr(this, (e = Ur(this, e, t || "page")).left, e.top)
                },
                lineAtHeight: function (e, t) {
                    return e = Ur(this, {
                        top: e,
                        left: 0
                    }, t || "page").top, Ze(this.doc, e + this.display.viewOffset)
                },
                heightAtLine: function (e, t, r) {
                    var n, i = !1;
                    if ("number" == typeof e) {
                        var o = this.doc.first + this.doc.size - 1;
                        e < this.doc.first ? e = this.doc.first : e > o && (e = o, i = !0), n = Xe(this.doc, e)
                    } else n = e;
                    return Gr(this, n, {
                        top: 0,
                        left: 0
                    }, t || "page", r || i).top + (i ? this.doc.height - Gt(n) : 0)
                },
                defaultTextHeight: function () {
                    return en(this.display)
                },
                defaultCharWidth: function () {
                    return tn(this.display)
                },
                getViewport: function () {
                    return {
                        from: this.display.viewFrom,
                        to: this.display.viewTo
                    }
                },
                addWidget: function (e, t, r, n, i) {
                    var o, l, a, s = this.display,
                        u = (e = Xr(this, at(this.doc, e))).bottom,
                        c = e.left;
                    if (t.style.position = "absolute", t.setAttribute("cm-ignore-events", "true"), this.display.input.setUneditable(t), s.sizer.appendChild(t), "over" == n) u = e.top;
                    else if ("above" == n || "near" == n) {
                        var f = Math.max(s.wrapper.clientHeight, this.doc.height),
                            h = Math.max(s.sizer.clientWidth, s.lineSpace.clientWidth);
                        ("above" == n || e.bottom + t.offsetHeight > f) && e.top > t.offsetHeight ? u = e.top - t.offsetHeight : e.bottom + t.offsetHeight <= f && (u = e.bottom), c + t.offsetWidth > h && (c = h - t.offsetWidth)
                    }
                    t.style.top = u + "px", t.style.left = t.style.right = "", "right" == i ? (c = s.sizer.clientWidth - t.offsetWidth, t.style.right = "0px") : ("left" == i ? c = 0 : "middle" == i && (c = (s.sizer.clientWidth - t.offsetWidth) / 2), t.style.left = c + "px"), r && (o = this, l = {
                        left: c,
                        top: u,
                        right: c + t.offsetWidth,
                        bottom: u + t.offsetHeight
                    }, null != (a = Mn(o, l)).scrollTop && Hn(o, a.scrollTop), null != a.scrollLeft && Fn(o, a.scrollLeft))
                },
                triggerOnKeyDown: Qn(ll),
                triggerOnKeyPress: Qn(sl),
                triggerOnKeyUp: al,
                triggerOnMouseDown: Qn(hl),
                execCommand: function (e) {
                    if (Zo.hasOwnProperty(e)) return Zo[e].call(null, this)
                },
                triggerElectric: Qn(function (e) {
                    Ol(this, e)
                }),
                findPosH: function (e, t, r, n) {
                    var i = 1;
                    t < 0 && (i = -1, t = -t);
                    for (var o = at(this.doc, e), l = 0; l < t && !(o = El(this.doc, o, i, r, n)).hitSide; ++l);
                    return o
                },
                moveH: Qn(function (e, t) {
                    var r = this;
                    this.extendSelectionsBy(function (n) {
                        return r.display.shift || r.doc.extend || n.empty() ? El(r.doc, n.head, e, t, r.options.rtlMoveVisually) : e < 0 ? n.from() : n.to()
                    }, K)
                }),
                deleteH: Qn(function (e, t) {
                    var r = this.doc.sel,
                        n = this.doc;
                    r.somethingSelected() ? n.replaceSelection("", null, "+delete") : $o(this, function (r) {
                        var i = El(n, r.head, e, t, !1);
                        return e < 0 ? {
                            from: i,
                            to: r.head
                        } : {
                            from: r.head,
                            to: i
                        }
                    })
                }),
                findPosV: function (e, t, r, n) {
                    var i = 1,
                        o = n;
                    t < 0 && (i = -1, t = -t);
                    for (var l = at(this.doc, e), a = 0; a < t; ++a) {
                        var s = Xr(this, l, "div");
                        if (null == o ? o = s.left : s.left = o, (l = Fl(this, s, i, r)).hitSide) break
                    }
                    return l
                },
                moveV: Qn(function (e, t) {
                    var r = this,
                        n = this.doc,
                        i = [],
                        o = !this.display.shift && !n.extend && n.sel.somethingSelected();
                    if (n.extendSelectionsBy(function (l) {
                            if (o) return e < 0 ? l.from() : l.to();
                            var a = Xr(r, l.head, "div");
                            null != l.goalColumn && (a.left = l.goalColumn), i.push(a.left);
                            var s = Fl(r, a, e, t);
                            return "page" == t && l == n.sel.primary() && Nn(r, Kr(r, s, "div").top - a.top), s
                        }, K), i.length)
                        for (var l = 0; l < n.sel.ranges.length; l++) n.sel.ranges[l].goalColumn = i[l]
                }),
                findWordAt: function (e) {
                    var t = Xe(this.doc, e.line).text,
                        r = e.ch,
                        n = e.ch;
                    if (t) {
                        var i = this.getHelper(e, "wordChars");
                        "before" != e.sticky && n != t.length || !r ? ++n : --r;
                        for (var o = t.charAt(r), l = te(o, i) ? function (e) {
                                return te(e, i)
                            } : /\s/.test(o) ? function (e) {
                                return /\s/.test(e)
                            } : function (e) {
                                return !/\s/.test(e) && !te(e)
                            }; r > 0 && l(t.charAt(r - 1));) --r;
                        for (; n < t.length && l(t.charAt(n));) ++n
                    }
                    return new bi(et(e.line, r), et(e.line, n))
                },
                toggleOverwrite: function (e) {
                    null != e && e == this.state.overwrite || ((this.state.overwrite = !this.state.overwrite) ? H(this.display.cursorDiv, "CodeMirror-overwrite") : T(this.display.cursorDiv, "CodeMirror-overwrite"), ge(this, "overwriteToggle", this, this.state.overwrite))
                },
                hasFocus: function () {
                    return this.display.input.getField() == W()
                },
                isReadOnly: function () {
                    return !(!this.options.readOnly && !this.doc.cantEdit)
                },
                scrollTo: Qn(function (e, t) {
                    On(this, e, t)
                }),
                getScrollInfo: function () {
                    var e = this.display.scroller;
                    return {
                        left: e.scrollLeft,
                        top: e.scrollTop,
                        height: e.scrollHeight - Lr(this) - this.display.barHeight,
                        width: e.scrollWidth - Lr(this) - this.display.barWidth,
                        clientHeight: Mr(this),
                        clientWidth: Tr(this)
                    }
                },
                scrollIntoView: Qn(function (e, t) {
                    null == e ? (e = {
                        from: this.doc.sel.primary().head,
                        to: null
                    }, null == t && (t = this.options.cursorScrollMargin)) : "number" == typeof e ? e = {
                        from: et(e, 0),
                        to: null
                    } : null == e.from && (e = {
                        from: e,
                        to: null
                    }), e.to || (e.to = e.from), e.margin = t || 0, null != e.from.line ? function (e, t) {
                        Dn(e), e.curOp.scrollToPos = t
                    }(this, e) : Wn(this, e.from, e.to, e.margin)
                }),
                setSize: Qn(function (e, t) {
                    var r = this,
                        n = function (e) {
                            return "number" == typeof e || /^\d+$/.test(String(e)) ? e + "px" : e
                        };
                    null != e && (this.display.wrapper.style.width = n(e)), null != t && (this.display.wrapper.style.height = n(t)), this.options.lineWrapping && zr(this);
                    var i = this.display.viewFrom;
                    this.doc.iter(i, this.display.viewTo, function (e) {
                        if (e.widgets)
                            for (var t = 0; t < e.widgets.length; t++)
                                if (e.widgets[t].noHScroll) {
                                    cn(r, i, "widget");
                                    break
                                }++ i
                    }), this.curOp.forceUpdate = !0, ge(this, "refresh", this)
                }),
                operation: function (e) {
                    return qn(this, e)
                },
                startOperation: function () {
                    return Un(this)
                },
                endOperation: function () {
                    return Kn(this)
                },
                refresh: Qn(function () {
                    var e = this.display.cachedTextHeight;
                    un(this), this.curOp.forceUpdate = !0, Rr(this), On(this, this.doc.scrollLeft, this.doc.scrollTop), li(this.display), (null == e || Math.abs(e - en(this.display)) > .5 || this.options.lineWrapping) && ln(this), ge(this, "refresh", this)
                }),
                swapDoc: Qn(function (e) {
                    var t = this.doc;
                    return t.cm = null, this.state.selectingText && this.state.selectingText(), Di(this, e), Rr(this), this.display.input.reset(), On(this, e.scrollLeft, e.scrollTop), this.curOp.forceScroll = !0, ar(this, "swapDoc", this, t), t
                }),
                phrase: function (e) {
                    var t = this.options.phrases;
                    return t && Object.prototype.hasOwnProperty.call(t, e) ? t[e] : e
                },
                getInputField: function () {
                    return this.display.input.getField()
                },
                getWrapperElement: function () {
                    return this.display.wrapper
                },
                getScrollerElement: function () {
                    return this.display.scroller
                },
                getGutterElement: function () {
                    return this.display.gutters
                }
            }, be(e), e.registerHelper = function (t, n, i) {
                r.hasOwnProperty(t) || (r[t] = e[t] = {
                    _global: []
                }), r[t][n] = i
            }, e.registerGlobalHelper = function (t, n, i, o) {
                e.registerHelper(t, n, o), r[t]._global.push({
                    pred: i,
                    val: o
                })
            }
        }(kl);
    var Vl = "iter insert remove copy getEditor constructor".split(" ");
    for (var Gl in Mo.prototype) Mo.prototype.hasOwnProperty(Gl) && B(Vl, Gl) < 0 && (kl.prototype[Gl] = function (e) {
        return function () {
            return e.apply(this.doc, arguments)
        }
    }(Mo.prototype[Gl]));
    return be(Mo), kl.inputStyles = {
            textarea: jl,
            contenteditable: Pl
        }, kl.defineMode = function (e) {
            kl.defaults.mode || "null" == e || (kl.defaults.mode = e),
                function (e, t) {
                    arguments.length > 2 && (t.dependencies = Array.prototype.slice.call(arguments, 2)), Pe[e] = t
                }.apply(this, arguments)
        }, kl.defineMIME = function (e, t) {
            Ie[e] = t
        }, kl.defineMode("null", function () {
            return {
                token: function (e) {
                    return e.skipToEnd()
                }
            }
        }), kl.defineMIME("text/plain", "null"), kl.defineExtension = function (e, t) {
            kl.prototype[e] = t
        }, kl.defineDocExtension = function (e, t) {
            Mo.prototype[e] = t
        }, kl.fromTextArea = function (e, t) {
            if ((t = t ? I(t) : {}).value = e.value, !t.tabindex && e.tabIndex && (t.tabindex = e.tabIndex), !t.placeholder && e.placeholder && (t.placeholder = e.placeholder), null == t.autofocus) {
                var r = W();
                t.autofocus = r == e || null != e.getAttribute("autofocus") && r == document.body
            }

            function n() {
                e.value = a.getValue()
            }
            var i;
            if (e.form && (he(e.form, "submit", n), !t.leaveSubmitMethodAlone)) {
                var o = e.form;
                i = o.submit;
                try {
                    var l = o.submit = function () {
                        n(), o.submit = i, o.submit(), o.submit = l
                    }
                } catch (e) {}
            }
            t.finishInit = function (r) {
                r.save = n, r.getTextArea = function () {
                    return e
                }, r.toTextArea = function () {
                    r.toTextArea = isNaN, n(), e.parentNode.removeChild(r.getWrapperElement()), e.style.display = "", e.form && (pe(e.form, "submit", n), t.leaveSubmitMethodAlone || "function" != typeof e.form.submit || (e.form.submit = i))
                }
            }, e.style.display = "none";
            var a = kl(function (t) {
                return e.parentNode.insertBefore(t, e.nextSibling)
            }, t);
            return a
        },
        function (e) {
            e.off = pe, e.on = he, e.wheelEventPixels = vi, e.Doc = Mo, e.splitLines = We, e.countColumn = z, e.findColumn = X, e.isWordChar = ee, e.Pass = V, e.signal = ge, e.Line = Xt, e.changeEnd = Ci, e.scrollbarModel = jn, e.Pos = et, e.cmpPos = tt, e.modes = Pe, e.mimeModes = Ie, e.resolveMode = ze, e.getMode = Re, e.modeExtensions = Be, e.extendMode = je, e.copyState = Ve, e.startState = Ue, e.innerMode = Ge, e.commands = Zo, e.keyMap = Ro, e.keyName = Ko, e.isModifierKey = Go, e.lookupKey = Vo, e.normalizeKeyMap = jo, e.StringStream = Ke, e.SharedTextMarker = ko, e.TextMarker = xo, e.LineWidget = yo, e.e_preventDefault = we, e.e_stopPropagation = xe, e.e_stop = ke, e.addClass = H, e.contains = D, e.rmClass = T, e.keyNames = Fo
        }(kl), kl.version = "5.57.0", kl
}),
function (e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function (e) {
    "use strict";
    e.defineMode("javascript", function (t, r) {
        var n, i, o = t.indentUnit,
            l = r.statementIndent,
            a = r.jsonld,
            s = r.json || a,
            u = r.typescript,
            c = r.wordCharacters || /[\w$\xa1-\uffff]/,
            f = function () {
                function e(e) {
                    return {
                        type: e,
                        style: "keyword"
                    }
                }
                var t = e("keyword a"),
                    r = e("keyword b"),
                    n = e("keyword c"),
                    i = e("keyword d"),
                    o = e("operator"),
                    l = {
                        type: "atom",
                        style: "atom"
                    };
                return {
                    if: e("if"),
                    while: t,
                    with: t,
                    else: r,
                    do: r,
                    try: r,
                    finally: r,
                    return: i,
                    break: i,
                    continue: i,
                    new: e("new"),
                    delete: n,
                    void: n,
                    throw: n,
                    debugger: e("debugger"),
                    var: e("var"),
                    const: e("var"),
                    let: e("var"),
                    function: e("function"),
                    catch: e("catch"),
                    for: e("for"),
                    switch: e("switch"),
                    case: e("case"),
                    default: e("default"),
                    in: o,
                    typeof: o,
                    instanceof: o,
                    true: l,
                    false: l,
                    null: l,
                    undefined: l,
                    NaN: l,
                    Infinity: l,
                    this: e("this"),
                    class: e("class"),
                    super: e("atom"),
                    yield: n,
                    export: e("export"),
                    import: e("import"),
                    extends: n,
                    await: n
                }
            }(),
            h = /[+\-*&%=<>!?|~^@]/,
            d = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;

        function p(e, t, r) {
            return n = e, i = r, t
        }

        function g(e, t) {
            var r, n = e.next();
            if ('"' == n || "'" == n) return t.tokenize = (r = n, function (e, t) {
                var n, i = !1;
                if (a && "@" == e.peek() && e.match(d)) return t.tokenize = g, p("jsonld-keyword", "meta");
                for (; null != (n = e.next()) && (n != r || i);) i = !i && "\\" == n;
                return i || (t.tokenize = g), p("string", "string")
            }), t.tokenize(e, t);
            if ("." == n && e.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/)) return p("number", "number");
            if ("." == n && e.match("..")) return p("spread", "meta");
            if (/[\[\]{}\(\),;\:\.]/.test(n)) return p(n);
            if ("=" == n && e.eat(">")) return p("=>", "operator");
            if ("0" == n && e.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/)) return p("number", "number");
            if (/\d/.test(n)) return e.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/), p("number", "number");
            if ("/" == n) return e.eat("*") ? (t.tokenize = v, v(e, t)) : e.eat("/") ? (e.skipToEnd(), p("comment", "comment")) : _e(e, t, 1) ? (function (e) {
                for (var t, r = !1, n = !1; null != (t = e.next());) {
                    if (!r) {
                        if ("/" == t && !n) return;
                        "[" == t ? n = !0 : n && "]" == t && (n = !1)
                    }
                    r = !r && "\\" == t
                }
            }(e), e.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/), p("regexp", "string-2")) : (e.eat("="), p("operator", "operator", e.current()));
            if ("`" == n) return t.tokenize = m, m(e, t);
            if ("#" == n && "!" == e.peek()) return e.skipToEnd(), p("meta", "meta");
            if ("#" == n && e.eatWhile(c)) return p("variable", "property");
            if ("<" == n && e.match("!--") || "-" == n && e.match("->") && !/\S/.test(e.string.slice(0, e.start))) return e.skipToEnd(), p("comment", "comment");
            if (h.test(n)) return ">" == n && t.lexical && ">" == t.lexical.type || (e.eat("=") ? "!" != n && "=" != n || e.eat("=") : /[<>*+\-]/.test(n) && (e.eat(n), ">" == n && e.eat(n))), "?" == n && e.eat(".") ? p(".") : p("operator", "operator", e.current());
            if (c.test(n)) {
                e.eatWhile(c);
                var i = e.current();
                if ("." != t.lastType) {
                    if (f.propertyIsEnumerable(i)) {
                        var o = f[i];
                        return p(o.type, o.style, i)
                    }
                    if ("async" == i && e.match(/^(\s|\/\*.*?\*\/)*[\[\(\w]/, !1)) return p("async", "keyword", i)
                }
                return p("variable", "variable", i)
            }
        }

        function v(e, t) {
            for (var r, n = !1; r = e.next();) {
                if ("/" == r && n) {
                    t.tokenize = g;
                    break
                }
                n = "*" == r
            }
            return p("comment", "comment")
        }

        function m(e, t) {
            for (var r, n = !1; null != (r = e.next());) {
                if (!n && ("`" == r || "$" == r && e.eat("{"))) {
                    t.tokenize = g;
                    break
                }
                n = !n && "\\" == r
            }
            return p("quasi", "string-2", e.current())
        }
        var y = "([{}])";

        function b(e, t) {
            t.fatArrowAt && (t.fatArrowAt = null);
            var r = e.string.indexOf("=>", e.start);
            if (!(r < 0)) {
                if (u) {
                    var n = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(e.string.slice(e.start, r));
                    n && (r = n.index)
                }
                for (var i = 0, o = !1, l = r - 1; l >= 0; --l) {
                    var a = e.string.charAt(l),
                        s = y.indexOf(a);
                    if (s >= 0 && s < 3) {
                        if (!i) {
                            ++l;
                            break
                        }
                        if (0 == --i) {
                            "(" == a && (o = !0);
                            break
                        }
                    } else if (s >= 3 && s < 6) ++i;
                    else if (c.test(a)) o = !0;
                    else if (/["'\/`]/.test(a))
                        for (;; --l) {
                            if (0 == l) return;
                            if (e.string.charAt(l - 1) == a && "\\" != e.string.charAt(l - 2)) {
                                l--;
                                break
                            }
                        } else if (o && !i) {
                            ++l;
                            break
                        }
                }
                o && !i && (t.fatArrowAt = l)
            }
        }
        var w = {
            atom: !0,
            number: !0,
            variable: !0,
            string: !0,
            regexp: !0,
            this: !0,
            "jsonld-keyword": !0
        };

        function x(e, t, r, n, i, o) {
            this.indented = e, this.column = t, this.type = r, this.prev = i, this.info = o, null != n && (this.align = n)
        }

        function C(e, t) {
            for (var r = e.localVars; r; r = r.next)
                if (r.name == t) return !0;
            for (var n = e.context; n; n = n.prev)
                for (r = n.vars; r; r = r.next)
                    if (r.name == t) return !0
        }
        var k = {
            state: null,
            column: null,
            marked: null,
            cc: null
        };

        function S() {
            for (var e = arguments.length - 1; e >= 0; e--) k.cc.push(arguments[e])
        }

        function L() {
            return S.apply(null, arguments), !0
        }

        function T(e, t) {
            for (var r = t; r; r = r.next)
                if (r.name == e) return !0;
            return !1
        }

        function M(e) {
            var t = k.state;
            if (k.marked = "def", t.context)
                if ("var" == t.lexical.info && t.context && t.context.block) {
                    var n = function e(t, r) {
                        if (r) {
                            if (r.block) {
                                var n = e(t, r.prev);
                                return n ? n == r.prev ? r : new A(n, r.vars, !0) : null
                            }
                            return T(t, r.vars) ? r : new A(r.prev, new O(t, r.vars), !1)
                        }
                        return null
                    }(e, t.context);
                    if (null != n) return void(t.context = n)
                } else if (!T(e, t.localVars)) return void(t.localVars = new O(e, t.localVars));
            r.globalVars && !T(e, t.globalVars) && (t.globalVars = new O(e, t.globalVars))
        }

        function N(e) {
            return "public" == e || "private" == e || "protected" == e || "abstract" == e || "readonly" == e
        }

        function A(e, t, r) {
            this.prev = e, this.vars = t, this.block = r
        }

        function O(e, t) {
            this.name = e, this.next = t
        }
        var D = new O("this", new O("arguments", null));

        function W() {
            k.state.context = new A(k.state.context, k.state.localVars, !1), k.state.localVars = D
        }

        function H() {
            k.state.context = new A(k.state.context, k.state.localVars, !0), k.state.localVars = null
        }

        function E() {
            k.state.localVars = k.state.context.vars, k.state.context = k.state.context.prev
        }

        function F(e, t) {
            var r = function () {
                var r = k.state,
                    n = r.indented;
                if ("stat" == r.lexical.type) n = r.lexical.indented;
                else
                    for (var i = r.lexical; i && ")" == i.type && i.align; i = i.prev) n = i.indented;
                r.lexical = new x(n, k.stream.column(), e, null, r.lexical, t)
            };
            return r.lex = !0, r
        }

        function P() {
            var e = k.state;
            e.lexical.prev && (")" == e.lexical.type && (e.indented = e.lexical.indented), e.lexical = e.lexical.prev)
        }

        function I(e) {
            return function t(r) {
                return r == e ? L() : ";" == e || "}" == r || ")" == r || "]" == r ? S() : L(t)
            }
        }

        function z(e, t) {
            return "var" == e ? L(F("vardef", t), be, I(";"), P) : "keyword a" == e ? L(F("form"), V, z, P) : "keyword b" == e ? L(F("form"), z, P) : "keyword d" == e ? k.stream.match(/^\s*$/, !1) ? L() : L(F("stat"), U, I(";"), P) : "debugger" == e ? L(I(";")) : "{" == e ? L(F("}"), H, le, P, E) : ";" == e ? L() : "if" == e ? ("else" == k.state.lexical.info && k.state.cc[k.state.cc.length - 1] == P && k.state.cc.pop()(), L(F("form"), V, z, P, Le)) : "function" == e ? L(Ae) : "for" == e ? L(F("form"), Te, z, P) : "class" == e || u && "interface" == t ? (k.marked = "keyword", L(F("form", "class" == e ? e : t), Ee, P)) : "variable" == e ? u && "declare" == t ? (k.marked = "keyword", L(z)) : u && ("module" == t || "enum" == t || "type" == t) && k.stream.match(/^\s*\w/, !1) ? (k.marked = "keyword", "enum" == t ? L(Xe) : "type" == t ? L(De, I("operator"), fe, I(";")) : L(F("form"), we, I("{"), F("}"), le, P, P)) : u && "namespace" == t ? (k.marked = "keyword", L(F("form"), B, z, P)) : u && "abstract" == t ? (k.marked = "keyword", L(z)) : L(F("stat"), J) : "switch" == e ? L(F("form"), V, I("{"), F("}", "switch"), H, le, P, P, E) : "case" == e ? L(B, I(":")) : "default" == e ? L(I(":")) : "catch" == e ? L(F("form"), W, R, z, P, E) : "export" == e ? L(F("stat"), ze, P) : "import" == e ? L(F("stat"), Be, P) : "async" == e ? L(z) : "@" == t ? L(B, z) : S(F("stat"), B, I(";"), P)
        }

        function R(e) {
            if ("(" == e) return L(We, I(")"))
        }

        function B(e, t) {
            return G(e, t, !1)
        }

        function j(e, t) {
            return G(e, t, !0)
        }

        function V(e) {
            return "(" != e ? S() : L(F(")"), U, I(")"), P)
        }

        function G(e, t, r) {
            if (k.state.fatArrowAt == k.stream.start) {
                var n = r ? q : Y;
                if ("(" == e) return L(W, F(")"), ie(We, ")"), P, I("=>"), n, E);
                if ("variable" == e) return S(W, we, I("=>"), n, E)
            }
            var i = r ? X : K;
            return w.hasOwnProperty(e) ? L(i) : "function" == e ? L(Ae, i) : "class" == e || u && "interface" == t ? (k.marked = "keyword", L(F("form"), He, P)) : "keyword c" == e || "async" == e ? L(r ? j : B) : "(" == e ? L(F(")"), U, I(")"), P, i) : "operator" == e || "spread" == e ? L(r ? j : B) : "[" == e ? L(F("]"), Ke, P, i) : "{" == e ? oe(te, "}", null, i) : "quasi" == e ? S($, i) : "new" == e ? L(function (e) {
                return function (t) {
                    return "." == t ? L(e ? Q : Z) : "variable" == t && u ? L(ve, e ? X : K) : S(e ? j : B)
                }
            }(r)) : "import" == e ? L(B) : L()
        }

        function U(e) {
            return e.match(/[;\}\)\],]/) ? S() : S(B)
        }

        function K(e, t) {
            return "," == e ? L(U) : X(e, t, !1)
        }

        function X(e, t, r) {
            var n = 0 == r ? K : X,
                i = 0 == r ? B : j;
            return "=>" == e ? L(W, r ? q : Y, E) : "operator" == e ? /\+\+|--/.test(t) || u && "!" == t ? L(n) : u && "<" == t && k.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/, !1) ? L(F(">"), ie(fe, ">"), P, n) : "?" == t ? L(B, I(":"), i) : L(i) : "quasi" == e ? S($, n) : ";" != e ? "(" == e ? oe(j, ")", "call", n) : "." == e ? L(ee, n) : "[" == e ? L(F("]"), U, I("]"), P, n) : u && "as" == t ? (k.marked = "keyword", L(fe, n)) : "regexp" == e ? (k.state.lastType = k.marked = "operator", k.stream.backUp(k.stream.pos - k.stream.start - 1), L(i)) : void 0 : void 0
        }

        function $(e, t) {
            return "quasi" != e ? S() : "${" != t.slice(t.length - 2) ? L($) : L(B, _)
        }

        function _(e) {
            if ("}" == e) return k.marked = "string-2", k.state.tokenize = m, L($)
        }

        function Y(e) {
            return b(k.stream, k.state), S("{" == e ? z : B)
        }

        function q(e) {
            return b(k.stream, k.state), S("{" == e ? z : j)
        }

        function Z(e, t) {
            if ("target" == t) return k.marked = "keyword", L(K)
        }

        function Q(e, t) {
            if ("target" == t) return k.marked = "keyword", L(X)
        }

        function J(e) {
            return ":" == e ? L(P, z) : S(K, I(";"), P)
        }

        function ee(e) {
            if ("variable" == e) return k.marked = "property", L()
        }

        function te(e, t) {
            if ("async" == e) return k.marked = "property", L(te);
            if ("variable" == e || "keyword" == k.style) {
                return k.marked = "property", "get" == t || "set" == t ? L(re) : (u && k.state.fatArrowAt == k.stream.start && (r = k.stream.match(/^\s*:\s*/, !1)) && (k.state.fatArrowAt = k.stream.pos + r[0].length), L(ne));
                var r
            } else {
                if ("number" == e || "string" == e) return k.marked = a ? "property" : k.style + " property", L(ne);
                if ("jsonld-keyword" == e) return L(ne);
                if (u && N(t)) return k.marked = "keyword", L(te);
                if ("[" == e) return L(B, ae, I("]"), ne);
                if ("spread" == e) return L(j, ne);
                if ("*" == t) return k.marked = "keyword", L(te);
                if (":" == e) return S(ne)
            }
        }

        function re(e) {
            return "variable" != e ? S(ne) : (k.marked = "property", L(Ae))
        }

        function ne(e) {
            return ":" == e ? L(j) : "(" == e ? S(Ae) : void 0
        }

        function ie(e, t, r) {
            function n(i, o) {
                if (r ? r.indexOf(i) > -1 : "," == i) {
                    var l = k.state.lexical;
                    return "call" == l.info && (l.pos = (l.pos || 0) + 1), L(function (r, n) {
                        return r == t || n == t ? S() : S(e)
                    }, n)
                }
                return i == t || o == t ? L() : r && r.indexOf(";") > -1 ? S(e) : L(I(t))
            }
            return function (r, i) {
                return r == t || i == t ? L() : S(e, n)
            }
        }

        function oe(e, t, r) {
            for (var n = 3; n < arguments.length; n++) k.cc.push(arguments[n]);
            return L(F(t, r), ie(e, t), P)
        }

        function le(e) {
            return "}" == e ? L() : S(z, le)
        }

        function ae(e, t) {
            if (u) {
                if (":" == e) return L(fe);
                if ("?" == t) return L(ae)
            }
        }

        function se(e, t) {
            if (u && (":" == e || "in" == t)) return L(fe)
        }

        function ue(e) {
            if (u && ":" == e) return k.stream.match(/^\s*\w+\s+is\b/, !1) ? L(B, ce, fe) : L(fe)
        }

        function ce(e, t) {
            if ("is" == t) return k.marked = "keyword", L()
        }

        function fe(e, t) {
            return "keyof" == t || "typeof" == t || "infer" == t ? (k.marked = "keyword", L("typeof" == t ? j : fe)) : "variable" == e || "void" == t ? (k.marked = "type", L(ge)) : "|" == t || "&" == t ? L(fe) : "string" == e || "number" == e || "atom" == e ? L(ge) : "[" == e ? L(F("]"), ie(fe, "]", ","), P, ge) : "{" == e ? L(F("}"), ie(de, "}", ",;"), P, ge) : "(" == e ? L(ie(pe, ")"), he, ge) : "<" == e ? L(ie(fe, ">"), fe) : void 0
        }

        function he(e) {
            if ("=>" == e) return L(fe)
        }

        function de(e, t) {
            return "variable" == e || "keyword" == k.style ? (k.marked = "property", L(de)) : "?" == t || "number" == e || "string" == e ? L(de) : ":" == e ? L(fe) : "[" == e ? L(I("variable"), se, I("]"), de) : "(" == e ? S(Oe, de) : void 0
        }

        function pe(e, t) {
            return "variable" == e && k.stream.match(/^\s*[?:]/, !1) || "?" == t ? L(pe) : ":" == e ? L(fe) : "spread" == e ? L(pe) : S(fe)
        }

        function ge(e, t) {
            return "<" == t ? L(F(">"), ie(fe, ">"), P, ge) : "|" == t || "." == e || "&" == t ? L(fe) : "[" == e ? L(fe, I("]"), ge) : "extends" == t || "implements" == t ? (k.marked = "keyword", L(fe)) : "?" == t ? L(fe, I(":"), fe) : void 0
        }

        function ve(e, t) {
            if ("<" == t) return L(F(">"), ie(fe, ">"), P, ge)
        }

        function me() {
            return S(fe, ye)
        }

        function ye(e, t) {
            if ("=" == t) return L(fe)
        }

        function be(e, t) {
            return "enum" == t ? (k.marked = "keyword", L(Xe)) : S(we, ae, ke, Se)
        }

        function we(e, t) {
            return u && N(t) ? (k.marked = "keyword", L(we)) : "variable" == e ? (M(t), L()) : "spread" == e ? L(we) : "[" == e ? oe(Ce, "]") : "{" == e ? oe(xe, "}") : void 0
        }

        function xe(e, t) {
            return "variable" != e || k.stream.match(/^\s*:/, !1) ? ("variable" == e && (k.marked = "property"), "spread" == e ? L(we) : "}" == e ? S() : "[" == e ? L(B, I("]"), I(":"), xe) : L(I(":"), we, ke)) : (M(t), L(ke))
        }

        function Ce() {
            return S(we, ke)
        }

        function ke(e, t) {
            if ("=" == t) return L(j)
        }

        function Se(e) {
            if ("," == e) return L(be)
        }

        function Le(e, t) {
            if ("keyword b" == e && "else" == t) return L(F("form", "else"), z, P)
        }

        function Te(e, t) {
            return "await" == t ? L(Te) : "(" == e ? L(F(")"), Me, P) : void 0
        }

        function Me(e) {
            return "var" == e ? L(be, Ne) : "variable" == e ? L(Ne) : S(Ne)
        }

        function Ne(e, t) {
            return ")" == e ? L() : ";" == e ? L(Ne) : "in" == t || "of" == t ? (k.marked = "keyword", L(B, Ne)) : S(B, Ne)
        }

        function Ae(e, t) {
            return "*" == t ? (k.marked = "keyword", L(Ae)) : "variable" == e ? (M(t), L(Ae)) : "(" == e ? L(W, F(")"), ie(We, ")"), P, ue, z, E) : u && "<" == t ? L(F(">"), ie(me, ">"), P, Ae) : void 0
        }

        function Oe(e, t) {
            return "*" == t ? (k.marked = "keyword", L(Oe)) : "variable" == e ? (M(t), L(Oe)) : "(" == e ? L(W, F(")"), ie(We, ")"), P, ue, E) : u && "<" == t ? L(F(">"), ie(me, ">"), P, Oe) : void 0
        }

        function De(e, t) {
            return "keyword" == e || "variable" == e ? (k.marked = "type", L(De)) : "<" == t ? L(F(">"), ie(me, ">"), P) : void 0
        }

        function We(e, t) {
            return "@" == t && L(B, We), "spread" == e ? L(We) : u && N(t) ? (k.marked = "keyword", L(We)) : u && "this" == e ? L(ae, ke) : S(we, ae, ke)
        }

        function He(e, t) {
            return "variable" == e ? Ee(e, t) : Fe(e, t)
        }

        function Ee(e, t) {
            if ("variable" == e) return M(t), L(Fe)
        }

        function Fe(e, t) {
            return "<" == t ? L(F(">"), ie(me, ">"), P, Fe) : "extends" == t || "implements" == t || u && "," == e ? ("implements" == t && (k.marked = "keyword"), L(u ? fe : B, Fe)) : "{" == e ? L(F("}"), Pe, P) : void 0
        }

        function Pe(e, t) {
            return "async" == e || "variable" == e && ("static" == t || "get" == t || "set" == t || u && N(t)) && k.stream.match(/^\s+[\w$\xa1-\uffff]/, !1) ? (k.marked = "keyword", L(Pe)) : "variable" == e || "keyword" == k.style ? (k.marked = "property", L(Ie, Pe)) : "number" == e || "string" == e ? L(Ie, Pe) : "[" == e ? L(B, ae, I("]"), Ie, Pe) : "*" == t ? (k.marked = "keyword", L(Pe)) : u && "(" == e ? S(Oe, Pe) : ";" == e || "," == e ? L(Pe) : "}" == e ? L() : "@" == t ? L(B, Pe) : void 0
        }

        function Ie(e, t) {
            if ("?" == t) return L(Ie);
            if (":" == e) return L(fe, ke);
            if ("=" == t) return L(j);
            var r = k.state.lexical.prev;
            return S(r && "interface" == r.info ? Oe : Ae)
        }

        function ze(e, t) {
            return "*" == t ? (k.marked = "keyword", L(Ue, I(";"))) : "default" == t ? (k.marked = "keyword", L(B, I(";"))) : "{" == e ? L(ie(Re, "}"), Ue, I(";")) : S(z)
        }

        function Re(e, t) {
            return "as" == t ? (k.marked = "keyword", L(I("variable"))) : "variable" == e ? S(j, Re) : void 0
        }

        function Be(e) {
            return "string" == e ? L() : "(" == e ? S(B) : S(je, Ve, Ue)
        }

        function je(e, t) {
            return "{" == e ? oe(je, "}") : ("variable" == e && M(t), "*" == t && (k.marked = "keyword"), L(Ge))
        }

        function Ve(e) {
            if ("," == e) return L(je, Ve)
        }

        function Ge(e, t) {
            if ("as" == t) return k.marked = "keyword", L(je)
        }

        function Ue(e, t) {
            if ("from" == t) return k.marked = "keyword", L(B)
        }

        function Ke(e) {
            return "]" == e ? L() : S(ie(j, "]"))
        }

        function Xe() {
            return S(F("form"), we, I("{"), F("}"), ie($e, "}"), P, P)
        }

        function $e() {
            return S(we, ke)
        }

        function _e(e, t, r) {
            return t.tokenize == g && /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(t.lastType) || "quasi" == t.lastType && /\{\s*$/.test(e.string.slice(0, e.pos - (r || 0)))
        }
        return E.lex = !0, P.lex = !0, {
            startState: function (e) {
                var t = {
                    tokenize: g,
                    lastType: "sof",
                    cc: [],
                    lexical: new x((e || 0) - o, 0, "block", !1),
                    localVars: r.localVars,
                    context: r.localVars && new A(null, null, !1),
                    indented: e || 0
                };
                return r.globalVars && "object" == typeof r.globalVars && (t.globalVars = r.globalVars), t
            },
            token: function (e, t) {
                if (e.sol() && (t.lexical.hasOwnProperty("align") || (t.lexical.align = !1), t.indented = e.indentation(), b(e, t)), t.tokenize != v && e.eatSpace()) return null;
                var r = t.tokenize(e, t);
                return "comment" == n ? r : (t.lastType = "operator" != n || "++" != i && "--" != i ? n : "incdec", function (e, t, r, n, i) {
                    var o = e.cc;
                    for (k.state = e, k.stream = i, k.marked = null, k.cc = o, k.style = t, e.lexical.hasOwnProperty("align") || (e.lexical.align = !0);;)
                        if ((o.length ? o.pop() : s ? B : z)(r, n)) {
                            for (; o.length && o[o.length - 1].lex;) o.pop()();
                            return k.marked ? k.marked : "variable" == r && C(e, n) ? "variable-2" : t
                        }
                }(t, r, n, i, e))
            },
            indent: function (t, n) {
                if (t.tokenize == v) return e.Pass;
                if (t.tokenize != g) return 0;
                var i, a = n && n.charAt(0),
                    s = t.lexical;
                if (!/^\s*else\b/.test(n))
                    for (var u = t.cc.length - 1; u >= 0; --u) {
                        var c = t.cc[u];
                        if (c == P) s = s.prev;
                        else if (c != Le) break
                    }
                for (;
                    ("stat" == s.type || "form" == s.type) && ("}" == a || (i = t.cc[t.cc.length - 1]) && (i == K || i == X) && !/^[,\.=+\-*:?[\(]/.test(n));) s = s.prev;
                l && ")" == s.type && "stat" == s.prev.type && (s = s.prev);
                var f = s.type,
                    d = a == f;
                return "vardef" == f ? s.indented + ("operator" == t.lastType || "," == t.lastType ? s.info.length + 1 : 0) : "form" == f && "{" == a ? s.indented : "form" == f ? s.indented + o : "stat" == f ? s.indented + (function (e, t) {
                    return "operator" == e.lastType || "," == e.lastType || h.test(t.charAt(0)) || /[,.]/.test(t.charAt(0))
                }(t, n) ? l || o : 0) : "switch" != s.info || d || 0 == r.doubleIndentSwitch ? s.align ? s.column + (d ? 0 : 1) : s.indented + (d ? 0 : o) : s.indented + (/^(?:case|default)\b/.test(n) ? o : 2 * o)
            },
            electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
            blockCommentStart: s ? null : "/*",
            blockCommentEnd: s ? null : "*/",
            blockCommentContinue: s ? null : " * ",
            lineComment: s ? null : "//",
            fold: "brace",
            closeBrackets: "()[]{}''\"\"``",
            helperType: s ? "json" : "javascript",
            jsonldMode: a,
            jsonMode: s,
            expressionAllowed: _e,
            skipExpression: function (e) {
                var t = e.cc[e.cc.length - 1];
                t != B && t != j || e.cc.pop()
            }
        }
    }), e.registerHelper("wordChars", "javascript", /[\w$]/), e.defineMIME("text/javascript", "javascript"), e.defineMIME("text/ecmascript", "javascript"), e.defineMIME("application/javascript", "javascript"), e.defineMIME("application/x-javascript", "javascript"), e.defineMIME("application/ecmascript", "javascript"), e.defineMIME("application/json", {
        name: "javascript",
        json: !0
    }), e.defineMIME("application/x-json", {
        name: "javascript",
        json: !0
    }), e.defineMIME("application/ld+json", {
        name: "javascript",
        jsonld: !0
    }), e.defineMIME("text/typescript", {
        name: "javascript",
        typescript: !0
    }), e.defineMIME("application/typescript", {
        name: "javascript",
        typescript: !0
    })
});