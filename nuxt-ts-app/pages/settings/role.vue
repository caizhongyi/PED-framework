<template>
    <dync-form ref="form"  v-model="formModel" :label-width="80" @success="submit" @fail="fail">
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

  export default class Role extends Vue {    //  typescript 创建类继成 Vue

    data = {
      name : 1
    }
    formModel: any = [
      {
        field: "name",
        label: "名称",
        type: "input",
        required: true,
        rule: [{ required: true, message: "The name cannot be empty", trigger: "blur" }],
      },
      {
        field: "角色",
        label: "角色",
        type: "checkbox",
        required: true,
        rule: [{ required: true, message: "The name cannot be empty", trigger: "blur" }],
      },
      { field: "Desc", label: "描述", value: '描述', type: "textarea", autosize: { minRows: 2, maxRows: 5 }, placeholder: "Desc" },
    ];
    form : any ;

    submit(){}
    fail(){}

    mounted() {  // Vue 的 mounted 初始化回调
        this.form = this.$refs.form;
    }
  }
</script>

<style lang="scss" scoped>

</style>
