## 表单输入绑定

通过使用`v-model`指令在`<input>`、`<textarea>`及`<select>`元素上创建双向数据绑定，`v-model`能根据控件类型自动选择正确的方法更新元素 ####`v-model`常见用法

1. 普通文本和多行文本
2. 复选框
3. 单选按钮
4. 选择框

双向绑定的理解：
demo：

```
<div id="app">
    <input v-model="message" />
</div>
<!-- JS -->
var app = new Vue({
    el: '#app',
    data: {
        message: ''
    }
});
```

通过以上实现 message 变量与输入值双向绑定，代码实现双向绑定真正步骤是：

```
<input type="text"
    :value="message" // input的value特性与实例的message属性保持一致
    @input="message=$event.target.value">
```

1. 将输入框的值绑定到 message 变量上，改变 message 就会改变输入框的 value，单向绑定
2. 监听 input 事件，当输入框输入内容时(即改变 input 的 value 特性)就单向改变 message 的值

#### 自定义组件用`v-model`

从 v-model 的语法糖来看，在父组件上使用 v-model 需要：

1. 子组件的 input 框的 value 需要绑定一个从父组件(vue 实例)传来的值，可通过子组件的 props 接收（默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event）
2. 在子组件上有新输入时需要触发父组件的 input 事件，并将新的值作为参数传递给父组件

```
<div id="input-component">
    <custom-input v-model="price"></custom-input>
    // 等价于
    // <custom-input
    //    :value = "price"
    //    @input="price=$event.target.value">
    <p>Text is: {{ price }}</p>
</div>
// 定义一个输入框组件
Vue.component('custom-input', {
    props: ['value'],
    template: `
     <input
     :value="value" // 通过props与父组件的value绑定
     v-on:input="$emit('input', $event.target.value)"
     >
    `
});
var inputComponent = new Vue({
    el: '#input-component',
    data: {
        price: '100'
    }

})
```

补充：
prop 是在组件上注册的一些自定义特性。当一个值传递给一个 prop 特性时，它就变成了那个组件实例的一个属性

```
    <div id="app-7">
        <ol>
            <!-- 创建一个 todo-item 组件的实例 -->
            将组件的todo特性绑定到vue实例的item属性上
            <todo-item v-for="item in groceryList" v-bind:todo="item" v-bind:id="'list-' + item.id" v-bind:key="item.id">
            </todo-item>
        </ol>
    </div>
    <!-- JS -->
        // 注册组件
        Vue.component('todo-item', {
            // todo-item 组件现在接受一个
            // "prop"，类似于一个自定义的特性
            // 这个 prop 名为 todo
            props: ['todo'],
            template: '<li>{{todo.text}}</li>'
        });
        var app7 = new Vue({
            el: '#app-7',
            data: {
                groceryList: [{
                        id: 0,
                        text: '蔬菜'
                    },
                    {
                        id: 1,
                        text: '奶酪'
                    },
                    {
                        id: 2,
                        text: '水果'
                    }
                ]
            }
        });
```

`props`可替换/合并已有的特性
demo：
```
<!-- html -->
<bootstrap-date-input type="text" data-date-picker="actived" class="date-picker-theme-dark">
<!-- js -->
Vue.component('bootstrap-date-input', {
    template:'<input type="date" class="form-control">'
})
```
* `form-control` 是在组件的模板内设置
* `date-picker-theme-dark` 是在组件的*父级*传入的
对于绝大部分特性，从外部提供给组件的值会**替换**掉组件内部设置的值，所以`type="text"`会替换掉`type="date"`,但是特殊的是，`class`和`style`特性会将两边的值合并起来，即`class`最终值为`form-control date-picker-theme-dark`
