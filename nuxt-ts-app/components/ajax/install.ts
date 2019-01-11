import ajax from './index'
import button from './ajax-button'
const component = {
  install:function(Vue){
    Vue.component('Ajax',ajax)
    Vue.component('AjaxButton',button)
  }  //'component-name'这就是后面可以使用的组件的名字，install是默认的一个方法
}

// 导出该组件
export default component
