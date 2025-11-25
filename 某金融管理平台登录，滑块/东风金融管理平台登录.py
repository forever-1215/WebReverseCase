import base64
import os
import time
import json
import cv2
import execjs
import requests
import uuid
import hashlib
import random
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
import base64
from loguru import logger


def get_images():
    headers = {
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "Authorization;": "",
        "Cache-Control": "no-cache, no-store, max-age=0,must-revalidate",
        "Connection": "keep-alive",
        "Expires": "0",
        "Pragma": "no-cache",
        "Referer": "https://csmp.df-finance.com.cn/mpcloud/login",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0",
        "clientId": "mplanyou",
        "gversion;": "",
        "lang": "ZH_CN",
        # "noncestr": "76c66f08-1735-bbb1-afba-4bea2fabba2a",
        "range": "1",
        "sec-ch-ua": "\"Chromium\";v=\"140\", \"Not=A?Brand\";v=\"24\", \"Microsoft Edge\";v=\"140\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        # "sign": "de06a5f5253794d0569575ea868e00475229825eab6a3980356f25b513757ae372becb061b665d7bbd7ea111048638f5ec3f964c5f0b1d8fe3050f81682203f7",
        # "timestamp": "1757644446444"
    }
    noncestr = str(uuid.uuid4())
    timestamp = str(int(time.time()))
    sign = hashlib.sha512((headers['clientId'] + timestamp + noncestr + "1").encode()).hexdigest()
    headers['noncestr'] = noncestr
    headers['timestamp'] = timestamp
    headers['sign'] = sign
    url = "https://csmp.df-finance.com.cn/gateway/allinoneservice/mp/login/slidercode.do"
    params = {
        "clientid": "",
        "tenancyId": "-1",
        "menuId": "",
        "menuName": "",
        "orgTemplateId": "",
        "ClientServer": "https://csmp.df-finance.com.cn"
    }
    response = requests.get(url, headers=headers, params=params)
    logger.debug(f"响应结果:{response.json()}")
    return response.json()
def save_image(bg_base64,slice_base64):
    with open('bg.jpg', "wb") as f:
        f.write(base64.b64decode(bg_base64))
        f.close()
    with open('slice.jpg', "wb") as f1:
        f1.write(base64.b64decode(slice_base64))
        f1.close()
    logger.success('图片保存成功！！！')
def get_slide_distance(bg_path='bg.jpg', slide_path='slice.jpg'):
    '''
    识别滑块具体位置，返回位置比例: 位置/图片宽度
    使用的时候再乘以实际图片宽度即可
    '''
    bg_img = cv2.imread(bg_path)
    sd_img = cv2.imread(slide_path)
    bg_gray = cv2.cvtColor(bg_img, cv2.COLOR_BGR2GRAY)
    bg_gray = cv2.GaussianBlur(bg_gray, (5, 5), 0)
    bg_edge = cv2.Canny(bg_gray, 30, 100)
    rgb_bg_gray = cv2.cvtColor(bg_edge, cv2.COLOR_GRAY2RGB)

    sd_gray = cv2.cvtColor(sd_img, cv2.COLOR_BGR2GRAY)
    sd_gray = cv2.GaussianBlur(sd_gray, (5, 5), 0)
    sd_edge = cv2.Canny(sd_gray, 30, 100)
    rgb_sd_gray = cv2.cvtColor(sd_edge, cv2.COLOR_GRAY2RGB)
    result = cv2.matchTemplate(rgb_bg_gray, rgb_sd_gray, cv2.TM_CCORR_NORMED)
    _, _, _, max_loc = cv2.minMaxLoc(result)
    cv2.rectangle(bg_img, (max_loc[0], max_loc[1]), (max_loc[0] + 110, max_loc[1] + 110),
                  (0, 255, 0), 2)
    result_path = os.path.join(os.path.dirname(bg_path), "./PictureTemp/result.png")
    cv2.imwrite(result_path, bg_img)
    return max_loc[0]


def encrypt_request_params(username, password, clientid, distance, key="mplanyou07558888"):
    """
    生成加密的请求参数，实现与JavaScript代码相同的逻辑

    参数:
        username: 用户名
        password: 密码
        clientid: 客户端ID（上一个接口返回）
        distance: 滑块距离
        key: 加密密钥，默认为"mplanyou07558888"

    返回:
        加密后的请求参数字符串
    """

    def md5_hash(s):
        """计算MD5哈希值"""
        return hashlib.md5(s.encode('utf-8')).hexdigest()

    def y_func(e, t, n):
        """实现JavaScript中的y函数逻辑"""
        # 第一轮循环：3次MD5
        for a in range(3):
            if a != 0:
                e = e.lower()
            e = md5_hash(e)

        # 第二轮循环：4次MD5
        for a in range(4):
            e = e.lower()
            if a == 0:
                e = t + e
            e = md5_hash(e)

        # 最后处理
        e = e.lower() + n
        e = md5_hash(e).lower()
        return e

    def aes_encrypt(text, key):
        """AES-ECB加密，PKCS7填充"""
        # 确保密钥长度为16字节（AES-128）
        key = key.ljust(16, '\0')[:16].encode('utf-8')
        cipher = AES.new(key, AES.MODE_ECB)
        # 填充数据
        padded_text = pad(text.encode('utf-8'), AES.block_size, style='pkcs7')
        # 加密并Base64编码
        encrypted = cipher.encrypt(padded_text)
        return base64.b64encode(encrypted).decode('utf-8')

    # 生成随机码
    random_code = str(random.random())[2:]  # 类似JavaScript的Math.random().toString().substring(2)
    # 计算密码的哈希值
    pwd = y_func(password, username, random_code)
    # 构建请求参数对象
    params = {
        "user": username,
        "pwd": pwd,
        "mode": "9",
        "randomCode": random_code,
        "clientid": clientid,
        "slidercode": str(distance)
    }

    # 转换为JSON字符串并加密
    params_json = json.dumps(params, ensure_ascii=False)
    encrypted_params = aes_encrypt(params_json, key)

    return encrypted_params
def verify(username,password,clientid,distance):
    headers = {
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "Authorization;": "",
        "Cache-Control": "no-cache, no-store, max-age=0,must-revalidate",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Expires": "0",
        "Origin": "https://csmp.df-finance.com.cn",
        "Pragma": "no-cache",
        "Referer": "https://csmp.df-finance.com.cn/mpcloud/login",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0",
        "clientId": "mplanyou",
        "gversion;": "",
        "lang": "ZH_CN",
        # "noncestr": "b15e56b8-844b-b24e-8b05-6979e8da97ad",
        "range": "1",
        "sec-ch-ua": "\"Chromium\";v=\"140\", \"Not=A?Brand\";v=\"24\", \"Microsoft Edge\";v=\"140\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        # "sign": "b294fb0d22c79f97492da66953ed08c45b5c7d3575b2a149c26d8ffee0d4f12c83126aa6ba3df798bca6269b80b13314a7bddd4a4c15b8ec30d328f4c03dce64",
        # "timestamp": "1757647754841"
    }
    noncestr = str(uuid.uuid4())
    timestamp = str(int(time.time()))
    sign = hashlib.sha512((headers['clientId'] + timestamp + noncestr + "1").encode()).hexdigest()
    headers['noncestr'] = noncestr
    headers['timestamp'] = timestamp
    headers['sign'] = sign
    url = "https://csmp.df-finance.com.cn/gateway/allinoneservice/mp/login/validlogin.do"
    params = {
        "tenancyId": "-1",
        "ClientServer": "https://csmp.df-finance.com.cn"
    }
    reuestParas = encrypt_request_params(username,password,clientid,distance)
    data = {
        "reuestParas": reuestParas
    }
    response = requests.post(url, headers=headers, params=params, data=data)
    logger.info(response.text)
if __name__ == '__main__':
    username = 'asghchgbui'
    password = 'xyz123456'
    imgs = get_images()
    save_image(imgs['rows']['bigImage'],imgs['rows']['cutImage'])
    distance = get_slide_distance()
    verify(username,password,imgs['rows']['clientid'],distance)
