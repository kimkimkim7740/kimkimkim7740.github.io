# 产品展示网站

这是一个完全免费的产品展示网站，使用GitHub Pages托管。

## 功能特点

- ✅ 完全免费（无需服务器、无需数据库）
- ✅ 响应式设计（手机/电脑自适应）
- ✅ 产品画廊展示
- ✅ 多角度细节图查看
- ✅ 联系表单（通过Formspree转发）
- ✅ Telegram/微信联系方式
- ✅ 无价格显示，仅展示产品

## 如何部署

### 1. 创建GitHub账号（如果还没有）
访问 [GitHub](https://github.com) 注册账号

### 2. 创建新仓库
- 点击右上角 "+" → "New repository"
- 仓库名格式：`用户名.github.io`（例如：kim4790.github.io）
- 选择 "Public"（公开）
- 勾选 "Add a README file"

### 3. 上传网站文件
- 下载本文件夹所有文件
- 在GitHub仓库点击 "Add file" → "Upload files"
- 将所有文件拖拽上传
- 点击 "Commit changes"

### 4. 开启GitHub Pages
- 进入仓库 Settings → Pages
- 在 "Source" 选择 "Deploy from a branch"
- 在 "Branch" 选择 "main" 或 "master"，文件夹选择 "/ (root)"
- 点击 Save
- 等待1-2分钟，访问 `https://你的用户名.github.io`

## 如何更新产品

### 方法1：直接编辑JSON文件（推荐）
1. 登录GitHub
2. 进入你的仓库
3. 找到 `data/products.json` 文件
4. 点击编辑（铅笔图标）
5. 按照格式添加新产品：

```json
{
  "id": 7,
  "title": "你的产品名称",
  "description": "产品描述（50字内）",
  "images": [
    "https://你的图片链接1.jpg",
    "https://你的图片链接2.jpg"
  ],
  "category": "category1"
}
```

6. 点击 "Commit changes"
7. 网站将在1分钟内自动更新

### 方法2：上传图片并更新
1. 将产品图片上传到 `images/` 文件夹
2. 编辑 `data/products.json`，使用相对路径：
```json
"images": [
  "images/你的产品1.jpg",
  "images/你的产品2.jpg"
]
```

## 自定义配置

### 更新联系方式
编辑 `config/config.json`：

```json
{
  "site": {
    "title": "你的网站标题",
    "description": "网站描述",
    "contactEmail": "你的邮箱",
    "telegramUsername": "你的Telegram用户名",
    "wechatQR": "images/wechat-qr.jpg"
  }
}
```

### 更新分类名称
编辑 `config/config.json` 中的 categories 部分：

```json
"categories": [
  {"id": "category1", "name": "你的分类1"},
  {"id": "category2", "name": "你的分类2"},
  {"id": "category3", "name": "你的分类3"}
]
```

### 设置Formspree联系表单（可选）
1. 访问 [Formspree](https://formspree.io) 注册免费账号
2. 创建新表单，获取表单ID
3. 将ID填入 `config/config.json` 中的 `formspree.formId`

## 注意事项

### 图片建议
- 尺寸：建议 800×600 像素
- 格式：JPG或PNG
- 压缩：使用 [TinyPNG](https://tinypng.com) 压缩图片
- 存储：可上传到GitHub仓库或使用免费图床

### 安全提醒
- 不要上传明显侵权商标的图片
- 不要在图片中包含价格信息
- 不要在网站描述中提及品牌名称

### 备份建议
- 定期下载整个仓库到本地
- 使用多个GitHub账号备份
- 可同时部署到Netlify作为备用

## 故障排除

### 网站无法访问
- 检查仓库名是否为 `用户名.github.io`
- 检查GitHub Pages设置是否正确
- 等待5-10分钟再试（首次部署需要时间）

### 图片不显示
- 检查图片链接是否正确
- 确保图片已上传成功
- 使用浏览器开发者工具检查控制台错误

### 表单不工作
- 检查Formspree表单ID是否正确
- 检查网络连接
- 尝试使用Telegram/微信作为备用联系方式

## 联系方式

如有问题，可通过Telegram联系。

---

**提示**：本网站为静态网站，所有数据存储在JSON文件中，无需数据库，简单易用。