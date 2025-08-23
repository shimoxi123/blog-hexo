# Hexo Blog

这是一个使用 Hexo 和 Volantis 主题的博客项目。

## 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

## 安装

```bash
# 安装 pnpm (如果还没有安装)
npm install -g pnpm

# 安装依赖
pnpm install
```

## 开发

```bash
# 启动开发服务器
pnpm run server
# 或者
pnpm run dev

# 清理缓存
pnpm run clean

# 生成静态文件
pnpm run build

# 部署
pnpm run deploy
```

## 添加插件

```bash
# 添加新的 Hexo 插件
pnpm add hexo-plugin-name

# 添加开发依赖
pnpm add -D package-name
```

## 项目结构

- `source/` - 博客源文件
- `themes/volantis/` - Volantis 主题
- `deploy/` - 部署配置文件
- `.github/workflows/` - GitHub Actions 工作流

## 自动化部署

项目配置了 GitHub Actions 自动部署：
- 推送到 `6.0` 分支时，自动同步主题配置文件
- 推送到 `main` 分支时，自动同步 .gitmodules 文件