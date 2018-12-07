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
  export default class Ajax extends Mixin {

    @Prop() type ;
    @Prop() icon ;
    @Prop() size ;
    @Prop() long ;
    @Prop() url ;
    @Prop({ default : ()=>{ return 'post'}}) method ;
    @Prop() params ;


    async evetPost( e  , event ){
      if( this.url ){
        let res :any = await this[this.method]( this.url , this.params );
        this.$emit( event ,  e ,  res ) ;
      }
      else{
        this.$emit( event  ,  e  ) ;
      }
    }

    click( e ){
      this.evetPost( e  , 'click') ;
      return ;
    }

    dblclick( e ){
      this.evetPost( e  , 'dblclick') ;
      return ;
    }

    async mounted() {

    }
  }
</script>
<style scoped lang="scss">

</style>
