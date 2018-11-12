<template>
    <div class="text-center error-page">
        <h2 v-if="error.statusCode == 404">
           <!-- <div class="error-num">404</div>
            页面不存在-->
            <img src="/img/404.png" alt="">
        </h2>
        <h2 v-else>
            <div class="error-num">500</div>
            服务器错误
        </h2>
        <div class="text-right">
            <ul class="list-unstyled">
                <li><nuxt-link to="/">HOME ></nuxt-link></li>
            </ul>
        </div>

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
    .error-page{
        color: #999;
    }
    h2{
        font-weight: normal;
    }
    .error-num{
        font-size: 60px;
        font-family: "Bitstream Vera Sans Mono";
        border-radius: 100%;
        margin: 0 auto;
    }
</style>

