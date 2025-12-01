from loguru import logger
import execjs
import requests
headers = {
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Origin": "https://www.aqistudy.cn",
    "Referer": "https://www.aqistudy.cn/historydata/daydata.php?city=%E6%B7%B1%E5%9C%B3&month=201401",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest",
    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
cookies = {
    "Hm_lvt_6088e7f72f5a363447d4bafe03026db8": "1744032364",
    "HMACCOUNT": "59688B7DC48E846D",
    "Hm_lpvt_6088e7f72f5a363447d4bafe03026db8": "1744034933"
}
url = "https://www.aqistudy.cn/historydata/api/historyapi.php"
obj = {
    "city": "深圳",
    "month": "202501"
}
hA4Nse2cT = execjs.compile(open('demo.js','r',encoding='utf8').read()).call('get_hA4Nse2cT',obj)
logger.info('hA4Nse2cT==>>' + str(hA4Nse2cT))
data = {
    "hA4Nse2cT":hA4Nse2cT
    # "hA4Nse2cT": "scJVWVKosHY3PE5vWZ4GunKxt5HeJVNnTTLuWpHjEtos5BH8DMW5qtJ+CBSRim1rRY1A89IPLpgdkWOIUYLNUtDpiB465gmsy2iLtd3DgFSfb8Aj65pM6UyA/zPDZYdTqW3rCYtTSGO2Eh8gRB5641itPB/2i4Km6qKt4S7ggE8Zet12nC36zpnxcRFOqu2mQdnIGn7PLG7TrheMlggJteaBX2YtZjRFdG6JTl2mFKvJERzcrPe2LSsVcKFM1jK6qnSPoxiVsQk+zIMV7zj6vugfKVg19rFNJL6eZr4E1pQUctKNHqSfnMzOYQoFr0Z7ujTvhGgUAjE5cCt/P/PekK1BEZoSKEphLifj64OFUJM="
}
response = requests.post(url, headers=headers, cookies=cookies, data=data)
logger.info('密文数据==>>' + str(response.text))
mingwen = execjs.compile(open('demo.js','r',encoding='utf8').read()).call('get_mingwen',response.text)
logger.info('明文数据==>>' + str(mingwen))