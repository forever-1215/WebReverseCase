import base64
import json
import random
import string
import sys
import time
import uuid
from typing import List
import ddddocr
import requests
from Crypto.Cipher import PKCS1_v1_5, AES
from Crypto.PublicKey import RSA
from Crypto.Util.Padding import pad
from loguru import logger
from guiji import *


class YunPian:
    def __init__(self):
        self.appId = "974cd565f11545b6a5006d10dc324281"
        self.fp = "7b62cb8cdc3b36ef89be236f2c637461"
        self.yp_riddler_id = str(uuid.uuid4())
        pass

    def get_cb(self):
        pool = {}
        while True:
            t = ''.join(random.choices(string.digits + 'abcdefghijklmnopqrstuvwxyz', k=10))
            if t not in pool:
                pool[t] = float('inf')
                return t
    def getRandomStr(self,length):
        result = ""
        while len(result) < length:
            result += ''.join(random.choices(string.ascii_letters + string.digits, k=10))
        return result[:length]
    def rsaEncrypt(self,data):
        public_key_pem = '''-----BEGIN PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDnOWe/gs033L/2/xR3oi6SLAMPBY
    5VledUqqH6dbCNOdrGX4xW+1x6NUfvmwpHRBA2C7xWDDvOIldTl0rMtERTDy9homrV
    qEcW6/TY+dSVFL3e2Yg2sVaehHv7FhmATkgfC2FcXt8Wvm99QpKRSrGKpcFYJwOj2F
    8hJh+rTG0IPQIDAQAB
    -----END PUBLIC KEY-----'''
        public_key = RSA.import_key(public_key_pem)
        cipher = PKCS1_v1_5.new(public_key)
        encrypted_data = cipher.encrypt(data.encode())
        return base64.b64encode(encrypted_data).decode()
    def aesEncrypt(self,data, key, iv):
        cipher = AES.new(key.encode('utf-8'), AES.MODE_CBC, iv.encode('utf-8'))
        encrypted_data = cipher.encrypt(pad(data.encode('utf-8'), AES.block_size))
        i = base64.b64encode(encrypted_data).decode()
        return i
    def get_k_i(self,mingwen_data):
        t = json.dumps(mingwen_data)
        e = self.getRandomStr(16)
        n = self.getRandomStr(16)
        return {
            "i":self.aesEncrypt(t,e,n),
            "k":self.rsaEncrypt(e + n),
        }
    def get_images(self,i,k):
        headers = {
            "Accept": "*/*",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Connection": "keep-alive",
            "Sec-Fetch-Dest": "script",
            "Sec-Fetch-Mode": "no-cors",
            "Sec-Fetch-Site": "same-site",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
            "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\""
        }
        cookies = {
            "__wksid": "n-36FF088436824277A6742E4C1EEF230F",
            "_gid": "GA1.2.1376759259.1754369519",
            "_gat_gtag_UA_199829768_1": "1",
            "MEIQIA_TRACK_ID": "30qyhyl2nxZuuyCyv2vCvB6LciB",
            "MEIQIA_VISIT_ID": "30qyi1NNHKeZfieoU8eHVOGJgSs",
            "_ga_ESVMH6YSPX": "GS2.1.s1754369518$o1$g1$t1754369542$j36$l0$h0",
            "_ga_B8H0JYR4RL": "GS2.1.s1754369518$o1$g1$t1754369542$j36$l0$h0",
            "_ga": "GA1.2.720930451.1754369518"
        }
        url = "https://captcha.yunpian.com/v1/jsonp/captcha/get"
        params = {
            "cb": self.get_cb(),
            "i": i,
            "k": k,
            "captchaId": self.appId
        }
        response = requests.get(url, headers=headers, cookies=cookies, params=params)
        logger.info(response.text)
        return json.loads(response.text[8:-1])
    def save_image(self,bg_url,front_url):
        with open('bg.jpg',"wb") as f:
            f.write(requests.get(bg_url).content)
            f.close()
            logger.success("bg.jpg saved")
        with open('front.png',"wb") as f1:
            f1.write(requests.get(front_url).content)
            f.close()
            logger.success("front.png saved")
        pass
    def get_distance(self,bgPath='./bg.jpg', frontPath='./front.png'):
        ocr = ddddocr.DdddOcr(det=False, ocr=False)
        with open(bgPath, 'rb') as f:
            bgImage = f.read()
        with open(frontPath, 'rb') as f:
            frontImage = f.read()
        distance = ocr.slide_match(frontImage, bgImage)
        logger.info(int(distance['target'][0] / 480 * 304))
        return int(distance['target'][0] / 480 * 304) + random.randint(10,11)

    def get_points(self,distance: int, trajectory_length: int,
                               start_x: int = random.randint(800,850), start_y: int = random.randint(1960,1971),
                               start_time: int = random.randint(56,60)) -> List[List[int]]:
        """
        生成滑块轨迹数组

        Args:
            distance: 滑块滑行的总距离（像素）
            trajectory_length: 生成轨迹数组的长度（点的个数）
            start_x: 起始x坐标，默认800
            start_y: 起始y坐标，默认1971
            start_time: 起始时间戳，默认56

        Returns:
            List[List[int]]: 轨迹列表，每个元素为 [x, y, time]
        """
        if trajectory_length < 2:
            raise ValueError("轨迹长度至少需要2个点")

        trajectory = []

        # 第一个点
        trajectory.append([start_x, start_y, start_time])

        # 生成中间点
        for i in range(1, trajectory_length - 1):
            # 计算进度比例
            progress = i / (trajectory_length - 1)

            # 使用贝塞尔曲线形式的缓动函数，模拟人手滑动的加速度变化
            # 先快后慢的效果
            eased_progress = 1 - math.pow(1 - progress, 3)

            # 计算x坐标（基于缓动进度）
            base_x = start_x + int(distance * eased_progress)

            # 添加小幅随机偏移，模拟手部微抖
            x_jitter = random.randint(-1, 1)
            x = base_x + x_jitter

            # 确保x坐标单调递增（允许偶尔相等）
            if x <= trajectory[i - 1][0]:
                x = trajectory[i - 1][0] + random.randint(0, 2)

            # y坐标轻微抖动，主要在1971-1973之间
            y_offset = random.choice([0, 0, 0, 1, 1, 2])  # 偏向于较小的偏移
            y = start_y + y_offset

            # 时间递增，模拟真实的时间间隔
            # 根据原数据分析，时间间隔通常在6-200ms之间，大部分在10ms以内
            if i < trajectory_length * 0.7:  # 前70%的点，间隔较小
                time_delta = random.randint(6, 25)
            else:  # 后30%的点，间隔可能较大（模拟末尾的停顿）
                time_delta = random.randint(8, 200)

            time = trajectory[i - 1][2] + time_delta

            trajectory.append([x, y, time])

        # 最后一个点，确保距离精确
        final_x = start_x + distance
        final_y = start_y + random.randint(0, 2)
        final_time = trajectory[-1][2] + random.randint(8, 50)

        trajectory.append([final_x, final_y, final_time])

        # 验证距离是否正确
        actual_distance = trajectory[-1][0] - trajectory[0][0]
        assert actual_distance == distance, f"距离不匹配: 期望{distance}, 实际{actual_distance}"

        return trajectory

    def reduce_points(self,t):
        # 原始点数据
        # 如果点数小于等于50，直接返回
        if len(t) <= 50:
            return t

        # 初始化结果列表，包含第一个点
        e = [t[0]]
        # 获取最后一个点
        n = t[-1]
        # 计算步长
        i = len(t) // 50  # Python中使用//进行整数除法
        # 如果步长小于2，返回原始列表
        if i < 2:
            return t
        # 按照步长选取点
        r = 1
        while r < len(t) - 2:
            e.append(t[r])
            r += i
        # 添加最后一个点
        e.append(n)
        return e
    def verifyCaptcha(self,distance,token):
        distanceX = (304 - 59) * (distance / (304 - 42)) / 304
        orginal_points = self.get_points(distance,int(distance * 0.68))
        # orginal_points =generate_slider_trajectory(distance,int(distance * 0.68))
        # logger.error(orginal_points)
        points = self.reduce_points(orginal_points)
        logger.critical(points)
        logger.critical(len(points))
        mingwen_data = {
            "points": points,
            "distanceX": distanceX,
            "fp": self.fp,
            "address": "https://www.yunpian.com",
            "yp_riddler_id": self.yp_riddler_id
        }
        verfify_i_k_obj = self.get_k_i(mingwen_data)
        headers = {
            "Accept": "*/*",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Connection": "keep-alive",
            "Sec-Fetch-Dest": "script",
            "Sec-Fetch-Mode": "no-cors",
            "Sec-Fetch-Site": "same-site",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
            "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\""
        }
        cookies = {
            "__wksid": "n-36FF088436824277A6742E4C1EEF230F",
            "_gid": "GA1.2.1376759259.1754369519",
            "MEIQIA_TRACK_ID": "30qyhyl2nxZuuyCyv2vCvB6LciB",
            "MEIQIA_VISIT_ID": "30qyi1NNHKeZfieoU8eHVOGJgSs",
            "_ga_ESVMH6YSPX": "GS2.1.s1754369518$o1$g1$t1754369542$j36$l0$h0",
            "_ga_B8H0JYR4RL": "GS2.1.s1754369518$o1$g1$t1754369542$j36$l0$h0",
            "_ga": "GA1.2.720930451.1754369518"
        }
        url = "https://captcha.yunpian.com/v1/jsonp/captcha/verify"
        params = {
            "cb": self.get_cb(),
            "i": verfify_i_k_obj['i'],
            "k": verfify_i_k_obj['k'],
            "token": token,
            "captchaId": self.appId
        }
        response = requests.get(url, headers=headers, cookies=cookies, params=params)
        logger.success(response.text)
        # if response.json()['']
        pass
    def run(self):
        get_mingwen_data = {
            "browserInfo": [
                {
                    "key": "userAgent",
                    "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
                },
                {
                    "key": "language",
                    "value": "zh-CN"
                },
                {
                    "key": "hardware_concurrency",
                    "value": 16
                },
                {
                    "key": "resolution",
                    "value": [
                        1280,
                        720
                    ]
                },
                {
                    "key": "navigator_platform",
                    "value": "Win32"
                }
            ],
            "nativeInfo": None,
            "additions": {},
            "options": {
                "sdk": "https://www.yunpian.com/static/official/js/libs/riddler-sdk-0.2.2.js",
                "sdkBuildVersion": "1.5.0(2021111001)",
                "hosts": "https://captcha.yunpian.com"
            },
            "fp": self.fp,
            "address": "https://www.yunpian.com",
            "yp_riddler_id": self.yp_riddler_id
        }
        get_i_k_ojb = yp.get_k_i(get_mingwen_data)
        img_obj = yp.get_images(get_i_k_ojb['i'], get_i_k_ojb['k'])
        yp.save_image(img_obj['data']['bg'], img_obj['data']['front'])
        distance = yp.get_distance()
        yp.verifyCaptcha(distance,img_obj['data']['token'])

if __name__ == '__main__':
    for i in range(1,11):
        yp = YunPian()
        yp.run()
        time.sleep(2)






