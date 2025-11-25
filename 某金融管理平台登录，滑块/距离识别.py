import os

import cv2
import ddddocr
from loguru import logger


def get_distance(bg_path='bg_test.jpg',slice_path='slice_test.jpg'):
    det = ddddocr.DdddOcr(det=True, ocr=True)
    try:
        with open(slice_path, 'rb') as f:
            target_bytes = f.read()
        with open(bg_path, 'rb') as f:
            background_bytes = f.read()
    except:
        logger.error('图片打开失败')
    res = det.slide_match(target_bytes, background_bytes)
    logger.warning(f'ddddocr识别结果为：{res}')
    return int(res['target'][0])
def get_slide_distance(bg_path, slide_path):
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
if __name__ == '__main__':
    distance = get_slide_distance('bg_test.jpg','slice_test.jpg')
    print(distance)