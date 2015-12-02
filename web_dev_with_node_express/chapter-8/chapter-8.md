# Form Handling

* [网服务器发送数据](#s1)
* [HTML Form](#s2)
* [Encoding](#s3)
* [处理表单的](#s4)
* [在Express中处理表单](#s5)
* [处理Ajax表单](#s6)
* [文件上传](#s7)
* [jQuery文件上传](#s8)

<h2 id="s1">网服务器发送数据</h2>

方式有两种
1. queryString 对应 GET方法
2. Request.body 对应 POST

要提交的form记得写好`method="POST"`，否则GET会让你的信息曝露并且url地址显得又长又恶心

<h2 id="s2">HTML Form</h2>  

代码示例, 参考 `/views/example.hbs` 中

<h2 id="s3">Encoding</h2>  

上传前就会默认对表单进行encode，如不指明类型，默认`application/x-form-urlencoded`，express支持的类型。
若果上传文件，那么强制使用`multipart/form-data`


<h2 id="s4">表单上传后的处理方式</h2>  
可选的方式有好多，如下  
* 重定位到既定的`success`/`failure`页面
* 带有`flash-message`的返回原地址的方式
* 带有`flash-message`的导航到新位置的方式
* Ajax提交表单大多不用变位置

<h2 id="s5">在Express中处理表单</h2>

借用一个包`bordy-parser`来parse表单内容，然后我们就可以直接访问：`req.body.<form_input_name>`


<h2 id="s6">处理Ajax表单</h2>


<h2 id="s7">文件上传</h2>

<h2 id="s8">jQuery文件上传</h2>