#coding=utf-8
import blackboxprotobuf
import requests
from loguru import logger

hex_string = '0a160a0570617065721206e788ace899ab280130144201001001'
byte_string = bytes.fromhex(hex_string)
# 解析得到原始数据和消息类型
original_data, message_type = blackboxprotobuf.protobuf_to_json(byte_string)
# str类型,原始数据
logger.info('原始数据==>>' + str(original_data))
# dict类型，消息类型
logger.info('消息类型==>>' + str(message_type))
# 序列化数据
# 修改消息类型之后的数据
original_data1 = {
  "1": {
    "1": "paper",
    "2": "中药",
    "5": 1,
    "6": 20,
    "8": "\u0000"
  },
  "2": 1
}
# {'1': {'type': 'message', 'message_typedef': {'1': {'type': 'bytes', 'name': ''}, '2': {'type': 'bytes', 'name': ''}, '5': {'type': 'int', 'name': ''}, '6': {'type': 'int', 'name': ''}, '8': {'type': 'bytes', 'name': ''}}, 'name': ''}, '2': {'type': 'int', 'name': ''}}
message_type1  = {'1': {'type': 'message', 'message_typedef': {'1': {'type': 'bytes', 'name': ''}, '2': {'type': 'bytes', 'name': ''}, '5': {'type': 'int', 'name': ''}, '6': {'type': 'int', 'name': ''}, '8': {'type': 'bytes', 'name': ''}}, 'name': ''}, '2': {'type': 'int', 'name': ''}}
form_data = bytes(blackboxprotobuf.encode_message(original_data1, message_type1))
logger.info('序列化数据==>>' + str(form_data))
logger.info('序列化数据长度==>>' + str(len(form_data)))
headers = {
    "content-type": "application/grpc-web+proto",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
}

url = "https://s.wanfangdata.com.cn/SearchService.SearchService/search"

response = requests.post(url, data=bytes([0,0,0,0,len(form_data)]) + form_data, headers=headers)
# 反序列化响应结果,反序列化的时候也只需要传入消息数据就OK，所以索引从5开始
response_data, message_type = blackboxprotobuf.protobuf_to_json(response.content[5:])
logger.info('反序列化响应结果==>>' + str(response_data))
