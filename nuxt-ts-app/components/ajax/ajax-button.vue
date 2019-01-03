<template>
    <Button :type="type"
            :icon="icon"
            :size="size"
            :long="long"
            @click="click"
            @dblclick="dblclick"
            :loading="visible">
        <slot></slot>
    </Button>
</template>
<script lang="ts">
  import { Component, Model, Prop, Vue, Watch } from "nuxt-property-decorator";
  import axios from "~/plugins/axios"; // 异步调用库
  import Qs from "qs"; // 异步调用库
  import Mixin from "./mixin";

  @Component({})
  export default class AjaxButton extends Mixin {

    @Prop() type  : any;
    @Prop() icon  : any;
    @Prop() size  : any;
    @Prop() long  : any;
    @Prop() url : any ;
    @Prop({ default : ()=>{ return 'post'}}) method : any ;
    @Prop() params  : any ;


    async evetPost( e  : any  , event  : any){
      if( this.url ){
        let res :any = await this[this.method]( this.url , this.params );
        this.$emit( event ,  e ,  res ) ;
      }
      else{
        this.$emit( event  ,  e  ) ;
      }
    }

    click( e : any ){
      this.evetPost( e  , 'click') ;
      return ;
    }

    dblclick( e : any ){
      this.evetPost( e  , 'dblclick') ;
      return ;
    }

    async mounted() {

    }
  }
</script>
<style scoped lang="scss">

</style>
