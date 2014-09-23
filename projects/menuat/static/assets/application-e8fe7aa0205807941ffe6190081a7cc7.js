! function(t, e) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function(t) {
        if (!t.document) throw new Error("jQuery requires a window with a document");
        return e(t)
    } : e(t)
}("undefined" != typeof window ? window : this, function(t, e) {
    function i(t) {
        var e = t.length,
            i = se.type(t);
        return "function" === i || se.isWindow(t) ? !1 : 1 === t.nodeType && e ? !0 : "array" === i || 0 === e || "number" == typeof e && e > 0 && e - 1 in t
    }

    function n(t, e, i) {
        if (se.isFunction(e)) return se.grep(t, function(t, n) {
            return !!e.call(t, n, t) !== i
        });
        if (e.nodeType) return se.grep(t, function(t) {
            return t === e !== i
        });
        if ("string" == typeof e) {
            if (he.test(e)) return se.filter(e, t, i);
            e = se.filter(e, t)
        }
        return se.grep(t, function(t) {
            return se.inArray(t, e) >= 0 !== i
        })
    }

    function s(t, e) {
        do t = t[e]; while (t && 1 !== t.nodeType);
        return t
    }

    function o(t) {
        var e = be[t] = {};
        return se.each(t.match(ye) || [], function(t, i) {
            e[i] = !0
        }), e
    }

    function a() {
        fe.addEventListener ? (fe.removeEventListener("DOMContentLoaded", r, !1), t.removeEventListener("load", r, !1)) : (fe.detachEvent("onreadystatechange", r), t.detachEvent("onload", r))
    }

    function r() {
        (fe.addEventListener || "load" === event.type || "complete" === fe.readyState) && (a(), se.ready())
    }

    function l(t, e, i) {
        if (void 0 === i && 1 === t.nodeType) {
            var n = "data-" + e.replace(Se, "-$1").toLowerCase();
            if (i = t.getAttribute(n), "string" == typeof i) {
                try {
                    i = "true" === i ? !0 : "false" === i ? !1 : "null" === i ? null : +i + "" === i ? +i : Ce.test(i) ? se.parseJSON(i) : i
                } catch (s) {}
                se.data(t, e, i)
            } else i = void 0
        }
        return i
    }

    function c(t) {
        var e;
        for (e in t)
            if (("data" !== e || !se.isEmptyObject(t[e])) && "toJSON" !== e) return !1;
        return !0
    }

    function d(t, e, i, n) {
        if (se.acceptData(t)) {
            var s, o, a = se.expando,
                r = t.nodeType,
                l = r ? se.cache : t,
                c = r ? t[a] : t[a] && a;
            if (c && l[c] && (n || l[c].data) || void 0 !== i || "string" != typeof e) return c || (c = r ? t[a] = Z.pop() || se.guid++ : a), l[c] || (l[c] = r ? {} : {
                toJSON: se.noop
            }), ("object" == typeof e || "function" == typeof e) && (n ? l[c] = se.extend(l[c], e) : l[c].data = se.extend(l[c].data, e)), o = l[c], n || (o.data || (o.data = {}), o = o.data), void 0 !== i && (o[se.camelCase(e)] = i), "string" == typeof e ? (s = o[e], null == s && (s = o[se.camelCase(e)])) : s = o, s
        }
    }

    function u(t, e, i) {
        if (se.acceptData(t)) {
            var n, s, o = t.nodeType,
                a = o ? se.cache : t,
                r = o ? t[se.expando] : se.expando;
            if (a[r]) {
                if (e && (n = i ? a[r] : a[r].data)) {
                    se.isArray(e) ? e = e.concat(se.map(e, se.camelCase)) : e in n ? e = [e] : (e = se.camelCase(e), e = e in n ? [e] : e.split(" ")), s = e.length;
                    for (; s--;) delete n[e[s]];
                    if (i ? !c(n) : !se.isEmptyObject(n)) return
                }(i || (delete a[r].data, c(a[r]))) && (o ? se.cleanData([t], !0) : ie.deleteExpando || a != a.window ? delete a[r] : a[r] = null)
            }
        }
    }

    function h() {
        return !0
    }

    function p() {
        return !1
    }

    function f() {
        try {
            return fe.activeElement
        } catch (t) {}
    }

    function g(t) {
        var e = Me.split("|"),
            i = t.createDocumentFragment();
        if (i.createElement)
            for (; e.length;) i.createElement(e.pop());
        return i
    }

    function m(t, e) {
        var i, n, s = 0,
            o = typeof t.getElementsByTagName !== ke ? t.getElementsByTagName(e || "*") : typeof t.querySelectorAll !== ke ? t.querySelectorAll(e || "*") : void 0;
        if (!o)
            for (o = [], i = t.childNodes || t; null != (n = i[s]); s++) !e || se.nodeName(n, e) ? o.push(n) : se.merge(o, m(n, e));
        return void 0 === e || e && se.nodeName(t, e) ? se.merge([t], o) : o
    }

    function v(t) {
        je.test(t.type) && (t.defaultChecked = t.checked)
    }

    function _(t, e) {
        return se.nodeName(t, "table") && se.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
    }

    function y(t) {
        return t.type = (null !== se.find.attr(t, "type")) + "/" + t.type, t
    }

    function b(t) {
        var e = Qe.exec(t.type);
        return e ? t.type = e[1] : t.removeAttribute("type"), t
    }

    function x(t, e) {
        for (var i, n = 0; null != (i = t[n]); n++) se._data(i, "globalEval", !e || se._data(e[n], "globalEval"))
    }

    function w(t, e) {
        if (1 === e.nodeType && se.hasData(t)) {
            var i, n, s, o = se._data(t),
                a = se._data(e, o),
                r = o.events;
            if (r) {
                delete a.handle, a.events = {};
                for (i in r)
                    for (n = 0, s = r[i].length; s > n; n++) se.event.add(e, i, r[i][n])
            }
            a.data && (a.data = se.extend({}, a.data))
        }
    }

    function k(t, e) {
        var i, n, s;
        if (1 === e.nodeType) {
            if (i = e.nodeName.toLowerCase(), !ie.noCloneEvent && e[se.expando]) {
                s = se._data(e);
                for (n in s.events) se.removeEvent(e, n, s.handle);
                e.removeAttribute(se.expando)
            }
            "script" === i && e.text !== t.text ? (y(e).text = t.text, b(e)) : "object" === i ? (e.parentNode && (e.outerHTML = t.outerHTML), ie.html5Clone && t.innerHTML && !se.trim(e.innerHTML) && (e.innerHTML = t.innerHTML)) : "input" === i && je.test(t.type) ? (e.defaultChecked = e.checked = t.checked, e.value !== t.value && (e.value = t.value)) : "option" === i ? e.defaultSelected = e.selected = t.defaultSelected : ("input" === i || "textarea" === i) && (e.defaultValue = t.defaultValue)
        }
    }

    function C(e, i) {
        var n, s = se(i.createElement(e)).appendTo(i.body),
            o = t.getDefaultComputedStyle && (n = t.getDefaultComputedStyle(s[0])) ? n.display : se.css(s[0], "display");
        return s.detach(), o
    }

    function S(t) {
        var e = fe,
            i = Ke[t];
        return i || (i = C(t, e), "none" !== i && i || (Je = (Je || se("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement), e = (Je[0].contentWindow || Je[0].contentDocument).document, e.write(), e.close(), i = C(t, e), Je.detach()), Ke[t] = i), i
    }

    function T(t, e) {
        return {
            get: function() {
                var i = t();
                if (null != i) return i ? void delete this.get : (this.get = e).apply(this, arguments)
            }
        }
    }

    function $(t, e) {
        if (e in t) return e;
        for (var i = e.charAt(0).toUpperCase() + e.slice(1), n = e, s = hi.length; s--;)
            if (e = hi[s] + i, e in t) return e;
        return n
    }

    function F(t, e) {
        for (var i, n, s, o = [], a = 0, r = t.length; r > a; a++) n = t[a], n.style && (o[a] = se._data(n, "olddisplay"), i = n.style.display, e ? (o[a] || "none" !== i || (n.style.display = ""), "" === n.style.display && Fe(n) && (o[a] = se._data(n, "olddisplay", S(n.nodeName)))) : (s = Fe(n), (i && "none" !== i || !s) && se._data(n, "olddisplay", s ? i : se.css(n, "display"))));
        for (a = 0; r > a; a++) n = t[a], n.style && (e && "none" !== n.style.display && "" !== n.style.display || (n.style.display = e ? o[a] || "" : "none"));
        return t
    }

    function E(t, e, i) {
        var n = li.exec(e);
        return n ? Math.max(0, n[1] - (i || 0)) + (n[2] || "px") : e
    }

    function j(t, e, i, n, s) {
        for (var o = i === (n ? "border" : "content") ? 4 : "width" === e ? 1 : 0, a = 0; 4 > o; o += 2) "margin" === i && (a += se.css(t, i + $e[o], !0, s)), n ? ("content" === i && (a -= se.css(t, "padding" + $e[o], !0, s)), "margin" !== i && (a -= se.css(t, "border" + $e[o] + "Width", !0, s))) : (a += se.css(t, "padding" + $e[o], !0, s), "padding" !== i && (a += se.css(t, "border" + $e[o] + "Width", !0, s)));
        return a
    }

    function A(t, e, i) {
        var n = !0,
            s = "width" === e ? t.offsetWidth : t.offsetHeight,
            o = ti(t),
            a = ie.boxSizing && "border-box" === se.css(t, "boxSizing", !1, o);
        if (0 >= s || null == s) {
            if (s = ei(t, e, o), (0 > s || null == s) && (s = t.style[e]), ni.test(s)) return s;
            n = a && (ie.boxSizingReliable() || s === t.style[e]), s = parseFloat(s) || 0
        }
        return s + j(t, e, i || (a ? "border" : "content"), n, o) + "px"
    }

    function D(t, e, i, n, s) {
        return new D.prototype.init(t, e, i, n, s)
    }

    function N() {
        return setTimeout(function() {
            pi = void 0
        }), pi = se.now()
    }

    function H(t, e) {
        var i, n = {
                height: t
            },
            s = 0;
        for (e = e ? 1 : 0; 4 > s; s += 2 - e) i = $e[s], n["margin" + i] = n["padding" + i] = t;
        return e && (n.opacity = n.width = t), n
    }

    function q(t, e, i) {
        for (var n, s = (yi[e] || []).concat(yi["*"]), o = 0, a = s.length; a > o; o++)
            if (n = s[o].call(i, e, t)) return n
    }

    function M(t, e, i) {
        var n, s, o, a, r, l, c, d, u = this,
            h = {},
            p = t.style,
            f = t.nodeType && Fe(t),
            g = se._data(t, "fxshow");
        i.queue || (r = se._queueHooks(t, "fx"), null == r.unqueued && (r.unqueued = 0, l = r.empty.fire, r.empty.fire = function() {
            r.unqueued || l()
        }), r.unqueued++, u.always(function() {
            u.always(function() {
                r.unqueued--, se.queue(t, "fx").length || r.empty.fire()
            })
        })), 1 === t.nodeType && ("height" in e || "width" in e) && (i.overflow = [p.overflow, p.overflowX, p.overflowY], c = se.css(t, "display"), d = "none" === c ? se._data(t, "olddisplay") || S(t.nodeName) : c, "inline" === d && "none" === se.css(t, "float") && (ie.inlineBlockNeedsLayout && "inline" !== S(t.nodeName) ? p.zoom = 1 : p.display = "inline-block")), i.overflow && (p.overflow = "hidden", ie.shrinkWrapBlocks() || u.always(function() {
            p.overflow = i.overflow[0], p.overflowX = i.overflow[1], p.overflowY = i.overflow[2]
        }));
        for (n in e)
            if (s = e[n], gi.exec(s)) {
                if (delete e[n], o = o || "toggle" === s, s === (f ? "hide" : "show")) {
                    if ("show" !== s || !g || void 0 === g[n]) continue;
                    f = !0
                }
                h[n] = g && g[n] || se.style(t, n)
            } else c = void 0;
        if (se.isEmptyObject(h)) "inline" === ("none" === c ? S(t.nodeName) : c) && (p.display = c);
        else {
            g ? "hidden" in g && (f = g.hidden) : g = se._data(t, "fxshow", {}), o && (g.hidden = !f), f ? se(t).show() : u.done(function() {
                se(t).hide()
            }), u.done(function() {
                var e;
                se._removeData(t, "fxshow");
                for (e in h) se.style(t, e, h[e])
            });
            for (n in h) a = q(f ? g[n] : 0, n, u), n in g || (g[n] = a.start, f && (a.end = a.start, a.start = "width" === n || "height" === n ? 1 : 0))
        }
    }

    function L(t, e) {
        var i, n, s, o, a;
        for (i in t)
            if (n = se.camelCase(i), s = e[n], o = t[i], se.isArray(o) && (s = o[1], o = t[i] = o[0]), i !== n && (t[n] = o, delete t[i]), a = se.cssHooks[n], a && "expand" in a) {
                o = a.expand(o), delete t[n];
                for (i in o) i in t || (t[i] = o[i], e[i] = s)
            } else e[n] = s
    }

    function z(t, e, i) {
        var n, s, o = 0,
            a = _i.length,
            r = se.Deferred().always(function() {
                delete l.elem
            }),
            l = function() {
                if (s) return !1;
                for (var e = pi || N(), i = Math.max(0, c.startTime + c.duration - e), n = i / c.duration || 0, o = 1 - n, a = 0, l = c.tweens.length; l > a; a++) c.tweens[a].run(o);
                return r.notifyWith(t, [c, o, i]), 1 > o && l ? i : (r.resolveWith(t, [c]), !1)
            },
            c = r.promise({
                elem: t,
                props: se.extend({}, e),
                opts: se.extend(!0, {
                    specialEasing: {}
                }, i),
                originalProperties: e,
                originalOptions: i,
                startTime: pi || N(),
                duration: i.duration,
                tweens: [],
                createTween: function(e, i) {
                    var n = se.Tween(t, c.opts, e, i, c.opts.specialEasing[e] || c.opts.easing);
                    return c.tweens.push(n), n
                },
                stop: function(e) {
                    var i = 0,
                        n = e ? c.tweens.length : 0;
                    if (s) return this;
                    for (s = !0; n > i; i++) c.tweens[i].run(1);
                    return e ? r.resolveWith(t, [c, e]) : r.rejectWith(t, [c, e]), this
                }
            }),
            d = c.props;
        for (L(d, c.opts.specialEasing); a > o; o++)
            if (n = _i[o].call(c, t, d, c.opts)) return n;
        return se.map(d, q, c), se.isFunction(c.opts.start) && c.opts.start.call(t, c), se.fx.timer(se.extend(l, {
            elem: t,
            anim: c,
            queue: c.opts.queue
        })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
    }

    function P(t) {
        return function(e, i) {
            "string" != typeof e && (i = e, e = "*");
            var n, s = 0,
                o = e.toLowerCase().match(ye) || [];
            if (se.isFunction(i))
                for (; n = o[s++];) "+" === n.charAt(0) ? (n = n.slice(1) || "*", (t[n] = t[n] || []).unshift(i)) : (t[n] = t[n] || []).push(i)
        }
    }

    function O(t, e, i, n) {
        function s(r) {
            var l;
            return o[r] = !0, se.each(t[r] || [], function(t, r) {
                var c = r(e, i, n);
                return "string" != typeof c || a || o[c] ? a ? !(l = c) : void 0 : (e.dataTypes.unshift(c), s(c), !1)
            }), l
        }
        var o = {},
            a = t === Ri;
        return s(e.dataTypes[0]) || !o["*"] && s("*")
    }

    function W(t, e) {
        var i, n, s = se.ajaxSettings.flatOptions || {};
        for (n in e) void 0 !== e[n] && ((s[n] ? t : i || (i = {}))[n] = e[n]);
        return i && se.extend(!0, t, i), t
    }

    function I(t, e, i) {
        for (var n, s, o, a, r = t.contents, l = t.dataTypes;
            "*" === l[0];) l.shift(), void 0 === s && (s = t.mimeType || e.getResponseHeader("Content-Type"));
        if (s)
            for (a in r)
                if (r[a] && r[a].test(s)) {
                    l.unshift(a);
                    break
                }
        if (l[0] in i) o = l[0];
        else {
            for (a in i) {
                if (!l[0] || t.converters[a + " " + l[0]]) {
                    o = a;
                    break
                }
                n || (n = a)
            }
            o = o || n
        }
        return o ? (o !== l[0] && l.unshift(o), i[o]) : void 0
    }

    function R(t, e, i, n) {
        var s, o, a, r, l, c = {},
            d = t.dataTypes.slice();
        if (d[1])
            for (a in t.converters) c[a.toLowerCase()] = t.converters[a];
        for (o = d.shift(); o;)
            if (t.responseFields[o] && (i[t.responseFields[o]] = e), !l && n && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = o, o = d.shift())
                if ("*" === o) o = l;
                else if ("*" !== l && l !== o) {
            if (a = c[l + " " + o] || c["* " + o], !a)
                for (s in c)
                    if (r = s.split(" "), r[1] === o && (a = c[l + " " + r[0]] || c["* " + r[0]])) {
                        a === !0 ? a = c[s] : c[s] !== !0 && (o = r[0], d.unshift(r[1]));
                        break
                    }
            if (a !== !0)
                if (a && t["throws"]) e = a(e);
                else try {
                    e = a(e)
                } catch (u) {
                    return {
                        state: "parsererror",
                        error: a ? u : "No conversion from " + l + " to " + o
                    }
                }
        }
        return {
            state: "success",
            data: e
        }
    }

    function B(t, e, i, n) {
        var s;
        if (se.isArray(e)) se.each(e, function(e, s) {
            i || Qi.test(t) ? n(t, s) : B(t + "[" + ("object" == typeof s ? e : "") + "]", s, i, n)
        });
        else if (i || "object" !== se.type(e)) n(t, e);
        else
            for (s in e) B(t + "[" + s + "]", e[s], i, n)
    }

    function X() {
        try {
            return new t.XMLHttpRequest
        } catch (e) {}
    }

    function Y() {
        try {
            return new t.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {}
    }

    function Q(t) {
        return se.isWindow(t) ? t : 9 === t.nodeType ? t.defaultView || t.parentWindow : !1
    }
    var Z = [],
        U = Z.slice,
        V = Z.concat,
        G = Z.push,
        J = Z.indexOf,
        K = {},
        te = K.toString,
        ee = K.hasOwnProperty,
        ie = {},
        ne = "1.11.1",
        se = function(t, e) {
            return new se.fn.init(t, e)
        },
        oe = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        ae = /^-ms-/,
        re = /-([\da-z])/gi,
        le = function(t, e) {
            return e.toUpperCase()
        };
    se.fn = se.prototype = {
        jquery: ne,
        constructor: se,
        selector: "",
        length: 0,
        toArray: function() {
            return U.call(this)
        },
        get: function(t) {
            return null != t ? 0 > t ? this[t + this.length] : this[t] : U.call(this)
        },
        pushStack: function(t) {
            var e = se.merge(this.constructor(), t);
            return e.prevObject = this, e.context = this.context, e
        },
        each: function(t, e) {
            return se.each(this, t, e)
        },
        map: function(t) {
            return this.pushStack(se.map(this, function(e, i) {
                return t.call(e, i, e)
            }))
        },
        slice: function() {
            return this.pushStack(U.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(t) {
            var e = this.length,
                i = +t + (0 > t ? e : 0);
            return this.pushStack(i >= 0 && e > i ? [this[i]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: G,
        sort: Z.sort,
        splice: Z.splice
    }, se.extend = se.fn.extend = function() {
        var t, e, i, n, s, o, a = arguments[0] || {},
            r = 1,
            l = arguments.length,
            c = !1;
        for ("boolean" == typeof a && (c = a, a = arguments[r] || {}, r++), "object" == typeof a || se.isFunction(a) || (a = {}), r === l && (a = this, r--); l > r; r++)
            if (null != (s = arguments[r]))
                for (n in s) t = a[n], i = s[n], a !== i && (c && i && (se.isPlainObject(i) || (e = se.isArray(i))) ? (e ? (e = !1, o = t && se.isArray(t) ? t : []) : o = t && se.isPlainObject(t) ? t : {}, a[n] = se.extend(c, o, i)) : void 0 !== i && (a[n] = i));
        return a
    }, se.extend({
        expando: "jQuery" + (ne + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(t) {
            throw new Error(t)
        },
        noop: function() {},
        isFunction: function(t) {
            return "function" === se.type(t)
        },
        isArray: Array.isArray || function(t) {
            return "array" === se.type(t)
        },
        isWindow: function(t) {
            return null != t && t == t.window
        },
        isNumeric: function(t) {
            return !se.isArray(t) && t - parseFloat(t) >= 0
        },
        isEmptyObject: function(t) {
            var e;
            for (e in t) return !1;
            return !0
        },
        isPlainObject: function(t) {
            var e;
            if (!t || "object" !== se.type(t) || t.nodeType || se.isWindow(t)) return !1;
            try {
                if (t.constructor && !ee.call(t, "constructor") && !ee.call(t.constructor.prototype, "isPrototypeOf")) return !1
            } catch (i) {
                return !1
            }
            if (ie.ownLast)
                for (e in t) return ee.call(t, e);
            for (e in t);
            return void 0 === e || ee.call(t, e)
        },
        type: function(t) {
            return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? K[te.call(t)] || "object" : typeof t
        },
        globalEval: function(e) {
            e && se.trim(e) && (t.execScript || function(e) {
                t.eval.call(t, e)
            })(e)
        },
        camelCase: function(t) {
            return t.replace(ae, "ms-").replace(re, le)
        },
        nodeName: function(t, e) {
            return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
        },
        each: function(t, e, n) {
            var s, o = 0,
                a = t.length,
                r = i(t);
            if (n) {
                if (r)
                    for (; a > o && (s = e.apply(t[o], n), s !== !1); o++);
                else
                    for (o in t)
                        if (s = e.apply(t[o], n), s === !1) break
            } else if (r)
                for (; a > o && (s = e.call(t[o], o, t[o]), s !== !1); o++);
            else
                for (o in t)
                    if (s = e.call(t[o], o, t[o]), s === !1) break; return t
        },
        trim: function(t) {
            return null == t ? "" : (t + "").replace(oe, "")
        },
        makeArray: function(t, e) {
            var n = e || [];
            return null != t && (i(Object(t)) ? se.merge(n, "string" == typeof t ? [t] : t) : G.call(n, t)), n
        },
        inArray: function(t, e, i) {
            var n;
            if (e) {
                if (J) return J.call(e, t, i);
                for (n = e.length, i = i ? 0 > i ? Math.max(0, n + i) : i : 0; n > i; i++)
                    if (i in e && e[i] === t) return i
            }
            return -1
        },
        merge: function(t, e) {
            for (var i = +e.length, n = 0, s = t.length; i > n;) t[s++] = e[n++];
            if (i !== i)
                for (; void 0 !== e[n];) t[s++] = e[n++];
            return t.length = s, t
        },
        grep: function(t, e, i) {
            for (var n, s = [], o = 0, a = t.length, r = !i; a > o; o++) n = !e(t[o], o), n !== r && s.push(t[o]);
            return s
        },
        map: function(t, e, n) {
            var s, o = 0,
                a = t.length,
                r = i(t),
                l = [];
            if (r)
                for (; a > o; o++) s = e(t[o], o, n), null != s && l.push(s);
            else
                for (o in t) s = e(t[o], o, n), null != s && l.push(s);
            return V.apply([], l)
        },
        guid: 1,
        proxy: function(t, e) {
            var i, n, s;
            return "string" == typeof e && (s = t[e], e = t, t = s), se.isFunction(t) ? (i = U.call(arguments, 2), n = function() {
                return t.apply(e || this, i.concat(U.call(arguments)))
            }, n.guid = t.guid = t.guid || se.guid++, n) : void 0
        },
        now: function() {
            return +new Date
        },
        support: ie
    }), se.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
        K["[object " + e + "]"] = e.toLowerCase()
    });
    var ce = function(t) {
        function e(t, e, i, n) {
            var s, o, a, r, l, c, u, p, f, g;
            if ((e ? e.ownerDocument || e : O) !== D && A(e), e = e || D, i = i || [], !t || "string" != typeof t) return i;
            if (1 !== (r = e.nodeType) && 9 !== r) return [];
            if (H && !n) {
                if (s = _e.exec(t))
                    if (a = s[1]) {
                        if (9 === r) {
                            if (o = e.getElementById(a), !o || !o.parentNode) return i;
                            if (o.id === a) return i.push(o), i
                        } else if (e.ownerDocument && (o = e.ownerDocument.getElementById(a)) && z(e, o) && o.id === a) return i.push(o), i
                    } else {
                        if (s[2]) return K.apply(i, e.getElementsByTagName(t)), i;
                        if ((a = s[3]) && x.getElementsByClassName && e.getElementsByClassName) return K.apply(i, e.getElementsByClassName(a)), i
                    }
                if (x.qsa && (!q || !q.test(t))) {
                    if (p = u = P, f = e, g = 9 === r && t, 1 === r && "object" !== e.nodeName.toLowerCase()) {
                        for (c = S(t), (u = e.getAttribute("id")) ? p = u.replace(be, "\\$&") : e.setAttribute("id", p), p = "[id='" + p + "'] ", l = c.length; l--;) c[l] = p + h(c[l]);
                        f = ye.test(t) && d(e.parentNode) || e, g = c.join(",")
                    }
                    if (g) try {
                        return K.apply(i, f.querySelectorAll(g)), i
                    } catch (m) {} finally {
                        u || e.removeAttribute("id")
                    }
                }
            }
            return $(t.replace(le, "$1"), e, i, n)
        }

        function i() {
            function t(i, n) {
                return e.push(i + " ") > w.cacheLength && delete t[e.shift()], t[i + " "] = n
            }
            var e = [];
            return t
        }

        function n(t) {
            return t[P] = !0, t
        }

        function s(t) {
            var e = D.createElement("div");
            try {
                return !!t(e)
            } catch (i) {
                return !1
            } finally {
                e.parentNode && e.parentNode.removeChild(e), e = null
            }
        }

        function o(t, e) {
            for (var i = t.split("|"), n = t.length; n--;) w.attrHandle[i[n]] = e
        }

        function a(t, e) {
            var i = e && t,
                n = i && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || Z) - (~t.sourceIndex || Z);
            if (n) return n;
            if (i)
                for (; i = i.nextSibling;)
                    if (i === e) return -1;
            return t ? 1 : -1
        }

        function r(t) {
            return function(e) {
                var i = e.nodeName.toLowerCase();
                return "input" === i && e.type === t
            }
        }

        function l(t) {
            return function(e) {
                var i = e.nodeName.toLowerCase();
                return ("input" === i || "button" === i) && e.type === t
            }
        }

        function c(t) {
            return n(function(e) {
                return e = +e, n(function(i, n) {
                    for (var s, o = t([], i.length, e), a = o.length; a--;) i[s = o[a]] && (i[s] = !(n[s] = i[s]))
                })
            })
        }

        function d(t) {
            return t && typeof t.getElementsByTagName !== Q && t
        }

        function u() {}

        function h(t) {
            for (var e = 0, i = t.length, n = ""; i > e; e++) n += t[e].value;
            return n
        }

        function p(t, e, i) {
            var n = e.dir,
                s = i && "parentNode" === n,
                o = I++;
            return e.first ? function(e, i, o) {
                for (; e = e[n];)
                    if (1 === e.nodeType || s) return t(e, i, o)
            } : function(e, i, a) {
                var r, l, c = [W, o];
                if (a) {
                    for (; e = e[n];)
                        if ((1 === e.nodeType || s) && t(e, i, a)) return !0
                } else
                    for (; e = e[n];)
                        if (1 === e.nodeType || s) {
                            if (l = e[P] || (e[P] = {}), (r = l[n]) && r[0] === W && r[1] === o) return c[2] = r[2];
                            if (l[n] = c, c[2] = t(e, i, a)) return !0
                        }
            }
        }

        function f(t) {
            return t.length > 1 ? function(e, i, n) {
                for (var s = t.length; s--;)
                    if (!t[s](e, i, n)) return !1;
                return !0
            } : t[0]
        }

        function g(t, i, n) {
            for (var s = 0, o = i.length; o > s; s++) e(t, i[s], n);
            return n
        }

        function m(t, e, i, n, s) {
            for (var o, a = [], r = 0, l = t.length, c = null != e; l > r; r++)(o = t[r]) && (!i || i(o, n, s)) && (a.push(o), c && e.push(r));
            return a
        }

        function v(t, e, i, s, o, a) {
            return s && !s[P] && (s = v(s)), o && !o[P] && (o = v(o, a)), n(function(n, a, r, l) {
                var c, d, u, h = [],
                    p = [],
                    f = a.length,
                    v = n || g(e || "*", r.nodeType ? [r] : r, []),
                    _ = !t || !n && e ? v : m(v, h, t, r, l),
                    y = i ? o || (n ? t : f || s) ? [] : a : _;
                if (i && i(_, y, r, l), s)
                    for (c = m(y, p), s(c, [], r, l), d = c.length; d--;)(u = c[d]) && (y[p[d]] = !(_[p[d]] = u));
                if (n) {
                    if (o || t) {
                        if (o) {
                            for (c = [], d = y.length; d--;)(u = y[d]) && c.push(_[d] = u);
                            o(null, y = [], c, l)
                        }
                        for (d = y.length; d--;)(u = y[d]) && (c = o ? ee.call(n, u) : h[d]) > -1 && (n[c] = !(a[c] = u))
                    }
                } else y = m(y === a ? y.splice(f, y.length) : y), o ? o(null, a, y, l) : K.apply(a, y)
            })
        }

        function _(t) {
            for (var e, i, n, s = t.length, o = w.relative[t[0].type], a = o || w.relative[" "], r = o ? 1 : 0, l = p(function(t) {
                return t === e
            }, a, !0), c = p(function(t) {
                return ee.call(e, t) > -1
            }, a, !0), d = [
                function(t, i, n) {
                    return !o && (n || i !== F) || ((e = i).nodeType ? l(t, i, n) : c(t, i, n))
                }
            ]; s > r; r++)
                if (i = w.relative[t[r].type]) d = [p(f(d), i)];
                else {
                    if (i = w.filter[t[r].type].apply(null, t[r].matches), i[P]) {
                        for (n = ++r; s > n && !w.relative[t[n].type]; n++);
                        return v(r > 1 && f(d), r > 1 && h(t.slice(0, r - 1).concat({
                            value: " " === t[r - 2].type ? "*" : ""
                        })).replace(le, "$1"), i, n > r && _(t.slice(r, n)), s > n && _(t = t.slice(n)), s > n && h(t))
                    }
                    d.push(i)
                }
            return f(d)
        }

        function y(t, i) {
            var s = i.length > 0,
                o = t.length > 0,
                a = function(n, a, r, l, c) {
                    var d, u, h, p = 0,
                        f = "0",
                        g = n && [],
                        v = [],
                        _ = F,
                        y = n || o && w.find.TAG("*", c),
                        b = W += null == _ ? 1 : Math.random() || .1,
                        x = y.length;
                    for (c && (F = a !== D && a); f !== x && null != (d = y[f]); f++) {
                        if (o && d) {
                            for (u = 0; h = t[u++];)
                                if (h(d, a, r)) {
                                    l.push(d);
                                    break
                                }
                            c && (W = b)
                        }
                        s && ((d = !h && d) && p--, n && g.push(d))
                    }
                    if (p += f, s && f !== p) {
                        for (u = 0; h = i[u++];) h(g, v, a, r);
                        if (n) {
                            if (p > 0)
                                for (; f--;) g[f] || v[f] || (v[f] = G.call(l));
                            v = m(v)
                        }
                        K.apply(l, v), c && !n && v.length > 0 && p + i.length > 1 && e.uniqueSort(l)
                    }
                    return c && (W = b, F = _), g
                };
            return s ? n(a) : a
        }
        var b, x, w, k, C, S, T, $, F, E, j, A, D, N, H, q, M, L, z, P = "sizzle" + -new Date,
            O = t.document,
            W = 0,
            I = 0,
            R = i(),
            B = i(),
            X = i(),
            Y = function(t, e) {
                return t === e && (j = !0), 0
            },
            Q = "undefined",
            Z = 1 << 31,
            U = {}.hasOwnProperty,
            V = [],
            G = V.pop,
            J = V.push,
            K = V.push,
            te = V.slice,
            ee = V.indexOf || function(t) {
                for (var e = 0, i = this.length; i > e; e++)
                    if (this[e] === t) return e;
                return -1
            },
            ie = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ne = "[\\x20\\t\\r\\n\\f]",
            se = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            oe = se.replace("w", "w#"),
            ae = "\\[" + ne + "*(" + se + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + oe + "))|)" + ne + "*\\]",
            re = ":(" + se + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ae + ")*)|.*)\\)|)",
            le = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
            ce = new RegExp("^" + ne + "*," + ne + "*"),
            de = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
            ue = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
            he = new RegExp(re),
            pe = new RegExp("^" + oe + "$"),
            fe = {
                ID: new RegExp("^#(" + se + ")"),
                CLASS: new RegExp("^\\.(" + se + ")"),
                TAG: new RegExp("^(" + se.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + ae),
                PSEUDO: new RegExp("^" + re),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + ie + ")$", "i"),
                needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
            },
            ge = /^(?:input|select|textarea|button)$/i,
            me = /^h\d$/i,
            ve = /^[^{]+\{\s*\[native \w/,
            _e = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ye = /[+~]/,
            be = /'|\\/g,
            xe = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
            we = function(t, e, i) {
                var n = "0x" + e - 65536;
                return n !== n || i ? e : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
            };
        try {
            K.apply(V = te.call(O.childNodes), O.childNodes), V[O.childNodes.length].nodeType
        } catch (ke) {
            K = {
                apply: V.length ? function(t, e) {
                    J.apply(t, te.call(e))
                } : function(t, e) {
                    for (var i = t.length, n = 0; t[i++] = e[n++];);
                    t.length = i - 1
                }
            }
        }
        x = e.support = {}, C = e.isXML = function(t) {
            var e = t && (t.ownerDocument || t).documentElement;
            return e ? "HTML" !== e.nodeName : !1
        }, A = e.setDocument = function(t) {
            var e, i = t ? t.ownerDocument || t : O,
                n = i.defaultView;
            return i !== D && 9 === i.nodeType && i.documentElement ? (D = i, N = i.documentElement, H = !C(i), n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", function() {
                A()
            }, !1) : n.attachEvent && n.attachEvent("onunload", function() {
                A()
            })), x.attributes = s(function(t) {
                return t.className = "i", !t.getAttribute("className")
            }), x.getElementsByTagName = s(function(t) {
                return t.appendChild(i.createComment("")), !t.getElementsByTagName("*").length
            }), x.getElementsByClassName = ve.test(i.getElementsByClassName) && s(function(t) {
                return t.innerHTML = "<div class='a'></div><div class='a i'></div>", t.firstChild.className = "i", 2 === t.getElementsByClassName("i").length
            }), x.getById = s(function(t) {
                return N.appendChild(t).id = P, !i.getElementsByName || !i.getElementsByName(P).length
            }), x.getById ? (w.find.ID = function(t, e) {
                if (typeof e.getElementById !== Q && H) {
                    var i = e.getElementById(t);
                    return i && i.parentNode ? [i] : []
                }
            }, w.filter.ID = function(t) {
                var e = t.replace(xe, we);
                return function(t) {
                    return t.getAttribute("id") === e
                }
            }) : (delete w.find.ID, w.filter.ID = function(t) {
                var e = t.replace(xe, we);
                return function(t) {
                    var i = typeof t.getAttributeNode !== Q && t.getAttributeNode("id");
                    return i && i.value === e
                }
            }), w.find.TAG = x.getElementsByTagName ? function(t, e) {
                return typeof e.getElementsByTagName !== Q ? e.getElementsByTagName(t) : void 0
            } : function(t, e) {
                var i, n = [],
                    s = 0,
                    o = e.getElementsByTagName(t);
                if ("*" === t) {
                    for (; i = o[s++];) 1 === i.nodeType && n.push(i);
                    return n
                }
                return o
            }, w.find.CLASS = x.getElementsByClassName && function(t, e) {
                return typeof e.getElementsByClassName !== Q && H ? e.getElementsByClassName(t) : void 0
            }, M = [], q = [], (x.qsa = ve.test(i.querySelectorAll)) && (s(function(t) {
                t.innerHTML = "<select msallowclip=''><option selected=''></option></select>", t.querySelectorAll("[msallowclip^='']").length && q.push("[*^$]=" + ne + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || q.push("\\[" + ne + "*(?:value|" + ie + ")"), t.querySelectorAll(":checked").length || q.push(":checked")
            }), s(function(t) {
                var e = i.createElement("input");
                e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && q.push("name" + ne + "*[*^$|!~]?="), t.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), q.push(",.*:")
            })), (x.matchesSelector = ve.test(L = N.matches || N.webkitMatchesSelector || N.mozMatchesSelector || N.oMatchesSelector || N.msMatchesSelector)) && s(function(t) {
                x.disconnectedMatch = L.call(t, "div"), L.call(t, "[s!='']:x"), M.push("!=", re)
            }), q = q.length && new RegExp(q.join("|")), M = M.length && new RegExp(M.join("|")), e = ve.test(N.compareDocumentPosition), z = e || ve.test(N.contains) ? function(t, e) {
                var i = 9 === t.nodeType ? t.documentElement : t,
                    n = e && e.parentNode;
                return t === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n)))
            } : function(t, e) {
                if (e)
                    for (; e = e.parentNode;)
                        if (e === t) return !0;
                return !1
            }, Y = e ? function(t, e) {
                if (t === e) return j = !0, 0;
                var n = !t.compareDocumentPosition - !e.compareDocumentPosition;
                return n ? n : (n = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1, 1 & n || !x.sortDetached && e.compareDocumentPosition(t) === n ? t === i || t.ownerDocument === O && z(O, t) ? -1 : e === i || e.ownerDocument === O && z(O, e) ? 1 : E ? ee.call(E, t) - ee.call(E, e) : 0 : 4 & n ? -1 : 1)
            } : function(t, e) {
                if (t === e) return j = !0, 0;
                var n, s = 0,
                    o = t.parentNode,
                    r = e.parentNode,
                    l = [t],
                    c = [e];
                if (!o || !r) return t === i ? -1 : e === i ? 1 : o ? -1 : r ? 1 : E ? ee.call(E, t) - ee.call(E, e) : 0;
                if (o === r) return a(t, e);
                for (n = t; n = n.parentNode;) l.unshift(n);
                for (n = e; n = n.parentNode;) c.unshift(n);
                for (; l[s] === c[s];) s++;
                return s ? a(l[s], c[s]) : l[s] === O ? -1 : c[s] === O ? 1 : 0
            }, i) : D
        }, e.matches = function(t, i) {
            return e(t, null, null, i)
        }, e.matchesSelector = function(t, i) {
            if ((t.ownerDocument || t) !== D && A(t), i = i.replace(ue, "='$1']"), !(!x.matchesSelector || !H || M && M.test(i) || q && q.test(i))) try {
                var n = L.call(t, i);
                if (n || x.disconnectedMatch || t.document && 11 !== t.document.nodeType) return n
            } catch (s) {}
            return e(i, D, null, [t]).length > 0
        }, e.contains = function(t, e) {
            return (t.ownerDocument || t) !== D && A(t), z(t, e)
        }, e.attr = function(t, e) {
            (t.ownerDocument || t) !== D && A(t);
            var i = w.attrHandle[e.toLowerCase()],
                n = i && U.call(w.attrHandle, e.toLowerCase()) ? i(t, e, !H) : void 0;
            return void 0 !== n ? n : x.attributes || !H ? t.getAttribute(e) : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
        }, e.error = function(t) {
            throw new Error("Syntax error, unrecognized expression: " + t)
        }, e.uniqueSort = function(t) {
            var e, i = [],
                n = 0,
                s = 0;
            if (j = !x.detectDuplicates, E = !x.sortStable && t.slice(0), t.sort(Y), j) {
                for (; e = t[s++];) e === t[s] && (n = i.push(s));
                for (; n--;) t.splice(i[n], 1)
            }
            return E = null, t
        }, k = e.getText = function(t) {
            var e, i = "",
                n = 0,
                s = t.nodeType;
            if (s) {
                if (1 === s || 9 === s || 11 === s) {
                    if ("string" == typeof t.textContent) return t.textContent;
                    for (t = t.firstChild; t; t = t.nextSibling) i += k(t)
                } else if (3 === s || 4 === s) return t.nodeValue
            } else
                for (; e = t[n++];) i += k(e);
            return i
        }, w = e.selectors = {
            cacheLength: 50,
            createPseudo: n,
            match: fe,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(t) {
                    return t[1] = t[1].replace(xe, we), t[3] = (t[3] || t[4] || t[5] || "").replace(xe, we), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                },
                CHILD: function(t) {
                    return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]), t
                },
                PSEUDO: function(t) {
                    var e, i = !t[6] && t[2];
                    return fe.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : i && he.test(i) && (e = S(i, !0)) && (e = i.indexOf(")", i.length - e) - i.length) && (t[0] = t[0].slice(0, e), t[2] = i.slice(0, e)), t.slice(0, 3))
                }
            },
            filter: {
                TAG: function(t) {
                    var e = t.replace(xe, we).toLowerCase();
                    return "*" === t ? function() {
                        return !0
                    } : function(t) {
                        return t.nodeName && t.nodeName.toLowerCase() === e
                    }
                },
                CLASS: function(t) {
                    var e = R[t + " "];
                    return e || (e = new RegExp("(^|" + ne + ")" + t + "(" + ne + "|$)")) && R(t, function(t) {
                        return e.test("string" == typeof t.className && t.className || typeof t.getAttribute !== Q && t.getAttribute("class") || "")
                    })
                },
                ATTR: function(t, i, n) {
                    return function(s) {
                        var o = e.attr(s, t);
                        return null == o ? "!=" === i : i ? (o += "", "=" === i ? o === n : "!=" === i ? o !== n : "^=" === i ? n && 0 === o.indexOf(n) : "*=" === i ? n && o.indexOf(n) > -1 : "$=" === i ? n && o.slice(-n.length) === n : "~=" === i ? (" " + o + " ").indexOf(n) > -1 : "|=" === i ? o === n || o.slice(0, n.length + 1) === n + "-" : !1) : !0
                    }
                },
                CHILD: function(t, e, i, n, s) {
                    var o = "nth" !== t.slice(0, 3),
                        a = "last" !== t.slice(-4),
                        r = "of-type" === e;
                    return 1 === n && 0 === s ? function(t) {
                        return !!t.parentNode
                    } : function(e, i, l) {
                        var c, d, u, h, p, f, g = o !== a ? "nextSibling" : "previousSibling",
                            m = e.parentNode,
                            v = r && e.nodeName.toLowerCase(),
                            _ = !l && !r;
                        if (m) {
                            if (o) {
                                for (; g;) {
                                    for (u = e; u = u[g];)
                                        if (r ? u.nodeName.toLowerCase() === v : 1 === u.nodeType) return !1;
                                    f = g = "only" === t && !f && "nextSibling"
                                }
                                return !0
                            }
                            if (f = [a ? m.firstChild : m.lastChild], a && _) {
                                for (d = m[P] || (m[P] = {}), c = d[t] || [], p = c[0] === W && c[1], h = c[0] === W && c[2], u = p && m.childNodes[p]; u = ++p && u && u[g] || (h = p = 0) || f.pop();)
                                    if (1 === u.nodeType && ++h && u === e) {
                                        d[t] = [W, p, h];
                                        break
                                    }
                            } else if (_ && (c = (e[P] || (e[P] = {}))[t]) && c[0] === W) h = c[1];
                            else
                                for (;
                                    (u = ++p && u && u[g] || (h = p = 0) || f.pop()) && ((r ? u.nodeName.toLowerCase() !== v : 1 !== u.nodeType) || !++h || (_ && ((u[P] || (u[P] = {}))[t] = [W, h]), u !== e)););
                            return h -= s, h === n || h % n === 0 && h / n >= 0
                        }
                    }
                },
                PSEUDO: function(t, i) {
                    var s, o = w.pseudos[t] || w.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                    return o[P] ? o(i) : o.length > 1 ? (s = [t, t, "", i], w.setFilters.hasOwnProperty(t.toLowerCase()) ? n(function(t, e) {
                        for (var n, s = o(t, i), a = s.length; a--;) n = ee.call(t, s[a]), t[n] = !(e[n] = s[a])
                    }) : function(t) {
                        return o(t, 0, s)
                    }) : o
                }
            },
            pseudos: {
                not: n(function(t) {
                    var e = [],
                        i = [],
                        s = T(t.replace(le, "$1"));
                    return s[P] ? n(function(t, e, i, n) {
                        for (var o, a = s(t, null, n, []), r = t.length; r--;)(o = a[r]) && (t[r] = !(e[r] = o))
                    }) : function(t, n, o) {
                        return e[0] = t, s(e, null, o, i), !i.pop()
                    }
                }),
                has: n(function(t) {
                    return function(i) {
                        return e(t, i).length > 0
                    }
                }),
                contains: n(function(t) {
                    return function(e) {
                        return (e.textContent || e.innerText || k(e)).indexOf(t) > -1
                    }
                }),
                lang: n(function(t) {
                    return pe.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(xe, we).toLowerCase(),
                        function(e) {
                            var i;
                            do
                                if (i = H ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return i = i.toLowerCase(), i === t || 0 === i.indexOf(t + "-");
                            while ((e = e.parentNode) && 1 === e.nodeType);
                            return !1
                        }
                }),
                target: function(e) {
                    var i = t.location && t.location.hash;
                    return i && i.slice(1) === e.id
                },
                root: function(t) {
                    return t === N
                },
                focus: function(t) {
                    return t === D.activeElement && (!D.hasFocus || D.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                },
                enabled: function(t) {
                    return t.disabled === !1
                },
                disabled: function(t) {
                    return t.disabled === !0
                },
                checked: function(t) {
                    var e = t.nodeName.toLowerCase();
                    return "input" === e && !!t.checked || "option" === e && !!t.selected
                },
                selected: function(t) {
                    return t.parentNode && t.parentNode.selectedIndex, t.selected === !0
                },
                empty: function(t) {
                    for (t = t.firstChild; t; t = t.nextSibling)
                        if (t.nodeType < 6) return !1;
                    return !0
                },
                parent: function(t) {
                    return !w.pseudos.empty(t)
                },
                header: function(t) {
                    return me.test(t.nodeName)
                },
                input: function(t) {
                    return ge.test(t.nodeName)
                },
                button: function(t) {
                    var e = t.nodeName.toLowerCase();
                    return "input" === e && "button" === t.type || "button" === e
                },
                text: function(t) {
                    var e;
                    return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                },
                first: c(function() {
                    return [0]
                }),
                last: c(function(t, e) {
                    return [e - 1]
                }),
                eq: c(function(t, e, i) {
                    return [0 > i ? i + e : i]
                }),
                even: c(function(t, e) {
                    for (var i = 0; e > i; i += 2) t.push(i);
                    return t
                }),
                odd: c(function(t, e) {
                    for (var i = 1; e > i; i += 2) t.push(i);
                    return t
                }),
                lt: c(function(t, e, i) {
                    for (var n = 0 > i ? i + e : i; --n >= 0;) t.push(n);
                    return t
                }),
                gt: c(function(t, e, i) {
                    for (var n = 0 > i ? i + e : i; ++n < e;) t.push(n);
                    return t
                })
            }
        }, w.pseudos.nth = w.pseudos.eq;
        for (b in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) w.pseudos[b] = r(b);
        for (b in {
            submit: !0,
            reset: !0
        }) w.pseudos[b] = l(b);
        return u.prototype = w.filters = w.pseudos, w.setFilters = new u, S = e.tokenize = function(t, i) {
            var n, s, o, a, r, l, c, d = B[t + " "];
            if (d) return i ? 0 : d.slice(0);
            for (r = t, l = [], c = w.preFilter; r;) {
                (!n || (s = ce.exec(r))) && (s && (r = r.slice(s[0].length) || r), l.push(o = [])), n = !1, (s = de.exec(r)) && (n = s.shift(), o.push({
                    value: n,
                    type: s[0].replace(le, " ")
                }), r = r.slice(n.length));
                for (a in w.filter) !(s = fe[a].exec(r)) || c[a] && !(s = c[a](s)) || (n = s.shift(), o.push({
                    value: n,
                    type: a,
                    matches: s
                }), r = r.slice(n.length));
                if (!n) break
            }
            return i ? r.length : r ? e.error(t) : B(t, l).slice(0)
        }, T = e.compile = function(t, e) {
            var i, n = [],
                s = [],
                o = X[t + " "];
            if (!o) {
                for (e || (e = S(t)), i = e.length; i--;) o = _(e[i]), o[P] ? n.push(o) : s.push(o);
                o = X(t, y(s, n)), o.selector = t
            }
            return o
        }, $ = e.select = function(t, e, i, n) {
            var s, o, a, r, l, c = "function" == typeof t && t,
                u = !n && S(t = c.selector || t);
            if (i = i || [], 1 === u.length) {
                if (o = u[0] = u[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && x.getById && 9 === e.nodeType && H && w.relative[o[1].type]) {
                    if (e = (w.find.ID(a.matches[0].replace(xe, we), e) || [])[0], !e) return i;
                    c && (e = e.parentNode), t = t.slice(o.shift().value.length)
                }
                for (s = fe.needsContext.test(t) ? 0 : o.length; s-- && (a = o[s], !w.relative[r = a.type]);)
                    if ((l = w.find[r]) && (n = l(a.matches[0].replace(xe, we), ye.test(o[0].type) && d(e.parentNode) || e))) {
                        if (o.splice(s, 1), t = n.length && h(o), !t) return K.apply(i, n), i;
                        break
                    }
            }
            return (c || T(t, u))(n, e, !H, i, ye.test(t) && d(e.parentNode) || e), i
        }, x.sortStable = P.split("").sort(Y).join("") === P, x.detectDuplicates = !!j, A(), x.sortDetached = s(function(t) {
            return 1 & t.compareDocumentPosition(D.createElement("div"))
        }), s(function(t) {
            return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
        }) || o("type|href|height|width", function(t, e, i) {
            return i ? void 0 : t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
        }), x.attributes && s(function(t) {
            return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
        }) || o("value", function(t, e, i) {
            return i || "input" !== t.nodeName.toLowerCase() ? void 0 : t.defaultValue
        }), s(function(t) {
            return null == t.getAttribute("disabled")
        }) || o(ie, function(t, e, i) {
            var n;
            return i ? void 0 : t[e] === !0 ? e.toLowerCase() : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
        }), e
    }(t);
    se.find = ce, se.expr = ce.selectors, se.expr[":"] = se.expr.pseudos, se.unique = ce.uniqueSort, se.text = ce.getText, se.isXMLDoc = ce.isXML, se.contains = ce.contains;
    var de = se.expr.match.needsContext,
        ue = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        he = /^.[^:#\[\.,]*$/;
    se.filter = function(t, e, i) {
        var n = e[0];
        return i && (t = ":not(" + t + ")"), 1 === e.length && 1 === n.nodeType ? se.find.matchesSelector(n, t) ? [n] : [] : se.find.matches(t, se.grep(e, function(t) {
            return 1 === t.nodeType
        }))
    }, se.fn.extend({
        find: function(t) {
            var e, i = [],
                n = this,
                s = n.length;
            if ("string" != typeof t) return this.pushStack(se(t).filter(function() {
                for (e = 0; s > e; e++)
                    if (se.contains(n[e], this)) return !0
            }));
            for (e = 0; s > e; e++) se.find(t, n[e], i);
            return i = this.pushStack(s > 1 ? se.unique(i) : i), i.selector = this.selector ? this.selector + " " + t : t, i
        },
        filter: function(t) {
            return this.pushStack(n(this, t || [], !1))
        },
        not: function(t) {
            return this.pushStack(n(this, t || [], !0))
        },
        is: function(t) {
            return !!n(this, "string" == typeof t && de.test(t) ? se(t) : t || [], !1).length
        }
    });
    var pe, fe = t.document,
        ge = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        me = se.fn.init = function(t, e) {
            var i, n;
            if (!t) return this;
            if ("string" == typeof t) {
                if (i = "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && t.length >= 3 ? [null, t, null] : ge.exec(t), !i || !i[1] && e) return !e || e.jquery ? (e || pe).find(t) : this.constructor(e).find(t);
                if (i[1]) {
                    if (e = e instanceof se ? e[0] : e, se.merge(this, se.parseHTML(i[1], e && e.nodeType ? e.ownerDocument || e : fe, !0)), ue.test(i[1]) && se.isPlainObject(e))
                        for (i in e) se.isFunction(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
                    return this
                }
                if (n = fe.getElementById(i[2]), n && n.parentNode) {
                    if (n.id !== i[2]) return pe.find(t);
                    this.length = 1, this[0] = n
                }
                return this.context = fe, this.selector = t, this
            }
            return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : se.isFunction(t) ? "undefined" != typeof pe.ready ? pe.ready(t) : t(se) : (void 0 !== t.selector && (this.selector = t.selector, this.context = t.context), se.makeArray(t, this))
        };
    me.prototype = se.fn, pe = se(fe);
    var ve = /^(?:parents|prev(?:Until|All))/,
        _e = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    se.extend({
        dir: function(t, e, i) {
            for (var n = [], s = t[e]; s && 9 !== s.nodeType && (void 0 === i || 1 !== s.nodeType || !se(s).is(i));) 1 === s.nodeType && n.push(s), s = s[e];
            return n
        },
        sibling: function(t, e) {
            for (var i = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && i.push(t);
            return i
        }
    }), se.fn.extend({
        has: function(t) {
            var e, i = se(t, this),
                n = i.length;
            return this.filter(function() {
                for (e = 0; n > e; e++)
                    if (se.contains(this, i[e])) return !0
            })
        },
        closest: function(t, e) {
            for (var i, n = 0, s = this.length, o = [], a = de.test(t) || "string" != typeof t ? se(t, e || this.context) : 0; s > n; n++)
                for (i = this[n]; i && i !== e; i = i.parentNode)
                    if (i.nodeType < 11 && (a ? a.index(i) > -1 : 1 === i.nodeType && se.find.matchesSelector(i, t))) {
                        o.push(i);
                        break
                    }
            return this.pushStack(o.length > 1 ? se.unique(o) : o)
        },
        index: function(t) {
            return t ? "string" == typeof t ? se.inArray(this[0], se(t)) : se.inArray(t.jquery ? t[0] : t, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(t, e) {
            return this.pushStack(se.unique(se.merge(this.get(), se(t, e))))
        },
        addBack: function(t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }
    }), se.each({
        parent: function(t) {
            var e = t.parentNode;
            return e && 11 !== e.nodeType ? e : null
        },
        parents: function(t) {
            return se.dir(t, "parentNode")
        },
        parentsUntil: function(t, e, i) {
            return se.dir(t, "parentNode", i)
        },
        next: function(t) {
            return s(t, "nextSibling")
        },
        prev: function(t) {
            return s(t, "previousSibling")
        },
        nextAll: function(t) {
            return se.dir(t, "nextSibling")
        },
        prevAll: function(t) {
            return se.dir(t, "previousSibling")
        },
        nextUntil: function(t, e, i) {
            return se.dir(t, "nextSibling", i)
        },
        prevUntil: function(t, e, i) {
            return se.dir(t, "previousSibling", i)
        },
        siblings: function(t) {
            return se.sibling((t.parentNode || {}).firstChild, t)
        },
        children: function(t) {
            return se.sibling(t.firstChild)
        },
        contents: function(t) {
            return se.nodeName(t, "iframe") ? t.contentDocument || t.contentWindow.document : se.merge([], t.childNodes)
        }
    }, function(t, e) {
        se.fn[t] = function(i, n) {
            var s = se.map(this, e, i);
            return "Until" !== t.slice(-5) && (n = i), n && "string" == typeof n && (s = se.filter(n, s)), this.length > 1 && (_e[t] || (s = se.unique(s)), ve.test(t) && (s = s.reverse())), this.pushStack(s)
        }
    });
    var ye = /\S+/g,
        be = {};
    se.Callbacks = function(t) {
        t = "string" == typeof t ? be[t] || o(t) : se.extend({}, t);
        var e, i, n, s, a, r, l = [],
            c = !t.once && [],
            d = function(o) {
                for (i = t.memory && o, n = !0, a = r || 0, r = 0, s = l.length, e = !0; l && s > a; a++)
                    if (l[a].apply(o[0], o[1]) === !1 && t.stopOnFalse) {
                        i = !1;
                        break
                    }
                e = !1, l && (c ? c.length && d(c.shift()) : i ? l = [] : u.disable())
            },
            u = {
                add: function() {
                    if (l) {
                        var n = l.length;
                        ! function o(e) {
                            se.each(e, function(e, i) {
                                var n = se.type(i);
                                "function" === n ? t.unique && u.has(i) || l.push(i) : i && i.length && "string" !== n && o(i)
                            })
                        }(arguments), e ? s = l.length : i && (r = n, d(i))
                    }
                    return this
                },
                remove: function() {
                    return l && se.each(arguments, function(t, i) {
                        for (var n;
                            (n = se.inArray(i, l, n)) > -1;) l.splice(n, 1), e && (s >= n && s--, a >= n && a--)
                    }), this
                },
                has: function(t) {
                    return t ? se.inArray(t, l) > -1 : !(!l || !l.length)
                },
                empty: function() {
                    return l = [], s = 0, this
                },
                disable: function() {
                    return l = c = i = void 0, this
                },
                disabled: function() {
                    return !l
                },
                lock: function() {
                    return c = void 0, i || u.disable(), this
                },
                locked: function() {
                    return !c
                },
                fireWith: function(t, i) {
                    return !l || n && !c || (i = i || [], i = [t, i.slice ? i.slice() : i], e ? c.push(i) : d(i)), this
                },
                fire: function() {
                    return u.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!n
                }
            };
        return u
    }, se.extend({
        Deferred: function(t) {
            var e = [
                    ["resolve", "done", se.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", se.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", se.Callbacks("memory")]
                ],
                i = "pending",
                n = {
                    state: function() {
                        return i
                    },
                    always: function() {
                        return s.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var t = arguments;
                        return se.Deferred(function(i) {
                            se.each(e, function(e, o) {
                                var a = se.isFunction(t[e]) && t[e];
                                s[o[1]](function() {
                                    var t = a && a.apply(this, arguments);
                                    t && se.isFunction(t.promise) ? t.promise().done(i.resolve).fail(i.reject).progress(i.notify) : i[o[0] + "With"](this === n ? i.promise() : this, a ? [t] : arguments)
                                })
                            }), t = null
                        }).promise()
                    },
                    promise: function(t) {
                        return null != t ? se.extend(t, n) : n
                    }
                },
                s = {};
            return n.pipe = n.then, se.each(e, function(t, o) {
                var a = o[2],
                    r = o[3];
                n[o[1]] = a.add, r && a.add(function() {
                    i = r
                }, e[1 ^ t][2].disable, e[2][2].lock), s[o[0]] = function() {
                    return s[o[0] + "With"](this === s ? n : this, arguments), this
                }, s[o[0] + "With"] = a.fireWith
            }), n.promise(s), t && t.call(s, s), s
        },
        when: function(t) {
            var e, i, n, s = 0,
                o = U.call(arguments),
                a = o.length,
                r = 1 !== a || t && se.isFunction(t.promise) ? a : 0,
                l = 1 === r ? t : se.Deferred(),
                c = function(t, i, n) {
                    return function(s) {
                        i[t] = this, n[t] = arguments.length > 1 ? U.call(arguments) : s, n === e ? l.notifyWith(i, n) : --r || l.resolveWith(i, n)
                    }
                };
            if (a > 1)
                for (e = new Array(a), i = new Array(a), n = new Array(a); a > s; s++) o[s] && se.isFunction(o[s].promise) ? o[s].promise().done(c(s, n, o)).fail(l.reject).progress(c(s, i, e)) : --r;
            return r || l.resolveWith(n, o), l.promise()
        }
    });
    var xe;
    se.fn.ready = function(t) {
        return se.ready.promise().done(t), this
    }, se.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(t) {
            t ? se.readyWait++ : se.ready(!0)
        },
        ready: function(t) {
            if (t === !0 ? !--se.readyWait : !se.isReady) {
                if (!fe.body) return setTimeout(se.ready);
                se.isReady = !0, t !== !0 && --se.readyWait > 0 || (xe.resolveWith(fe, [se]), se.fn.triggerHandler && (se(fe).triggerHandler("ready"), se(fe).off("ready")))
            }
        }
    }), se.ready.promise = function(e) {
        if (!xe)
            if (xe = se.Deferred(), "complete" === fe.readyState) setTimeout(se.ready);
            else if (fe.addEventListener) fe.addEventListener("DOMContentLoaded", r, !1), t.addEventListener("load", r, !1);
        else {
            fe.attachEvent("onreadystatechange", r), t.attachEvent("onload", r);
            var i = !1;
            try {
                i = null == t.frameElement && fe.documentElement
            } catch (n) {}
            i && i.doScroll && ! function s() {
                if (!se.isReady) {
                    try {
                        i.doScroll("left")
                    } catch (t) {
                        return setTimeout(s, 50)
                    }
                    a(), se.ready()
                }
            }()
        }
        return xe.promise(e)
    };
    var we, ke = "undefined";
    for (we in se(ie)) break;
    ie.ownLast = "0" !== we, ie.inlineBlockNeedsLayout = !1, se(function() {
            var t, e, i, n;
            i = fe.getElementsByTagName("body")[0], i && i.style && (e = fe.createElement("div"), n = fe.createElement("div"), n.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", i.appendChild(n).appendChild(e), typeof e.style.zoom !== ke && (e.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", ie.inlineBlockNeedsLayout = t = 3 === e.offsetWidth, t && (i.style.zoom = 1)), i.removeChild(n))
        }),
        function() {
            var t = fe.createElement("div");
            if (null == ie.deleteExpando) {
                ie.deleteExpando = !0;
                try {
                    delete t.test
                } catch (e) {
                    ie.deleteExpando = !1
                }
            }
            t = null
        }(), se.acceptData = function(t) {
            var e = se.noData[(t.nodeName + " ").toLowerCase()],
                i = +t.nodeType || 1;
            return 1 !== i && 9 !== i ? !1 : !e || e !== !0 && t.getAttribute("classid") === e
        };
    var Ce = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        Se = /([A-Z])/g;
    se.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(t) {
            return t = t.nodeType ? se.cache[t[se.expando]] : t[se.expando], !!t && !c(t)
        },
        data: function(t, e, i) {
            return d(t, e, i)
        },
        removeData: function(t, e) {
            return u(t, e)
        },
        _data: function(t, e, i) {
            return d(t, e, i, !0)
        },
        _removeData: function(t, e) {
            return u(t, e, !0)
        }
    }), se.fn.extend({
        data: function(t, e) {
            var i, n, s, o = this[0],
                a = o && o.attributes;
            if (void 0 === t) {
                if (this.length && (s = se.data(o), 1 === o.nodeType && !se._data(o, "parsedAttrs"))) {
                    for (i = a.length; i--;) a[i] && (n = a[i].name, 0 === n.indexOf("data-") && (n = se.camelCase(n.slice(5)), l(o, n, s[n])));
                    se._data(o, "parsedAttrs", !0)
                }
                return s
            }
            return "object" == typeof t ? this.each(function() {
                se.data(this, t)
            }) : arguments.length > 1 ? this.each(function() {
                se.data(this, t, e)
            }) : o ? l(o, t, se.data(o, t)) : void 0
        },
        removeData: function(t) {
            return this.each(function() {
                se.removeData(this, t)
            })
        }
    }), se.extend({
        queue: function(t, e, i) {
            var n;
            return t ? (e = (e || "fx") + "queue", n = se._data(t, e), i && (!n || se.isArray(i) ? n = se._data(t, e, se.makeArray(i)) : n.push(i)), n || []) : void 0
        },
        dequeue: function(t, e) {
            e = e || "fx";
            var i = se.queue(t, e),
                n = i.length,
                s = i.shift(),
                o = se._queueHooks(t, e),
                a = function() {
                    se.dequeue(t, e)
                };
            "inprogress" === s && (s = i.shift(), n--), s && ("fx" === e && i.unshift("inprogress"), delete o.stop, s.call(t, a, o)), !n && o && o.empty.fire()
        },
        _queueHooks: function(t, e) {
            var i = e + "queueHooks";
            return se._data(t, i) || se._data(t, i, {
                empty: se.Callbacks("once memory").add(function() {
                    se._removeData(t, e + "queue"), se._removeData(t, i)
                })
            })
        }
    }), se.fn.extend({
        queue: function(t, e) {
            var i = 2;
            return "string" != typeof t && (e = t, t = "fx", i--), arguments.length < i ? se.queue(this[0], t) : void 0 === e ? this : this.each(function() {
                var i = se.queue(this, t, e);
                se._queueHooks(this, t), "fx" === t && "inprogress" !== i[0] && se.dequeue(this, t)
            })
        },
        dequeue: function(t) {
            return this.each(function() {
                se.dequeue(this, t)
            })
        },
        clearQueue: function(t) {
            return this.queue(t || "fx", [])
        },
        promise: function(t, e) {
            var i, n = 1,
                s = se.Deferred(),
                o = this,
                a = this.length,
                r = function() {
                    --n || s.resolveWith(o, [o])
                };
            for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; a--;) i = se._data(o[a], t + "queueHooks"), i && i.empty && (n++, i.empty.add(r));
            return r(), s.promise(e)
        }
    });
    var Te = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        $e = ["Top", "Right", "Bottom", "Left"],
        Fe = function(t, e) {
            return t = e || t, "none" === se.css(t, "display") || !se.contains(t.ownerDocument, t)
        },
        Ee = se.access = function(t, e, i, n, s, o, a) {
            var r = 0,
                l = t.length,
                c = null == i;
            if ("object" === se.type(i)) {
                s = !0;
                for (r in i) se.access(t, e, r, i[r], !0, o, a)
            } else if (void 0 !== n && (s = !0, se.isFunction(n) || (a = !0), c && (a ? (e.call(t, n), e = null) : (c = e, e = function(t, e, i) {
                return c.call(se(t), i)
            })), e))
                for (; l > r; r++) e(t[r], i, a ? n : n.call(t[r], r, e(t[r], i)));
            return s ? t : c ? e.call(t) : l ? e(t[0], i) : o
        },
        je = /^(?:checkbox|radio)$/i;
    ! function() {
        var t = fe.createElement("input"),
            e = fe.createElement("div"),
            i = fe.createDocumentFragment();
        if (e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", ie.leadingWhitespace = 3 === e.firstChild.nodeType, ie.tbody = !e.getElementsByTagName("tbody").length, ie.htmlSerialize = !!e.getElementsByTagName("link").length, ie.html5Clone = "<:nav></:nav>" !== fe.createElement("nav").cloneNode(!0).outerHTML, t.type = "checkbox", t.checked = !0, i.appendChild(t), ie.appendChecked = t.checked, e.innerHTML = "<textarea>x</textarea>", ie.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue, i.appendChild(e), e.innerHTML = "<input type='radio' checked='checked' name='t'/>", ie.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, ie.noCloneEvent = !0, e.attachEvent && (e.attachEvent("onclick", function() {
            ie.noCloneEvent = !1
        }), e.cloneNode(!0).click()), null == ie.deleteExpando) {
            ie.deleteExpando = !0;
            try {
                delete e.test
            } catch (n) {
                ie.deleteExpando = !1
            }
        }
    }(),
    function() {
        var e, i, n = fe.createElement("div");
        for (e in {
            submit: !0,
            change: !0,
            focusin: !0
        }) i = "on" + e, (ie[e + "Bubbles"] = i in t) || (n.setAttribute(i, "t"), ie[e + "Bubbles"] = n.attributes[i].expando === !1);
        n = null
    }();
    var Ae = /^(?:input|select|textarea)$/i,
        De = /^key/,
        Ne = /^(?:mouse|pointer|contextmenu)|click/,
        He = /^(?:focusinfocus|focusoutblur)$/,
        qe = /^([^.]*)(?:\.(.+)|)$/;
    se.event = {
        global: {},
        add: function(t, e, i, n, s) {
            var o, a, r, l, c, d, u, h, p, f, g, m = se._data(t);
            if (m) {
                for (i.handler && (l = i, i = l.handler, s = l.selector), i.guid || (i.guid = se.guid++), (a = m.events) || (a = m.events = {}), (d = m.handle) || (d = m.handle = function(t) {
                    return typeof se === ke || t && se.event.triggered === t.type ? void 0 : se.event.dispatch.apply(d.elem, arguments)
                }, d.elem = t), e = (e || "").match(ye) || [""], r = e.length; r--;) o = qe.exec(e[r]) || [], p = g = o[1], f = (o[2] || "").split(".").sort(), p && (c = se.event.special[p] || {}, p = (s ? c.delegateType : c.bindType) || p, c = se.event.special[p] || {}, u = se.extend({
                    type: p,
                    origType: g,
                    data: n,
                    handler: i,
                    guid: i.guid,
                    selector: s,
                    needsContext: s && se.expr.match.needsContext.test(s),
                    namespace: f.join(".")
                }, l), (h = a[p]) || (h = a[p] = [], h.delegateCount = 0, c.setup && c.setup.call(t, n, f, d) !== !1 || (t.addEventListener ? t.addEventListener(p, d, !1) : t.attachEvent && t.attachEvent("on" + p, d))), c.add && (c.add.call(t, u), u.handler.guid || (u.handler.guid = i.guid)), s ? h.splice(h.delegateCount++, 0, u) : h.push(u), se.event.global[p] = !0);
                t = null
            }
        },
        remove: function(t, e, i, n, s) {
            var o, a, r, l, c, d, u, h, p, f, g, m = se.hasData(t) && se._data(t);
            if (m && (d = m.events)) {
                for (e = (e || "").match(ye) || [""], c = e.length; c--;)
                    if (r = qe.exec(e[c]) || [], p = g = r[1], f = (r[2] || "").split(".").sort(), p) {
                        for (u = se.event.special[p] || {}, p = (n ? u.delegateType : u.bindType) || p, h = d[p] || [], r = r[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = o = h.length; o--;) a = h[o], !s && g !== a.origType || i && i.guid !== a.guid || r && !r.test(a.namespace) || n && n !== a.selector && ("**" !== n || !a.selector) || (h.splice(o, 1), a.selector && h.delegateCount--, u.remove && u.remove.call(t, a));
                        l && !h.length && (u.teardown && u.teardown.call(t, f, m.handle) !== !1 || se.removeEvent(t, p, m.handle), delete d[p])
                    } else
                        for (p in d) se.event.remove(t, p + e[c], i, n, !0);
                se.isEmptyObject(d) && (delete m.handle, se._removeData(t, "events"))
            }
        },
        trigger: function(e, i, n, s) {
            var o, a, r, l, c, d, u, h = [n || fe],
                p = ee.call(e, "type") ? e.type : e,
                f = ee.call(e, "namespace") ? e.namespace.split(".") : [];
            if (r = d = n = n || fe, 3 !== n.nodeType && 8 !== n.nodeType && !He.test(p + se.event.triggered) && (p.indexOf(".") >= 0 && (f = p.split("."), p = f.shift(), f.sort()), a = p.indexOf(":") < 0 && "on" + p, e = e[se.expando] ? e : new se.Event(p, "object" == typeof e && e), e.isTrigger = s ? 2 : 3, e.namespace = f.join("."), e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), i = null == i ? [e] : se.makeArray(i, [e]), c = se.event.special[p] || {}, s || !c.trigger || c.trigger.apply(n, i) !== !1)) {
                if (!s && !c.noBubble && !se.isWindow(n)) {
                    for (l = c.delegateType || p, He.test(l + p) || (r = r.parentNode); r; r = r.parentNode) h.push(r), d = r;
                    d === (n.ownerDocument || fe) && h.push(d.defaultView || d.parentWindow || t)
                }
                for (u = 0;
                    (r = h[u++]) && !e.isPropagationStopped();) e.type = u > 1 ? l : c.bindType || p, o = (se._data(r, "events") || {})[e.type] && se._data(r, "handle"), o && o.apply(r, i), o = a && r[a], o && o.apply && se.acceptData(r) && (e.result = o.apply(r, i), e.result === !1 && e.preventDefault());
                if (e.type = p, !s && !e.isDefaultPrevented() && (!c._default || c._default.apply(h.pop(), i) === !1) && se.acceptData(n) && a && n[p] && !se.isWindow(n)) {
                    d = n[a], d && (n[a] = null), se.event.triggered = p;
                    try {
                        n[p]()
                    } catch (g) {}
                    se.event.triggered = void 0, d && (n[a] = d)
                }
                return e.result
            }
        },
        dispatch: function(t) {
            t = se.event.fix(t);
            var e, i, n, s, o, a = [],
                r = U.call(arguments),
                l = (se._data(this, "events") || {})[t.type] || [],
                c = se.event.special[t.type] || {};
            if (r[0] = t, t.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, t) !== !1) {
                for (a = se.event.handlers.call(this, t, l), e = 0;
                    (s = a[e++]) && !t.isPropagationStopped();)
                    for (t.currentTarget = s.elem, o = 0;
                        (n = s.handlers[o++]) && !t.isImmediatePropagationStopped();)(!t.namespace_re || t.namespace_re.test(n.namespace)) && (t.handleObj = n, t.data = n.data, i = ((se.event.special[n.origType] || {}).handle || n.handler).apply(s.elem, r), void 0 !== i && (t.result = i) === !1 && (t.preventDefault(), t.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, t), t.result
            }
        },
        handlers: function(t, e) {
            var i, n, s, o, a = [],
                r = e.delegateCount,
                l = t.target;
            if (r && l.nodeType && (!t.button || "click" !== t.type))
                for (; l != this; l = l.parentNode || this)
                    if (1 === l.nodeType && (l.disabled !== !0 || "click" !== t.type)) {
                        for (s = [], o = 0; r > o; o++) n = e[o], i = n.selector + " ", void 0 === s[i] && (s[i] = n.needsContext ? se(i, this).index(l) >= 0 : se.find(i, this, null, [l]).length), s[i] && s.push(n);
                        s.length && a.push({
                            elem: l,
                            handlers: s
                        })
                    }
            return r < e.length && a.push({
                elem: this,
                handlers: e.slice(r)
            }), a
        },
        fix: function(t) {
            if (t[se.expando]) return t;
            var e, i, n, s = t.type,
                o = t,
                a = this.fixHooks[s];
            for (a || (this.fixHooks[s] = a = Ne.test(s) ? this.mouseHooks : De.test(s) ? this.keyHooks : {}), n = a.props ? this.props.concat(a.props) : this.props, t = new se.Event(o), e = n.length; e--;) i = n[e], t[i] = o[i];
            return t.target || (t.target = o.srcElement || fe), 3 === t.target.nodeType && (t.target = t.target.parentNode), t.metaKey = !!t.metaKey, a.filter ? a.filter(t, o) : t
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(t, e) {
                return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(t, e) {
                var i, n, s, o = e.button,
                    a = e.fromElement;
                return null == t.pageX && null != e.clientX && (n = t.target.ownerDocument || fe, s = n.documentElement, i = n.body, t.pageX = e.clientX + (s && s.scrollLeft || i && i.scrollLeft || 0) - (s && s.clientLeft || i && i.clientLeft || 0), t.pageY = e.clientY + (s && s.scrollTop || i && i.scrollTop || 0) - (s && s.clientTop || i && i.clientTop || 0)), !t.relatedTarget && a && (t.relatedTarget = a === t.target ? e.toElement : a), t.which || void 0 === o || (t.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), t
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== f() && this.focus) try {
                        return this.focus(), !1
                    } catch (t) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === f() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return se.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                },
                _default: function(t) {
                    return se.nodeName(t.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(t) {
                    void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                }
            }
        },
        simulate: function(t, e, i, n) {
            var s = se.extend(new se.Event, i, {
                type: t,
                isSimulated: !0,
                originalEvent: {}
            });
            n ? se.event.trigger(s, null, e) : se.event.dispatch.call(e, s), s.isDefaultPrevented() && i.preventDefault()
        }
    }, se.removeEvent = fe.removeEventListener ? function(t, e, i) {
        t.removeEventListener && t.removeEventListener(e, i, !1)
    } : function(t, e, i) {
        var n = "on" + e;
        t.detachEvent && (typeof t[n] === ke && (t[n] = null), t.detachEvent(n, i))
    }, se.Event = function(t, e) {
        return this instanceof se.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && t.returnValue === !1 ? h : p) : this.type = t, e && se.extend(this, e), this.timeStamp = t && t.timeStamp || se.now(), void(this[se.expando] = !0)) : new se.Event(t, e)
    }, se.Event.prototype = {
        isDefaultPrevented: p,
        isPropagationStopped: p,
        isImmediatePropagationStopped: p,
        preventDefault: function() {
            var t = this.originalEvent;
            this.isDefaultPrevented = h, t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
        },
        stopPropagation: function() {
            var t = this.originalEvent;
            this.isPropagationStopped = h, t && (t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            var t = this.originalEvent;
            this.isImmediatePropagationStopped = h, t && t.stopImmediatePropagation && t.stopImmediatePropagation(), this.stopPropagation()
        }
    }, se.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(t, e) {
        se.event.special[t] = {
            delegateType: e,
            bindType: e,
            handle: function(t) {
                var i, n = this,
                    s = t.relatedTarget,
                    o = t.handleObj;
                return (!s || s !== n && !se.contains(n, s)) && (t.type = o.origType, i = o.handler.apply(this, arguments), t.type = e), i
            }
        }
    }), ie.submitBubbles || (se.event.special.submit = {
        setup: function() {
            return se.nodeName(this, "form") ? !1 : void se.event.add(this, "click._submit keypress._submit", function(t) {
                var e = t.target,
                    i = se.nodeName(e, "input") || se.nodeName(e, "button") ? e.form : void 0;
                i && !se._data(i, "submitBubbles") && (se.event.add(i, "submit._submit", function(t) {
                    t._submit_bubble = !0
                }), se._data(i, "submitBubbles", !0))
            })
        },
        postDispatch: function(t) {
            t._submit_bubble && (delete t._submit_bubble, this.parentNode && !t.isTrigger && se.event.simulate("submit", this.parentNode, t, !0))
        },
        teardown: function() {
            return se.nodeName(this, "form") ? !1 : void se.event.remove(this, "._submit")
        }
    }), ie.changeBubbles || (se.event.special.change = {
        setup: function() {
            return Ae.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (se.event.add(this, "propertychange._change", function(t) {
                "checked" === t.originalEvent.propertyName && (this._just_changed = !0)
            }), se.event.add(this, "click._change", function(t) {
                this._just_changed && !t.isTrigger && (this._just_changed = !1), se.event.simulate("change", this, t, !0)
            })), !1) : void se.event.add(this, "beforeactivate._change", function(t) {
                var e = t.target;
                Ae.test(e.nodeName) && !se._data(e, "changeBubbles") && (se.event.add(e, "change._change", function(t) {
                    !this.parentNode || t.isSimulated || t.isTrigger || se.event.simulate("change", this.parentNode, t, !0)
                }), se._data(e, "changeBubbles", !0))
            })
        },
        handle: function(t) {
            var e = t.target;
            return this !== e || t.isSimulated || t.isTrigger || "radio" !== e.type && "checkbox" !== e.type ? t.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return se.event.remove(this, "._change"), !Ae.test(this.nodeName)
        }
    }), ie.focusinBubbles || se.each({
        focus: "focusin",
        blur: "focusout"
    }, function(t, e) {
        var i = function(t) {
            se.event.simulate(e, t.target, se.event.fix(t), !0)
        };
        se.event.special[e] = {
            setup: function() {
                var n = this.ownerDocument || this,
                    s = se._data(n, e);
                s || n.addEventListener(t, i, !0), se._data(n, e, (s || 0) + 1)
            },
            teardown: function() {
                var n = this.ownerDocument || this,
                    s = se._data(n, e) - 1;
                s ? se._data(n, e, s) : (n.removeEventListener(t, i, !0), se._removeData(n, e))
            }
        }
    }), se.fn.extend({
        on: function(t, e, i, n, s) {
            var o, a;
            if ("object" == typeof t) {
                "string" != typeof e && (i = i || e, e = void 0);
                for (o in t) this.on(o, e, i, t[o], s);
                return this
            }
            if (null == i && null == n ? (n = e, i = e = void 0) : null == n && ("string" == typeof e ? (n = i, i = void 0) : (n = i, i = e, e = void 0)), n === !1) n = p;
            else if (!n) return this;
            return 1 === s && (a = n, n = function(t) {
                return se().off(t), a.apply(this, arguments)
            }, n.guid = a.guid || (a.guid = se.guid++)), this.each(function() {
                se.event.add(this, t, n, i, e)
            })
        },
        one: function(t, e, i, n) {
            return this.on(t, e, i, n, 1)
        },
        off: function(t, e, i) {
            var n, s;
            if (t && t.preventDefault && t.handleObj) return n = t.handleObj, se(t.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), this;
            if ("object" == typeof t) {
                for (s in t) this.off(s, e, t[s]);
                return this
            }
            return (e === !1 || "function" == typeof e) && (i = e, e = void 0), i === !1 && (i = p), this.each(function() {
                se.event.remove(this, t, i, e)
            })
        },
        trigger: function(t, e) {
            return this.each(function() {
                se.event.trigger(t, e, this)
            })
        },
        triggerHandler: function(t, e) {
            var i = this[0];
            return i ? se.event.trigger(t, e, i, !0) : void 0
        }
    });
    var Me = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        Le = / jQuery\d+="(?:null|\d+)"/g,
        ze = new RegExp("<(?:" + Me + ")[\\s/>]", "i"),
        Pe = /^\s+/,
        Oe = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        We = /<([\w:]+)/,
        Ie = /<tbody/i,
        Re = /<|&#?\w+;/,
        Be = /<(?:script|style|link)/i,
        Xe = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Ye = /^$|\/(?:java|ecma)script/i,
        Qe = /^true\/(.*)/,
        Ze = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        Ue = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: ie.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        },
        Ve = g(fe),
        Ge = Ve.appendChild(fe.createElement("div"));
    Ue.optgroup = Ue.option, Ue.tbody = Ue.tfoot = Ue.colgroup = Ue.caption = Ue.thead, Ue.th = Ue.td, se.extend({
        clone: function(t, e, i) {
            var n, s, o, a, r, l = se.contains(t.ownerDocument, t);
            if (ie.html5Clone || se.isXMLDoc(t) || !ze.test("<" + t.nodeName + ">") ? o = t.cloneNode(!0) : (Ge.innerHTML = t.outerHTML, Ge.removeChild(o = Ge.firstChild)), !(ie.noCloneEvent && ie.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || se.isXMLDoc(t)))
                for (n = m(o), r = m(t), a = 0; null != (s = r[a]); ++a) n[a] && k(s, n[a]);
            if (e)
                if (i)
                    for (r = r || m(t), n = n || m(o), a = 0; null != (s = r[a]); a++) w(s, n[a]);
                else w(t, o);
            return n = m(o, "script"), n.length > 0 && x(n, !l && m(t, "script")), n = r = s = null, o
        },
        buildFragment: function(t, e, i, n) {
            for (var s, o, a, r, l, c, d, u = t.length, h = g(e), p = [], f = 0; u > f; f++)
                if (o = t[f], o || 0 === o)
                    if ("object" === se.type(o)) se.merge(p, o.nodeType ? [o] : o);
                    else if (Re.test(o)) {
                for (r = r || h.appendChild(e.createElement("div")), l = (We.exec(o) || ["", ""])[1].toLowerCase(), d = Ue[l] || Ue._default, r.innerHTML = d[1] + o.replace(Oe, "<$1></$2>") + d[2], s = d[0]; s--;) r = r.lastChild;
                if (!ie.leadingWhitespace && Pe.test(o) && p.push(e.createTextNode(Pe.exec(o)[0])), !ie.tbody)
                    for (o = "table" !== l || Ie.test(o) ? "<table>" !== d[1] || Ie.test(o) ? 0 : r : r.firstChild, s = o && o.childNodes.length; s--;) se.nodeName(c = o.childNodes[s], "tbody") && !c.childNodes.length && o.removeChild(c);
                for (se.merge(p, r.childNodes), r.textContent = ""; r.firstChild;) r.removeChild(r.firstChild);
                r = h.lastChild
            } else p.push(e.createTextNode(o));
            for (r && h.removeChild(r), ie.appendChecked || se.grep(m(p, "input"), v), f = 0; o = p[f++];)
                if ((!n || -1 === se.inArray(o, n)) && (a = se.contains(o.ownerDocument, o), r = m(h.appendChild(o), "script"), a && x(r), i))
                    for (s = 0; o = r[s++];) Ye.test(o.type || "") && i.push(o);
            return r = null, h
        },
        cleanData: function(t, e) {
            for (var i, n, s, o, a = 0, r = se.expando, l = se.cache, c = ie.deleteExpando, d = se.event.special; null != (i = t[a]); a++)
                if ((e || se.acceptData(i)) && (s = i[r], o = s && l[s])) {
                    if (o.events)
                        for (n in o.events) d[n] ? se.event.remove(i, n) : se.removeEvent(i, n, o.handle);
                    l[s] && (delete l[s], c ? delete i[r] : typeof i.removeAttribute !== ke ? i.removeAttribute(r) : i[r] = null, Z.push(s))
                }
        }
    }), se.fn.extend({
        text: function(t) {
            return Ee(this, function(t) {
                return void 0 === t ? se.text(this) : this.empty().append((this[0] && this[0].ownerDocument || fe).createTextNode(t))
            }, null, t, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = _(this, t);
                    e.appendChild(t)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = _(this, t);
                    e.insertBefore(t, e.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
            })
        },
        remove: function(t, e) {
            for (var i, n = t ? se.filter(t, this) : this, s = 0; null != (i = n[s]); s++) e || 1 !== i.nodeType || se.cleanData(m(i)), i.parentNode && (e && se.contains(i.ownerDocument, i) && x(m(i, "script")), i.parentNode.removeChild(i));
            return this
        },
        empty: function() {
            for (var t, e = 0; null != (t = this[e]); e++) {
                for (1 === t.nodeType && se.cleanData(m(t, !1)); t.firstChild;) t.removeChild(t.firstChild);
                t.options && se.nodeName(t, "select") && (t.options.length = 0)
            }
            return this
        },
        clone: function(t, e) {
            return t = null == t ? !1 : t, e = null == e ? t : e, this.map(function() {
                return se.clone(this, t, e)
            })
        },
        html: function(t) {
            return Ee(this, function(t) {
                var e = this[0] || {},
                    i = 0,
                    n = this.length;
                if (void 0 === t) return 1 === e.nodeType ? e.innerHTML.replace(Le, "") : void 0;
                if (!("string" != typeof t || Be.test(t) || !ie.htmlSerialize && ze.test(t) || !ie.leadingWhitespace && Pe.test(t) || Ue[(We.exec(t) || ["", ""])[1].toLowerCase()])) {
                    t = t.replace(Oe, "<$1></$2>");
                    try {
                        for (; n > i; i++) e = this[i] || {}, 1 === e.nodeType && (se.cleanData(m(e, !1)), e.innerHTML = t);
                        e = 0
                    } catch (s) {}
                }
                e && this.empty().append(t)
            }, null, t, arguments.length)
        },
        replaceWith: function() {
            var t = arguments[0];
            return this.domManip(arguments, function(e) {
                t = this.parentNode, se.cleanData(m(this)), t && t.replaceChild(e, this)
            }), t && (t.length || t.nodeType) ? this : this.remove()
        },
        detach: function(t) {
            return this.remove(t, !0)
        },
        domManip: function(t, e) {
            t = V.apply([], t);
            var i, n, s, o, a, r, l = 0,
                c = this.length,
                d = this,
                u = c - 1,
                h = t[0],
                p = se.isFunction(h);
            if (p || c > 1 && "string" == typeof h && !ie.checkClone && Xe.test(h)) return this.each(function(i) {
                var n = d.eq(i);
                p && (t[0] = h.call(this, i, n.html())), n.domManip(t, e)
            });
            if (c && (r = se.buildFragment(t, this[0].ownerDocument, !1, this), i = r.firstChild, 1 === r.childNodes.length && (r = i), i)) {
                for (o = se.map(m(r, "script"), y), s = o.length; c > l; l++) n = r, l !== u && (n = se.clone(n, !0, !0), s && se.merge(o, m(n, "script"))), e.call(this[l], n, l);
                if (s)
                    for (a = o[o.length - 1].ownerDocument, se.map(o, b), l = 0; s > l; l++) n = o[l], Ye.test(n.type || "") && !se._data(n, "globalEval") && se.contains(a, n) && (n.src ? se._evalUrl && se._evalUrl(n.src) : se.globalEval((n.text || n.textContent || n.innerHTML || "").replace(Ze, "")));
                r = i = null
            }
            return this
        }
    }), se.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(t, e) {
        se.fn[t] = function(t) {
            for (var i, n = 0, s = [], o = se(t), a = o.length - 1; a >= n; n++) i = n === a ? this : this.clone(!0), se(o[n])[e](i), G.apply(s, i.get());
            return this.pushStack(s)
        }
    });
    var Je, Ke = {};
    ! function() {
        var t;
        ie.shrinkWrapBlocks = function() {
            if (null != t) return t;
            t = !1;
            var e, i, n;
            return i = fe.getElementsByTagName("body")[0], i && i.style ? (e = fe.createElement("div"), n = fe.createElement("div"), n.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", i.appendChild(n).appendChild(e), typeof e.style.zoom !== ke && (e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", e.appendChild(fe.createElement("div")).style.width = "5px", t = 3 !== e.offsetWidth), i.removeChild(n), t) : void 0
        }
    }();
    var ti, ei, ii = /^margin/,
        ni = new RegExp("^(" + Te + ")(?!px)[a-z%]+$", "i"),
        si = /^(top|right|bottom|left)$/;
    t.getComputedStyle ? (ti = function(t) {
            return t.ownerDocument.defaultView.getComputedStyle(t, null)
        }, ei = function(t, e, i) {
            var n, s, o, a, r = t.style;
            return i = i || ti(t), a = i ? i.getPropertyValue(e) || i[e] : void 0, i && ("" !== a || se.contains(t.ownerDocument, t) || (a = se.style(t, e)), ni.test(a) && ii.test(e) && (n = r.width, s = r.minWidth, o = r.maxWidth, r.minWidth = r.maxWidth = r.width = a, a = i.width, r.width = n, r.minWidth = s, r.maxWidth = o)), void 0 === a ? a : a + ""
        }) : fe.documentElement.currentStyle && (ti = function(t) {
            return t.currentStyle
        }, ei = function(t, e, i) {
            var n, s, o, a, r = t.style;
            return i = i || ti(t), a = i ? i[e] : void 0, null == a && r && r[e] && (a = r[e]), ni.test(a) && !si.test(e) && (n = r.left, s = t.runtimeStyle, o = s && s.left, o && (s.left = t.currentStyle.left), r.left = "fontSize" === e ? "1em" : a, a = r.pixelLeft + "px", r.left = n, o && (s.left = o)), void 0 === a ? a : a + "" || "auto"
        }),
        function() {
            function e() {
                var e, i, n, s;
                i = fe.getElementsByTagName("body")[0], i && i.style && (e = fe.createElement("div"), n = fe.createElement("div"), n.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", i.appendChild(n).appendChild(e), e.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", o = a = !1, l = !0, t.getComputedStyle && (o = "1%" !== (t.getComputedStyle(e, null) || {}).top, a = "4px" === (t.getComputedStyle(e, null) || {
                    width: "4px"
                }).width, s = e.appendChild(fe.createElement("div")), s.style.cssText = e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", s.style.marginRight = s.style.width = "0", e.style.width = "1px", l = !parseFloat((t.getComputedStyle(s, null) || {}).marginRight)), e.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", s = e.getElementsByTagName("td"), s[0].style.cssText = "margin:0;border:0;padding:0;display:none", r = 0 === s[0].offsetHeight, r && (s[0].style.display = "", s[1].style.display = "none", r = 0 === s[0].offsetHeight), i.removeChild(n))
            }
            var i, n, s, o, a, r, l;
            i = fe.createElement("div"), i.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", s = i.getElementsByTagName("a")[0], n = s && s.style, n && (n.cssText = "float:left;opacity:.5", ie.opacity = "0.5" === n.opacity, ie.cssFloat = !!n.cssFloat, i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", ie.clearCloneStyle = "content-box" === i.style.backgroundClip, ie.boxSizing = "" === n.boxSizing || "" === n.MozBoxSizing || "" === n.WebkitBoxSizing, se.extend(ie, {
                reliableHiddenOffsets: function() {
                    return null == r && e(), r
                },
                boxSizingReliable: function() {
                    return null == a && e(), a
                },
                pixelPosition: function() {
                    return null == o && e(), o
                },
                reliableMarginRight: function() {
                    return null == l && e(), l
                }
            }))
        }(), se.swap = function(t, e, i, n) {
            var s, o, a = {};
            for (o in e) a[o] = t.style[o], t.style[o] = e[o];
            s = i.apply(t, n || []);
            for (o in e) t.style[o] = a[o];
            return s
        };
    var oi = /alpha\([^)]*\)/i,
        ai = /opacity\s*=\s*([^)]*)/,
        ri = /^(none|table(?!-c[ea]).+)/,
        li = new RegExp("^(" + Te + ")(.*)$", "i"),
        ci = new RegExp("^([+-])=(" + Te + ")", "i"),
        di = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        ui = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        hi = ["Webkit", "O", "Moz", "ms"];
    se.extend({
        cssHooks: {
            opacity: {
                get: function(t, e) {
                    if (e) {
                        var i = ei(t, "opacity");
                        return "" === i ? "1" : i
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": ie.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(t, e, i, n) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                var s, o, a, r = se.camelCase(e),
                    l = t.style;
                if (e = se.cssProps[r] || (se.cssProps[r] = $(l, r)), a = se.cssHooks[e] || se.cssHooks[r], void 0 === i) return a && "get" in a && void 0 !== (s = a.get(t, !1, n)) ? s : l[e];
                if (o = typeof i, "string" === o && (s = ci.exec(i)) && (i = (s[1] + 1) * s[2] + parseFloat(se.css(t, e)), o = "number"), null != i && i === i && ("number" !== o || se.cssNumber[r] || (i += "px"), ie.clearCloneStyle || "" !== i || 0 !== e.indexOf("background") || (l[e] = "inherit"), !(a && "set" in a && void 0 === (i = a.set(t, i, n))))) try {
                    l[e] = i
                } catch (c) {}
            }
        },
        css: function(t, e, i, n) {
            var s, o, a, r = se.camelCase(e);
            return e = se.cssProps[r] || (se.cssProps[r] = $(t.style, r)), a = se.cssHooks[e] || se.cssHooks[r], a && "get" in a && (o = a.get(t, !0, i)), void 0 === o && (o = ei(t, e, n)), "normal" === o && e in ui && (o = ui[e]), "" === i || i ? (s = parseFloat(o), i === !0 || se.isNumeric(s) ? s || 0 : o) : o
        }
    }), se.each(["height", "width"], function(t, e) {
        se.cssHooks[e] = {
            get: function(t, i, n) {
                return i ? ri.test(se.css(t, "display")) && 0 === t.offsetWidth ? se.swap(t, di, function() {
                    return A(t, e, n)
                }) : A(t, e, n) : void 0
            },
            set: function(t, i, n) {
                var s = n && ti(t);
                return E(t, i, n ? j(t, e, n, ie.boxSizing && "border-box" === se.css(t, "boxSizing", !1, s), s) : 0)
            }
        }
    }), ie.opacity || (se.cssHooks.opacity = {
        get: function(t, e) {
            return ai.test((e && t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : e ? "1" : ""
        },
        set: function(t, e) {
            var i = t.style,
                n = t.currentStyle,
                s = se.isNumeric(e) ? "alpha(opacity=" + 100 * e + ")" : "",
                o = n && n.filter || i.filter || "";
            i.zoom = 1, (e >= 1 || "" === e) && "" === se.trim(o.replace(oi, "")) && i.removeAttribute && (i.removeAttribute("filter"), "" === e || n && !n.filter) || (i.filter = oi.test(o) ? o.replace(oi, s) : o + " " + s)
        }
    }), se.cssHooks.marginRight = T(ie.reliableMarginRight, function(t, e) {
        return e ? se.swap(t, {
            display: "inline-block"
        }, ei, [t, "marginRight"]) : void 0
    }), se.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(t, e) {
        se.cssHooks[t + e] = {
            expand: function(i) {
                for (var n = 0, s = {}, o = "string" == typeof i ? i.split(" ") : [i]; 4 > n; n++) s[t + $e[n] + e] = o[n] || o[n - 2] || o[0];
                return s
            }
        }, ii.test(t) || (se.cssHooks[t + e].set = E)
    }), se.fn.extend({
        css: function(t, e) {
            return Ee(this, function(t, e, i) {
                var n, s, o = {},
                    a = 0;
                if (se.isArray(e)) {
                    for (n = ti(t), s = e.length; s > a; a++) o[e[a]] = se.css(t, e[a], !1, n);
                    return o
                }
                return void 0 !== i ? se.style(t, e, i) : se.css(t, e)
            }, t, e, arguments.length > 1)
        },
        show: function() {
            return F(this, !0)
        },
        hide: function() {
            return F(this)
        },
        toggle: function(t) {
            return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                Fe(this) ? se(this).show() : se(this).hide()
            })
        }
    }), se.Tween = D, D.prototype = {
        constructor: D,
        init: function(t, e, i, n, s, o) {
            this.elem = t, this.prop = i, this.easing = s || "swing", this.options = e, this.start = this.now = this.cur(), this.end = n, this.unit = o || (se.cssNumber[i] ? "" : "px")
        },
        cur: function() {
            var t = D.propHooks[this.prop];
            return t && t.get ? t.get(this) : D.propHooks._default.get(this)
        },
        run: function(t) {
            var e, i = D.propHooks[this.prop];
            return this.pos = e = this.options.duration ? se.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : D.propHooks._default.set(this), this
        }
    }, D.prototype.init.prototype = D.prototype, D.propHooks = {
        _default: {
            get: function(t) {
                var e;
                return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (e = se.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0) : t.elem[t.prop]
            },
            set: function(t) {
                se.fx.step[t.prop] ? se.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[se.cssProps[t.prop]] || se.cssHooks[t.prop]) ? se.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now
            }
        }
    }, D.propHooks.scrollTop = D.propHooks.scrollLeft = {
        set: function(t) {
            t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
        }
    }, se.easing = {
        linear: function(t) {
            return t
        },
        swing: function(t) {
            return .5 - Math.cos(t * Math.PI) / 2
        }
    }, se.fx = D.prototype.init, se.fx.step = {};
    var pi, fi, gi = /^(?:toggle|show|hide)$/,
        mi = new RegExp("^(?:([+-])=|)(" + Te + ")([a-z%]*)$", "i"),
        vi = /queueHooks$/,
        _i = [M],
        yi = {
            "*": [
                function(t, e) {
                    var i = this.createTween(t, e),
                        n = i.cur(),
                        s = mi.exec(e),
                        o = s && s[3] || (se.cssNumber[t] ? "" : "px"),
                        a = (se.cssNumber[t] || "px" !== o && +n) && mi.exec(se.css(i.elem, t)),
                        r = 1,
                        l = 20;
                    if (a && a[3] !== o) {
                        o = o || a[3], s = s || [], a = +n || 1;
                        do r = r || ".5", a /= r, se.style(i.elem, t, a + o); while (r !== (r = i.cur() / n) && 1 !== r && --l)
                    }
                    return s && (a = i.start = +a || +n || 0, i.unit = o, i.end = s[1] ? a + (s[1] + 1) * s[2] : +s[2]), i
                }
            ]
        };
    se.Animation = se.extend(z, {
            tweener: function(t, e) {
                se.isFunction(t) ? (e = t, t = ["*"]) : t = t.split(" ");
                for (var i, n = 0, s = t.length; s > n; n++) i = t[n], yi[i] = yi[i] || [], yi[i].unshift(e)
            },
            prefilter: function(t, e) {
                e ? _i.unshift(t) : _i.push(t)
            }
        }), se.speed = function(t, e, i) {
            var n = t && "object" == typeof t ? se.extend({}, t) : {
                complete: i || !i && e || se.isFunction(t) && t,
                duration: t,
                easing: i && e || e && !se.isFunction(e) && e
            };
            return n.duration = se.fx.off ? 0 : "number" == typeof n.duration ? n.duration : n.duration in se.fx.speeds ? se.fx.speeds[n.duration] : se.fx.speeds._default, (null == n.queue || n.queue === !0) && (n.queue = "fx"), n.old = n.complete, n.complete = function() {
                se.isFunction(n.old) && n.old.call(this), n.queue && se.dequeue(this, n.queue)
            }, n
        }, se.fn.extend({
            fadeTo: function(t, e, i, n) {
                return this.filter(Fe).css("opacity", 0).show().end().animate({
                    opacity: e
                }, t, i, n)
            },
            animate: function(t, e, i, n) {
                var s = se.isEmptyObject(t),
                    o = se.speed(e, i, n),
                    a = function() {
                        var e = z(this, se.extend({}, t), o);
                        (s || se._data(this, "finish")) && e.stop(!0)
                    };
                return a.finish = a, s || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
            },
            stop: function(t, e, i) {
                var n = function(t) {
                    var e = t.stop;
                    delete t.stop, e(i)
                };
                return "string" != typeof t && (i = e, e = t, t = void 0), e && t !== !1 && this.queue(t || "fx", []), this.each(function() {
                    var e = !0,
                        s = null != t && t + "queueHooks",
                        o = se.timers,
                        a = se._data(this);
                    if (s) a[s] && a[s].stop && n(a[s]);
                    else
                        for (s in a) a[s] && a[s].stop && vi.test(s) && n(a[s]);
                    for (s = o.length; s--;) o[s].elem !== this || null != t && o[s].queue !== t || (o[s].anim.stop(i), e = !1, o.splice(s, 1));
                    (e || !i) && se.dequeue(this, t)
                })
            },
            finish: function(t) {
                return t !== !1 && (t = t || "fx"), this.each(function() {
                    var e, i = se._data(this),
                        n = i[t + "queue"],
                        s = i[t + "queueHooks"],
                        o = se.timers,
                        a = n ? n.length : 0;
                    for (i.finish = !0, se.queue(this, t, []), s && s.stop && s.stop.call(this, !0), e = o.length; e--;) o[e].elem === this && o[e].queue === t && (o[e].anim.stop(!0), o.splice(e, 1));
                    for (e = 0; a > e; e++) n[e] && n[e].finish && n[e].finish.call(this);
                    delete i.finish
                })
            }
        }), se.each(["toggle", "show", "hide"], function(t, e) {
            var i = se.fn[e];
            se.fn[e] = function(t, n, s) {
                return null == t || "boolean" == typeof t ? i.apply(this, arguments) : this.animate(H(e, !0), t, n, s)
            }
        }), se.each({
            slideDown: H("show"),
            slideUp: H("hide"),
            slideToggle: H("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(t, e) {
            se.fn[t] = function(t, i, n) {
                return this.animate(e, t, i, n)
            }
        }), se.timers = [], se.fx.tick = function() {
            var t, e = se.timers,
                i = 0;
            for (pi = se.now(); i < e.length; i++) t = e[i], t() || e[i] !== t || e.splice(i--, 1);
            e.length || se.fx.stop(), pi = void 0
        }, se.fx.timer = function(t) {
            se.timers.push(t), t() ? se.fx.start() : se.timers.pop()
        }, se.fx.interval = 13, se.fx.start = function() {
            fi || (fi = setInterval(se.fx.tick, se.fx.interval))
        }, se.fx.stop = function() {
            clearInterval(fi), fi = null
        }, se.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, se.fn.delay = function(t, e) {
            return t = se.fx ? se.fx.speeds[t] || t : t, e = e || "fx", this.queue(e, function(e, i) {
                var n = setTimeout(e, t);
                i.stop = function() {
                    clearTimeout(n)
                }
            })
        },
        function() {
            var t, e, i, n, s;
            e = fe.createElement("div"), e.setAttribute("className", "t"), e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = e.getElementsByTagName("a")[0], i = fe.createElement("select"), s = i.appendChild(fe.createElement("option")), t = e.getElementsByTagName("input")[0], n.style.cssText = "top:1px", ie.getSetAttribute = "t" !== e.className, ie.style = /top/.test(n.getAttribute("style")), ie.hrefNormalized = "/a" === n.getAttribute("href"), ie.checkOn = !!t.value, ie.optSelected = s.selected, ie.enctype = !!fe.createElement("form").enctype, i.disabled = !0, ie.optDisabled = !s.disabled, t = fe.createElement("input"), t.setAttribute("value", ""), ie.input = "" === t.getAttribute("value"), t.value = "t", t.setAttribute("type", "radio"), ie.radioValue = "t" === t.value
        }();
    var bi = /\r/g;
    se.fn.extend({
        val: function(t) {
            var e, i, n, s = this[0]; {
                if (arguments.length) return n = se.isFunction(t), this.each(function(i) {
                    var s;
                    1 === this.nodeType && (s = n ? t.call(this, i, se(this).val()) : t, null == s ? s = "" : "number" == typeof s ? s += "" : se.isArray(s) && (s = se.map(s, function(t) {
                        return null == t ? "" : t + ""
                    })), e = se.valHooks[this.type] || se.valHooks[this.nodeName.toLowerCase()], e && "set" in e && void 0 !== e.set(this, s, "value") || (this.value = s))
                });
                if (s) return e = se.valHooks[s.type] || se.valHooks[s.nodeName.toLowerCase()], e && "get" in e && void 0 !== (i = e.get(s, "value")) ? i : (i = s.value, "string" == typeof i ? i.replace(bi, "") : null == i ? "" : i)
            }
        }
    }), se.extend({
        valHooks: {
            option: {
                get: function(t) {
                    var e = se.find.attr(t, "value");
                    return null != e ? e : se.trim(se.text(t))
                }
            },
            select: {
                get: function(t) {
                    for (var e, i, n = t.options, s = t.selectedIndex, o = "select-one" === t.type || 0 > s, a = o ? null : [], r = o ? s + 1 : n.length, l = 0 > s ? r : o ? s : 0; r > l; l++)
                        if (i = n[l], !(!i.selected && l !== s || (ie.optDisabled ? i.disabled : null !== i.getAttribute("disabled")) || i.parentNode.disabled && se.nodeName(i.parentNode, "optgroup"))) {
                            if (e = se(i).val(), o) return e;
                            a.push(e)
                        }
                    return a
                },
                set: function(t, e) {
                    for (var i, n, s = t.options, o = se.makeArray(e), a = s.length; a--;)
                        if (n = s[a], se.inArray(se.valHooks.option.get(n), o) >= 0) try {
                            n.selected = i = !0
                        } catch (r) {
                            n.scrollHeight
                        } else n.selected = !1;
                    return i || (t.selectedIndex = -1), s
                }
            }
        }
    }), se.each(["radio", "checkbox"], function() {
        se.valHooks[this] = {
            set: function(t, e) {
                return se.isArray(e) ? t.checked = se.inArray(se(t).val(), e) >= 0 : void 0
            }
        }, ie.checkOn || (se.valHooks[this].get = function(t) {
            return null === t.getAttribute("value") ? "on" : t.value
        })
    });
    var xi, wi, ki = se.expr.attrHandle,
        Ci = /^(?:checked|selected)$/i,
        Si = ie.getSetAttribute,
        Ti = ie.input;
    se.fn.extend({
        attr: function(t, e) {
            return Ee(this, se.attr, t, e, arguments.length > 1)
        },
        removeAttr: function(t) {
            return this.each(function() {
                se.removeAttr(this, t)
            })
        }
    }), se.extend({
        attr: function(t, e, i) {
            var n, s, o = t.nodeType;
            if (t && 3 !== o && 8 !== o && 2 !== o) return typeof t.getAttribute === ke ? se.prop(t, e, i) : (1 === o && se.isXMLDoc(t) || (e = e.toLowerCase(), n = se.attrHooks[e] || (se.expr.match.bool.test(e) ? wi : xi)), void 0 === i ? n && "get" in n && null !== (s = n.get(t, e)) ? s : (s = se.find.attr(t, e), null == s ? void 0 : s) : null !== i ? n && "set" in n && void 0 !== (s = n.set(t, i, e)) ? s : (t.setAttribute(e, i + ""), i) : void se.removeAttr(t, e))
        },
        removeAttr: function(t, e) {
            var i, n, s = 0,
                o = e && e.match(ye);
            if (o && 1 === t.nodeType)
                for (; i = o[s++];) n = se.propFix[i] || i, se.expr.match.bool.test(i) ? Ti && Si || !Ci.test(i) ? t[n] = !1 : t[se.camelCase("default-" + i)] = t[n] = !1 : se.attr(t, i, ""), t.removeAttribute(Si ? i : n)
        },
        attrHooks: {
            type: {
                set: function(t, e) {
                    if (!ie.radioValue && "radio" === e && se.nodeName(t, "input")) {
                        var i = t.value;
                        return t.setAttribute("type", e), i && (t.value = i), e
                    }
                }
            }
        }
    }), wi = {
        set: function(t, e, i) {
            return e === !1 ? se.removeAttr(t, i) : Ti && Si || !Ci.test(i) ? t.setAttribute(!Si && se.propFix[i] || i, i) : t[se.camelCase("default-" + i)] = t[i] = !0, i
        }
    }, se.each(se.expr.match.bool.source.match(/\w+/g), function(t, e) {
        var i = ki[e] || se.find.attr;
        ki[e] = Ti && Si || !Ci.test(e) ? function(t, e, n) {
            var s, o;
            return n || (o = ki[e], ki[e] = s, s = null != i(t, e, n) ? e.toLowerCase() : null, ki[e] = o), s
        } : function(t, e, i) {
            return i ? void 0 : t[se.camelCase("default-" + e)] ? e.toLowerCase() : null
        }
    }), Ti && Si || (se.attrHooks.value = {
        set: function(t, e, i) {
            return se.nodeName(t, "input") ? void(t.defaultValue = e) : xi && xi.set(t, e, i)
        }
    }), Si || (xi = {
        set: function(t, e, i) {
            var n = t.getAttributeNode(i);
            return n || t.setAttributeNode(n = t.ownerDocument.createAttribute(i)), n.value = e += "", "value" === i || e === t.getAttribute(i) ? e : void 0
        }
    }, ki.id = ki.name = ki.coords = function(t, e, i) {
        var n;
        return i ? void 0 : (n = t.getAttributeNode(e)) && "" !== n.value ? n.value : null
    }, se.valHooks.button = {
        get: function(t, e) {
            var i = t.getAttributeNode(e);
            return i && i.specified ? i.value : void 0
        },
        set: xi.set
    }, se.attrHooks.contenteditable = {
        set: function(t, e, i) {
            xi.set(t, "" === e ? !1 : e, i)
        }
    }, se.each(["width", "height"], function(t, e) {
        se.attrHooks[e] = {
            set: function(t, i) {
                return "" === i ? (t.setAttribute(e, "auto"), i) : void 0
            }
        }
    })), ie.style || (se.attrHooks.style = {
        get: function(t) {
            return t.style.cssText || void 0
        },
        set: function(t, e) {
            return t.style.cssText = e + ""
        }
    });
    var $i = /^(?:input|select|textarea|button|object)$/i,
        Fi = /^(?:a|area)$/i;
    se.fn.extend({
        prop: function(t, e) {
            return Ee(this, se.prop, t, e, arguments.length > 1)
        },
        removeProp: function(t) {
            return t = se.propFix[t] || t, this.each(function() {
                try {
                    this[t] = void 0, delete this[t]
                } catch (e) {}
            })
        }
    }), se.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(t, e, i) {
            var n, s, o, a = t.nodeType;
            if (t && 3 !== a && 8 !== a && 2 !== a) return o = 1 !== a || !se.isXMLDoc(t), o && (e = se.propFix[e] || e, s = se.propHooks[e]), void 0 !== i ? s && "set" in s && void 0 !== (n = s.set(t, i, e)) ? n : t[e] = i : s && "get" in s && null !== (n = s.get(t, e)) ? n : t[e]
        },
        propHooks: {
            tabIndex: {
                get: function(t) {
                    var e = se.find.attr(t, "tabindex");
                    return e ? parseInt(e, 10) : $i.test(t.nodeName) || Fi.test(t.nodeName) && t.href ? 0 : -1
                }
            }
        }
    }), ie.hrefNormalized || se.each(["href", "src"], function(t, e) {
        se.propHooks[e] = {
            get: function(t) {
                return t.getAttribute(e, 4)
            }
        }
    }), ie.optSelected || (se.propHooks.selected = {
        get: function(t) {
            var e = t.parentNode;
            return e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex), null
        }
    }), se.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        se.propFix[this.toLowerCase()] = this
    }), ie.enctype || (se.propFix.enctype = "encoding");
    var Ei = /[\t\r\n\f]/g;
    se.fn.extend({
        addClass: function(t) {
            var e, i, n, s, o, a, r = 0,
                l = this.length,
                c = "string" == typeof t && t;
            if (se.isFunction(t)) return this.each(function(e) {
                se(this).addClass(t.call(this, e, this.className))
            });
            if (c)
                for (e = (t || "").match(ye) || []; l > r; r++)
                    if (i = this[r], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(Ei, " ") : " ")) {
                        for (o = 0; s = e[o++];) n.indexOf(" " + s + " ") < 0 && (n += s + " ");
                        a = se.trim(n), i.className !== a && (i.className = a)
                    }
            return this
        },
        removeClass: function(t) {
            var e, i, n, s, o, a, r = 0,
                l = this.length,
                c = 0 === arguments.length || "string" == typeof t && t;
            if (se.isFunction(t)) return this.each(function(e) {
                se(this).removeClass(t.call(this, e, this.className))
            });
            if (c)
                for (e = (t || "").match(ye) || []; l > r; r++)
                    if (i = this[r], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(Ei, " ") : "")) {
                        for (o = 0; s = e[o++];)
                            for (; n.indexOf(" " + s + " ") >= 0;) n = n.replace(" " + s + " ", " ");
                        a = t ? se.trim(n) : "", i.className !== a && (i.className = a)
                    }
            return this
        },
        toggleClass: function(t, e) {
            var i = typeof t;
            return "boolean" == typeof e && "string" === i ? e ? this.addClass(t) : this.removeClass(t) : this.each(se.isFunction(t) ? function(i) {
                se(this).toggleClass(t.call(this, i, this.className, e), e)
            } : function() {
                if ("string" === i)
                    for (var e, n = 0, s = se(this), o = t.match(ye) || []; e = o[n++];) s.hasClass(e) ? s.removeClass(e) : s.addClass(e);
                else(i === ke || "boolean" === i) && (this.className && se._data(this, "__className__", this.className), this.className = this.className || t === !1 ? "" : se._data(this, "__className__") || "")
            })
        },
        hasClass: function(t) {
            for (var e = " " + t + " ", i = 0, n = this.length; n > i; i++)
                if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(Ei, " ").indexOf(e) >= 0) return !0;
            return !1
        }
    }), se.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(t, e) {
        se.fn[e] = function(t, i) {
            return arguments.length > 0 ? this.on(e, null, t, i) : this.trigger(e)
        }
    }), se.fn.extend({
        hover: function(t, e) {
            return this.mouseenter(t).mouseleave(e || t)
        },
        bind: function(t, e, i) {
            return this.on(t, null, e, i)
        },
        unbind: function(t, e) {
            return this.off(t, null, e)
        },
        delegate: function(t, e, i, n) {
            return this.on(e, t, i, n)
        },
        undelegate: function(t, e, i) {
            return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", i)
        }
    });
    var ji = se.now(),
        Ai = /\?/,
        Di = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    se.parseJSON = function(e) {
        if (t.JSON && t.JSON.parse) return t.JSON.parse(e + "");
        var i, n = null,
            s = se.trim(e + "");
        return s && !se.trim(s.replace(Di, function(t, e, s, o) {
            return i && e && (n = 0), 0 === n ? t : (i = s || e, n += !o - !s, "")
        })) ? Function("return " + s)() : se.error("Invalid JSON: " + e)
    }, se.parseXML = function(e) {
        var i, n;
        if (!e || "string" != typeof e) return null;
        try {
            t.DOMParser ? (n = new DOMParser, i = n.parseFromString(e, "text/xml")) : (i = new ActiveXObject("Microsoft.XMLDOM"), i.async = "false", i.loadXML(e))
        } catch (s) {
            i = void 0
        }
        return i && i.documentElement && !i.getElementsByTagName("parsererror").length || se.error("Invalid XML: " + e), i
    };
    var Ni, Hi, qi = /#.*$/,
        Mi = /([?&])_=[^&]*/,
        Li = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        zi = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Pi = /^(?:GET|HEAD)$/,
        Oi = /^\/\//,
        Wi = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        Ii = {},
        Ri = {},
        Bi = "*/".concat("*");
    try {
        Hi = location.href
    } catch (Xi) {
        Hi = fe.createElement("a"), Hi.href = "", Hi = Hi.href
    }
    Ni = Wi.exec(Hi.toLowerCase()) || [], se.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Hi,
            type: "GET",
            isLocal: zi.test(Ni[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Bi,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": se.parseJSON,
                "text xml": se.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(t, e) {
            return e ? W(W(t, se.ajaxSettings), e) : W(se.ajaxSettings, t)
        },
        ajaxPrefilter: P(Ii),
        ajaxTransport: P(Ri),
        ajax: function(t, e) {
            function i(t, e, i, n) {
                var s, d, v, _, b, w = e;
                2 !== y && (y = 2, r && clearTimeout(r), c = void 0, a = n || "", x.readyState = t > 0 ? 4 : 0, s = t >= 200 && 300 > t || 304 === t, i && (_ = I(u, x, i)), _ = R(u, _, x, s), s ? (u.ifModified && (b = x.getResponseHeader("Last-Modified"), b && (se.lastModified[o] = b), b = x.getResponseHeader("etag"), b && (se.etag[o] = b)), 204 === t || "HEAD" === u.type ? w = "nocontent" : 304 === t ? w = "notmodified" : (w = _.state, d = _.data, v = _.error, s = !v)) : (v = w, (t || !w) && (w = "error", 0 > t && (t = 0))), x.status = t, x.statusText = (e || w) + "", s ? f.resolveWith(h, [d, w, x]) : f.rejectWith(h, [x, w, v]), x.statusCode(m), m = void 0, l && p.trigger(s ? "ajaxSuccess" : "ajaxError", [x, u, s ? d : v]), g.fireWith(h, [x, w]), l && (p.trigger("ajaxComplete", [x, u]), --se.active || se.event.trigger("ajaxStop")))
            }
            "object" == typeof t && (e = t, t = void 0), e = e || {};
            var n, s, o, a, r, l, c, d, u = se.ajaxSetup({}, e),
                h = u.context || u,
                p = u.context && (h.nodeType || h.jquery) ? se(h) : se.event,
                f = se.Deferred(),
                g = se.Callbacks("once memory"),
                m = u.statusCode || {},
                v = {},
                _ = {},
                y = 0,
                b = "canceled",
                x = {
                    readyState: 0,
                    getResponseHeader: function(t) {
                        var e;
                        if (2 === y) {
                            if (!d)
                                for (d = {}; e = Li.exec(a);) d[e[1].toLowerCase()] = e[2];
                            e = d[t.toLowerCase()]
                        }
                        return null == e ? null : e
                    },
                    getAllResponseHeaders: function() {
                        return 2 === y ? a : null
                    },
                    setRequestHeader: function(t, e) {
                        var i = t.toLowerCase();
                        return y || (t = _[i] = _[i] || t, v[t] = e), this
                    },
                    overrideMimeType: function(t) {
                        return y || (u.mimeType = t), this
                    },
                    statusCode: function(t) {
                        var e;
                        if (t)
                            if (2 > y)
                                for (e in t) m[e] = [m[e], t[e]];
                            else x.always(t[x.status]);
                        return this
                    },
                    abort: function(t) {
                        var e = t || b;
                        return c && c.abort(e), i(0, e), this
                    }
                };
            if (f.promise(x).complete = g.add, x.success = x.done, x.error = x.fail, u.url = ((t || u.url || Hi) + "").replace(qi, "").replace(Oi, Ni[1] + "//"), u.type = e.method || e.type || u.method || u.type, u.dataTypes = se.trim(u.dataType || "*").toLowerCase().match(ye) || [""], null == u.crossDomain && (n = Wi.exec(u.url.toLowerCase()), u.crossDomain = !(!n || n[1] === Ni[1] && n[2] === Ni[2] && (n[3] || ("http:" === n[1] ? "80" : "443")) === (Ni[3] || ("http:" === Ni[1] ? "80" : "443")))), u.data && u.processData && "string" != typeof u.data && (u.data = se.param(u.data, u.traditional)), O(Ii, u, e, x), 2 === y) return x;
            l = u.global, l && 0 === se.active++ && se.event.trigger("ajaxStart"), u.type = u.type.toUpperCase(), u.hasContent = !Pi.test(u.type), o = u.url, u.hasContent || (u.data && (o = u.url += (Ai.test(o) ? "&" : "?") + u.data, delete u.data), u.cache === !1 && (u.url = Mi.test(o) ? o.replace(Mi, "$1_=" + ji++) : o + (Ai.test(o) ? "&" : "?") + "_=" + ji++)), u.ifModified && (se.lastModified[o] && x.setRequestHeader("If-Modified-Since", se.lastModified[o]), se.etag[o] && x.setRequestHeader("If-None-Match", se.etag[o])), (u.data && u.hasContent && u.contentType !== !1 || e.contentType) && x.setRequestHeader("Content-Type", u.contentType), x.setRequestHeader("Accept", u.dataTypes[0] && u.accepts[u.dataTypes[0]] ? u.accepts[u.dataTypes[0]] + ("*" !== u.dataTypes[0] ? ", " + Bi + "; q=0.01" : "") : u.accepts["*"]);
            for (s in u.headers) x.setRequestHeader(s, u.headers[s]);
            if (u.beforeSend && (u.beforeSend.call(h, x, u) === !1 || 2 === y)) return x.abort();
            b = "abort";
            for (s in {
                success: 1,
                error: 1,
                complete: 1
            }) x[s](u[s]);
            if (c = O(Ri, u, e, x)) {
                x.readyState = 1, l && p.trigger("ajaxSend", [x, u]), u.async && u.timeout > 0 && (r = setTimeout(function() {
                    x.abort("timeout")
                }, u.timeout));
                try {
                    y = 1, c.send(v, i)
                } catch (w) {
                    if (!(2 > y)) throw w;
                    i(-1, w)
                }
            } else i(-1, "No Transport");
            return x
        },
        getJSON: function(t, e, i) {
            return se.get(t, e, i, "json")
        },
        getScript: function(t, e) {
            return se.get(t, void 0, e, "script")
        }
    }), se.each(["get", "post"], function(t, e) {
        se[e] = function(t, i, n, s) {
            return se.isFunction(i) && (s = s || n, n = i, i = void 0), se.ajax({
                url: t,
                type: e,
                dataType: s,
                data: i,
                success: n
            })
        }
    }), se.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
        se.fn[e] = function(t) {
            return this.on(e, t)
        }
    }), se._evalUrl = function(t) {
        return se.ajax({
            url: t,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }, se.fn.extend({
        wrapAll: function(t) {
            if (se.isFunction(t)) return this.each(function(e) {
                se(this).wrapAll(t.call(this, e))
            });
            if (this[0]) {
                var e = se(t, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                    for (var t = this; t.firstChild && 1 === t.firstChild.nodeType;) t = t.firstChild;
                    return t
                }).append(this)
            }
            return this
        },
        wrapInner: function(t) {
            return this.each(se.isFunction(t) ? function(e) {
                se(this).wrapInner(t.call(this, e))
            } : function() {
                var e = se(this),
                    i = e.contents();
                i.length ? i.wrapAll(t) : e.append(t)
            })
        },
        wrap: function(t) {
            var e = se.isFunction(t);
            return this.each(function(i) {
                se(this).wrapAll(e ? t.call(this, i) : t)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                se.nodeName(this, "body") || se(this).replaceWith(this.childNodes)
            }).end()
        }
    }), se.expr.filters.hidden = function(t) {
        return t.offsetWidth <= 0 && t.offsetHeight <= 0 || !ie.reliableHiddenOffsets() && "none" === (t.style && t.style.display || se.css(t, "display"))
    }, se.expr.filters.visible = function(t) {
        return !se.expr.filters.hidden(t)
    };
    var Yi = /%20/g,
        Qi = /\[\]$/,
        Zi = /\r?\n/g,
        Ui = /^(?:submit|button|image|reset|file)$/i,
        Vi = /^(?:input|select|textarea|keygen)/i;
    se.param = function(t, e) {
        var i, n = [],
            s = function(t, e) {
                e = se.isFunction(e) ? e() : null == e ? "" : e, n[n.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
            };
        if (void 0 === e && (e = se.ajaxSettings && se.ajaxSettings.traditional), se.isArray(t) || t.jquery && !se.isPlainObject(t)) se.each(t, function() {
            s(this.name, this.value)
        });
        else
            for (i in t) B(i, t[i], e, s);
        return n.join("&").replace(Yi, "+")
    }, se.fn.extend({
        serialize: function() {
            return se.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var t = se.prop(this, "elements");
                return t ? se.makeArray(t) : this
            }).filter(function() {
                var t = this.type;
                return this.name && !se(this).is(":disabled") && Vi.test(this.nodeName) && !Ui.test(t) && (this.checked || !je.test(t))
            }).map(function(t, e) {
                var i = se(this).val();
                return null == i ? null : se.isArray(i) ? se.map(i, function(t) {
                    return {
                        name: e.name,
                        value: t.replace(Zi, "\r\n")
                    }
                }) : {
                    name: e.name,
                    value: i.replace(Zi, "\r\n")
                }
            }).get()
        }
    }), se.ajaxSettings.xhr = void 0 !== t.ActiveXObject ? function() {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && X() || Y()
    } : X;
    var Gi = 0,
        Ji = {},
        Ki = se.ajaxSettings.xhr();
    t.ActiveXObject && se(t).on("unload", function() {
        for (var t in Ji) Ji[t](void 0, !0)
    }), ie.cors = !!Ki && "withCredentials" in Ki, Ki = ie.ajax = !!Ki, Ki && se.ajaxTransport(function(t) {
        if (!t.crossDomain || ie.cors) {
            var e;
            return {
                send: function(i, n) {
                    var s, o = t.xhr(),
                        a = ++Gi;
                    if (o.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                        for (s in t.xhrFields) o[s] = t.xhrFields[s];
                    t.mimeType && o.overrideMimeType && o.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                    for (s in i) void 0 !== i[s] && o.setRequestHeader(s, i[s] + "");
                    o.send(t.hasContent && t.data || null), e = function(i, s) {
                        var r, l, c;
                        if (e && (s || 4 === o.readyState))
                            if (delete Ji[a], e = void 0, o.onreadystatechange = se.noop, s) 4 !== o.readyState && o.abort();
                            else {
                                c = {}, r = o.status, "string" == typeof o.responseText && (c.text = o.responseText);
                                try {
                                    l = o.statusText
                                } catch (d) {
                                    l = ""
                                }
                                r || !t.isLocal || t.crossDomain ? 1223 === r && (r = 204) : r = c.text ? 200 : 404
                            }
                        c && n(r, l, c, o.getAllResponseHeaders())
                    }, t.async ? 4 === o.readyState ? setTimeout(e) : o.onreadystatechange = Ji[a] = e : e()
                },
                abort: function() {
                    e && e(void 0, !0)
                }
            }
        }
    }), se.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(t) {
                return se.globalEval(t), t
            }
        }
    }), se.ajaxPrefilter("script", function(t) {
        void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET", t.global = !1)
    }), se.ajaxTransport("script", function(t) {
        if (t.crossDomain) {
            var e, i = fe.head || se("head")[0] || fe.documentElement;
            return {
                send: function(n, s) {
                    e = fe.createElement("script"), e.async = !0, t.scriptCharset && (e.charset = t.scriptCharset), e.src = t.url, e.onload = e.onreadystatechange = function(t, i) {
                        (i || !e.readyState || /loaded|complete/.test(e.readyState)) && (e.onload = e.onreadystatechange = null, e.parentNode && e.parentNode.removeChild(e), e = null, i || s(200, "success"))
                    }, i.insertBefore(e, i.firstChild)
                },
                abort: function() {
                    e && e.onload(void 0, !0)
                }
            }
        }
    });
    var tn = [],
        en = /(=)\?(?=&|$)|\?\?/;
    se.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var t = tn.pop() || se.expando + "_" + ji++;
            return this[t] = !0, t
        }
    }), se.ajaxPrefilter("json jsonp", function(e, i, n) {
        var s, o, a, r = e.jsonp !== !1 && (en.test(e.url) ? "url" : "string" == typeof e.data && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && en.test(e.data) && "data");
        return r || "jsonp" === e.dataTypes[0] ? (s = e.jsonpCallback = se.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, r ? e[r] = e[r].replace(en, "$1" + s) : e.jsonp !== !1 && (e.url += (Ai.test(e.url) ? "&" : "?") + e.jsonp + "=" + s), e.converters["script json"] = function() {
            return a || se.error(s + " was not called"), a[0]
        }, e.dataTypes[0] = "json", o = t[s], t[s] = function() {
            a = arguments
        }, n.always(function() {
            t[s] = o, e[s] && (e.jsonpCallback = i.jsonpCallback, tn.push(s)), a && se.isFunction(o) && o(a[0]), a = o = void 0
        }), "script") : void 0
    }), se.parseHTML = function(t, e, i) {
        if (!t || "string" != typeof t) return null;
        "boolean" == typeof e && (i = e, e = !1), e = e || fe;
        var n = ue.exec(t),
            s = !i && [];
        return n ? [e.createElement(n[1])] : (n = se.buildFragment([t], e, s), s && s.length && se(s).remove(), se.merge([], n.childNodes))
    };
    var nn = se.fn.load;
    se.fn.load = function(t, e, i) {
        if ("string" != typeof t && nn) return nn.apply(this, arguments);
        var n, s, o, a = this,
            r = t.indexOf(" ");
        return r >= 0 && (n = se.trim(t.slice(r, t.length)), t = t.slice(0, r)), se.isFunction(e) ? (i = e, e = void 0) : e && "object" == typeof e && (o = "POST"), a.length > 0 && se.ajax({
            url: t,
            type: o,
            dataType: "html",
            data: e
        }).done(function(t) {
            s = arguments, a.html(n ? se("<div>").append(se.parseHTML(t)).find(n) : t)
        }).complete(i && function(t, e) {
            a.each(i, s || [t.responseText, e, t])
        }), this
    }, se.expr.filters.animated = function(t) {
        return se.grep(se.timers, function(e) {
            return t === e.elem
        }).length
    };
    var sn = t.document.documentElement;
    se.offset = {
        setOffset: function(t, e, i) {
            var n, s, o, a, r, l, c, d = se.css(t, "position"),
                u = se(t),
                h = {};
            "static" === d && (t.style.position = "relative"), r = u.offset(), o = se.css(t, "top"), l = se.css(t, "left"), c = ("absolute" === d || "fixed" === d) && se.inArray("auto", [o, l]) > -1, c ? (n = u.position(), a = n.top, s = n.left) : (a = parseFloat(o) || 0, s = parseFloat(l) || 0), se.isFunction(e) && (e = e.call(t, i, r)), null != e.top && (h.top = e.top - r.top + a), null != e.left && (h.left = e.left - r.left + s), "using" in e ? e.using.call(t, h) : u.css(h)
        }
    }, se.fn.extend({
        offset: function(t) {
            if (arguments.length) return void 0 === t ? this : this.each(function(e) {
                se.offset.setOffset(this, t, e)
            });
            var e, i, n = {
                    top: 0,
                    left: 0
                },
                s = this[0],
                o = s && s.ownerDocument;
            if (o) return e = o.documentElement, se.contains(e, s) ? (typeof s.getBoundingClientRect !== ke && (n = s.getBoundingClientRect()), i = Q(o), {
                top: n.top + (i.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                left: n.left + (i.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
            }) : n
        },
        position: function() {
            if (this[0]) {
                var t, e, i = {
                        top: 0,
                        left: 0
                    },
                    n = this[0];
                return "fixed" === se.css(n, "position") ? e = n.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), se.nodeName(t[0], "html") || (i = t.offset()), i.top += se.css(t[0], "borderTopWidth", !0), i.left += se.css(t[0], "borderLeftWidth", !0)), {
                    top: e.top - i.top - se.css(n, "marginTop", !0),
                    left: e.left - i.left - se.css(n, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var t = this.offsetParent || sn; t && !se.nodeName(t, "html") && "static" === se.css(t, "position");) t = t.offsetParent;
                return t || sn
            })
        }
    }), se.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, e) {
        var i = /Y/.test(e);
        se.fn[t] = function(n) {
            return Ee(this, function(t, n, s) {
                var o = Q(t);
                return void 0 === s ? o ? e in o ? o[e] : o.document.documentElement[n] : t[n] : void(o ? o.scrollTo(i ? se(o).scrollLeft() : s, i ? s : se(o).scrollTop()) : t[n] = s)
            }, t, n, arguments.length, null)
        }
    }), se.each(["top", "left"], function(t, e) {
        se.cssHooks[e] = T(ie.pixelPosition, function(t, i) {
            return i ? (i = ei(t, e), ni.test(i) ? se(t).position()[e] + "px" : i) : void 0
        })
    }), se.each({
        Height: "height",
        Width: "width"
    }, function(t, e) {
        se.each({
            padding: "inner" + t,
            content: e,
            "": "outer" + t
        }, function(i, n) {
            se.fn[n] = function(n, s) {
                var o = arguments.length && (i || "boolean" != typeof n),
                    a = i || (n === !0 || s === !0 ? "margin" : "border");
                return Ee(this, function(e, i, n) {
                    var s;
                    return se.isWindow(e) ? e.document.documentElement["client" + t] : 9 === e.nodeType ? (s = e.documentElement, Math.max(e.body["scroll" + t], s["scroll" + t], e.body["offset" + t], s["offset" + t], s["client" + t])) : void 0 === n ? se.css(e, i, a) : se.style(e, i, n, a)
                }, e, o ? n : void 0, o, null)
            }
        })
    }), se.fn.size = function() {
        return this.length
    }, se.fn.andSelf = se.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return se
    });
    var on = t.jQuery,
        an = t.$;
    return se.noConflict = function(e) {
        return t.$ === se && (t.$ = an), e && t.jQuery === se && (t.jQuery = on), se
    }, typeof e === ke && (t.jQuery = t.$ = se), se
}),
function(t, e) {
    t.rails !== e && t.error("jquery-ujs has already been loaded!");
    var i, n = t(document);
    t.rails = i = {
        linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]",
        buttonClickSelector: "button[data-remote], button[data-confirm]",
        inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
        formSubmitSelector: "form",
        formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",
        disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
        enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
        requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
        fileInputSelector: "input[type=file]",
        linkDisableSelector: "a[data-disable-with], a[data-disable]",
        buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",
        CSRFProtection: function(e) {
            var i = t('meta[name="csrf-token"]').attr("content");
            i && e.setRequestHeader("X-CSRF-Token", i)
        },
        refreshCSRFTokens: function() {
            var e = t("meta[name=csrf-token]").attr("content"),
                i = t("meta[name=csrf-param]").attr("content");
            t('form input[name="' + i + '"]').val(e)
        },
        fire: function(e, i, n) {
            var s = t.Event(i);
            return e.trigger(s, n), s.result !== !1
        },
        confirm: function(t) {
            return confirm(t)
        },
        ajax: function(e) {
            return t.ajax(e)
        },
        href: function(t) {
            return t.attr("href")
        },
        handleRemote: function(n) {
            var s, o, a, r, l, c, d, u;
            if (i.fire(n, "ajax:before")) {
                if (r = n.data("cross-domain"), l = r === e ? null : r, c = n.data("with-credentials") || null, d = n.data("type") || t.ajaxSettings && t.ajaxSettings.dataType, n.is("form")) {
                    s = n.attr("method"), o = n.attr("action"), a = n.serializeArray();
                    var h = n.data("ujs:submit-button");
                    h && (a.push(h), n.data("ujs:submit-button", null))
                } else n.is(i.inputChangeSelector) ? (s = n.data("method"), o = n.data("url"), a = n.serialize(), n.data("params") && (a = a + "&" + n.data("params"))) : n.is(i.buttonClickSelector) ? (s = n.data("method") || "get", o = n.data("url"), a = n.serialize(), n.data("params") && (a = a + "&" + n.data("params"))) : (s = n.data("method"), o = i.href(n), a = n.data("params") || null);
                return u = {
                    type: s || "GET",
                    data: a,
                    dataType: d,
                    beforeSend: function(t, s) {
                        return s.dataType === e && t.setRequestHeader("accept", "*/*;q=0.5, " + s.accepts.script), i.fire(n, "ajax:beforeSend", [t, s]) ? void n.trigger("ajax:send", t) : !1
                    },
                    success: function(t, e, i) {
                        n.trigger("ajax:success", [t, e, i])
                    },
                    complete: function(t, e) {
                        n.trigger("ajax:complete", [t, e])
                    },
                    error: function(t, e, i) {
                        n.trigger("ajax:error", [t, e, i])
                    },
                    crossDomain: l
                }, c && (u.xhrFields = {
                    withCredentials: c
                }), o && (u.url = o), i.ajax(u)
            }
            return !1
        },
        handleMethod: function(n) {
            var s = i.href(n),
                o = n.data("method"),
                a = n.attr("target"),
                r = t("meta[name=csrf-token]").attr("content"),
                l = t("meta[name=csrf-param]").attr("content"),
                c = t('<form method="post" action="' + s + '"></form>'),
                d = '<input name="_method" value="' + o + '" type="hidden" />';
            l !== e && r !== e && (d += '<input name="' + l + '" value="' + r + '" type="hidden" />'), a && c.attr("target", a), c.hide().append(d).appendTo("body"), c.submit()
        },
        formElements: function(e, i) {
            return e.is("form") ? t(e[0].elements).filter(i) : e.find(i)
        },
        disableFormElements: function(e) {
            i.formElements(e, i.disableSelector).each(function() {
                i.disableFormElement(t(this))
            })
        },
        disableFormElement: function(t) {
            var i, n;
            i = t.is("button") ? "html" : "val", n = t.data("disable-with"), t.data("ujs:enable-with", t[i]()), n !== e && t[i](n), t.prop("disabled", !0)
        },
        enableFormElements: function(e) {
            i.formElements(e, i.enableSelector).each(function() {
                i.enableFormElement(t(this))
            })
        },
        enableFormElement: function(t) {
            var e = t.is("button") ? "html" : "val";
            t.data("ujs:enable-with") && t[e](t.data("ujs:enable-with")), t.prop("disabled", !1)
        },
        allowAction: function(t) {
            var e, n = t.data("confirm"),
                s = !1;
            return n ? (i.fire(t, "confirm") && (s = i.confirm(n), e = i.fire(t, "confirm:complete", [s])), s && e) : !0
        },
        blankInputs: function(e, i, n) {
            var s, o, a = t(),
                r = i || "input,textarea",
                l = e.find(r);
            return l.each(function() {
                if (s = t(this), o = s.is("input[type=checkbox],input[type=radio]") ? s.is(":checked") : s.val(), !o == !n) {
                    if (s.is("input[type=radio]") && l.filter('input[type=radio]:checked[name="' + s.attr("name") + '"]').length) return !0;
                    a = a.add(s)
                }
            }), a.length ? a : !1
        },
        nonBlankInputs: function(t, e) {
            return i.blankInputs(t, e, !0)
        },
        stopEverything: function(e) {
            return t(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), !1
        },
        disableElement: function(t) {
            var n = t.data("disable-with");
            t.data("ujs:enable-with", t.html()), n !== e && t.html(n), t.bind("click.railsDisable", function(t) {
                return i.stopEverything(t)
            })
        },
        enableElement: function(t) {
            t.data("ujs:enable-with") !== e && (t.html(t.data("ujs:enable-with")), t.removeData("ujs:enable-with")), t.unbind("click.railsDisable")
        }
    }, i.fire(n, "rails:attachBindings") && (t.ajaxPrefilter(function(t, e, n) {
        t.crossDomain || i.CSRFProtection(n)
    }), n.delegate(i.linkDisableSelector, "ajax:complete", function() {
        i.enableElement(t(this))
    }), n.delegate(i.buttonDisableSelector, "ajax:complete", function() {
        i.enableFormElement(t(this))
    }), n.delegate(i.linkClickSelector, "click.rails", function(n) {
        var s = t(this),
            o = s.data("method"),
            a = s.data("params"),
            r = n.metaKey || n.ctrlKey;
        if (!i.allowAction(s)) return i.stopEverything(n);
        if (!r && s.is(i.linkDisableSelector) && i.disableElement(s), s.data("remote") !== e) {
            if (r && (!o || "GET" === o) && !a) return !0;
            var l = i.handleRemote(s);
            return l === !1 ? i.enableElement(s) : l.error(function() {
                i.enableElement(s)
            }), !1
        }
        return s.data("method") ? (i.handleMethod(s), !1) : void 0
    }), n.delegate(i.buttonClickSelector, "click.rails", function(e) {
        var n = t(this);
        if (!i.allowAction(n)) return i.stopEverything(e);
        n.is(i.buttonDisableSelector) && i.disableFormElement(n);
        var s = i.handleRemote(n);
        return s === !1 ? i.enableFormElement(n) : s.error(function() {
            i.enableFormElement(n)
        }), !1
    }), n.delegate(i.inputChangeSelector, "change.rails", function(e) {
        var n = t(this);
        return i.allowAction(n) ? (i.handleRemote(n), !1) : i.stopEverything(e)
    }), n.delegate(i.formSubmitSelector, "submit.rails", function(n) {
        var s, o, a = t(this),
            r = a.data("remote") !== e;
        if (!i.allowAction(a)) return i.stopEverything(n);
        if (a.attr("novalidate") == e && (s = i.blankInputs(a, i.requiredInputSelector), s && i.fire(a, "ajax:aborted:required", [s]))) return i.stopEverything(n);
        if (r) {
            if (o = i.nonBlankInputs(a, i.fileInputSelector)) {
                setTimeout(function() {
                    i.disableFormElements(a)
                }, 13);
                var l = i.fire(a, "ajax:aborted:file", [o]);
                return l || setTimeout(function() {
                    i.enableFormElements(a)
                }, 13), l
            }
            return i.handleRemote(a), !1
        }
        setTimeout(function() {
            i.disableFormElements(a)
        }, 13)
    }), n.delegate(i.formInputClickSelector, "click.rails", function(e) {
        var n = t(this);
        if (!i.allowAction(n)) return i.stopEverything(e);
        var s = n.attr("name"),
            o = s ? {
                name: s,
                value: n.val()
            } : null;
        n.closest("form").data("ujs:submit-button", o)
    }), n.delegate(i.formSubmitSelector, "ajax:send.rails", function(e) {
        this == e.target && i.disableFormElements(t(this))
    }), n.delegate(i.formSubmitSelector, "ajax:complete.rails", function(e) {
        this == e.target && i.enableFormElements(t(this))
    }), t(function() {
        i.refreshCSRFTokens()
    }))
}(jQuery),
function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function(t) {
    "use strict";
    var e = window.Slick || {};
    e = function() {
        function e(e, n) {
            var s, o, a = this;
            if (a.defaults = {
                accessibility: !0,
                arrows: !0,
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(t, e) {
                    return '<button type="button">' + (e + 1) + "</button>"
                },
                dots: !1,
                draggable: !0,
                easing: "linear",
                fade: !1,
                infinite: !0,
                lazyLoad: "ondemand",
                onBeforeChange: null,
                onAfterChange: null,
                onInit: null,
                onReInit: null,
                pauseOnHover: !0,
                responsive: null,
                slide: "div",
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 300,
                swipe: !0,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                vertical: !1
            }, a.initials = {
                animating: !1,
                autoPlayTimer: null,
                currentSlide: 0,
                currentLeft: null,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: !1
            }, t.extend(a, a.initials), a.activeBreakpoint = null, a.animType = null, a.animProp = null, a.breakpoints = [], a.breakpointSettings = [], a.cssTransitions = !1, a.paused = !1, a.positionProp = null, a.$slider = t(e), a.$slidesCache = null, a.transformType = null, a.transitionType = null, a.windowWidth = 0, a.windowTimer = null, a.options = t.extend({}, a.defaults, n), a.originalSettings = a.options, s = a.options.responsive || null, s && s.length > -1) {
                for (o in s) s.hasOwnProperty(o) && (a.breakpoints.push(s[o].breakpoint), a.breakpointSettings[s[o].breakpoint] = s[o].settings);
                a.breakpoints.sort(function(t, e) {
                    return e - t
                })
            }
            a.autoPlay = t.proxy(a.autoPlay, a), a.autoPlayClear = t.proxy(a.autoPlayClear, a), a.changeSlide = t.proxy(a.changeSlide, a), a.setPosition = t.proxy(a.setPosition, a), a.swipeHandler = t.proxy(a.swipeHandler, a), a.dragHandler = t.proxy(a.dragHandler, a), a.keyHandler = t.proxy(a.keyHandler, a), a.autoPlayIterator = t.proxy(a.autoPlayIterator, a), a.instanceUid = i++, a.init()
        }
        var i = 0;
        return e
    }(), e.prototype.addSlide = function(e, i, n) {
        var s = this;
        if ("boolean" == typeof i) n = i, i = null;
        else if (0 > i || i >= s.slideCount) return !1;
        s.unload(), "number" == typeof i ? 0 === i && 0 === s.$slides.length ? t(e).appendTo(s.$slideTrack) : n ? t(e).insertBefore(s.$slides.eq(i)) : t(e).insertAfter(s.$slides.eq(i)) : n === !0 ? t(e).prependTo(s.$slideTrack) : t(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).remove(), s.$slideTrack.append(s.$slides), s.$slidesCache = s.$slides, s.reinit()
    }, e.prototype.animateSlide = function(e, i) {
        var n = {},
            s = this;
        s.transformsEnabled === !1 ? s.options.vertical === !1 ? s.$slideTrack.animate({
            left: e
        }, s.options.speed, s.options.easing, i) : s.$slideTrack.animate({
            top: e
        }, s.options.speed, s.options.easing, i) : s.cssTransitions === !1 ? t({
            animStart: s.currentLeft
        }).animate({
            animStart: e
        }, {
            duration: s.options.speed,
            easing: s.options.easing,
            step: function(t) {
                s.options.vertical === !1 ? (n[s.animType] = "translate(" + t + "px, 0px)", s.$slideTrack.css(n)) : (n[s.animType] = "translate(0px," + t + "px)", s.$slideTrack.css(n))
            },
            complete: function() {
                i && i.call()
            }
        }) : (s.applyTransition(), n[s.animType] = s.options.vertical === !1 ? "translate3d(" + e + "px, 0px, 0px)" : "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(n), i && setTimeout(function() {
            s.disableTransition(), i.call()
        }, s.options.speed))
    }, e.prototype.applyTransition = function(t) {
        var e = this,
            i = {};
        i[e.transitionType] = e.options.fade === !1 ? e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : "opacity " + e.options.speed + "ms " + e.options.cssEase, e.options.fade === !1 ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
    }, e.prototype.autoPlay = function() {
        var t = this;
        t.autoPlayTimer && clearInterval(t.autoPlayTimer), t.slideCount > t.options.slidesToShow && t.paused !== !0 && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
    }, e.prototype.autoPlayClear = function() {
        var t = this;
        t.autoPlayTimer && clearInterval(t.autoPlayTimer)
    }, e.prototype.autoPlayIterator = function() {
        var t = this;
        t.options.infinite === !1 ? 1 === t.direction ? (t.currentSlide + 1 === t.slideCount - 1 && (t.direction = 0), t.slideHandler(t.currentSlide + t.options.slidesToScroll)) : (t.currentSlide - 1 === 0 && (t.direction = 1), t.slideHandler(t.currentSlide - t.options.slidesToScroll)) : t.slideHandler(t.currentSlide + t.options.slidesToScroll)
    }, e.prototype.buildArrows = function() {
        var e = this;
        e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow = t('<button type="button" class="slick-prev">Previous</button>').appendTo(e.$slider), e.$nextArrow = t('<button type="button" class="slick-next">Next</button>').appendTo(e.$slider), e.options.infinite !== !0 && e.$prevArrow.addClass("slick-disabled"))
    }, e.prototype.buildDots = function() {
        var e, i, n = this;
        if (n.options.dots === !0 && n.slideCount > n.options.slidesToShow) {
            for (i = '<ul class="slick-dots">', e = 0; e <= n.getDotCount(); e += 1) i += "<li>" + n.options.customPaging.call(this, n, e) + "</li>";
            i += "</ul>", n.$dots = t(i).appendTo(n.$slider), n.$dots.find("li").first().addClass("slick-active")
        }
    }, e.prototype.buildOut = function() {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slidesCache = e.$slides, e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? t('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), e.options.centerMode === !0 && (e.options.infinite = !0, e.options.slidesToScroll = 1, e.options.slidesToShow % 2 === 0 && (e.options.slidesToShow = 3)), t("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.options.accessibility === !0 && e.$list.prop("tabIndex", 0), e.setSlideClasses("number" == typeof this.currentSlide ? this.currentSlide : 0), e.options.draggable === !0 && e.$list.addClass("draggable")
    }, e.prototype.checkResponsive = function() {
        var e, i, n = this;
        if (n.originalSettings.responsive && n.originalSettings.responsive.length > -1 && null !== n.originalSettings.responsive) {
            i = null;
            for (e in n.breakpoints) n.breakpoints.hasOwnProperty(e) && t(window).width() < n.breakpoints[e] && (i = n.breakpoints[e]);
            null !== i ? null !== n.activeBreakpoint ? i !== n.activeBreakpoint && (n.activeBreakpoint = i, n.options = t.extend({}, n.defaults, n.breakpointSettings[i]), n.refresh()) : (n.activeBreakpoint = i, n.options = t.extend({}, n.defaults, n.breakpointSettings[i]), n.refresh()) : null !== n.activeBreakpoint && (n.activeBreakpoint = null, n.options = t.extend({}, n.defaults, n.originalSettings), n.refresh())
        }
    }, e.prototype.changeSlide = function(e) {
        var i = this;
        switch (e.data.message) {
            case "previous":
                i.slideHandler(i.currentSlide - i.options.slidesToScroll);
                break;
            case "next":
                i.slideHandler(i.currentSlide + i.options.slidesToScroll);
                break;
            case "index":
                i.slideHandler(t(e.target).parent().index() * i.options.slidesToScroll);
                break;
            default:
                return !1
        }
    }, e.prototype.destroy = function() {
        var e = this;
        e.autoPlayClear(), e.touchObject = {}, t(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && (e.$prevArrow.remove(), e.$nextArrow.remove()), e.$slides.unwrap().unwrap(), e.$slides.removeClass("slick-slide slick-active slick-visible").removeAttr("style"), e.$slider.removeClass("slick-slider"), e.$slider.removeClass("slick-initialized"), e.$list.off(".slick"), t(window).off(".slick-" + e.instanceUid)
    }, e.prototype.disableTransition = function(t) {
        var e = this,
            i = {};
        i[e.transitionType] = "", e.options.fade === !1 ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
    }, e.prototype.fadeSlide = function(t, e) {
        var i = this;
        i.cssTransitions === !1 ? (i.$slides.eq(t).css({
            zIndex: 1e3
        }), i.$slides.eq(t).animate({
            opacity: 1
        }, i.options.speed, i.options.easing, e)) : (i.applyTransition(t), i.$slides.eq(t).css({
            opacity: 1,
            zIndex: 1e3
        }), e && setTimeout(function() {
            i.disableTransition(t), e.call()
        }, i.options.speed))
    }, e.prototype.filterSlides = function(t) {
        var e = this;
        null !== t && (e.unload(), e.$slideTrack.children(this.options.slide).remove(), e.$slidesCache.filter(t).appendTo(e.$slideTrack), e.reinit())
    }, e.prototype.getCurrent = function() {
        var t = this;
        return t.currentSlide
    }, e.prototype.getDotCount = function() {
        var t, e = this,
            i = 0,
            n = 0,
            s = 0;
        for (t = e.options.infinite === !0 ? e.slideCount + e.options.slidesToShow - e.options.slidesToScroll : e.slideCount; t > i;) s++, n += e.options.slidesToScroll, i = n + e.options.slidesToShow;
        return s
    }, e.prototype.getLeft = function(t) {
        var e, i, n = this,
            s = 0;
        return n.slideOffset = 0, i = n.$slides.first().outerHeight(), n.options.infinite === !0 ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = i * n.options.slidesToShow * -1), n.slideCount % n.options.slidesToScroll !== 0 && t + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideCount % n.options.slidesToShow * n.slideWidth * -1, s = n.slideCount % n.options.slidesToShow * i * -1)) : n.slideCount % n.options.slidesToShow !== 0 && t + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (n.slideOffset = n.options.slidesToShow * n.slideWidth - n.slideCount % n.options.slidesToShow * n.slideWidth, s = n.slideCount % n.options.slidesToShow * i), n.options.centerMode === !0 && (n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth), e = n.options.vertical === !1 ? t * n.slideWidth * -1 + n.slideOffset : t * i * -1 + s
    }, e.prototype.init = function() {
        var e = this;
        t(e.$slider).hasClass("slick-initialized") || (t(e.$slider).addClass("slick-initialized"), e.buildOut(), e.setProps(), e.startLoad(), e.loadSlider(), e.initializeEvents(), e.checkResponsive()), null !== e.options.onInit && e.options.onInit.call(this, e)
    }, e.prototype.initArrowEvents = function() {
        var t = this;
        t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.on("click.slick", {
            message: "previous"
        }, t.changeSlide), t.$nextArrow.on("click.slick", {
            message: "next"
        }, t.changeSlide))
    }, e.prototype.initDotEvents = function() {
        var e = this;
        e.options.dots === !0 && e.slideCount > e.options.slidesToShow && t("li", e.$dots).on("click.slick", {
            message: "index"
        }, e.changeSlide)
    }, e.prototype.initializeEvents = function() {
        var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, e.swipeHandler), e.options.pauseOnHover === !0 && e.options.autoplay === !0 && (e.$list.on("mouseenter.slick", e.autoPlayClear), e.$list.on("mouseleave.slick", e.autoPlay)), e.options.accessibility === !0 && e.$list.on("keydown.slick", e.keyHandler), t(window).on("orientationchange.slick.slick-" + e.instanceUid, function() {
            e.checkResponsive(), e.setPosition()
        }), t(window).on("resize.slick.slick-" + e.instanceUid, function() {
            t(window).width !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
                e.windowWidth = t(window).width(), e.checkResponsive(), e.setPosition()
            }, 50))
        }), t(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), t(document).on("ready.slick.slick-" + e.instanceUid, e.setPosition)
    }, e.prototype.initUI = function() {
        var t = this;
        t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.show(), t.options.autoplay === !0 && t.autoPlay()
    }, e.prototype.keyHandler = function(t) {
        var e = this;
        37 === t.keyCode ? e.changeSlide({
            data: {
                message: "previous"
            }
        }) : 39 === t.keyCode && e.changeSlide({
            data: {
                message: "next"
            }
        })
    }, e.prototype.lazyLoad = function() {
        var e, i, n, s, o = this;
        o.options.centerMode === !0 || o.options.fade === !0 ? (n = o.options.slidesToShow + o.currentSlide - 1, s = n + o.options.slidesToShow + 2) : (n = o.options.infinite ? o.options.slidesToShow + o.currentSlide : o.currentSlide, s = n + o.options.slidesToShow), e = o.$slider.find(".slick-slide").slice(n, s), t("img[data-lazy]", e).not("[src]").each(function() {
            t(this).css({
                opacity: 0
            }).attr("src", t(this).attr("data-lazy")).removeClass("slick-loading").load(function() {
                t(this).animate({
                    opacity: 1
                }, 200)
            })
        }), o.currentSlide >= o.slideCount - o.options.slidesToShow ? (i = o.$slider.find(".slick-cloned").slice(0, o.options.slidesToShow), t("img[data-lazy]", i).not("[src]").each(function() {
            t(this).css({
                opacity: 0
            }).attr("src", t(this).attr("data-lazy")).removeClass("slick-loading").load(function() {
                t(this).animate({
                    opacity: 1
                }, 200)
            })
        })) : 0 === o.currentSlide && (i = o.$slider.find(".slick-cloned").slice(-1 * o.options.slidesToShow), t("img[data-lazy]", i).not("[src]").each(function() {
            t(this).css({
                opacity: 0
            }).attr("src", t(this).attr("data-lazy")).removeClass("slick-loading").load(function() {
                t(this).animate({
                    opacity: 1
                }, 200)
            })
        }))
    }, e.prototype.loadSlider = function() {
        var t = this;
        t.setPosition(), t.$slideTrack.css({
            opacity: 1
        }), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
    }, e.prototype.postSlide = function(t) {
        var e = this;
        null !== e.options.onAfterChange && e.options.onAfterChange.call(this, e, t), e.animating = !1, e.setPosition(), e.swipeLeft = null, e.options.autoplay === !0 && e.paused === !1 && e.autoPlay()
    }, e.prototype.progressiveLazyLoad = function() {
        var e, i, n = this;
        e = t("img[data-lazy]").not("[src]").length, e > 0 && (i = t(t("img[data-lazy]", n.$slider).not("[src]").get(0)), i.attr("src", i.attr("data-lazy")).removeClass("slick-loading").load(function() {
            n.progressiveLazyLoad()
        }))
    }, e.prototype.refresh = function() {
        var e = this,
            i = e.currentSlide;
        e.destroy(), t.extend(e, e.initials), e.currentSlide = i, e.init()
    }, e.prototype.reinit = function() {
        var t = this;
        t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"), t.slideCount = t.$slides.length, t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll), t.setProps(), t.setupInfinite(), t.buildArrows(), t.updateArrows(), t.initArrowEvents(), t.buildDots(), t.updateDots(), t.initDotEvents(), t.setSlideClasses(0), t.setPosition(), null !== t.options.onReInit && t.options.onReInit.call(this, t)
    }, e.prototype.removeSlide = function(t, e) {
        var i = this;
        return "boolean" == typeof t ? (e = t, t = e === !0 ? 0 : i.slideCount - 1) : t = e === !0 ? --t : t, i.slideCount < 1 || 0 > t || t > i.slideCount - 1 ? !1 : (i.unload(), i.$slideTrack.children(this.options.slide).eq(t).remove(), i.$slides = i.$slideTrack.children(this.options.slide), i.$slideTrack.children(this.options.slide).remove(), i.$slideTrack.append(i.$slides), i.$slidesCache = i.$slides, void i.reinit())
    }, e.prototype.setCSS = function(t) {
        var e, i, n = this,
            s = {};
        e = "left" == n.positionProp ? t + "px" : "0px", i = "top" == n.positionProp ? t + "px" : "0px", s[n.positionProp] = t, n.transformsEnabled === !1 ? n.$slideTrack.css(s) : (s = {}, n.cssTransitions === !1 ? (s[n.animType] = "translate(" + e + ", " + i + ")", n.$slideTrack.css(s)) : (s[n.animType] = "translate3d(" + e + ", " + i + ", 0px)", n.$slideTrack.css(s)))
    }, e.prototype.setDimensions = function() {
        var t = this;
        t.$slideTrack.children(".slick-slide").width(t.options.centerMode === !0 ? t.slideWidth : t.slideWidth), t.options.vertical === !1 ? (t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length)), t.options.centerMode === !0 && t.$list.css({
            padding: "0px " + t.options.centerPadding
        })) : (t.$list.height(t.$slides.first().outerHeight() * t.options.slidesToShow), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight() * t.$slideTrack.children(".slick-slide").length)), t.options.centerMode === !0 && t.$list.css({
            padding: t.options.centerPadding + " 0px"
        }))
    }, e.prototype.setFade = function() {
        var e, i = this;
        i.$slides.each(function(n, s) {
            e = i.slideWidth * n * -1, t(s).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: 800,
                opacity: 0
            })
        }), i.$slides.eq(i.currentSlide).css({
            zIndex: 900,
            opacity: 1
        })
    }, e.prototype.setPosition = function() {
        var t = this;
        t.setValues(), t.setDimensions(), t.options.fade === !1 ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade()
    }, e.prototype.setProps = function() {
        var t = this;
        t.positionProp = t.options.vertical === !0 ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), (void 0 !== document.body.style.WebkitTransition || void 0 !== document.body.style.MozTransition || void 0 !== document.body.style.msTransition) && t.options.useCSS === !0 && (t.cssTransitions = !0), void 0 !== document.body.style.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition"), void 0 !== document.body.style.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition"), void 0 !== document.body.style.msTransform && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = null !== t.animType
    }, e.prototype.setValues = function() {
        var t = this;
        t.listWidth = t.$list.width(), t.listHeight = t.$list.height(), t.slideWidth = Math.ceil(t.options.vertical === !1 ? t.listWidth / t.options.slidesToShow : t.listWidth)
    }, e.prototype.setSlideClasses = function(t) {
        var e, i, n, s = this;
        s.$slider.find(".slick-slide").removeClass("slick-active").removeClass("slick-center"), i = s.$slider.find(".slick-slide"), s.options.centerMode === !0 ? (e = Math.floor(s.options.slidesToShow / 2), t >= e && t <= s.slideCount - 1 - e ? s.$slides.slice(t - e, t + e + 1).addClass("slick-active") : (n = s.options.slidesToShow + t, i.slice(n - e + 1, n + e + 2).addClass("slick-active")), 0 === t ? i.eq(i.length - 1 - s.options.slidesToShow).addClass("slick-center") : t === s.slideCount - 1 && i.eq(s.options.slidesToShow).addClass("slick-center"), s.$slides.eq(t).addClass("slick-center")) : t > 0 && t < s.slideCount - s.options.slidesToShow ? s.$slides.slice(t, t + s.options.slidesToShow).addClass("slick-active") : i.length <= s.options.slidesToShow ? i.addClass("slick-active") : (n = s.options.infinite === !0 ? s.options.slidesToShow + t : t, i.slice(n, n + s.options.slidesToShow).addClass("slick-active")), "ondemand" === s.options.lazyLoad && s.lazyLoad()
    }, e.prototype.setupInfinite = function() {
        var e, i, n, s = this;
        if ((s.options.fade === !0 || s.options.vertical === !0) && (s.options.centerMode = !1), s.options.infinite === !0 && s.options.fade === !1 && (i = null, s.slideCount > s.options.slidesToShow)) {
            for (n = s.options.centerMode === !0 ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - n; e -= 1) i = e - 1, t(s.$slides[i]).clone().attr("id", "").prependTo(s.$slideTrack).addClass("slick-cloned");
            for (e = 0; n > e; e += 1) i = e, t(s.$slides[i]).clone().attr("id", "").appendTo(s.$slideTrack).addClass("slick-cloned");
            s.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                t(this).attr("id", "")
            })
        }
    }, e.prototype.slideHandler = function(t) {
        var e, i, n, s, o = null,
            a = this;
        return a.animating === !0 ? !1 : (e = t, o = a.getLeft(e), n = a.getLeft(a.currentSlide), s = a.slideCount % a.options.slidesToScroll !== 0 ? a.options.slidesToScroll : 0, a.currentLeft = null === a.swipeLeft ? n : a.swipeLeft, a.options.infinite === !1 && (0 > t || t > a.slideCount - a.options.slidesToShow + s) ? (a.options.fade === !1 && (e = a.currentSlide, a.animateSlide(n, function() {
            a.postSlide(e)
        })), !1) : (a.options.autoplay === !0 && clearInterval(a.autoPlayTimer), i = 0 > e ? a.slideCount % a.options.slidesToScroll !== 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount - a.options.slidesToScroll : e > a.slideCount - 1 ? 0 : e, a.animating = !0, null !== a.options.onBeforeChange && t !== a.currentSlide && a.options.onBeforeChange.call(this, a, a.currentSlide, i), a.currentSlide = i, a.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows(), a.options.fade === !0 ? (a.fadeSlide(i, function() {
            a.postSlide(i)
        }), !1) : void a.animateSlide(o, function() {
            a.postSlide(i)
        })))
    }, e.prototype.startLoad = function() {
        var t = this;
        t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.hide(), t.$slider.addClass("slick-loading")
    }, e.prototype.swipeDirection = function() {
        var t, e, i, n, s = this;
        return t = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, i = Math.atan2(e, t), n = Math.round(180 * i / Math.PI), 0 > n && (n = 360 - Math.abs(n)), 45 >= n && n >= 0 ? "left" : 360 >= n && n >= 315 ? "left" : n >= 135 && 225 >= n ? "right" : "vertical"
    }, e.prototype.swipeEnd = function(e) {
        var i = this;
        if (i.$list.removeClass("dragging"), void 0 === i.touchObject.curX) return !1;
        if (i.touchObject.swipeLength >= i.touchObject.minSwipe) switch (t(e.target).on("click.slick", function(e) {
            e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault(), t(e.target).off("click.slick")
        }), i.swipeDirection()) {
            case "left":
                i.slideHandler(i.currentSlide + i.options.slidesToScroll), i.touchObject = {};
                break;
            case "right":
                i.slideHandler(i.currentSlide - i.options.slidesToScroll), i.touchObject = {}
        } else i.touchObject.startX !== i.touchObject.curX && (i.slideHandler(i.currentSlide), i.touchObject = {})
    }, e.prototype.swipeHandler = function(t) {
        var e = this;
        if (e.options.swipe === !1 || "ontouchend" in document && e.options.swipe === !1) return void 0;
        if (e.options.draggable === !1 || e.options.draggable === !1 && !t.originalEvent.touches) return void 0;
        switch (e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, t.data.action) {
            case "start":
                e.swipeStart(t);
                break;
            case "move":
                e.swipeMove(t);
                break;
            case "end":
                e.swipeEnd(t)
        }
    }, e.prototype.swipeMove = function(t) {
        var e, i, n, s, o = this;
        return s = void 0 !== t.originalEvent ? t.originalEvent.touches : null, e = o.getLeft(o.currentSlide), !o.$list.hasClass("dragging") || s && 1 !== s.length ? !1 : (o.touchObject.curX = void 0 !== s ? s[0].pageX : t.clientX, o.touchObject.curY = void 0 !== s ? s[0].pageY : t.clientY, o.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(o.touchObject.curX - o.touchObject.startX, 2))), i = o.swipeDirection(), "vertical" !== i ? (void 0 !== t.originalEvent && o.touchObject.swipeLength > 4 && t.preventDefault(), n = o.touchObject.curX > o.touchObject.startX ? 1 : -1, o.swipeLeft = o.options.vertical === !1 ? e + o.touchObject.swipeLength * n : e + o.touchObject.swipeLength * (o.$list.height() / o.listWidth) * n, o.options.fade === !0 || o.options.touchMove === !1 ? !1 : o.animating === !0 ? (o.swipeLeft = null, !1) : void o.setCSS(o.swipeLeft)) : void 0)
    }, e.prototype.swipeStart = function(t) {
        var e, i = this;
        return 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow ? (i.touchObject = {}, !1) : (void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== e ? e.pageX : t.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== e ? e.pageY : t.clientY, void i.$list.addClass("dragging"))
    }, e.prototype.unfilterSlides = function() {
        var t = this;
        null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).remove(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit())
    }, e.prototype.unload = function() {
        var e = this;
        t(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && (e.$prevArrow.remove(), e.$nextArrow.remove()), e.$slides.removeClass("slick-slide slick-active slick-visible").removeAttr("style")
    }, e.prototype.updateArrows = function() {
        var t = this;
        t.options.arrows === !0 && t.options.infinite !== !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.removeClass("slick-disabled"), t.$nextArrow.removeClass("slick-disabled"), 0 === t.currentSlide ? (t.$prevArrow.addClass("slick-disabled"), t.$nextArrow.removeClass("slick-disabled")) : t.currentSlide >= t.slideCount - t.options.slidesToShow && (t.$nextArrow.addClass("slick-disabled"), t.$prevArrow.removeClass("slick-disabled")))
    }, e.prototype.updateDots = function() {
        var t = this;
        null !== t.$dots && (t.$dots.find("li").removeClass("slick-active"), t.$dots.find("li").eq(t.currentSlide / t.options.slidesToScroll).addClass("slick-active"))
    }, t.fn.slick = function(t) {
        var i = this;
        return i.each(function(i, n) {
            n.slick = new e(n, t)
        })
    }, t.fn.slickAdd = function(t, e, i) {
        var n = this;
        return n.each(function(n, s) {
            s.slick.addSlide(t, e, i)
        })
    }, t.fn.slickCurrentSlide = function() {
        var t = this;
        return t.get(0).slick.getCurrent()
    }, t.fn.slickFilter = function(t) {
        var e = this;
        return e.each(function(e, i) {
            i.slick.filterSlides(t)
        })
    }, t.fn.slickGoTo = function(t) {
        var e = this;
        return e.each(function(e, i) {
            i.slick.slideHandler(t)
        })
    }, t.fn.slickNext = function() {
        var t = this;
        return t.each(function(t, e) {
            e.slick.changeSlide({
                data: {
                    message: "next"
                }
            })
        })
    }, t.fn.slickPause = function() {
        var t = this;
        return t.each(function(t, e) {
            e.slick.autoPlayClear(), e.slick.paused = !0
        })
    }, t.fn.slickPlay = function() {
        var t = this;
        return t.each(function(t, e) {
            e.slick.paused = !1, e.slick.autoPlay()
        })
    }, t.fn.slickPrev = function() {
        var t = this;
        return t.each(function(t, e) {
            e.slick.changeSlide({
                data: {
                    message: "previous"
                }
            })
        })
    }, t.fn.slickRemove = function(t, e) {
        var i = this;
        return i.each(function(i, n) {
            n.slick.removeSlide(t, e)
        })
    }, t.fn.slickSetOption = function(t, e, i) {
        var n = this;
        return n.each(function(n, s) {
            s.slick.options[t] = e, i === !0 && (s.slick.unload(), s.slick.reinit())
        })
    }, t.fn.slickUnfilter = function() {
        var t = this;
        return t.each(function(t, e) {
            e.slick.unfilterSlides()
        })
    }, t.fn.unslick = function() {
        var t = this;
        return t.each(function(t, e) {
            e.slick.destroy()
        })
    }
}),
function(t, e, i, n) {
    "use strict";

    function s(t) {
        return ("string" == typeof t || t instanceof String) && (t = t.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g, "")), t
    }
    var o = function(e) {
        for (var i = e.length, n = t("head"); i--;) 0 === n.has("." + e[i]).length && n.append('<meta class="' + e[i] + '" />')
    };
    o(["foundation-mq-small", "foundation-mq-medium", "foundation-mq-large", "foundation-mq-xlarge", "foundation-mq-xxlarge", "foundation-data-attribute-namespace"]), t(function() {
        "undefined" != typeof FastClick && "undefined" != typeof i.body && FastClick.attach(i.body)
    });
    var a = function(e, n) {
            if ("string" == typeof e) {
                if (n) {
                    var s;
                    if (n.jquery) {
                        if (s = n[0], !s) return n
                    } else s = n;
                    return t(s.querySelectorAll(e))
                }
                return t(i.querySelectorAll(e))
            }
            return t(e, n)
        },
        r = function(t) {
            var e = [];
            return t || e.push("data"), this.namespace.length > 0 && e.push(this.namespace), e.push(this.name), e.join("-")
        },
        l = function(t) {
            for (var e = t.split("-"), i = e.length, n = []; i--;) 0 !== i ? n.push(e[i]) : this.namespace.length > 0 ? n.push(this.namespace, e[i]) : n.push(e[i]);
            return n.reverse().join("-")
        },
        c = function(e, i) {
            var n = this,
                s = !a(this).data(this.attr_name(!0));
            return a(this.scope).is("[" + this.attr_name() + "]") ? (a(this.scope).data(this.attr_name(!0) + "-init", t.extend({}, this.settings, i || e, this.data_options(a(this.scope)))), s && this.events(this.scope)) : a("[" + this.attr_name() + "]", this.scope).each(function() {
                var s = !a(this).data(n.attr_name(!0) + "-init");
                a(this).data(n.attr_name(!0) + "-init", t.extend({}, n.settings, i || e, n.data_options(a(this)))), s && n.events(this)
            }), "string" == typeof e ? this[e].call(this, i) : void 0
        },
        d = function(t, e) {
            function i() {
                e(t[0])
            }

            function n() {
                if (this.one("load", i), /MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
                    var t = this.attr("src"),
                        e = t.match(/\?/) ? "&" : "?";
                    e += "random=" + (new Date).getTime(), this.attr("src", t + e)
                }
            }
            return t.attr("src") ? void(t[0].complete || 4 === t[0].readyState ? i() : n.call(t)) : void i()
        };
    e.matchMedia = e.matchMedia || function(t) {
            var e, i = t.documentElement,
                n = i.firstElementChild || i.firstChild,
                s = t.createElement("body"),
                o = t.createElement("div");
            return o.id = "mq-test-1", o.style.cssText = "position:absolute;top:-100em", s.style.background = "none", s.appendChild(o),
                function(t) {
                    return o.innerHTML = '&shy;<style media="' + t + '"> #mq-test-1 { width: 42px; }</style>', i.insertBefore(s, n), e = 42 === o.offsetWidth, i.removeChild(s), {
                        matches: e,
                        media: t
                    }
                }
        }(i),
        function() {
            function t() {
                i && (o(t), r && jQuery.fx.tick())
            }
            for (var i, n = 0, s = ["webkit", "moz"], o = e.requestAnimationFrame, a = e.cancelAnimationFrame, r = "undefined" != typeof jQuery.fx; n < s.length && !o; n++) o = e[s[n] + "RequestAnimationFrame"], a = a || e[s[n] + "CancelAnimationFrame"] || e[s[n] + "CancelRequestAnimationFrame"];
            o ? (e.requestAnimationFrame = o, e.cancelAnimationFrame = a, r && (jQuery.fx.timer = function(e) {
                e() && jQuery.timers.push(e) && !i && (i = !0, t())
            }, jQuery.fx.stop = function() {
                i = !1
            })) : (e.requestAnimationFrame = function(t) {
                var i = (new Date).getTime(),
                    s = Math.max(0, 16 - (i - n)),
                    o = e.setTimeout(function() {
                        t(i + s)
                    }, s);
                return n = i + s, o
            }, e.cancelAnimationFrame = function(t) {
                clearTimeout(t)
            })
        }(jQuery), e.Foundation = {
            name: "Foundation",
            version: "5.3.1",
            media_queries: {
                small: a(".foundation-mq-small").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
                medium: a(".foundation-mq-medium").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
                large: a(".foundation-mq-large").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
                xlarge: a(".foundation-mq-xlarge").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
                xxlarge: a(".foundation-mq-xxlarge").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, "")
            },
            stylesheet: t("<style></style>").appendTo("head")[0].sheet,
            global: {
                namespace: n
            },
            init: function(t, e, i, n, s) {
                var o = [t, i, n, s],
                    r = [];
                if (this.rtl = /rtl/i.test(a("html").attr("dir")), this.scope = t || this.scope, this.set_namespace(), e && "string" == typeof e && !/reflow/i.test(e)) this.libs.hasOwnProperty(e) && r.push(this.init_lib(e, o));
                else
                    for (var l in this.libs) r.push(this.init_lib(l, e));
                return t
            },
            init_lib: function(e, i) {
                return this.libs.hasOwnProperty(e) ? (this.patch(this.libs[e]), i && i.hasOwnProperty(e) ? ("undefined" != typeof this.libs[e].settings ? t.extend(!0, this.libs[e].settings, i[e]) : "undefined" != typeof this.libs[e].defaults && t.extend(!0, this.libs[e].defaults, i[e]), this.libs[e].init.apply(this.libs[e], [this.scope, i[e]])) : (i = i instanceof Array ? i : new Array(i), this.libs[e].init.apply(this.libs[e], i))) : function() {}
            },
            patch: function(t) {
                t.scope = this.scope, t.namespace = this.global.namespace, t.rtl = this.rtl, t.data_options = this.utils.data_options, t.attr_name = r, t.add_namespace = l, t.bindings = c, t.S = this.utils.S
            },
            inherit: function(t, e) {
                for (var i = e.split(" "), n = i.length; n--;) this.utils.hasOwnProperty(i[n]) && (t[i[n]] = this.utils[i[n]])
            },
            set_namespace: function() {
                var e = this.global.namespace === n ? t(".foundation-data-attribute-namespace").css("font-family") : this.global.namespace;
                this.global.namespace = e === n || /false/i.test(e) ? "" : e
            },
            libs: {},
            utils: {
                S: a,
                throttle: function(t, e) {
                    var i = null;
                    return function() {
                        var n = this,
                            s = arguments;
                        null == i && (i = setTimeout(function() {
                            t.apply(n, s), i = null
                        }, e))
                    }
                },
                debounce: function(t, e, i) {
                    var n, s;
                    return function() {
                        var o = this,
                            a = arguments,
                            r = function() {
                                n = null, i || (s = t.apply(o, a))
                            },
                            l = i && !n;
                        return clearTimeout(n), n = setTimeout(r, e), l && (s = t.apply(o, a)), s
                    }
                },
                data_options: function(e, i) {
                    function n(t) {
                        return !isNaN(t - 0) && null !== t && "" !== t && t !== !1 && t !== !0
                    }

                    function s(e) {
                        return "string" == typeof e ? t.trim(e) : e
                    }
                    i = i || "options";
                    var o, a, r, l = {},
                        c = function(t) {
                            var e = Foundation.global.namespace;
                            return t.data(e.length > 0 ? e + "-" + i : i)
                        },
                        d = c(e);
                    if ("object" == typeof d) return d;
                    for (r = (d || ":").split(";"), o = r.length; o--;) a = r[o].split(":"), a = [a[0], a.slice(1).join(":")], /true/i.test(a[1]) && (a[1] = !0), /false/i.test(a[1]) && (a[1] = !1), n(a[1]) && (a[1] = -1 === a[1].indexOf(".") ? parseInt(a[1], 10) : parseFloat(a[1])), 2 === a.length && a[0].length > 0 && (l[s(a[0])] = s(a[1]));
                    return l
                },
                register_media: function(e, i) {
                    Foundation.media_queries[e] === n && (t("head").append('<meta class="' + i + '"/>'), Foundation.media_queries[e] = s(t("." + i).css("font-family")))
                },
                add_custom_rule: function(t, e) {
                    if (e === n && Foundation.stylesheet) Foundation.stylesheet.insertRule(t, Foundation.stylesheet.cssRules.length);
                    else {
                        var i = Foundation.media_queries[e];
                        i !== n && Foundation.stylesheet.insertRule("@media " + Foundation.media_queries[e] + "{ " + t + " }")
                    }
                },
                image_loaded: function(t, e) {
                    var i = this,
                        n = t.length;
                    0 === n && e(t), t.each(function() {
                        d(i.S(this), function() {
                            n -= 1, 0 === n && e(t)
                        })
                    })
                },
                random_str: function() {
                    return this.fidx || (this.fidx = 0), this.prefix = this.prefix || [this.name || "F", (+new Date).toString(36)].join("-"), this.prefix + (this.fidx++).toString(36)
                }
            }
        }, t.fn.foundation = function() {
            var t = Array.prototype.slice.call(arguments, 0);
            return this.each(function() {
                return Foundation.init.apply(Foundation, [this].concat(t)), this
            })
        }
}(jQuery, window, window.document),
function(t, e, i) {
    "use strict";
    Foundation.libs.abide = {
        name: "abide",
        version: "5.3.1",
        settings: {
            live_validate: !0,
            focus_on_invalid: !0,
            error_labels: !0,
            timeout: 1e3,
            patterns: {
                alpha: /^[a-zA-Z]+$/,
                alpha_numeric: /^[a-zA-Z0-9]+$/,
                integer: /^[-+]?\d+$/,
                number: /^[-+]?\d*(?:[\.\,]\d+)?$/,
                card: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
                cvv: /^([0-9]){3,4}$/,
                email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                url: /^(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,
                domain: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/,
                datetime: /^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,
                date: /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,
                time: /^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,
                dateISO: /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,
                month_day_year: /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,
                color: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
            },
            validators: {
                equalTo: function(t) {
                    var e = i.getElementById(t.getAttribute(this.add_namespace("data-equalto"))).value,
                        n = t.value,
                        s = e === n;
                    return s
                }
            }
        },
        timer: null,
        init: function(t, e, i) {
            this.bindings(e, i)
        },
        events: function(e) {
            var i = this,
                n = i.S(e).attr("novalidate", "novalidate"),
                s = n.data(this.attr_name(!0) + "-init") || {};
            this.invalid_attr = this.add_namespace("data-invalid"), n.off(".abide").on("submit.fndtn.abide validate.fndtn.abide", function(t) {
                var e = /ajax/i.test(i.S(this).attr(i.attr_name()));
                return i.validate(i.S(this).find("input, textarea, select").get(), t, e)
            }).on("reset", function() {
                return i.reset(t(this))
            }).find("input, textarea, select").off(".abide").on("blur.fndtn.abide change.fndtn.abide", function(t) {
                i.validate([this], t)
            }).on("keydown.fndtn.abide", function(t) {
                s.live_validate === !0 && (clearTimeout(i.timer), i.timer = setTimeout(function() {
                    i.validate([this], t)
                }.bind(this), s.timeout))
            })
        },
        reset: function(e) {
            e.removeAttr(this.invalid_attr), t(this.invalid_attr, e).removeAttr(this.invalid_attr), t(".error", e).not("small").removeClass("error")
        },
        validate: function(t, e, i) {
            var n = this.parse_patterns(t),
                s = n.length,
                o = this.S(t[0]).closest("[data-" + this.attr_name(!0) + "]"),
                a = o.data(this.attr_name(!0) + "-init") || {},
                r = /submit/.test(e.type);
            o.trigger("validated").trigger("validated.fndtn.abide");
            for (var l = 0; s > l; l++)
                if (!n[l] && (r || i)) return a.focus_on_invalid && t[l].focus(), o.trigger("invalid").trigger("invalid.fndtn.abide"), this.S(t[l]).closest("[data-" + this.attr_name(!0) + "]").attr(this.invalid_attr, ""), !1;
            return (r || i) && o.trigger("valid").trigger("valid.fndtn.abide"), o.removeAttr(this.invalid_attr), i ? !1 : !0
        },
        parse_patterns: function(t) {
            for (var e = t.length, i = []; e--;) i.push(this.pattern(t[e]));
            return this.check_validation_and_apply_styles(i)
        },
        pattern: function(t) {
            var e = t.getAttribute("type"),
                i = "string" == typeof t.getAttribute("required"),
                n = t.getAttribute("pattern") || "";
            return this.settings.patterns.hasOwnProperty(n) && n.length > 0 ? [t, this.settings.patterns[n], i] : n.length > 0 ? [t, new RegExp("^" + n + "$"), i] : this.settings.patterns.hasOwnProperty(e) ? [t, this.settings.patterns[e], i] : (n = /.*/, [t, n, i])
        },
        check_validation_and_apply_styles: function(e) {
            for (var i = e.length, n = [], s = this.S(e[0][0]).closest("[data-" + this.attr_name(!0) + "]"), o = s.data(this.attr_name(!0) + "-init") || {}; i--;) {
                var a, r, l = e[i][0],
                    c = e[i][2],
                    d = l.value.trim(),
                    u = this.S(l).parent(),
                    h = l.getAttribute(this.add_namespace("data-abide-validator")),
                    p = "radio" === l.type,
                    f = "checkbox" === l.type,
                    g = this.S('label[for="' + l.getAttribute("id") + '"]'),
                    m = c ? l.value.length > 0 : !0;
                l.getAttribute(this.add_namespace("data-equalto")) && (h = "equalTo"), a = u.is("label") ? u.parent() : u, p && c ? n.push(this.valid_radio(l, c)) : f && c ? n.push(this.valid_checkbox(l, c)) : h ? (r = this.settings.validators[h].apply(this, [l, c, a]), n.push(r), r ? (this.S(l).removeAttr(this.invalid_attr), a.removeClass("error")) : (this.S(l).attr(this.invalid_attr, ""), a.addClass("error"))) : e[i][1].test(d) && m || !c && l.value.length < 1 || t(l).attr("disabled") ? (this.S(l).removeAttr(this.invalid_attr), a.removeClass("error"), g.length > 0 && o.error_labels && g.removeClass("error"), n.push(!0), t(l).triggerHandler("valid")) : (this.S(l).attr(this.invalid_attr, ""), a.addClass("error"), g.length > 0 && o.error_labels && g.addClass("error"), n.push(!1), t(l).triggerHandler("invalid"))
            }
            return n
        },
        valid_checkbox: function(t, e) {
            var t = this.S(t),
                i = t.is(":checked") || !e;
            return i ? t.removeAttr(this.invalid_attr).parent().removeClass("error") : t.attr(this.invalid_attr, "").parent().addClass("error"), i
        },
        valid_radio: function(t) {
            for (var e = t.getAttribute("name"), i = this.S(t).closest("[data-" + this.attr_name(!0) + "]").find("[name='" + e + "']"), n = i.length, s = !1, o = 0; n > o; o++) i[o].checked && (s = !0);
            for (var o = 0; n > o; o++) s ? this.S(i[o]).removeAttr(this.invalid_attr).parent().removeClass("error") : this.S(i[o]).attr(this.invalid_attr, "").parent().addClass("error");
            return s
        },
        valid_equal: function(t, e, n) {
            var s = i.getElementById(t.getAttribute(this.add_namespace("data-equalto"))).value,
                o = t.value,
                a = s === o;
            return a ? (this.S(t).removeAttr(this.invalid_attr), n.removeClass("error")) : (this.S(t).attr(this.invalid_attr, ""), n.addClass("error")), a
        },
        valid_oneof: function(t, e, i, n) {
            var t = this.S(t),
                s = this.S("[" + this.add_namespace("data-oneof") + "]"),
                o = s.filter(":checked").length > 0;
            if (o ? t.removeAttr(this.invalid_attr).parent().removeClass("error") : t.attr(this.invalid_attr, "").parent().addClass("error"), !n) {
                var a = this;
                s.each(function() {
                    a.valid_oneof.call(a, this, null, null, !0)
                })
            }
            return o
        }
    }
}(jQuery, window, window.document),
function(t) {
    "use strict";
    Foundation.libs.accordion = {
        name: "accordion",
        version: "5.3.1",
        settings: {
            active_class: "active",
            multi_expand: !1,
            toggleable: !0,
            callback: function() {}
        },
        init: function(t, e, i) {
            this.bindings(e, i)
        },
        events: function() {
            var e = this,
                i = this.S;
            i(this.scope).off(".fndtn.accordion").on("click.fndtn.accordion", "[" + this.attr_name() + "] > dd > a", function(n) {
                var s = i(this).closest("[" + e.attr_name() + "]"),
                    o = i("#" + this.href.split("#")[1]),
                    a = i("dd > .content", s),
                    r = t(">dd", s),
                    l = e.attr_name() + "=" + s.attr(e.attr_name()),
                    c = s.data(e.attr_name(!0) + "-init"),
                    d = i("dd > .content." + c.active_class, s);
                return n.preventDefault(), s.attr(e.attr_name()) && (a = a.add("[" + l + "] dd > .content"), r = r.add("[" + l + "] dd")), c.toggleable && o.is(d) ? (o.parent("dd").toggleClass(c.active_class, !1), o.toggleClass(c.active_class, !1), c.callback(o), o.triggerHandler("toggled", [s]), void s.triggerHandler("toggled", [o])) : (c.multi_expand || (a.removeClass(c.active_class), r.removeClass(c.active_class)), o.addClass(c.active_class).parent().addClass(c.active_class), c.callback(o), o.triggerHandler("toggled", [s]), void s.triggerHandler("toggled", [o]))
            })
        },
        off: function() {},
        reflow: function() {}
    }
}(jQuery, window, window.document),
function(t) {
    "use strict";
    Foundation.libs.alert = {
        name: "alert",
        version: "5.3.1",
        settings: {
            callback: function() {}
        },
        init: function(t, e, i) {
            this.bindings(e, i)
        },
        events: function() {
            var e = this,
                i = this.S;
            t(this.scope).off(".alert").on("click.fndtn.alert", "[" + this.attr_name() + "] a.close", function(t) {
                var n = i(this).closest("[" + e.attr_name() + "]"),
                    s = n.data(e.attr_name(!0) + "-init") || e.settings;
                t.preventDefault(), Modernizr.csstransitions ? (n.addClass("alert-close"), n.on("transitionend webkitTransitionEnd oTransitionEnd", function() {
                    i(this).trigger("close").trigger("close.fndtn.alert").remove(), s.callback()
                })) : n.fadeOut(300, function() {
                    i(this).trigger("close").trigger("close.fndtn.alert").remove(), s.callback()
                })
            })
        },
        reflow: function() {}
    }
}(jQuery, window, window.document),
function(t, e, i, n) {
    "use strict";
    Foundation.libs.clearing = {
        name: "clearing",
        version: "5.3.1",
        settings: {
            templates: {
                viewing: '<a href="#" class="clearing-close">&times;</a><div class="visible-img" style="display: none"><div class="clearing-touch-label"></div><img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" /><p class="clearing-caption"></p><a href="#" class="clearing-main-prev"><span></span></a><a href="#" class="clearing-main-next"><span></span></a></div>'
            },
            close_selectors: ".clearing-close, div.clearing-blackout",
            open_selectors: "",
            touch_label: "",
            init: !1,
            locked: !1
        },
        init: function(t, e, i) {
            var n = this;
            Foundation.inherit(this, "throttle image_loaded"), this.bindings(e, i), n.S(this.scope).is("[" + this.attr_name() + "]") ? this.assemble(n.S("li", this.scope)) : n.S("[" + this.attr_name() + "]", this.scope).each(function() {
                n.assemble(n.S("li", this))
            })
        },
        events: function(n) {
            var s = this,
                o = s.S,
                a = t(".scroll-container");
            a.length > 0 && (this.scope = a), o(this.scope).off(".clearing").on("click.fndtn.clearing", "ul[" + this.attr_name() + "] li " + this.settings.open_selectors, function(t, e, i) {
                var e = e || o(this),
                    i = i || e,
                    n = e.next("li"),
                    a = e.closest("[" + s.attr_name() + "]").data(s.attr_name(!0) + "-init"),
                    r = o(t.target);
                t.preventDefault(), a || (s.init(), a = e.closest("[" + s.attr_name() + "]").data(s.attr_name(!0) + "-init")), i.hasClass("visible") && e[0] === i[0] && n.length > 0 && s.is_open(e) && (i = n, r = o("img", i)), s.open(r, e, i), s.update_paddles(i)
            }).on("click.fndtn.clearing", ".clearing-main-next", function(t) {
                s.nav(t, "next")
            }).on("click.fndtn.clearing", ".clearing-main-prev", function(t) {
                s.nav(t, "prev")
            }).on("click.fndtn.clearing", this.settings.close_selectors, function(t) {
                Foundation.libs.clearing.close(t, this)
            }), t(i).on("keydown.fndtn.clearing", function(t) {
                s.keydown(t)
            }), o(e).off(".clearing").on("resize.fndtn.clearing", function() {
                s.resize()
            }), this.swipe_events(n)
        },
        swipe_events: function() {
            var t = this,
                e = t.S;
            e(this.scope).on("touchstart.fndtn.clearing", ".visible-img", function(t) {
                t.touches || (t = t.originalEvent);
                var i = {
                    start_page_x: t.touches[0].pageX,
                    start_page_y: t.touches[0].pageY,
                    start_time: (new Date).getTime(),
                    delta_x: 0,
                    is_scrolling: n
                };
                e(this).data("swipe-transition", i), t.stopPropagation()
            }).on("touchmove.fndtn.clearing", ".visible-img", function(i) {
                if (i.touches || (i = i.originalEvent), !(i.touches.length > 1 || i.scale && 1 !== i.scale)) {
                    var n = e(this).data("swipe-transition");
                    if ("undefined" == typeof n && (n = {}), n.delta_x = i.touches[0].pageX - n.start_page_x, Foundation.rtl && (n.delta_x = -n.delta_x), "undefined" == typeof n.is_scrolling && (n.is_scrolling = !!(n.is_scrolling || Math.abs(n.delta_x) < Math.abs(i.touches[0].pageY - n.start_page_y))), !n.is_scrolling && !n.active) {
                        i.preventDefault();
                        var s = n.delta_x < 0 ? "next" : "prev";
                        n.active = !0, t.nav(i, s)
                    }
                }
            }).on("touchend.fndtn.clearing", ".visible-img", function(t) {
                e(this).data("swipe-transition", {}), t.stopPropagation()
            })
        },
        assemble: function(e) {
            var i = e.parent();
            if (!i.parent().hasClass("carousel")) {
                i.after('<div id="foundationClearingHolder"></div>');
                var n = i.detach(),
                    s = "";
                if (null != n[0]) {
                    s = n[0].outerHTML;
                    var o = this.S("#foundationClearingHolder"),
                        a = i.data(this.attr_name(!0) + "-init"),
                        r = {
                            grid: '<div class="carousel">' + s + "</div>",
                            viewing: a.templates.viewing
                        },
                        l = '<div class="clearing-assembled"><div>' + r.viewing + r.grid + "</div></div>",
                        c = this.settings.touch_label;
                    Modernizr.touch && (l = t(l).find(".clearing-touch-label").html(c).end()), o.after(l).remove()
                }
            }
        },
        open: function(e, n, s) {
            function o() {
                setTimeout(function() {
                    this.image_loaded(h, function() {
                        1 !== h.outerWidth() || f ? a.call(this, h) : o.call(this)
                    }.bind(this))
                }.bind(this), 100)
            }

            function a(e) {
                var i = t(e);
                i.css("visibility", "visible"), l.css("overflow", "hidden"), c.addClass("clearing-blackout"), d.addClass("clearing-container"), u.show(), this.fix_height(s).caption(r.S(".clearing-caption", u), r.S("img", s)).center_and_label(e, p).shift(n, s, function() {
                    s.closest("li").siblings().removeClass("visible"), s.closest("li").addClass("visible")
                }), u.trigger("opened.fndtn.clearing")
            }
            var r = this,
                l = t(i.body),
                c = s.closest(".clearing-assembled"),
                d = r.S("div", c).first(),
                u = r.S(".visible-img", d),
                h = r.S("img", u).not(e),
                p = r.S(".clearing-touch-label", d),
                f = !1;
            t("body").on("touchmove", function(t) {
                t.preventDefault()
            }), h.error(function() {
                f = !0
            }), this.locked() || (u.trigger("open.fndtn.clearing"), h.attr("src", this.load(e)).css("visibility", "hidden"), o.call(this))
        },
        close: function(e, n) {
            e.preventDefault();
            var s, o, a = function(t) {
                    return /blackout/.test(t.selector) ? t : t.closest(".clearing-blackout")
                }(t(n)),
                r = t(i.body);
            return n === e.target && a && (r.css("overflow", ""), s = t("div", a).first(), o = t(".visible-img", s), o.trigger("close.fndtn.clearing"), this.settings.prev_index = 0, t("ul[" + this.attr_name() + "]", a).attr("style", "").closest(".clearing-blackout").removeClass("clearing-blackout"), s.removeClass("clearing-container"), o.hide(), o.trigger("closed.fndtn.clearing")), t("body").off("touchmove"), !1
        },
        is_open: function(t) {
            return t.parent().prop("style").length > 0
        },
        keydown: function(e) {
            var i = t(".clearing-blackout ul[" + this.attr_name() + "]"),
                n = this.rtl ? 37 : 39,
                s = this.rtl ? 39 : 37,
                o = 27;
            e.which === n && this.go(i, "next"), e.which === s && this.go(i, "prev"), e.which === o && this.S("a.clearing-close").trigger("click").trigger("click.fndtn.clearing")
        },
        nav: function(e, i) {
            var n = t("ul[" + this.attr_name() + "]", ".clearing-blackout");
            e.preventDefault(), this.go(n, i)
        },
        resize: function() {
            var e = t("img", ".clearing-blackout .visible-img"),
                i = t(".clearing-touch-label", ".clearing-blackout");
            e.length && (this.center_and_label(e, i), e.trigger("resized.fndtn.clearing"))
        },
        fix_height: function(t) {
            var e = t.parent().children(),
                i = this;
            return e.each(function() {
                var t = i.S(this),
                    e = t.find("img");
                t.height() > e.outerHeight() && t.addClass("fix-height")
            }).closest("ul").width(100 * e.length + "%"), this
        },
        update_paddles: function(t) {
            t = t.closest("li");
            var e = t.closest(".carousel").siblings(".visible-img");
            t.next().length > 0 ? this.S(".clearing-main-next", e).removeClass("disabled") : this.S(".clearing-main-next", e).addClass("disabled"), t.prev().length > 0 ? this.S(".clearing-main-prev", e).removeClass("disabled") : this.S(".clearing-main-prev", e).addClass("disabled")
        },
        center_and_label: function(t, e) {
            return this.rtl ? (t.css({
                marginRight: -(t.outerWidth() / 2),
                marginTop: -(t.outerHeight() / 2),
                left: "auto",
                right: "50%"
            }), e.length > 0 && e.css({
                marginRight: -(e.outerWidth() / 2),
                marginTop: -(t.outerHeight() / 2) - e.outerHeight() - 10,
                left: "auto",
                right: "50%"
            })) : (t.css({
                marginLeft: -(t.outerWidth() / 2),
                marginTop: -(t.outerHeight() / 2)
            }), e.length > 0 && e.css({
                marginLeft: -(e.outerWidth() / 2),
                marginTop: -(t.outerHeight() / 2) - e.outerHeight() - 10
            })), this
        },
        load: function(t) {
            var e;
            return e = "A" === t[0].nodeName ? t.attr("href") : t.parent().attr("href"), this.preload(t), e ? e : t.attr("src")
        },
        preload: function(t) {
            this.img(t.closest("li").next()).img(t.closest("li").prev())
        },
        img: function(t) {
            if (t.length) {
                var e = new Image,
                    i = this.S("a", t);
                e.src = i.length ? i.attr("href") : this.S("img", t).attr("src")
            }
            return this
        },
        caption: function(t, e) {
            var i = e.attr("data-caption");
            return i ? t.html(i).show() : t.text("").hide(), this
        },
        go: function(t, e) {
            var i = this.S(".visible", t),
                n = i[e]();
            n.length && this.S("img", n).trigger("click", [i, n]).trigger("click.fndtn.clearing", [i, n]).trigger("change.fndtn.clearing")
        },
        shift: function(t, e, i) {
            var n, s = e.parent(),
                o = this.settings.prev_index || e.index(),
                a = this.direction(s, t, e),
                r = this.rtl ? "right" : "left",
                l = parseInt(s.css("left"), 10),
                c = e.outerWidth(),
                d = {};
            e.index() === o || /skip/.test(a) ? /skip/.test(a) && (n = e.index() - this.settings.up_count, this.lock(), n > 0 ? (d[r] = -(n * c), s.animate(d, 300, this.unlock())) : (d[r] = 0, s.animate(d, 300, this.unlock()))) : /left/.test(a) ? (this.lock(), d[r] = l + c, s.animate(d, 300, this.unlock())) : /right/.test(a) && (this.lock(), d[r] = l - c, s.animate(d, 300, this.unlock())), i()
        },
        direction: function(t, e, i) {
            var n, s = this.S("li", t),
                o = s.outerWidth() + s.outerWidth() / 4,
                a = Math.floor(this.S(".clearing-container").outerWidth() / o) - 1,
                r = s.index(i);
            return this.settings.up_count = a, n = this.adjacent(this.settings.prev_index, r) ? r > a && r > this.settings.prev_index ? "right" : r > a - 1 && r <= this.settings.prev_index ? "left" : !1 : "skip", this.settings.prev_index = r, n
        },
        adjacent: function(t, e) {
            for (var i = e + 1; i >= e - 1; i--)
                if (i === t) return !0;
            return !1
        },
        lock: function() {
            this.settings.locked = !0
        },
        unlock: function() {
            this.settings.locked = !1
        },
        locked: function() {
            return this.settings.locked
        },
        off: function() {
            this.S(this.scope).off(".fndtn.clearing"), this.S(e).off(".fndtn.clearing")
        },
        reflow: function() {
            this.init()
        }
    }
}(jQuery, window, window.document),
function(t, e) {
    "use strict";
    Foundation.libs.dropdown = {
        name: "dropdown",
        version: "5.3.1",
        settings: {
            active_class: "open",
            align: "bottom",
            is_hover: !1,
            opened: function() {},
            closed: function() {}
        },
        init: function(t, e, i) {
            Foundation.inherit(this, "throttle"), this.bindings(e, i)
        },
        events: function() {
            var i = this,
                n = i.S;
            n(this.scope).off(".dropdown").on("click.fndtn.dropdown", "[" + this.attr_name() + "]", function(e) {
                var s = n(this).data(i.attr_name(!0) + "-init") || i.settings;
                (!s.is_hover || Modernizr.touch) && (e.preventDefault(), i.toggle(t(this)))
            }).on("mouseenter.fndtn.dropdown", "[" + this.attr_name() + "], [" + this.attr_name() + "-content]", function(t) {
                var e, s, o = n(this);
                clearTimeout(i.timeout), o.data(i.data_attr()) ? (e = n("#" + o.data(i.data_attr())), s = o) : (e = o, s = n("[" + i.attr_name() + "='" + e.attr("id") + "']"));
                var a = s.data(i.attr_name(!0) + "-init") || i.settings;
                n(t.target).data(i.data_attr()) && a.is_hover && i.closeall.call(i), a.is_hover && i.open.apply(i, [e, s])
            }).on("mouseleave.fndtn.dropdown", "[" + this.attr_name() + "], [" + this.attr_name() + "-content]", function() {
                var t = n(this);
                i.timeout = setTimeout(function() {
                    if (t.data(i.data_attr())) {
                        var e = t.data(i.data_attr(!0) + "-init") || i.settings;
                        e.is_hover && i.close.call(i, n("#" + t.data(i.data_attr())))
                    } else {
                        var s = n("[" + i.attr_name() + '="' + n(this).attr("id") + '"]'),
                            e = s.data(i.attr_name(!0) + "-init") || i.settings;
                        e.is_hover && i.close.call(i, t)
                    }
                }.bind(this), 150)
            }).on("click.fndtn.dropdown", function(e) {
                var s = n(e.target).closest("[" + i.attr_name() + "-content]");
                if (!n(e.target).data(i.data_attr()) && !n(e.target).parent().data(i.data_attr())) return !n(e.target).data("revealId") && s.length > 0 && (n(e.target).is("[" + i.attr_name() + "-content]") || t.contains(s.first()[0], e.target)) ? void e.stopPropagation() : void i.close.call(i, n("[" + i.attr_name() + "-content]"))
            }).on("opened.fndtn.dropdown", "[" + i.attr_name() + "-content]", function() {
                i.settings.opened.call(this)
            }).on("closed.fndtn.dropdown", "[" + i.attr_name() + "-content]", function() {
                i.settings.closed.call(this)
            }), n(e).off(".dropdown").on("resize.fndtn.dropdown", i.throttle(function() {
                i.resize.call(i)
            }, 50)), this.resize()
        },
        close: function(t) {
            var e = this;
            t.each(function() {
                e.S(this).hasClass(e.settings.active_class) && (e.S(this).css(Foundation.rtl ? "right" : "left", "-99999px").removeClass(e.settings.active_class).prev("[" + e.attr_name() + "]").removeClass(e.settings.active_class).removeData("target"), e.S(this).trigger("closed").trigger("closed.fndtn.dropdown", [t]))
            })
        },
        closeall: function() {
            var e = this;
            t.each(e.S("[" + this.attr_name() + "-content]"), function() {
                e.close.call(e, e.S(this))
            })
        },
        open: function(t, e) {
            this.css(t.addClass(this.settings.active_class), e), t.prev("[" + this.attr_name() + "]").addClass(this.settings.active_class), t.data("target", e.get(0)).trigger("opened").trigger("opened.fndtn.dropdown", [t, e])
        },
        data_attr: function() {
            return this.namespace.length > 0 ? this.namespace + "-" + this.name : this.name
        },
        toggle: function(t) {
            var e = this.S("#" + t.data(this.data_attr()));
            0 !== e.length && (this.close.call(this, this.S("[" + this.attr_name() + "-content]").not(e)), e.hasClass(this.settings.active_class) ? (this.close.call(this, e), e.data("target") !== t.get(0) && this.open.call(this, e, t)) : this.open.call(this, e, t))
        },
        resize: function() {
            var t = this.S("[" + this.attr_name() + "-content].open"),
                e = this.S("[" + this.attr_name() + "='" + t.attr("id") + "']");
            t.length && e.length && this.css(t, e)
        },
        css: function(t, e) {
            var i = Math.max((e.width() - t.width()) / 2, 8);
            if (this.clear_idx(), this.small()) {
                var n = this.dirs.bottom.call(t, e);
                t.attr("style", "").removeClass("drop-left drop-right drop-top").css({
                    position: "absolute",
                    width: "95%",
                    "max-width": "none",
                    top: n.top
                }), t.css(Foundation.rtl ? "right" : "left", i)
            } else {
                var s = e.data(this.attr_name(!0) + "-init") || this.settings;
                this.style(t, e, s)
            }
            return t
        },
        style: function(e, i, n) {
            var s = t.extend({
                position: "absolute"
            }, this.dirs[n.align].call(e, i, n));
            e.attr("style", "").css(s)
        },
        dirs: {
            _base: function(t) {
                var e = this.offsetParent(),
                    i = e.offset(),
                    n = t.offset();
                return n.top -= i.top, n.left -= i.left, n
            },
            top: function(t) {
                var e = Foundation.libs.dropdown,
                    i = e.dirs._base.call(this, t),
                    n = 8;
                return this.addClass("drop-top"), (t.outerWidth() < this.outerWidth() || e.small()) && e.adjust_pip(n, i), Foundation.rtl ? {
                    left: i.left - this.outerWidth() + t.outerWidth(),
                    top: i.top - this.outerHeight()
                } : {
                    left: i.left,
                    top: i.top - this.outerHeight()
                }
            },
            bottom: function(t) {
                var e = Foundation.libs.dropdown,
                    i = e.dirs._base.call(this, t),
                    n = 8;
                return (t.outerWidth() < this.outerWidth() || e.small()) && e.adjust_pip(n, i), e.rtl ? {
                    left: i.left - this.outerWidth() + t.outerWidth(),
                    top: i.top + t.outerHeight()
                } : {
                    left: i.left,
                    top: i.top + t.outerHeight()
                }
            },
            left: function(t) {
                var e = Foundation.libs.dropdown.dirs._base.call(this, t);
                return this.addClass("drop-left"), {
                    left: e.left - this.outerWidth(),
                    top: e.top
                }
            },
            right: function(t) {
                var e = Foundation.libs.dropdown.dirs._base.call(this, t);
                return this.addClass("drop-right"), {
                    left: e.left + t.outerWidth(),
                    top: e.top
                }
            }
        },
        adjust_pip: function(t, e) {
            var i = Foundation.stylesheet;
            this.small() && (t += e.left - 8), this.rule_idx = i.cssRules.length;
            var n = ".f-dropdown.open:before",
                s = ".f-dropdown.open:after",
                o = "left: " + t + "px;",
                a = "left: " + (t - 1) + "px;";
            i.insertRule ? (i.insertRule([n, "{", o, "}"].join(" "), this.rule_idx), i.insertRule([s, "{", a, "}"].join(" "), this.rule_idx + 1)) : (i.addRule(n, o, this.rule_idx), i.addRule(s, a, this.rule_idx + 1))
        },
        clear_idx: function() {
            var t = Foundation.stylesheet;
            this.rule_idx && (t.deleteRule(this.rule_idx), t.deleteRule(this.rule_idx), delete this.rule_idx)
        },
        small: function() {
            return matchMedia(Foundation.media_queries.small).matches && !matchMedia(Foundation.media_queries.medium).matches
        },
        off: function() {
            this.S(this.scope).off(".fndtn.dropdown"), this.S("html, body").off(".fndtn.dropdown"), this.S(e).off(".fndtn.dropdown"), this.S("[data-dropdown-content]").off(".fndtn.dropdown")
        },
        reflow: function() {}
    }
}(jQuery, window, window.document),
function(t, e) {
    "use strict";
    Foundation.libs.interchange = {
        name: "interchange",
        version: "5.3.1",
        cache: {},
        images_loaded: !1,
        nodes_loaded: !1,
        settings: {
            load_attr: "interchange",
            named_queries: {
                "default": "only screen",
                small: Foundation.media_queries.small,
                medium: Foundation.media_queries.medium,
                large: Foundation.media_queries.large,
                xlarge: Foundation.media_queries.xlarge,
                xxlarge: Foundation.media_queries.xxlarge,
                landscape: "only screen and (orientation: landscape)",
                portrait: "only screen and (orientation: portrait)",
                retina: "only screen and (-webkit-min-device-pixel-ratio: 2),only screen and (min--moz-device-pixel-ratio: 2),only screen and (-o-min-device-pixel-ratio: 2/1),only screen and (min-device-pixel-ratio: 2),only screen and (min-resolution: 192dpi),only screen and (min-resolution: 2dppx)"
            },
            directives: {
                replace: function(e, i, n) {
                    if (/IMG/.test(e[0].nodeName)) {
                        var s = e[0].src;
                        if (new RegExp(i, "i").test(s)) return;
                        return e[0].src = i, n(e[0].src)
                    }
                    var o = e.data(this.data_attr + "-last-path"),
                        a = this;
                    if (o != i) return /\.(gif|jpg|jpeg|tiff|png)([?#].*)?/i.test(i) ? (t(e).css("background-image", "url(" + i + ")"), e.data("interchange-last-path", i), n(i)) : t.get(i, function(t) {
                        e.html(t), e.data(a.data_attr + "-last-path", i), n()
                    })
                }
            }
        },
        init: function(e, i, n) {
            Foundation.inherit(this, "throttle random_str"), this.data_attr = this.set_data_attr(), t.extend(!0, this.settings, i, n), this.bindings(i, n), this.load("images"), this.load("nodes")
        },
        get_media_hash: function() {
            var t = "";
            for (var e in this.settings.named_queries) t += matchMedia(this.settings.named_queries[e]).matches.toString();
            return t
        },
        events: function() {
            var i, n = this;
            return t(e).off(".interchange").on("resize.fndtn.interchange", n.throttle(function() {
                var t = n.get_media_hash();
                t !== i && n.resize(), i = t
            }, 50)), this
        },
        resize: function() {
            var e = this.cache;
            if (!this.images_loaded || !this.nodes_loaded) return void setTimeout(t.proxy(this.resize, this), 50);
            for (var i in e)
                if (e.hasOwnProperty(i)) {
                    var n = this.results(i, e[i]);
                    n && this.settings.directives[n.scenario[1]].call(this, n.el, n.scenario[0], function() {
                        if (arguments[0] instanceof Array) var t = arguments[0];
                        else var t = Array.prototype.slice.call(arguments, 0);
                        n.el.trigger(n.scenario[1], t)
                    })
                }
        },
        results: function(t, e) {
            var i = e.length;
            if (i > 0)
                for (var n = this.S("[" + this.add_namespace("data-uuid") + '="' + t + '"]'); i--;) {
                    var s, o = e[i][2];
                    if (s = matchMedia(this.settings.named_queries.hasOwnProperty(o) ? this.settings.named_queries[o] : o), s.matches) return {
                        el: n,
                        scenario: e[i]
                    }
                }
            return !1
        },
        load: function(t, e) {
            return ("undefined" == typeof this["cached_" + t] || e) && this["update_" + t](), this["cached_" + t]
        },
        update_images: function() {
            var t = this.S("img[" + this.data_attr + "]"),
                e = t.length,
                i = e,
                n = 0,
                s = this.data_attr;
            for (this.cache = {}, this.cached_images = [], this.images_loaded = 0 === e; i--;) {
                if (n++, t[i]) {
                    var o = t[i].getAttribute(s) || "";
                    o.length > 0 && this.cached_images.push(t[i])
                }
                n === e && (this.images_loaded = !0, this.enhance("images"))
            }
            return this
        },
        update_nodes: function() {
            var t = this.S("[" + this.data_attr + "]").not("img"),
                e = t.length,
                i = e,
                n = 0,
                s = this.data_attr;
            for (this.cached_nodes = [], this.nodes_loaded = 0 === e; i--;) {
                n++;
                var o = t[i].getAttribute(s) || "";
                o.length > 0 && this.cached_nodes.push(t[i]), n === e && (this.nodes_loaded = !0, this.enhance("nodes"))
            }
            return this
        },
        enhance: function(i) {
            for (var n = this["cached_" + i].length; n--;) this.object(t(this["cached_" + i][n]));
            return t(e).trigger("resize").trigger("resize.fndtn.interchange")
        },
        convert_directive: function(t) {
            var e = this.trim(t);
            return e.length > 0 ? e : "replace"
        },
        parse_scenario: function(t) {
            var e = t[0].match(/(.+),\s*(\w+)\s*$/),
                i = t[1];
            if (e) var n = e[1],
                s = e[2];
            else var o = t[0].split(/,\s*$/),
                n = o[0],
                s = "";
            return [this.trim(n), this.convert_directive(s), this.trim(i)]
        },
        object: function(t) {
            var e = this.parse_data_attr(t),
                i = [],
                n = e.length;
            if (n > 0)
                for (; n--;) {
                    var s = e[n].split(/\((.*?)(\))$/);
                    if (s.length > 1) {
                        var o = this.parse_scenario(s);
                        i.push(o)
                    }
                }
            return this.store(t, i)
        },
        store: function(t, e) {
            var i = this.random_str(),
                n = t.data(this.add_namespace("uuid", !0));
            return this.cache[n] ? this.cache[n] : (t.attr(this.add_namespace("data-uuid"), i), this.cache[i] = e)
        },
        trim: function(e) {
            return "string" == typeof e ? t.trim(e) : e
        },
        set_data_attr: function(t) {
            return t ? this.namespace.length > 0 ? this.namespace + "-" + this.settings.load_attr : this.settings.load_attr : this.namespace.length > 0 ? "data-" + this.namespace + "-" + this.settings.load_attr : "data-" + this.settings.load_attr
        },
        parse_data_attr: function(t) {
            for (var e = t.attr(this.attr_name()).split(/\[(.*?)\]/), i = e.length, n = []; i--;) e[i].replace(/[\W\d]+/, "").length > 4 && n.push(e[i]);
            return n
        },
        reflow: function() {
            this.load("images", !0), this.load("nodes", !0)
        }
    }
}(jQuery, window, window.document),
function(t, e, i, n) {
    "use strict";
    Foundation.libs.joyride = {
        name: "joyride",
        version: "5.3.1",
        defaults: {
            expose: !1,
            modal: !0,
            tip_location: "bottom",
            nub_position: "auto",
            scroll_speed: 1500,
            scroll_animation: "linear",
            timer: 0,
            start_timer_on_click: !0,
            start_offset: 0,
            next_button: !0,
            tip_animation: "fade",
            pause_after: [],
            exposed: [],
            tip_animation_fade_speed: 300,
            cookie_monster: !1,
            cookie_name: "joyride",
            cookie_domain: !1,
            cookie_expires: 365,
            tip_container: "body",
            abort_on_close: !0,
            tip_location_patterns: {
                top: ["bottom"],
                bottom: [],
                left: ["right", "top", "bottom"],
                right: ["left", "top", "bottom"]
            },
            post_ride_callback: function() {},
            post_step_callback: function() {},
            pre_step_callback: function() {},
            pre_ride_callback: function() {},
            post_expose_callback: function() {},
            template: {
                link: '<a href="#close" class="joyride-close-tip">&times;</a>',
                timer: '<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',
                tip: '<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',
                wrapper: '<div class="joyride-content-wrapper"></div>',
                button: '<a href="#" class="small button joyride-next-tip"></a>',
                modal: '<div class="joyride-modal-bg"></div>',
                expose: '<div class="joyride-expose-wrapper"></div>',
                expose_cover: '<div class="joyride-expose-cover"></div>'
            },
            expose_add_class: ""
        },
        init: function(e, i, n) {
            Foundation.inherit(this, "throttle random_str"), this.settings = this.settings || t.extend({}, this.defaults, n || i), this.bindings(i, n)
        },
        events: function() {
            var i = this;
            t(this.scope).off(".joyride").on("click.fndtn.joyride", ".joyride-next-tip, .joyride-modal-bg", function(t) {
                t.preventDefault(), this.settings.$li.next().length < 1 ? this.end() : this.settings.timer > 0 ? (clearTimeout(this.settings.automate), this.hide(), this.show(), this.startTimer()) : (this.hide(), this.show())
            }.bind(this)).on("click.fndtn.joyride", ".joyride-close-tip", function(t) {
                t.preventDefault(), this.end(this.settings.abort_on_close)
            }.bind(this)), t(e).off(".joyride").on("resize.fndtn.joyride", i.throttle(function() {
                if (t("[" + i.attr_name() + "]").length > 0 && i.settings.$next_tip) {
                    if (i.settings.exposed.length > 0) {
                        var e = t(i.settings.exposed);
                        e.each(function() {
                            var e = t(this);
                            i.un_expose(e), i.expose(e)
                        })
                    }
                    i.is_phone() ? i.pos_phone() : i.pos_default(!1)
                }
            }, 100))
        },
        start: function() {
            var e = this,
                i = t("[" + this.attr_name() + "]", this.scope),
                n = ["timer", "scrollSpeed", "startOffset", "tipAnimationFadeSpeed", "cookieExpires"],
                s = n.length;
            !i.length > 0 || (this.settings.init || this.events(), this.settings = i.data(this.attr_name(!0) + "-init"), this.settings.$content_el = i, this.settings.$body = t(this.settings.tip_container), this.settings.body_offset = t(this.settings.tip_container).position(), this.settings.$tip_content = this.settings.$content_el.find("> li"), this.settings.paused = !1, this.settings.attempts = 0, "function" != typeof t.cookie && (this.settings.cookie_monster = !1), (!this.settings.cookie_monster || this.settings.cookie_monster && !t.cookie(this.settings.cookie_name)) && (this.settings.$tip_content.each(function(i) {
                var o = t(this);
                this.settings = t.extend({}, e.defaults, e.data_options(o));
                for (var a = s; a--;) e.settings[n[a]] = parseInt(e.settings[n[a]], 10);
                e.create({
                    $li: o,
                    index: i
                })
            }), !this.settings.start_timer_on_click && this.settings.timer > 0 ? (this.show("init"), this.startTimer()) : this.show("init")))
        },
        resume: function() {
            this.set_li(), this.show()
        },
        tip_template: function(e) {
            var i, n;
            return e.tip_class = e.tip_class || "", i = t(this.settings.template.tip).addClass(e.tip_class), n = t.trim(t(e.li).html()) + this.button_text(e.button_text) + this.settings.template.link + this.timer_instance(e.index), i.append(t(this.settings.template.wrapper)), i.first().attr(this.add_namespace("data-index"), e.index), t(".joyride-content-wrapper", i).append(n), i[0]
        },
        timer_instance: function(e) {
            var i;
            return i = 0 === e && this.settings.start_timer_on_click && this.settings.timer > 0 || 0 === this.settings.timer ? "" : t(this.settings.template.timer)[0].outerHTML
        },
        button_text: function(e) {
            return this.settings.tip_settings.next_button ? (e = t.trim(e) || "Next", e = t(this.settings.template.button).append(e)[0].outerHTML) : e = "", e
        },
        create: function(e) {
            this.settings.tip_settings = t.extend({}, this.settings, this.data_options(e.$li));
            var i = e.$li.attr(this.add_namespace("data-button")) || e.$li.attr(this.add_namespace("data-text")),
                n = e.$li.attr("class"),
                s = t(this.tip_template({
                    tip_class: n,
                    index: e.index,
                    button_text: i,
                    li: e.$li
                }));
            t(this.settings.tip_container).append(s)
        },
        show: function(e) {
            var i = null;
            this.settings.$li === n || -1 === t.inArray(this.settings.$li.index(), this.settings.pause_after) ? (this.settings.paused ? this.settings.paused = !1 : this.set_li(e), this.settings.attempts = 0, this.settings.$li.length && this.settings.$target.length > 0 ? (e && (this.settings.pre_ride_callback(this.settings.$li.index(), this.settings.$next_tip), this.settings.modal && this.show_modal()), this.settings.pre_step_callback(this.settings.$li.index(), this.settings.$next_tip), this.settings.modal && this.settings.expose && this.expose(), this.settings.tip_settings = t.extend({}, this.settings, this.data_options(this.settings.$li)), this.settings.timer = parseInt(this.settings.timer, 10), this.settings.tip_settings.tip_location_pattern = this.settings.tip_location_patterns[this.settings.tip_settings.tip_location], /body/i.test(this.settings.$target.selector) || this.scroll_to(), this.is_phone() ? this.pos_phone(!0) : this.pos_default(!0), i = this.settings.$next_tip.find(".joyride-timer-indicator"), /pop/i.test(this.settings.tip_animation) ? (i.width(0), this.settings.timer > 0 ? (this.settings.$next_tip.show(), setTimeout(function() {
                i.animate({
                    width: i.parent().width()
                }, this.settings.timer, "linear")
            }.bind(this), this.settings.tip_animation_fade_speed)) : this.settings.$next_tip.show()) : /fade/i.test(this.settings.tip_animation) && (i.width(0), this.settings.timer > 0 ? (this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed).show(), setTimeout(function() {
                i.animate({
                    width: i.parent().width()
                }, this.settings.timer, "linear")
            }.bind(this), this.settings.tip_animation_fade_speed)) : this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed)), this.settings.$current_tip = this.settings.$next_tip) : this.settings.$li && this.settings.$target.length < 1 ? this.show() : this.end()) : this.settings.paused = !0
        },
        is_phone: function() {
            return matchMedia(Foundation.media_queries.small).matches && !matchMedia(Foundation.media_queries.medium).matches
        },
        hide: function() {
            this.settings.modal && this.settings.expose && this.un_expose(), this.settings.modal || t(".joyride-modal-bg").hide(), this.settings.$current_tip.css("visibility", "hidden"), setTimeout(t.proxy(function() {
                this.hide(), this.css("visibility", "visible")
            }, this.settings.$current_tip), 0), this.settings.post_step_callback(this.settings.$li.index(), this.settings.$current_tip)
        },
        set_li: function(t) {
            t ? (this.settings.$li = this.settings.$tip_content.eq(this.settings.start_offset), this.set_next_tip(), this.settings.$current_tip = this.settings.$next_tip) : (this.settings.$li = this.settings.$li.next(), this.set_next_tip()), this.set_target()
        },
        set_next_tip: function() {
            this.settings.$next_tip = t(".joyride-tip-guide").eq(this.settings.$li.index()), this.settings.$next_tip.data("closed", "")
        },
        set_target: function() {
            var e = this.settings.$li.attr(this.add_namespace("data-class")),
                n = this.settings.$li.attr(this.add_namespace("data-id")),
                s = function() {
                    return n ? t(i.getElementById(n)) : e ? t("." + e).first() : t("body")
                };
            this.settings.$target = s()
        },
        scroll_to: function() {
            var i, n;
            i = t(e).height() / 2, n = Math.ceil(this.settings.$target.offset().top - i + this.settings.$next_tip.outerHeight()), 0 != n && t("html, body").stop().animate({
                scrollTop: n
            }, this.settings.scroll_speed, "swing")
        },
        paused: function() {
            return -1 === t.inArray(this.settings.$li.index() + 1, this.settings.pause_after)
        },
        restart: function() {
            this.hide(), this.settings.$li = n, this.show("init")
        },
        pos_default: function(t) {
            var e = this.settings.$next_tip.find(".joyride-nub"),
                i = Math.ceil(e.outerWidth() / 2),
                n = Math.ceil(e.outerHeight() / 2),
                s = t || !1;
            if (s && (this.settings.$next_tip.css("visibility", "hidden"), this.settings.$next_tip.show()), /body/i.test(this.settings.$target.selector)) this.settings.$li.length && this.pos_modal(e);
            else {
                var o = this.settings.tip_settings.tipAdjustmentY ? parseInt(this.settings.tip_settings.tipAdjustmentY) : 0,
                    a = this.settings.tip_settings.tipAdjustmentX ? parseInt(this.settings.tip_settings.tipAdjustmentX) : 0;
                this.bottom() ? (this.settings.$next_tip.css(this.rtl ? {
                    top: this.settings.$target.offset().top + n + this.settings.$target.outerHeight() + o,
                    left: this.settings.$target.offset().left + this.settings.$target.outerWidth() - this.settings.$next_tip.outerWidth() + a
                } : {
                    top: this.settings.$target.offset().top + n + this.settings.$target.outerHeight() + o,
                    left: this.settings.$target.offset().left + a
                }), this.nub_position(e, this.settings.tip_settings.nub_position, "top")) : this.top() ? (this.settings.$next_tip.css(this.rtl ? {
                    top: this.settings.$target.offset().top - this.settings.$next_tip.outerHeight() - n + o,
                    left: this.settings.$target.offset().left + this.settings.$target.outerWidth() - this.settings.$next_tip.outerWidth()
                } : {
                    top: this.settings.$target.offset().top - this.settings.$next_tip.outerHeight() - n + o,
                    left: this.settings.$target.offset().left + a
                }), this.nub_position(e, this.settings.tip_settings.nub_position, "bottom")) : this.right() ? (this.settings.$next_tip.css({
                    top: this.settings.$target.offset().top + o,
                    left: this.settings.$target.outerWidth() + this.settings.$target.offset().left + i + a
                }), this.nub_position(e, this.settings.tip_settings.nub_position, "left")) : this.left() && (this.settings.$next_tip.css({
                    top: this.settings.$target.offset().top + o,
                    left: this.settings.$target.offset().left - this.settings.$next_tip.outerWidth() - i + a
                }), this.nub_position(e, this.settings.tip_settings.nub_position, "right")), !this.visible(this.corners(this.settings.$next_tip)) && this.settings.attempts < this.settings.tip_settings.tip_location_pattern.length && (e.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"), this.settings.tip_settings.tip_location = this.settings.tip_settings.tip_location_pattern[this.settings.attempts], this.settings.attempts++, this.pos_default())
            }
            s && (this.settings.$next_tip.hide(), this.settings.$next_tip.css("visibility", "visible"))
        },
        pos_phone: function(e) {
            var i = this.settings.$next_tip.outerHeight(),
                n = (this.settings.$next_tip.offset(), this.settings.$target.outerHeight()),
                s = t(".joyride-nub", this.settings.$next_tip),
                o = Math.ceil(s.outerHeight() / 2),
                a = e || !1;
            s.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"), a && (this.settings.$next_tip.css("visibility", "hidden"), this.settings.$next_tip.show()), /body/i.test(this.settings.$target.selector) ? this.settings.$li.length && this.pos_modal(s) : this.top() ? (this.settings.$next_tip.offset({
                top: this.settings.$target.offset().top - i - o
            }), s.addClass("bottom")) : (this.settings.$next_tip.offset({
                top: this.settings.$target.offset().top + n + o
            }), s.addClass("top")), a && (this.settings.$next_tip.hide(), this.settings.$next_tip.css("visibility", "visible"))
        },
        pos_modal: function(t) {
            this.center(), t.hide(), this.show_modal()
        },
        show_modal: function() {
            if (!this.settings.$next_tip.data("closed")) {
                var e = t(".joyride-modal-bg");
                e.length < 1 && t("body").append(this.settings.template.modal).show(), /pop/i.test(this.settings.tip_animation) ? e.show() : e.fadeIn(this.settings.tip_animation_fade_speed)
            }
        },
        expose: function() {
            var i, n, s, o, a, r = "expose-" + this.random_str(6);
            if (arguments.length > 0 && arguments[0] instanceof t) s = arguments[0];
            else {
                if (!this.settings.$target || /body/i.test(this.settings.$target.selector)) return !1;
                s = this.settings.$target
            }
            return s.length < 1 ? (e.console && console.error("element not valid", s), !1) : (i = t(this.settings.template.expose), this.settings.$body.append(i), i.css({
                top: s.offset().top,
                left: s.offset().left,
                width: s.outerWidth(!0),
                height: s.outerHeight(!0)
            }), n = t(this.settings.template.expose_cover), o = {
                zIndex: s.css("z-index"),
                position: s.css("position")
            }, a = null == s.attr("class") ? "" : s.attr("class"), s.css("z-index", parseInt(i.css("z-index")) + 1), "static" == o.position && s.css("position", "relative"), s.data("expose-css", o), s.data("orig-class", a), s.attr("class", a + " " + this.settings.expose_add_class), n.css({
                top: s.offset().top,
                left: s.offset().left,
                width: s.outerWidth(!0),
                height: s.outerHeight(!0)
            }), this.settings.modal && this.show_modal(), this.settings.$body.append(n), i.addClass(r), n.addClass(r), s.data("expose", r), this.settings.post_expose_callback(this.settings.$li.index(), this.settings.$next_tip, s), void this.add_exposed(s))
        },
        un_expose: function() {
            var i, n, s, o, a, r = !1;
            if (arguments.length > 0 && arguments[0] instanceof t) n = arguments[0];
            else {
                if (!this.settings.$target || /body/i.test(this.settings.$target.selector)) return !1;
                n = this.settings.$target
            }
            return n.length < 1 ? (e.console && console.error("element not valid", n), !1) : (i = n.data("expose"), s = t("." + i), arguments.length > 1 && (r = arguments[1]), r === !0 ? t(".joyride-expose-wrapper,.joyride-expose-cover").remove() : s.remove(), o = n.data("expose-css"), "auto" == o.zIndex ? n.css("z-index", "") : n.css("z-index", o.zIndex), o.position != n.css("position") && ("static" == o.position ? n.css("position", "") : n.css("position", o.position)), a = n.data("orig-class"), n.attr("class", a), n.removeData("orig-classes"), n.removeData("expose"), n.removeData("expose-z-index"), void this.remove_exposed(n))
        },
        add_exposed: function(e) {
            this.settings.exposed = this.settings.exposed || [], e instanceof t || "object" == typeof e ? this.settings.exposed.push(e[0]) : "string" == typeof e && this.settings.exposed.push(e)
        },
        remove_exposed: function(e) {
            var i, n;
            for (e instanceof t ? i = e[0] : "string" == typeof e && (i = e), this.settings.exposed = this.settings.exposed || [], n = this.settings.exposed.length; n--;)
                if (this.settings.exposed[n] == i) return void this.settings.exposed.splice(n, 1)
        },
        center: function() {
            var i = t(e);
            return this.settings.$next_tip.css({
                top: (i.height() - this.settings.$next_tip.outerHeight()) / 2 + i.scrollTop(),
                left: (i.width() - this.settings.$next_tip.outerWidth()) / 2 + i.scrollLeft()
            }), !0
        },
        bottom: function() {
            return /bottom/i.test(this.settings.tip_settings.tip_location)
        },
        top: function() {
            return /top/i.test(this.settings.tip_settings.tip_location)
        },
        right: function() {
            return /right/i.test(this.settings.tip_settings.tip_location)
        },
        left: function() {
            return /left/i.test(this.settings.tip_settings.tip_location)
        },
        corners: function(i) {
            var n = t(e),
                s = n.height() / 2,
                o = Math.ceil(this.settings.$target.offset().top - s + this.settings.$next_tip.outerHeight()),
                a = n.width() + n.scrollLeft(),
                r = n.height() + o,
                l = n.height() + n.scrollTop(),
                c = n.scrollTop();
            return c > o && (c = 0 > o ? 0 : o), r > l && (l = r), [i.offset().top < c, a < i.offset().left + i.outerWidth(), l < i.offset().top + i.outerHeight(), n.scrollLeft() > i.offset().left]
        },
        visible: function(t) {
            for (var e = t.length; e--;)
                if (t[e]) return !1;
            return !0
        },
        nub_position: function(t, e, i) {
            t.addClass("auto" === e ? i : e)
        },
        startTimer: function() {
            this.settings.$li.length ? this.settings.automate = setTimeout(function() {
                this.hide(), this.show(), this.startTimer()
            }.bind(this), this.settings.timer) : clearTimeout(this.settings.automate)
        },
        end: function(e) {
            this.settings.cookie_monster && t.cookie(this.settings.cookie_name, "ridden", {
                expires: this.settings.cookie_expires,
                domain: this.settings.cookie_domain
            }), this.settings.timer > 0 && clearTimeout(this.settings.automate), this.settings.modal && this.settings.expose && this.un_expose(), this.settings.$next_tip.data("closed", !0), t(".joyride-modal-bg").hide(), this.settings.$current_tip.hide(), ("undefined" == typeof e || e === !1) && (this.settings.post_step_callback(this.settings.$li.index(), this.settings.$current_tip), this.settings.post_ride_callback(this.settings.$li.index(), this.settings.$current_tip)), t(".joyride-tip-guide").remove()
        },
        off: function() {
            t(this.scope).off(".joyride"), t(e).off(".joyride"), t(".joyride-close-tip, .joyride-next-tip, .joyride-modal-bg").off(".joyride"), t(".joyride-tip-guide, .joyride-modal-bg").remove(), clearTimeout(this.settings.automate), this.settings = {}
        },
        reflow: function() {}
    }
}(jQuery, window, window.document),
function(t, e) {
    "use strict";
    Foundation.libs["magellan-expedition"] = {
        name: "magellan-expedition",
        version: "5.3.1",
        settings: {
            active_class: "active",
            threshold: 0,
            destination_threshold: 20,
            throttle_delay: 30,
            fixed_top: 0
        },
        init: function(t, e, i) {
            Foundation.inherit(this, "throttle"), this.bindings(e, i)
        },
        events: function() {
            var i = this,
                n = i.S,
                s = i.settings;
            i.set_expedition_position(), n(i.scope).off(".magellan").on("click.fndtn.magellan", "[" + i.add_namespace("data-magellan-arrival") + '] a[href^="#"]', function(e) {
                e.preventDefault();
                var n = t(this).closest("[" + i.attr_name() + "]"),
                    s = n.data("magellan-expedition-init"),
                    o = this.hash.split("#").join(""),
                    a = t("a[name='" + o + "']");
                0 === a.length && (a = t("#" + o));
                var r = a.offset().top - s.destination_threshold + 1;
                r -= n.outerHeight(), t("html, body").stop().animate({
                    scrollTop: r
                }, 700, "swing", function() {
                    history.pushState ? history.pushState(null, null, "#" + o) : location.hash = "#" + o
                })
            }).on("scroll.fndtn.magellan", i.throttle(this.check_for_arrivals.bind(this), s.throttle_delay)), t(e).on("resize.fndtn.magellan", i.throttle(this.set_expedition_position.bind(this), s.throttle_delay))
        },
        check_for_arrivals: function() {
            var t = this;
            t.update_arrivals(), t.update_expedition_positions()
        },
        set_expedition_position: function() {
            var e = this;
            t("[" + this.attr_name() + "=fixed]", e.scope).each(function() {
                var i, n = t(this),
                    s = n.data("magellan-expedition-init"),
                    o = n.attr("styles");
                n.attr("style", ""), i = n.offset().top + s.threshold, n.data(e.data_attr("magellan-top-offset"), i), n.attr("style", o)
            })
        },
        update_expedition_positions: function() {
            var i = this,
                n = t(e).scrollTop();
            t("[" + this.attr_name() + "=fixed]", i.scope).each(function() {
                var e = t(this),
                    s = e.data("magellan-expedition-init"),
                    o = e.data("magellan-top-offset");
                if (n >= o) {
                    var a = e.prev("[" + i.add_namespace("data-magellan-expedition-clone") + "]");
                    0 === a.length && (a = e.clone(), a.removeAttr(i.attr_name()), a.attr(i.add_namespace("data-magellan-expedition-clone"), ""), e.before(a)), e.css({
                        position: "fixed",
                        top: s.fixed_top
                    })
                } else e.prev("[" + i.add_namespace("data-magellan-expedition-clone") + "]").remove(), e.attr("style", "").removeClass("fixed")
            })
        },
        update_arrivals: function() {
            var i = this,
                n = t(e).scrollTop();
            t("[" + this.attr_name() + "]", i.scope).each(function() {
                var e = t(this),
                    s = e.data(i.attr_name(!0) + "-init"),
                    o = i.offsets(e, n),
                    a = e.find("[" + i.add_namespace("data-magellan-arrival") + "]"),
                    r = !1;
                o.each(function(t, n) {
                    if (n.viewport_offset >= n.top_offset) {
                        var o = e.find("[" + i.add_namespace("data-magellan-arrival") + "]");
                        return o.not(n.arrival).removeClass(s.active_class), n.arrival.addClass(s.active_class), r = !0, !0
                    }
                }), r || a.removeClass(s.active_class)
            })
        },
        offsets: function(e, i) {
            var n = this,
                s = e.data(n.attr_name(!0) + "-init"),
                o = i;
            return e.find("[" + n.add_namespace("data-magellan-arrival") + "]").map(function() {
                var i = t(this).data(n.data_attr("magellan-arrival")),
                    a = t("[" + n.add_namespace("data-magellan-destination") + "=" + i + "]");
                if (a.length > 0) {
                    var r = a.offset().top - s.destination_threshold - e.outerHeight();
                    return {
                        destination: a,
                        arrival: t(this),
                        top_offset: r,
                        viewport_offset: o
                    }
                }
            }).sort(function(t, e) {
                return t.top_offset < e.top_offset ? -1 : t.top_offset > e.top_offset ? 1 : 0
            })
        },
        data_attr: function(t) {
            return this.namespace.length > 0 ? this.namespace + "-" + t : t
        },
        off: function() {
            this.S(this.scope).off(".magellan"), this.S(e).off(".magellan")
        },
        reflow: function() {
            var e = this;
            t("[" + e.add_namespace("data-magellan-expedition-clone") + "]", e.scope).remove()
        }
    }
}(jQuery, window, window.document),
function() {
    "use strict";
    Foundation.libs.offcanvas = {
        name: "offcanvas",
        version: "5.3.1",
        settings: {
            open_method: "move",
            close_on_click: !0
        },
        init: function(t, e, i) {
            this.bindings(e, i)
        },
        events: function() {
            var t = this,
                e = t.S,
                i = "",
                n = "",
                s = "";
            "move" === this.settings.open_method ? (i = "move-", n = "right", s = "left") : "overlap" === this.settings.open_method && (i = "offcanvas-overlap"), e(this.scope).off(".offcanvas").on("click.fndtn.offcanvas", ".left-off-canvas-toggle", function(e) {
                t.click_toggle_class(e, i + n)
            }).on("click.fndtn.offcanvas", ".left-off-canvas-menu a", function(e) {
                var s = t.get_settings(e);
                s.close_on_click && t.hide.call(t, i + n, t.get_wrapper(e))
            }).on("click.fndtn.offcanvas", ".right-off-canvas-toggle", function(e) {
                t.click_toggle_class(e, i + s)
            }).on("click.fndtn.offcanvas", ".right-off-canvas-menu a", function(e) {
                var n = t.get_settings(e);
                n.close_on_click && t.hide.call(t, i + s, t.get_wrapper(e))
            }).on("click.fndtn.offcanvas", ".exit-off-canvas", function(e) {
                t.click_remove_class(e, i + s), n && t.click_remove_class(e, i + n)
            })
        },
        toggle: function(t, e) {
            e = e || this.get_wrapper(), e.is("." + t) ? this.hide(t, e) : this.show(t, e)
        },
        show: function(t, e) {
            e = e || this.get_wrapper(), e.trigger("open").trigger("open.fndtn.offcanvas"), e.addClass(t)
        },
        hide: function(t, e) {
            e = e || this.get_wrapper(), e.trigger("close").trigger("close.fndtn.offcanvas"), e.removeClass(t)
        },
        click_toggle_class: function(t, e) {
            t.preventDefault();
            var i = this.get_wrapper(t);
            this.toggle(e, i)
        },
        click_remove_class: function(t, e) {
            t.preventDefault();
            var i = this.get_wrapper(t);
            this.hide(e, i)
        },
        get_settings: function(t) {
            var e = this.S(t.target).closest("[" + this.attr_name() + "]");
            return e.data(this.attr_name(!0) + "-init") || this.settings
        },
        get_wrapper: function(t) {
            var e = this.S(t ? t.target : this.scope).closest(".off-canvas-wrap");
            return 0 === e.length && (e = this.S(".off-canvas-wrap")), e
        },
        reflow: function() {}
    }
}(jQuery, window, window.document),
function(t, e, i, n) {
    "use strict";
    var s = function() {},
        o = function(s, o) {
            if (s.hasClass(o.slides_container_class)) return this;
            var c, d, u, h, p, f, g = this,
                m = s,
                v = 0,
                _ = !1;
            g.slides = function() {
                return m.children(o.slide_selector)
            }, g.slides().first().addClass(o.active_slide_class), g.update_slide_number = function(e) {
                o.slide_number && (d.find("span:first").text(parseInt(e) + 1), d.find("span:last").text(g.slides().length)), o.bullets && (u.children().removeClass(o.bullets_active_class), t(u.children().get(e)).addClass(o.bullets_active_class))
            }, g.update_active_link = function(e) {
                var i = t('[data-orbit-link="' + g.slides().eq(e).attr("data-orbit-slide") + '"]');
                i.siblings().removeClass(o.bullets_active_class), i.addClass(o.bullets_active_class)
            }, g.build_markup = function() {
                m.wrap('<div class="' + o.container_class + '"></div>'), c = m.parent(), m.addClass(o.slides_container_class), o.stack_on_small && c.addClass(o.stack_on_small_class), o.navigation_arrows && (c.append(t('<a href="#"><span></span></a>').addClass(o.prev_class)), c.append(t('<a href="#"><span></span></a>').addClass(o.next_class))), o.timer && (h = t("<div>").addClass(o.timer_container_class), h.append("<span>"), h.append(t("<div>").addClass(o.timer_progress_class)), h.addClass(o.timer_paused_class), c.append(h)), o.slide_number && (d = t("<div>").addClass(o.slide_number_class), d.append("<span></span> " + o.slide_number_text + " <span></span>"), c.append(d)), o.bullets && (u = t("<ol>").addClass(o.bullets_container_class), c.append(u), u.wrap('<div class="orbit-bullets-container"></div>'), g.slides().each(function(e) {
                    var i = t("<li>").attr("data-orbit-slide", e).on("click", g.link_bullet);
                    u.append(i)
                }))
            }, g._goto = function(e, i) {
                if (e === v) return !1;
                "object" == typeof f && f.restart();
                var n = g.slides(),
                    s = "next";
                if (_ = !0, v > e && (s = "prev"), e >= n.length) {
                    if (!o.circular) return !1;
                    e = 0
                } else if (0 > e) {
                    if (!o.circular) return !1;
                    e = n.length - 1
                }
                var a = t(n.get(v)),
                    r = t(n.get(e));
                a.css("zIndex", 2), a.removeClass(o.active_slide_class), r.css("zIndex", 4).addClass(o.active_slide_class), m.trigger("before-slide-change.fndtn.orbit"), o.before_slide_change(), g.update_active_link(e);
                var l = function() {
                    var t = function() {
                        v = e, _ = !1, i === !0 && (f = g.create_timer(), f.start()), g.update_slide_number(v), m.trigger("after-slide-change.fndtn.orbit", [{
                            slide_number: v,
                            total_slides: n.length
                        }]), o.after_slide_change(v, n.length)
                    };
                    m.height() != r.height() && o.variable_height ? m.animate({
                        height: r.height()
                    }, 250, "linear", t) : t()
                };
                if (1 === n.length) return l(), !1;
                var c = function() {
                    "next" === s && p.next(a, r, l), "prev" === s && p.prev(a, r, l)
                };
                r.height() > m.height() && o.variable_height ? m.animate({
                    height: r.height()
                }, 250, "linear", c) : c()
            }, g.next = function(t) {
                t.stopImmediatePropagation(), t.preventDefault(), g._goto(v + 1)
            }, g.prev = function(t) {
                t.stopImmediatePropagation(), t.preventDefault(), g._goto(v - 1)
            }, g.link_custom = function(e) {
                e.preventDefault();
                var i = t(this).attr("data-orbit-link");
                if ("string" == typeof i && "" != (i = t.trim(i))) {
                    var n = c.find("[data-orbit-slide=" + i + "]"); - 1 != n.index() && g._goto(n.index())
                }
            }, g.link_bullet = function() {
                var e = t(this).attr("data-orbit-slide");
                if ("string" == typeof e && "" != (e = t.trim(e)))
                    if (isNaN(parseInt(e))) {
                        var i = c.find("[data-orbit-slide=" + e + "]"); - 1 != i.index() && g._goto(i.index() + 1)
                    } else g._goto(parseInt(e))
            }, g.timer_callback = function() {
                g._goto(v + 1, !0)
            }, g.compute_dimensions = function() {
                var e = t(g.slides().get(v)),
                    i = e.height();
                o.variable_height || g.slides().each(function() {
                    t(this).height() > i && (i = t(this).height())
                }), m.height(i)
            }, g.create_timer = function() {
                var t = new a(c.find("." + o.timer_container_class), o, g.timer_callback);
                return t
            }, g.stop_timer = function() {
                "object" == typeof f && f.stop()
            }, g.toggle_timer = function() {
                var t = c.find("." + o.timer_container_class);
                t.hasClass(o.timer_paused_class) ? ("undefined" == typeof f && (f = g.create_timer()), f.start()) : "object" == typeof f && f.stop()
            }, g.init = function() {
                g.build_markup(), o.timer && (f = g.create_timer(), Foundation.utils.image_loaded(this.slides().children("img"), f.start)), p = new l(o, m), "slide" === o.animation && (p = new r(o, m)), c.on("click", "." + o.next_class, g.next), c.on("click", "." + o.prev_class, g.prev), o.next_on_click && c.on("click", "." + o.slides_container_class + " [data-orbit-slide]", g.link_bullet), c.on("click", g.toggle_timer), o.swipe && c.on("touchstart.fndtn.orbit", function(t) {
                    t.touches || (t = t.originalEvent);
                    var e = {
                        start_page_x: t.touches[0].pageX,
                        start_page_y: t.touches[0].pageY,
                        start_time: (new Date).getTime(),
                        delta_x: 0,
                        is_scrolling: n
                    };
                    c.data("swipe-transition", e), t.stopPropagation()
                }).on("touchmove.fndtn.orbit", function(t) {
                    if (t.touches || (t = t.originalEvent), !(t.touches.length > 1 || t.scale && 1 !== t.scale)) {
                        var e = c.data("swipe-transition");
                        if ("undefined" == typeof e && (e = {}), e.delta_x = t.touches[0].pageX - e.start_page_x, "undefined" == typeof e.is_scrolling && (e.is_scrolling = !!(e.is_scrolling || Math.abs(e.delta_x) < Math.abs(t.touches[0].pageY - e.start_page_y))), !e.is_scrolling && !e.active) {
                            t.preventDefault();
                            var i = e.delta_x < 0 ? v + 1 : v - 1;
                            e.active = !0, g._goto(i)
                        }
                    }
                }).on("touchend.fndtn.orbit", function(t) {
                    c.data("swipe-transition", {}), t.stopPropagation()
                }), c.on("mouseenter.fndtn.orbit", function() {
                    o.timer && o.pause_on_hover && g.stop_timer()
                }).on("mouseleave.fndtn.orbit", function() {
                    o.timer && o.resume_on_mouseout && f.start()
                }), t(i).on("click", "[data-orbit-link]", g.link_custom), t(e).on("load resize", g.compute_dimensions), Foundation.utils.image_loaded(this.slides().children("img"), g.compute_dimensions), Foundation.utils.image_loaded(this.slides().children("img"), function() {
                    c.prev("." + o.preloader_class).css("display", "none"), g.update_slide_number(0), g.update_active_link(0), m.trigger("ready.fndtn.orbit")
                })
            }, g.init()
        },
        a = function(t, e, i) {
            var n, s, o = this,
                a = e.timer_speed,
                r = t.find("." + e.timer_progress_class),
                l = -1;
            this.update_progress = function(t) {
                var e = r.clone();
                e.attr("style", ""), e.css("width", t + "%"), r.replaceWith(e), r = e
            }, this.restart = function() {
                clearTimeout(s), t.addClass(e.timer_paused_class), l = -1, o.update_progress(0)
            }, this.start = function() {
                return t.hasClass(e.timer_paused_class) ? (l = -1 === l ? a : l, t.removeClass(e.timer_paused_class), n = (new Date).getTime(), r.animate({
                    width: "100%"
                }, l, "linear"), s = setTimeout(function() {
                    o.restart(), i()
                }, l), void t.trigger("timer-started.fndtn.orbit")) : !0
            }, this.stop = function() {
                if (t.hasClass(e.timer_paused_class)) return !0;
                clearTimeout(s), t.addClass(e.timer_paused_class);
                var i = (new Date).getTime();
                l -= i - n;
                var r = 100 - l / a * 100;
                o.update_progress(r), t.trigger("timer-stopped.fndtn.orbit")
            }
        },
        r = function(e) {
            var i = e.animation_speed,
                n = 1 === t("html[dir=rtl]").length,
                s = n ? "marginRight" : "marginLeft",
                o = {};
            o[s] = "0%", this.next = function(t, e, n) {
                t.animate({
                    marginLeft: "-100%"
                }, i), e.animate(o, i, function() {
                    t.css(s, "100%"), n()
                })
            }, this.prev = function(t, e, n) {
                t.animate({
                    marginLeft: "100%"
                }, i), e.css(s, "-100%"), e.animate(o, i, function() {
                    t.css(s, "100%"), n()
                })
            }
        },
        l = function(e) {
            {
                var i = e.animation_speed;
                1 === t("html[dir=rtl]").length
            }
            this.next = function(t, e, n) {
                e.css({
                    margin: "0%",
                    opacity: "0.01"
                }), e.animate({
                    opacity: "1"
                }, i, "linear", function() {
                    t.css("margin", "100%"), n()
                })
            }, this.prev = function(t, e, n) {
                e.css({
                    margin: "0%",
                    opacity: "0.01"
                }), e.animate({
                    opacity: "1"
                }, i, "linear", function() {
                    t.css("margin", "100%"), n()
                })
            }
        };
    Foundation.libs = Foundation.libs || {}, Foundation.libs.orbit = {
        name: "orbit",
        version: "5.3.1",
        settings: {
            animation: "slide",
            timer_speed: 1e4,
            pause_on_hover: !0,
            resume_on_mouseout: !1,
            next_on_click: !0,
            animation_speed: 500,
            stack_on_small: !1,
            navigation_arrows: !0,
            slide_number: !0,
            slide_number_text: "of",
            container_class: "orbit-container",
            stack_on_small_class: "orbit-stack-on-small",
            next_class: "orbit-next",
            prev_class: "orbit-prev",
            timer_container_class: "orbit-timer",
            timer_paused_class: "paused",
            timer_progress_class: "orbit-progress",
            slides_container_class: "orbit-slides-container",
            preloader_class: "preloader",
            slide_selector: "*",
            bullets_container_class: "orbit-bullets",
            bullets_active_class: "active",
            slide_number_class: "orbit-slide-number",
            caption_class: "orbit-caption",
            active_slide_class: "active",
            orbit_transition_class: "orbit-transitioning",
            bullets: !0,
            circular: !0,
            timer: !0,
            variable_height: !1,
            swipe: !0,
            before_slide_change: s,
            after_slide_change: s
        },
        init: function(t, e, i) {
            this.bindings(e, i)
        },
        events: function(t) {
            var e = new o(this.S(t), this.S(t).data("orbit-init"));
            this.S(t).data(self.name + "-instance", e)
        },
        reflow: function() {
            var t = this;
            if (t.S(t.scope).is("[data-orbit]")) {
                var e = t.S(t.scope),
                    i = e.data(t.name + "-instance");
                i.compute_dimensions()
            } else t.S("[data-orbit]", t.scope).each(function(e, i) {
                var n = t.S(i),
                    s = (t.data_options(n), n.data(t.name + "-instance"));
                s.compute_dimensions()
            })
        }
    }
}(jQuery, window, window.document),
function(t, e, i, n) {
    "use strict";

    function s(t) {
        var e = /fade/i.test(t),
            i = /pop/i.test(t);
        return {
            animate: e || i,
            pop: i,
            fade: e
        }
    }
    Foundation.libs.reveal = {
        name: "reveal",
        version: "5.3.1",
        locked: !1,
        settings: {
            animation: "fadeAndPop",
            animation_speed: 250,
            close_on_background_click: !0,
            close_on_esc: !0,
            dismiss_modal_class: "close-reveal-modal",
            bg_class: "reveal-modal-bg",
            root_element: "body",
            open: function() {},
            opened: function() {},
            close: function() {},
            closed: function() {},
            bg: t(".reveal-modal-bg"),
            css: {
                open: {
                    opacity: 0,
                    visibility: "visible",
                    display: "block"
                },
                close: {
                    opacity: 1,
                    visibility: "hidden",
                    display: "none"
                }
            }
        },
        init: function(e, i, n) {
            t.extend(!0, this.settings, i, n), this.bindings(i, n)
        },
        events: function() {
            var t = this,
                e = t.S;
            return e(this.scope).off(".reveal").on("click.fndtn.reveal", "[" + this.add_namespace("data-reveal-id") + "]:not([disabled])", function(i) {
                if (i.preventDefault(), !t.locked) {
                    var n = e(this),
                        s = n.data(t.data_attr("reveal-ajax"));
                    if (t.locked = !0, "undefined" == typeof s) t.open.call(t, n);
                    else {
                        var o = s === !0 ? n.attr("href") : s;
                        t.open.call(t, n, {
                            url: o
                        })
                    }
                }
            }), e(i).on("touchend.fndtn.reveal click.fndtn.reveal", this.close_targets(), function(i) {
                if (i.preventDefault(), !t.locked) {
                    var n = e("[" + t.attr_name() + "].open").data(t.attr_name(!0) + "-init"),
                        s = e(i.target)[0] === e("." + n.bg_class)[0];
                    if (s) {
                        if (!n.close_on_background_click) return;
                        i.stopPropagation()
                    }
                    t.locked = !0, t.close.call(t, s ? e("[" + t.attr_name() + "].open") : e(this).closest("[" + t.attr_name() + "]"))
                }
            }), e("[" + t.attr_name() + "]", this.scope).length > 0 ? e(this.scope).on("open.fndtn.reveal", this.settings.open).on("opened.fndtn.reveal", this.settings.opened).on("opened.fndtn.reveal", this.open_video).on("close.fndtn.reveal", this.settings.close).on("closed.fndtn.reveal", this.settings.closed).on("closed.fndtn.reveal", this.close_video) : e(this.scope).on("open.fndtn.reveal", "[" + t.attr_name() + "]", this.settings.open).on("opened.fndtn.reveal", "[" + t.attr_name() + "]", this.settings.opened).on("opened.fndtn.reveal", "[" + t.attr_name() + "]", this.open_video).on("close.fndtn.reveal", "[" + t.attr_name() + "]", this.settings.close).on("closed.fndtn.reveal", "[" + t.attr_name() + "]", this.settings.closed).on("closed.fndtn.reveal", "[" + t.attr_name() + "]", this.close_video), !0
        },
        key_up_on: function() {
            var t = this;
            return t.S("body").off("keyup.fndtn.reveal").on("keyup.fndtn.reveal", function(e) {
                var i = t.S("[" + t.attr_name() + "].open"),
                    n = i.data(t.attr_name(!0) + "-init");
                n && 27 === e.which && n.close_on_esc && !t.locked && t.close.call(t, i)
            }), !0
        },
        key_up_off: function() {
            return this.S("body").off("keyup.fndtn.reveal"), !0
        },
        open: function(e, i) {
            var n, s = this;
            e ? "undefined" != typeof e.selector ? n = s.S("#" + e.data(s.data_attr("reveal-id"))).first() : (n = s.S(this.scope), i = e) : n = s.S(this.scope);
            var o = n.data(s.attr_name(!0) + "-init");
            if (o = o || this.settings, n.hasClass("open") && e.attr("data-reveal-id") == n.attr("id")) return s.close(n);
            if (!n.hasClass("open")) {
                var a = s.S("[" + s.attr_name() + "].open");
                if ("undefined" == typeof n.data("css-top") && n.data("css-top", parseInt(n.css("top"), 10)).data("offset", this.cache_offset(n)), this.key_up_on(n), n.trigger("open").trigger("open.fndtn.reveal"), a.length < 1 && this.toggle_bg(n, !0), "string" == typeof i && (i = {
                    url: i
                }), "undefined" != typeof i && i.url) {
                    var r = "undefined" != typeof i.success ? i.success : null;
                    t.extend(i, {
                        success: function(e, i, l) {
                            t.isFunction(r) && r(e, i, l), n.html(e), s.S(n).foundation("section", "reflow"), s.S(n).children().foundation(), a.length > 0 && s.hide(a, o.css.close), s.show(n, o.css.open)
                        }
                    }), t.ajax(i)
                } else a.length > 0 && this.hide(a, o.css.close), this.show(n, o.css.open)
            }
        },
        close: function(t) {
            var t = t && t.length ? t : this.S(this.scope),
                e = this.S("[" + this.attr_name() + "].open"),
                i = t.data(this.attr_name(!0) + "-init") || this.settings;
            e.length > 0 && (this.locked = !0, this.key_up_off(t), t.trigger("close").trigger("close.fndtn.reveal"), this.toggle_bg(t, !1), this.hide(e, i.css.close, i))
        },
        close_targets: function() {
            var t = "." + this.settings.dismiss_modal_class;
            return this.settings.close_on_background_click ? t + ", ." + this.settings.bg_class : t
        },
        toggle_bg: function(e, i) {
            0 === this.S("." + this.settings.bg_class).length && (this.settings.bg = t("<div />", {
                "class": this.settings.bg_class
            }).appendTo("body").hide());
            var s = this.settings.bg.filter(":visible").length > 0;
            i != s && ((i == n ? s : !i) ? this.hide(this.settings.bg) : this.show(this.settings.bg))
        },
        show: function(i, n) {
            if (n) {
                var o = i.data(this.attr_name(!0) + "-init") || this.settings,
                    a = o.root_element;
                if (0 === i.parent(a).length) {
                    var r = i.wrap('<div style="display: none;" />').parent();
                    i.on("closed.fndtn.reveal.wrapped", function() {
                        i.detach().appendTo(r), i.unwrap().unbind("closed.fndtn.reveal.wrapped")
                    }), i.detach().appendTo(a)
                }
                var l = s(o.animation);
                if (l.animate || (this.locked = !1), l.pop) {
                    n.top = t(e).scrollTop() - i.data("offset") + "px";
                    var c = {
                        top: t(e).scrollTop() + i.data("css-top") + "px",
                        opacity: 1
                    };
                    return setTimeout(function() {
                        return i.css(n).animate(c, o.animation_speed, "linear", function() {
                            this.locked = !1, i.trigger("opened").trigger("opened.fndtn.reveal")
                        }.bind(this)).addClass("open")
                    }.bind(this), o.animation_speed / 2)
                }
                if (l.fade) {
                    n.top = t(e).scrollTop() + i.data("css-top") + "px";
                    var c = {
                        opacity: 1
                    };
                    return setTimeout(function() {
                        return i.css(n).animate(c, o.animation_speed, "linear", function() {
                            this.locked = !1, i.trigger("opened").trigger("opened.fndtn.reveal")
                        }.bind(this)).addClass("open")
                    }.bind(this), o.animation_speed / 2)
                }
                return i.css(n).show().css({
                    opacity: 1
                }).addClass("open").trigger("opened").trigger("opened.fndtn.reveal")
            }
            var o = this.settings;
            return s(o.animation).fade ? i.fadeIn(o.animation_speed / 2) : (this.locked = !1, i.show())
        },
        hide: function(i, n) {
            if (n) {
                var o = i.data(this.attr_name(!0) + "-init");
                o = o || this.settings;
                var a = s(o.animation);
                if (a.animate || (this.locked = !1), a.pop) {
                    var r = {
                        top: -t(e).scrollTop() - i.data("offset") + "px",
                        opacity: 0
                    };
                    return setTimeout(function() {
                        return i.animate(r, o.animation_speed, "linear", function() {
                            this.locked = !1, i.css(n).trigger("closed").trigger("closed.fndtn.reveal")
                        }.bind(this)).removeClass("open")
                    }.bind(this), o.animation_speed / 2)
                }
                if (a.fade) {
                    var r = {
                        opacity: 0
                    };
                    return setTimeout(function() {
                        return i.animate(r, o.animation_speed, "linear", function() {
                            this.locked = !1, i.css(n).trigger("closed").trigger("closed.fndtn.reveal")
                        }.bind(this)).removeClass("open")
                    }.bind(this), o.animation_speed / 2)
                }
                return i.hide().css(n).removeClass("open").trigger("closed").trigger("closed.fndtn.reveal")
            }
            var o = this.settings;
            return s(o.animation).fade ? i.fadeOut(o.animation_speed / 2) : i.hide()
        },
        close_video: function(e) {
            var i = t(".flex-video", e.target),
                n = t("iframe", i);
            n.length > 0 && (n.attr("data-src", n[0].src), n.attr("src", n.attr("src")), i.hide())
        },
        open_video: function(e) {
            var i = t(".flex-video", e.target),
                s = i.find("iframe");
            if (s.length > 0) {
                var o = s.attr("data-src");
                if ("string" == typeof o) s[0].src = s.attr("data-src");
                else {
                    var a = s[0].src;
                    s[0].src = n, s[0].src = a
                }
                i.show()
            }
        },
        data_attr: function(t) {
            return this.namespace.length > 0 ? this.namespace + "-" + t : t
        },
        cache_offset: function(t) {
            var e = t.show().height() + parseInt(t.css("top"), 10);
            return t.hide(), e
        },
        off: function() {
            t(this.scope).off(".fndtn.reveal")
        },
        reflow: function() {}
    }
}(jQuery, window, window.document),
function(t, e) {
    "use strict";
    Foundation.libs.slider = {
        name: "slider",
        version: "5.3.1",
        settings: {
            start: 0,
            end: 100,
            step: 1,
            initial: null,
            display_selector: "",
            vertical: !1,
            on_change: function() {}
        },
        cache: {},
        init: function(t, e, i) {
            Foundation.inherit(this, "throttle"), this.bindings(e, i), this.reflow()
        },
        events: function() {
            var i = this;
            t(this.scope).off(".slider").on("mousedown.fndtn.slider touchstart.fndtn.slider pointerdown.fndtn.slider", "[" + i.attr_name() + "]:not(.disabled, [disabled]) .range-slider-handle", function(e) {
                i.cache.active || (e.preventDefault(), i.set_active_slider(t(e.target)))
            }).on("mousemove.fndtn.slider touchmove.fndtn.slider pointermove.fndtn.slider", function(n) {
                if (i.cache.active)
                    if (n.preventDefault(), t.data(i.cache.active[0], "settings").vertical) {
                        var s = 0;
                        n.pageY || (s = e.scrollY), i.calculate_position(i.cache.active, (n.pageY || n.originalEvent.clientY || n.originalEvent.touches[0].clientY || n.currentPoint.y) + s)
                    } else i.calculate_position(i.cache.active, n.pageX || n.originalEvent.clientX || n.originalEvent.touches[0].clientX || n.currentPoint.x)
            }).on("mouseup.fndtn.slider touchend.fndtn.slider pointerup.fndtn.slider", function() {
                i.remove_active_slider()
            }).on("change.fndtn.slider", function() {
                i.settings.on_change()
            }), i.S(e).on("resize.fndtn.slider", i.throttle(function() {
                i.reflow()
            }, 300))
        },
        set_active_slider: function(t) {
            this.cache.active = t
        },
        remove_active_slider: function() {
            this.cache.active = null
        },
        calculate_position: function(e, i) {
            var n = this,
                s = t.data(e[0], "settings"),
                o = (t.data(e[0], "handle_l"), t.data(e[0], "handle_o"), t.data(e[0], "bar_l")),
                a = t.data(e[0], "bar_o");
            requestAnimationFrame(function() {
                var t;
                t = Foundation.rtl && !s.vertical ? n.limit_to((a + o - i) / o, 0, 1) : n.limit_to((i - a) / o, 0, 1), t = s.vertical ? 1 - t : t;
                var r = n.normalized_value(t, s.start, s.end, s.step);
                n.set_ui(e, r)
            })
        },
        set_ui: function(e, i) {
            var n = t.data(e[0], "settings"),
                s = t.data(e[0], "handle_l"),
                o = t.data(e[0], "bar_l"),
                a = this.normalized_percentage(i, n.start, n.end),
                r = a * (o - s) - 1,
                l = 100 * a;
            Foundation.rtl && !n.vertical && (r = -r), r = n.vertical ? -r + o - s + 1 : r, this.set_translate(e, r, n.vertical), n.vertical ? e.siblings(".range-slider-active-segment").css("height", l + "%") : e.siblings(".range-slider-active-segment").css("width", l + "%"), e.parent().attr(this.attr_name(), i).trigger("change").trigger("change.fndtn.slider"), e.parent().children("input[type=hidden]").val(i), "" != n.input_id && t(n.display_selector).each(function() {
                this.hasOwnProperty("value") ? t(this).val(i) : t(this).text(i)
            })
        },
        normalized_percentage: function(t, e, i) {
            return (t - e) / (i - e)
        },
        normalized_value: function(t, e, i, n) {
            var s = i - e,
                o = t * s,
                a = (o - o % n) / n,
                r = o % n,
                l = r >= .5 * n ? n : 0;
            return a * n + l + e
        },
        set_translate: function(e, i, n) {
            n ? t(e).css("-webkit-transform", "translateY(" + i + "px)").css("-moz-transform", "translateY(" + i + "px)").css("-ms-transform", "translateY(" + i + "px)").css("-o-transform", "translateY(" + i + "px)").css("transform", "translateY(" + i + "px)") : t(e).css("-webkit-transform", "translateX(" + i + "px)").css("-moz-transform", "translateX(" + i + "px)").css("-ms-transform", "translateX(" + i + "px)").css("-o-transform", "translateX(" + i + "px)").css("transform", "translateX(" + i + "px)")
        },
        limit_to: function(t, e, i) {
            return Math.min(Math.max(t, e), i)
        },
        initialize_settings: function(e) {
            var i = t.extend({}, this.settings, this.data_options(t(e).parent()));
            i.vertical ? (t.data(e, "bar_o", t(e).parent().offset().top), t.data(e, "bar_l", t(e).parent().outerHeight()), t.data(e, "handle_o", t(e).offset().top), t.data(e, "handle_l", t(e).outerHeight())) : (t.data(e, "bar_o", t(e).parent().offset().left), t.data(e, "bar_l", t(e).parent().outerWidth()), t.data(e, "handle_o", t(e).offset().left), t.data(e, "handle_l", t(e).outerWidth())), t.data(e, "bar", t(e).parent()), t.data(e, "settings", i)
        },
        set_initial_position: function(e) {
            var i = t.data(e.children(".range-slider-handle")[0], "settings"),
                n = i.initial ? i.initial : Math.floor(.5 * (i.end - i.start) / i.step) * i.step + i.start,
                s = e.children(".range-slider-handle");
            this.set_ui(s, n)
        },
        set_value: function(e) {
            var i = this;
            t("[" + i.attr_name() + "]", this.scope).each(function() {
                t(this).attr(i.attr_name(), e)
            }), t(this.scope).attr(i.attr_name()) && t(this.scope).attr(i.attr_name(), e), i.reflow()
        },
        reflow: function() {
            var e = this;
            e.S("[" + this.attr_name() + "]").each(function() {
                var i = t(this).children(".range-slider-handle")[0],
                    n = t(this).attr(e.attr_name());
                e.initialize_settings(i), n ? e.set_ui(t(i), parseFloat(n)) : e.set_initial_position(t(this))
            })
        }
    }
}(jQuery, window, window.document),
function(t, e, i, n) {
    "use strict";
    Foundation.libs.tab = {
        name: "tab",
        version: "5.3.1",
        settings: {
            active_class: "active",
            callback: function() {},
            deep_linking: !1,
            scroll_to_content: !0,
            is_hover: !1
        },
        default_tab_hashes: [],
        init: function(t, e, i) {
            var n = this,
                s = this.S;
            this.bindings(e, i), this.handle_location_hash_change(), s("[" + this.attr_name() + "] > .active > a", this.scope).each(function() {
                n.default_tab_hashes.push(this.hash)
            })
        },
        events: function() {
            var t = this,
                i = this.S;
            i(this.scope).off(".tab").on("click.fndtn.tab", "[" + this.attr_name() + "] > * > a", function(e) {
                var n = i(this).closest("[" + t.attr_name() + "]").data(t.attr_name(!0) + "-init");
                (!n.is_hover || Modernizr.touch) && (e.preventDefault(), e.stopPropagation(), t.toggle_active_tab(i(this).parent()))
            }).on("mouseenter.fndtn.tab", "[" + this.attr_name() + "] > * > a", function() {
                var e = i(this).closest("[" + t.attr_name() + "]").data(t.attr_name(!0) + "-init");
                e.is_hover && t.toggle_active_tab(i(this).parent())
            }), i(e).on("hashchange.fndtn.tab", function(e) {
                e.preventDefault(), t.handle_location_hash_change()
            })
        },
        handle_location_hash_change: function() {
            var e = this,
                i = this.S;
            i("[" + this.attr_name() + "]", this.scope).each(function() {
                var s = i(this).data(e.attr_name(!0) + "-init");
                if (s.deep_linking) {
                    var o = e.scope.location.hash;
                    if ("" != o) {
                        var a = i(o);
                        if (a.hasClass("content") && a.parent().hasClass("tab-content")) e.toggle_active_tab(t("[" + e.attr_name() + "] > * > a[href=" + o + "]").parent());
                        else {
                            var r = a.closest(".content").attr("id");
                            r != n && e.toggle_active_tab(t("[" + e.attr_name() + "] > * > a[href=#" + r + "]").parent(), o)
                        }
                    } else
                        for (var l in e.default_tab_hashes) e.toggle_active_tab(t("[" + e.attr_name() + "] > * > a[href=" + e.default_tab_hashes[l] + "]").parent())
                }
            })
        },
        toggle_active_tab: function(i, s) {
            var o = this.S,
                a = i.closest("[" + this.attr_name() + "]"),
                r = i.children("a").first(),
                l = "#" + r.attr("href").split("#")[1],
                c = o(l),
                d = i.siblings(),
                u = a.data(this.attr_name(!0) + "-init");
            if (o(this).data(this.data_attr("tab-content")) && (l = "#" + o(this).data(this.data_attr("tab-content")).split("#")[1], c = o(l)), u.deep_linking) {
                var h = t("body,html").scrollTop();
                e.location.hash = s != n ? s : l, u.scroll_to_content ? s == n || s == l ? i.parent()[0].scrollIntoView() : o(l)[0].scrollIntoView() : (s == n || s == l) && t("body,html").scrollTop(h)
            }
            i.addClass(u.active_class).triggerHandler("opened"), d.removeClass(u.active_class), c.siblings().removeClass(u.active_class).end().addClass(u.active_class), u.callback(i), c.triggerHandler("toggled", [i]), a.triggerHandler("toggled", [c])
        },
        data_attr: function(t) {
            return this.namespace.length > 0 ? this.namespace + "-" + t : t
        },
        off: function() {},
        reflow: function() {}
    }
}(jQuery, window, window.document),
function(t, e) {
    "use strict";
    Foundation.libs.tooltip = {
        name: "tooltip",
        version: "5.3.1",
        settings: {
            additional_inheritable_classes: [],
            tooltip_class: ".tooltip",
            append_to: "body",
            touch_close_text: "Tap To Close",
            disable_for_touch: !1,
            hover_delay: 200,
            show_on: "all",
            tip_template: function(t, e) {
                return '<span data-selector="' + t + '" class="' + Foundation.libs.tooltip.settings.tooltip_class.substring(1) + '">' + e + '<span class="nub"></span></span>'
            }
        },
        cache: {},
        init: function(t, e, i) {
            Foundation.inherit(this, "random_str"), this.bindings(e, i)
        },
        should_show: function(e) {
            var i = t.extend({}, this.settings, this.data_options(e));
            return "all" === i.show_on ? !0 : this.small() && "small" === i.show_on ? !0 : this.medium() && "medium" === i.show_on ? !0 : this.large() && "large" === i.show_on ? !0 : !1
        },
        medium: function() {
            return matchMedia(Foundation.media_queries.medium).matches
        },
        large: function() {
            return matchMedia(Foundation.media_queries.large).matches
        },
        events: function(e) {
            var i = this,
                n = i.S;
            i.create(this.S(e)), t(this.scope).off(".tooltip").on("mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip", "[" + this.attr_name() + "]", function(e) {
                var s = n(this),
                    o = t.extend({}, i.settings, i.data_options(s)),
                    a = !1;
                if (Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type) && n(e.target).is("a")) return !1;
                if (/mouse/i.test(e.type) && i.ie_touch(e)) return !1;
                if (s.hasClass("open")) Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type) && e.preventDefault(), i.hide(s);
                else {
                    if (o.disable_for_touch && Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type)) return;
                    !o.disable_for_touch && Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type) && (e.preventDefault(), n(o.tooltip_class + ".open").hide(), a = !0), /enter|over/i.test(e.type) ? this.timer = setTimeout(function() {
                        i.showTip(s)
                    }.bind(this), i.settings.hover_delay) : "mouseout" === e.type || "mouseleave" === e.type ? (clearTimeout(this.timer), i.hide(s)) : i.showTip(s)
                }
            }).on("mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip", "[" + this.attr_name() + "].open", function(e) {
                return /mouse/i.test(e.type) && i.ie_touch(e) ? !1 : void(("touch" != t(this).data("tooltip-open-event-type") || "mouseleave" != e.type) && ("mouse" == t(this).data("tooltip-open-event-type") && /MSPointerDown|touchstart/i.test(e.type) ? i.convert_to_touch(t(this)) : i.hide(t(this))))
            }).on("DOMNodeRemoved DOMAttrModified", "[" + this.attr_name() + "]:not(a)", function() {
                i.hide(n(this))
            })
        },
        ie_touch: function() {
            return !1
        },
        showTip: function(t) {
            var e = this.getTip(t);
            return this.should_show(t, e) ? this.show(t) : void 0
        },
        getTip: function(e) {
            var i = this.selector(e),
                n = t.extend({}, this.settings, this.data_options(e)),
                s = null;
            return i && (s = this.S('span[data-selector="' + i + '"]' + n.tooltip_class)), "object" == typeof s ? s : !1
        },
        selector: function(t) {
            var e = t.attr("id"),
                i = t.attr(this.attr_name()) || t.attr("data-selector");
            return (e && e.length < 1 || !e) && "string" != typeof i && (i = this.random_str(6), t.attr("data-selector", i)), e && e.length > 0 ? e : i
        },
        create: function(i) {
            var n = this,
                s = t.extend({}, this.settings, this.data_options(i)),
                o = this.settings.tip_template;
            "string" == typeof s.tip_template && e.hasOwnProperty(s.tip_template) && (o = e[s.tip_template]);
            var a = t(o(this.selector(i), t("<div></div>").html(i.attr("title")).html())),
                r = this.inheritable_classes(i);
            a.addClass(r).appendTo(s.append_to), Modernizr.touch && (a.append('<span class="tap-to-close">' + s.touch_close_text + "</span>"), a.on("touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip", function() {
                n.hide(i)
            })), i.removeAttr("title").attr("title", "")
        },
        reposition: function(e, i, n) {
            var s, o, a, r, l;
            if (i.css("visibility", "hidden").show(), s = e.data("width"), o = i.children(".nub"), a = o.outerHeight(), r = o.outerHeight(), i.css(this.small() ? {
                width: "100%"
            } : {
                width: s ? s : "auto"
            }), l = function(t, e, i, n, s) {
                return t.css({
                    top: e ? e : "auto",
                    bottom: n ? n : "auto",
                    left: s ? s : "auto",
                    right: i ? i : "auto"
                }).end()
            }, l(i, e.offset().top + e.outerHeight() + 10, "auto", "auto", e.offset().left), this.small()) l(i, e.offset().top + e.outerHeight() + 10, "auto", "auto", 12.5, t(this.scope).width()), i.addClass("tip-override"), l(o, -a, "auto", "auto", e.offset().left);
            else {
                var c = e.offset().left;
                Foundation.rtl && (o.addClass("rtl"), c = e.offset().left + e.outerWidth() - i.outerWidth()), l(i, e.offset().top + e.outerHeight() + 10, "auto", "auto", c), i.removeClass("tip-override"), n && n.indexOf("tip-top") > -1 ? (Foundation.rtl && o.addClass("rtl"), l(i, e.offset().top - i.outerHeight(), "auto", "auto", c).removeClass("tip-override")) : n && n.indexOf("tip-left") > -1 ? (l(i, e.offset().top + e.outerHeight() / 2 - i.outerHeight() / 2, "auto", "auto", e.offset().left - i.outerWidth() - a).removeClass("tip-override"), o.removeClass("rtl")) : n && n.indexOf("tip-right") > -1 && (l(i, e.offset().top + e.outerHeight() / 2 - i.outerHeight() / 2, "auto", "auto", e.offset().left + e.outerWidth() + a).removeClass("tip-override"), o.removeClass("rtl"))
            }
            i.css("visibility", "visible").hide()
        },
        small: function() {
            return matchMedia(Foundation.media_queries.small).matches && !matchMedia(Foundation.media_queries.medium).matches
        },
        inheritable_classes: function(e) {
            var i = t.extend({}, this.settings, this.data_options(e)),
                n = ["tip-top", "tip-left", "tip-bottom", "tip-right", "radius", "round"].concat(i.additional_inheritable_classes),
                s = e.attr("class"),
                o = s ? t.map(s.split(" "), function(e) {
                    return -1 !== t.inArray(e, n) ? e : void 0
                }).join(" ") : "";
            return t.trim(o)
        },
        convert_to_touch: function(e) {
            var i = this,
                n = i.getTip(e),
                s = t.extend({}, i.settings, i.data_options(e));
            0 === n.find(".tap-to-close").length && (n.append('<span class="tap-to-close">' + s.touch_close_text + "</span>"), n.on("click.fndtn.tooltip.tapclose touchstart.fndtn.tooltip.tapclose MSPointerDown.fndtn.tooltip.tapclose", function() {
                i.hide(e)
            })), e.data("tooltip-open-event-type", "touch")
        },
        show: function(t) {
            var e = this.getTip(t);
            "touch" == t.data("tooltip-open-event-type") && this.convert_to_touch(t), this.reposition(t, e, t.attr("class")), t.addClass("open"), e.fadeIn(150)
        },
        hide: function(t) {
            var e = this.getTip(t);
            e.fadeOut(150, function() {
                e.find(".tap-to-close").remove(), e.off("click.fndtn.tooltip.tapclose touchstart.fndtn.tooltip.tapclose MSPointerDown.fndtn.tapclose"), t.removeClass("open")
            })
        },
        off: function() {
            var e = this;
            this.S(this.scope).off(".fndtn.tooltip"), this.S(this.settings.tooltip_class).each(function(i) {
                t("[" + e.attr_name() + "]").eq(i).attr("title", t(this).text())
            }).remove()
        },
        reflow: function() {}
    }
}(jQuery, window, window.document),
function(t, e, i) {
    "use strict";
    Foundation.libs.topbar = {
        name: "topbar",
        version: "5.3.1",
        settings: {
            index: 0,
            sticky_class: "sticky",
            custom_back_text: !0,
            back_text: "Back",
            is_hover: !0,
            scrolltop: !0,
            sticky_on: "all"
        },
        init: function(e, i, n) {
            Foundation.inherit(this, "add_custom_rule register_media throttle");
            var s = this;
            s.register_media("topbar", "foundation-mq-topbar"), this.bindings(i, n), s.S("[" + this.attr_name() + "]", this.scope).each(function() {
                {
                    var e = t(this),
                        i = e.data(s.attr_name(!0) + "-init");
                    s.S("section", this)
                }
                e.data("index", 0);
                var n = e.parent();
                n.hasClass("fixed") || s.is_sticky(e, n, i) ? (s.settings.sticky_class = i.sticky_class, s.settings.sticky_topbar = e, e.data("height", n.outerHeight()), e.data("stickyoffset", n.offset().top)) : e.data("height", e.outerHeight()), i.assembled || s.assemble(e), i.is_hover ? s.S(".has-dropdown", e).addClass("not-click") : s.S(".has-dropdown", e).removeClass("not-click"), s.add_custom_rule(".f-topbar-fixed { padding-top: " + e.data("height") + "px }"), n.hasClass("fixed") && s.S("body").addClass("f-topbar-fixed")
            })
        },
        is_sticky: function(t, e, i) {
            var n = e.hasClass(i.sticky_class);
            return n && "all" === i.sticky_on ? !0 : n && this.small() && "small" === i.sticky_on ? matchMedia(Foundation.media_queries.small).matches && !matchMedia(Foundation.media_queries.medium).matches && !matchMedia(Foundation.media_queries.large).matches : n && this.medium() && "medium" === i.sticky_on ? matchMedia(Foundation.media_queries.small).matches && matchMedia(Foundation.media_queries.medium).matches && !matchMedia(Foundation.media_queries.large).matches : n && this.large() && "large" === i.sticky_on ? matchMedia(Foundation.media_queries.small).matches && matchMedia(Foundation.media_queries.medium).matches && matchMedia(Foundation.media_queries.large).matches : !1
        },
        toggle: function(i) {
            var n, s = this;
            n = i ? s.S(i).closest("[" + this.attr_name() + "]") : s.S("[" + this.attr_name() + "]");
            var o = n.data(this.attr_name(!0) + "-init"),
                a = s.S("section, .section", n);
            s.breakpoint() && (s.rtl ? (a.css({
                right: "0%"
            }), t(">.name", a).css({
                right: "100%"
            })) : (a.css({
                left: "0%"
            }), t(">.name", a).css({
                left: "100%"
            })), s.S("li.moved", a).removeClass("moved"), n.data("index", 0), n.toggleClass("expanded").css("height", "")), o.scrolltop ? n.hasClass("expanded") ? n.parent().hasClass("fixed") && (o.scrolltop ? (n.parent().removeClass("fixed"), n.addClass("fixed"), s.S("body").removeClass("f-topbar-fixed"), e.scrollTo(0, 0)) : n.parent().removeClass("expanded")) : n.hasClass("fixed") && (n.parent().addClass("fixed"), n.removeClass("fixed"), s.S("body").addClass("f-topbar-fixed")) : (s.is_sticky(n, n.parent(), o) && n.parent().addClass("fixed"), n.parent().hasClass("fixed") && (n.hasClass("expanded") ? (n.addClass("fixed"), n.parent().addClass("expanded"), s.S("body").addClass("f-topbar-fixed")) : (n.removeClass("fixed"), n.parent().removeClass("expanded"), s.update_sticky_positioning())))
        },
        timer: null,
        events: function() {
            var i = this,
                n = this.S;
            n(this.scope).off(".topbar").on("click.fndtn.topbar", "[" + this.attr_name() + "] .toggle-topbar", function(t) {
                t.preventDefault(), i.toggle(this)
            }).on("click.fndtn.topbar", '.top-bar .top-bar-section li a[href^="#"],[' + this.attr_name() + '] .top-bar-section li a[href^="#"]', function() {
                var e = t(this).closest("li");
                !i.breakpoint() || e.hasClass("back") || e.hasClass("has-dropdown") || i.toggle()
            }).on("click.fndtn.topbar", "[" + this.attr_name() + "] li.has-dropdown", function(e) {
                var s = n(this),
                    o = n(e.target),
                    a = s.closest("[" + i.attr_name() + "]"),
                    r = a.data(i.attr_name(!0) + "-init");
                return o.data("revealId") ? void i.toggle() : void(i.breakpoint() || (!r.is_hover || Modernizr.touch) && (e.stopImmediatePropagation(), s.hasClass("hover") ? (s.removeClass("hover").find("li").removeClass("hover"), s.parents("li.hover").removeClass("hover")) : (s.addClass("hover"), t(s).siblings().removeClass("hover"), "A" === o[0].nodeName && o.parent().hasClass("has-dropdown") && e.preventDefault())))
            }).on("click.fndtn.topbar", "[" + this.attr_name() + "] .has-dropdown>a", function(t) {
                if (i.breakpoint()) {
                    t.preventDefault();
                    var e = n(this),
                        s = e.closest("[" + i.attr_name() + "]"),
                        o = s.find("section, .section"),
                        a = (e.next(".dropdown").outerHeight(), e.closest("li"));
                    s.data("index", s.data("index") + 1), a.addClass("moved"), i.rtl ? (o.css({
                        right: -(100 * s.data("index")) + "%"
                    }), o.find(">.name").css({
                        right: 100 * s.data("index") + "%"
                    })) : (o.css({
                        left: -(100 * s.data("index")) + "%"
                    }), o.find(">.name").css({
                        left: 100 * s.data("index") + "%"
                    })), s.css("height", e.siblings("ul").outerHeight(!0) + s.data("height"))
                }
            }), n(e).off(".topbar").on("resize.fndtn.topbar", i.throttle(function() {
                i.resize.call(i)
            }, 50)).trigger("resize").trigger("resize.fndtn.topbar"), n("body").off(".topbar").on("click.fndtn.topbar touchstart.fndtn.topbar", function(t) {
                var e = n(t.target).closest("li").closest("li.hover");
                e.length > 0 || n("[" + i.attr_name() + "] li.hover").removeClass("hover")
            }), n(this.scope).on("click.fndtn.topbar", "[" + this.attr_name() + "] .has-dropdown .back", function(t) {
                t.preventDefault();
                var e = n(this),
                    s = e.closest("[" + i.attr_name() + "]"),
                    o = s.find("section, .section"),
                    a = (s.data(i.attr_name(!0) + "-init"), e.closest("li.moved")),
                    r = a.parent();
                s.data("index", s.data("index") - 1), i.rtl ? (o.css({
                    right: -(100 * s.data("index")) + "%"
                }), o.find(">.name").css({
                    right: 100 * s.data("index") + "%"
                })) : (o.css({
                    left: -(100 * s.data("index")) + "%"
                }), o.find(">.name").css({
                    left: 100 * s.data("index") + "%"
                })), 0 === s.data("index") ? s.css("height", "") : s.css("height", r.outerHeight(!0) + s.data("height")), setTimeout(function() {
                    a.removeClass("moved")
                }, 300)
            })
        },
        resize: function() {
            var t = this;
            t.S("[" + this.attr_name() + "]").each(function() {
                var e, n = t.S(this),
                    s = n.data(t.attr_name(!0) + "-init"),
                    o = n.parent("." + t.settings.sticky_class);
                if (!t.breakpoint()) {
                    var a = n.hasClass("expanded");
                    n.css("height", "").removeClass("expanded").find("li").removeClass("hover"), a && t.toggle(n)
                }
                t.is_sticky(n, o, s) && (o.hasClass("fixed") ? (o.removeClass("fixed"), e = o.offset().top, t.S(i.body).hasClass("f-topbar-fixed") && (e -= n.data("height")), n.data("stickyoffset", e), o.addClass("fixed")) : (e = o.offset().top, n.data("stickyoffset", e)))
            })
        },
        breakpoint: function() {
            return !matchMedia(Foundation.media_queries.topbar).matches
        },
        small: function() {
            return matchMedia(Foundation.media_queries.small).matches
        },
        medium: function() {
            return matchMedia(Foundation.media_queries.medium).matches
        },
        large: function() {
            return matchMedia(Foundation.media_queries.large).matches
        },
        assemble: function(e) {
            var i = this,
                n = e.data(this.attr_name(!0) + "-init"),
                s = i.S("section", e);
            s.detach(), i.S(".has-dropdown>a", s).each(function() {
                {
                    var e, s = i.S(this),
                        o = s.siblings(".dropdown");
                    s.attr("href")
                }
                o.find(".title.back").length || (e = t('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5></li>'), t("h5>a", e).html(1 == n.custom_back_text ? n.back_text : "&laquo; " + s.html()), o.prepend(e))
            }), s.appendTo(e), this.sticky(), this.assembled(e)
        },
        assembled: function(e) {
            e.data(this.attr_name(!0), t.extend({}, e.data(this.attr_name(!0)), {
                assembled: !0
            }))
        },
        height: function(e) {
            var i = 0,
                n = this;
            return t("> li", e).each(function() {
                i += n.S(this).outerHeight(!0)
            }), i
        },
        sticky: function() {
            var t = this;
            this.S(e).on("scroll", function() {
                t.update_sticky_positioning()
            })
        },
        update_sticky_positioning: function() {
            var t = "." + this.settings.sticky_class,
                i = this.S(e),
                n = this;
            if (n.settings.sticky_topbar && n.is_sticky(this.settings.sticky_topbar, this.settings.sticky_topbar.parent(), this.settings)) {
                var s = this.settings.sticky_topbar.data("stickyoffset");
                n.S(t).hasClass("expanded") || (i.scrollTop() > s ? n.S(t).hasClass("fixed") || (n.S(t).addClass("fixed"), n.S("body").addClass("f-topbar-fixed")) : i.scrollTop() <= s && n.S(t).hasClass("fixed") && (n.S(t).removeClass("fixed"), n.S("body").removeClass("f-topbar-fixed")))
            }
        },
        off: function() {
            this.S(this.scope).off(".fndtn.topbar"), this.S(e).off(".fndtn.topbar")
        },
        reflow: function() {}
    }
}(jQuery, this, this.document),
function(t, e) {
    "use strict";
    Foundation.libs.equalizer = {
        name: "equalizer",
        version: "5.3.1",
        settings: {
            use_tallest: !0,
            before_height_change: t.noop,
            after_height_change: t.noop,
            equalize_on_stack: !1
        },
        init: function(t, e, i) {
            Foundation.inherit(this, "image_loaded"), this.bindings(e, i), this.reflow()
        },
        events: function() {
            this.S(e).off(".equalizer").on("resize.fndtn.equalizer", function() {
                this.reflow()
            }.bind(this))
        },
        equalize: function(e) {
            var i = !1,
                n = e.find("[" + this.attr_name() + "-watch]:visible"),
                s = e.data(this.attr_name(!0) + "-init");
            if (0 !== n.length) {
                var o = n.first().offset().top;
                if (s.before_height_change(), e.trigger("before-height-change").trigger("before-height-change.fndth.equalizer"), n.height("inherit"), n.each(function() {
                    var e = t(this);
                    e.offset().top !== o && (i = !0)
                }), s.equalize_on_stack !== !1 || !i) {
                    var a = n.map(function() {
                        return t(this).outerHeight(!1)
                    }).get();
                    if (s.use_tallest) {
                        var r = Math.max.apply(null, a);
                        n.css("height", r)
                    } else {
                        var l = Math.min.apply(null, a);
                        n.css("height", l)
                    }
                    s.after_height_change(), e.trigger("after-height-change").trigger("after-height-change.fndtn.equalizer")
                }
            }
        },
        reflow: function() {
            var e = this;
            this.S("[" + this.attr_name() + "]", this.scope).each(function() {
                var i = t(this);
                e.image_loaded(e.S("img", this), function() {
                    e.equalize(i)
                })
            })
        }
    }
}(jQuery, window, window.document),
function() {}.call(this), $(document).foundation({
    orbit: {
        bullets: !1,
        slide_number: !1
    }
}), $(document).on("open.fndtn.reveal", "[data-reveal]", function() {
    $(this);
    $("#hero").addClass("hero-open")
}), $(document).on("close.fndtn.reveal", "[data-reveal]", function() {
    $(this);
    $("#hero").removeClass("hero-open")
});