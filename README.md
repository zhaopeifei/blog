# 个人网站

## npm包
dev模式下及正常模式下的npm包信息都在package.json中，这是node的规范。
bash指令
`npm install --production` 等同于`npm install package.json --production`将安装packag.json中给出的npm包，但不安装devDependencies下，即开发模式下得npm包。

`npm install <name>`安装这个npm包。
--save -S 更新到packag.json中的dependencies列表中。
--save-dev -D 更新到packag.json中的devDependencies列表中。

`npm init` 创建package.json文件

`npm start` 执行package.json文件中的start


## gitignore
npm包在网上可以获取，所以不需要再git add commit push时包括这些包，此外还有https的密匙也可以上传，所以，可以将这些git不需要关心的文件，放入.gitignore中。


## 构建工具
工具：gulp
bash： 
`gulp`: 执行文件gulpfile.js，此处的gulpfile文件主要用于自动化转换，将scss文件转换为css，调整css语句顺序，检查错误等。gulpfile中watch任务，则一直执行watch任务，除非退出。

`gulp --gulpfile gulpbuild.js`，构建应用。此处主要将要上传的文件进行压缩，并排除不需要的文件。此外，构建的应用将放到另外一个文件夹中。这样，那个文件夹中就只有需要的生产环境的文件了。开发应用和生产应用分离。


## 生产应用
部分修改：
* 修改http、https服务监听端口号；
* 去掉package.json中的devDependencies列表，
* 修改angular等一些资源的http地址。

将生产型应用推到github上。
`git add -A`
`git commit -m "info"`
`git push`


## 获取生产应用
1. 在服务器中使用git获取应用
`git clone https://github.com/zhaopeifei/blog_peyton.git` 我在腾讯云服务器只开启了http80、https443端口，所以只能通过http、https获取
2. 更新使用`git pull`
3. 更改文件可读写权限为所有人可读写：`sudo chmod -R 777 blog_peyton`
4. 安装npm包：`npm install --production`
5. 安装bower包，在public下，输入bash `bower install`
6. 生成密匙

    1. 生成服务器私有密匙：`openssl genrsa -out server.key 1024`
    2. 使用私有密匙生成证书签名请求文件：`openssl req -new -key server.key -out server.csr` 此步骤要求填写国家、地区、联系方式等信息，Common Name要匹配服务器域名。
    3. 通过私有密匙自签名生成证书(带签名的公开密匙)：`openssl x509 -req -in server.csr -signkey server.key -out server.cert -days 3650`。可以为pem格式

7. 可能需要修改端口号，在开发时，express可能将端口号设为了3000等，需要修改。最好再生成生成应用上时就修改。
8. `sudo node bin/www`或`sudo npm start` 注意，使用超级用户身份开启，因为需要用到端口。