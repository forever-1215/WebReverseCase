

function _(e) {
    return i.createHash("md5").update(e.toString()).digest("hex")
}
function S(e, t) {
    return _(`client=${d}&mysticTime=${e}&product=${u}&key=${t}`)
}
a = (new Date).getTime();
e ="asdjnjfenknafdfsdfsd"
sign = S(a, e)