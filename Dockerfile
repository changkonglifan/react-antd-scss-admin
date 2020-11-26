# 基础镜像
FROM xuyang24/xuyang24:base_node
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
# 安装依赖 npm 安装node-sass存在翻墙问题
RUN yarn install
# 使用pm2 启动服务
CMD pm2 start server.js -i max --no-daemon