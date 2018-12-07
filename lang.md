**dojo/_base/lang**
  1. lang.mixin(dest, sources)
  返回值dest，将一个或多个源的所有属性复制/添加到dest，如果dest原有对应的属性则被重写，源是从左到右处理
```
    var plant = {
        species: 'tree',
        name: 'plant',
        location: 'shanghai',
        }
    var fruit = lang.mixin(plant, 
        { 
            name: 'fruit',
            location: 'china',
            color: 'red',
            toString: function() {
                console.log("china red ...");
            }
        },
        {
            name: 'plant',
            location: 'guangzhou',
            toString: function() {
            console.log("guangzhou fruit");
            }
        }
    )
    // apple属性为 name: 'apple', location: 'american' 
    // , toString: function(){console("apple blue");}
    console.log(apple);

    // 下面是apple 原型对象属性
    console.log(apple.color); // red
    console.log(apple.location); // china
    console.log(apple.toString); // console("china red");
    console.log(apple.name); // fruit
    console.log(apple.species); // tree
```

  2. lang.delegate(obj, props)
  返回值obj,它向obj查找它没有的属性
```
    var apple = lang.delegate(fruit, {
        name: 'apple',
        // color: 'blue',
        location: 'american',
        toString: function() {
            console.log("apple blue...");
        }
    });
    // plant&fruit的属性一样
    // 为 species: 'tree', name: 'fruit', location: 'china'
    // , toString: function() {console("china red");}
    console.log(plant);
    console.log(fruit);

```

  3. lang.extend(ctor, props)
  返回值ctor(被扩展的类)，与mixin类似

  4. lang.hitch(context, function)
  返回值function，context为上下文范围，可以通过设置context实现访问函数外部对象的属性
```
    // 在foo范围内运行function函数
    var foo = {
        bar: {
            baz: ''
        },
        f1: function() {
            console.log("barbarbar");
        },
        name: "some value",
        f2: function(a, b, c) {
            console.log(a, b, c);
        }
    };
    var func = lang.hitch(foo, function() {
        console.log(this.name);
    });
    func(); // some value

    // 在foo范围内运行foo.f1()
    lang.hitch(foo, "f1")(); // barbarbar

    // 先传递 1 2 然后混合3 再打印 
    var fn = lang.hitch(foo, "f2", 1, 2);
    fn(3); // 1 2 3
```

  5. lang.replace(tmpl, map, pattern)
  返回值替换后的字符串，可对字符串进行参数化替换
```
    console.log(lang.replace("hello, {name.first} {name.last} AKA {nick}!",
     {
        nick: 'Bob',
        name: {
            first: 'Rovert',
            middle: 'X',
            last: 'Cringely'
        }
     })
    );
    // 数组模式
    console.log(lang.replace("Hello, {0} {2} AKA {3}",
     ["Robert", "X", "Crignely", "Rob"]
    ));

    // 方法模式
    function sum(a) {
        var t = 0;
        array.forEach(a, function(x) {
            t += x;
        });
        return t;
    }
    console.log(lang.replace("{count} payments averaging {avg} USD per payment.",
        lang.hitch(
            {payments: [11, 16, 12]},
            function(_, key) {
                console.log(this.payments);
                console.log(this);
                switch(key) {
                    case "count": return this.payments.length;
                    case "min": return Math.min.apply(Math, this.payments);
                    case "max": return Math.max.apply(Math, this.payments);
                    case "sum": return sum(this.payments);
                    case "avg": return sum(this.payments) / this.payments.length;

                }
            }
        )
    ));
```

  6. lang.trim(str)
  返回值修剪后的str
```
    function show(str) {
        return "|" + lang.trim(str) + "|";
    }
    console.log(show(" one ")); // |one|
    console.log(show("\tfour\r\n")); // |four|
    console.log(show("\f\n\r\t\vF I V E\f\n\r\t\v")); // |F I V E|
```

  7. lang.exists(name, obj)
  返回值布尔值，确定对象是否支持给定方法
```
    // search the global scope
    console.log(lang.exists("foo.bar")); // false
    console.log(lang.exists("foo.bar.baz")); // false
    // search from a particular scope
    console.log(lang.exists("bar", foo)); // true
    console.log(lang.exists("bar.baz", foo)); // true
```

  8. lang.getObject(name, create, context)
```
    console.log(lang.getObject("foo.name")); // ?显示undefined？
```

  9. lang.setObject(name, value, context)
```
    console.log(lang.setObject("foo.name", "abc"));
```