import Vue from 'vue'
import Router from 'vue-router'
// import Vuesax from 'vuesax'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'vuesax/dist/vuesax.css' // Vuesax styles
import 'material-icons/iconfont/material-icons.css'

Vue.use(ElementUI)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
