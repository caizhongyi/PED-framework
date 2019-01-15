<template>
    <div>
        <Button @click="Post">请求 Post</Button>
        <Button @click="Get">请求 Get</Button>
        <ajax-button url="/api/demo/test" :params="{ a: 1 }" @click="click" icon="md-add">Ajax Button</ajax-button>
        <ajax-button ref="ajaxButton"  @click="ajaxClick" >Ajax Button Ref </ajax-button>
        <ajax ref="ajax" :loading="loading"></ajax><!-- 自定义组件 ~/components/ajax -->
        <!-- <ajax-button ref="ajaxButton" @click="click"></ajax-button>-->
    </div>
</template>


<script lang="ts">
  import { Component, Vue, Watch } from "nuxt-property-decorator";
  import { watch } from "fs";
  import Ajax from "~/components/ajax";  // 自定义组件目录
  import AjaxButton from "~/components/ajax";
  @Component({
    components: {
      Ajax,
      AjaxButton
    }
  })
  export default class  extends Vue {
    model = new Vue();
    res = "请点击请求";
    ajaxButton: any ;
    ajax: any ;
    loading : boolean = true;

    click( e  , data ){
      console.log(data);
      this.$Message.error({ content : JSON.stringify(data) })
    }

    async ajaxClick(){
      this.loading = false;
      console.log(this.ajaxButton)
      let res = await this.ajaxButton.post("/api/demo/test", { current: 1 });  // await 异步调用  es6写法
      this.$Message.error({ content :  JSON.stringify(res)  })
      this.loading = true;
    }

    async Post(params = { current: 1 }) {   // async 异步声明
      let ajax: any = this.$refs.ajax;
      let res = await ajax.post("/api/demo/test", params);  // await 异步调用  es6写法
      this.$Message.error({ content :  JSON.stringify(res) })
    }

    async Get(params = { current: 1 }) {   // async 异步声明
      let ajax: any = this.$refs.ajax;
      let res = await ajax.get("/api/demo/test", params);  // await 异步调用  es6写法
      this.$Message.error({ content : JSON.stringify(res) })
    }

    mounted(){
      this.ajaxButton = this.$refs.ajaxButton;
    }
  }
</script>