一个基于_WidgetBase 的widget实例化过程：
* 根据默认值和运行值初始化widget数据
* 为widget的可视化表示生成DOM结构
* 将widget的DOM结构放在页面中
* 处理依赖于文档中存在的DOM结构的逻辑

**widget生命周期**
```
// 被调用时机：在实例化widget传入参数之前调用
// 功能：初始化数组，对象，覆盖widget的默认值
constructor:function() {}

// 被调用时机：在DOM渲染前，constructor实例化参数后
// 功能：用于widget实例被创建之前，更改实例的属性
postMixinProperties: function() {}

// 被调用时机：postMixinProperties之后
// 功能：用于创建节点，挂载事件，将结果赋值给this.domNode
buildRendering: function() {} 

// 被调用时机：在初始化所有属性之后和 template添加到DOM前，这时实例化widget已经创建，但它的containNode里的子widget还没创建
// 功能：自定义domNode的样式和行为
postCreate: function() {
    var domNode = this.domNode;
    // 如果widget被destroy销毁后， 取消相关事件的绑定
}

// 被调用时机：dom片段已经被添加到文档中，所有的子widget已经被解析和创建完成，如果使用命令式写法，则需要手动调用（在建立了一个父组件后，还需要添加若干子组件（这里的子组件不是表示继承关系，而是表示包含关系），并希望全部加载后一起展现时，可以不手动调用 startup）一个关于该函数的最佳实践就是即使没有子组件，也对一个组件新建实例调用该函数）
// 功能：widget布局
startup: function() {
    this.inherited(args); // 调用父类方法
}

// 被调用时机：对widget使用destroy() 方法
// 功能：销毁widget
destroy: function() {}

// 手动销毁this.destroyRecursive() 常用于关闭窗口
// 这时不能显示声明destroy，否则不会执行手动销毁函数
_closeDocWindow: function() {
    this.destroyRecursive();
}

```