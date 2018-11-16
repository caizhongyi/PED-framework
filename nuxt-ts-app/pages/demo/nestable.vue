<template>
    <div>
        <no-ssr><vue-drag-tree :data='data'
                       :allowDrag='allowDrag'
                       :allowDrop='allowDrop'
                       :defaultText='"New Node"'
                       @current-clicked='curNodeClicked'
                       @drag="dragHandler"
                       @drag-enter="dragEnterHandler"
                       @drag-leave="dragLeaveHandler"
                       @drag-over="dragOverHandler"
                       @drag-end="dragEndHandler"
                       @drop="dropHandler">
        </vue-drag-tree></no-ssr>

        <nestable ref="nestable" v-model="data" @remove="remove" @submit="submit" @change="change"></nestable>
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch, Model } from "nuxt-property-decorator";
  //@Component  @Prop @Watch @Model 装饰器，对变量或方法进行装饰成Vue特定功能变量或方法
  import { State, Getter, Action, Mutation, namespace } from "vuex-class";  // Vue store 全局定义，例如用户信息等全局都需要用的
  import Nestable from "~/components/nestable"
  //组件声名
  @Component({
    components: {
      Nestable
    }
  })
  export default class  extends Vue {    //  typescript 创建类继成 Vue
    data = [
      {
        name: 'Node 0-0',
        id: 0,
        children: [
          {
            name: 'Node 1-1',
            id: 3,
            children: [
              {
                name: 'Node 2-1',
                id: 4,
                children: []
              },
              {
                name: 'Node 2-2',
                id: 10,
                children: []
              }
              ]
          },
          {
            name: 'Node 1-2',
            id: 13,
            children: []
          }
          ]
      },
      {
        name: 'Node 0-1',
        id: 14,
        children: []
      }
      ]
    nestable:any;
    submit( item , data ){
      setTimeout(()=>{
        this.nestable.modal = false;
      },2000)
      console.log(this.data)
    }
    remove( item , data ){
      console.log(this.data)
    }
    change( data ){
      console.log(this.data)
    }
    onEdit(){}
    onDetail(){}
    onTreeDataChange(){

    }
    allowDrag(model, component) {
      if (model.name === 'Node 0-1') {
        // can't be dragged
        return false;
      }
      // can be dragged
      return true;
    }
    allowDrop(model, component) {
      if (model.name === 'Node 2-2') {
        // can't be placed
        return false;
      }
      // can be placed
      return true;
    }
    curNodeClicked(model, component) {
      // console.log('curNodeClicked', model, component);
    }
    dragHandler(model, component, e) {
      // console.log('dragHandler: ', model, component, e);
    }
    dragEnterHandler(model, component, e) {
      // console.log('dragEnterHandler: ', model, component, e);
    }
    dragLeaveHandler(model, component, e) {
      // console.log('dragLeaveHandler: ', model, component, e);
    }
    dragOverHandler(model, component, e) {
      // console.log('dragOverHandler: ', model, component, e);
    }
    dragEndHandler(model, component, e) {
      // console.log('dragEndHandler: ', model, component, e);
    }
    dropHandler(model, component, e) {
      // console.log('dropHandler: ', model, component, e);
    }

    mounted() {  // Vue 的 mounted 初始化回调
        this.nestable = this.$refs.nestable;
    }
  }
</script>

<style lang="scss" scoped>

</style>
