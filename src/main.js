import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { vuetify, i18n } from '@/plugins/vuetify'
import VueParticles from 'vue-particles'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueParticles)

new Vue({
  store,
  router,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
