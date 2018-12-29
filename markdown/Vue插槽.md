# Vue 插槽

插槽的作用：当在父组件的子组件标签上添加额外内容时，通过在子组件模板上使用`<slot>`可以使额外的内容显示，否则将被子组件的模板内容覆盖,即`<slot>`为父组件内容预留位置
demo:

```
<!-- HTML -->
<div id="example1">
    <child-comp>
        <p>我是父组件的额外内容</p>
    </child-comp>
</div>
<!-- JS -->
Vue.component('child-comp', {
    template: `<p>我是子组件的模板内容</p>`
})
<!-- 当不使用slot时,渲染结果是 -->
<div id="example1>
    <p>我是子组件的模板内容</p>
</div>

<!-- 当使用slot时,渲染结果是 -->
<div id="example1>
    <p>我是子组件的模板内容</p>
    <p>我是父组件的额外内容</p>
</div>
```

## 插槽的类别：

1. 普通插槽
2. 具名插槽
3. 作用域插槽

### 普通插槽 和 具名插槽 可通过下面的`demo1`理解：

```
<!-- HTML部分 -->
    <div id="slot-demo">
        <child-comp>
            <template slot="header">
                <h1>Here might be a page title</h1>
                <h2>Second title</h2>
            </template>
            <p>A paragraph for the main content</p>
            <p>And another one.</p>
            <template slot="footer">
                <p>Here is some contact info</p>
            </template>
            <!-- 如果父组件为button覆写其他内容，则会覆盖默认内容Submit -->
            <template slot="button"></template>
        </child-comp>
    </div>
<!-- JS部分 -->
        Vue.component('base-layout', {
            template: `
            <div class="container">
                <header>
                <!-- 这是具名插槽 -->
                    <slot name="header"></slot>
                </header>
                <main>
                <!-- 这是普通插槽 -->
                    <slot></slot>
                </main>
                <footer>
                    <slot name="footer"></slot>
                </footer>
                <button>
                    <slot name="button">Submit</slot>
                </button>
            </div>
            `
        })
        var slotdemo = new Vue({
            el: '#slot-demo',
        })
```
渲染结果：
![avatar](./img/vue-slot1.png)

### 作用域插槽
当我们希望提供的组件带有一个可从子组件获取数据的可复用插槽时，可通过使用作用域插槽，即带绑定数据的插槽，

使用作用域插槽需要牢记一条准则：**父组件模板的所有东西都会在父级作用域内编译；子组件模板的所有东西都会在子级作用域内编译**

**demo2：**
```
<!-- HTML部分 -->
    <!-- 子组件的数据传到父组件中 -->
    <div id="fathercomp2">
        <h2>fathercomp2</h2>
        <!--  子组件的props特性：ctodos绑定了父组件的ftodos -->
        <child-comp2 :ctodos="ftodos">
            <!-- template上的属性slot-scope与slot上的属性data对应，而data绑定了ctodo -->
            <template slot-scope="slotProps">
                <span v-if="slotProps.data.isTrue">√</span>
                {{ slotProps.data.text }}
            </template>
        </child-comp2>
    </div>
<!-- JS部分 -->
        Vue.component('child-comp2', {
            props: ['ctodos'],
            template: `
            <div class="hello">
                <ul>
                    <li v-for="ctodo in ctodos" :key="ctodo.id">
                    // 这里的 :data="ctodo" 是指子组件的todo这个数据传给了父组件
                    <slot :data="ctodo">{{ ctodo.text }}</slot>
                    // ctodo.text是默认值 父组件会覆盖
                    </li>
                </ul>
            </div>
            `
        })
        new Vue({
            el: '#fathercomp2',
            data: {
                name: "fathername",
                ftodos: [{
                        text: 'A',
                        id: 1,
                        isTrue: true
                    },
                    {
                        text: 'B',
                        id: 2,
                        isTrue: true
                    },
                    {
                        text: 'C',
                        id: 3,
                        isTrue: false
                    },
                    {
                        text: 'D',
                        id: 4,
                        isTrue: true
                    }
                ]
            }
        })
```
从父组件中引用子组件`child-comp2`可以看到，`child-comp2`标签里的template的作用域插槽里添加了一个`slot-scope`属性，实际上这个`slot-scope`是一个对象,这个对象是由子组件的插槽`slot`所绑定的值组成的一个对象，如`child-comp2`里插槽`slot`里将`data`与`ctodo`绑定,即`data`就是`ctodo`，通过父组件里的`slotProps.data.text`就能获取子组件的数据

渲染结果：
![avatar](./img/vue-slot2.png)

**demo3:**
通过作用域插槽复用组件`my-slit`,展示两个相同模板不同内容的列表
```
<!-- HTML部分 -->
    <div id="test2">
        <my-list title="Shapes" :items="shapes">
            <template slot-scope="shape">
                {{ shape.name }} <small>({{ shape.sides }})</small>
            </template>
        </my-list>
        <my-list title="Colors" :items="colors">
            <template slot-scope="color">
                <div class="swatch" :style="{ background: color.hex }"></div>
                <div>{{ color.name }}</div>
            </template>
        </my-list>
    </div>
<!-- JS部分 -->
        Vue.component('my-list', {
            template: `
            <div class="my-list">
                <div class="title">{{ title }}</div>
                    <div class="list">
                        <ul>
                            <li v-for="item in items">
                                <slot v-bind="item"></slot>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            `,
            props: ['title', 'items'],
        })
        new Vue({
            el: '#test2',
            data: function () {
                return {
                    shapes: [{
                            name: 'Square',
                            sides: 4
                        },
                        {
                            name: 'Hexagon',
                            sides: 5
                        },
                        {
                            name: 'Triangle',
                            sides: 3
                        }
                    ],
                    colors: [{
                            name: 'Yellow',
                            hex: '#f4d03f'
                        },
                        {
                            name: 'Green',
                            hex: '#229954'
                        },
                        {
                            name: 'Purple',
                            hex: '#9b59b6'
                        }
                    ]
                }
            }
        })
```
渲染结果：
![avatar](./img/vue-slot3.png)

一个小`demo`快速理解作用域插槽：
```
<!-- HTML部分 -->
    <div id="test3">
        <child>
            <template slot-scope="slotProps">
                <p>{{ slotProps }}</p>
                <p>{{ slotPreos.sayHi }}</p>
            </template>
        </child>
    </div>
<!-- JS部分 -->
        Vue.component('child', {
            template:`
            <div><slot sayHi="Hello"></slot></div>
            `,
        })
        new Vue({
            el: '#test3'
        })
```
渲染结果：
![avatar](./img/vue-slot4.png)