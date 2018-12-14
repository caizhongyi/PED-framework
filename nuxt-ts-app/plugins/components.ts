import Vue from "vue"
import capitalize from "capitalize-first-letter"
import Ajax from "~/components/ajax/index"
import AjaxButton from "~/components/ajax/ajax-button"
import PageTable from "~/components/page-table"
import DyncForm from "~/components/dync-form/index"
import Nestable from "~/components/nestable/index"

//全局加载 components
Vue.component("Ajax" , Ajax );
Vue.component("AjaxButton" , AjaxButton );
Vue.component("PageTable" , PageTable );
Vue.component("DyncForm" , DyncForm );
Vue.component("Nestable" , Nestable );


