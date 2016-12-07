! function (e, n, t, o, r, a) {
    function i(e, n) {
        var t = typeof e[n];
        return "function" == t || !("object" != t || !e[n]) || "unknown" == t
    }

    function s(e, n) {
        return !("object" != typeof e[n] || !e[n])
    }

    function c(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }

    function l() {
        var e = "Shockwave Flash",
            n = "application/x-shockwave-flash";
        if (!w(navigator.plugins) && "object" == typeof navigator.plugins[e]) {
            var t = navigator.plugins[e].description;
            t && !w(navigator.mimeTypes) && navigator.mimeTypes[n] && navigator.mimeTypes[n].enabledPlugin && (N = t.match(/\d+/g))
        }
        if (!N) {
            var o;
            try {
                o = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), N = Array.prototype.slice.call(o.GetVariable("$version").match(/(\d+),(\d+),(\d+),(\d+)/), 1), o = null
            } catch (r) { }
        }
        if (!N) return !1;
        var a = parseInt(N[0], 10),
            i = parseInt(N[1], 10);
        return I = a > 9 && i > 0, !0
    }

    function u() {
        if (!z) {
            z = !0;
            for (var e = 0; e < X.length; e++) X[e]();
            X.length = 0
        }
    }

    function d(e, n) {
        return z ? void e.call(n) : void X.push(function () {
            e.call(n)
        })
    }

    function p() {
        var e = parent;
        if ("" !== j)
            for (var n = 0, t = j.split(".") ; n < t.length; n++) e = e[t[n]];
        return e.easyXDM
    }

    function f(n) {
        return e.easyXDM = W, j = n, j && (B = "easyXDM_" + j.replace(".", "_") + "_"), L
    }

    function h(e) {
        return e.match(P)[3]
    }

    function g(e) {
        return e.match(P)[4] || ""
    }

    function m(e) {
        var n = e.toLowerCase().match(P),
            t = n[2],
            o = n[3],
            r = n[4] || "";
        return ("http:" == t && ":80" == r || "https:" == t && ":443" == r) && (r = ""), t + "//" + o + r
    }

    function v(e) {
        if (e = e.replace(H, "$1/"), !e.match(/^(http||https):\/\//)) {
            var n = "/" === e.substring(0, 1) ? "" : t.pathname;
            "/" !== n.substring(n.length - 1) && (n = n.substring(0, n.lastIndexOf("/") + 1)), e = t.protocol + "//" + t.host + n + e
        }
        for (; F.test(e) ;) e = e.replace(F, "");
        return e
    }

    function y(e, n) {
        var t = "",
            o = e.indexOf("#"); -1 !== o && (t = e.substring(o), e = e.substring(0, o));
        var r = [];
        for (var i in n) n.hasOwnProperty(i) && r.push(i + "=" + a(n[i]));
        return e + (U ? "#" : -1 == e.indexOf("?") ? "?" : "&") + r.join("&") + t
    }

    function w(e) {
        return void 0 === e
    }

    function k(e, n, t) {
        var o;
        for (var r in n) n.hasOwnProperty(r) && (r in e ? (o = n[r], "object" == typeof o ? k(e[r], o, t) : t || (e[r] = n[r])) : e[r] = n[r]);
        return e
    }

    function _() {
        var e = n.body.appendChild(n.createElement("form")),
            t = e.appendChild(n.createElement("input"));
        t.name = B + "TEST" + E, T = t !== e.elements[t.name], n.body.removeChild(e)
    }

    function b(e) {
        w(T) && _();
        var t;
        T ? t = n.createElement('<iframe name="' + e.props.name + '"/>') : (t = n.createElement("IFRAME"), t.name = e.props.name), t.id = t.name = e.props.name, delete e.props.name, "string" == typeof e.container && (e.container = n.getElementById(e.container)), e.container || (k(t.style, {
            position: "absolute",
            top: "-2000px",
            left: "0px"
        }), e.container = n.body);
        var o = e.props.src;
        if (e.props.src = "javascript:false", k(t, e.props), t.border = t.frameBorder = 0, t.allowTransparency = !0, e.container.appendChild(t), e.onLoad && C(t, "load", e.onLoad), e.usePost) {
            var r, a = e.container.appendChild(n.createElement("form"));
            if (a.target = t.name, a.action = o, a.method = "POST", "object" == typeof e.usePost)
                for (var i in e.usePost) e.usePost.hasOwnProperty(i) && (T ? r = n.createElement('<input name="' + i + '"/>') : (r = n.createElement("INPUT"), r.name = i), r.value = e.usePost[i], a.appendChild(r));
            a.submit(), a.parentNode.removeChild(a)
        } else t.src = o;
        return e.props.src = o, t
    }

    function O(e, n) {
        "string" == typeof e && (e = [e]);
        for (var t, o = e.length; o--;)
            if (t = e[o], t = RegExp("^" == t.substr(0, 1) ? t : "^" + t.replace(/(\*)/g, ".$1").replace(/\?/g, ".") + "$"), t.test(n)) return !0;
        return !1
    }

    function x(o) {
        var r, a = o.protocol;
        if (o.isHost = o.isHost || w(q.xdm_p), U = o.hash || !1, o.props || (o.props = {}), o.isHost) o.remote = v(o.remote), o.channel = o.channel || "default" + E++, o.secret = Math.random().toString(16).substring(2), w(a) && (a = m(t.href) == m(o.remote) ? "4" : i(e, "postMessage") || i(n, "postMessage") ? "1" : o.swf && i(e, "ActiveXObject") && l() ? "6" : "Gecko" === navigator.product && "frameElement" in e && -1 == navigator.userAgent.indexOf("WebKit") ? "5" : o.remoteHelper ? "2" : "0");
        else if (o.channel = q.xdm_c.replace(/["'<>\\]/g, ""), o.secret = q.xdm_s, o.remote = q.xdm_e.replace(/["'<>\\]/g, ""), a = q.xdm_p, o.acl && !O(o.acl, o.remote)) throw Error("Access denied for " + o.remote);
        switch (o.protocol = a, a) {
            case "0":
                if (k(o, {
                    interval: 100,
                    delay: 2e3,
                    useResize: !0,
                    useParent: !1,
                    usePolling: !1
                }, !0), o.isHost) {
                    if (!o.local) {
                        for (var s, c = t.protocol + "//" + t.host, u = n.body.getElementsByTagName("img"), d = u.length; d--;)
                            if (s = u[d], s.src.substring(0, c.length) === c) {
                                o.local = s.src;
                                break
                            }
                        o.local || (o.local = e)
                    }
                    var p = {
                        xdm_c: o.channel,
                        xdm_p: 0
                    };
                    o.local === e ? (o.usePolling = !0, o.useParent = !0, o.local = t.protocol + "//" + t.host + t.pathname + t.search, p.xdm_e = o.local, p.xdm_pa = 1) : p.xdm_e = v(o.local), o.container && (o.useResize = !1, p.xdm_po = 1), o.remote = y(o.remote, p)
                } else k(o, {
                    channel: q.xdm_c,
                    remote: q.xdm_e,
                    useParent: !w(q.xdm_pa),
                    usePolling: !w(q.xdm_po),
                    useResize: o.useParent ? !1 : o.useResize
                });
                r = [new L.stack.HashTransport(o), new L.stack.ReliableBehavior({}), new L.stack.QueueBehavior({
                    encode: !0,
                    maxLength: 4e3 - o.remote.length
                }), new L.stack.VerifyBehavior({
                    initiate: o.isHost
                })];
                break;
            case "1":
                r = [new L.stack.PostMessageTransport(o)];
                break;
            case "2":
                o.isHost && (o.remoteHelper = v(o.remoteHelper)), r = [new L.stack.NameTransport(o), new L.stack.QueueBehavior, new L.stack.VerifyBehavior({
                    initiate: o.isHost
                })];
                break;
            case "3":
                r = [new L.stack.NixTransport(o)];
                break;
            case "4":
                r = [new L.stack.SameOriginTransport(o)];
                break;
            case "5":
                r = [new L.stack.FrameElementTransport(o)];
                break;
            case "6":
                N || l(), r = [new L.stack.FlashTransport(o)]
        }
        return r.push(new L.stack.QueueBehavior({
            lazy: o.lazy,
            remove: !0
        })), r
    }

    function M(e) {
        for (var n, t = {
            incoming: function (e, n) {
                    this.up.incoming(e, n)
        },
            outgoing: function (e, n) {
                    this.down.outgoing(e, n)
        },
            callback: function (e) {
                    this.up.callback(e)
        },
            init: function () {
                    this.down.init()
        },
            destroy: function () {
                    this.down.destroy()
        }
        }, o = 0, r = e.length; r > o; o++) n = e[o], k(n, t, !0), 0 !== o && (n.down = e[o - 1]), o !== r - 1 && (n.up = e[o + 1]);
        return n
    }

    function S(e) {
        e.up.down = e.down, e.down.up = e.up, e.up = e.down = null
    }
    var T, N, I, C, A, D = this,
        E = Math.floor(1e4 * Math.random()),
        R = Function.prototype,
        P = /^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/,
        F = /[\-\w]+\/\.\.\//,
        H = /([^:])\/\//g,
        j = "",
        L = {},
        W = e.easyXDM,
        B = "easyXDM_",
        U = !1;
    if (i(e, "addEventListener")) C = function (e, n, t) {
        e.addEventListener(n, t, !1)
    }, A = function (e, n, t) {
        e.removeEventListener(n, t, !1)
    };
    else {
        if (!i(e, "attachEvent")) throw Error("Browser not supported");
        C = function (e, n, t) {
            e.attachEvent("on" + n, t)
        }, A = function (e, n, t) {
            e.detachEvent("on" + n, t)
        }
    }
    var J, z = !1,
        X = [];
    if ("readyState" in n ? (J = n.readyState, z = "complete" == J || ~navigator.userAgent.indexOf("AppleWebKit/") && ("loaded" == J || "interactive" == J)) : z = !!n.body, !z) {
        if (i(e, "addEventListener")) C(n, "DOMContentLoaded", u);
        else if (C(n, "readystatechange", function () {
                "complete" == n.readyState && u()
        }), n.documentElement.doScroll && e === top) {
            var V = function () {
                if (!z) {
                    try {
                        n.documentElement.doScroll("left")
                    } catch (e) {
                        return void o(V, 1)
                    }
                    u()
                }
            };
            V()
        }
        C(e, "load", u)
    }
    var q = function (e) {
        e = e.substring(1).split("&");
        for (var n, t = {}, o = e.length; o--;) n = e[o].split("="), t[n[0]] = r(n[1]);
        return t
    }(/xdm_e=/.test(t.search) ? t.search : t.hash),
        G = function () {
            var e = {},
                n = {
                    a: [1, 2, 3]
                },
                t = '{"a":[1,2,3]}';
            return "undefined" != typeof JSON && "function" == typeof JSON.stringify && JSON.stringify(n).replace(/\s/g, "") === t ? JSON : (Object.toJSON && Object.toJSON(n).replace(/\s/g, "") === t && (e.stringify = Object.toJSON), "function" == typeof String.prototype.evalJSON && (n = t.evalJSON(), n.a && 3 === n.a.length && 3 === n.a[2] && (e.parse = function (e) {
                return e.evalJSON()
            })), e.stringify && e.parse ? (G = function () {
                return e
            }, e) : null)
        };
    k(L, {
        version: "2.4.19.3",
        query: q,
        stack: {},
        apply: k,
        getJSONObject: G,
        whenReady: d,
        noConflict: f
    }), L.DomHelper = {
        on: C,
        un: A,
        requiresJSON: function (t) {
            s(e, "JSON") || n.write('<script type="text/javascript" src="' + t + '"></script>')
        }
    },
        function () {
            var e = {};
            L.Fn = {
                set: function (n, t) {
                    e[n] = t
                },
                get: function (n, t) {
                    if (e.hasOwnProperty(n)) {
                        var o = e[n];
                        return t && delete e[n], o
                    }
                }
            }
        }(), L.Socket = function (e) {
            var n = M(x(e).concat([{
                incoming: function (n, t) {
                    e.onMessage(n, t)
                },
                callback: function (n) {
                    e.onReady && e.onReady(n)
                }
            }])),
                t = m(e.remote);
            this.origin = m(e.remote), this.destroy = function () {
                n.destroy()
            }, this.postMessage = function (e) {
                n.outgoing(e, t)
            }, n.init()
        }, L.Rpc = function (e, n) {
            if (n.local)
                for (var t in n.local)
                    if (n.local.hasOwnProperty(t)) {
                        var o = n.local[t];
                        "function" == typeof o && (n.local[t] = {
                            method: o
                        })
                    }
            var r = M(x(e).concat([new L.stack.RpcBehavior(this, n), {
                callback: function (n) {
                    e.onReady && e.onReady(n)
                }
            }]));
            this.origin = m(e.remote), this.destroy = function () {
                r.destroy()
            }, r.init()
        }, L.stack.SameOriginTransport = function (e) {
            var n, r, a, i;
            return n = {
                outgoing: function (e, n, t) {
                    a(e), t && t()
                },
                destroy: function () {
                    r && (r.parentNode.removeChild(r), r = null)
                },
                onDOMReady: function () {
                    i = m(e.remote), e.isHost ? (k(e.props, {
                        src: y(e.remote, {
                            xdm_e: t.protocol + "//" + t.host + t.pathname,
                            xdm_c: e.channel,
                            xdm_p: 4
                        }),
                        name: B + e.channel + "_provider"
                    }), r = b(e), L.Fn.set(e.channel, function (e) {
                        return a = e, o(function () {
                            n.up.callback(!0)
                        }, 0),
                            function (e) {
                                n.up.incoming(e, i)
                            }
                    })) : (a = p().Fn.get(e.channel, !0)(function (e) {
                        n.up.incoming(e, i)
                    }), o(function () {
                        n.up.callback(!0)
                    }, 0))
                },
                init: function () {
                    d(n.onDOMReady, n)
                }
            }
        }, L.stack.FlashTransport = function (e) {
            function r(e) {
                o(function () {
                    s.up.incoming(e, l)
                }, 0)
            }

            function i(t) {
                var o = e.swf + "?host=" + e.isHost,
                    r = "easyXDM_swf_" + Math.floor(1e4 * Math.random());
                L.Fn.set("flash_loaded" + t.replace(/[\-.]/g, "_"), function () {
                    L.stack.FlashTransport[t].swf = u = p.firstChild;
                    for (var e = L.stack.FlashTransport[t].queue, n = 0; n < e.length; n++) e[n]();
                    e.length = 0
                }), e.swfContainer ? p = "string" == typeof e.swfContainer ? n.getElementById(e.swfContainer) : e.swfContainer : (p = n.createElement("div"), k(p.style, I && e.swfNoThrottle ? {
                    height: "20px",
                    width: "20px",
                    position: "fixed",
                    right: 0,
                    top: 0
                } : {
                    height: "1px",
                    width: "1px",
                    position: "absolute",
                    overflow: "hidden",
                    right: 0,
                    top: 0
                }), n.body.appendChild(p));
                var i = "callback=flash_loaded" + a(t.replace(/[\-.]/g, "_")) + "&proto=" + D.location.protocol + "&domain=" + a(h(D.location.href)) + "&port=" + a(g(D.location.href)) + "&ns=" + a(j);
                p.innerHTML = "<object height='20' width='20' type='application/x-shockwave-flash' id='" + r + "' data='" + o + "'><param name='allowScriptAccess' value='always'></param><param name='wmode' value='transparent'><param name='movie' value='" + o + "'></param><param name='flashvars' value='" + i + "'></param><embed type='application/x-shockwave-flash' FlashVars='" + i + "' allowScriptAccess='always' wmode='transparent' src='" + o + "' height='1' width='1'></embed></object>"
            }
            var s, c, l, u, p;
            return s = {
                outgoing: function (n, t, o) {
                    u.postMessage(e.channel, "" + n), o && o()
                },
                destroy: function () {
                    try {
                        u.destroyChannel(e.channel)
                    } catch (n) { }
                    u = null, c && (c.parentNode.removeChild(c), c = null)
                },
                onDOMReady: function () {
                    l = e.remote, L.Fn.set("flash_" + e.channel + "_init", function () {
                        o(function () {
                            s.up.callback(!0)
                        })
                    }), L.Fn.set("flash_" + e.channel + "_onMessage", r), e.swf = v(e.swf);
                    var n = h(e.swf),
                        a = function () {
                            L.stack.FlashTransport[n].init = !0, u = L.stack.FlashTransport[n].swf, u.createChannel(e.channel, e.secret, m(e.remote), e.isHost), e.isHost && (I && e.swfNoThrottle && k(e.props, {
                                position: "fixed",
                                right: 0,
                                top: 0,
                                height: "20px",
                                width: "20px"
                            }), k(e.props, {
                                src: y(e.remote, {
                                    xdm_e: m(t.href),
                                    xdm_c: e.channel,
                                    xdm_p: 6,
                                    xdm_s: e.secret
                                }),
                                name: B + e.channel + "_provider"
                            }), c = b(e))
                        };
                    L.stack.FlashTransport[n] && L.stack.FlashTransport[n].init ? a() : L.stack.FlashTransport[n] ? L.stack.FlashTransport[n].queue.push(a) : (L.stack.FlashTransport[n] = {
                        queue: [a]
                    }, i(n))
                },
                init: function () {
                    d(s.onDOMReady, s)
                }
            }
        }, L.stack.PostMessageTransport = function (n) {
            function r(e) {
                if (e.origin) return m(e.origin);
                if (e.uri) return m(e.uri);
                if (e.domain) return t.protocol + "//" + e.domain;
                throw "Unable to retrieve the origin of the event"
            }

            function a(e) {
                var t = r(e);
                t == l && e.data.substring(0, n.channel.length + 1) == n.channel + " " && i.up.incoming(e.data.substring(n.channel.length + 1), t)
            }
            var i, s, c, l;
            return i = {
                outgoing: function (e, t, o) {
                    c.postMessage(n.channel + " " + e, t || l), o && o()
                },
                destroy: function () {
                    A(e, "message", a), s && (c = null, s.parentNode.removeChild(s), s = null)
                },
                onDOMReady: function () {
                    if (l = m(n.remote), n.isHost) {
                        var r = function (t) {
                            t.data == n.channel + "-ready" && (c = "postMessage" in s.contentWindow ? s.contentWindow : s.contentWindow.document, A(e, "message", r), C(e, "message", a), o(function () {
                                i.up.callback(!0)
                            }, 0))
                        };
                        C(e, "message", r), k(n.props, {
                            src: y(n.remote, {
                                xdm_e: m(t.href),
                                xdm_c: n.channel,
                                xdm_p: 1
                            }),
                            name: B + n.channel + "_provider"
                        }), s = b(n)
                    } else C(e, "message", a), c = "postMessage" in e.parent ? e.parent : e.parent.document, c.postMessage(n.channel + "-ready", l), o(function () {
                        i.up.callback(!0)
                    }, 0)
                },
                init: function () {
                    d(i.onDOMReady, i)
                }
            }
        }, L.stack.FrameElementTransport = function (r) {
            var a, i, s, c;
            return a = {
                outgoing: function (e, n, t) {
                    s.call(this, e), t && t()
                },
                destroy: function () {
                    i && (i.parentNode.removeChild(i), i = null)
                },
                onDOMReady: function () {
                    c = m(r.remote), r.isHost ? (k(r.props, {
                        src: y(r.remote, {
                            xdm_e: m(t.href),
                            xdm_c: r.channel,
                            xdm_p: 5
                        }),
                        name: B + r.channel + "_provider"
                    }), i = b(r), i.fn = function (e) {
                        return delete i.fn, s = e, o(function () {
                            a.up.callback(!0)
                        }, 0),
                            function (e) {
                                a.up.incoming(e, c)
                            }
                    }) : (n.referrer && m(n.referrer) != q.xdm_e && (e.top.location = q.xdm_e), s = e.frameElement.fn(function (e) {
                        a.up.incoming(e, c)
                    }), a.up.callback(!0))
                },
                init: function () {
                    d(a.onDOMReady, a)
                }
            }
        }, L.stack.NameTransport = function (e) {
            function n(n) {
                var t = e.remoteHelper + (s ? "#_3" : "#_2") + e.channel;
                c.contentWindow.sendMessage(n, t)
            }

            function t() {
                s ? 2 !== ++u && s || i.up.callback(!0) : (n("ready"), i.up.callback(!0))
            }

            function r(e) {
                i.up.incoming(e, f)
            }

            function a() {
                p && o(function () {
                    p(!0)
                }, 0)
            }
            var i, s, c, l, u, p, f, h;
            return i = {
                outgoing: function (e, t, o) {
                    p = o, n(e)
                },
                destroy: function () {
                    c.parentNode.removeChild(c), c = null, s && (l.parentNode.removeChild(l), l = null)
                },
                onDOMReady: function () {
                    s = e.isHost, u = 0, f = m(e.remote), e.local = v(e.local), s ? (L.Fn.set(e.channel, function (n) {
                        s && "ready" === n && (L.Fn.set(e.channel, r), t())
                    }), h = y(e.remote, {
                        xdm_e: e.local,
                        xdm_c: e.channel,
                        xdm_p: 2
                    }), k(e.props, {
                        src: h + "#" + e.channel,
                        name: B + e.channel + "_provider"
                    }), l = b(e)) : (e.remoteHelper = e.remote, L.Fn.set(e.channel, r));
                    var n = function () {
                        var r = c || this;
                        A(r, "load", n), L.Fn.set(e.channel + "_load", a),
                            function i() {
                                "function" == typeof r.contentWindow.sendMessage ? t() : o(i, 50)
                            }()
                    };
                    c = b({
                        props: {
                            src: e.local + "#_4" + e.channel
                        },
                        onLoad: n
                    })
                },
                init: function () {
                    d(i.onDOMReady, i)
                }
            }
        }, L.stack.HashTransport = function (n) {
            function t(e) {
                if (g) {
                    var t = n.remote + "#" + f++ + "_" + e;
                    (c || !v ? g.contentWindow : g).location = t
                }
            }

            function r(e) {
                p = e, s.up.incoming(p.substring(p.indexOf("_") + 1), y)
            }

            function a() {
                if (h) {
                    var e = h.location.href,
                        n = "",
                        t = e.indexOf("#"); -1 != t && (n = e.substring(t)), n && n != p && r(n)
                }
            }

            function i() {
                l = setInterval(a, u)
            }
            var s, c, l, u, p, f, h, g, v, y;
            return s = {
                outgoing: function (e) {
                    t(e)
                },
                destroy: function () {
                    e.clearInterval(l), (c || !v) && g.parentNode.removeChild(g), g = null
                },
                onDOMReady: function () {
                    if (c = n.isHost, u = n.interval, p = "#" + n.channel, f = 0, v = n.useParent, y = m(n.remote), c) {
                        if (k(n.props, {
                            src: n.remote,
                            name: B + n.channel + "_provider"
                        }), v) n.onLoad = function () {
                            h = e, i(), s.up.callback(!0)
                        };
                        else {
                            var t = 0,
                                r = n.delay / 50;
                            ! function a() {
                                if (++t > r) throw Error("Unable to reference listenerwindow");
                                try {
                                    h = g.contentWindow.frames[B + n.channel + "_consumer"]
                                } catch (e) { }
                                h ? (i(), s.up.callback(!0)) : o(a, 50)
                            }()
                        }
                        g = b(n)
                    } else h = e, i(), v ? (g = parent, s.up.callback(!0)) : (k(n, {
                        props: {
                            src: n.remote + "#" + n.channel + new Date,
                            name: B + n.channel + "_consumer"
                        },
                        onLoad: function () {
                            s.up.callback(!0)
                        }
                    }), g = b(n))
                },
                init: function () {
                    d(s.onDOMReady, s)
                }
            }
        }, L.stack.ReliableBehavior = function () {
            var e, n, t = 0,
                o = 0,
                r = "";
            return e = {
                incoming: function (a, i) {
                    var s = a.indexOf("_"),
                        c = a.substring(0, s).split(",");
                    a = a.substring(s + 1), c[0] == t && (r = "", n && n(!0)), a.length > 0 && (e.down.outgoing(c[1] + "," + t + "_" + r, i), o != c[1] && (o = c[1], e.up.incoming(a, i)))
                },
                outgoing: function (a, i, s) {
                    r = a, n = s, e.down.outgoing(o + "," + ++t + "_" + a, i)
                }
            }
        }, L.stack.QueueBehavior = function (e) {
            function n() {
                if (e.remove && 0 === s.length) return void S(t);
                if (!c && 0 !== s.length && !i) {
                    c = !0;
                    var r = s.shift();
                    t.down.outgoing(r.data, r.origin, function (e) {
                        c = !1, r.callback && o(function () {
                            r.callback(e)
                        }, 0), n()
                    })
                }
            }
            var t, i, s = [],
                c = !0,
                l = "",
                u = 0,
                d = !1,
                p = !1;
            return t = {
                init: function () {
                    w(e) && (e = {}), e.maxLength && (u = e.maxLength, p = !0), e.lazy ? d = !0 : t.down.init()
                },
                callback: function (e) {
                    c = !1;
                    var o = t.up;
                    n(), o.callback(e)
                },
                incoming: function (n, o) {
                    if (p) {
                        var a = n.indexOf("_"),
                            i = parseInt(n.substring(0, a), 10);
                        l += n.substring(a + 1), 0 === i && (e.encode && (l = r(l)), t.up.incoming(l, o), l = "")
                    } else t.up.incoming(n, o)
                },
                outgoing: function (o, r, i) {
                    e.encode && (o = a(o));
                    var c, l = [];
                    if (p) {
                        for (; 0 !== o.length;) c = o.substring(0, u), o = o.substring(c.length), l.push(c);
                        for (; c = l.shift() ;) s.push({
                            data: l.length + "_" + c,
                            origin: r,
                            callback: 0 === l.length ? i : null
                        })
                    } else s.push({
                        data: o,
                        origin: r,
                        callback: i
                    });
                    d ? t.down.init() : n()
                },
                destroy: function () {
                    i = !0, t.down.destroy()
                }
            }
        }, L.stack.VerifyBehavior = function (e) {
            function n() {
                o = Math.random().toString(16).substring(2), t.down.outgoing(o)
            }
            var t, o, r;
            return t = {
                incoming: function (a, i) {
                    var s = a.indexOf("_"); -1 === s ? a === o ? t.up.callback(!0) : r || (r = a, e.initiate || n(), t.down.outgoing(a)) : a.substring(0, s) === r && t.up.incoming(a.substring(s + 1), i)
                },
                outgoing: function (e, n, r) {
                    t.down.outgoing(o + "_" + e, n, r)
                },
                callback: function () {
                    e.initiate && n()
                }
            }
        }, L.stack.RpcBehavior = function (e, n) {
            function t(e) {
                e.jsonrpc = "2.0", a.down.outgoing(i.stringify(e))
            }

            function o(e, n) {
                var o = Array.prototype.slice;
                return function () {
                    var r, a = arguments.length,
                        i = {
                            method: n
                        };
                    a > 0 && "function" == typeof arguments[a - 1] ? (a > 1 && "function" == typeof arguments[a - 2] ? (r = {
                        success: arguments[a - 2],
                        error: arguments[a - 1]
                    }, i.params = o.call(arguments, 0, a - 2)) : (r = {
                        success: arguments[a - 1]
                    }, i.params = o.call(arguments, 0, a - 1)), l["" + ++s] = r, i.id = s) : i.params = o.call(arguments, 0), e.namedParams && 1 === i.params.length && (i.params = i.params[0]), t(i)
                }
            }

            function r(e, n, o, r) {
                if (!o) return void (n && t({
                    id: n,
                    error: {
                        code: -32601,
                        message: "Procedure not found."
                    }
                }));
                var a, i;
                n ? (a = function (e) {
                    a = R, t({
                        id: n,
                        result: e
                    })
                }, i = function (e, o) {
                    i = R;
                    var r = {
                        id: n,
                        error: {
                            code: -32099,
                            message: e
                        }
                    };
                    o && (r.error.data = o), t(r)
                }) : a = i = R, c(r) || (r = [r]);
                try {
                    var s = o.method.apply(o.scope, r.concat([a, i]));
                    w(s) || a(s)
                } catch (l) {
                    i(l.message)
                }
            }
            var a, i = n.serializer || G(),
                s = 0,
                l = {};
            return a = {
                incoming: function (e) {
                    var o = i.parse(e);
                    if (o.method) n.handle ? n.handle(o, t) : r(o.method, o.id, n.local[o.method], o.params);
                    else {
                        var a = l[o.id];
                        o.error ? a.error && a.error(o.error) : a.success && a.success(o.result), delete l[o.id]
                    }
                },
                init: function () {
                    if (n.remote)
                        for (var t in n.remote) n.remote.hasOwnProperty(t) && (e[t] = o(n.remote[t], t));
                    a.down.init()
                },
                destroy: function () {
                    for (var t in n.remote) n.remote.hasOwnProperty(t) && e.hasOwnProperty(t) && delete e[t];
                    a.down.destroy()
                }
            }
        }, D.easyXDM = L
}(window, document, location, window.setTimeout, decodeURIComponent, encodeURIComponent), "undefined" == typeof SongkickWidget && (SongkickWidget = {}), SongkickWidget.Injector = function () {
    this._widgetAnchor = document.querySelector("a.songkick-widget"), this._widgetAnchor && (this._detectStyle = "true" === this._widgetAnchor.getAttribute("data-detect-style"), this._detectStyle && (this._parentStyle = window.getComputedStyle(this._widgetAnchor.parentNode)))
}, SongkickWidget.Injector.prototype = {
    CUSTOM_OPTIONS_WHITELIST: ["background-color", "font-color", "font-family", "font-size", "font-weight", "other-artists", "theme", "text-shadow", "text-transform", "track-button"],
    getCustomOptions: function () {
        var e = "";
        if (!this._widgetAnchor) return e;
        for (var n = 0; n < this.CUSTOM_OPTIONS_WHITELIST.length; n++) {
            var t = this.CUSTOM_OPTIONS_WHITELIST[n],
                o = this._widgetAnchor.getAttribute("data-" + t);
            !o && this._detectStyle && this._parentStyle && (cssProperty = "font-color" === t ? "color" : t, o = this._parentStyle.getPropertyValue(cssProperty)), o && (e += "&" + t + "=" + encodeURIComponent(o))
        }
        return e
    },
    PRODUCTION_DOMAIN: "www.songkick.com",
    STAGING_DOMAIN: "www.staging.songkick.net",
    DEV_DOMAIN: "dev.staging.songkick.net",
    getRequestInformation: function (e) {
        var n = RegExp("^https?://(" + [this.PRODUCTION_DOMAIN, this.STAGING_DOMAIN, this.DEV_DOMAIN].join("|") + ")/(artists|users|venues)/([0-9a-zA-Z-+._]+|[0-9]+)$"),
            t = n.exec(e);
        if (t) {
            var o = "";
            switch (t[1]) {
                case this.PRODUCTION_DOMAIN:
                    o = "widget.songkick.com";
                    break;
                case this.STAGING_DOMAIN:
                    o = "widget.staging.songkick.net";
                    break;
                case this.DEV_DOMAIN:
                    o = "widget-dev.staging.songkick.net"
            }
            var r = null,
                a = null;
            switch (t[2]) {
                case "venues":
                    r = "venue", a = t[3].match(/^\d+/)[0];
                    break;
                case "users":
                    r = "username", a = t[3];
                    break;
                case "artists":
                    r = "artist", a = t[3].match(/^\d+/)[0]
            }
            var i = {
                targetDomain: o,
                stagingEnv: !!o.match(/staging\.songkick\.net/),
                resourceType: r,
                resourceId: a
            };
            return i
        }
        return null
    },
    loadIFrame: function () {
        if (this._widgetAnchor) {
            var e = this.getRequestInformation(this._widgetAnchor.href);
            if (e) {
                var n = this._widgetAnchor.style.width;
                n || (n = "100%");
                var t = this._widgetAnchor.textContent || this._widgetAnchor.innerText;
                t || (t = "");
                var o = document.createElement("div");
                this._widgetAnchor.parentNode.replaceChild(o, this._widgetAnchor);
                var r = e.resourceType,
                    a = e.resourceId,
                    i = "https:" == document.location.protocol ? "https:" : "http:",
                    s = e.targetDomain,
                    c = i + "//" + s + "/songkick-widget.html?" + r + "=" + encodeURIComponent(a) + "&header=" + encodeURIComponent(t) + this.getCustomOptions();
                e.stagingEnv && (c += "&staging=true"), new easyXDM.Socket({
                    remote: c,
                    container: o,
                    hash: !0,
                    channel: a + "_" + Math.floor(1e4 * Math.random() + 1),
                    swf: i + "//" + s + "/easyxdm.swf",
                    props: {
                        className: "songkick-widget",
                        style: {
                            width: n
                        }
                    },
                    onMessage: function (e) {
                        var n = o.firstChild;
                        n.style.height = e + "px"
                    }
                })
            }
        }
    }
},
    function () {
        var e = new SongkickWidget.Injector;
        e.loadIFrame()
    }();