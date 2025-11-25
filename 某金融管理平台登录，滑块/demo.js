const CryptoJS = require('crypto-js')
// "mplanyou07558888"
f = function(e) {
    // r()(e)
    return CryptoJS.MD5(e).toString(CryptoJS.enc.Hex)
}

y = function(e, t, n) {
    for (let a = 0; a < 3; a++)
        0 != a && (e = e.toLowerCase()),
        e = f(e);
    for (let a = 0; a < 4; a++)
        e = e.toLowerCase(),
        0 == a && (e = t + e),
        e = f(e);
    return e = e.toLowerCase() + n,
    e = f(e).toLowerCase(),
    e
}
// console.log(y("xxoo123456","dandan666","9371370815504291"))

m = function(e, t="mplanyou07558888") {
    const n = CryptoJS.enc.Utf8.parse(t)
      , a = CryptoJS.enc.Utf8.parse(e)
      , s = CryptoJS.AES.encrypt(a, n, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return s.toString()
}

function get_reuestParas(username, password,clientid,distance) {
    randomCode = Math.random().toString().substring(2)
    pwd =  y(password,username,randomCode)
    e = {
        "user": username,
        "pwd": pwd,
        "mode": "9",
        "randomCode": randomCode,
        "clientid": clientid,//上个接口返回
        "slidercode": distance.toString()
    }
    return m(JSON.stringify(e))
}