#1 /bin/bash
registry=127.0.0.1:3000
repository=react-antd-scss-admin-front
git_commit_id=`git rev-parse --short HEAD`
commit_time=`date +%Y%m%d%H%M%S`
# 环境变量
# export NODE_EN=$1
# 打包
npm run build
# docker打包
docker build -t ${registry}/${repository}:${commit_time}_${git_commit_id} .
# 修改镜像名
# docker tag ${registry}/${repository}:${commit_time}_${git_commit_id}  ${registry}/${repository}:latest
# 打印
echo  ${registry}/${repository}:${commit_time}_${git_commit_id}
# 启动镜像
docker run -d -p 3000:3000 ${registry}/${repository}:${commit_time}_${git_commit_id} 
