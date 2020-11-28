# 说明
## 技术核心
### 1. react 17.0.1 react-router-dom 5.2.0  antd 4.8.4

### 2. 使用 react hook技术

### 3. 项目使用react-create-app脚手架搭建, 后台使用java开发.
### 4. 密码加密采用JSEncrypt加密

### 5. 采用axios请求,并进行简单的封装.

## 功能
### 目前已有功能有: 登录, 登出, 修改密码,用户管理, 日志操作, 导出excel等.
### 首页继续完善中 其他功能待开发中

# 项目打开方式
## 安装依赖
    npm install
    或者
    yarn install 
## 启动项目
    npm run start 
    或者
    yarn start

## 打包方式
    npm run build
    或者
    yarn build
## 使用docker
### docker打包项目
    增加docker打包配置,使用如下:
    sh run.sh
### 构建docker基础镜像
    buildDockerBase文件夹
    sh build.sh


# 后台服务
## 后台使用java spring boot + mybits
    
可跳转到 [项目地址](https://github.com/changkonglifan/admin_service)

[git地址](git@github.com:changkonglifan/admin_service.git) git@github.com:changkonglifan/admin_service.git

# 项目树状结构
```
react-antd-scss-admin
├─ .env             // 环境配置
├─ .env.production  // 生产环境配置
├─ Dockerfile       // docker打包文件
├─ package.json     // package.json
├─ public           // 主启动页
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ manifest.json
│  └─ robots.txt
├─ README.md        // README.md
├─ run.sh           // docker打包启动命令 sh run.sh
├─ server.js        // nodejs 服务，docker中使用
├─ src              // 核心代码
│  ├─ action        // action
│  │  └─ login.js   // 登录相关操作
│  ├─ api           // 请求相关
│  │  ├─ login.js   // 所有登录请求
│  │  ├─ logs.js    // 所有日志请求
│  │  ├─ tags.js    // 所有标签请求
│  │  └─ user.js    // 用户请求
│  ├─ App.js        // react 根组件
│  ├─ App.scss      // 通用样式
│  ├─ App.test.js   // 测试
│  ├─ components    // 组件
│  │  ├─ FooterComponent    // 底部组件
│  │  │  └─ index.js
│  │  ├─ HeaderComponent    // 投部组件
│  │  │  ├─ ChangePsw.js    // 修改密码
│  │  │  ├─ index.js
│  │  │  └─ index.scss
│  │  └─ LeftSide           // 左侧边栏
│  │     └─ index.js
│  ├─ constants             // 常量
│  │  └─ types.js
│  ├─ index.css             // 全局样式
│  ├─ index.js              // 入口文件
│  ├─ logo.svg              // logo
│  ├─ reducer               // Reducer
│  │  ├─ index.js
│  │  ├─ login.js
│  │  └─ menu.js
│  ├─ reportWebVitals.js
│  ├─ setupTests.js
│  ├─ statics               // 静态资源
│  │  └─ logo.png
│  ├─ utils                 // 通用工具
│  │  ├─ config.js          // 配置相关
│  │  ├─ enums.js           // 枚举类
│  │  ├─ http.js            // 封装axios请求
│  │  └─ index.js           // 通用
│  └─ views                 // 页面
│     ├─ Home               // 首页
│     │  ├─ index.js
│     │  └─ index.scss
│     ├─ Layout             // 页面整体布局
│     │  ├─ index.js
│     │  └─ index.scss
│     ├─ Login              // 登录页面
│     │  ├─ bg.jpeg
│     │  ├─ bg.jpg
│     │  ├─ index.js
│     │  └─ index.scss
│     ├─ Logs               // 日志
│     │  ├─ index.js
│     │  └─ index.scss
│     ├─ NoMatch            // 404
│     │  ├─ 404.svg
│     │  ├─ index.js
│     │  └─ index.scss
│     ├─ Route              // 通用路由
│     │  └─ index.js
│     ├─ Tags               // 标签
│     │  ├─ index.js
│     │  └─ index.scss
│     └─ UserManager        // 用户管理
│        ├─ AddModal.js
│        ├─ index.js
│        └─ index.scss
└─ yarn.lock

```