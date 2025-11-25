import random
import math
from typing import List


def generate_slider_trajectory(distance: int, trajectory_length: int,
                               start_x: int = random.randint(800,850), start_y: int = random.randint(1971,1973),
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
        x_jitter = random.randint(-1, 2)
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


# 测试函数
if __name__ == "__main__":
    # 根据你提供的数据，距离是 930 - 800 = 130，长度是84个点
    test_distance = 130
    test_length = 84

    result = generate_slider_trajectory(test_distance, test_length)

    print(f"生成的轨迹长度: {len(result)}")
    print(f"起始坐标: {result[0]}")
    print(f"结束坐标: {result[-1]}")
    print(f"实际滑行距离: {result[-1][0] - result[0][0]}")
    print(f"时间跨度: {result[-1][2] - result[0][2]}ms")

    # 打印前10个点和后10个点
    print("\n前10个点:")
    for point in result[:10]:
        print(point)

    print("\n后10个点:")
    for point in result[-10:]:
        print(point)