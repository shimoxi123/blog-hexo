---
layout: friends # 必须
title: 友链 # 可选,这是友链页的标题
---
{% friends only:youlian %}
## 申请友链

欢迎交换友链！你可以通过以下方式申请友链：

### 方式一：提交 Pull Request（推荐）

1. Fork 本仓库：https://github.com/shimoxi123/blog-hexo
2. 编辑 `source/_data/friends.yml` 文件，在 `youlian` 分组的 `items` 中添加你的信息
3. 提交 Pull Request，等待审核通过

### 方式二：在评论区留言

在本页面评论区留言，提供以下信息：
- 网站名称
- 网站地址
- 头像链接
- 网站描述（可选）

### 友链格式

请按照以下格式添加友链信息：

```yaml
- title: "你的网站名称"
  url: https://your-website.com/
  avatar: https://your-avatar-url.com/avatar.png
  description: "网站描述（可选）"
```

### 本站信息

如需添加本站友链，请使用以下信息：

```yaml
- title: "石墨烯积木"
  url: https://www.shimxo.qzz.io/
  avatar: https://img.san3.cn/logo.webp
  description: "分享一些有趣的东西"
```
