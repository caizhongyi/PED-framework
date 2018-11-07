<template>
    <div>
        <Spin size="large" fix v-if="visible">
            <Icon type="ios-loading" size="30" class="demo-spin-icon-load"></Icon>
            <div>Loading...</div>
        </Spin>

    </div>
</template>
<script lang="ts">
  import { Component, Model, Prop, Vue, Watch } from "nuxt-property-decorator";
  import axios from "~/plugins/axios"; // 异步调用库
 // import axios from "axios"; // 异步调用库
  import Qs from "qs"; // 异步调用库
  //import config from "~/nuxt.config"; // 异步调用库

  @Component({})
  export default class Ajax extends Vue {
    @Prop() url: string ;
    @Prop() params : any ;
    @Prop({ default : true }) loading : any ;

    visible = false;

    async post( url , data , method = 'post' ){

      this.loading && (this.visible = true);
      const promise = axios[method](url , data );
      promise.catch(()=>{
        this.$Modal.error({
          title : '提示',
          content : '请求超时!'
        })
      })
      let res:any = await promise;
      this.visible = false;
      let dataInfo: any = res.data;
      if( dataInfo.code === 200 ){
        return dataInfo;
      }
      else{
        this.$Modal.error({
          title : '提示',
          content : dataInfo.message || '请求失败!'
        })
        return dataInfo;
      }
    }

    // 异步调用
    async get( url , data ){
      let res:any = await this.post( url , data , 'get' );
      return res;
    }

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
