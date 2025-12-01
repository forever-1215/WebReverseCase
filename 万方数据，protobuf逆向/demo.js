// 接收一个 ArrayBuffer, 转为十六进制字符串
window.arrayBufferToHex = function(buffer) {
    let hex = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        // 将每个字节转换为两位的十六进制字符串
        const byteHex = bytes[i].toString(16).padStart(2, '0');
        hex += byteHex;
    }
    return hex;
}


// t = (0,o.a)(t.getRequestMessage())
// // 调用 o.a 方法处理 t.getRequestMessage() 的结果，得到一个新的字节数组
// // 这里的t是长度为26的Uint8Array
//
// o = t.length
// // 获取字节数组 t 的长度 这里等于26
//
// p = [0, 0, 0, 0]
// // 初始化一个长度为 4 的数组 p，用于存储长度前缀。
//
// a = new Uint8Array(5 + o)
// // 创建一个长度为 5 + o 的字节数组 a，其中前 5 个字节用于存储长度前缀。
// // 这里的a是长度为31的Uint8Array数组，里面全是0
//
// // 然后p经过循环运算变为了[0, 0, 0, 46]
// (a.set(new Uint8Array(p), 1)
// // 将 p 数组的内容复制到 a 的第 1 个位置开始的位置。
// // 所以 a就变成了[0, 0, 0, 0, 46, 0, 0, ... , 0]
//
//
// a.set(t, 5)
// // 将原始字节数组 t 的内容复制到 a 的第 5 个位置开始的位置
// // 所以 a就变成了[0, 0, 0, 0, 26, 前面生成的t]
//
// (t = a)
// // 将 a 赋值给 t
