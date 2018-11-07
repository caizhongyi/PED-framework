<template>
 <div>
  <ul>
   <li @click="showa">请求</li>
  </ul>
  <div>
   <span>{{res}}</span>
  </div>
  <ajax ref="ajax" loading="true"></ajax><!-- 自定义组件 ~/components/ajax -->
 </div>
</template>


<script  lang="ts">
 import { Component, Vue, Watch } from "nuxt-property-decorator";
 import {watch} from "fs";
 import Ajax from "~/components/ajax";  // 自定义组件目录
 @Component({
  components: {
   Ajax,  //自定义组件
  }
 })
 export default class  extends Vue {
  model = new Vue();
  res = '请点击请求';
  async showa(){
   this.get2();
  }

  async get2( params =  { current: 1 } ){   // async 异步声明
   let ajax:any = this.$refs.ajax;
   let res = await  ajax.get('/api/demo/test', params);  // await 异步调用  es6写法
   console.log(res);
   this.res = res;
  }
 }
</script>