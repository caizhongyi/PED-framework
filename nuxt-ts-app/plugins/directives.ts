import directives from '../directives/index'
import Vue from 'vue'
  /**
   * 拖拽指令 v-draggable="options"
   * options = {
   *  trigger: /这里传入作为拖拽触发器的CSS选择器/,
   *  body:    /这里传入需要移动容器的CSS选择器/,
   *  recover: /拖动结束之后是否恢复到原来的位置/
   * }
   */

for(let item in directives){
  Vue.directive( item , directives[item] )
}

export default directives;
