import blackboxprotobuf
from loguru import logger

# 给定的十六进制字符串
hex_string = '0a0570617065721206e788ace899ab'
# 将十六进制字符串转换为字节串
byte_string = bytes.fromhex(hex_string)
logger.info('字节串==>>' + str(byte_string))
original_data, message_type = blackboxprotobuf.protobuf_to_json(byte_string)
print(original_data)
print(message_type)