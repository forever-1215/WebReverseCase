const CryptoJS = require('crypto-js')
_r = {
    "rn": 20,
    "lastTime": 1748302867,
    "subscribedColumnIds": "",
    "hasFirstVipArticle": "1",
    "os": "web",
    "sv": "8.4.6",
    "app": "CailianpressWeb"
}
function i(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter((function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
        }
        ))),
        n.push.apply(n, r)
    }
    return n
}
function r(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n,
    e
}
function a(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? i(Object(n), !0).forEach((function(t) {
            r(e, t, n[t])
        }
        )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : i(Object(n)).forEach((function(t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
        }
        ))
    }
    return e
}
function s(e) {
    return e.filter((function(e) {
        return e
    }
    )).join("&")
}
function u(e) {
    return Object.keys(e).sort()
}
function c(e, t) {
    var n = typeof t
      , r = null;
    return t === r ? r = i ? r : "".concat(a(e), "=").concat(r) : /string|number|boolean/.test(n) ? r = "".concat(a(e), "=").concat(a(t)) : Array.isArray(t) ? r = function(e, t) {
        return t.length ? s(t.map((function(t, n) {
            return c("".concat(e, "[").concat(n, "]"), t)
        }
        ))) : a("".concat(e, "[]"))
    }(e, t) : "object" === n && (r = function(e, t) {
        return s(u(t).map((function(n) {
            return c("".concat(e, "[").concat(n, "]"), t[n])
        }
        )))
    }(e, t)),
    r
}
function p(e) {
    var t = e && s(u(e).map((function(t) {
        return c(t, e[t])
    }
    )));
    return t = CryptoJS.SHA1(t).toString(),
    t = CryptoJS.MD5(t).toString()
}
function get_sign(para_obj) {
    return p(a({}, para_obj))
}
// sign = p(a({}, _r))
// console.log(sign)