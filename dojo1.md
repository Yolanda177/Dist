## Dojo ##



### 装载机配置 ###
  加载器配置参数：
  1. *baseUrl* 将基本URL转换为路径或URL时，前缀为模块标识符
  2. *packages* 提供包名称和位置的对象数组
        ```
        packages: [{
            name: "myapp",
            location: "/js/myapp"
        }]
        ```
  3. *map* 允许您将模块标识符中的路径映射到不同的路径
        ```
        map： {
            dijit16: {
                dojo： “dojo16"
            }
        }
        ```
  4. *paths* 模块ID片段到文件路径的映射
 
        ```
        var dojoConfig = {
            packages: [
                "package1",
                "package2"
            ],
            paths: {
                package1: "../lib/package1",
                package2: "../js/package2"
            }
        };

        // is equivalent to:
        var dojoConfig = {
            packages: [
                { name: "package1", location: "../lib/package1"},
                { name: "package2", location: "/js/package2"}
            ]
        };
        ```
  5. *async* 定义是否为异步加载Dojo核心，值可为true，false或legacyAsync
  6. *parseOnLoad* 如果值为true则dojo/parser在DOM和所有初始依赖项（包括dojoConfig.deps数组中的依赖项）已加载时解析页面，建议保留false（默认）
  7. *deps* Dojo加载后应立即加载的资源路径数组
  8. *callback* deps已检索执行一次的回调
        ```
        callback: function(parser) {
            // Use the resources provided here 
        }
        ```
  9. *waitSeconds* 模块信号加载超时之前等待的时间，默认为0（永久等待）
  10. *cacheBust* 若值为true则将时间作为查询字符串附加到每个模块URL以避免模块缓存

使用dojoConfig配置Dojo，由模块加载器以及具有全局选项的Dojo组件引用（dojoConfig是我们如何将配置参数传递给加载器和模块，而在引导过程中dojo/_base/config将从这些参数填充，以便以后通过模块代码进行查找）
**dojoConfig需要在加载dojo.js前在脚本中定义，否者配置属性将被忽略**

  只要html文件里的dojo.js路径写对，不影响require里面的参数