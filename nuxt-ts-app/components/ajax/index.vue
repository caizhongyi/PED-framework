<template>
    <div>
        <Spin size="large" fix v-if="visible && loading">
            <Icon type="ios-loading" size="30" class="demo-spin-icon-load"></Icon>
            <div>Loading...</div>
        </Spin>

    </div>
</template>
<script lang="ts">
  import { Component, Model, Prop, Vue, Watch } from "nuxt-property-decorator";
  import axios from "~/plugins/axios"; // 异步调用库
  import Qs from "qs"; // 异步调用库
  import Mixin from "./mixin";

  @Component({})
  export default class Ajax extends Mixin {
    @Prop({ default : true }) loading : any;

    mounted() {
     /* switch (config.env.NODE_ENV) {
        case  'dev' : this.domain = 'http://www.dev.cn/';  break;
        case  'uat' : this.domain = 'http://www.uat.cn/';  break;
        case  'prod' :  this.domain = 'http://www.prod.cn/';break;
      }*/
    }
  }
</script>
<style scoped lang="scss">
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }

</style>
