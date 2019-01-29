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
  import { Component, Prop } from "nuxt-property-decorator";
  import Mixin from "./mixin";

  @Component({})
  export default class AjaxButton extends Mixin {

    @Prop() type  : any;
    @Prop() icon  : string ;
    @Prop() size  : any;
    @Prop() long  : any;
    @Prop({ default : ()=>{ return ''}} ) url : string ;
    @Prop({ default : ()=>{ return 'post'}}) method : string ;
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
