define([
  "dojo/_base/declare",
  "dojo/mouse",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dojo/text!./SliderWidget.html",
  "dojo/dom-construct",
  "dojo/_base/array",
  "dojo/_base/lang",
  "dojo/on",
  "dojo/query"
], function (
  declare,
  mouse,
  _WidgetBase,
  _TemplatedMixin,
  template,
  domCon,
  arrayUtil,
  lang,
  on,
  query
) {
  return declare([_WidgetBase, _TemplatedMixin], {
    templateString: template,

    baseClass: "sliderList",
    container: null, // slider 容器
    items: [], // 图片项目
    controller: null,
    buttons: [],
    sliderImgs: null,
    moveHandle: null,
    index: 0,
    prev: null,
    next: null,
    constructor: function (sliderImgs) {
      this.sliderImgs = sliderImgs;
    },

    postCreate: function () {
      // 调用父类的 postCreate 函数
      this.inherited(arguments);
      //console.log(this.domNode); // slideImgs

      // 动态加载 CSS
      domCon.create(
        "link", {
          rel: "stylesheet",
          href: "./widget/css/SliderWidget.css"
        },
        query("head > title")[0],
        "after"
      );
      
      this.init();
      this.bindEvent();

    },
    startup: function () {},
    init: function () {
      this.container = this.mySliderNode;
      this.controller = this.controllerNode;
      this.prev = this.prevNode;
      this.next = this.nextNode;

      // 创建图片项目
      this.createSliderItem();
      // 创建导航按钮
      this.createControlButton();
      //console.log(this.items);
      this.move();

      
      
    },

    createSliderItem: function () {
      var ulNode = domCon.create("ul", {}, this.mySliderNode, "first");
      arrayUtil.forEach(
        this.sliderImgs,
        lang.hitch(function (value, index) {
          // 创建 li

          if (index === 0) {
            var itemNode = domCon.create(
              "li", {
                class: "sliderListItem sliderListItem--selected"
              },
              ulNode
            );
          } else {
            var itemNode = domCon.create(
              "li", {
                class: "sliderListItem"
              },
              ulNode
            );
          }
          // 创建图片
          var imgNode = domCon.create(
            "img", {
              src: value
            },
            itemNode
          );
        })
      );
      // 存储 items
      this.items = this.container.querySelectorAll(".sliderListItem");

    },
    createControlButton: function () {
      var self = this;
      arrayUtil.forEach(
        this.sliderImgs,
        lang.hitch(function (value, index) {
          if (index === 0) {
            var spanNode = domCon.create(
              "span", {
                class: "sliderListButtons sliderListButtons--selected"
              },
              self.controller
            );
          } else {
            var spanNode = domCon.create(
              "span", {
                class: "sliderListButtons"
              },
              self.controller
            );
          }
        })
      );
      // 存储 buttons
      this.buttons = this.controller.querySelectorAll(".sliderListButtons");
    },


    getSelectedItem: function () {
      var selected = container.querySelector(".sliderListItem--selected");
      return selected;
    },

    getSelectedItemIndex: function () {
      var items = this.items;
      return Array.from(items).indexOf(this.getSelectedItem());
    },

    slideTo: function (index) {
      this.index = index;
      // 获得上一次选中的项目
      var selected = this.getSelectedItem();
      if (selected) {
        selected.className = "sliderListItem ";
      }

      // 本次选中的项目
      var item = this.items[index];
      if (item) {
        item.className = "sliderListItem sliderListItem--selected";
      }

      // 设置按钮样式
      var selectedButton = document.querySelector(
        ".sliderListButtons--selected"
      );
      if (selectedButton) {
        selectedButton.className = "sliderListButtons";
      }
      selectedButton = this.buttons[index];
      selectedButton.className =
        "sliderListButtons sliderListButtons--selected";
    },
    // 导航到下一页
    slidePrev: function() {
          var items = this.items;
          var currentIndex = this.getSelectedItemIndex();
          var prevIndex = (items.length + currentIndex - 1) % items.length;
          this.slideTo(prevIndex);
        },
    // 导航到下一页
    slideNext: function() {
          var items = this.items;
          var currentIndex = this.getSelectedItemIndex();
          var nextIndex = (currentIndex + 1) % items.length;
          this.slideTo(nextIndex);
        },

    bindEvent() {
      var self = this;
      // console.log(self); //也是图片项目
      this.controller.addEventListener(
        "mouseover",
        lang.hitch(this, function (event) {
          this.moveHandle && clearInterval(this.moveHandle)
          var index = Array.prototype.slice.call(this.buttons).indexOf(event.target);
          if (index >= 0) {
            this.slideTo(index);
          }
        })
      );
        
      this.controller.addEventListener('mouseleave', () => {
        this.move()
      });

      this.next.addEventListener('mouseleave', () => {
        this.move()
      });

      this.prev.addEventListener('mouseleave', () => {
        this.move()
      });
       
      this.next.addEventListener('click', () => {
        this.moveHandle && clearInterval(this.moveHandle)
        this.slideNext() 
      });

      this.prev.addEventListener('click', () => {
        this.moveHandle && clearInterval(this.moveHandle)
        this.slidePrev();
      })
       
    },

    move() {
      this.moveHandle = setInterval(() => {
        this.index++;
        this.slideTo(this.index);
       // console.log(this.items.length)
        if (this.index === this.items.length - 1) {
          //console.log(this.index);
          this.index = -1;
        }
      }, 3000)
    }

  });
});