import time
from loguru import logger
import execjs
import requests
import json
_timestamp = int(time.time())
# print(_timestamp)

headers_params = execjs.compile(open('./gmyb.js', 'r',encoding='utf-8').read()).call('get_header_params', _timestamp)
logger.info('请求头参数 ===》》》 ' + str(headers_params))
headers = {
    "Accept": "application/json",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    "Origin": "https://fuwu.nhsa.gov.cn",
    "Referer": "https://fuwu.nhsa.gov.cn/nationalHallSt/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0",
    "X-Tingyun": "c=B|4Nl_NnGbjwY;x=709ef95f57c049ec",
    "channel": "web",
    "contentType": "application/x-www-form-urlencoded",
    "sec-ch-ua": "\"Microsoft Edge\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "x-tif-nonce": headers_params['x-tif-nonce'],
    "x-tif-paasid": "undefined",
    "x-tif-signature": headers_params['x-tif-signature'],
    "x-tif-timestamp":str(_timestamp)
    # "x-tif-nonce": "L5VXRCBC",
    # "x-tif-paasid": "undefined",
    # "x-tif-signature": "8c55bdf27deec16705f45a3a2a913a7ffa6510c836ecb689af3b376cc124327a",
    # "x-tif-timestamp": "1727574431"
}
# cookies = {
#     "https_waf_cookie": "fc50883c-215b-44ae2cbfd06817e9788712c11ca68b470b11",
#     "amap_local": "440300",
#     "yb_header_show": "true",
#     "gb_nthl_sessionId": "b1919a69b62b4e03ba52c5cbd6b5761d",
#     "yb_header_active": "-1"
# }


data1 = {
    "data": {
        "addr": "",
        "regnCode": "330100",
        "medinsName": "",
        "medinsLvCode": "",
        "medinsTypeCode": "",
        "outMedOpenFlag": "",
        "pageNum": 1,
        "pageSize": 100,
        "queryDataSource": "es"
    },
    "appCode": "T98HPCGN5ZVVQBS8LZQNOAEXVI9GYHKQ",
    "version": "1.0.0",
    "encType": "SM4",
    "signType": "SM2",
    "timestamp": _timestamp
}
data2 = {
    "data": {
        "data": {
            "addr": "",
            "regnCode": "330100",
            "medinsName": "",
            "medinsLvCode": "",
            "medinsTypeCode": "",
            "outMedOpenFlag": "",
            "pageNum": 1,
            "pageSize": 100,
            "queryDataSource": "es"
        },
        "appCode": "T98HPCGN5ZVVQBS8LZQNOAEXVI9GYHKQ",
    }
}

data_params = execjs.compile(open('./gmyb.js', 'r',encoding='utf-8').read()).call('get_data_params', data1,data2, _timestamp)
logger.info('data参数 ===》》》 ' + str(data_params))
url = "https://fuwu.nhsa.gov.cn/ebus/fuwu/api/nthl/api/CommQuery/queryFixedHospital"
data = {
    "data": {
        "data": {
            "encData":data_params['encData']
            # "encData": "3DFBCA4667B978F639BB23B95DCE4CC71E3DC064D0ADDA8937278F29A6FB0735CCD20943B4DAE96380B41164D761DE9742C84A985FE3BABC31CB352556BB87C9C1495DB24A29AB6BC3A85AB7FCA00F33C56677481A67C67F739EE2C7D589054DC373615B5DDB33C24C5B31E61CB7643E00DDA865C3B75C85735F0744B0227B5CD0B4E7BB97C60BF8E5275CAFCAFD1E13E384C10195003FD638576645B5EF45EA"
        },
        "appCode": "T98HPCGN5ZVVQBS8LZQNOAEXVI9GYHKQ",
        "version": "1.0.0",
        "encType": "SM4",
        "signType": "SM2",
        "timestamp": data_params['timestamp'],
        "signData":data_params['signData']
        # "signData": "R7hGImBLDTfPAj0P6hu/Nk2P//Ii2iVkUQUXI68OFLrUTYak0ZgfhdhW+g03GY5ecSL98qSp/bkVXi9Dz35V0Q=="
    }
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers,
                         # cookies=cookies,
                         data=data)

logger.info('密文数据 ===》》》 ' + str(response.json()['data']))

mingwen = execjs.compile(open('./gmyb.js', 'r',encoding='utf-8').read()).call('decrypt',response.json())
logger.info('明文数据 ===》》》 ' + str(mingwen))
