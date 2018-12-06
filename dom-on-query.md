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