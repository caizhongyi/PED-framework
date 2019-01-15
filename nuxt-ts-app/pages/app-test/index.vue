<template>
    <div>
        Apps
        <ajax ref="ajax"></ajax>
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch, Model } from "nuxt-property-decorator";
  //@Component  @Prop @Watch @Model 装饰器，对变量或方法进行装饰成Vue特定功能变量或方法
  import { State, Getter, Action, Mutation, namespace } from "vuex-class";  // Vue store 全局定义，例如用户信息等全局都需要用的
  import Ajax from "~/components/ajax";  // 自定义组件目录
  //组件声名
  @Component({
    components: {Ajax}
  })
  export default class AppTest extends Vue {    //  typescript 创建类继成 Vue
    mounted() {  // Vue 的 mounted 初始化回调
        let ajax:any = this.$refs.ajax;
        console.log(ajax.get('./menu.json'))
    }
  }
</script>

<style lang="scss" scoped>

</style>
