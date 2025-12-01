import requests


headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Origin": "https://app.diandian.com",
    "Referer": "https://app.diandian.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    "language": "zh",
    "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
cookies = {
    "deviceid": "126207851b683d96f8fa9b78bc4047b",
    "Qs_lvt_404253": "1745324827",
    "_ga": "GA1.1.1574051197.1745324832",
    "_clck": "1oqz9wj%7C2%7Cfva%7C0%7C1938",
    "token": "a52b58fc464c456985f7ba70874902b99a701ba6d242e25d0a1f9841c5e2a00fce826a08f04540327c33a1265d0e0bb62af6cbabeb198292077dc3194090d559461d25ba21219b5911fd7ed1bcfc516a",
    "Qs_pv_404253": "2772601628242181000%2C3462252942628173300%2C2550185211471583000%2C2418287249056664000%2C4363221926393770500",
    "_ga_GVCWL6PNZ2": "GS1.1.1745324832.1.1.1745327901.0.0.0",
    "_uetsid": "1dac75f01f7511f0a15c2f5567ac9bca",
    "_uetvid": "1dac6fb01f7511f09e1285bcde987c30"
}
url = "https://api.diandian.com/pc/app/v1/rank"
params = {
    "market_id": "1",
    "genre_id": "134",
    "country_id": "75",
    "device_id": "1",
    "page": "1",
    "time": "1745324928",
    "rank_type": "1",
    "brand_id": "2",
    # "k": "WFwVAFpCDAhEAlxeFgVSQwALRANBSwIYWkEAAEcDWFoWAENXHhAXUkFLAhhEBwkWAVcHBg=="
}
response = requests.get(url, headers=headers, cookies=cookies, params=params)

print(response.text)
print(response)