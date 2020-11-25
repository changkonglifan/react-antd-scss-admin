# 基础镜像
FROM xuyang24/xuyang24:base
#端口
EXPOSE 3000
#环境变量
ARG ENV
# 配置环境变量
ENV NODE_ENV=${ENV}
# 打包文件夹
ADD / /react-antd-scss-admin
# 进入文件夹
WORKDIR /react-antd-scss-admin
# 安装依赖
RUN npm install --registry=https://registry.npm.taobao.org
# 使用pm2 启动服务
CMD pm2 start server.js -i max --no-daemon