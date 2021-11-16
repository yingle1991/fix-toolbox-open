import App from './App'

// #ifndef VUE3
import Vue from 'vue'
// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);
// 此处为引用自定义顶部
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom);

// 引入全局方法
import { http } from '@/utils/request';
import $mHelper from '@/utils/helper';

Vue.prototype.$http = http;
Vue.prototype.$mHelper = $mHelper;
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif

