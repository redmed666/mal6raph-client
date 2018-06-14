import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Router from 'vue-router'
import App from '@/App.vue'

import Simil from '@/components/Simil'
import Upload from '@/components/Upload'
import Home from '@/components/Home'
import Search from '@/components/Search'
import Update from '@/components/Update'

Vue.use(Router)
Vue.use(BootstrapVue)

var router = new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload,
      props: true
    },
    {
      path: '/simil',
      name: 'simil',
      component: Simil
    },
    {
      path: '/update',
      name: 'update',
      component: Update
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }
  ]
})


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')