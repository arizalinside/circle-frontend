import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
// import 'mdbvue/lib/css/mdb.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@fortawesome/fontawesome-free/css/all.min.css'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueGeolocation from 'vue-browser-geolocation'
import VueTimeago from 'vue-timeago'

library.add(faPaperPlane, faChevronLeft)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAftBoRJkmd8YT1Z5t97jzB7CMG7dGEPNw',
    libraries: 'places'
  }
})
Vue.use(VueGeolocation)
Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'en', // Default locale
  // We use `date-fns` under the hood
  // So you can use all locales from it
  locales: {
    'zh-CN': require('date-fns/locale/zh_cn'),
    ja: require('date-fns/locale/ja')
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
