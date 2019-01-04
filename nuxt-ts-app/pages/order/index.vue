<template>
    <div>
        <auto-table ref="table"
                    url="/devices.json"
                    method="get"
                    :columns="columns"
                    :search-model="searchModel"
                    :form-model="formModel"
                    :form-view-model="formViewModel"
                    :params="params"
                    :addButton = "false"
                    @search-submit="searchSubmit"
                    ></auto-table> <!-- 自定义组件 ~/components/auto-table.vue -->
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch, Model } from "nuxt-property-decorator";
  //@Component  @Prop @Watch @Model 装饰器，对变量或方法进行装饰成Vue特定功能变量或方法
  import { State, Getter, Action, Mutation, namespace } from "vuex-class";  // Vue store 全局定义，例如用户信息等全局都需要用的

  //组件声名
  @Component({
    components: {}
  })
  export default class Order extends Vue {    //  typescript 创建类继成 Vue
    /*formData:any = [
      { field : 'name' , placeholder:'名称', type : 'input' },
      { field : 'dateRange' , placeholder:'dateRange' , type : 'dateRange' },
      { field : 'City' , placeholder:'城市', type : 'select' ,data : [{ text: 'New York' , value : 'beijing'},{ text: 'London' , value : 'shanghai'}]},
    ]*/
    searchModel : any = [
      { field : 'name' , label:'' ,placeholder:'设备名',  type : 'input' },
      { field : 'sn' , label:'' , placeholder:'设备SN' , type : 'input' },
      { field : 'plane' , label:'' , placeholder:'平台' , type : 'select' , data : [{ text : "平台" , value : "1"}] },
      { field : 'type' , label:'' , placeholder:'类型' , type : 'select' , data : [] },
      { field : 'status' , label:'' , placeholder:'状态' , type : 'select' , data : [] },
      { field : 'factory' , label:'' , placeholder:'厂家' , type : 'select' , data : [] },
      { field : 'date' , label:'' , placeholder:'时间' , type : 'date' , data : [] },
    ];
    formModel : any = [
      { field : 'name' , label:'设备名：' ,placeholder:'设备名',  type : 'input' },
      { field : 'sn' , label:'设备SN：' , placeholder:'设备SN' , type : 'input' },
      { field : 'plane' , label:'平台：' , placeholder:'平台' , type : 'select' , data : [{ text : "平台" , value : "1"}] },
      { field : 'type' , label:'类型：' , placeholder:'类型' , type : 'select' , data : [] },
      { field : 'status' , label:'状态：' , placeholder:'状态' , type : 'select' , data : [] },
      { field : 'factory' , label:'厂家：' , placeholder:'厂家' , type : 'select' , data : [] },
      { field : 'date' , label:'时间：' , placeholder:'时间' , type : 'date' , data : [] },
    ];
    formViewModel : any = this.formModel;
    columns = [
      /* {type: 'selection',width: 60, align: 'center' },*/
      { title: '设备名',  key: 'name',  sortable: false },
      { title: '设备SN',  key: 'sn',  sortable: false },
      { title: '平台',  key: 'plane',  sortable: false },
      { title: '类型',  key: 'type',  sortable: false },
      { title: '状态',  key: 'status',  sortable: false },
      { title: '厂家',  key: 'factory',  sortable: false },
      { title: '时间',  key: 'date',  sortable: false },
      /* {title: 'Image',key: 'image',
         render: (h, params) => {
           let table:any = this.$refs.table;
           return h('div', table.getImageControl( h , params ));
         }
       },*/
      {
        title: '操作', key: 'action', width: 250, align: 'center',
        render: (h, params) => {
          let table:any = this.$refs.table;
          return h('div', [
            table.getViewControl(h, params),
            //table.getEditControl(h, params),
            //table.getRemoveControl(h, params),
          ]);
        }
      }
    ]
    table:any;
    params : any = {} ;


    searchSubmit( data ){
      console.log(data)
    }
    mounted() {  // Vue 的 mounted 初始化回调

    }
  }
</script>

<style lang="scss" scoped>

</style>
