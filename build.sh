#!/bin/bash

# 设置时区为上海时区
export TZ='Asia/Shanghai'

# 显示当前时区信息
echo "Current timezone: $TZ"
echo "Current date: $(date)"

# 安装依赖
npm install

# 清理缓存
npx hexo clean

# 生成静态文件
npx hexo generate

echo "Build completed successfully!"