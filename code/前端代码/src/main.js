import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/globle.css'


Vue.config.productionTip = false
Vue.use(ElementUI,{size : "small"});
Vue.prototype.$VUE_API_URL = 'http://192.168.56.1:8081';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
