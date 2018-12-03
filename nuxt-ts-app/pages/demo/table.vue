<template>
    <div >  <!-- 必须有根结点 -->
        <!--<dync-form :model="formData"  :inline="true" @success="submitSearch" :submit-button="{ icon : 'ios-search' , text : '查询' }">
            <template slot="footer">
                <FormItem>
                    <Button type="primary"  @click="exportData()" icon="ios-download-outline">Export source data</Button>
                </FormItem>
            </template>
        </dync-form>-->
        <!--<Form  class="class"  inline>
            <FormItem>
                <Button icon="md-add" @click="add">新建</Button>
            </FormItem>
            <FormItem>
                <Input icon="ios-search"></Input>
            </FormItem>
        </Form>-->
     <!--   <i-row>
            <i-col span="10">
                <Form ref="formInline" class="class" :model="form"  inline>
                    <FormItem prop="user">
                        <Input type="text" v-model="form.user" placeholder="Username">
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="submit()">search</Button>
                    </FormItem>
                    <FormItem>
                        <Button type="primary"  @click="exportData()"><Icon type="ios-download-outline"></Icon> Export source data</Button>
                    </FormItem>
                </Form>
            </i-col> &lt;!&ndash; ivew Button 与 icon &ndash;&gt;

        </i-row>-->
        <page-table ref="table"
                    url="/page-data.json"
                    :exp="{ filename : 'filename '}"
                    method="get"
                    :columns="columns"
                    :form-model="formModel"
                    :form-view-model="formViewModel"
                    :search-model="searchModel"
                    :search-label-width="80"
                    :params="params"
                    @search-submit="searchSubmit"
                    @edit-submit="editSubmit"
                    @edit-cancel="editCancel">
            <template slot="modal-footer">
                <i-button type="default" :loading="buttonLoading">解锁</i-button>
            </template>
        </page-table> <!-- 自定义组件 ~/components/page-table.vue -->
        <ajax ref="ajax"></ajax><!-- 自定义组件 ~/components/ajax -->
        <Modal
                v-model="modal1"
                title="修改"
                :loading="true"
                @on-ok="ok"
                @on-cancel="cancel">
            <p>Name : {{ current.name }} , Value : {{ current.value }}</p>
        </Modal>
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch, Model} from "nuxt-property-decorator"
  //@Component  @Prop @Watch @Model 装饰器，对变量或方法进行装饰成Vue特定功能变量或方法
  import { State, Getter, Action, Mutation, namespace } from "vuex-class"  // Vue store 全局定义，例如用户信息等全局都需要用的
  import PageTable from "~/components/page-table";  // 自定义组件目录
  import Ajax from "~/components/ajax";  // 自定义组件目录
  import uuid from "uuid/v1";  // 自定义组件目录
  import DyncForm from "~/components/dync-form/index";

  declare var jQuery;
  //组件声名
  @Component({
    components: {
      PageTable, Ajax,DyncForm  //自定义组件
    }
  })
  export default class Table extends Vue {    //  typescript 创建类继成 Vue
    @Prop({ default :　1  }) settings  : object ;  // 只能单项绑定（组件内不能对其值更改）
    @Model() model  : any ; // 当作为组件引用时 v-model 值， 双项绑定（组件内可改变其值）

    @State user :any; // 全局 store 中的变量
    @Mutation stateMutation :any; // 全局  store 中的方法


    formData:any = [
      { field : 'name' , placeholder:'名称', type : 'input' },
      { field : 'dateRange' , placeholder:'dateRange' , type : 'dateRange' },
      { field : 'City' , placeholder:'城市', type : 'select' ,data : [{ text: 'New York' , value : 'beijing'},{ text: 'London' , value : 'shanghai'}]},
    ]
    searchModel : any = [
      { field : 'Name' , label:'Name' ,placeholder:'名称',  type : 'input' },
      { field : 'Age' , label:'Age' , placeholder:'dateRange' , type : 'input' },
    ];
    table:any;
    value: any = 2; // 变量声明 ，any是无类型。 可以 object Array function boolean等类型
    params = { current : 1 };
    form = {
      user : ''
    };
    firstName : any  = 'cai' ; //typescript中支持 private、public、protected
    lastName : any  = 'zhongyi' ;
    modal1: boolean = false;
    current: any = {};
    buttonLoading = false;

    @Watch('value') // 相当于Vue 中的 watch bb变量
    onChangeModel( value ){   // 函数名自定义
      console.log( value )
    }


    //变量定义

    formModel = [
      { 　field : 'Name' , type : 'input',  label: "名称" },
      {   field : 'Age' , type : 'input',  label: "值" },
    ]
    formViewModel = this.formModel;
    columns = [
      {
        type: 'selection',
        width: 60,
        align: 'center'
      },
      {
        title: 'Name',
        key: 'Name',
        sortable: true
      },
      {
        title: 'Age',
        key: 'Age'
      },
      {
        title: 'Image',
        key: 'image',
        render: (h, params) => {
          let table:any = this.$refs.table;
          return h('div', table.getImageControl( h , params ));
        }
      },
      {
        title: 'Action',
        key: 'action',
        width: 250,
        align: 'center',
        render: (h, params) => {
          let table:any = this.$refs.table;
          return h('div', [
            table.getEditControl(h, params),
            table.getRemoveControl(h, params),
            table.getViewControl(h, params),
          ]);
        }
      }
    ]
    //过虑器 可以在filters目录下创全局/过虑器
    filters() {
      return {
        status( val ){
          return val == 1 ? '正常' : '异常'
        }
      }
    }

    exportData(){
      let table:any = this.$refs.table;   // this.$refs.table  标签的ref table , typescript是强类型为了避免麻烦直接定义为any类型;
      table.exportData();
    }

    async get( params =  { current: 1 } ){   // async 异步声明
      let ajax:any = this.$refs.ajax;
      let res = await  ajax.get('page-data.json' , params);  // await 异步调用  es6写法
    }


    get name(){
      return this.firstName +  this.lastName ;  // 想当于vue computed
    }
    async submit(){
      let table:any = this.$refs.table;   // this.$refs.table  标签的ref table , typescript是强类型为了避免麻烦直接定义为any类型;
      table.change({ current : parseInt(this.form.user), ...this.form });
      //  let res = await this.get({ current : parseInt(this.form.user), ...this.form });

    }
    /*  set name( value ){
        this._name = value;
        return 'set:' +  this._name  ;
      }*/
    submitSearch(data){
      console.log(data)
    }
   /* add( data ){
      setTimeout(()=>{
        this.table.data.push(data)
        this.table.modal = false;
      },1000)
      return this;
    }
 */
    ok(){
      alert('ok')
      return true;
    }

    cancel(){
      return false;
    }

    show (index = 0 ) {  //函数定义  index = 0 为默认参数值
      this.current = this.table.data[index];
      this.modal1 = true;
    }
    searchSubmit( data ){
      console.log(data)
    }
    //弹出窗提交
    // 新增和修改都调用此接口， 判断是新增还是修改通过有没有id来判断
    editSubmit(data){
      setTimeout(()=>{
        console.log(data);
        if( !data.id ){
          data.id = uuid();
          this.table.data.push(data);
        }
        this.table.modal = false;
      },1000)
    }
    //取消修改
    editCancel(data){
      console.log(data);
    }

    remove (index) {
      let table:any = this.$refs.table;
      table.data.splice(index, 1);
    }

    // 页面 head 中文件内容
    head() {
      return {
        title: "page",
        meta: [
          {
            hid: "description",
            name: "description",
            content: "Nuxt.js project"
          },
          {
            hid: "keyword",
            name: "keyword",
            content: "Nuxt.js project"
          }
        ]
      };
    }

    mounted() {  // Vue 的 mounted 初始化回调
      let _this = this;
      // jQuery('.class').netstable();
      this.table = this.$refs.table;

    }
  }
</script>

<style lang="scss" scoped>
    .viewport{
        font-size:1rem;
    }
</style>