require函数接收以下参数：加载模块
  1. 配置(可选，默认=未定义)：具有加载程序配置选项的对象
  2. dependencies：模块标识符数组，如果指定，则在评估代码前解析这些代码，它们将按列出的顺序加载，并作为参数返回给回调函数，也按顺序传递
  3. callback：包含要运行的代码的函数，取决于dependencies，需要将代码包装在回调函数中，以支持异步加载并能够使用对模块的非全局引用

    使用配置参数：
    例子
    ```
        require({
            baseUrl: "/js/",
            packages: [
               { name: "dojo", location: "lib/dojo"},
               { name: "my", location: "my"}
            ]
        }, [ "my/app" ]);
    ```

define函数接受以下参数：定义模块,这个模块可以被require引用
  1. moduled(可选，默认=未定义)：模块标识符，将要用的模块引进来
  2. dependencies：模块标识符数组，描述该模块的功能，如果指定，则在评估模块前解析这些模块，并作为参数按顺序传递给工厂函数
  3. factory：模块的值
    例子
    ```
    define({
        greeting: "Hello!",
        howAreYou: "How are you?"
    });
    ```

declare函数接收以下参数，创建类
  1. className：将要创建的类的名称包括命名空间，命名的类可在全局应用程序中使用，匿名类只可在给定的作用域使用
  2. superClass: 超类
  3. properties: 包含原型的方法和属性的对象







## 装载机如何工作 ##
当调用`require`加载模块时，加载器必须找到该模块的代码，然后将其作为参数传递给回调函数，以便可以使用它。

1. 首先，加载器必须解析所传递的模块标识符。这涉及将`baseUrl`模块标识符本身放在一起，并考虑其他配置选项所需的任何修改，
2. 此时，加载器具有模块的URL，并且可以通过`script在`页面上创建新元素并将`src`属性设置为模块的URL 来加载实际文件。
3. 加载并评估文件后，其结果将设置为模块的值。
加载器维护对每个模块的引用，因此下次请求模块时，加载器将返回现有引用。
4. 加载AMD模块时，代码将插入到`script`页面上的新元素中，从而导致`define`调用该函数。与上面相同的过程恰好加载传递给的任何依赖项`define`，然后加载器对模块的引用设置为您传递给的工厂函数返回的值`define`。（如果传递的是值而不是函数`define`，则加载器对模块的引用将设置为该值。）

framworklearning
    Dojo
        demo
            dialog.html
        asset
            dojo
                dojo.js
            linjy
                widget
                    Dialoa.js
