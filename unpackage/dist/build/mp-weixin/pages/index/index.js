(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0501":function(t,e,n){},"290e":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}));var o=function(){var t=this,e=t.$createElement;t._self._c},r=[]},"2fee":function(t,e,n){"use strict";var a=n("0501"),o=n.n(a);o.a},4304:function(t,e,n){"use strict";n.r(e);var a=n("290e"),o=n("9637");for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("2fee");var c,i=n("f0c5"),u=Object(i["a"])(o["default"],a["b"],a["c"],!1,null,"05302cb9",null,!1,a["a"],c);e["default"]=u.exports},9637:function(t,e,n){"use strict";n.r(e);var a=n("e139"),o=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=o.a},e139:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a,o=c(n("a34a")),r=(c(n("b316")),c(n("ef45")));function c(t){return t&&t.__esModule?t:{default:t}}function i(t,e,n,a,o,r,c){try{var i=t[r](c),u=i.value}catch(l){return void n(l)}i.done?e(u):Promise.resolve(u).then(a,o)}function u(t){return function(){var e=this,n=arguments;return new Promise((function(a,o){var r=t.apply(e,n);function c(t){i(r,a,o,c,u,"next",t)}function u(t){i(r,a,o,c,u,"throw",t)}c(void 0)}))}}var l={components:{},data:function(){return{tip:"点击「添加小程序」，下次访问更便捷",duration:1,scrollTop:0,old:{scrollTop:0},pixelRatio:1,cyData:{series:[{name:"乐子、",textSize:28},{name:"侃生活",textSize:30},{name:"乐子工具箱",textSize:20},{name:"生活",textSize:20},{name:"出舱",textSize:20},{name:"乐子侃生活",textSize:25},{name:"App开发",textSize:30}]},bannerList:[{imageUrl:"https://rdtalk.cn/img/zyxc2.png"},{imageUrl:"https://rdtalk.cn/img/zyxc1.png"}],tools:[{cuIcon:"location",color:"red",badge:0,count:0,mid:"1",name:"IP查询"},{cuIcon:"phone",color:"orange",badge:0,count:0,mid:"2",name:"手机号查询"},{cuIcon:"cardboardforbid",color:"orange",badge:0,count:0,mid:"7",name:"身份证查询"},{cuIcon:"colorlens",color:"yellow",count:0,badge:0,mid:"3",name:"壁纸分享"},{cuIcon:"discover",color:"green",count:0,badge:0,mid:"4",name:"天气指数"},{cuIcon:"play_forward_fill",color:"blue",badge:0,count:0,mid:"5",name:"影音娱乐"},{cuIcon:"coin",color:"purple",count:0,badge:0,mid:"6",name:"房贷计算器"},{cuIcon:"appreciatefill",color:"purple",count:0,badge:0,mid:"8",name:"火星文转换"},{cuIcon:"appreciatefill",color:"purple",count:0,badge:0,mid:"9",name:"最新油价"}],curriculum:[{name:"uniapp项目开发",content:"uniapp小程序商城系统开发，实战项目..."},{name:"后台管理系统",content:"vue+iview的后台管理系统建设系统开发..."},{name:"App模板",content:"基于uniapp开发的效率类APP，开发至上线..."},{name:"PC端官网开发",content:"html/css/jQuery建设的PC端官方门户网站..."},{name:"uniapp多端打包",content:"uniapp开发完成上线的打包流程，上架商店等..."}],projectList:[]}},watch:{},mounted:function(){console.log(this.projectList),this.getData(),a=this,this.cWidth=t.upx2px(750),this.cHeight=t.upx2px(420),this.getServerData()},methods:{getServerData:function(){a.showData("canvasData",this.Data)},showData:function(e,n){new r.default({context:t.createCanvasContext(e,a),type:"word",background:"#ffffff",pixelRatio:a.pixelRatio,series:a.cyData.series,width:a.cWidth*a.pixelRatio,height:a.cHeight*a.pixelRatio,extra:{word:{type:"normal"}}})},getData:function(){var t=this;return u(o.default.mark((function e(){return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log("数据加载"),e.next=3,t.$http.get("/weixin/v1/api/wx/tool/getHotSearchWordcloud",{}).then(function(){var e=u(o.default.mark((function e(n){return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log(n.data),t.cyData.series=[],n.data.forEach((function(e){t.cyData.series.length<11&&t.cyData.series.push({name:e.keyword,textSize:e.size/5e3})})),console.log(t.cyData.series),a.showData("canvasData",t.Data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(t){}));case 3:case"end":return e.stop()}}),e)})))()},scroll:function(t){console.log(t),this.old.scrollTop=t.detail.scrollTop},goTool:function(e){console.log(e.currentTarget.dataset.mid),1==e.currentTarget.dataset.mid&&t.navigateTo({url:"../tools/ip"}),2==e.currentTarget.dataset.mid&&t.navigateTo({url:"../tools/mobile"}),6==e.currentTarget.dataset.mid&&t.navigateTo({url:"../tools/house"}),7==e.currentTarget.dataset.mid&&t.navigateTo({url:"../tools/idcard"}),8==e.currentTarget.dataset.mid&&t.navigateTo({url:"../tools/font"}),9==e.currentTarget.dataset.mid&&t.navigateTo({url:"../tools/oil"})},goProjectList:function(){t.navigateTo({url:"../project/list"})},goProject:function(e){t.navigateTo({url:"../project/project?proId="+e})},goVideo:function(){t.navigateTo({url:"../video"})}}};e.default=l}).call(this,n("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/index/index-create-component',
    {
        'pages/index/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("4304"))
        })
    },
    [['pages/index/index-create-component']]
]);
