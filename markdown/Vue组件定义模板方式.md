**vue 中定义组件模板的方式：**

1. 字符串
2. 模板字面量
3. X-Templates
4. 内联模板
5. 渲染方法(`Render`函数)
6. JSX
7. 单文件组件

##字符串
```
Vue.component('my-checkbox', {
    template: '<div class="checkbox-wrapper" @click="check"><div :class="{ checkbox: true,      checked: checked }"></div><div class="title"></div></div>',
    data() {
           return { checked: false, title: 'Check me' }
    },
    methods: {
        check() { this.checked = !this.checked; } 
    }
});
```

##模板字面量
ES6模板字面量允许使用多行定义模板
```
Vue.component('my-checkbox', {
    template: ` <div class="checkbox-wrapper" @click="check"> 
    <div :class="{ checkbox: true, checked: checked }"></div> 
    <div class="title"></div> </div>
     `,
    data() {
        return {
            checked: false, title: 'Check me'
        }          
    }, 
    methods: {
        check() {
            this.checked = !this.checked;
        } 
    } 
});
```
##x-template
使用此方法，模板被定义在例如 `index.html` 文件中的 `script` 标签里。此 `script` 标签使用 `text/x-template` 标记，并且在组件定义中通过 id 引用。
```
<script type="text/x-template" id="checkbox-template"> 
    <div class="checkbox-wrapper" @click="check">
        <div :class="{ checkbox: true, checked: checked }"></div> 
        <div class="title"></div> 
    </div> 
</script>
Vue.component('my-checkbox', {
    template: '#checkbox-template',
    data() {
        return { 
            checked: false, title: 'Check me' 
        } 
    }, 
    methods: {
        check() {
            this.checked = !this.checked; 
        } 
    } 
}); 

```

##内联模板
通过给组件添加`inline-template`属性向vue表明，组件的内容就是它的模板
```
<!-- html -->
<my-checkbox inline-template>
    <div class="checkboe-wrapper" @click="check">
        <div :class=" { checkbox: true, checked: checked }"></div>
        <div class="title"></div>
    </div>
</my-checkbox>
<!-- JS -->
Vue.component('my-checkbox', {
    data() {
        return {
            checked: false,
            title: 'Check me'
        }
    },
    methods: {
        check () {
            this.checked = !this.checked;
        }
    },
});
```

##Render函数
```
Vue.component('my-checkbox', {
    data() {
        return {
            checked: false,
            title: 'Check me'
        }
    },
    methods: {
        check() {
            this.checked = !this.checked;
        }
    },
    render(createElement) {
        return createElement(
            'div',
            {
                attrs: {
                    'class': 'checkbox-wrapper'
                },
                on: {
                    click: this.check
                }
            },
            [
                createElement(
                    'div',
                    {
                        'class': {
                            checkbox: true,
                            checked: this.checked
                        }
                    }
                ),
                createElement(
                    'div',
                    {
                        attrs: {
                            'class': 'title'
                        }
                    },
                    [ this.title ]
                )
            ]
        );
    }
});

```
