import Vue from "vue"
import capitalize from "capitalize-first-letter"
import Ajax from "~/components/ajax"
import PageTable from "~/components/page-table"
import DyncForm from "~/components/dync-form"
import Nestable from "~/components/nestable"

//全局加载 components
Vue.component("Ajax" , Ajax );
Vue.component("PageTable" , PageTable );
Vue.component("DyncForm" , DyncForm );
Vue.component("Nestable" , Nestable );

//require = require('require-component')(require);

/*
// 默认全局加载的组件
let components = [
  'ajax',
  'dync-form',
  'page-table',
]

for(let item of components ){
  const componentName = capitalize( item.replace(/^\.\//,'').replace(/\.\w+$/,'')).replace(/-/gi,'')
  const componentConfig = requireComponent(`../components/${item}`);
  Vue.component(`${componentName}` , componentConfig.default || componentConfig )
  console.info(`Component ${item} Loaded!` , componentConfig.default || componentConfig)
}

*/
/*
const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 剥去文件名开头的 `./` 和结尾的扩展名
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
*/






