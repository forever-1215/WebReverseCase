window = global;
const JSEncrypt = require('jsencrypt')
function encrypt(n) {
    var e, t = "e98ae8878c264a7e";
    function r(n) {
        if (/^[\x00-\x7f]*$/.test(n))
            return n;
        for (var e = [], t = n.length, r = 0, i = 0; r < t; ++r,
        ++i) {
            var o = n.charCodeAt(r);
            if (o < 128)
                e[i] = n.charAt(r);
            else if (o < 2048)
                e[i] = String.fromCharCode(192 | o >> 6, 128 | 63 & o);
            else {
                if (!(o < 55296 || o > 57343)) {
                    if (r + 1 < t) {
                        var a = n.charCodeAt(r + 1);
                        if (o < 56320 && 56320 <= a && a <= 57343) {
                            var s = 65536 + ((1023 & o) << 10 | 1023 & a);
                            e[i] = String.fromCharCode(240 | s >> 18 & 63, 128 | s >> 12 & 63, 128 | s >> 6 & 63, 128 | 63 & s),
                            ++r;
                            continue
                        }
                    }
                    throw new Error("Malformed string")
                }
                e[i] = String.fromCharCode(224 | o >> 12, 128 | o >> 6 & 63, 128 | 63 & o)
            }
        }
        return e.join("")
    }
    function i(n) {
        return 4294967295 & n
    }
    function o(n, e, t, r, i, o) {
        return (t >>> 5 ^ e << 2) + (e >>> 3 ^ t << 4) ^ (n ^ e) + (o[3 & r ^ i] ^ t)
    }
    function a(n, e) {
        var t, r = n.length, i = r >> 2;
        0 != (3 & r) && ++i,
        e ? (t = new Array(i + 1))[i] = r : t = new Array(i);
        for (var o = 0; o < r; ++o)
            t[o >> 2] |= n.charCodeAt(o) << ((3 & o) << 3);
        return t
    }
    return null == n || 0 === n.length ? n : (n = r(n),
    t = r(t),
    function(n, e) {
        var t = n.length
          , r = t << 2;
        if (e) {
            var i = n[t - 1];
            if (i < (r -= 4) - 3 || i > r)
                return null;
            r = i
        }
        for (var o = 0; o < t; o++)
            n[o] = String.fromCharCode(255 & n[o], n[o] >>> 8 & 255, n[o] >>> 16 & 255, n[o] >>> 24 & 255);
        var a = n.join("");
        return e ? a.substring(0, r) : a
    }(function(n, e) {
        var t, r, a, s, c, l, d = n.length, u = d - 1;
        for (r = n[u],
        a = 0,
        l = 0 | Math.floor(6 + 52 / d); l > 0; --l) {
            for (s = (a = i(a + 2654435769)) >>> 2 & 3,
            c = 0; c < u; ++c)
                t = n[c + 1],
                r = n[c] = i(n[c] + o(a, t, r, c, s, e));
            t = n[0],
            r = n[u] = i(n[u] + o(a, t, r, u, s, e))
        }
        return n
    }(a(n, !0), ((e = a(t, !1)).length < 4 && (e.length = 4),
    e)), !1))
}
base64Encode = function(n) {
        // if (window.btoa)
        //     return window.btoa(n);
    var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
    return function(n) {
        var t, r, i, o, a, s, c;
        for (r = i = 0,
        o = n.length,
        s = (o -= a = o % 3) / 3 << 2,
        a > 0 && (s += 4),
        t = new Array(s); r < o; )
            c = n.charCodeAt(r++) << 16 | n.charCodeAt(r++) << 8 | n.charCodeAt(r++),
            t[i++] = e[c >> 18] + e[c >> 12 & 63] + e[c >> 6 & 63] + e[63 & c];
        return 1 == a ? (c = n.charCodeAt(r++),
        t[i++] = e[c >> 2] + e[(3 & c) << 4] + "==") : 2 == a && (c = n.charCodeAt(r++) << 8 | n.charCodeAt(r++),
        t[i++] = e[c >> 10] + e[c >> 4 & 63] + e[(15 & c) << 2] + "="),
        t.join("")
    }(n)
}
// console.log(base64Encode(encrypt("appid=201802274651|ctxid=923fc4f5d227fb772d80ca17dd144624|a=12140545349|p=xxoo123456|r=0.7014155756194319")))
function get_init_request(appid,captchaContextId,account, password) {
    u = "appid=" + appid + "|ctxid=" + captchaContextId + "|a=" + account + "|p=" + password + "|r=" + Math.random()
    return base64Encode(encrypt(u))
}
function get_first_wugan_request(appid,captchaContextId,account, password) {
    // "appid=201802274651|ctxid=16e0f99b4641bd26f04445c9742e51e4|type=init|u=|d=75,1,0:74,4,15:74,7,31:73,10,47:73,13,63:73,14,79|a=12340545349|p=xxoo123456|t=719|r=0.428411529814801"
    u = "appid=" + appid + "|ctxid=" + captchaContextId + "|type=init|u=|d=96,2,0:94,4,14:92,8,31:90,12,46:87,15,62:85,18,78:84,19,95" + "|a=" + account + "|p=" + password + "|t=" + 423 + "|r=" + Math.random()
    return base64Encode(encrypt(u))
}
function get_vertify_slide_request(appid,captchaContextId,account, password,trace_str,total_time,distance) {
    u = "appid=" + appid + "|ctxid=" + captchaContextId + `|type=slide|u=${distance}|d=${trace_str}|a=${account}|p=${password}|t=${total_time}|r=${Math.random()}`
    return base64Encode(encrypt(u))
}
function get_rsapassword(password) {
    var encryptor = new JSEncrypt()
    encryptor.setPublicKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBgxenWGQrynpHxvRsnlXWBFCrGhf3eES3/aajLV+oceh1m4xZyUSA5mMoRvdvfmo+snVPuGPTwzz4MP1xLSgEtcQRzl1atza0Kt106HBKihKqhqJsLTSRE0xiGcZJMPpcpho/xLI+T3nmsHwQTMQD+TAgmzLBnffs6Hoart6FPQIDAQAB")
    var rsaPassword = encryptor.encrypt(password)
    return rsaPassword
}

// console.log(get_rsapassword("xxoo123456"))