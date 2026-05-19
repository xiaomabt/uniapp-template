# UniApp Template

一个基于 UniApp 框架的完整应用程序模板，支持多端发布（H5、微信小程序、App）。

## 技术栈

- **框架**: UniApp 3.x
- **语言**: TypeScript
- **状态管理**: Pinia
- **组件库**: Element Plus (H5)
- **构建工具**: Vite
- **样式**: SCSS

## 项目结构

```
src/
├── components/          # 公共组件
│   ├── NavBar.vue       # 导航栏组件
│   ├── TabBar.vue       # 底部标签栏
│   ├── SearchBar.vue    # 搜索栏组件
│   ├── ProductCard.vue  # 商品卡片
│   ├── CategoryGrid.vue # 分类网格
│   └── Slider.vue       # 轮播图组件
├── pages/               # 页面
│   ├── index/           # 首页
│   ├── category/        # 分类页
│   ├── cart/            # 购物车页
│   ├── mine/            # 个人中心
│   └── detail/          # 商品详情
├── stores/              # Pinia 状态管理
│   ├── cart.ts          # 购物车状态
│   └── user.ts          # 用户状态
├── utils/               # 工具函数
│   ├── index.ts         # 通用工具
│   └── request.ts       # 网络请求封装
├── data/                # 模拟数据
│   └── products.ts      # 商品数据
├── styles/              # 样式文件
│   ├── global.scss      # 全局样式
│   ├── variables.scss   # 样式变量
│   └── iconfont.css     # 图标字体
├── App.vue              # 应用入口组件
├── main.ts              # 应用入口文件
├── pages.json           # 页面配置
└── manifest.json        # 应用配置
```

## 功能特性

- ✅ 响应式设计，适配多种屏幕尺寸
- ✅ 完整的页面路由和导航
- ✅ 购物车状态管理
- ✅ 用户状态管理
- ✅ 商品分类展示
- ✅ 商品详情页
- ✅ 集成 Element Plus 组件库
- ✅ 阿里 iconfont 图标支持

## 安装依赖

```bash
npm install
```

## 运行命令

### H5 开发

```bash
npm run dev:h5
```

### H5 构建

```bash
npm run build:h5
```

### 微信小程序开发

```bash
npm run dev:mp-weixin
```

### 微信小程序构建

```bash
npm run build:mp-weixin
```

### App 开发

```bash
npm run dev:app
```

### App 构建

```bash
npm run build:app
```

## 部署说明

### H5 部署

1. 执行 `npm run build:h5`
2. 将 `dist/build/h5` 目录部署到静态服务器

### 微信小程序部署

1. 执行 `npm run build:mp-weixin`
2. 使用微信开发者工具打开 `dist/build/mp-weixin` 目录
3. 上传并提交审核

## 注意事项

- Element Plus 仅在 H5 端完全支持，小程序端请使用 UniApp 原生组件
- 图标使用阿里 iconfont，需确保网络可访问 CDN 资源
- 商品图片使用 picsum.photos 服务，生产环境请替换为真实图片

## License

MIT
