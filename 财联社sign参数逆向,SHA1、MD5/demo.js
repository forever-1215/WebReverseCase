const CryptoJS = require('crypto-js')
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
r = function(e, t, n) {
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
_r = {
    "rn": 20,
    "lastTime": 1748266102,
    "subscribedColumnIds": "",
    "hasFirstVipArticle": "1",
    "os": "web",
    "sv": "8.4.6",
    "app": "CailianpressWeb"
}
// console.log(a({},_r))
function s(e) {
    return e.filter((function(e) {
        return e
    }
    )).join("&")
}
function u(e) {
    return Object.keys(e).sort()
}
function sync(e) {
    return CryptoJS.SHA1(e).toString()
}
wordsToBytes = function(e) {
    for (var t = [], n = 0; n < 32 * e.length; n += 8)
        t.push(e[n >>> 5] >>> 24 - n % 32 & 255);
    return t
}
bytesToHex = function(e) {
    for (var t = [], n = 0; n < e.length; n++)
        t.push((e[n] >>> 4).toString(16)),
        t.push((15 & e[n]).toString(16));
    return t.join("")
}
n_stringToBytes = function(e) {
    for (var t = [], n = 0; n < e.length; n++)
        t.push(255 & e.charCodeAt(n));
    return t
}
stringToBytes = function(e) {
    return n_stringToBytes(unescape(encodeURIComponent(e)))
}
bytesToWords = function(e) {
    for (var t = [], n = 0, r = 0; n < e.length; n++,
    r += 8)
        t[r >>> 5] |= e[n] << 24 - r % 32;
    return t
}
_ff = function(e, t, n, r, o, i, a) {
    var u = e + (t & n | ~t & r) + (o >>> 0) + a;
    return (u << i | u >>> 32 - i) + t
}

_gg = function(e, t, n, r, o, i, a) {
    var u = e + (t & r | n & ~r) + (o >>> 0) + a;
    return (u << i | u >>> 32 - i) + t
}

_hh = function(e, t, n, r, o, i, a) {
    var u = e + (t ^ n ^ r) + (o >>> 0) + a;
    return (u << i | u >>> 32 - i) + t
}

_ii = function(e, t, n, r, o, i, a) {
    var u = e + (n ^ (t | ~r)) + (o >>> 0) + a;
    return (u << i | u >>> 32 - i) + t
}
rotl = function(e, t) {
    return e << t | e >>> 32 - t
}
rotr = function(e, t) {
    return e << 32 - t | e >>> t
}
endian = function(e) {
    if (e.constructor == Number)
        return 16711935 & rotl(e, 8) | 4278255360 & rotl(e, 24);
    for (var t = 0; t < e.length; t++)
        e[t] = endian(e[t]);
    return e
}
_a = function(e, n) {
    e.constructor == String ? e = n && "binary" === n.encoding ? i.stringToBytes(e) : stringToBytes(e) : o(e) ? e = Array.prototype.slice.call(e, 0) : Array.isArray(e) || (e = e.toString());
    for (var u = bytesToWords(e), s = 8 * e.length, c = 1732584193, f = -271733879, p = -1732584194, l = 271733878, h = 0; h < u.length; h++)
        u[h] = 16711935 & (u[h] << 8 | u[h] >>> 24) | 4278255360 & (u[h] << 24 | u[h] >>> 8);
    u[s >>> 5] |= 128 << s % 32,
    u[14 + (s + 64 >>> 9 << 4)] = s;
    var d = _ff
      , y = _gg
      , v = _hh
      , m = _ii;
    for (h = 0; h < u.length; h += 16) {
        var g = c
          , w = f
          , b = p
          , x = l;
        c = d(c, f, p, l, u[h + 0], 7, -680876936),
        l = d(l, c, f, p, u[h + 1], 12, -389564586),
        p = d(p, l, c, f, u[h + 2], 17, 606105819),
        f = d(f, p, l, c, u[h + 3], 22, -1044525330),
        c = d(c, f, p, l, u[h + 4], 7, -176418897),
        l = d(l, c, f, p, u[h + 5], 12, 1200080426),
        p = d(p, l, c, f, u[h + 6], 17, -1473231341),
        f = d(f, p, l, c, u[h + 7], 22, -45705983),
        c = d(c, f, p, l, u[h + 8], 7, 1770035416),
        l = d(l, c, f, p, u[h + 9], 12, -1958414417),
        p = d(p, l, c, f, u[h + 10], 17, -42063),
        f = d(f, p, l, c, u[h + 11], 22, -1990404162),
        c = d(c, f, p, l, u[h + 12], 7, 1804603682),
        l = d(l, c, f, p, u[h + 13], 12, -40341101),
        p = d(p, l, c, f, u[h + 14], 17, -1502002290),
        c = y(c, f = d(f, p, l, c, u[h + 15], 22, 1236535329), p, l, u[h + 1], 5, -165796510),
        l = y(l, c, f, p, u[h + 6], 9, -1069501632),
        p = y(p, l, c, f, u[h + 11], 14, 643717713),
        f = y(f, p, l, c, u[h + 0], 20, -373897302),
        c = y(c, f, p, l, u[h + 5], 5, -701558691),
        l = y(l, c, f, p, u[h + 10], 9, 38016083),
        p = y(p, l, c, f, u[h + 15], 14, -660478335),
        f = y(f, p, l, c, u[h + 4], 20, -405537848),
        c = y(c, f, p, l, u[h + 9], 5, 568446438),
        l = y(l, c, f, p, u[h + 14], 9, -1019803690),
        p = y(p, l, c, f, u[h + 3], 14, -187363961),
        f = y(f, p, l, c, u[h + 8], 20, 1163531501),
        c = y(c, f, p, l, u[h + 13], 5, -1444681467),
        l = y(l, c, f, p, u[h + 2], 9, -51403784),
        p = y(p, l, c, f, u[h + 7], 14, 1735328473),
        c = v(c, f = y(f, p, l, c, u[h + 12], 20, -1926607734), p, l, u[h + 5], 4, -378558),
        l = v(l, c, f, p, u[h + 8], 11, -2022574463),
        p = v(p, l, c, f, u[h + 11], 16, 1839030562),
        f = v(f, p, l, c, u[h + 14], 23, -35309556),
        c = v(c, f, p, l, u[h + 1], 4, -1530992060),
        l = v(l, c, f, p, u[h + 4], 11, 1272893353),
        p = v(p, l, c, f, u[h + 7], 16, -155497632),
        f = v(f, p, l, c, u[h + 10], 23, -1094730640),
        c = v(c, f, p, l, u[h + 13], 4, 681279174),
        l = v(l, c, f, p, u[h + 0], 11, -358537222),
        p = v(p, l, c, f, u[h + 3], 16, -722521979),
        f = v(f, p, l, c, u[h + 6], 23, 76029189),
        c = v(c, f, p, l, u[h + 9], 4, -640364487),
        l = v(l, c, f, p, u[h + 12], 11, -421815835),
        p = v(p, l, c, f, u[h + 15], 16, 530742520),
        c = m(c, f = v(f, p, l, c, u[h + 2], 23, -995338651), p, l, u[h + 0], 6, -198630844),
        l = m(l, c, f, p, u[h + 7], 10, 1126891415),
        p = m(p, l, c, f, u[h + 14], 15, -1416354905),
        f = m(f, p, l, c, u[h + 5], 21, -57434055),
        c = m(c, f, p, l, u[h + 12], 6, 1700485571),
        l = m(l, c, f, p, u[h + 3], 10, -1894986606),
        p = m(p, l, c, f, u[h + 10], 15, -1051523),
        f = m(f, p, l, c, u[h + 1], 21, -2054922799),
        c = m(c, f, p, l, u[h + 8], 6, 1873313359),
        l = m(l, c, f, p, u[h + 15], 10, -30611744),
        p = m(p, l, c, f, u[h + 6], 15, -1560198380),
        f = m(f, p, l, c, u[h + 13], 21, 1309151649),
        c = m(c, f, p, l, u[h + 4], 6, -145523070),
        l = m(l, c, f, p, u[h + 11], 10, -1120210379),
        p = m(p, l, c, f, u[h + 2], 15, 718787259),
        f = m(f, p, l, c, u[h + 9], 21, -343485551),
        c = c + g >>> 0,
        f = f + w >>> 0,
        p = p + b >>> 0,
        l = l + x >>> 0
    }
    return endian([c, f, p, l])
};

function o(e, n) {
    if (void 0 === e || null === e)
        throw new Error("Illegal argument " + e);
    var r = wordsToBytes(_a(e, n));
    return n && n.asBytes ? r : n && n.asString ? i.bytesToString(r) : bytesToHex(r)
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
    return t = sync(t),
    // t = o(t)
    t = CryptoJS.MD5(t).toString()
}
function get_sign(obj) {
    return p(a({},obj))
}
// sign = p(a({},_r))
// console.log(sign)