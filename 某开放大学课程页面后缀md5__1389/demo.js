/**
 * 完整还原URL签名算法
 * 模拟浏览器执行: b.location.href = 'https://course.ougd.cn/course/view.php?id=254'
 */

// ============ LZ String压缩 + 自定义Base64编码 ============
const CUSTOM_BASE64_CHARS = "DGi0YA7BemWnQjCl4+bR3f8SKIF9tUz/xhr2oEOgPpac=61ZqwTudLkM5vHyNXsVJ";

function lzCompressToBase64(input, bitsPerChar, getCharFromInt) {
    if (input == null) {
        return "";
    }

    let context_dictionary = {};
    let context_dictionaryToCreate = {};
    let context_c = "";
    let context_wc = "";
    let context_w = "";
    let context_enlargeIn = 2;
    let context_dictSize = 3;
    let context_numBits = 2;
    let context_data = [];
    let context_data_val = 0;
    let context_data_position = 0;

    for (let ii = 0; ii < input.length; ii++) {
        context_c = input.charAt(ii);

        if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
            context_dictionary[context_c] = context_dictSize++;
            context_dictionaryToCreate[context_c] = true;
        }

        context_wc = context_w + context_c;

        if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
            context_w = context_wc;
        } else {
            if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                if (context_w.charCodeAt(0) < 256) {
                    for (let i = 0; i < context_numBits; i++) {
                        context_data_val = (context_data_val << 1);
                        if (context_data_position === bitsPerChar - 1) {
                            context_data_position = 0;
                            context_data.push(getCharFromInt(context_data_val));
                            context_data_val = 0;
                        } else {
                            context_data_position++;
                        }
                    }

                    let value = context_w.charCodeAt(0);
                    for (let i = 0; i < 8; i++) {
                        context_data_val = (context_data_val << 1) | (value & 1);
                        if (context_data_position === bitsPerChar - 1) {
                            context_data_position = 0;
                            context_data.push(getCharFromInt(context_data_val));
                            context_data_val = 0;
                        } else {
                            context_data_position++;
                        }
                        value = value >> 1;
                    }
                } else {
                    let value = 1;
                    for (let i = 0; i < context_numBits; i++) {
                        context_data_val = (context_data_val << 1) | value;
                        if (context_data_position === bitsPerChar - 1) {
                            context_data_position = 0;
                            context_data.push(getCharFromInt(context_data_val));
                            context_data_val = 0;
                        } else {
                            context_data_position++;
                        }
                        value = 0;
                    }

                    value = context_w.charCodeAt(0);
                    for (let i = 0; i < 16; i++) {
                        context_data_val = (context_data_val << 1) | (value & 1);
                        if (context_data_position === bitsPerChar - 1) {
                            context_data_position = 0;
                            context_data.push(getCharFromInt(context_data_val));
                            context_data_val = 0;
                        } else {
                            context_data_position++;
                        }
                        value = value >> 1;
                    }
                }

                context_enlargeIn--;
                if (context_enlargeIn === 0) {
                    context_enlargeIn = Math.pow(2, context_numBits);
                    context_numBits++;
                }
                delete context_dictionaryToCreate[context_w];
            } else {
                let value = context_dictionary[context_w];
                for (let i = 0; i < context_numBits; i++) {
                    context_data_val = (context_data_val << 1) | (value & 1);
                    if (context_data_position === bitsPerChar - 1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                    } else {
                        context_data_position++;
                    }
                    value = value >> 1;
                }
            }

            context_enlargeIn--;
            if (context_enlargeIn === 0) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
            }

            context_dictionary[context_wc] = context_dictSize++;
            context_w = String(context_c);
        }
    }

    if (context_w !== "") {
        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
            if (context_w.charCodeAt(0) < 256) {
                for (let i = 0; i < context_numBits; i++) {
                    context_data_val = (context_data_val << 1);
                    if (context_data_position === bitsPerChar - 1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                    } else {
                        context_data_position++;
                    }
                }

                let value = context_w.charCodeAt(0);
                for (let i = 0; i < 8; i++) {
                    context_data_val = (context_data_val << 1) | (value & 1);
                    if (context_data_position === bitsPerChar - 1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                    } else {
                        context_data_position++;
                    }
                    value = value >> 1;
                }
            } else {
                let value = 1;
                for (let i = 0; i < context_numBits; i++) {
                    context_data_val = (context_data_val << 1) | value;
                    if (context_data_position === bitsPerChar - 1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                    } else {
                        context_data_position++;
                    }
                    value = 0;
                }

                value = context_w.charCodeAt(0);
                for (let i = 0; i < 16; i++) {
                    context_data_val = (context_data_val << 1) | (value & 1);
                    if (context_data_position === bitsPerChar - 1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                    } else {
                        context_data_position++;
                    }
                    value = value >> 1;
                }
            }

            context_enlargeIn--;
            if (context_enlargeIn === 0) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
            }
            delete context_dictionaryToCreate[context_w];
        } else {
            let value = context_dictionary[context_w];
            for (let i = 0; i < context_numBits; i++) {
                context_data_val = (context_data_val << 1) | (value & 1);
                if (context_data_position === bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                } else {
                    context_data_position++;
                }
                value = value >> 1;
            }
        }

        context_enlargeIn--;
        if (context_enlargeIn === 0) {
            context_enlargeIn = Math.pow(2, context_numBits);
            context_numBits++;
        }
    }

    let value = 2;
    for (let i = 0; i < context_numBits; i++) {
        context_data_val = (context_data_val << 1) | (value & 1);
        if (context_data_position === bitsPerChar - 1) {
            context_data_position = 0;
            context_data.push(getCharFromInt(context_data_val));
            context_data_val = 0;
        } else {
            context_data_position++;
        }
        value = value >> 1;
    }

    while (true) {
        context_data_val = (context_data_val << 1);
        if (context_data_position === bitsPerChar - 1) {
            context_data.push(getCharFromInt(context_data_val));
            break;
        }
        context_data_position++;
    }

    return context_data.join("");
}

function customBase64Encode(input) {
    if (input == null) {
        return "";
    }

    const compressed = lzCompressToBase64(input, 6, (charCode) => {
        return CUSTOM_BASE64_CHARS.charAt(charCode);
    });

    // 不需要添加padding（noPadding=true）
    return compressed;
}

// ============ URL签名计算 ============
function calculateSignature(url) {
    let signature = 0;
    const encoded = encodeURIComponent(url);

    for (let i = 0; i < encoded.length; i++) {
        signature = (signature << 7) - signature + 398 + encoded.charCodeAt(i);
        signature |= 0; // 转为32位整数
    }

    return signature;
}

// ============ 生成参数名 ============
const PARAM_NAME_PREFIXES = [
    "type__", "refer__", "ipcity__", "md5__",
    "decode__", "encode__", "time__", "timestamp__", "type__"
];

function generateParamName(hostname) {
    let charSum = 0;
    for (let i = 0; i < hostname.length; i++) {
        charSum += hostname.charCodeAt(i);
    }

    const paramName = PARAM_NAME_PREFIXES[charSum % PARAM_NAME_PREFIXES.length] +
                    (charSum % 10000);

    return paramName;
}

// ============ 模拟自动化检测（假设正常浏览器环境） ============
function detectAutomation() {
    // 在正常浏览器环境下，所有检测都应该返回false，标志位为0
    return 0;
}

// ============ 主函数：完整还原算法 ============
function generateSignedURL(originalURL, automationFlags = 0, timestamp = Date.now()) {

    // 步骤1: 解析URL
    const url = new URL(originalURL);

    // 步骤2: 构建待签名URL（不含hash）
    const urlToSign = `${url.protocol}//${url.host}${url.pathname}${url.search}`;

    // 步骤3: 计算URL签名
    const urlSignature = calculateSignature(urlToSign);

    // 步骤4: 自动化检测
    // console.log('✅ 步骤4: 自动化检测,说明: 0表示正常浏览器环境');

    // 步骤5: 时间戳
    // console.log('✅ 步骤5: 获取时间戳');

    // 步骤6: 组合签名数据
    const signatureData = `${urlSignature}|${automationFlags}|${timestamp}|1`;

    // 步骤7: LZ压缩 + 自定义Base64编码
    const encodedSignature = customBase64Encode(signatureData);

    // 步骤8: 生成参数名
    const paramName = generateParamName(url.hostname);
    let charSum = 0;
    for (let i = 0; i < url.hostname.length; i++) {
        charSum += url.hostname.charCodeAt(i);
    }

    // 步骤9: 构建最终URL
    const separator = url.search ? '&' : '?';
    const finalURL = `${originalURL}${separator}${paramName}=${encodeURIComponent(encodedSignature)}`;
    return {
        originalURL,
        finalURL,
        urlSignature,
        automationFlags,
        timestamp,
        signatureData,
        encodedSignature,
        paramName,
        charSum
    };
}

// ============ 执行还原 ============
const originalURL = 'https://course.ougd.cn/course/view.php?id=254';

// 场景1: 正常浏览器环境（automationFlags = 0）
console.log('\n🌐 场景1: 正常浏览器环境');
const result1 = generateSignedURL(originalURL, 0);

console.log(result1);