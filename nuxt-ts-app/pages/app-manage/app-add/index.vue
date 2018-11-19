<template>
    <div>
        <dync-form ref="dyncForm"  :model="form" :label-width="80" @success="submit" @fail="fail">
            <!--<template slot="header">header</template>-->
            <template slot slot-scope="props">
            </template>
            <!--<template slot="footer">footer</template>-->
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
      {
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
      },
    ];
    submit( data ){
      console.log( data );
      return this;
    }
    fail( data ){
      console.log( data );
      return this;
    }
    mounted() {  // Vue 的 mounted 初始化回调

    }
  }
</script>

<style lang="scss" scoped>

</style>
