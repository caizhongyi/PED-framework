<template>
    <div>
        <page-table></page-table>
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch, Model } from "nuxt-property-decorator";
  //@Component  @Prop @Watch @Model 装饰器，对变量或方法进行装饰成Vue特定功能变量或方法
  import { State, Getter, Action, Mutation, namespace } from "vuex-class";
  import PageTable from "../../components/page-table";

  //组件声名
  @Component({
    components: { PageTable }
  })
  export default class Settings  extends Vue {    //  typescript 创建类继成 Vue
    mounted() {  // Vue 的 mounted 初始化回调

    }
  }
</script>

<style lang="scss" scoped>

</style>
