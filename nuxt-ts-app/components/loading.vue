<template>
    <div class="loading" v-show="value">
        <i class="fa fa-spinner fa-pulse"></i>
    </div>
</template>
<script lang="ts">
  import { Component,  Prop, Vue, Watch } from "nuxt-property-decorator";

  @Component({})
  export default class Loading  extends Vue {

    // v-model 默认值
    @Prop({ default : false })
    value: any ;

    @Watch("value",{ immediate : false })
    onChangeValue(val) {
      this.$emit("input", val);
    }

    mounted() {
    }
  }
</script>
<style scoped lang="scss">
    .loading {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        text-align: center;
        background: rgba(255, 255, 255, .7);
        z-index: 9999;
        .fa {
            margin-top: -50px;
            position: absolute;
            top: 50%;
            color: #333;
            font-size: 40px;
        }
    }

</style>
