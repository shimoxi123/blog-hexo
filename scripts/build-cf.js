#!/usr/bin/env node

// 设置时区为上海时区
process.env.TZ = 'Asia/Shanghai';

// 显示时区信息
console.log('Setting timezone to:', process.env.TZ);
console.log('Current date:', new Date().toString());

// 执行 Hexo 命令
const { execSync } = require('child_process');

try {
  console.log('Cleaning Hexo cache...');
  execSync('npx hexo clean', { stdio: 'inherit' });
  
  console.log('Generating static files...');
  execSync('npx hexo generate', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}