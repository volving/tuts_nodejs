# 第二章 Node从起步学起

* [安装Node， 在shell里使用Node](#s1)
* [NPM](#s2)
* [编辑器](#s3)
* [一个简单实例](#s4)
* [Event-Driven Programming事件驱动编程](#s5)
* [Routing 路由](#s6)
* [Serving Static Resource 提供静态资源服务](#s7)

<h2 id="s1">安装Node， 在shell里使用Node</h2>


### 安装：
首次安装，你需要到官网下载安装版或源码进行编译安装
移步[Nodejs官网](http://nodejs.org)，下载所需要的版本或直接下载源码各取所需。

### 运行
Node的运行依赖于Shell命令， 十分简单，`node <filename>`, 至于其他的命令，可以用`node --help`来查看，不在话下
<hr/><hr/>


<h2 id="s2">NPM</h2>

Node包管理器NPM（Node Packge Manager)可以很方便得安装卸载相应的应用包， 使用起来十分顺手  

1. `npm install -S -g <package-name>`, e.g.`npm install --g grunt-cli``npm install --save-dev grunt`
其中，上述命令中的`-S`代表`Save`，表明安装到本个项目（or 目录）；`－g`代表`Global`，指明安装到全局环境, 这里或许你得用刀root权限了；`--save-dev`顾名思义，就是安装到在开发环境中，运行环境不安装。
2. `npm install`， 假如当前目录是一个项目目录（或包目录，指一个包含`package.json`的包，通过`npm init`初始化过的包含`package.json`的包），用此命令可以安装`package.json`中标明的相关包。 一般我们的项目在上传git仓库的时候，`.gitignore`中添加`node_modules`来忽略通过npm安装的包，但会保留我们项目的`package.json`文件，当我们重新部署的时候就可以用此命令来一次性完成相关包的安装。
3. `npm remove <package-name>`，删除包


### Tips
补充，node可以通过`nvm`来进行版本的管理，相关资料自行google之（bing之，百度之）。

<hr/><hr/>


<h2 id="s3">编辑器</h2>
使用任何你喜欢的编辑器来编写node代码， 因为nodejs使用的是纯javascript，所以最好找一个支持js代码高亮的编辑器。推荐Sublime Text 3，带有JS插件的Eclipse，Atom，Vim，Emacs... 还有万恶的WebStorm，如果你有钱且不在乎订阅WebStorm使用权请把“万恶”去掉。 对微软那一套东西不感冒不赞成，除了玩几局游戏（且觉得windows是个好游戏机）以外一般不开windows主机，所以不要问windows下的问题，包括它的记事本。。。  
<hr/><hr/>
<h2 id="s4">一个简单实例</h2>

说完了废话，到时间该
> Talking is cheap, show me the code！  

参照本章src目录下的 **helloWorld.js**  并用`node helloWorld.js`运行起来（如果你喜欢边修改文件边看到实时更新，那我推荐你安装`nodemon`，仅仅一行代码`npm install -g nodemon`便可完成，之后用`nodemon helloWorld.js`，然后就享受其便利吧。

```js
var http = require('http');

var listener = function(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello, world!');
};

var server = http.createServer(listener);

server.listen(8000);

console.log('Server started on localhost:8000; press Ctrl+C to terminate...');
```

解释一下这段代码：  

1. 第1行 用标准的JavaScript方式引入了http模块。
第3行 定义了一个函数， 它接受两个参数，一个是Request实例，一个是Response实例，并在后者中写入HTML头信息`{...}`以及文本信息`Hello, world!`。
2. 第8行 创建了一个http的server,并把上一步定义的函数传递进去。其实这样创建了一个在接受到http请求后，要经过listener的处理的“服务器”。
3. 第10行 将上一步创建的server对象跑起来并监听`8000`端口。
4. 第12行 标准js控制台输出，无需多言。  

简化版的代码如下  

```js
require('http').createServer(function(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello, world!');
}).listen(8000);
／／console.log('Server started on localhost:8000; press Ctrl+C to terminate...');
```

瞧啊，你用了4行就跑起了一个会说 ”Hello, world!"的服务器，他也只会说这个。。。  
不得不说，js的链式调用真的很简洁！其实你在jQuery里会时刻领教到。

<hr><hr>


<h2 id="s5">Event-Driven Programming事件驱动编程</h2>

开发要旨便是：作为程序员的你得知道那些事件（Events）可以捕获，然后对其作相应的处理。 一个很好的例子是，用户对网页上的元素进行鼠标的悬停，单击，双击，然后浏览器捕获这些事件（悬停，单击，双击）并分别用定义好的函数来对事件进行处理。 同样，服务器端的事件驱动也就大概如此，只是事件不同而已。  
<hr/><hr/>


<h2 id="s6">Routing 路由</h2>  

> Show me the CODE!  

```js
var http = require('http');

http.createServer(function(req, res){
	console.log(req.url);
	var path = req.url.replace(/\/*(?:\?.*)?$/, '').toLowerCase();
	console.log(path);
	switch(path){
		case '':
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end('Homepage');
			break;
		case '/about':
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end('about');
			break;
		default: 
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end('Not Found');
			break;
	}
}).listen(8000);


```
上面代码多了一个正则表达式，大意是替换掉url路径中的查询字串和以及路径后面跟随的`／`
把正则表达式匹配的字串删掉后剩下的路径部分，进行switch匹配，分别回应客户端对应的字串。

<hr/><hr/>

<h2 id="s7">Serving Static Resource 提供静态资源服务</h2>
如果你曾静用过Apach或IIS，一定记得只要把文件扔到正确的目录，就可以通过http访问。但这在nodejs里行不通： 你得打开对应的文件，读取它，然后返回给客户端。所以，给出以下实例：
> Show me the CODE!

```js
var http 	= require('http');
var fs 		= require('fs');

var serveStaticFile = function(res, path, contentType, statusCode){
	if(!statusCode){
		statusCode = 200;
	}
	fs.readFile(__dirname.concat(path), function(err, data){
		if(err){
			res.writeHead(500, {'Content-Type': contentType});
			res.end('500-server\'s dizzying');
			return;
		}else{
			res.writeHead(500, {'Content-Type': contentType});
			res.end(data);
		}
	});
};

http.createServer(function(req, res){
	var path = req.url.replace(/\/*(?:\?.*)?$/, '').toLowerCase();
	switch(path){
		case '':
			console.log('Requested for /home');
			serveStaticFile(res, '/public/home.html', 'text/html');
			break;
		case '/about':
			serveStaticFile(res, '/public/about.html', 'text/html');
			break;
		case '/img/logo':
			serveStaticFile(res, '/public/img/logo.jpg', 'image/jpeg');
			break;
		default: 
			serveStaticFile(res, '/public/404.html', 'text/html');
			break;
	}
}).listen(8000);
```
注意第8行用到了一个异步读取文件的方法。第31行提供jpeg格式的文件时Response对象的Content－Type类型！剩下的就是：

> Read the f**king CODE!