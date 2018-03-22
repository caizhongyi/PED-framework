import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/view/HelloWorld.vue'
import ShoppingCart from '@/view/ShoppingCart.vue'
import Index from '@/view/index.vue'
// import NotFoundComponent from '@/view/NotFoundComponent.vue'

Vue.use(Router)

export default new Router({
  routes: [
      // { path: '*', component: NotFoundComponent },
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/vuex',
      component: ShoppingCart
    },
    {
      path: '/index',
      component: Index
    }
  ]
})
