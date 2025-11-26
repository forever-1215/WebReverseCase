# https://course.ougd.cn/course/view.php?id=254
import urllib.parse
import execjs
from curl_cffi import requests
headers = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=0, i",
    "referer": "https://course.ougd.cn/course/view.php?id=892",
    "sec-ch-ua": "\"Chromium\";v=\"142\", \"Microsoft Edge\";v=\"142\", \"Not_A Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0"
}
cookies = {
    "MoodleSession": "gmq6q510fgm4hd1cqhr3mj8gmf",
    "acw_tc": "ac11000117640660034796877ef479053fb4ed6939aa22fa620d0348d9add9"
}
url = "https://course.ougd.cn/course/view.php?id=254"
final_url = execjs.compile(open('demo.js', 'r',encoding='utf-8').read()).call('generateSignedURL',url)
print(final_url)
response = requests.get(final_url['finalURL'], headers=headers, cookies=cookies)
print(response.text)
print(response)