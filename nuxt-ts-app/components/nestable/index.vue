<template>
    <div>
        <menu id="nestable-menu">
            <i-button type="default" data-action="expand-all" @click="expandAll">Expand All</i-button>
            <i-button type="default" data-action="collapse-all" @click="collapseAll">Collapse All</i-button>
        </menu>
        <div class="dd" id="nestable">
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
        <div class="dd dd-small-handle" >
            <nestable-item v-model="value" :root="root"  @edit="edit" @remove="remove"></nestable-item>
        </div>

        <Modal
                v-model="modal"
                title="修改"
                :loading="true"
                @on-ok="ok"
                @on-cancel="cancel">
            <dync-form  ref="form" v-model="formModel" @success="submit" :label-width="70"  :submit-button="false"></dync-form>
        </Modal>

    </div>
</template>

<script lang="ts">
  import { Component, Model, Prop, Vue, Watch } from "nuxt-property-decorator";
  import NestableItem from "./nestable-item";
  import $ from "jquery"
  import _ from "underscore"

  @Component({
    components : { NestableItem }
  })
  export default class Nestable extends Vue {
    $nestable : any ;
    @Prop() value : any ;

    modal: any = false ;
    form: any;
    @Prop({ default : ()=>{ return [
        {
          field: "name",
          label: "名称",
          type: "input",
          required: true,
          rule: [{ required: true, message: "请输入名称", trigger: "blur" }],
        },
        {
          field: "url",
          label: "链接地址",
          type: "input"
        }
      ];}}) formModel : any ;
    root : any  = this ;

    ok(){
      this.form.submit();
      return this;
    }
    cancel(){
      return this;
    }

    submit(){
      this.$emit('input', this.value );
      this.$emit('edit', this.form.data , this.value );
      return this;
    }
    fail(){}

    edit( item ){
      this.modal = true;
      this.form.data = item;
      return this;
    }
    remove( item ){
      let data = _( this.value ).filter(function( n ) {
          return n.id != item.id ;
      })
      this.$emit('input', data );
      this.$emit('remove', item , data );
      return this;
    }
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
      this.$nestable = $( '.dd' , this.$el ).nestable({
        group: 1,
        dragClass : 'dd-dragel dd-small-handle'
      })
      .on('change', ( e , n )=>{
        _this.$emit('input', _this.$nestable.nestable('serialize') );
        _this.$emit('change' , _this.value );
      })
      this.form = this.$refs.form;
    }
  }
</script>
<style scoped lang="scss">
</style>