import Vue from 'vue'
import Router from 'vue-router'
import OrderManagement from '@/components/OrderManagement'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'OrderManagement',
      component: OrderManagement
    }
  ]
})
