<template>
    <div>
        <menu id="nestable-menu" v-if="optionButton">
            <i-button type="default" icon="md-add"  data-action="expand-all" @click="expandAll">展开</i-button>
            <i-button type="default" icon="md-remove"  data-action="collapse-all" @click="collapseAll">缩起</i-button>
            <i-button type="primary" icon="md-add" @click="add">新增</i-button>
            <slot></slot>
        </menu>

        <div class="dd dd-small-handle" >
            <nestable-item v-model="value" :root="root" ></nestable-item>
        </div>

        <Modal
                v-model="modal"
                title="提示"
                :loading="true"
                @on-ok="ok"
                @on-cancel="cancel">
            <dync-form  ref="form" :model="formModel" @success="submit" :label-width="70"  :submit-button="false"></dync-form>
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
    @Prop({ default : true }) optionButton : any ;

    modal: any = false ;
    form: any;

    /* 目前支持字段
    *  :data-id="item.id"
            :data-name="item.name"
            :data-url="item.url"
            :data-desc="item.desc"
            :data-params="item.params"
            :data-icon="item.icon"
            :data-shown="item.shown"
            :data-order="item.order"
    * */

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
        },
        {
          field: "icon",
          label: "icon",
          type: "input"
        },
        {
          field: "shown",
          label: "shown",
          type: "radio",
          data : [{ text : '显示' , value : 1  },{ text : '不显示' , value : 0  }]
        },
        {
          field: "desc",
          label: "desc",
          type: "input",
        },
        {
          field: "order",
          label: "order",
          type: "input",
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

    add(){
      this.form.data = {};
      this.modal = true;
      return this;
    }

    submit(){
      this.$emit('input', this.value );
      this.$emit('submit', this.form.data , this.value );
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