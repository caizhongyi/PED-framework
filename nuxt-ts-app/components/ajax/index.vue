<template>
    <div>
        <Spin size="large" fix v-if="visible && loading">
            <Icon type="ios-loading" size="30" class="demo-spin-icon-load"></Icon>
            <div>Loading...</div>
        </Spin>

    </div>
</template>
<script lang="ts">
  import { Component, Prop } from "nuxt-property-decorator";
  import Mixin from "./mixin";

  @Component({})
  export default class Ajax extends Mixin {
    @Prop({ default : true }) loading : boolean;

    mounted() {
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
