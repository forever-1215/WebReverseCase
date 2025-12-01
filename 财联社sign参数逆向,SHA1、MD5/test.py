import execjs
import requests
import time
last_time = int(time.time())
# print(last_time)
# exit()

headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Connection": "keep-alive",
    "Content-Type": "application/json;charset=utf-8",
    "Referer": "https://www.cls.cn/depth?id=1119",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
cookies = {
    "HWWAFSESID": "42002a09193b3e6373",
    "HWWAFSESTIME": "1748302929840",
    "Hm_lvt_fa5455bb5e9f0f260c32a1d45603ba3e": "1748302933",
    "HMACCOUNT": "59688B7DC48E846D",
    "hasTelegraphRemind": "on",
    "hasTelegraphSound": "on",
    "vipNotificationState": "on",
    "hasTelegraphNotification": "off",
    "Hm_lpvt_fa5455bb5e9f0f260c32a1d45603ba3e": "1748304385",
    "tfstk": "gL3-NbwiwKvlc-g8ib-cKYzfY6ODjncPZYl1-J2lAxHx1fWuALk3dmHIn8gHayVC9zumqw2kUyhIIypMIFYiabzzRdvi8ikHYPNgOW63Vosb-Wd4bxjEabzFgX5DnmcP954npzaIdrZbt5aQNgNBMtNuhaNCPW6XM-ybOTs7Or1btW4QdvZWM-Nuh7aQVvGjZq18K_wdJc03saqcik_CRqF8cnc8hYHWt7ZJ-befRpMuwNysN-QCRRUABXhxZLQZizutB5DklaHtOfoQD2BXBJuxG4iIgTdbWjnmjunvFwemr-rZPPCBPjU8elgrF_drCjhIjo3D1Fz8P8i3zXf9Ej3-Ebuxt6sbyzmYX4U67Twnmf3L92JekAhI_DZxJTIPvV091e6gBWjWMIIFYuN2VSPcbuPpg-FYIIjcYMr0gSeMMIIFYuN4MRADoMSUmS5.."
}
url = "https://www.cls.cn/v3/depth/list/1119"
params = {
    "app": "CailianpressWeb",
    "id": "1119",
    "last_time": str(last_time),
    "os": "web",
    "rn": "20",
    "sv": "8.4.6",
    # "sign": "2c08a6aa1321647d786cb7f3c55ad197"
}
sign = execjs.compile(open('test.js','r',encoding='utf8').read()).call('get_sign',params)
params['sign'] = sign
response = requests.get(url, headers=headers, cookies=cookies, params=params)

print(response.text)
print(response)