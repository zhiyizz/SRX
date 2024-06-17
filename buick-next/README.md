# 别克官网

使用 [Next.js](https://nextjs.org/) 框架由 [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) 构建的响应式官网。

## 开始

项目使用 [pnpm](https://pnpm.io/) 作为包管理工具，在配置好Node环境后，运行以下代码：

```bash
# 安装依赖包
pnpm install

# 运行开发服务器
pnpm dev
```

基于新版的App Router定义，页面位于 `app` 目录中，SCSS 样式文件存放于 `styles` 目录。

`app/api` 目录会被映射为 `/api/*`。位于该目录中的文件会被作为 [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) 来使用以替代默认的 React 页面。

> `pages/api` 目录目前仅保存 `/hello` 接口供Docker镜像健康检查。

## 了解更多

可以点击下面链接了解更多关于 Next.js 的信息：

- [Next.js 文档](https://nextjs.org/docs) - 了解 Next.js 的功能和API。
- [学习 Next.js](https://nextjs.org/learn) - Next.js 互动式教程。

> [Next.js GitHub 官方仓库](https://github.com/vercel/next.js/)

## 发布

采用 Docker 镜像的方式发布至正式服务器，服务基于 Node.js。每次对主分支的更新都会触发 `docker build` 并上传至仓库。

参考[Dockerfile](Dockerfile)文件查看镜像打包逻辑，也可以访问[Next.js 文档](https://nextjs.org/docs/app/building-your-application/deploying#docker-image)了解更多信息。

## CDN

所有静态文件都是用CDN进行加速，手动刷新CDN请参见[刷新文件列表](cdn.md)。默认的缓存时长如下：

- __首页__：86400s
- __车型页__：7200s
- __新闻页__：604800s

## 环境变量

官网使用以下环境变量来定义编译及运行时所需的配置数据，开头为 `NEXT_PUBLIC_` 的仅编译时使用。

| 名称 | 说明 |
| :- | :- |
| `NEXT_PUBLIC_API_PREFIX` | 官网接口地址 |
| `NEXT_PUBLIC_OSSP` | OSSP地址 |
| `NEXT_PUBLIC_OSSP_QA` | OSSP测试地址 |
| `NEXT_PUBLIC_STATIC_HOST` | 静态文件路径 |
| `NEXT_PUBLIC_XINGYUN_PREFIX` | 页面底部别克Buick小程序码图片的路径 |
| `BUICK_API` | 官网接口地址 |
| `DATA_API` | 数据接口地址 |
| `PREVIEW_API` | 预览接口地址 |
| `PREVIEW_TOKEN` | 预览密钥 |
| `SECRET_TOKEN` | 通用密钥（刷新缓存） |
| `STATIC_HOST` | 静态文件原始路径 |
| `TRACKING_TOKEN` | 监测密钥 |
