# -*- coding: UTF-8 -*-
import json
import random
import string

import ddddocr
import re
import time
from PIL import Image
import execjs
# import requests
from curl_cffi import requests
from bs4 import BeautifulSoup
from captcha_recognizer.recognizer import Recognizer
from loguru import logger
import random
import math
from fake_useragent import UserAgent
ua = UserAgent()
headers = {
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Referer": "https://exaccount2.eastmoney.com/",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "no-cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
cookies = {
    "qgqp_b_id": "0d6126df8b192c502190f229191593a4",
    "st_si": "96098690414738",
    "st_asi": "delete",
    "st_pvi": "86734555670593",
    "st_sp": "2025-07-09%2010%3A16%3A21",
    "st_inirUrl": "https%3A%2F%2Fpassport2.eastmoney.com%2F",
    "st_sn": "3",
    "st_psi": "20250709173315932-0-1895979306"
}
def get_ctxid():
    appid = ctxid = __RequestVerificationToken = ''
    url = "https://exaccount2.eastmoney.com/home/Login4"
    response = requests.get(url, headers=headers)
    cookies_RequestVerificationToken = response.headers['set-cookie'].split('; path=')[0].split('=')[1]
    logger.debug(f"获取到cookies_RequestVerificationToken: {cookies_RequestVerificationToken}")
    soup = BeautifulSoup(response.text, 'html.parser')
    input_tag = soup.find('input', {'id': 'hdAccountCaptContextId'})
    if input_tag and 'value' in input_tag.attrs:
        logger.debug(f"获取到ctxid: {input_tag['value']}")
        ctxid = input_tag['value']
    scripts = soup.find_all('script')
    for script in scripts:
        if script.string:
            pattern = r"var CaptAppId = '([^']+)'"
            match = re.search(pattern, script.string)
            if match:
                appid = match.group(1)
                logger.debug(f"获取到appid: {appid}")
    ##<input name="__RequestVerificationToken" type="hidden" value="E9CpToFh0N1Fh7ajgRp7jUNMmXvqJ_EVaUr6PC8OwgOV2vN73bavkrjSRj2zQPSIBjwIL0qNl8yClJIWOj9lfOnyDDw1" />
    input_tag1 = soup.find('input', {'name': '__RequestVerificationToken'})
    if input_tag1 and 'value' in input_tag1.attrs:
        logger.debug(f"获取到__RequestVerificationToken: {input_tag1['value']}")
        __RequestVerificationToken = input_tag1['value']
    return appid,ctxid,__RequestVerificationToken,cookies_RequestVerificationToken
def initial(ctxid, request):
    url = "https://smartvcode2.eastmoney.com/Titan/api/captcha/get"
    params = {
        "callback": "cb",
        "ctxid": ctxid,
        "request": request,
        "_": str(int(time.time()*1000))
    }
    response = requests.get(url, headers=headers,cookies=cookies, params=params)
    logger.debug(f"初始化返回数据是==>>{response.text}")
    init_result = re.search(r"typeof cb === 'function' && cb\((.*?)\)", response.text)
    init_result_json = json.loads(init_result.group(1))
    if init_result_json["Msg"] == "成功":
        logger.success("初始化成功")
    return response.text
def first_wugan_verfity(ctxid,first_wugan_request):
    url = "https://smartvcode2.eastmoney.com/Titan/api/captcha/Validate"
    params = {
        "callback": "cb",
        "ctxid": ctxid,
        "request": first_wugan_request,
        "_": str(int(time.time()*1000))
    }
    response = requests.get(url, headers=headers,cookies=cookies,params=params)
    logger.debug(f"第一次无感验证返回数据是==>>{response.text}")
    wugan_result = re.search(r"typeof cb === 'function' && cb\((.*?)\)", response.text)
    wugan_result_json = json.loads(wugan_result.group(1))
    return wugan_result_json
def get_yzm_data(ctxid,yzm_request):
    url = "https://smartvcode2.eastmoney.com/Titan/api/captcha/get"
    params = {
        "callback": "cb",
        "ctxid": ctxid,
        "request": yzm_request,
        "_": str(int(time.time()*1000))
    }
    response = requests.get(url, headers=headers,
                            cookies=cookies,
                            params=params)
    yzm_resul = re.search(r"typeof cb === 'function' && cb\((.*?)\)", response.text)
    yzm_result_json = json.loads(yzm_resul.group(1))
    logger.warning(f"获取验证码的json数据是==>>{yzm_result_json}")
    if yzm_result_json["Msg"] == "成功":
        logger.success("获取验证码成功")
    return yzm_result_json
def save_slide_img(yzm_data):
    with open ("bg.jpg", "wb") as f:
        f.write(requests.get('https://' + json.loads(yzm_data['Data']['CaptchaInfo'])['static_servers'][0] + json.loads(yzm_data['Data']['CaptchaInfo'])['bg']).content)
        f.close()
        logger.success(f"保存有缺口背景图片成功！！！")
    with open ("slide.png", "wb") as f1:
        f1.write(requests.get('https://' + json.loads(yzm_data['Data']['CaptchaInfo'])['static_servers'][0] + json.loads(yzm_data['Data']['CaptchaInfo'])['slice']).content)
        f1.close()
        logger.success(f"保存缺口图片成功")
    with open ("full_bg.jpg", "wb") as f2:
        f2.write(requests.get('https://' + json.loads(yzm_data['Data']['CaptchaInfo'])['static_servers'][0] + json.loads(yzm_data['Data']['CaptchaInfo'])['fullbg']).content)
        f2.close()
        logger.success(f"保存完整背景图片成功！！！")
def restore_slide_img(original_img, slice_width=12, slice_height=80):
    """
    将被特殊分割的图像重新拼接成完整图像

    参数:
        original_img: PIL.Image对象，原始被分割的图像
        slice_width: 每个切片的宽度，默认为12像素
        slice_height: 每个切片的高度，默认为80像素

    返回:
        PIL.Image对象，拼接好的完整图像
    """

    # 构建切片还原顺序映射表
    def build_mapping():
        """
        构建切片位置映射表，定义每个切片在原始图像中的位置
        映射规则来自原始JS代码中的a()函数逻辑
        """
        # 定义切片顺序数组
        slice_order = list(map(int, "6_11_7_10_4_12_3_1_0_5_2_9_8".split("_")))
        mapping = []

        # 为每个切片计算其在原始图像中的位置
        for slice_idx in range(52):
            # 计算基础索引位置
            base_idx = 2 * slice_order[int((slice_idx % 26) / 2)] + (slice_idx % 2)

            # 根据奇偶行调整索引
            if (int(slice_idx / 2) % 2) == 0:
                base_idx += -1 if (slice_idx % 2) else 1

            # 处理下半部分的切片
            if slice_idx >= 26:
                base_idx += 26

            mapping.append(base_idx)

        return mapping

    # 构建映射表
    slice_mapping = build_mapping()

    # 创建用于拼接的空白画布 (312x160)
    canvas_width = 26 * slice_width
    canvas_height = 2 * slice_height
    canvas = Image.new("RGB", (canvas_width, canvas_height))

    # 遍历所有切片并进行拼接
    for target_pos in range(52):
        # 获取当前切片在原始图像中的位置
        source_pos = slice_mapping[target_pos]

        # 计算当前切片所在的行 (0=上半部分, 1=下半部分)
        target_row = 0 if target_pos < 26 else 1
        source_row = 0 if source_pos < 26 else 1

        # 计算切片在原始图像中的列位置
        source_col = source_pos % 26

        # 定义在原始图像中的切片区域坐标
        left = source_col * slice_width
        upper = source_row * slice_height
        right = left + slice_width
        lower = upper + slice_height

        # 定义在画布中的粘贴位置
        paste_left = (target_pos % 26) * slice_width
        paste_upper = target_row * slice_height

        # 从原始图像中裁剪切片并粘贴到画布上
        slice_img = original_img.crop((left, upper, right, lower))
        canvas.paste(slice_img, (paste_left, paste_upper))

    canvas.save("restored_bg.jpg")
    canvas.close()
    logger.success("成功还原图片，并保存到 restored.jpg 文件中")
def get_distince(bg_img, sl_img):
    det = ddddocr.DdddOcr(det=True, ocr=True)
    with open(sl_img, 'rb') as f:
        target_bytes = f.read()
    with open(bg_img, 'rb') as f:
        background_bytes = f.read()
    res = det.slide_match(target_bytes, background_bytes)
    logger.debug(f"获取的缺口距离是==>>{res['target'][0]}")

    return res['target'][0]
def get_distance1(bg_img):
    recognizer = Recognizer()
    box, confidence = recognizer.identify_gap(source=bg_img, verbose=False)
    logger.warning(f"识别的缺口距离可信度是==>>{confidence}")
    return int(box[0]/312*260 - 7)
def generate_slider_trace(distance, segments=60):
    total_time = distance * 13
    """
    生成更精确模拟人类操作的滑块轨迹，确保y坐标在0-3之间

    参数:
    distance (int): 滑块需要移动的总距离
    total_time (int): 总耗时(毫秒)
    segments (int): 轨迹分段数

    返回:
    str: 格式化的轨迹数据字符串
    """
    # 轨迹点列表，初始位置
    trace_points = [(0, 0, 0)]
    current_x = 0
    current_y = 0
    time = 0

    # 轨迹阶段划分
    accel_ratio = 0.2  # 加速阶段比例
    steady_ratio = 0.6  # 匀速阶段比例
    adjust_ratio = 0.2  # 调整阶段比例

    accel_points = max(1, int(segments * accel_ratio))
    steady_points = max(1, int(segments * steady_ratio))
    adjust_points = max(1, segments - accel_points - steady_points)

    # 生成加速阶段轨迹 (开始较慢，逐渐加速)
    for i in range(accel_points):
        progress = i / accel_points
        # 使用指数函数模拟加速
        smooth_progress = 1 - math.pow(1 - progress, 3)
        target_x = int(distance * accel_ratio * smooth_progress)

        time_gap = random.randint(15, 30)
        time += time_gap

        # y轴微调，确保在0-3之间
        if current_y < 3 and random.random() > 0.5:
            current_y += 1
        elif current_y > 0 and random.random() < 0.2:
            current_y -= 1

        # 更新x坐标并确保不超过当前阶段的目标
        current_x = min(target_x, current_x + random.randint(1, 3))
        trace_points.append((current_x, current_y, time))

    # 生成匀速阶段轨迹
    steady_distance = int(distance * steady_ratio)
    start_steady_x = current_x

    for i in range(steady_points):
        # 计算匀速阶段的目标位置
        target_x = start_steady_x + int(steady_distance * (i + 1) / steady_points)

        time_gap = random.randint(15, 35)
        time += time_gap

        # y轴微调，确保在0-3之间
        if current_y < 3 and random.random() > 0.6:
            current_y += 1
        elif current_y > 0 and random.random() < 0.3:
            current_y -= 1

        # 更新x坐标，确保匀速增长
        step = max(1, (target_x - current_x) // (steady_points - i))
        current_x = min(target_x, current_x + step)
        trace_points.append((current_x, current_y, time))

    # 生成调整阶段轨迹 (接近终点时的微调)
    remaining_distance = distance - current_x
    start_adjust_x = current_x

    for i in range(adjust_points):
        # 接近终点时的过冲和回调
        overshoot = int(remaining_distance * 0.3 * math.sin((i + 1) * 0.6))
        target_x = start_adjust_x + remaining_distance + overshoot

        time_gap = random.randint(20, 50)
        time += time_gap

        # y轴微调，确保在0-3之间
        if current_y < 3 and random.random() > 0.7:
            current_y += 1
        elif current_y > 0 and random.random() < 0.4:
            current_y -= 1

        # 逐步接近目标位置
        if current_x < target_x:
            current_x = min(target_x, current_x + random.randint(1, 3))
        else:
            current_x = max(target_x, current_x - random.randint(1, 3))

        # 确保最终停在目标位置
        if i == adjust_points - 1:
            current_x = distance

        trace_points.append((current_x, current_y, time))

    # 确保最后一个点的时间是总时间
    if trace_points[-1][2] != total_time:
        last_point = list(trace_points[-1])
        last_point[2] = total_time
        trace_points[-1] = tuple(last_point)

    # 格式化轨迹数据
    trace_str = ":".join([f"{p[0]},{p[1]},{p[2]}" for p in trace_points])
    return trace_str ,total_time
def vertify_slide(ctxid,vertify_slide_request):
    url = "https://smartvcode2.eastmoney.com/Titan/api/captcha/Validate"
    params = {
        "callback": "cb",
        "ctxid": ctxid,
        "request": vertify_slide_request,
        "_": str(int(time.time()*1000))
    }
    response = requests.get(url, headers=headers,
                            params=params)
    logger.warning(f'验证结果是==>>{response.text}')
    vertify_result = re.search(r"typeof cb === 'function' && cb\((.*?)\)", response.text)
    vertify_result_json = json.loads(vertify_result.group(1))
    if json.loads(vertify_result_json['Data']['Result'])['success'] == True:
        logger.success('验证成功')
        validate = json.loads(vertify_result_json['Data']['Result'])['validate']
    else:
        logger.error('验证失败')
        validate = None
    logger.debug(f'validate结果是==>>{validate}')
    return validate
def login(ctxid,validate,username, password,__RequestVerificationToken,cookies_RequestVerificationToken):
    headers1 = {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://exaccount2.eastmoney.com",
        "Pragma": "no-cache",
        "Referer": "https://exaccount2.eastmoney.com/home/Login4?rc=1211581091",
        "RequestVerificationToken": __RequestVerificationToken,
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        "X-Requested-With": "XMLHttpRequest",
        "deviceType": "Web",
        "domainName": "passport2.eastmoney.com",
        "productType": "UserPassport",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\""
    }
    # headers['RequestVerificationToken']=__RequestVerificationToken
    cookies['__RequestVerificationToken'] = cookies_RequestVerificationToken
    rsa_password = execjs.compile(open('demo.js', 'r', encoding='utf-8').read()).call('get_rsapassword', password)
    logger.warning(f'加密后的密码是==>>{rsa_password}')
    url = "https://exaccount2.eastmoney.com/JsonAPI/Login3"
    data = {
        "username": username,
        "password": rsa_password,
        "captconetxt": ctxid,
        "captvalidate": validate
    }

    # data = json.dumps(data, separators=(',', ':'))
    logger.warning(f'登录数据是==>>{data}')
    response = requests.post(url, headers=headers1, cookies=cookies, data=data)
    logger.info(f'登录结果是==>>{response.text}')

if __name__ == '__main__':
    validate = ''
    appid,ctxid,__RequestVerificationToken,cookies_RequestVerificationToken  = get_ctxid()
    username = '12345645349'
    password = 'xxoo123456'
    init_request = execjs.compile(open("demo.js", "r", encoding="utf-8").read()).call("get_init_request", appid,ctxid,username, password)
    initial(ctxid,init_request)
    first_wugan_request = execjs.compile(open("demo.js", "r", encoding="utf-8").read()).call("get_first_wugan_request", appid,ctxid,username, password)
    wugan_result = first_wugan_verfity(ctxid,first_wugan_request)
    if wugan_result['Data'] != None:
        validate = json.loads(wugan_result['Data']['Result'])['validate']
        logger.warning(f'无感验证成功,不用二次验证==>>{validate}')
    else:
        yzm_request = init_request
        yzm_data = get_yzm_data(ctxid,yzm_request)
        if yzm_data["Data"]["CaptchaType"] == "slide":
            save_slide_img(yzm_data)
            restore_slide_img(Image.open("bg.jpg"))
            # distance = get_distince("restored_bg.jpg", "slide.png")
            distance = get_distance1("restored_bg.jpg")
            trace_str,total_time = generate_slider_trace(distance)
            logger.warning(f'滑动距离是==>>{distance},滑动轨迹是==>>{trace_str}')
            vertify_slide_request = execjs.compile(open("demo.js", "r", encoding="utf-8").read()).call("get_vertify_slide_request", appid,ctxid,username, password,trace_str,total_time,distance)
            # "appid=201802274651|ctxid=f3b61bd15dd6cee0159f8b6a0402c1ac|type=slide|u=169|d=0,0,0:2,0,41:11,0,58:21,-1,74:32,-2,90:39,-2,106:42,-2,121:46,-2,137:49,-2,147:51,-2,165:54,-2,177:56,-3,193:57,-3,210:58,-3,226:59,-3,242:60,-3,258:62,-3,274:64,-3,289:65,-3,305:67,-3,321:69,-3,346:70,-3,361:72,-3,377:74,-3,394:79,-3,410:84,-3,427:90,-3,442:95,-3,458:98,-3,473:101,-3,497:104,-3,525:108,-3,537:110,-3,553:113,-3,578:114,-3,593:116,-3,610:118,-3,626:120,-3,641:123,-3,657:125,-3,681:128,-3,697:130,-3,714:133,-3,730:136,-3,746:138,-3,761:140,-3,786:141,-3,810:142,-3,826:143,-3,841:145,-3,866:147,-3,889:149,-3,913:150,-3,929:151,-3,945:152,-3,961:153,-3,986:154,-3,1026:155,-3,1138:156,-3,1194:157,-3,1234:158,-3,1291:159,-3,1321:161,-3,1361:162,-3,1426:163,-3,1473:164,-3,1522:165,-3,1538:166,-3,1643:167,-3,1746:168,-3,1837:169,-3,1923:169,-3,2690|a=12340545349|p=xxo123456|t=2690|r=0.9489079166020568"
            validate = vertify_slide(ctxid,vertify_slide_request)
        else:
            logger.error(f'验证码类型是==>>{yzm_data["Data"]["CaptchaType"]}')
    login(ctxid, validate, username, password, __RequestVerificationToken, cookies_RequestVerificationToken)

