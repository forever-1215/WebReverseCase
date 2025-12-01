const crypto = require('crypto')
function from(t, e, r) {
    encoder = new TextEncoder(e);
    return encoder.encode(t);
}

function fun2(e, n, o) {
    var d = "";
    n = from(n, "utf8"),
    o = from(o, "utf8");
    var c = crypto.createDecipheriv("aes-128-cbc", n, o);
    return d += c.update(e, "hex", "utf8"),
    d += c.final("utf8")
}

function fun1(e, path, n, r) {
    var s = n.s
      , d = n.k
      , f = n.l
      , v = n.d
      , h = n.sort
      , k = n.num
      , y = function(content, t, e) {
        for (var a = Array.from(content), n = Array.from(t), r = a.length, o = n.length, d = String.fromCodePoint, i = 0; i < r; i++)
            a[i] = d(a[i].codePointAt(0) ^ n[(i + e) % o].codePointAt(0));
        return a.join("")
    }(function(s, t, path, e) {
        return [s, t, e, path].join("(&&)")
    }(function(t, e) {
        var n = t;
        if (true) {
            var r = [];
            for (var d in n)
                Array.isArray(n[d]) && "get" === e && (n[d] = n[d].join("")),
                "post" === e && (m()(n[d]) || o()(n[d])) && (n[d] = JSON.stringify(n[d])),
                r.push(n[d]);
            return r.sort(),
            r.join("")
        }
    }(e, r), parseInt((new Date).getTime() / 1e3) - 655876800 - v, path, h), fun2(s, d, f), k);
    return btoa(y)
}
let n = {
    "proxy": "/app",
    "target": "",
    "sort": "dd",
    "num": 10,
    "s": "c676db5162c0ad5cb9dc617bea63867b",
    "k": "7ef540dfd32d8ef0",
    "l": "1c3a8c6c7088809b",
    "d": -1
}
r = {
    "market_id": 1,
    "genre_id": 135,
    "country_id": 75,
    "device_id": 1,
    "page": 1,
    "time": 1745324909,
    "rank_type": 1,
    "brand_id": 2
}
path = '/v1/rank'
o = fun1(r, path, {
    s: n.s,
    k: n.k,
    l: n.l,
    d: n.d,
    sort: n.sort,
    num: n.num
}, "get")


k = o;
console.log(k)