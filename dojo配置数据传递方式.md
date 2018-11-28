## 将配置数据传递给加载器的三种方法 ##
  1. 在定义加载器前，通过全局`dojoConfig`对象
  2. 在`<script>`加载器上通过`data-dojo-config`属性
  3. 在定义加载器后，通过全局`require`函数
        使用dojoConfig：
        ```
        <script>
            var dojoConfig = {
                async: true,
                cacheBust: new Date(),
                waitSeconds: 5
            };
        </script>
        <script src="dojo/dojo.js"></script>
        ```

        使用data-dojo-config
        ```
        <script data-dojo-config="async: true, cacheBust: new Date(), waitSecond: 5" src="path/to/dojo/dojo.js">
        </script>

        ```
        使用require函数
        ```
        require([
            cacheBust: new Date(),
            waitSeconds:  5
        ]);
        ```

补充：async只能放在dojoConfig或data-dojo-config中设置