`v-bind` `v-on` `v-if` 等称为指令，指令带有前缀v- ，是Vue提供的特殊特性，会在渲染的DOM节点上应用特殊的响应式行为(即指令的职责是 当表达式的值改变时，将其产生的连带影响响应式地作用于DOM)

demo:
```
<span v-bind:title="message">
  鼠标悬停几秒钟查看此处动态绑定的提示信息！
</span>
// 意思是：将这个元素节点上的 tutle 特性和 Vue实例的 message 属性保持一致
```
**Vue.js中最常用的两个指令`v-bind`、`v-on`特定缩写为:**
```
<!-- 完整语法 -->
<a v-bind:href="url">...</a>
<a v-on:click="doSomething">...</a>
<!-- 缩写 -->
<a :href="url">...</a>
<a @click="doSomething">...</a>
```
####`v-bind`常见用法
操作元素的class列表和内联样式是数据绑定的常见需求，因为它们都是属性，一般用`v-bind`处理，表达式结果的类型除了字符串外，还可以是对象或数组
**绑定HTML Class**
1. 对象语法`<div v-bind:class="{ active: isActive }"></div>`
补充：绑定到数据对象会更清晰
2. 数组语法`<div v-bind:class="[activeClass, errorClass]"></div>`
3. 用在组件上: 原来已存在的类不会被覆盖

**绑定内联样式**
1. 对象语法`<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
`
补充：绑定到数据对象会更清晰
2. 数组语法`<div v-bind:style="[baseStyles, overridingStyles]"></div>`
补充：多重值：只会渲染数组中最后一个被浏览器支持的值

每个Vue实例在被创建时都经过一系列初始化过程：
1. 设置数据监听
2. 编译模板
3. 将实例挂载到`DOM`并在数据变化时更新`DOM`

####`v-if`常见用法
生命周期
![avatar](https://cn.vuejs.org/images/lifecycle.png)

*不要在选项属性或回调上使用`箭头函数`*，比如：
```
created: () => console.log(this.a) 
或
vm.$watch('a', newValue => this.myMethod())
```
因为箭头函数是和父级上下文绑定在一起的，this无法绑定所预期Vue实例

不应该在模板表达式中试图访问用户自定义的全局变量
