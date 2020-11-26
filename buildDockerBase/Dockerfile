# 基础镜像
FROM centos

# 安装 wget
RUN yum install -y wget
# 下载nodejs
RUN wget https://nodejs.org/dist/v12.14.0/node-v12.14.0-linux-x64.tar.xz

#解压包
RUN tar -xvf node-v12.14.0-linux-x64.tar.xz
#连接
RUN ln -s /node-v12.14.0-linux-x64/bin/node /usr/bin/node
RUN ln -s /node-v12.14.0-linux-x64/bin/npm /usr/bin/npm
RUN ln -s /node-v12.14.0-linux-x64/bin/npx /usr/bin/npx
#安装pm2
RUN npm install pm2 -g
#连接pm2
RUN ln -s /node-v12.14.0-linux-x64/bin/pm2 /usr/bin/pm2

# 安装 yarn
RUN npm install -g yarn
# 连接yarn
RUN ln -s /node-v12.14.0-linux-x64/bin/yarn /usr/bin/yarn