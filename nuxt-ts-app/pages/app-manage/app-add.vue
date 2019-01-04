<template>
    <div>
        <Steps :current="current">
            <Step title="应用信息" content="添加应用基本信息"></Step>
            <Step title="设备信息" content="添加设备应用设备信息"></Step>
        </Steps>
        <br>
        <auto-form v-show="current==0" v-model="formData" ref="AutoForm"  :model="form" :submit-button="{ text: '下一步' }" @success="next" >
            <!--<template slot="header">header</template>-->
            <!--<template slot slot-scope="props">-->
            <!--</template>-->
            <!--<template slot="footer">footer</template>-->
        </auto-form>
        <auto-form v-show="current==1" ref="formDevice" v-model="formData2"  :model="formDeviceModel" :submit-button="false" @success="save"  >
            <template slot>
                <FormItem>
                    <Button type="primary" @click="prev" >上一步</Button>
                    <Button type="primary" @click="submit">提交</Button>
                    <Button @click="reset" >重置</Button>
                </FormItem>
            </template>
        </auto-form>
        <ajax ref="ajax"></ajax>
    </div>
</template>

<script lang="ts" type="text/ecmascript-6">
  import { Component, Prop, Vue, Watch, Model } from "nuxt-property-decorator";
  //@Component  @Prop @Watch @Model 装饰器，对变量或方法进行装饰成Vue特定功能变量或方法
  import { State, Getter, Action, Mutation, namespace } from "vuex-class";  // Vue store 全局定义，例如用户信息等全局都需要用的

  import AutoForm from "~/components/auto-form";
  //组件声名
  @Component({
    components: { AutoForm }
  })
  export default class  extends Vue {    //  typescript 创建类继成 Vue
    current = 0 ;
    formDevice:any;
    AutoForm : any;
    formData: any = {
      upload  : []
    };
    formData2: any = {
      type_id:[]
    };
    form: any = [
      {
        field: "name",
        label: "应用名",
        type: "input",
        placeholder: "智慧校园",
        required: true,
        rule: [{ required: true, message: "应用名未填写", }],
      },
      {
        field: "app_type",
        label: "应用类型",
        placeholder: '请选择',
        type: "select",
        data: [{ text: "校园", value: "0" }, { text: "小区", value: "1" }, { text: "园区", value: "2" }]
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
//      {
//        field: "app_id",
//        label: "APPID",
//        type: "input",
//        disabled: true,
//        placeholder: '自动生成',
//      },
//      {
//        field: "app_secret",
//        label: "APPSECRET",
//        type: "input",
//        disabled: true,
//        placeholder: '自动生成',
//      },
      {
        field: "app_website",
        label: "应用域名",
        type: "input",
        placeholder: '访问地址',
        required: true,
        rule: [{ required: true, message: "应用域名未填写", }]
      },
      {
          field: "desc",
          label: "描述",
          type: "input",
          placeholder: "请输入"
      },
      {
        field: "api_push_url",
        label: "数据推送接口地址",
        type: "input",
        placeholder: '请输入'
      },
//      {
//        field: "database",
//        label: "数据库信息",
//        type: "label",
//        children : []}

        {
          field: "host",
          label: "数据库地址",
          value: '',
          type: "input",
          placeholder: '地址加端口号',
          required: true,
          rule: [{ required: true, message: "地址未填写", }]
        }, {
          field: "username",
          label: "用户名",
          value: '',
          placeholder: '用户名',
          type: "input",
          required: true,
          rule: [{ required: true, message: "用户名未填写", }]
        },{
          field: "password",
          label: "密码",
          value: '',
          placeholder: '密码',
          type: "input",
          required: true,
          rule: [{ required: true, message: "密码未填写", }]
        }, {
          field: "dbname",
          label: "数据库名",
          value: '',
          placeholder: '数据库名',
          type: "input",
          required: true,
          rule: [{ required: true, message: "数据库名未填写", }]
        }, {
          field: "prefix",
          label: "表前缀",
          value: '',
          placeholder: '表前缀',
          type: "input",
          required: true,
          rule: [{ required: true, message: "表前缀未填写",}]
      },
      {
        field: "upload", label: "封面", length:1, type: "upload", action: "", remove: (item, file, next) => {
          setTimeout(() => {
            next( );
          }, 1000);
        }, success: (item, file, next) => {
          setTimeout(() => {
            next( );
          }, 1000);
        }
      }
    ];

    formDeviceModel :any = [
      {
        field: "type_id",
        label: "设备",
        type: "select",
        placeholder: "请选择设备",
        required: true,
        multiple: true,
        data : [],
        rule: [ { required: true, type: "array", min: 1, message: "Choose at least one hobby", trigger: "blur" },],
      }
    ];

    next(){
      console.log(this.AutoForm.value.pwd);
      this.current +=1;
    }
    prev(){
      this.current -=1;
    }
    reset(){
      this.formDevice.reset();
    }
  //提交
    submit( data ){
        this.formDevice.submit();
    }
    async save(){
          let params = {...this.AutoForm.value,...this.formDevice.value};
          let ajax: any = this.$refs.ajax;
          let res = await ajax.post('/api/app/add', params);  // await 异步调用  es6写法
          if ( res.code == '200' ){
              return this.$router.push('/app-manage');
          } else {
              return this.$router.push('/app-manage/app-add');
          }
    }
    fail( data ){
      return this;
    }

    async get(params = {is_ajax: 1}) {   // async 异步声明
        let ajax: any = this.$refs.ajax;
        let res = await ajax.post('/api/app/deviceType', params);  // await 异步调用  es6写法
        this.formDeviceModel['0'].data = res.data;
//        console.log(this.formDeviceModel);
//        this.appData = res.data;
    }

    mounted() {  // Vue 的 mounted 初始化回调
        this.get();
        this.formDevice = this.$refs.formDevice;
        this.AutoForm = this.$refs.AutoForm;
    }
  }
</script>

<style lang="scss" scoped>

</style>
