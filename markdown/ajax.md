### Ajax是什么？
`Ajax` = Asynchronous JavaScript and XML（异步的`JavaScript`和`XML`），是一种在无需重新加载整个网页的情况下，更新部分网页的技术

Ajax的基础是`XMLHttpRequest`对象，该对象用于和服务器交换数据，可以在不向服务器提交整个页面的情况下，实现局部更新网页。
#### Ajax向服务器发送请求：
当页面全部加载完成后，客户端会通过`XMLHttpRequest`对象向服务器请求数据，服务器端接收数据后，向客户端反馈数据。将请求发送至服务器，需要使用XMLHttpRequest对象的open()和send()方法

demo：
    ```
    xmlhttp.open("GET", "../demo/123.txt", true);
    xmlhttp.send();
    ```

open(method, url, async) 规定请求的类型，URL及是否异步处理请求
* method:请求类型，GET或POST
* url:文件在服务器上的地址
* async:true(异步)或false(同步)

send(string) 将请求发送到服务器
* string: 仅用于POST请求

**选择GET还是POST？**
GET比POST更简单快速，并且大部分情况下能使用，但在以下情况请使用POST
* 无法使用缓存文件（更新服务器上的文件或数据库）
* 向服务器发送大量数据（POST没有数据数量限制）
* 发送包含未知字符的用户输入时，POST比GET更稳定可靠

GET特点：
* GET请求可被缓存
* GET请求保留在浏览器历史记录中
* GET请求可被收藏为书签
* GET请求不应在处理敏感数据时使用
* GET请求有长度限制
* GET请求只应当用于取回数据

POST特点：
* POST请求不会被缓存
* POST请求不会保留在浏览器历史记录中
* POST请求不能被收藏为书签
* POST请求对数据长度没有要求

#### Ajax 获取服务器响应
XMLHttpRequest对象提供了onreadystatechange事件机制捕获请求的状态，从而实现响应。
每当readyState改变时，就会触发onreadystatechange事件。当readystate等于4且状态为200时，表示响应已就绪
XMLHttpRequest对象的三个重要属性：
* `onreadystatechange` 每当`readyState`属性改变时，就会调用此函数
* `readyState` 存有`XMLHttpRequest`的状态，从0-4共五次变化
    * 0：请求未初始化，还没调用`open()`
    * 1：请求已建立，但还没发送，即还没调用`send()`
    * 2: 请求已发送，正在处理中(通常现在可以从响应中获取头部)
    * 3：请求处理中，通常响应中已有部分数据可用了，但未全部完成
    * 4：响应已完成，可获取并使用服务器的响应
* `status` 
    * 200："OK"
    * 404：未找到页面

#### 请求正常时，xhr事件触发顺序
1. 触发`xhr.onreadystatechange`(每次`xhr.readyState`变化时都会触发一次)
2. 触发`xhr.onloadstart`(调用`send()`方法后立即触发)
    //上传阶段开始
3. 触发`xhr.upload.onloadstart`
4. 触发`xhr.upload.onprogress`(xhr.send()之后，`xhr.readyState=2`之前触发，每50ms触发一次)
5. 触发`xhr.upload.onload`
6. 触发`xhr.upload.onloadend`
    // 上传结束 下载阶段开始
7. 触发`xhr.onprogress`(`xhr.readyState=3`时触发，每50ms触发一次)
8. 触发`xhr.onload`(请求成功完成时触发)
9. 触发`xhr.onloadend`(请求结束时触发，包括请求成功和失败)

