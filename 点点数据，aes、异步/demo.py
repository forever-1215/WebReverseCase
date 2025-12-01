import requests
import execjs
import time
import re
with open('1.js','r',encoding='utf-8')as f:
    jsCode = f.read()
js = execjs.compile(jsCode)
headers = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Origin': 'https://app.diandian.com',
    'Pragma': 'no-cache',
    'Referer': 'https://app.diandian.com/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-site',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
    'sec-ch-ua': '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
}
cookies = {
    "deviceid": "126207851b683d96f8fa9b78bc4047b",
    "Qs_lvt_404253": "1745324827",
    "_ga": "GA1.1.1574051197.1745324832",
    "_clck": "1oqz9wj%7C2%7Cfva%7C0%7C1938",
    "token": "a52b58fc464c456985f7ba70874902b99a701ba6d242e25d0a1f9841c5e2a00fce826a08f04540327c33a1265d0e0bb62af6cbabeb198292077dc3194090d559461d25ba21219b5911fd7ed1bcfc516a",
    "_clsk": "1jb7p6a%7C1745327235166%7C36%7C1%7Cr.clarity.ms%2Fcollect",
    "Qs_pv_404253": "2772601628242181000%2C3462252942628173300%2C2550185211471583000%2C2418287249056664000%2C4363221926393770500",
    "_uetsid": "1dac75f01f7511f0a15c2f5567ac9bca",
    "_uetvid": "1dac6fb01f7511f09e1285bcde987c30",
    "_ga_GVCWL6PNZ2": "GS1.1.1745324832.1.1.1745327254.0.0.0"
}

content = requests.get("https://app.diandian.com/",headers=headers).text

s = re.findall('u:\{s:"(.*?)"',content)[0]
k = re.findall('u:\{.*?k:"(.*?)"',content)[0]
l = re.findall('u:\{.*?l:"(.*?)"',content)[0]
params = {
    'page_size': '5',
    'market_id': '1',
    'rank_type': '4',
    'brand_id': '0',
    'genre_id': '0',
    'country_id': '75',
    'device_id': '1',
    'page': '1',
    'time': int(time.time()//1000)*1000,
}
data = {
        's': s,
        'k': k,
        'l': l,
        'd': -1,
        'sort': 'dd',
        'num': 10
    }
k = js.call('get_k',params,data)
params['k'] = k
response = requests.get('https://api.diandian.com/pc/app/v1/rank', params=params, headers=headers,cookies = cookies).text
print(response)