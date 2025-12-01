

bin_stringToBytes =  function(t) {
    for (var e = [], r = 0; r < t.length; r++)
        e.push(255 & t.charCodeAt(r));
    return e
},

stringToBytes = function(t) {
    return bin_stringToBytes(unescape(encodeURIComponent(t)))
}

bytesToWords = function(t) {
    for (var e = [], r = 0, n = 0; r < t.length; r++,
    n += 8)
        e[n >>> 5] |= t[r] << 24 - n % 32;
    return e
},

rotl =  function(t, e) {
    return t << e | t >>> 32 - e
},
endian = function(t) {
    if (t.constructor == Number)
        return 16711935 & rotl(t, 8) | 4278255360 & rotl(t, 24);
    for (var e = 0; e < t.length; e++)
        t[e] = endian(t[e]);
    return t
},
s = function(t, r) {
    t.constructor == String ? t = r && "binary" === r.encoding ? i.stringToBytes(t) : stringToBytes(t) : o(t) ? t = Array.prototype.slice.call(t, 0) : Array.isArray(t) || t.constructor === Uint8Array || (t = t.toString());
    for (var a = bytesToWords(t), u = 8 * t.length, c = 1732584193, f = -271733879, h = -1732584194, l = 271733878, p = 0; p < a.length; p++)
        a[p] = 16711935 & (a[p] << 8 | a[p] >>> 24) | 4278255360 & (a[p] << 24 | a[p] >>> 8);
    a[u >>> 5] |= 128 << u % 32,
    a[14 + (u + 64 >>> 9 << 4)] = u;
    var d = s._ff
      , y = s._gg
      , v = s._hh
      , b = s._ii;
    for (p = 0; p < a.length; p += 16) {
        var g = c
          , m = f
          , _ = h
          , w = l;
        c = d(c, f, h, l, a[p + 0], 7, -680876936),
        l = d(l, c, f, h, a[p + 1], 12, -389564586),
        h = d(h, l, c, f, a[p + 2], 17, 606105819),
        f = d(f, h, l, c, a[p + 3], 22, -1044525330),
        c = d(c, f, h, l, a[p + 4], 7, -176418897),
        l = d(l, c, f, h, a[p + 5], 12, 1200080426),
        h = d(h, l, c, f, a[p + 6], 17, -1473231341),
        f = d(f, h, l, c, a[p + 7], 22, -45705983),
        c = d(c, f, h, l, a[p + 8], 7, 1770035416),
        l = d(l, c, f, h, a[p + 9], 12, -1958414417),
        h = d(h, l, c, f, a[p + 10], 17, -42063),
        f = d(f, h, l, c, a[p + 11], 22, -1990404162),
        c = d(c, f, h, l, a[p + 12], 7, 1804603682),
        l = d(l, c, f, h, a[p + 13], 12, -40341101),
        h = d(h, l, c, f, a[p + 14], 17, -1502002290),
        c = y(c, f = d(f, h, l, c, a[p + 15], 22, 1236535329), h, l, a[p + 1], 5, -165796510),
        l = y(l, c, f, h, a[p + 6], 9, -1069501632),
        h = y(h, l, c, f, a[p + 11], 14, 643717713),
        f = y(f, h, l, c, a[p + 0], 20, -373897302),
        c = y(c, f, h, l, a[p + 5], 5, -701558691),
        l = y(l, c, f, h, a[p + 10], 9, 38016083),
        h = y(h, l, c, f, a[p + 15], 14, -660478335),
        f = y(f, h, l, c, a[p + 4], 20, -405537848),
        c = y(c, f, h, l, a[p + 9], 5, 568446438),
        l = y(l, c, f, h, a[p + 14], 9, -1019803690),
        h = y(h, l, c, f, a[p + 3], 14, -187363961),
        f = y(f, h, l, c, a[p + 8], 20, 1163531501),
        c = y(c, f, h, l, a[p + 13], 5, -1444681467),
        l = y(l, c, f, h, a[p + 2], 9, -51403784),
        h = y(h, l, c, f, a[p + 7], 14, 1735328473),
        c = v(c, f = y(f, h, l, c, a[p + 12], 20, -1926607734), h, l, a[p + 5], 4, -378558),
        l = v(l, c, f, h, a[p + 8], 11, -2022574463),
        h = v(h, l, c, f, a[p + 11], 16, 1839030562),
        f = v(f, h, l, c, a[p + 14], 23, -35309556),
        c = v(c, f, h, l, a[p + 1], 4, -1530992060),
        l = v(l, c, f, h, a[p + 4], 11, 1272893353),
        h = v(h, l, c, f, a[p + 7], 16, -155497632),
        f = v(f, h, l, c, a[p + 10], 23, -1094730640),
        c = v(c, f, h, l, a[p + 13], 4, 681279174),
        l = v(l, c, f, h, a[p + 0], 11, -358537222),
        h = v(h, l, c, f, a[p + 3], 16, -722521979),
        f = v(f, h, l, c, a[p + 6], 23, 76029189),
        c = v(c, f, h, l, a[p + 9], 4, -640364487),
        l = v(l, c, f, h, a[p + 12], 11, -421815835),
        h = v(h, l, c, f, a[p + 15], 16, 530742520),
        c = b(c, f = v(f, h, l, c, a[p + 2], 23, -995338651), h, l, a[p + 0], 6, -198630844),
        l = b(l, c, f, h, a[p + 7], 10, 1126891415),
        h = b(h, l, c, f, a[p + 14], 15, -1416354905),
        f = b(f, h, l, c, a[p + 5], 21, -57434055),
        c = b(c, f, h, l, a[p + 12], 6, 1700485571),
        l = b(l, c, f, h, a[p + 3], 10, -1894986606),
        h = b(h, l, c, f, a[p + 10], 15, -1051523),
        f = b(f, h, l, c, a[p + 1], 21, -2054922799),
        c = b(c, f, h, l, a[p + 8], 6, 1873313359),
        l = b(l, c, f, h, a[p + 15], 10, -30611744),
        h = b(h, l, c, f, a[p + 6], 15, -1560198380),
        f = b(f, h, l, c, a[p + 13], 21, 1309151649),
        c = b(c, f, h, l, a[p + 4], 6, -145523070),
        l = b(l, c, f, h, a[p + 11], 10, -1120210379),
        h = b(h, l, c, f, a[p + 2], 15, 718787259),
        f = b(f, h, l, c, a[p + 9], 21, -343485551),
        c = c + g >>> 0,
        f = f + m >>> 0,
        h = h + _ >>> 0,
        l = l + w >>> 0
    }
    return endian([c, f, h, l])
};

s._ff = function(t, e, r, n, o, i, s) {
    var a = t + (e & r | ~e & n) + (o >>> 0) + s;
    return (a << i | a >>> 32 - i) + e
}
s._gg = function(t, e, r, n, o, i, s) {
    var a = t + (e & n | r & ~n) + (o >>> 0) + s;
    return (a << i | a >>> 32 - i) + e
}
,
s._hh = function(t, e, r, n, o, i, s) {
    var a = t + (e ^ r ^ n) + (o >>> 0) + s;
    return (a << i | a >>> 32 - i) + e
}
,
s._ii = function(t, e, r, n, o, i, s) {
    var a = t + (r ^ (e | ~n)) + (o >>> 0) + s;
    return (a << i | a >>> 32 - i) + e
}
wordsToBytes = function(t) {
    for (var e = [], r = 0; r < 32 * t.length; r += 8)
        e.push(t[r >>> 5] >>> 24 - r % 32 & 255);
    return e
},

bytesToHex = function(t) {
    for (var e = [], r = 0; r < t.length; r++)
        e.push((t[r] >>> 4).toString(16)),
        e.push((15 & t[r]).toString(16));
    return e.join("")
},


u= function(t, r) {
    if (void 0 === t || null === t)
        throw new Error("Illegal argument " + t);
    var n = wordsToBytes(s(t, r));
    return r && r.asBytes ? n : r && r.asString ? i.bytesToString(n) : bytesToHex(n)
}
function c_inner(t) {
    return "".concat(t ? Object.keys(t).sort().reduce((function(e, r) {
        var n = t[r];
        if (void 0 === n)
            return e;
        if (Number.isNaN(n) && (n = ""),
        Array.isArray(n)) {
            if (0 === n.length)
                return "".concat(e).concat(r);
            var o = n.sort().map((function(t) {
                return t instanceof Object ? JSON.stringify(t) : t
            }
            )).reduce((function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ""
                  , e = arguments.length > 1 ? arguments[1] : void 0;
                return t + (t ? "," : "") + e
            }
            ));
            return "".concat(e).concat(r).concat(o)
        }
        return n instanceof Object ? e + r + JSON.stringify(n) : e + r + n.toString()
    }
    ), "") : "", "048a9c4943398714b356a696503d2d36")
}

function c(t) {
    return u(c_inner(t))
}

function get_sign(para_obj) {
    return c(para_obj)
}

// para_obj = {
//     "pickRuleId": 644451,
//     "pageNum": 1,
//     "pageSize": 24,
//     "filterUnbid": true,
//     "showCspu": true
// }
// console.log(get_sign(para_obj))
// 'a7b0921781cd9bbc21e7604d7e0364a6'
// 'a7b0921781cd9bbc21e7604d7e0364a6'