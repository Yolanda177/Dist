### 父子组件数据传递
1. 父组件使用`props`把数据传给子组件
2. 子组件使用`$emit`触发父组件的自定义事件
demo1:
```
<!-- HTML -->
    <div id="app">
        <!-- 没有被props接收的数据会直接绑定到组件元素上 如bbb -->
        <child-component @change="doSomgthing" :aaa="333" :bbb="444"></child-component>
    </div>
<!-- JS -->
        Vue.component('child-component', {
            props: ['aaa'],
            template: `<input @click="$emit('change','nihao!')" class="child-input" >`,

        })
        var app = new Vue({
            el: '#app',
            data: {
                aaa: '111',
                bbb: '222'
            },
            methods: {
                doSomgthing: function (msg) {
                    alert(msg)
                }
            }
        });
```
demo2：
```
<!-- HTML -->
    <div id="counter-event-example">
        <p>{{ total }}</p>
        <button-counter @increment1="incrementTotal1"></button-counter>
        <button-counter @increment2="incrementTotal2"></button-counter>
    </div>
<!-- JS -->
        Vue.component('button-counter', {
            template: `<button @click="increment">{{ counter }}</button>`,
            data: function () {
                return {
                    counter: 0
                }
            },
            methods: {
                increment: function () {
                    this.counter+= 1;
                    this.$emit('increment1', 'this place can add arg');
                    this.$emit('increment2');
                }
            }
        })
        new Vue({
            el: '#counter-event-example',
            data: {
                total: 0
            },
            methods: {
                incrementTotal1: function (e) {
                    this.total +=1;
                    console.log(e);
                },
                incrementTotal2: function () {
                    this.total +=1;
                }
            }
        })
```
