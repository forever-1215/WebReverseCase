import execjs
import requests
import json

from loguru import logger

headers = {
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    "Origin": "https://dewu.com",
    "Referer": "https://dewu.com/",
    "SK;": "",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
    "ltk": "AMOGwpbCpMOrNcKBwpTClcKTRsKYwpPDn8KQVMOmwpbCncKgMTnCl3vDncOrXMK6LwjDgwPDmivDgMOFwq1tc8KaNhjCqMKBw5XChcO8w73CoMON",
    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sessionid": "bq1w1qfo-gjto-5kle-mlyu-rteah5y5ecsklvqu",
    "shumeiId": "20250322212006669860b10e4bed990e6d8f75a1d7052b00c0f85a39835101",
    "traceparent": "00-f549f72567dec04d5e32b606d6163fd1-e4eff107f9ebfced-01"
}
cookies = {
    "sajssdk_2015_cross_new_user": "1",
    "sensorsdata2015jssdkcross": "%7B%22distinct_id%22%3A%22195be02c0478b2-0b22d5ee29281a8-26011d51-1327104-195be02c049568%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMTk1YmUwMmMwNDc4YjItMGIyMmQ1ZWUyOTI4MWE4LTI2MDExZDUxLTEzMjcxMDQtMTk1YmUwMmMwNDk1NjgifQ%3D%3D%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%22%2C%22value%22%3A%22%22%7D%2C%22%24device_id%22%3A%22195be02c0478b2-0b22d5ee29281a8-26011d51-1327104-195be02c049568%22%7D"
}
url = "https://app.dewu.com/api/v1/h5/commodity-pick-interfaces/pc/pick-rule-result/feeds/info"
data = {
    # "sign": "a7b0921781cd9bbc21e7604d7e0364a6",
    "pickRuleId": 644451,
    "pageNum": 1,
    "pageSize": 24,
    "filterUnbid": True,
    "showCspu": True
}
sign = execjs.compile(open('demo.js','r',encoding='utf8').read()).call('get_sign',data)
data['sign'] = sign
logger.info(sign)
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, cookies=cookies, data=data)
logger.info(response.json())