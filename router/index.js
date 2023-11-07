import Vue from 'vue'
import Router from 'vue-router'
import pdp from '@/views/pdp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'pdp',
      component: pdp
    }
  ]
})
