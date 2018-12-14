<template>
    <div>
        <!--<Row>-->
            <!--<Button type="primary" class="pull-right" @click="addApp()">新增应用</Button>-->
        <!--</Row>-->
        <Row>
            <Col span="6" v-for="(item,index) in appData" :key="index">
                <div class="img-box">
                    <div class="img-box-img" @click="appDetail(item)" :style="{backgroundImage:'url(img/' + item.logo + '.png)'}" alt=""></div>
                    <div class="img-box-detail">
                        {{ item.name }}
                        <Button type="error" size="small" @click="deleteApp(item,index)">删除</Button>
                    </div>
                </div>
            </Col>
            <Col span="6" >
                <div class="img-box img-box-add" @click="addApp()" title="新增应用" >
                    <span><i-icon type="md-add"></i-icon></span>
                </div>
            </Col>
        </Row>
        <Modal :width="500" title="新增应用" v-model="showAppData"  @on-ok="submit" @on-cancel="fail">
            <dync-form :model="form" :label-width="80" :submit-button="false" ref="forms">
                <template slot slot-scope="props"> </template>
            </dync-form>
        </Modal>
        <Modal :width="500" title="应用详情" v-model="showAppDetailData"  @on-ok="detailSubmit" @on-cancel="detailFail">
            <dync-form :model="formDetail" v-model="itemData" :label-width="80" :submit-button="false" ref="formDetails">
                <template slot slot-scope="props"> </template>
            </dync-form>
        </Modal>
      <ajax  ref="ajax"></ajax>
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
  export default class AppManage extends Vue {    //  typescript 创建类继成 Vue
    dyncForm:any;
    appData:any = [

    ];

    form: any = [
      {
        field: "name",
        label: "名称",
        value: '',
        type: "input",
        required: true,
        rule: [{ required: true, message: "The name cannot be empty", trigger: "blur" }]
      },
      {
        field: "backgroundImage",
        label: "图片路径",
        value: '',
        type: "input",
        required: true,
        rule: [{ required: true, message: "The name cannot be empty", trigger: "blur" }]
      }
    ];
    formDetail:any=[
      {
        field: "name",
        label: "应用名",
        type: "input",
        disabled: true,
        required: true,
      },
      {
        field: "app_type",
        label: "应用类型",
        type: "input",
        disabled: true,
      },
      {
        field: "app_id",
        label: "APPID",
        type: "input",
        disabled: true,
        // placeholder: '自动生成',
      },
      {
        field: "app_secret",
        label: "APPSECRET",
        type: "input",
        disabled: true,
        // placeholder: '自动生成',
      },
      {
        field: "desc",
        label: "描述",
        type: "input",
        disabled: true,
      },
      {
        field: "app_website",
        label: "应用域名",
        type: "input",
        // placeholder: '访问地址',
        required: true,
        disabled: true,
        // rule: [{ required: true, message: "The name cannot be empty", trigger: "blur" }],
      },
      {
        field: "device_list",
        label: "设备",
        type: "input",
        required: true,
        disabled: true,

      }
    ];

    showAppData = false;
    showAppDetailData = false;
    itemData: any = {};

    deleteApp(item,index){
      console.log(item);
      this.delete({id:item.id});
      this.appData.splice(index,1);
    }
      async delete( params ) {   // async 异步声明
          console.log(params);
          let ajax: any = this.$refs.ajax;
          let res = await ajax.post('/api/app/delete',params);  // await 异步调用  es6写法
          console.log(res);
          if ( res.code == '200' ){
              this.$Modal.success({title:'提示',content:'删除成功'})
          }
      }



    addApp(){
      this.showAppData = true;
    }
    appDetail(item){
      this.itemData = item;
      this.showAppDetailData = true;
    }
    submit(){
      let f :any = this.$refs.forms;
      console.log(f.data);
      let a:any = {...f.data};
      this.appData.push(a);
      f.reset();
    }
    fail(){

    }
    detailSubmit(){

    }
    detailFail(){

    }
    reset(){
      this.dyncForm.reset();
    }

    async get(params = {is_ajax: 1}) {   // async 异步声明
      console.log(params);
      let ajax: any = this.$refs.ajax;
      let res = await ajax.post('/api/app/list', params);  // await 异步调用  es6写法
      console.log(res);
      this.appData = res.data;
    }

    mounted() {  // Vue 的 mounted 初始化回调
      this.get();
      this.dyncForm = this.$refs.forms;
    }
  }
</script>

<style lang="scss" scoped>

</style>
