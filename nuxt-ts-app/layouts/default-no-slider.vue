<template>
    <default :sider-visible="false" :breadcrumb-visible="false"></default>
</template>

<script lang="ts">
  import { Component,  Vue } from "nuxt-property-decorator";
  //@Component  @Prop @Watch @Model 装饰器，对变量或方法进行装饰成Vue特定功能变量或方法
  //import { State, Getter, Action, Mutation, namespace } from "vuex-class";
  import Default from "./default.vue";  // Vue store 全局定义，例如用户信息等全局都需要用的

  //组件声名
  @Component({
    components: { Default }
  })
  export default class DefaultNoSlider  extends Vue {    //  typescript 创建类继成 Vue
    mounted() {  // Vue 的 mounted 初始化回调
    }
  }
</script>

<style lang="scss" scoped>

</style>
