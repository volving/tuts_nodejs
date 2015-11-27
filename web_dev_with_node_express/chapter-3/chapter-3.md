# 用Express来节省时间

* [用grunt来简化开发流程](#s1)


<h2 id="s1">用grunt来简化开发流程</h2>  

为了方便起见，我们使用**grunt**这个工具，关于它的介绍，查看[Grunt官网](http://gruntjs.com)  
###安装 
它的安装十分方便：`npm install -g grunt-cli`  
然后就可以安装并使用grunt能用的包来简化我们的开发了  
用用命令来安装所需要的包：  

```shell
npm install --save-dev grunt time-grunt load-grunt-tasks grunt-contrib-less grunt-autoprefixer grunt-contrib-cssmin grunt-contrib-clean grunt-contrib-copy
```
###使用  
1. `Gruntfile.js`
2. 运行grunt任务  

#### 编写Gruntfile.js  
它的要求不高，只要语法无误，随意发挥