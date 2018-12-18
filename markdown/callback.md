### 理解异步async和同步sync：
```
// 一个同步的demo 按顺序执行f1->f2 因为f1中改变了全局变量a的值，所以在执行f2时，a=1
var a = 0;
function f1() {
    a = 1;
}
function f2() {
    console.log(a);
}
f1();
f2(); // 输出1
```

```
// 一个异步的demo
function A() {
    console.log("执行A函数");
    setTimeout(function() {
        console.log("执行A函数的延迟函数");
    }, 1000);
};
function B() {
    console.log("执行B函数);
}
A();
B();
// 执行顺序
// 执行A函数->执行B函数->执行A函数的延迟函数
```
以上代码会先执行A函数、B函数，而不会等到A中的延迟函数执行完才去执行B函数。延迟函数被触发过程中就执行了B函数，当`JS`引擎的event队列空闲时才会去执行队列里等待的`setTimeout`的匿名回调函数(及时时间设置为0也是先执行B)

### 回调函数
    Google的解释：A callback is a function that is passed as an argument to another function and is executed after its parent function has completed.

几个常见的回调函数使用demo：

```
// 异步请求的回调
$.get('ajax/test/html', function(data) {
    $('.result').html(data);
    alert('Load was performed.');
})
```

```
// 点击事件的回调
$('#target').click(function() {
    alert("Handler for .click() called.");
});
```

```
// 数组中遍历每一项用的回调函数
this.tabs.forEach(function(tab, index) {
    if(tab.selected) {
        this.focustab = this.tabs[index];
    }
}.bind(this));
```

```
// 同步回调
function getNodes(parms, callback) {
    var list = JSON.stringify(parms)
    typeof(callback) === 'function' && callback(list);
}
getNodes('[1, 2, 3]', function(nodes) {
    // do something
});
```
**所以回调与同步、异步并没有绑定关系，回调只是一种实现方式，既可以有同步回调，也可以有异步回调，而回调函数的执行在于它何时在包含函数内被调用**

### 为什么要使用回调函数？
JS的单线程模式使得JS代码中所需要执行的事情像排队一样，一件一件等待被触发和执行，如果队列中有一件事情需要花费很长时间，那么后面的任务都将处于一种等待状态，倘若其中有一件正在执行的任务是一个死循环，那么会导致后续其他任务无法正常执行。所以出现了异步模式。
异步模式下，每一个异步的任务都有自己一个或多个回调函数，这样，在当前执行的异步任务执行完成之后，不会马上执行事件队列中的下一项任务，而是执行它的回调函数，而下一项任务也不会等当前这个函数执行完才执行，下一项任务会在触发时就马上执行。
举个例子：
```
function A(callback) {
    console.log("执行A函数");
    setTimeout(function () {
        console.log("执行A的延迟函数");
    }, 1000);
    callback();
}
function B() {
    console.log("执行A的回调函数B");
}
function C() {
    setTimeout(function() {
        console.log("执行C的延迟函数");
    }, 1000);
}
C();
A(B);
       
// 执行顺序 
// 执行A函数
// 执行A的回调B函数
// 执行C的延迟函数
// 执行A的延迟函数
```
再看一个有关this的回调函数demo，回调函数是闭包的，此时回调函数传递给了全局函数，所以可以访问包含函数的变量，甚至全局变量
```
var clientData = {
    id: 094554,
    fullName: "Not Set",
    setUserName: function(firstName, lastName) {
        this.fullName = firstName + " " + lastName;
    }
}
function getUserInput(firstName, lastName, callback) {
    callback(firstName, lastName);
    // callback.call(clientData, firstName, lastName); // 修改
}
getUserInput("Barack", "Obama", clientData.setUserName);
console.log(clientData.fullName); // Not Set
console.log(window.fullName); // Barack Obama
// console.log(clientData.fullName) // 修改后Barack Obama
```







```
// childNodes firstChild lastChild 关系
    <ul id="action"> 
        <li title="第一段文字">第一个</li>
        <li title="第二段文字">第二个</li>
        <li title="第三段文字"><p>p里的文字</p></l>
    </ul>
    <button onclick="myFunction()">1</button>
    function myFunction() {
        var attr = document.getElementById("action");
        console.log(attr.childNodes); // NodeList(6)[text, li, text, li, text, li]
        console.log(attr.childNodes[0]); // #text
        console.log(attr.childNodes[0].nodeValue); // 空白
        console.log(attr.firstChild.nodeValue); // 空白
        console.log(attr.childNodes[1].firstChild.nodeValue); // 第一个
        console.log(attr.childNodes[5].firstChild); // <p>p里的文字</p>
        console.log(attr.childNodes[5].firstChild.nodeValue); // null
        console.log(attr.firstChild); // #text
        console.log(attr.lastChild); // <li title="第三段文字"><p>p里的文字</p></l>
    }
```