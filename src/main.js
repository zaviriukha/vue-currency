import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import { ValidationProvider } from 'vee-validate';

Vue.config.productionTip = false

Vue.component('ValidationProvider', ValidationProvider);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
