<template>
    <div>
        {{error.statusCode }}
        <h2 v-if="error.statusCode == 404">404 - 页面不存在</h2>
        <h2 v-else>500 - 服务器错误</h2>
        <ul>
            <li><nuxt-link to="/">HOME</nuxt-link></li>
        </ul>
    </div>
</template>

<script lang="ts">

  import {  Component, Prop, Vue, Watch, Model } from "nuxt-property-decorator";
  //import locale from '~/node_modules/iview/dist/locale/zh-CN';

  @Component({
    components: {}
  })
  export default class Error extends Vue {
    @Prop()
    error ;
    /*layout() {
      return "empty";
    }*/

    mounted() {

    }
  }
</script>
<style scoped lang="scss">
</style>

