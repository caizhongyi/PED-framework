<template>
    <div>
        <menu id="nestable-menu">
            <button type="button" data-action="expand-all" @click="expandAll">Expand All</button>
            <button type="button" data-action="collapse-all" @click="collapseAll">Collapse All</button>
        </menu>

        <div class="dd" >
            <ol class="dd-list">
                <li class="dd-item" data-id="1">
                    <div class="dd-handle">Item 1</div>
                </li>
                <li class="dd-item" data-id="2">
                    <div class="dd-handle">Item 2</div>
                    <ol class="dd-list">
                        <li class="dd-item" data-id="3"><div class="dd-handle">Item 3</div></li>
                        <li class="dd-item" data-id="4"><div class="dd-handle">Item 4</div></li>
                        <li class="dd-item" data-id="5">
                            <div class="dd-handle">Item 5</div>
                            <ol class="dd-list">
                                <li class="dd-item" data-id="6"><div class="dd-handle">Item 6</div></li>
                                <li class="dd-item" data-id="7"><div class="dd-handle">Item 7</div></li>
                                <li class="dd-item" data-id="8"><div class="dd-handle">Item 8</div></li>
                            </ol>
                        </li>
                        <li class="dd-item" data-id="9"><div class="dd-handle">Item 9</div></li>
                        <li class="dd-item" data-id="10"><div class="dd-handle">Item 10</div></li>
                    </ol>
                </li>
                <li class="dd-item" data-id="11">
                    <div class="dd-handle">Item 11</div>
                </li>
                <li class="dd-item" data-id="12">
                    <div class="dd-handle">Item 12</div>
                </li>
            </ol>
        </div>
    </div>
</template>

<script lang="ts">
  import { Component, Model, Prop, Vue, Watch } from "nuxt-property-decorator";
  import $ from "jquery"

  @Component({
    components : { }
  })
  export default class Nestable extends Vue {
    $nestable : any ;

    expandAll(){
      this.$nestable.nestable('expandAll');
      return this;
    }
    collapseAll(){
      this.$nestable.nestable('collapseAll');
      return this;
    }
    mounted() {
      let _this = this;
      this.$nestable = $( this.$el ).nestable({
        group: 1
      })
      .on('change', ()=>{
        _this.$emit('change');
      });
    }
  }
</script>
<style scoped lang="scss">
</style>