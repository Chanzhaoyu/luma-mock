# Luma Mock

![Luma Mock](/doc/cover.jpg)

## 运行项目

### 前置操作

1：复制根目录 `.env.example` 重命名 `.env`

2：登录 [Luma](https://lumalabs.ai/) 并获取 `access_token` 填入 `.env` 文件中的 `ACCESS_TOKEN` 字段

![Access Token](/doc/access_token.png)

### 开发环境运行

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