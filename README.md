# Luma Mock

使用 `Luma` 官网 `API` 运行的可部署网页项目。[预览](https://luma-mock-git-main-chenzhaoyu02s-projects.vercel.app/)

![Luma Mock](/doc/cover.jpg)

## 环境变量

| 变量名称       | 是否必填 | 描述         |
| -------------- | -------- | ------------ |
| `ACCESS_TOKEN` | 必填     | access_token |
| `PROXY_URL`    | 可选     | 代理接口     |
| `SECRET_KEY`   | 可选     | 访问密钥     |

## 运行项目

### 前置操作

1：复制根目录 `.env.example` 重命名 `.env`

2：登录 [Luma](https://lumalabs.ai/) 并获取 `access_token` 填入 `.env` 文件中的 `ACCESS_TOKEN` 字段

![Access Token](/doc/access_token.png)

### 开发环境运行

务必使用 `Node>20` 以上版本

1: 安装 `pnpm`

```shell
npm install pnpm -g

```

2: 安装依赖

```shell
pnpm install
```

3: 开发环境运行

```shell
pnpm dev
```

P.S. 开发环境第一次运行可能出现类型错误，请运行 `pnpm prepare` 后再运行 `pnpm dev`

## 部署

## Vercel

1：`fork` 项目

![Fork](/doc/deploy1.jpg)

2：打开 [Vercel](https://vercel.com) 新建项目

![Vercel](/doc/deploy2.jpg)

3：选择命令

![Script](/doc/deploy3.jpg)

4：填入环境变量

![Environment variable](/doc/deploy4.jpg)

### Node 服务环境

打包

```shell
pnpm build
```

运行

```shell
pnpm preview
```

## License

[MIT](license)
