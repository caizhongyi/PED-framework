import Vue from "vue"
//import capitalize from "capitalize-first-letter"
import Ajax from "~/components/ajax/index"
import AutoTable from "~/components/auto-table"
import AutoForm from "~/components/auto-form/index"
import Nestable from "~/components/nestable/index"
import AjaxButton from "~/components/ajax/ajax-button"

//全局加载 components
Vue.component("Ajax" , Ajax );
Vue.component("AjaxButton" , AjaxButton );
Vue.component("AutoTable" , AutoTable );
Vue.component("AutoForm" , AutoForm );
Vue.component("Nestable" , Nestable );


