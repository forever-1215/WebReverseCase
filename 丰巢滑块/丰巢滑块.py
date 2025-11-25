# -- coding: utf-8 --
# https://fcbox.com/pages/user/login.html
import time
import json
import uuid
import random
import base64
import hashlib
import ddddocr
import requests
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
from loguru import logger
class Fc(object):
    def __init__(self):
        self.headers = {
            'Referer': 'https://fcbox.com/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',

        }
        self._uuid = str(uuid.uuid4())
    def get_slide(self):
        url = f'https://acs.fcbox.com/captcha/querySlideImage/{self._uuid}'
        response = requests.post(url, headers=self.headers, json={})
        return response.json()


    def save_img(self, img_url, save_path):
        img_resp = requests.get(img_url, headers=self.headers)
        with open(save_path, "wb") as f:
            f.write(img_resp.content)

    def get_distance(self):
        slide = ddddocr.DdddOcr(show_ad=False)
        with open('bg.jpg', 'rb') as f:
            background_bytes = f.read()
        with open('slide.jpg', 'rb') as f:
            target_bytes = f.read()
        res = slide.slide_match(background_bytes, target_bytes, simple_target=True)
        return res.get('target')[0]

    def get_track(self, distance, pointY):
        start_time = int(time.time() * 1000)
        track = []
        for i in range(1, distance):
            # 生成一个 20 到 100 之间的随机偏移量
            offset = random.randint(20, 100)
            item = {
                'x': i,
                'y': pointY,
                'time': start_time + offset
            }
            track.append(item)
        return track

    def get_sign(self, clientIp, checkId, track):
        str_track = ''.join(f"{item['x']}{item['y']}{item['time']}" for item in track)
        data = clientIp + checkId + self._uuid + str_track
        return hashlib.md5(data.encode('utf-8')).hexdigest()


    def encrypt_aes_ecb_pkcs7(self, text, key):
        plaintext = text.encode('utf-8')
        key_bytes = key.encode('utf-8')
        cipher = AES.new(key_bytes, AES.MODE_ECB)
        padded_plaintext = pad(plaintext, AES.block_size)
        ciphertext = cipher.encrypt(padded_plaintext)
        encrypted_base64 = base64.b64encode(ciphertext).decode('utf-8')
        return encrypted_base64


    def checkCode(self, data):
        url = f'https://acs.fcbox.com/captcha/checkCode/{self._uuid}'
        response = requests.post(url, headers=self.headers, data=data)
        return response.json()


    def main(self):
        # 1.获取图片
        slide_res = self.get_slide()
        logger.debug(slide_res)
        checkId = slide_res['data']['checkId']
        clientIp = slide_res['data']['clientIp']
        key = slide_res['data']['key']
        pointY = slide_res['data']['pointY']
        bg_url = slide_res['data']['shadeImageUrl']
        slide_url = slide_res['data']['slideImageUrl']

        # 2.保存图片
        self.save_img(bg_url, "bg.jpg")
        self.save_img(slide_url, "slide.jpg")

        # 3.滑动距离
        distance = self.get_distance()
        logger.info(f"滑动距离：{distance}")

        # 4.生成轨迹
        track = self.get_track(distance, pointY)
        logger.warning(track)

        # 5.sign
        sign = self.get_sign(clientIp, checkId, track)

        # 6.AES加密
        encrypt_obj = {
            'sign': sign,
            'track': track
        }
        encrypt_obj = json.dumps(encrypt_obj, separators=(',', ':'))
        data = self.encrypt_aes_ecb_pkcs7(encrypt_obj, key)
        logger.info(data)

        # 7.验证
        res = self.checkCode(data)
        logger.success(res)


if __name__ == '__main__':
    f = Fc()
    f.main()



