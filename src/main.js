import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import vuetify from './plugins/vuetify';
import oAuth from './plugins/oAuth';
import router from './router'
import VueElElements from 'vue-el-element'

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(VueElElements)

new Vue({
  vuetify,
  router,
  oAuth,
  render: h => h(App)
}).$mount('#app')
