import execjs
import requests
from loguru import logger
import time
_timestamp = int(time.time())
headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "Connection": "keep-alive",
    "Content-Type": "application/json;charset=utf-8",
    "Referer": "https://www.cls.cn/depth?id=1000",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0",
    "sec-ch-ua": "\"Microsoft Edge\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
cookies = {
    "HWWAFSESID": "f8b94d6af11c393be0",
    "HWWAFSESTIME": "1733297331426",
    "Hm_lvt_fa5455bb5e9f0f260c32a1d45603ba3e": "1733297357",
    "HMACCOUNT": "012ABEC5BEE08178",
    "hasTelegraphNotification": "on",
    "hasTelegraphRemind": "on",
    "hasTelegraphSound": "on",
    "vipNotificationState": "on",
    "Hm_lpvt_fa5455bb5e9f0f260c32a1d45603ba3e": "1733297436",
    "tfstk": "f9AZtWTjTfhaz_lbGN54TgSFRefOt1m70IsfoEYc5Gjg15ZDLnx31tm9lH72VEVXcI8YgZYDDVIjWvT9WsCmV0tqNFLO0lSEwCPcteYduZjmpU3ZdsCmVD9YdGHNM3IvQddM-27fuPbDmt43-MQaSsjGnk2hrMfcmnjcK9bRooqcSOcn8ZIhmsfmM7LMoW75I4EiRa5zQJBOqFjM5FOHtusySMP0iG5hQPTGYSVDTpONm4jieysA1GLC7nh861X2eE_2bfPM0UdpYwxog7sMJU95BCc8HF11b6AMUrVD81SGFIX_bDSk6eARt9GozeApfFdelrccR3sHWCfqZ4CNsGfFJIiLsiJHnC6OMlm5BEveYN5l4WEA-cpJMdr03Obd8ggE8r0QAHrpz4x0H-BhwwSS5NwYHObd8ggE8-eAKaQFVV_1."
}
url = "https://www.cls.cn/v3/depth/list/1000"
params = {
    "app": "CailianpressWeb",
    "id": "1000",
    "last_time": _timestamp,
    "os": "web",
    "rn": "20",
    "sv": "8.4.6",
    # "sign": "5cac6f18c2283904344618dc8067d035"
}

# 导入js
with open('./demo.js', 'r',encoding="utf-8") as f:
    decryptjs = f.read()
ctx = execjs.compile(decryptjs)
sign = ctx.call('get_sign',params)
logger.info('sign ===》》》 ' + sign)
params['sign'] = sign

res = requests.get(url,headers=headers,params=params)
logger.info(res.json())