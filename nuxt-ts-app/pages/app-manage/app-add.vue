<template>
    <div>
        <Steps :current="current">
            <Step title="应用信息" content="添加应用基本信息"></Step>
            <Step title="设备信息" content="添加设备应用设备信息"></Step>
        </Steps>
        <br>
        <dync-form v-show="current==0" v-model="formData" ref="dyncForm" :model="form" :submit-button="{ text: '下一步' }"
                   :label-width="80" @success="next">
        </dync-form>
        <dync-form v-show="current==1" ref="formDevice" v-model="formData2" :model="formDeviceModel"
                   :submit-button="false" :label-width="80">
            <template slot>
                <FormItem>
                    <Button type="primary" @click="prev">上一步</Button>
                    <Button type="primary" @click="submit">提交</Button>
                    <Button @click="reset">重置</Button>
                </FormItem>
            </template>
        </dync-form>
        <ajax ref="ajax"></ajax>
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
    current = 0;
    formDevice: any;
    dyncForm: any;
    formData: any = {
      //app_type : ["1"],
      logo : []
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
        rule: [{ required: true, message: "The name cannot be empty", trigger: "blur" }]
      },
      {
        field: "app_type",
        label: "应用类型",
        value: "小区",
        type: "select",
        data: [{ text: "小区", value: "1" }, { text: "校园", value: "0" }, { text: "园区", value: "2" }]
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
        placeholder: "访问地址",
        required: true,
        rule: [{ required: true, message: "The name cannot be empty", trigger: "blur" }]
      },
      {
        field: "desc",
        label: "描述",
        type: "input",
        placeholder: "请输入"
      },
      {
        field: "logo", label: "logo", type: "upload", action: "", remove: (item, file, next) => {
          setTimeout(() => {
            next( );
          }, 1000);
        }, success: (item, file, next) => {
          setTimeout(() => {
            next( );
          }, 1000);
        }
      }

//          }
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

    formDeviceModel: any = [
      {
        field: "type_id",
        label: "设备",
        type: "select",
        placeholder: "请选择设备",
        required: true,
        multiple: true,
        data: [],
        rule: [{ required: true, type: "array", min: 1, message: "Choose at least one hobby", trigger: "change" }]
      }
    ];

    next() {
      this.current += 1;
    }

    prev() {
      this.current -= 1;
    }

    reset() {
      this.formDevice.reset();
    }

    submit(data) {
      this.formDevice.submit();
      this.save({ ...this.dyncForm.value, ...this.formDevice.value });
    }

    async save(params) {
      let ajax: any = this.$refs.ajax;
      let res = await ajax.post("/api/app/add", params);  // await 异步调用  es6写法
      if (res.code == "200") {
        return this.$router.push("/app-manage");
      } else {
        return this.$router.push("/app-manage/app-add");
      }

    }

    fail(data) {
      return this;
    }


    async get(params = { is_ajax: 1 }) {   // async 异步声明
      let ajax: any = this.$refs.ajax;
      let res = await ajax.post("/api/app/deviceType", params);  // await 异步调用  es6写法
      this.formDeviceModel["0"].data = res.data;
//        this.appData = res.data;
    }


    mounted() {  // Vue 的 mounted 初始化回调
     // this.get();
      this.formDevice = this.$refs.formDevice;
      this.dyncForm = this.$refs.dyncForm;
    }
  }
</script>

<style lang="scss" scoped>

</style>
