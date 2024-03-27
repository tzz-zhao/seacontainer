import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AmapVue from '@amap/amap-vue';

AmapVue.config.version = '2.0'; // 默认2.0，这里可以不修改
AmapVue.config.key = '0046e0eb262c30e4372c3034d350a6c4';
AmapVue.config.plugins = [
  'AMap.ToolBar',
  'AMap.MoveAnimation',
  // 在此配置你需要预加载的插件，如果不配置，在使用到的时候会自动异步加载
];
Vue.use(AmapVue);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
