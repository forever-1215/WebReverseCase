import requests
from hashlib import md5
import time
from loguru import logger
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import base64
headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Connection": "keep-alive",
    "Origin": "https://fanyi.youdao.com",
    "Referer": "https://fanyi.youdao.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
cookies = {
    "OUTFOX_SEARCH_USER_ID": "1752139794@240e:47e:3c78:3cab:44af:90d5:39a8:f057",
    "OUTFOX_SEARCH_USER_ID_NCOO": "1297125622.8507576",
    "_uetsid": "18260df00b1411f0a4a81f35f6a5ef35",
    "_uetvid": "035ed5c008b611f0a14b4b306d67e9b5",
    "_uetmsclkid": "_uetee83f1f31a4114ff43f896164017f636",
    "DICT_DOCTRANS_SESSION_ID": "ZjQ4OTQ1OTAtOGQ5OC00ZjBhLWE0NDQtNTA2NmRmZWYzNTk3"
}
def get_secretKey():

    url = "https://dict.youdao.com/webtranslate/key"
    params = {
        "keyid": "webfanyi-key-getter",
        # "sign": "e2b81cffb858e7c6def4ff0bb21dc43b",
        "client": "fanyideskweb",
        "product": "webfanyi",
        "appVersion": "1.0.0",
        "vendor": "web",
        "pointParam": "client,mysticTime,product",
        # "mysticTime": "1743084774611",
        "keyfrom": "fanyi.web",
        "mid": "1",
        "screen": "1",
        "model": "1",
        "network": "wifi",
        "abtest": "0",
        "yduuid": "abcdefg"
    }
    tm = str(int(time.time() * 1000))
    str_temp = f"client=fanyideskweb&mysticTime={tm}&product=webfanyi&key=asdjnjfenknafdfsdfsd"
    obj = md5()
    obj.update(str_temp.encode("utf-8"))
    sign = obj.hexdigest()
    params['sign'] = sign
    params['mysticTime'] = str(tm)
    response = requests.get(url, headers=headers, cookies=cookies, params=params)
    return response.json()['data']['secretKey']

def get_mi(text):
    url = "https://dict.youdao.com/webtranslate"
    data = {
        "i": text,
        "from": "auto",
        "to": "",
        "useTerm": "false",
        "domain": "0",
        "dictResult": "true",
        "keyid": "webfanyi",
        # "sign": "e79587be02f64a49f71400b1554906d4",
        "client": "fanyideskweb",
        "product": "webfanyi",
        "appVersion": "1.0.0",
        "vendor": "web",
        "pointParam": "client,mysticTime,product",
        # "mysticTime": "1743085992738",
        "keyfrom": "fanyi.web",
        "mid": "1",
        "screen": "1",
        "model": "1",
        "network": "wifi",
        "abtest": "0",
        "yduuid": "abcdefg"
    }
    tm = str(int(time.time() * 1000))
    key = get_secretKey()
    str_temp = f"client=fanyideskweb&mysticTime={tm}&product=webfanyi&key={key}"
    obj = md5()
    obj.update(str_temp.encode("utf-8"))
    sign = obj.hexdigest()
    data['sign'] = sign
    data['mysticTime'] = str(tm)
    response = requests.post(url, headers=headers, cookies=cookies, data=data)
    return response.text

def my_md5(data):
    obj2 = md5()
    obj2.update(data.encode("utf-8"))
    ret = obj2.digest()  # 字节
    return ret
o = 'ydsecret://query/key/B*RGygVywfNBwpmBaZg*WT7SIOUP2T0C9WHMZN39j^DAdaZhAnxvGcCY6VYFwnHl'
n = 'ydsecret://query/iv/C@lZe2YzHtZ2CYgaXKSVfsb7Y4QWHjITPPZ0nQp87fBeJ!Iv6v^6fvi2WN@bYpJ4'
# t = 'Z21kD9ZK1ke6ugku2ccWuz4Ip5f4PLCoxWstZf_6UUyBoy8dpWc3NOXFRrnPMya72JWNdmo6uVV10XgIMeZTDEZMrudjMnPIm4fPxHjzIaHGLxyQuJgguycOjk92IXoE3vozfikCqtvD1dl4TA35N0G-YCIu3AUNWbF51AoMvunaDq8UCTmf2l4_a0KluEWRcDeMmbkiVBbv5-9wgQhtZ7MZCCYP0LQ-ruq_cL0lCUEvvWK3M0LlEK8PMhW9nPIoqV4cwz7ERBeOeB7fsrU67lz91RGmdmktIWUjDIj_VXf1sEf1iaem3ceUzbvcEru8TnGEKdujjGOWiV9a1suUV9FmnT01kKEloEQGJDbaNGiSOu6Q_9I3nA0djrgPoTCGU-cCTqWrsho__UjRVgKYFuj-YCiAnggG86sZXaKMHAeVr1pvrVSGkTsy9qr7JPljrsrVhFC4Qjj-MbjApZIAXHNDXfwSPz0PFoW2QJYTRHJ7lxLa27k425Bj-oGKAnvN'
text = input('请输入：')
t = get_mi(text)
key = my_md5(o)
iv = my_md5(n)
t = t.replace("_","/").replace("-","+")      #url安全bs64
aes = AES.new(key=key, iv=iv, mode=AES.MODE_CBC)
ming_bs = aes.decrypt(base64.b64decode(t))
ming_bs = unpad(ming_bs, 16)
logger.info(ming_bs.decode("utf-8"))