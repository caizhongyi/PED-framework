<template>
    <div class="drag">
        <slot></slot>
    </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from "nuxt-property-decorator";
  import $ from "jquery";
  import Draggable from "./lib/draggable";

  @Component({})
  export default class DragBlock extends Vue {
    @Prop({ default: 'all' })
    direction;

    /*@Model()
    visible:boolean = false;

    @Watch('visible')
    onChangeVisible( val ) {
      this.$emit('input', val);
    }*/
    mounted() {
      new Draggable( this.$el );
    }
  }
</script>
<style scoped lang="scss">
    .drag {
        position: absolute;
        z-index: 9999;
    }

    .dragging {
        cursor: move;
    }
</style>
