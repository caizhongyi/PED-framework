import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import ShoppingCart from '@/components/ShoppingCart.vue'
import NotFoundComponent from '@/components/NotFoundComponent.vue'

Vue.use(Router)

export default new Router({
  routes: [
      { path: '*', component: NotFoundComponent },
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/vuex',
      component: ShoppingCart
    }
  ]
})
