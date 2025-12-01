window = global;
const JSEncrypt = require('jsencrypt')
const CryptoJS = require('crypto-js')

function getUuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 32; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 16), 1)
    }
    s[14] = "4";
    s[19] = hexDigits.substr(s[19] & 3 | 8, 1);
    s[8] = s[13] = s[18] = s[23];
    var uuid = s.join("");
    return uuid
}

// console.log(requestId)
data_str = "page=1&limit=20"
function sort_ASCII(obj) {
    var arr = new Array;
    var num = 0;
    for (var i in obj) {
        arr[num] = i;
        num++
    }
    var sortArr = arr.sort();
    var sortObj = {};
    for (var i in sortArr) {
        sortObj[sortArr[i]] = obj[sortArr[i]]
    }
    return sortObj
}
function dataTojson(data) {
    var arr = [];
    var res = {};
    arr = data.split("&");
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].indexOf("=") != -1) {
            var str = arr[i].split("=");
            if (str.length == 2) {
                res[str[0]] = str[1]
            } else {
                res[str[0]] = ""
            }
        } else {
            res[arr[i]] = ""
        }
    }
    return res
}
function MD5(text) {
    return CryptoJS.MD5(text).toString()
}
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad = "=";
function hex2b64(h) {
    var i;
    var c;
    var ret = "";
    for (i = 0; i + 3 <= h.length; i += 3) {
        c = parseInt(h.substring(i, i + 3), 16);
        ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63)
    }
    if (i + 1 == h.length) {
        c = parseInt(h.substring(i, i + 1), 16);
        ret += b64map.charAt(c << 2)
    } else if (i + 2 == h.length) {
        c = parseInt(h.substring(i, i + 2), 16);
        ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4)
    }
    while ((ret.length & 3) > 0) {
        ret += b64pad
    }
    return ret
}

var paramPublicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCvxXa98E1uWXnBzXkS2yHUfnBM6n3PCwLdfIox03T91joBvjtoDqiQ5x3tTOfpHs3LtiqMMEafls6b0YWtgB1dse1W5m+FpeusVkCOkQxB4SZDH6tuerIknnmB/Hsq5wgEkIvO5Pff9biig6AyoAkdWpSek/1/B7zYIepYY0lxKQIDAQAB";
var encrypt = new JSEncrypt;
JSEncrypt.prototype.encryptLong = function(str) {
    try {
        var encrypted = this.getKey().encryptLong(str) || "";
        var uncrypted = this.getKey().decryptLong(encrypted) || "";
        var count = 0;
        var reg = /null$/g;
        while (reg.test(uncrypted)) {
            count++;
            encrypted = this.getKey().encryptLong(str) || "";
            uncrypted = this.getKey().decryptLong(encrypted) || "";
            if (count > 10) {
                break
            }
        }
        return encrypted
    } catch (ex) {
        console.log(ex)
        return false
    }
}
encrypt.setPublicKey(paramPublicKey);
encrypt.encryptLong = function(text) {
    var _this = this.getKey();
    var maxLength = (_this.n.bitLength() + 7 >> 3) - 11;
    try {
        var ct_1 = "";
        if (text.length > maxLength) {
            var lt = text.match(/.{1,117}/g);
            lt.forEach(function(entry) {
                var t1 = _this.encrypt(entry);
                ct_1 += t1
            });
            return hex2b64(ct_1)
        }
        var t = _this.encrypt(text);
        var y = hex2b64(t);
        return y
    } catch (ex) {
        console.log(ex)
        return false
    }
}

function get_paras(data_str) {
    var data = JSON.stringify(sort_ASCII(dataTojson(data_str || "{}")));
    var timestamp = Date.parse(new Date);
    var requestId = getUuid();
    payload_data = encrypt.encryptLong(data);
    var sign = MD5(data + requestId + timestamp);
    // console.log(sign)
    return {
        'timestamp':timestamp,
        'requestId':requestId,
        'payload_data':payload_data,
        'sign':sign
    }
}

// function(_0x291626) {
//     var _0x3c6fa1 = CryptoJS['enc'][_0x1b50('0xc')][_0x1b50('0x5')](this[_0x1b50('0x27')](this[_0x1b50('0x28')]))
//       , _0x3ec027 = CryptoJS[_0x1b50('0xe')][_0x1b50('0xc')][_0x1b50('0x5')](this[_0x1b50('0x27')](this['iv']));
//     return CryptoJS[_0x1b50('0x13')][_0x1b50('0x1b')](_0x291626, _0x3c6fa1, {
//         'iv': _0x3ec027,
//         'mode': CryptoJS[_0x1b50('0x3d')]['CBC'],
//         'padding': CryptoJS['pad'][_0x1b50('0x24')]
//     })['toString'](CryptoJS['enc']['Utf8']);
// }
function decrypt_data(data) {
    const key = "C8EB5514AF5ADDB94B2207B08C66601C"
    const iv = "55DD79C6F04E1A67"
    var b = CryptoJS.enc.Utf8.parse(key);
    var c = CryptoJS.enc.Utf8.parse(iv);
    var d = CryptoJS.AES.decrypt(data, b, {
        iv: c,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return d.toString(CryptoJS.enc.Utf8)
}