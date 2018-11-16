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


