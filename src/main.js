// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueClipboard from 'vue-clipboard2'
import {store} from './store/store'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
Vue.use(VueClipboard)
Vue.use(Vuetify)
Vue.use(VueResource)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store:store,
  router,
  template: '<App/>',
  components: { App,  }
})

