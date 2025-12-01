const CryptoJS = require('crypto-js')
const acky6QolJSJi = "dLRSzDrm8xkryEyL";//AESkey，可自定义
const  acixHVhiNqmK = "fex6AA4zRfVrSPmr";//密钥偏移量IV，可自定义

const  dskQCqpdBOGo = "hEaIOlrX7tlhAOkz";//DESkey，可自定义
const  dsiqYiQHbZQp = "xMBwDXG1HOubUV04";//密钥偏移量IV，可自定义

const  ask4u6FbhGV8 = "a0QHmC1Ova5958nC";//AESkey，可自定义
const  asi2hhkBUJbo = "bMu71lHRX6bRmPxU";//密钥偏移量IV，可自定义
function rstr2hex(input) {
    try {
        hexcase
    } catch (e) {
        hexcase = 0
    }
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var output = "";
    var x;
    for (var i = 0; i < input.length; i++) {
        x = input.charCodeAt(i);
        output += hex_tab.charAt((x >>> 4) & 0x0F) + hex_tab.charAt(x & 0x0F)
    }
    return output
}
function binl2rstr(input) {
    var output = "";
    for (var i = 0; i < input.length * 32; i += 8)
        output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
    return output
}
function binl_md5(x, len) {
    x[len >> 5] |= 0x80 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd)
    }
    return Array(a, b, c, d)
}
function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t)
}
function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t)
}
function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t)
}
function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t)
}
function rstr2binl(input) {
    var output = Array(input.length >> 2);
    for (var i = 0; i < output.length; i++)
        output[i] = 0;
    for (var i = 0; i < input.length * 8; i += 8)
        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
    return output
}
function rstr_md5(s) {
    return binl2rstr(binl_md5(rstr2binl(s), s.length * 8))
}
function bit_rol(a, b) {
    return a << b | a >>> 32 - b
}
function safe_add(a, b) {
    var c = (65535 & a) + (65535 & b)
      , d = (a >> 16) + (b >> 16) + (c >> 16);
    return d << 16 | 65535 & c
}
function md5_cmn(a, b, c, d, e, f) {
    return safe_add(bit_rol(safe_add(safe_add(b, a), safe_add(d, f)), e), c)
}
function str2rstr_utf8(input) {
    var output = "";
    var i = -1;
    var x, y;
    while (++i < input.length) {
        x = input.charCodeAt(i);
        y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
        if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
            x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
            i++
        }
        if (x <= 0x7F)
            output += String.fromCharCode(x);
        else if (x <= 0x7FF)
            output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F), 0x80 | (x & 0x3F));
        else if (x <= 0xFFFF)
            output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
        else if (x <= 0x1FFFFF)
            output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07), 0x80 | ((x >>> 12) & 0x3F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F))
    }
    return output
}
function hex_md5(s) {
    return rstr2hex(rstr_md5(str2rstr_utf8(s)))
}
function osZ34YC04S(obj){
    var newObject = {};
    Object.keys(obj).sort().map(function(key){
        newObject[key] = obj[key];
    });
    return newObject;
}
function Base64() {
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    this.encode = function(a) {
        var c, d, e, f, g, h, i, b = "", j = 0;
        for (a = _utf8_encode(a); j < a.length; )
            c = a.charCodeAt(j++),
            d = a.charCodeAt(j++),
            e = a.charCodeAt(j++),
            f = c >> 2,
            g = (3 & c) << 4 | d >> 4,
            h = (15 & d) << 2 | e >> 6,
            i = 63 & e,
            isNaN(d) ? h = i = 64 : isNaN(e) && (i = 64),
            b = b + _keyStr.charAt(f) + _keyStr.charAt(g) + _keyStr.charAt(h) + _keyStr.charAt(i);
        return b
    }
    ,
    this.decode = function(a) {
        var c, d, e, f, g, h, i, b = "", j = 0;
        for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); j < a.length; )
            f = _keyStr.indexOf(a.charAt(j++)),
            g = _keyStr.indexOf(a.charAt(j++)),
            h = _keyStr.indexOf(a.charAt(j++)),
            i = _keyStr.indexOf(a.charAt(j++)),
            c = f << 2 | g >> 4,
            d = (15 & g) << 4 | h >> 2,
            e = (3 & h) << 6 | i,
            b += String.fromCharCode(c),
            64 != h && (b += String.fromCharCode(d)),
            64 != i && (b += String.fromCharCode(e));
        return b = _utf8_decode(b)
    }
    ,
    _utf8_encode = function(a) {
        var b, c, d;
        for (a = a.replace(/\r\n/g, "\n"),
        b = "",
        c = 0; c < a.length; c++)
            d = a.charCodeAt(c),
            128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(192 | d >> 6),
            b += String.fromCharCode(128 | 63 & d)) : (b += String.fromCharCode(224 | d >> 12),
            b += String.fromCharCode(128 | 63 & d >> 6),
            b += String.fromCharCode(128 | 63 & d));
        return b
    }
    ,
    _utf8_decode = function(a) {
        for (var b = "", c = 0, d = c1 = c2 = 0; c < a.length; )
            d = a.charCodeAt(c),
            128 > d ? (b += String.fromCharCode(d),
            c++) : d > 191 && 224 > d ? (c2 = a.charCodeAt(c + 1),
            b += String.fromCharCode((31 & d) << 6 | 63 & c2),
            c += 2) : (c2 = a.charCodeAt(c + 1),
            c3 = a.charCodeAt(c + 2),
            b += String.fromCharCode((15 & d) << 12 | (63 & c2) << 6 | 63 & c3),
            c += 3);
        return b
    }
}
var BASE64 = {
    encrypt: function(text) {
        var b = new Base64();
        return b.encode(text);
    },
    decrypt: function(text) {
        var b = new Base64();
        return b.decode(text);
    }
};
var AES = {
  encrypt: function(text, key, iv) {
    var secretkey = (CryptoJS.MD5(key).toString()).substr(16, 16);
    var secretiv = (CryptoJS.MD5(iv).toString()).substr(0, 16);
    // console.log('real key:', secretkey);
    // console.log('real iv:', secretiv);
    secretkey = CryptoJS.enc.Utf8.parse(secretkey);
    secretiv = CryptoJS.enc.Utf8.parse(secretiv);
    var result = CryptoJS.AES.encrypt(text, secretkey, {
      iv: secretiv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return result.toString();
  },
  decrypt: function(text, key, iv) {
    var secretkey = (CryptoJS.MD5(key).toString()).substr(16, 16);
    var secretiv = (CryptoJS.MD5(iv).toString()).substr(0, 16);
    secretkey = CryptoJS.enc.Utf8.parse(secretkey);
    secretiv = CryptoJS.enc.Utf8.parse(secretiv);
    var result = CryptoJS.AES.decrypt(text, secretkey, {
      iv: secretiv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return result.toString(CryptoJS.enc.Utf8);
  }
};
function poPBVxzNuafY8Yu(m0fhOhhGL, oNLhNQ){
    var aMFs = '3c9208efcfb2f5b843eec8d96de6d48a';
    var cVWG2 = 'WEB';
    var t5GECZQ = new Date().getTime();

    var pKmSFk8 = {
      appId: aMFs,
      method: m0fhOhhGL,
      timestamp: t5GECZQ,
      clienttype: cVWG2,
      object: oNLhNQ,
      secret: hex_md5(aMFs + m0fhOhhGL + t5GECZQ + cVWG2 + JSON.stringify(osZ34YC04S(oNLhNQ)))
    };
    pKmSFk8 = BASE64.encrypt(JSON.stringify(pKmSFk8));
    pKmSFk8 = AES.encrypt(pKmSFk8, acky6QolJSJi, acixHVhiNqmK);
    return pKmSFk8;
};

// m0fhOhhGL = 'GETDAYDATA'
// oBDNNVgaDf = {
//     "city": "深圳",
//     "month": "201910"
// }
function get_hA4Nse2cT(oBDNNVgaDf) {
    hA4Nse2cT = poPBVxzNuafY8Yu('GETDAYDATA', oBDNNVgaDf)
    console.log(hA4Nse2cT)
    return hA4Nse2cT
}



var DES = {
 encrypt: function(text, key, iv){
    var secretkey = (CryptoJS.MD5(key).toString()).substr(0, 16);
    var secretiv = (CryptoJS.MD5(iv).toString()).substr(24, 8);
    secretkey = CryptoJS.enc.Utf8.parse(secretkey);
    secretiv = CryptoJS.enc.Utf8.parse(secretiv);
    var result = CryptoJS.DES.encrypt(text, secretkey, {
      iv: secretiv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return result.toString();
 },
 decrypt: function(text, key, iv){
    var secretkey = (CryptoJS.MD5(key).toString()).substr(0, 16);
    var secretiv = (CryptoJS.MD5(iv).toString()).substr(24, 8);
    secretkey = CryptoJS.enc.Utf8.parse(secretkey);
    secretiv = CryptoJS.enc.Utf8.parse(secretiv);
    var result = CryptoJS.DES.decrypt(text, secretkey, {
      iv: secretiv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return result.toString(CryptoJS.enc.Utf8);
  }
};
function get_mingwen(data) {
    data = BASE64.decrypt(data);
    data = DES.decrypt(data, dskQCqpdBOGo, dsiqYiQHbZQp);
    data = AES.decrypt(data, ask4u6FbhGV8, asi2hhkBUJbo);
    data = BASE64.decrypt(data);
    return data;
}

// console.log(get_mingwen('ckFDTTBNU3ZQdEk4RkUzamQzTllxSlV1SVhVQk05N2U1ZzdxL1B5cmtWdUttM3pCRCtLZGc2T0JTR1ZWYXlqbUZJQUNaV3N3eWs0clNTLzBUdmZGU3BreDN1ZnRkS3JTR214N2k3dUJzUXpWRGdwWDFxUDZiMnBBQmF4ekhKUVBKdzZ3MU4yOG9Kdnp3NlZQRkYvbGRNUWdmZGRmOGM0S25aM3dNRFc3eEo3NnJzQUZaNC9GVTUzN1M5NVFMcSsvWEd1SzRHeHB6VnBiWTJFcnRLR3k1TktEMy9yaXRqMitPVkVvbGZxOVZXb2F1czgwRjRhYVFpVi92eTd6R1NPNFo0Q056ZmU2VmlRYzF6NmdZTlo1bWl5Wm9yYTZmRno1WTRlKzB0d3p5b3JtVW5ESU4ranRORkI1OHBvaWJCYlhYMWhPU1ZVb3o1aE1aWjQxcmlaYnhIcFQ4aDJOVm92SmNLa1NJaGNkZTlOc1ZyclZ5K1pKRDBxYUtHK0NkUDJhc3VZS2F4YnFmREpkVGlyd0wzUHFnRmVvcTVxQVdyemlKdVlXNzRWRFpBbFBYaE5WdDF2RWFOd0hBMXBBTkU3MEJFb05XUFYxRVJPQXZ1RzJKcDJzSC9CTCtXZmo3bzByUGRZMmJ0czAyMEkxQ2cwWEhtL1dmNDhBWDRFSGlnWldjODRqY1VaQTJTRWdoU2hHYVdpY3BZK1ZvaDNCdnRkcm5KL2JWL0JNOExXVllKNTl0QzdrWXB1NjNTdkZQUkluS0ZydWc3NXhmMTYzQ2Y4QVZieDJ6VWZrUjZ1Zk1KaGtlMFF0ei9hWXpFY3N2S0xRRk9wSFhKOFl6b2pDcnBPbzNHaCs2WTZKcEc3YUhjNHN0d3FMa05xeCtzVE9SVTFFQzlYVjd2N2hiaExsczBjOXFxaWlhQnQ1UGFTQ0VHMWs1SHQ5SFZyTVE1cGwxeDhvc1IwNGp5WW5wSWZIUUNyMmxDZFFmRXpwUS9DeUdLcW1Ob242bnhqWUFJdC9EeVh3Ulp1UVRrQU1na0U0K1M0T3ZoR00rUXJweVdUM08vQWE2SjNCNjBUYS81SDVTN2xXVEJoU1hibVYyaTZhazBoR1ZGUExWMzNOZjBiMmw5enBpeVExSHRlL21IYnZEWTFRenZHQXgyWndZbnl5UnJ6QlRnSUJpNGhxVlRuU250NnJPZzZMR0szUXdLUDVTblRqT2pwRDFxNnd4UW5HWm9qNGMwNmdGNUNOZHZrMHBOVktUWDFRM01YQkFXYUNTb3lXUXY4RmV6Viswb1BpSjRSYzMvclVCVFpVN1hsS3VTRnAzRUhwVzF5OW1PN2kvbTJXZVNDZGlrUUhHTFhIRFpIbkx5b1FSYjQrUDZFK2xnKy9NYnlpQzYyVXlOQWUxZm5GZGM5bnhXaGFMemhqcFVUeTRWVlVtL0MxZVR0bFBhVnc3U2o5V0NjSWgrNVB4TG9aRTVMR2dRTXlWQXhPWENUa1NDNVRMVkVZdy9MaVJRK1JoeFIwTDRnN0dzZzNYemIvTWVXWHJLdmlqOTdlNjVMM01ZdGg3bWxLMm11bU5kV2R5cFlOZkNwSEVJYi9wWVpoeXNjb0EyTUpzeWFrNk5va2dtUWs1Q3VOMUZYVFRUS3F6clZQSG4vanB4dlUzR1dDZ2xEd21vdkFSTWQ2SlRHd0g3TDZjemNNYUo4SCtiL1hGWVRmUkc2VkY0WjFaSmVkSmdCTCtGYUoweTM0MTdLRHcxaVgzVURVaFRqTXhLV2NHc2lTOHdDN3VnQ1htYjlPZFdTWXI4YUZ5UyttY1ZKdng2YUFkMTFGUTU1YjJISVE4ZE9DaEhTNXplODJvSEhTYnhPVkFLVkhsODRsM2orajVQaUljcm5xYi9tYzZrSGlyQW5HOXNyWVB1djA1QXBwQ2FWSDhnVVVEZEg4NVhzUVpoZzIreXJiU1VRUTc1Q1hlaHViVDd4K0cxY3NINVJ5eHdTS2ZUM1NnVXJrQ0dCc0V6QXd2RkhROUp4UlJPbnduYU8yaVc2T2NJRmc0SVpKdHdyamFIUkxmRXI5M1lIMWtlVno0RHV0cFQ2cS80R0NEekc0RjVrVXVCd0JyOFF6aFZnY21KMSs3V0FWUmk1QS8xaWhqMGV4Qnl2M0JjWEhjcWtsTnhtdE0xV2c1ekFtVHpFR0g1YWxLUG9JN1ZiU3N5TEZweHkwTU5JN1ZFMWZXUzVCUzlJRCsveHVDYXh3SDJiaEZSc1RFMkgxRjVsWVE1eU9GV3AzM1BPMkhkTEQ0MkZqdUt5dXNxZDlBYXFIbXh3bGhXREhNalFqRkd4aEZGSm5kb0tZMkhMbFhsMUc0UFFvV2dYRzZ1YmRHU2VSQ1hhc3lWcElYcnJSWEpBQjBTOGxFcWhQd29DMDN2YWR5a1VJLy9EbTZiTXpwU1g2SElvV2tVVW5WQkhrcXZVZnZ3eVIrckZySTFaUVcrNTJreXU5MHc4U3Q0VDNuZ0pFbHZXc3FleVFkd2FjMjhmMlNwQVFnaWRWd2ZCeG1EWWZTckVMWEN6ZUZOQmRDM1BHTFAwTWxIdk01cDZFbGFFeWYxS2g1WVhnK244a290RU9aODZ0MUxhblFZQWl5T0NvZENsZWJvSFNsTG5vSXE5ejl0TGVNaFJHaUdXSFJzSEV0OG1iRjRWN2p1S3JMZEE5RXQ2WTFDYksxVlJ5WVh0Q2czM3V5TzEzMjJjS3kvalFaaHNrUU1VMjJwTFZXeHN5WS9MNis3MzY2dUR2Q2Q5RElDQXpha3d2MDZTZzVtVnlYUzZGYnBGUmZEcXU1VE53Q1dsNVFxdkxKbHhlOW9wOFlNbDhYU0FMQ3RPL2hjaDdNd2lNMzFGdXliVXR0NUt6RVlmMDUraFAzOXh6R2ZWaVp5Uk1KWHNCVmtxaXpIZWRJMXFLN213NHNSNnNYYjBhNytjRDVMc1NCVERLVFhZMlJjU0lPYXhRa2ZvU2k1RTk3RjBHMFlsT3BaU0IvRzErUEZvMlBqSEd5NVZmY3lOTDgyclV5cVlibCt6andkTktsT3B0dnZZckZNZGNqWGJBWVNEQ2xtVGpYYS9SUXE2WnlBQXo5NmlvNGdYZnhVTDRiNTE0TmVCTnNxSkRLdmt2SzlIeWhhaHRCbys4Mm1CWjVoVG44Y2xMY0s3YjNnWlh0dFNRbWVUajhmMFk5enltRXFmQitQRUFGNUV6eDJncmJqWDJ2ZXJNZW02aGl0d3p4REFOcEptMkoxRm5uTnZ2YXpneVkvclZ0S3NLckZNWkp0RGJyR1BXRFdQem54WlZFbC9Ma2pQTkpCaHorbitQazY4dFRVQXZEWGEwZDFxSU9Eb2NYSFQrRzF6MVVHZ3F0RFRZRGlYQ1FPVC9TR3VyZ2xlUjRBRTNhbTV2SDRlM2EzOTZkNERialErQmdnY3BtVC9rZFZ5aHVERzN3U0tyN0Ywb0E1SU1pVjUwNXIzTVZzVGMvd2hDZGxWWSs2ZzBnSzAyL0JvajVSRHV2OFFWUTRqWFpDUHI1eDV5c04zMThNb1hKY2VKM0FXRmlXS1lRU05Ea3NHUlhjMkRpcGVndm5MNnJaRzZRVWpNV2kzNkNhVFVQck5WRWtTWGE3MmVLakcrY3o5emt6K253RU1ZVGYzbDVMcmZaZXVNREZvSkdVdWJzZkE3N0xSNDBkTXpSSnFidm9kRm91UUpGMGVValE2T2R6VEtUQTlhbG5ZRTI3R1FhYVFDQkNrN0c0Y25kNUxVb3hBZi9Hb1VOQmFkYTRCU01xR3ZLZC82RzRSRmZtM0FOdTNZenpYNitCdlF4L1NzSWlTVExDNHF3djR6OVgrTW1jU0p1bmJCbi94aXEvS2tqYVNraGlqS0tjK2NrblN1REtEdEF5Z0xwOXBVUmFPYThEUHFXSnY3MytBelNvWlg4cDljLzBvOEV3eVBCVmdQRklqcFZPck5HTTI5Ukx0SFc0REMyam83QkNrc0YxZFZrVXpFcVo1VDdKOHFNRVRUNE9QaGlEM3FzMVBVT05NNE85T0xlaTd6YTI5YmVBZVpWMDkvWTJ2OCs3VFRNVVVCdGFYdDRYTVVTWElqRDhKSE1HbTg5YlBmR3hDZHVDV1JOd2xyMXdlWnpNWDZ3dHRDdUtMVHdwYjRJSHBkYW45L2FrMEtZVk1ybnY2WVB2UVYzZ1R1aG9YMndWcXkzVnNrRW9HZENoUjFYS3pnVENKMUFNdFEvNjN3REZUc2tGc2RjZEVyRSs0K3orSFBtOTZYSkI4eHlCNFJjN25QRzNzU1kzV3BkQ3U3NjMrald4WnU5N1NaUGhMV1RuRHQ3T00wVmdNT2h5ZkNsbnNSSlpHK3BjaWtlcGE4d3lucENoYkhBbWxwUm9pZExQU21PM1VWSmpVVUp3QkhSYXdmOEFkWHhvTUcvTStFbjg4aE1PN3Nyckl0WHBuTDZuUUVkV0w4QkRFLytGWXcvWlpDUTJNMVovRFJxLzVoM21KelhCd2JGWHFQaWdscFlQWFNMRi96L0JoWFJNQ0pwcTVUYzRTcVQyWk05VDNrY3kvSkJqd0NUYWNHSlRxZTk5NTdvcElqL1crejRpOGEvSFE0ZG5EY1Z4Z2htUnZ5TUFlSmVad0dFV0pvemhxMzhqeUhGSldSdE94KzhtM0hDWExWRzdTNlNxSHQ3ZGc2aWRHcHJUcHllS0gwdzFCRjU1Wm84QU9GQUNvazdwcWlNRjhGUmE4TGhGTFowWVBxT1NvZWM4aFFnemxiQ2tad3ZSQmhMQ3FwMEZ3VG1obG15bFNWeFdtSkdIdS9uZ0FCRGFvZFZJQ1c5TzZ2dDZ1L3NBaFFOb25iaXUvcFpUUFRyd1lYbUM0cEZQUWF0ZnZaeXhmaC9jRjNITVJmS2pNak1zRnBneU5RdENQRmZmdmZ3cU5Kdi9lbTFIMXpJRWw2dnlQWW8wREw0THdpQWRuL1ZMOGJXbmM4L3QxU3N6UnBSaEdERXpUV0s0dlBEbFBwUnFkR2p5ckx5V1ZjWU1tUFJWZWYxV0p4SnQxQjhPRmpnQTY4a1ZKb2VtQ1hqVEo5bHhyK3EvNGRPMG5FNHNMV1JJYkV1eUVWZlVVRUFaMzd3YnRyck05dWhodmVCaHJGdXgxTXl5eG9hcjQ4ZjFycXNYTGxJSlp3Qm1rNlFCbjNYTWc1dG81Q0V6SzBRUTR4N1pkbEtvNGdaQVVRMmpQem9LTFJrL3FkbE9VS0dNQUZYLzJwRjc5bUNQWnYzU1ZORm9neU1DNVFZTDZIVVMxREJsSFBvZjdsT1BRZnRrR0RsakpsYVFRSGNEZnc2VTBRSGsyMWF6ZFNjeTBzSEwybTkyeUNzSjdScSt1UmlXUXcwTXNLMUl0Vy9JbVNtY1h1NHc3bEIxTnl1VW95MThXK1BSNU1QcUgxWnFDNU5MUjB0ellMNmtUa1VYbzdJWERXRWZ0NmhoWXd1V3B4SElvNWRwSW5CLzBMb0VjZjJDQXVsQ3dhcjY4ZGQwN0UvWGJZdzdENnpSRXVHaDk0V1JYU0pLRHVuU3phMHdlVHdaOGI2V1VMZWtjdWZUUlRUL0JuMHBtM0JTc0RDYjRGNXM5azBrbDh1aDFUekJCcjM5c0laQ3c3eXVGQld6bEhGZmh0ekdNZTRqZnh6OXJWWWpzSDB1Y1ZSYXdjaEhUVWlTcjJRR1FMaGdINkIxeFloOFRycmNvczJRRHZad1piWGNWQjlRcTcxb2tvdWtCRkxWd21vQk9tOXBFWnNkUEw1OERqR2FOYzlOZTlzNUlTYmFBK0JKVHVNaHhFSTU4RmRWOGx3MWI4MGdRdDJJdFJSbnBQK1hnYSszcUxGRjNrQS9WZnpVbHI3Qm1mOVFLOVRLZFNuQXNDVXVxd3ZyQmhHbzZiL29MazNWVXFsRjZzUWQzbnZuNXZSTFJUTzNEcEFZYTM0UjNpSlpJT2ZUdmUwL1NQSlJYb0ZCZEhBLzRwUHNaMDVVR2p5RjJ4dEJWTXovUW41QU52ajJacVo2S3pab0ZiWkxDS05uV1NxaTV5RThBT0kvTE44VTNEZWRKWWlFV2pXeG1iYUt4NEZlL2ZuQVcrVG1Ka3FPblBDc1JjdjZmdXV4djJGSDlveHFHdGVMYVZpVjBJRFB4eWFJWVJpdWpBK3Q3Z1JjVmk4UzA5M09hUHV3ZG5rZm5JWEI5MnhWSUowVm1zdGNDVWw3eEtwYThKeWg3a1NCbXlDajB1NjM5SEo1Y1FwVTdjSVFKTEpMMEpqQjF3QjcrTjZJSnZvL2wwUWRaSkwrdjcwNFYzcXl1VUhVN0ZWVzdHcmlqUFV3ZG9xUXlSbWNIKzhTRXNPbHZnUmtyM05VVkNtdXpSQlJaSlUvelJ6Q0xSZTlsRXdhODBocmZXTEdrbUdZWXFBQS9mWlRtd21BUEE3MS9MQWVMcnlpMXh6UlZZaHIxTk1JMGM4MVliOGlWNjk0eUNwNm8zQnl6aVM3Mmx5T0wxUU5nZmVmYXZvS3BxT0Y4akVYUXMrMG94N0pQVjFDMHVQb1FGWm5RK0J4RGo5WVNSRTkrUkxTMVl1RHJpVVljQkp4VHpHSlZLSUo1aVdUV1R0VmxDN0FrcnJmWFlXbmptTjBVcXdWNFA1OW1kVTdRVnZKclh0UlIvNk5MNjNPNS85eFg5M1JEMGZSdHNnRktWZGFjOGpRQmkrVGF0OWFuUVhWa0RBamhjYWc1SlhqWHJlZkxGalBJTlAxenYyQVFDRnBTSEU5MVpobEk3T3JGMjBOQkVDbGx1OE5jdFg3SWphemFIOG54d3c4N3ppVHc2ZGRSaG11ejBGUmg4RlNUOFFUbmIxTVl1U0F5clk3Ym5OOXZKc1lXVEp5VS9JMExsc3o2YWwwcERsQTk4VFVMWGI1cExrYmt2N2hVWnMyZDRrOFVpdUVvUHg1NnRWRGxWdkRlUnVHczZnR0poZENXaE9wb3hVUURIRHAwbEI5V3Viaktkd01aUEgrZXQ4RU5PaU8vdVN5QktaTkduVjllQllmekhrVER0a0svQ2pXZlgwV01vc3VXNUFhNXkwZWVEcjVIZTFURm5vTHlwWEJ4UksxN0pML1R2MEh2VzJaSkdMTGVYRDNyci8veVBGdUNuUGJ5U3hkcUR4cytaZThiKzQzdSthTWl3VG9mSTRGY1Zta3dYbDZvL3BPSkc2dGM1Rkg2c1RHVEdwelRrUWtIWFFZWDVtT1JVRjhadW5rMVpmc1pLRkJSTTA4UDdWY1JMNGV3UlUyWGp6VlMxZFV5Zjc5OFJjM2JjcTczb3FzZ3F6Slhldk9HazNmdW9zdnBMZzVJKzJoOHYrNzJKU3U5VkJwMVJ0dE5kQkFnQ1hxZFVIZnRJcHI4amZYbjcvR3pleDZGT3BMSXNLRmJlUUxGTGRWdk1aZ2w4S3ZHbGpWbThsdnlScFp6cUxpbkMrNDFaNWZCbUlubm50QmM4cFVrdURObklNVmZBZHBZOE90VzgraXhYbWs4OGRwc21mTzNTQWNwOVJvZEdiMS9DQVRvenUvalcrYzFHT2pWUEp5NFNjVzExd05ybjNySGxvR3FQOVdlbCszcUZLNlRyRU9nSVRnYTdyc0hsOUlVR3RzRFBEV200WFNoVEtGc3U2MHFPK1l0V1NGa3ZvZDcvOUx1ZmtES1QrdEI4dXJrQWYyTitzam9HRDc3VTYrSlBJblZlM0lXaGp6V2psZkttaXFGa05LZnA2YjhmOGczUEdwQ3VLYjgzTWR3RUw3cExkTTlHS1E3OFNOQW9RREpHUG5tdFlBd3A2RkhWMEpQaWsvaXFydisrQm1UUVBjdnZ6VXJFcEEvTnRBK3g0Q09VZ0RpNjhRNnpSQTN5bTV2K250Q2lJcTgwaytuQUdWOHZ6TUhjZ01jMzdLT3o4aEtxM2hMWW45WTJ1ZjBVOGJheEhZSFkxVkdKMFVFbTY1OVhxRi9DWFk0L21nTDM5ZnVNOU1zT25YcldmRmphWERpR1kvQTNESllQL2h1MTVGK0dkaWQyUUxmbTZqWjhyZ3JzVi9MUnhUZG1uMWRlc05JTnkzU0F1bnVselpCS2NoM2dMRFY0T1MrdmJ3R0h1NzRXSTJwNVN1VjlHUVNWTFNVQ0Mvbm81L3VqVkRZelNqWWtEdjhHSnI2eHhWa3BsUmtpSHZWQ21FL2ZWc0RsTng1d1NXZkFLb1QxY2kwSU9WVE9HZjF5dFI0UHVnSG5xQ3FGTDNWcmJSQWhaTlVmUisvZTVRNVhHbWt5dWRPNG5FcTVnRGJ1cU1ES3M4d05jQXJWbWRlNUVFeVRucDVJZ01LdDZVaVR3QVlGOE44UHQ2WW5odUNDcXBxN0gxZHNtUFhoaTNGNzNlb0RiL2NmMTZ2VE1DSFIzQ3VLTmZlclZVaWRpZWt3U3FaVjhxOHRXVGVkVlR1cHlqdlg2bG5RWWFCclVVNWRYQjBkb1pjaGcyVlE2cDNnMVFGUWdRY2ZVQitMdDFBYzcyZHdHcklUWjdwdkNhVldaVWlnQTRtNFB4dzJ2aExFdHRLamg4Z0hYVkozd0JmeVNTcFdzdzhLZ2lqRmNJcHlwcXlFcmpoaDFpekJrT09oZ1dOQ1B5WFl5aXgwdHZ0TFJEUnZ5cTBpS2ZRWkxsUTlZRXlOeEpxeHExNFVVeXlYRWV5NGpySGNUUVBuRDVLbktwem9nMzRjSXFkdHdHTlc1b29vTUJxNkhhMVVzMVhxa0Zla2ZkSVVVUEppOWlaVStXUXBvbmg4MDBRemdFWWZ4eHBiK2E0OWk3QzBsTFI3Ti9DRU1SZ3lIRFVIc0tZbVgwMXd4U2JlczlNLzlFR2tjanZYdyt5R2d6OTNlbUxoR0RhejRVZW5zK2UzMm9oT05neVpTcERyQmd1Q0RNNGtjUUhTR1U4OFpBZjM5Ti9GcjRxS3Mzb3JNQ0hJQ241MWM1T0lOZlFqSzFPbmpWMjdYTzdkRXZrdUwrUWFKZW1UR00rVnZ0YVdHdGlxazJ3am9DZXNuTEVnVzZORVJKZGFlUHhjU0Z0eS9rS3VaSnNuR3NvMjRlTnNGTS9HcDF1VWRabCtqejVTL3c1Nis5L0ZrTmpkUkF0VVNjMTZRSUNYUkUzZFh3WkR5OE9mRHBoT2x1TkYxdEpZR3hzakE5RklJQ0ZVZFBIcWltYVAyZGthSE5ZQnNNN0UwUHVsOFZ5RXN5Yi9YQmQ0TEtYc1NQclgwd2lzSTFjTUJUNGlhTXBWRFE1QjYzMWlDWENweDhXdkQrcS8yN0FiaXlYMDlWazRjMnR1ZFJIa3k5K09XMUtvTWozRVJBcHhIbVEyN2kraEYxSmlCekJqcDdHV0N6VWMzRzM5T0R3d0RhK1JsdmFCQTBQZks5ZFg0QXZhTnQrRUxjYVk0OExUU2U3S05Wb1dDTHNsRldqaFQvZWRwY0ZsTlVUVHNQYkVaNGRpSDVJZUVLZTFmNUJ3SUJsM1l4d0pySEVVVDc0bDNWUHlkbzBEU3lmUUdjcHM0dnpMSTV5YURsVHk2Z0ZpbU0xSC9yL25oUXVzVVlJWktKV3dHQzFHbGE5NGRXK3M3ZTZ6S29VYkRGWEZlMVFLMGJmTUY0NmxSTTdLTDg1NDlKRWx1QmRORngwbGltTDZza0NkdjBjdzN6Q3NiWnd3TTRENmtVK0VSc2dmZlFSZ01jMWdvQytpWVpMaGJpT2ZEbWo3MHp4dDV0ZmV0aThkNDh3Vm1RdXl2SXJyWlg4ekMraE1WRVRZWVNEaktGRTYyS25pdTJUemtRUGQrWWFFYkpyQ3FYaVFVdWpmcGJoVjhWRFZweHRMUDAwU0lNRUVnNmpDd2Z3S1RQUFdIWjJMTlhreFEwU2Zzem9PU3JOUkprUlR1RGx6RjNkblk3bjBpNlpPQ3l6Nm1tcnhUWU1vL1BmYWpxUTFSV2JvYXJOcmxwVDFwdkR1cjF5b0FiRGhNanA1bmZhT0pjTmRlMHFYM2p3djFpb1gwWjVFSFBETktjRnRSZGQxZGN5Mm80WFh5ajB5RnVGaTEwY1J6NE1zRkZuVlp3WmN0QmluS1lUelRGL3VLMXhBK0tRdG1LQWk3REtlY3FDS1B3Q28zUjhQYjBuTGdHcmRZNUtrM25ucy9wMnZKdDhUYlZWUE1WeUt2Ymh0SGxWbDNHV2w2UVRzZnRtUzJQL3dLQXBRMUR2Q2RSSWxiZzgwRFpBZDBWdmJnNVFxZUVsUi9qZHF1S0hrSDQrenpBaEJQYWJBQVY5akhGclA5bGhLakRaUGxncUlmdFdROVZrcFhZeC9jcnN3QWdYSENsY3BDTmhhZXZ0cmRYcTI5eVI0QmpSMjB3NWh1MXBHcHh1STZ0RjlubkMxejNaekllMWJSN3hGTi9aM01qTzFrcmhwSEx0a0ZKQlNNNHNoeklIazAyeEVyTDJqOENBb1BqZDJzNHBoaHorMm1rQWVrOWhwekhPT21USzNnMjE1c28yWG1HNTBqVERRTDRySmlHb3RQS25LVFp1YzNXQUNNZm1MTU1JYjE2OHVTSDhScmlrdm4vZE9EbnZzOWkzVmlqVDh1SXpGdTBaajdUVmhQSC92eG1acFVBVWNGdkhHZFE3MDFLV01ZK2UvT3RaTFdIRXg1T1h5OHNHbGFnd0tOeGhEbGdsZjFzUFNvNW9URzQ0NzAyMU1lS1BNeGU0MGRJQU9YbHFQVkx1M2k4S08zZXpsMUQzZEUrTnBrNVBTaVQ4MzVCVlFnTkVNZXFEQ1o0YkQ2UVpoN0FrRWRScGx2NkU0K1ZGUURrcklGQ1I5dHNLVFlBR0IzQ0R1dER4bDdOYTZaSFhvRVFxdUxNSzFSbDhlZGxIbFNhUjZ2OEsySldLZ0x6RHcrVWtXTDc4RmErMDhma1k2Q2V2T1htUm5PUEdISzc1U3M0ajNmZVpZdDUrOE1BNldvMkovc25DQkI4OXc2aUtyVHV6UXArWnlZYjhxb1NVckZaZ2E3TGxLTDVzdlN6azc5N2lwdWNaSVpOUU5yU0tvU3pYejRUNkxWS051VmswN3RSblArQ1FpcjJWczJKWGQzQlZuVDlvZHIrdFJqR0xCTFhUZ1R4QzJmenFxVG1PZXNveXdTcW9rNldxdEYvZmt6YnpablN5eVZydnRBbE1QSzc5ajV1SkhBZStSNi82UjZIbDNKZk9TcDJra1BTSzd0SEFoNHQwR2R3azJvN3RSNWs5WjRRWGpaM0lJMlZrUE1VSEplc0hzYi9pcjBOSDFKOGpkRUtrTCtCNlJVSXBCVTNLT0hkSHhzR0k5T1VyenR4WWRXQ3poZVNLTWs3dTRlT0hiYlc5NWVNcUswN2xXMERSNE5JVjdScWh0VkhFcWl1YThsMHZtNjV6dk5FaEk1a0NwZExCdmxqY0t3VTdvZUg4bXNvelBnbUNPYVpYL0VBckwveHo1VjVyK2dzbStKZG4yMzMvYzFtdEhBYUZIdjVoNTQ2VzZhWVBtM3NLdDJ2ZzBHK2R5SmlNUTBwazlLbTdMdGJ6bHZqRVRLUHFNekVGVlZLUjlaZTZWcjNnU3BhdExPNityVUxoN2VtZ01uMTVoRWF2Ri8yVXNSZDIvQ3B2a0MrMlc1MjlnN253K0g0TDlnbncxMFR6Y1YwcFBOOFA0dmF6cmxjVVlqdkxpU2xUNTgvcXlQb0d4cXQvL0pIdTdDR3RselNXdXZRRERaMmdPK1VKeDRNSTFiWDhjMWRkMmtTc2JnRUJhNVVGQ2EvK2JrbjYvbnNsc0RZVCt1WDlCdUdWdm1xRk93V1hOVG9sWVY3YlpGKzV5czFWM3hiZHAreEdTVFR2U1JYS3U5cGtqREdZRzE3ZklzT0NZVGd4SmRjSy9WZlBQTVlCa2VvdWhabC9BUithc0h3LzRCK0Mray9DWVYwUXRSNStLVGdqZk9QdVl0MGtrUVh5VW1EUFIwcTB2L3R6QXhhMk1VK240dlFxVzlnQTBpMXFRWFFGdjJmLzJ5eCtQV21VTVZJdjZ4c0RWWThERXhlaElFNHZKd3VwVW5HSlQ5QXpFaDkwM0xWSjQ5RTVhZC81ajN1YjEwekF4dHdrc2ZUZ0JBTGFJU1lQenJlSDErWHltdU1adnk4YzgwS2VseHFORW0yeE5WYkpSV0FVZ010MTJCK1NiKzFBN3J3MG5ZZmY4M0xRODhHZVRISDUrZkVYMWxVM0MvcEtoV3VCSGc4QVVjVXp1M3dFMzExSWJvOTUwdk1sa1BwM0hwYW1MYW5vZVdJUlgxcmtLMnZIa3JMbVVjZ2I5TG1iQXcrclNqclIzZksxUlFmVmpXM3FWNGwvdERnb2NKQ05laUEvdHVEcytGY2FKcDBkY2RRK29MYXI4VWZ0bFB5SVBxU20yNXpUUGtnSEZqdFlWUzhxaVR1cXBrd2ZkLy9LSXl2d2gzME5zdVpKbDAraW5aSGRLc25ZSlNldXNGM2ZWT3dJS095bFZSRXc3czZKelZqTjMxMWZkNzRkVGdYWThrbU5mVTNlT1l4aDljL0FDMGk3dlpqdzFOTUxRMnZzcmlnT0RST0hnaWFndE9RMlZKTmRsRUI3Q0ZXaW15NHovNCt1Y0FqOGJQZ1ZLQkhFZ2M2L0FDVmw4N0R4OHF3MXZFQ21mYU1MeG1VSHdaeUMvV2c1K3hzLzlyUXNIWDUyc3I3b2dTTzArT3BIb0s3VmJBMUpYV2grNEZuMnJVUFZESE11Q1ZlYlZqT1lubUpUb0lrS0paZlRJVzJmV0pvRXVoS2FGVlQ4ak1YL0dpbG9ub0djNnNoSUo3aVhBbk5oV0JLb0RrVGpUdUg3ZnplOXU2Q2tqd0dYUWRXbUtVTDQ3V0hBTnFTbkdhUFo1WUlwVEtNMmdHVTNrU3p0WTd0WW9Vc1J1SE4rUFFKclpsa0FTL0taMWM4UVpLYjAyalRaYzVJVlZWY3NLTnBUVjBDeWVzMVkzbjBwd2ttWDhpS3VmM0p5N1FiSWRxa0NVUEtOdkdRMnB5d3ZsOTlIUzZudXB3d2FHbmh1TGM5MTlUbXFkQ1BhN1R1U2c0bUdSdjRWNzArL2pBRWdOMzIrY0hQTmxXM2p0L0sxRGJnbFVJbzVNZDBwWmQ5QmYxU3ZsTmt5WE1vWjcwNjE4dWY1VUJoa2hzVW45M1lOdmpmeXk5YjVsUGk1aGE3OVIzUjdOVFFWL3lnVHFZUnFTMXhyOEk0T0JXL0RSdnpwVGM3RXcva01odW9xUzJvTE5aTWVKcEYxWmFHeEZHOUdZYkg5ZkZzbG44OElQQzl2Sks4VWxoZ3V1dGQyU01tUnpIdnEydktNRUp1cWMyWGJnMlBORm9zeUxPOVQ3QXJHSjgvbmIydGt5TlJVWGhzWmQvdzNUbGl0L29TZEh1SGJJRElZQzVOYmZMTFBuQnJvWGcwZ0NDYlRqMGludDBsUk5QWG12bm50V3hMVE5NTkdnd2Z5VU5ZTVpIbTRlNDZKRW1icTE0Rzh4c2FFNE9RdGpOVVdmZ0haTGhEcXFCOE1LWWhUVHdsOU4wK2cwd2hKZXpLODRTQkd2SExnVXE2RmtlYTgwRktZNVQ1ZDdOTFZZaEM3TU5mTUxYM2x6NU1ZalBUcENUazB0UzIyMXRqbUhSMGh1Vm9iVm9NcnpsRW9tZkhwQjdOTmVPOVp6ajdub0x3cnNhMXV2MVlvYzJ1TWZZYnRrdTVWN282Q3MxSjBkblREZkJDbkxUa1d3YTV2QjVwcmROWUFPdzViMWJsVW01RkFUL0pzbUQ1TDN5SElQTVozY01TTlhsK0hUSlRQeHpUMlZUR2hSWjdGcmZaUkVGRFJqN3ZJN0drR3FaUW95bWY2NW9JVFRWOEtkTGhxeHBmN25oMGJTTkRobVQrTDZWWk50Rzc4ckEwbVhjR2tYR0E3SjR1aGNsWlU3YUZZNFkwOGhTT0FKMU1FVEtwMi9ua0lHejJPWVdVOGdVN29JQmpnUzQrRnJaR2J5NGUxUlB3VEQ4eW1STEVXdFl4L3hBTksyV2d4UXZXd1hxTmtFMlRvK0l5V0c0MlBTL3RrVTRiY1ovRmdaVEtlWnRVTG1kNDNGQXpaVGU5b1ptS2hPUiszVTM2Q2drbWxhUkFVRk00ck8renNQQytsVmg2Q0RBQzFnemlkT2VidHNTVWw4QnhvQ3d2ZklGYlY4N0lqQjVxWnZBMDI1S3VjQ2FqQllyKzV6MnpaMmRQTVJ5Y2VjYzRaeVFNWVdLYjg0VkdQSEl3QmtYcklEVUJpY3YvU0ErWjZxcE1nMGNrdFpzdnlOWEdXTWhMQzV3NytYQWFiKzZxelVPOHRwa3N0RnpBQ2ZNSlRmOVc2RnI2dEh5Vk9xb0llMTZwUzhqQzhmUVNyQ1pEeFFoUzV1cGR2dmhRQzFPUmhJUDUybWlVT04xdXVFUVhpL1ZuK0J2N3NOU01PK0ptZXl5MmFwTTlhTENYMitSNkw3SUoyZjRGb2ErWkJDTndMK2ErSk9KbDBIZllETmQ5R1VTQzB6aEk4TjRLRnBTaUdWS2FXWFVMRnFsM2tzY0k0OUdocU5mcW5JYUhEWThnVm9tTHFLMDUvbVJtZTZoMFFZZ3dKeVBpdEVlUWJQSEZQVFVObzhtYWdneE5BM3I5eG5HT0ZXUWpuTHlqVWhIY0hpNVB4VitGRnRIKzFBdTBTRldvR3dkeHpYSHFLM1VLVVpwdGlJYmZoUDdBMm9KYlNYejJIYnhKcGlPSmpVTk5mSTc1Rlh0TVpCY1hzeWJ2dU9nSk84bGo0UlVaSHpJZXJOdm92dHRHODlMNHpLQkYrQlViTmcveXFkQXhVSFJNdnpsbmVHc1U1K3cxZDJsanRYc3VOQnpWa3ZaajJkcTZGZ2NzWkZLR3ozOU55ZWRKaG1JUE8zVVdlcGVQVXVUZkhnekFMckJLVjFPTm1FWXpjMDdVcDRWbDk5OWZ4cUtKaGVGNHg5cUk1RnFVUTJoeVowaUtjUGh1SWY1Wks4eW1XZ3Z5d0JSSnBxQXJJcDd1aWxveFEzTUhUR3poTEZUNkpPV1RPOHA0Z1g3QllvVWcvRTNwbXdxK1RSRDNaQ0lTcC92NERnanIzNnVsY0dpSzZuK2JmbFQyVDQvcVUyeDQ2elZJUW83ZXJ3WXQ0bVBVQW1rTkRMNVpvQlFtTTN4OCs2bHJmN0h3cE90MWVGZEVyMThWSDhaRnoyb1p4dmRrUnZYcklCVnV6aURnUlNlajdVTms0eFNKdjZ0aHNkeFlUb1c4YkhMblBEenE3bHZoSHdTcHNIcWtKNWZkOUxEanlRbjdrbFZ0Y096cUVEOEFTZUcvSUpQekpaWHk3OElDa3dDSitRSzhFZlh0dGpDWEd1c1JvaHc5Rmd2aElNM0tUT3VkSnZ1cXFEVUl5V0FPcmMxV0RGZitOcUVQNVUySDhROXVrWGNrNFlTeEVMWFUrenZIdWRTSnh4UFFDMmp4ZHhZTXNXRXQwWnVWUDdQK1dwUEVmK083VGs1STRuZ0gzcnFUZlZlVmZOczlsMDVhQUg5SU5hTzQ5SDVNQXVHQ1VNNUNyMStmUXNhZUZ3aGVIRVVieC8vQ0QyS09mNkxsYWRuSnpoWWxZaG1Ua2NTcjd0OEhBTC9lQmU5U1NZOHhyd0lKWTBjZXVjS21JV1EyVFZQOE9OT0ltOHJOb2xYNHRwMS9kdFc4Q0F6TkxhcC9NOTlSRW4wbUlwUWRjRUtkbEwvYTNqVFJmdGxhZDZzZHpmM0F5b1VHeTFRRyt3VFFTQ1dVckxiTVR0ckkrUitxVDFFR3BNY25CTEliYjJScDZhM3AwdGlrQ0JLcTdJV2ROd3JlWXRWRHZFWnRRbTJ4TkJpWU5HMENjQm53TXpZSzNTMHJxZWNHNUQ5UEduZytzVFJVb2Q1K1BRdUYyd0dNQk5adU1oU09kWEs1dTZnSk02TDArSm5UZWt1aFUwVEdPNlQ1dGxuK3NIQk9NcUgxMitkMW95ZEQ0YzJKK2dpT0hZMlptR3lHN0dvNmJnMi9hZU8wZ1poditVRnNXRnhoVVhLMkNPcU9pZ0cvKy8vZzlTOXROS1JhOUpYamt3c2ZqZWk3amJGUFRNZDF6T3NobnVHWUNRelJ2L2NabnUwcGphUGpOWW1BZ204VG9Eam0wYnRMQVJEQjR6N0lGRXlBNWJseklDQlFMVkVrK0dNdjViUjZZU0Zkc1N6ampsSjRJdmd0Kyt0RUszSHhKZUJoeDhIY243MU1JZmFMUlppdFVLdk56QXh3TWZaalVpcm5tNVd3eHJMOStLTzNlR3JnVVRJN3ZHQkVxWmdQWVlzcFRmbUtydnlEL2xUY2hMS3FQWTZJYTl1RTA0OFN3aGpCemNKTkJTWjZpcGVUNlltK2w2VjRGaUxtenVqUXIxclpicDczUUZCRUV1cTlKSW9ZNFpSaC9Rck5mNGtaNUg2dlNLTHBZR3ZaZW5hZmRJV3RKWkpjdzJ1T3dtN3NmaEZLeHJDTERvVzBPWG1zbTNlZTgzczBtaEpZY2RvV3JLM3Q5eTN1UnpneTFiazltWk5wcTZoUFIyenRsNWdETVpMQ3ZkZnpKREdiVFc5WWthR2V5ZEY5bWswRDYxZFlNMXhLTkp3Mmhpdnc5TnB5aDUvVTJwR1JZZDVweVptUjN1REdiQVEya09YUnJyZ05xL1ZjNG1nUllCME5zQVNyL09FYmpCMXZwNDd0WGwvaXNpVW56UmZYRFp0R0JVbjE4OC9jWmJIb0VzN00rZng0T3BPdFA3SUIrZmJjMjZtbmUwaGVLbkNnUjNocWFKSHF2cVZXWkw='))

