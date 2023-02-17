### Node


1、初始化
git init
2、添加本地所有代码
git add .
3、提交代码描述
git commit -m '增加新的功能’
4、添加远程仓库
git remote add origin git@github.com:xxxx/xxx.git
5、初始化推送
git push -u origin master
6、提交到主分支
git push origin master
7、创建分支
git checkout -b  <branchname>  # -build
8、查看分支
git branch   
9、提交到缓存区
git add .
10、提交到分支
git push origin <barnchname>
11、删除分支
git checkout -d  <branchname>   #-delete
git branch -d <branchname>      #-delete
12、切换回主分支
git checkout master
13、合并到主分支
git merge


: Failed to connect to github.com port 443: Timed out

git config --global --unset http.proxy

git config --global --unset https.proxy


: OpenSSL SSL_read: Connection was reset, errno 10054

打开Git命令页面，执行git命令脚本：修改设置，解除ssl验证

git config --global http.sslVerify "false"