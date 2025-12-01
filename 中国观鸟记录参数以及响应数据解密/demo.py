import requests
import execjs
from loguru import logger
headers = {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Origin": "https://www.birdreport.cn",
    "Referer": "https://www.birdreport.cn/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
    # "requestId": "f55e884c886a48420389c608ef0d8a87",
    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    # "sign": "3b44608f81c9aea6295d8acd1c057d2b",
    # "timestamp": "1743081262000"
}
params_obj = execjs.compile(open('demo.js', 'r', encoding='utf-8').read()).call('get_paras',"page=2&limit=20")
headers['requestId'] = params_obj['requestId']
headers['sign'] = params_obj['sign']
headers['timestamp'] = str(params_obj['timestamp'])
data = params_obj['payload_data']
url = "https://api.birdreport.cn/front/activity/search"
# data = "pQlGLeiK/vrZXFNnTU5ILXKV8bcOElTn/zNEwPaInb0CBlbwQzXwSh8rTdPh4xuq1Pfdgo4L/UqX1OOr0okRDdpxSmqqiMmvHIc4uVmR1QzQHavYLxJ6jk9TEoKL6BXERvSeFWaoJNRCaWkGZjsa3zxK2Lk1bpX+mfS9WjNpekI"
response = requests.post(url, headers=headers, data=data)
logger.info('密文数据：：：：' + response.text)
mw = execjs.compile(open('demo.js', 'r', encoding='utf-8').read()).call('decrypt_data',response.json()['data'])
logger.info('明文数据：：：：' + mw)