from functools import partial  # 这个函数可以锁定一个函数的参数
import subprocess

# 固定subprocess.Popen的encoding参数为UTF-8
subprocess.Popen = partial(subprocess.Popen, encoding='utf-8')


import requests
import execjs



url = 'https://www.endata.com.cn/API/GetData.ashx'

data = {
    'year': 2024,
    'MethodName': 'BoxOffice_GetYearInfoData'
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
}

res = requests.post(url, data=data, headers=headers).text

# 解密
with open('demo.js', 'r', encoding='UTF-8') as f:
    js_code = f.read()

js_compile = execjs.compile(js_code)
print(js_compile.call('analyse', res))
