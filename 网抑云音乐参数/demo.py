import execjs
import requests
from loguru import logger

headers = {
    "accept": "*/*",
    "accept-language": "zh-CN,zh;q=0.9",
    "content-type": "application/x-www-form-urlencoded",
    "nm-gcore-status": "1",
    "origin": "https://music.163.com",
    "priority": "u=1, i",
    "referer": "https://music.163.com/song?id=2673695893",
    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36"
}
cookies = {
    "NMTID": "00OMidCYJj-qMCMbEBgimBhTgMU1VAAAAGV7CmfMA",
    "_iuqxldmzr_": "32",
    "_ntes_nnid": "6b79f78382706cbc220abe663a1bd39a,1743423903156",
    "_ntes_nuid": "6b79f78382706cbc220abe663a1bd39a",
    "WEVNSM": "1.0.0",
    "WNMCID": "vxgakq.1743423906725.01.0",
    "WM_NI": "LNxvZrYN8X54Z%2FwRxJ2Yc1RRR62yF54dB4HL0Z0kLIw1%2FfoOBZnxujgJYS7c4zGH%2FbaGKP2yRIbsiq2GLRr67osqOTdfdkSKdpjFOKlA29F1s%2FcnvDJcJ12p%2BPBvr7doU2Y%3D",
    "WM_NIKE": "9ca17ae2e6ffcda170e2e6eeb4d644fcb8a397f46db7868fa3c54f929b8a83d252b2a700b9cd48a392a383bc2af0fea7c3b92a9092b897d97a9b92f8b9b8409af1b9b3fb42f287add2d15a92eafe9ac53ff8bc8ed5cb48f486008ccf43b5efe187ee458286a299f862a59697b4b669f8a689a9ae6aa39985b1b1739297ae94ec7bf29984b3f13ef5b1bd92ce60a8baac8cd241a8b0a6a7ce41b09ffedac53bb1f1ad8ff5508abd86d2b17ce9908e97f13da8b19bd3dc37e2a3",
    "WM_TID": "pUqVEx3Uw7xEERUBRBbTcvz0SNebcib4",
    "sDeviceId": "YD-l2%2FvHiYFSVdEUlBBRALWMq2gXIabgGgM",
    "ntes_utid": "tid._.RblEWG5XpBtBAhAARUPXYvzkDYfOlChY._.0",
    "JSESSIONID-WYYY": "gAPAKnYPvlN1DpaRITQZ7mD13%5CFvGCvWVl%5CDImn3G%5COUCJvVfl1VD9lae7dnZmhYdB9Vv8sPyBQQx9rIaOI5HJPtcjfNZoQE39aFjdD%2BHoQfe%5Cmy05ikYvQxayJ23Dm2Yf8N03m%5Cc%5CniZU2p4thJ2%5CSnAj3WXPSfo%2B7qDoJXm3WiZn6Y%3A1743427443915"
}
url = "https://music.163.com/weapi/comment/resource/comments/get"
params = {
    "csrf_token": ""
}
# data = {
# #     "params": "LfVgx+9pED/T1zyMR10q8EKptArPkJ12ib2H9KcByClEyXqdjXMFx9vKNMF0FgxhCx5s+21fVNxyfHB9pDMFrYz0xwY+Y2dyENJNW8iVouwInG/q/r6NyZlIQ4uiz4iGQcRAYMY9l8OeOPisI/Gz9VeA+IuFmuA7pUWz3bWmghwapXU0rjQ6a/H5VE8JWa/SYptYy8X5/EJ7hRi/JYMLFVdVgmdYfLHe7fPx+twYkruMGKcWc+fnMpsJti/Y3p/1wo5c7fI3NM9aPqbWL7JR62XHzMMiSpHjG8a1IGpRE3Y=",
# #     "encSecKey": "89050a133d34f37f10bfadad874bd58575a62817df91e48a0963c71d8739db865d630d37adbb38b9334fd4c6ba589c9ca66348598c22fc3b475a44c2a3dc2a0dfbf19c31e32a836fcb803e1e8f7a11ec73e7041c4a32bb5dbf90f0f30419b118c3cd72f932a9b828da343e8fbaf52952a600bf09b1f9d835b2f70d5b0e4f6641"
# # }
data_paras = execjs.compile(open('demo.js','r',encoding='utf-8').read()).call('get_params',2681393627,1)
data = {
    'params': data_paras['encText'],
    'encSecKey': data_paras['encSecKey'],
}
response = requests.post(url, headers=headers, cookies=cookies, params=params, data=data)

logger.info(response.text)