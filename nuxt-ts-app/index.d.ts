import Vue from 'vue'
import VueRouter from 'vue-router'
import {Route} from 'vue-router'

declare module '*.vue' {
  const _default: Vue
  export default _default
}
declare var window: Window;
declare var document: Document;
declare var $: any;
// 扩充
declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter,
    $route: Route,
    $axios: any,
    $Message: any,
    $Notice: any,
    $Modal: any,
    $refs: any
  }
}



