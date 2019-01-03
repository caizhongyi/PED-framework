<template>
    <div>
        <!--<Row>-->
            <!--<Button type="primary" class="pull-right" @click="addApp()">新增应用</Button>-->
        <!--</Row>-->
        <Row>
            <Col span="6" v-for="(item,index) in appData" :key="index">
                <div class="img-box">
                    <div class="img-box-img" @click="appDetail(item)" :style="{backgroundImage:'url(' + item.logo_url + ')'}" alt=""></div>
                    <div class="img-box-detail">
                        {{ item.name }}
                        <Button type="success" size="small" @click="jump(item.app_website)">访问</Button>
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
        <Modal :width="500" title="应用详情" v-model="showAppDetailData" :loading="formDetailLoading" @on-ok="detailSubmit"  @on-cancel="detailFail">
            <dync-form :model="formDetail" v-model="itemData"  :submit-button="false" ref="formDetails"
                       :label-width="100" label-position="right" @success="formDetailsSuccess"  @fail="()=>{ this.formDetailLoading = false }">
                <template slot slot-scope="props"> </template>
            </dync-form>
        </Modal>
      <ajax  ref="ajax"></ajax>
    </div>
</template>

<script lang="ts" type="text/ecmascript-6">
  import { Component, Prop, Vue, Watch, Model } from "nuxt-property-decorator";
  //@Component  @Prop @Watch @Model 装饰器，对变量或方法进行装饰成Vue特定功能变量或方法
  import { State, Getter, Action, Mutation, namespace } from "vuex-class";  // Vue store 全局定义，例如用户信息等全局都需要用的

  //组件声名
  @Component({
    components: {}
  })
  export default class AppManage extends Vue {    //  typescript 创建类继成 Vue

    formDetails:any;
    formDetailLoading = true ;
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
        rule: [{ required: true, message: "The name cannot be empty" }]
      },
      {
        field: "backgroundImage",
        label: "图片路径",
        value: '',
        type: "input",
        required: true,
        rule: [{ required: true, message: "The name cannot be empty" }]
      }
    ];
    formDetail:any=[
      {
        field: "name",
        label: "应用名",
        type: "input",
        required: true,
        rule: [{ required: true, message: "应用名未填写", trigger: "blur" }],
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
      },
      {
        field: "app_secret",
        label: "APPSECRET",
        type: "input",
        disabled: true,
      },
      {
        field: "account",
        label: "管理员账号",
        type: "input",
        disabled: true,
      },
      {
        field: "pwd",
        label: "管理员密码",
        type: "password",
        placeholder: "至少为8位的字母、数字和特殊符号的组合",
        required: true,
        rule: [{ required: true, message: "密码未填写" },{
          validator: (rule, value, callback) => {
            if (value) {
              var regex = new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}$');
              if ( !regex.test(value) ){
                return callback(new Error("至少为8位的字母、数字和特殊符号的组合"));
              }
            }
            return callback();
          }
        }]
      },
      {
        field: "desc",
        label: "描述",
        type: "input"
      },
      {
        field: "app_website",
        label: "应用域名",
        type: "input",
        required: true,
         rule: [{ required: true, message: "应用域名未填写", trigger: "blur" }],
      },
      {
        field: "device_list",
        label: "已选设备",
        type: "select",
        required: true,
        multiple: true,
        disabled: true,
        data : [],
        rule: [ { required: true, type: "array", min: 1, message: "至少选择一个设备", trigger: "change" },]
      },
      {
        field: "device_list_others",
        label: "可选设备",
        type: "select",
        multiple: true,
        data : [],
      },
      {
        field: "api_push_url",
        label: "数据推送接口地址",
        type: "input",
      },
      {
        field: "host",
        label: "数据库地址",
        type: "input",
      },
      {
        field: "username",
        label: "用户名",
        type: "input",
      },
      {
        field: "password",
        label: "密码",
        type: "input",
      },
      {
        field: "dbname",
        label: "数据库名",
        type: "input",
      },
      {
        field: "prefix",
        label: "表前缀",
        type: "input",
      }

    ];

    showAppData = false;
    showAppDetailData = false;
    itemData:any = {};

    deleteApp(item,index){
      this.delete({id:item.id});
      this.appData.splice(index,1);
    }
    async delete( params ) {   // async 异步声明
        let ajax: any = this.$refs.ajax;
        let res = await ajax.post('/api/app/delete',params);  // await 异步调用  es6写法
//        console.log(res);
        if ( res.code == '200' ){
            this.$Modal.success({title:'提示',content:'删除成功'})
        }
    }

    addApp(){
//      this.showAppData = true;
      return this.$router.push('/app-manage/app-add');
    }

    //详情
    appDetail(item){
      this.itemData = item;
      item.ajax =1;
      this.getDevice(item)
      this.showAppDetailData = true;
    }
    //设备列表
    async getDevice(params) {   // async 异步声明
      let ajax: any = this.$refs.ajax;
      let res = await ajax.post('/api/app/deviceType', params);  // await 异步调用  es6写法
      this.formDetail['8'].data = res.data.allList ;
      this.formDetail['9'].data = res.data.otherList ;
    }

    submit(){
      let f :any = this.$refs.forms;
//      console.log(f.data);
      let a:any = {...f.data};
      this.appData.push(a);
      f.reset();
    }
    fail(){
    }

    //修改保存
    async formDetailsSuccess(){
      let res:any = await this.edit(this.itemData);
      if( res.code == 200 ){
        this.showAppDetailData = false;
      }
      else {
        this.$Message.error({ content : res.msg })
      }
      await this.get();
      this.formDetailLoading = false
    }
    detailSubmit(){
      this.formDetails.submit();
    }
    async edit(params) {   // async 异步声明
      let ajax: any = this.$refs.ajax;
      let res = await ajax.post('/api/app/edit', params);  // await 异步调用  es6写法
//      console.log(res);
      return res;
    }


    detailFail(){

    }
    reset(){
      this.dyncForm.reset();
    }

    //访问跳转
    jump(u){
      console.log(u);
      if (u.includes('https')){
        window.open( u );
      } else {
        window.open('https://'+ u );
      }
    }

    //获取列表
    async get(params = {is_ajax: 1}) {   // async 异步声明
      let ajax: any = this.$refs.ajax;
      let res = await ajax.post('/api/app/list', params);  // await 异步调用  es6写法
      console.log(res);
      this.appData = res.data;
    }

    mounted() {  // Vue 的 mounted 初始化回调
      this.get();
      this.dyncForm = this.$refs.forms;
      this.formDetails = this.$refs.formDetails;
    }
  }
</script>

<style lang="scss" scoped>

</style>
