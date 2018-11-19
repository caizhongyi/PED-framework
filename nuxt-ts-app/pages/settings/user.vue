<template>
    <dync-form ref="form"  :model="formModel" v-model="data" :label-width="80" @success="submit" @fail="fail">
        <template slot slot-scope="props">
        </template>
    </dync-form>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch, Model } from "nuxt-property-decorator";
  //@Component  @Prop @Watch @Model 装饰器，对变量或方法进行装饰成Vue特定功能变量或方法
  import { State, Getter, Action, Mutation, namespace } from "vuex-class";  // Vue store 全局定义，例如用户信息等全局都需要用的

  //组件声名
  @Component({
    components: {}
  })

  export default class User extends Vue {    //  typescript 创建类继成 Vue

    data = {
      name : '1222',
      gender : 'male',
      upload : [
        {
          "name": "a42bdcc1178e62b4694c830f028db5c0",
          "url": "https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar"
        },
        {
          "name": "bc7521e033abdd1e92222d733590f104",
          "url": "https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar"
        }
      ]
    }
    formModel: any = [
      {
        field: "name",
        label: "用户名",
        type: "input",
        required: true,
        rule: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      },
      {
        field: "password",
        label: "密码",
        type: "password",
        required: true,
        rule: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      {
        field: "role",
        label: "角色权限",
        type: "checkbox",
        required: true,
        data: [{ text: "Male", value: "male" }, { text: "Female", value: "female" }],
        rule: [
          { required: true, type: 'array', min: 1, message: '请选择角色权限', trigger: 'change' },
          //{ type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
        ],
      },
      {
        field: "gender",
        label: "姓别",
        type: "radio",
        data: [{ text: "Male", value: "male" }, { text: "Female", value: "female" }]
      },
      {
        field: "upload", label: "上传", type: "upload", action: "", remove: (file, item) => {
          item.removeFile(file);
          this.$Message.info("delelte");
        }, success: (res, file) => {
          file.url = "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar";
          file.name = "7eb99afb9d5f317c912f08b5212fd69a";
          this.data['upload'].push(file);
          this.$Message.info("success");
        }
      },
      {
        field: "city",
        label: "城市",
        value: 'beijing',
        type: "select",
        data: [{ text: ">New York", value: "beijing" }, { text: "London", value: "shanghai" }]
      },
      { field: "desc", label: "描述", value: '描述', type: "textarea", autosize: { minRows: 2, maxRows: 5 }, placeholder: "Desc"  },
    ];
    form : any ;

    submit( data ){
      console.log( data )
    }
    fail(){}

    mounted() {  // Vue 的 mounted 初始化回调
        this.form = this.$refs.form;
       // this.form.data =
    }
  }
</script>

<style lang="scss" scoped>

</style>
