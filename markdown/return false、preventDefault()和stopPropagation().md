**return false、preventDefault()和stopPropagation()的使用**
1. 调用`return false`会执行以下功能：
    * event.preventDefault()
    * event.stopPropagation()
    * 停止回调函数执行并立即返回

2. 调用`preventDefault()` 阻止浏览器执行默认行为
：在html文档中，触发某些DOM元素的特定事件时会执行该元素的默认行为，如链接的`click`事件，当我们点击一个链接时，就会跳转到指定的URL
3. 调用`stopPropagation()` 阻止当前事件在DOM树上冒泡

demo:
```
    <script src="/yolandalll/Yolanda/jquery-3.3.1.js"></script>
    <table>
        <tr>
            <td><span>阻止冒泡事件测试</span></td>
        </tr>
    </table>
    <script>
        $(function () {
            $("table").click(function () {
                alert("table alert");
            });
            $("td").click(function () {
                alert("td alert");
            });
            $("span").click(function (e) {
                alert("span alert");
                // e.stopPropagation() 
            });
        });
    </script>
```
当点击文字`阻止冒泡事件测试`时，依次弹出span alert->td alert->table alert
要阻止事件冒泡 需要在回调函数中添加`e.stopPropagation()`