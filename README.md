# Luma Mock

![Luma Mock](/doc/cover.png)

## 运行项目

### 前置操作

1： 复制根目录 `.env.example` 重命名 `.env`

2: 登录 [Luma](https://lumalabs.ai/) 并获取 `access_token` 填入 `.env` 文件中的 `ACCESS_TOKEN` 字段

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

### 生产环境打包

打包

```shell
pnpm build
```

生产环境运行

```shell
pnpm preview
```

## License

[MIT](license)
