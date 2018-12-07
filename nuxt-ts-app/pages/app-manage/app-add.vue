<template>
    <div>
        <Steps :current="current">
            <Step title="应用信息" content="添加应用基本信息"></Step>
            <Step title="设备信息" content="添加设备应用设备信息"></Step>
        </Steps>
        <br>
        <dync-form v-show="current==0" ref="dyncForm"  :model="form" :submit-button="{ text: '下一步' }" :label-width="80" @success="next" >
            <!--<template slot="header">header</template>-->
            <template slot slot-scope="props">
            </template>
            <!--<template slot="footer">footer</template>-->
        </dync-form>
        <dync-form v-show="current==1" ref="formDevice"  :model="formDeviceModel" :submit-button="false" :label-width="80" >
            <template slot>
                <FormItem  >
                    <Button type="primary" @click="prev" >上一步</Button>
                    <Button type="primary" @click="submit" >提交</Button>
                    <Button @click="reset" >重置</Button>
                </FormItem>
            </template>
        </dync-form>

    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch, Model } from "nuxt-property-decorator";
  //@Component  @Prop @Watch @Model 装饰器，对变量或方法进行装饰成Vue特定功能变量或方法
  import { State, Getter, Action, Mutation, namespace } from "vuex-class";  // Vue store 全局定义，例如用户信息等全局都需要用的

  import DyncForm from "~/components/dync-form";
  //组件声名
  @Component({
    components: { DyncForm }
  })
  export default class  extends Vue {    //  typescript 创建类继成 Vue
    current = 0 ;
    formDevice:any;
    form: any = [
      {
        field: "name",
        label: "应用名",
        type: "input",
        placeholder: '智慧校园',
        required: true,
        rule: [{ required: true, message: "The name cannot be empty", trigger: "blur" }],
      },
      {
        field: "type",
        label: "应用类型",
        value: '小区',
        type: "select",
        data: [{ text: "小区", value: "xiaoqu" }, { text: "校园", value: "xiaoyuan" }, { text: "园区", value: "yuanqu" }]
      },
      {
        field: "app-id",
        label: "APPID",
        type: "input",
        disabled: true,
        placeholder: '自动生成',
      },
      {
        field: "app-secret",
        label: "APPSECRET",
        type: "input",
        disabled: true,
        placeholder: '自动生成',
      },
      {
        field: "domain-name",
        label: "应用域名",
        type: "input",
        placeholder: '访问地址',
        required: true,
        rule: [{ required: true, message: "The name cannot be empty", trigger: "blur" }],
      },
      /*  {
          field: "database",
          label: "数据库信息",
          type: "label",
          children : [{
            field: "address",
            label: "地址",
            value: '',
            type: "input",
            placeholder: '地址加端口号',
            required: true,
            rule: [{ required: true, message: "The name cannot be empty", trigger: "blur" }]
          }, {
            field: "user",
            label: "用户名",
            value: '',
            placeholder: '用户名',
            type: "input",
            required: true,
            rule: [{ required: true, message: "The name cannot be empty", trigger: "blur" }]
          },{
            field: "password",
            label: "密码",
            value: '',
            placeholder: '密码',
            type: "input",
            required: true,
            rule: [{ required: true, message: "The name cannot be empty", trigger: "blur" }]
          }, {
            field: "database-name",
            label: "数据库名",
            value: '',
            placeholder: '数据库名',
            type: "input",
            required: true,
            rule: [{ required: true, message: "The name cannot be empty", trigger: "blur" }]
          }, {
            field: "prefix",
            label: "表前缀",
            value: '',
            placeholder: '表前缀',
            type: "input",
            required: true,
            rule: [{ required: true, message: "The name cannot be empty", trigger: "blur" }]
          }]
        },*/
    ];

    formDeviceModel :any = [
      {
        field: "name",
        label: "设备",
        type: "select",
        placeholder: '请选择设备',
        required: true,
        multiple: true,
        rule: [{ required: true, message: "请选择设备", trigger: "blur" }],
      }
    ]

    next(){
      this.current +=1;
    }
    prev(){
      this.current -=1;
    }
    reset(){
      this.formDevice.reset();
    }
    submit( data ){
      this.formDevice.submit();
      console.log( data );
      return this;
    }
    fail( data ){
      console.log( data );
      return this;
    }
    mounted() {  // Vue 的 mounted 初始化回调
        this.formDevice = this.$refs.formDevice;
    }
  }
</script>

<style lang="scss" scoped>

</style>
