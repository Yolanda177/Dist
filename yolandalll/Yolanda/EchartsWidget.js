define([
    'dojo/_base/declare',
    'dojo/dom',
    'dojo/query',
    'dojo/dom-construct',
    'dojo/request/xhr',
    'Yolanda/echarts',
    'dijit/_WidgetBase'
], function(declare, dom, query, domConstruct, xhr, echarts,  _WidgetBase) {
    return declare([_WidgetBase], {
        postCreate: function() {
            this.inherited(arguments);
            this.createHtml();
            this.start();
        },
        startup: function () {},

        // 生成dom节点
        createHtml: function() {
            var main = dom.byId("main");				
            var top = domConstruct.create("div", { class: "top"}, main);
            var leftNav = domConstruct.create("div", { class: "leftNav", innerHTML: "首页"}, main);
            var middle = domConstruct.create("div", { class: "middle"}, main);
            var bottom = domConstruct.create("div", { class: "bottom"}, main);
            // topDiv
            domConstruct.create(
                "div", {
                 class: "leftTime",
                 innerHTML: "2017-10-30 12:20:30"
                }, 
                top);
                domConstruct.create(
                    "div", {
                      class: "middleText", 
                      innerHTML: "规划小智运营监控平台"
                    }, 
                    top);
            domConstruct.create(
                "div", {
                  class: "rightNav",
                  innerHTML: "管理员"
                },
                top);


            // middleDiv
            var leftText = domConstruct.create("div", { class: "leftText"}, middle);
            // var rightPerson = domConstruct.create("div", { class: "rightPerson"}, middle);
            
            var middleInfo = domConstruct.create("div", { class: "middleInfo"}, middle);
            var rightPerson = domConstruct.create("div", { class: "rightPerson"}, middle);
            
            // var middleNum = domConstruct.create("div", { class: "middleNum"}, middle);
      
            domConstruct.create(
              "div", {
              class: "personInstruc",
              innerHTML: "产品组人员介绍"
              },
              rightPerson
            );
            var personInfo = domConstruct.create("div", { class: "personInfo"}, rightPerson);
            var personImg = domConstruct.create("div", { class: "personImg"}, personInfo);
            domConstruct.create("img", { class: "Img", src: "../widget/images/pc1.jpg"}, personImg);
            domConstruct.create(
                "div", {
                class: "personMess",
                innerHTML: "韦少：韦富杰" + "</br>" + "开发经理&后台开发"
            },
            personInfo
            );
      
            // bottomDiv
            var leftCustom = domConstruct.create("div", { class: "leftCustom"}, bottom);
            // var rightText = domConstruct.create("div", { class: "rightText"}, bottom);
            var customInstruc =  domConstruct.create(
                "div", {
                class: "customInstruc",
                innerHTML: "租户介绍"
                },
               leftCustom
            );
            var customName = domConstruct.create(
                "div", {
                class: "customName",
                innerHTML: "名称：上海数慧系统技术有限公司"
                },
                leftCustom
            );
            var customStart = domConstruct.create(
                "div",{
                 class: "customStart",
                 innerHTML: "开通日期：2017年3月27日"
                },
                leftCustom
            );
            var customForNow = domConstruct.create("div", { class: "customForNow"}, leftCustom);
            var forNowText = domConstruct.create(
                "div", {
                class: "forNowText",
                innerHTML: "已运行："
                },
                customForNow
            );
            var forNowImg = domConstruct.create(
                "div", {
                class: "forNowImg",
                innerHTML: "219天"
                },
                customForNow
            );
            // var bottommiddle = domConstruct.create("div", { class: "bottommiddle"}, bottom);
            var customMess = domConstruct.create("div", { class: "customMess"}, bottom);
            var ulMess = domConstruct.create("ul", { class: "ulMess"}, customMess);
            // list
            domConstruct.create(
                "li", {
                class: "systemCustom",
                innerHTML: "系统用户：102人"
                },
                ulMess
            );
            domConstruct.create(
                "li", {
                class: "infoSum",
                innerHTML: "资料总数：102份"
                },
                ulMess
            );
            domConstruct.create(
                "li", {
                class: "itemsSum",
                innerHTML: "项目总数：102个"
                },
                ulMess
            );
            domConstruct.create(
                "li", {
                class: "groupsSum",
                innerHTML: "团队总数：102个"
                },
                ulMess
            );
            domConstruct.create(
                "li", {
                class: "tasksSum",
                innerHTML: "任务总数：102个"
                },
                ulMess
            );
            domConstruct.create("div", { class: "infoImg"}, bottom);
            var rightText = domConstruct.create("div", { class: "rightText"}, bottom);
        },
        start: function() {
            var infoImg = query('.infoImg')[0];
            var middleInfo = query('.middleInfo')[0];
             xhr("./data/china.json", {
                //  method: 'GET', 默认
                 handleAs: 'jason'
             }).then(function(chinaJson) {
                 echarts.registerMap('china', chinaJson); // 注册地图
                 var mapChart = echarts.init(middleInfo);
                 var option1 = {
                     title: {
                         text: '用户访问总量',
                         textStyle: {
                             color: '#fff',
                             fontSize: 20
                         }
                     },
                     
                     geo: {
                         map: 'china'
                     },
                     itemStyle: {
                         normal: {
                             areaColor: '#323c48'
                         },
                         emphasis: {
                             areaColor: '#2a333d'
                         }
                     }
                     
                     
                 };
                 mapChart.setOption(option1);
             });
            var itemChart = echarts.init(infoImg);
			var option2 = {
                title: {
                    text: '资料总数',
                    textStyle: {
                        fontSize: 14,
                        fontWeight: 'normal',
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    data: ['web端上传','客户端上传'],
                    top: 'top',
                    left: 'right',
                    textStyle: {
                        color: '#fff'
                    }
                },
                xAxis: {data: ["","","","","","","","","","10/30"]},
                yAxis: [
					{
						type: 'value',
						min: 0,
						max: 20,
                        name: '份',
                        nameTextStyle: {
                            color: '#fff'
                        },
                        splitLine: {
                            show: false
                        }
					},
					{
						type: 'value',
						scale: true,
                        name: 'MB',
                        nameTextStyle: {
                            color: '#fff'
                        },
                        axisLabel:{ color: '#ccc'},
                        splitLine: {
                            show: false
                        }
					}
				],
                series: [{
                    name: 'web端上传',
					type: 'bar',
					barWidth: 10,
					itemStyle: {
						normal: { color: '#ccc'}
					},
                    data: [15, 18, 13, 10, 12, 11, 12, 14, 11, 10]
                }, {
					name: '客户端上传',
					type:'bar',
					barWidth: 10,
					barGap: '-100%',
					itemStyle: {
						normal: { color: '#000'}
					},
					z: -12,
					data: [18, 20, 18, 15, 16, 15, 14, 17, 16, 20]
				}]
            };
            itemChart.setOption(option2);
        }
    });
});