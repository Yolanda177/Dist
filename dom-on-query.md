**dom-Construct.create()创建节点**

create接收四个参数：节点名，节点作为对象的属性，可选的父节点或兄弟节点，可选的位置(默认为"last")

```
var list1 = dom.byId("list1");
var three = dom.byId("three");
domConstruct.create("li", { 
    innerHTML: "Six",
    style: {
        fontWeight: "bold"
    }
}, list1);
```
**dom-Construct.place()放置节点**

place接收三个参数：要放置的节点的DOM节点或字符串ID，要用作引用的节点的DOM节点或字符串ID，作为字符串的可选位置(默认为"last")
```
function moveFirst() {
    var list1 = dom.byId("list1");
    var three = dom.byId("three");
    domConstruct.place(three, list1,"first")
}
```

**on注册事件**
1. 常见用法：on接收三个参数：元素，事件名称，处理程序
    ```
    on(dom.byId("moveFirst"), "click", moveFirst);
    ```
2. *lang.hitch在on中的使用：*
默认情况下on将在第一个参数中传递的节点的上下文中运行事件处理程序,而lang.hitch可指定运行处理程序的上下文
    ```
    var myScopedButton1 = dom.byId("myScopedButton1");
    var myScopedButton2 = dom.byId("myScopedButton2");
    myObject = {
        id: "myObject",
        onClick: function(evt) {
            alert("The scope of this handler is " + this.id);
        }
    };
    on(myScopedButton1, "click", myObject.onClick); // alert myScopedButton1
    on(myScopedButton2, "click", lang.hitch(myObject, "onClick")); // alert myObject
    ```
3. 事件委托 on(父元素，"选择器:事件名称", 处理程序)
    ```
    var div = dom.byId("parentDiv");
    on(div, ".clickMe:click", myObject.onClick);

4. NodeList将事件注册到多个节点上的on方法
    ```
    query(".clickMe").on("click", myObject.onClick); // alert button1/button3
    query(".clickMeAlso").on("click", lang.hitch(myObject, "onClick")); // alert myObject
    ```

**query检索节点列表**

    注意`query`始终返回的是一个数组
    ```
    // 查找id值为list的节点
    // 后面加索引值0返回了的是整个ul节点
    var list = query("#list")[0];

    // 查找类名为odd的节点
    var odds = query(".odd");
    ```
限制查询：
1. 使用选择器语法，让查询引擎限制在所有的DOM节点遍历查询
    ```
    var odds1 = query("#list .odd"); 
    ```
2. 将DOM节点指定为第二个参数，将查询限制为该节点及其子节点
    ```
    var odds2 = query(".odd", dom.byId("list"));
    ```
3. 采用标记名和类名组合、分隔标识符、">"进行高级选择
    ```
    var oddA = query("a.odd"); // 包含3个a
    var allA = query("li a"); // 包含6个a
    var someA = query("li > a"); // 包含2个a
    ```

query常见用法：
和`forEach()`搭配使用,将为数组中的每个匹配节点执行一个函数，该函数称回调函数，接收三个参数：当前所在的节点，节点的索引和NodeList正在迭代的节点，一般可忽略第三个参数，此外`forEach`接受第二个参数来指定应该调用回调的范围：
    ```
    query(".odd").forEach(function(node, index, nodelist) {
        domClass.add(node, "red");
    });
    ```
