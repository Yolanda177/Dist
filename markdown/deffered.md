**Deferred**
`dojo/Deferred`是一个类，用于管理异步线程(回调)之间的通信。线程完成时使用`.then()`方法触发回调
```
function asyncProcess(msg) {
    var deferred = new Deferred();
    dom.byId("output").innerHTML += "<br />I'm running"; // 4 16
    console.log("main order"); // 5 17
    setTimeout(function() { // 6 18
        deferred.resolve(msg); // 12 22
        console.log("settimeout order"); // 21 25
    }, 1000);
    console.log("after settimeout order"); // 7 19
    return deferred.promise; // 8 20
}
on(dom.byId("startButton"), "click", function() { // 点击按钮 1
    console.log("click1 order"); // 2
    // var process = asyncProcess(); // 决定何时调用asyncProcess
    var process = asyncProcess("first"); // 3
    console.log("click2 order"); // 9
    process.then(function(results) { // 10
        dom.byId("output").innerHTML += "<br />I'm finished, and the result was: " + results; // 13
        console.log(".then first order"); // 14
        return asyncProcess("second") // 15
    }).then(function(results) { // 11
        dom.byId("output").innerHTML += "<br />I'm really finished now, and the result was: "+ results; // 23
        console.log(".then second order"); // 24
    });
});
```

```
function asyncProcess2(msg){

    var deferred = new Deferred();

    dom.byId("output2").innerHTML += "<br/>I'm running..."; // 3

    setTimeout(function(){ // 4
        console.log("settimeout progress halfway"); // 9
        deferred.progress("progress"); // 触发then里的progback // 10
        // console.log("settimeout progress halfway"); 
    }, 1500);

    setTimeout(function(){ // 5 
        deferred.resolve("resolve"); // 18
        console.log("settimeout resolve finished"); // 19
    }, 2500);

    setTimeout(function(){ // 6
        deferred.reject("reject"); // 触发then里的errback // 13
        console.log("settimeout reject ooops"); // 17
    }, 2000);

    return deferred.promise; // 7
}
on(dom.byId("startButton2"), "click", function(){ // 1
    var process = asyncProcess2(); // 2
    process.then(function(results){ // 8
        dom.byId("output2").innerHTML += "<br/>I'm finished, and the result was: " + results;
        console.log("callback");
    }, function(errback){
        dom.byId("output2").innerHTML += "<br/>I errored out with: " + errback; // 14
        console.log("err"); // 15
    }, function(progback){ // 16
        dom.byId("output2").innerHTML += "<br/>I made some progress: " + progback; // 11
        console.log("progress"); // 12
    });
});
```
