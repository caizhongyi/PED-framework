<template>
    <div>
        <nestable ref="nestable" v-model="data" @remove="remove" @save-order="saveOrder"  @submit="submit" @change="change" :form-model="formModel"></nestable>
    </div>
</template>

<script lang="ts">
  import { Component,  Vue } from "nuxt-property-decorator";
  //@Component  @Prop @Watch @Model 装饰器，对变量或方法进行装饰成Vue特定功能变量或方法
  //import { State, Getter, Action, Mutation, namespace } from "vuex-class";  // Vue store 全局定义，例如用户信息等全局都需要用的
  import Nestable from "~/components/nestable/index.vue"
  import uuid from "uuid/v1"
  //组件声名
  @Component({
    components: {
      Nestable
    }
  })
  export default class NestableIndex extends Vue {    //  typescript 创建类继成 Vue
    data = [
      {
        title : 'Node 0-0',
        id: 0,
        children: [
          {
            name: 'Node 1-1',
            id: 3,
            title: 'Node 1-1',
            children: [
              {
                name: 'Node 2-1',
                title: 'Node 2-1',
                id: 4,
                children: []
              }
              ]
          },
          {
            name: 'Node 1-2',
            title: 'Node 1-2',
            id: 13,
            children: []
          }
          ]
      },
      {
        name: 'Node 0-1',
        title: 'Node 0-1',
        id: 14,
        children: [
          {
            name: 'Node 1-1',
            title: 'Node 1-1',
            id: 15,
            children: []
          }
        ]
      }
      ]
    nestable:any;

    formModel = [ {
      field: "title",
      label: "名称",
      type: "input",
      required: true,
      rule: [{ required: true, message: "请输入名称" }],
    },
      /*  {
          field: "name",
          label: "名称",
          type: "input",
          required: true,
          rule: [{ required: true, message: "请输入名称", trigger: "blur" }],
        },*/
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
        field: "isshow",
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
        field: "orderlist",
        label: "orderlist",
        type: "input",
      }];

    saveOrder( data  , next ){
      console.log(data);
      setTimeout(()=>{
        next()
      },500)
    }

    submit( data , next  , restore ){
      if( data.id != null){
        setTimeout(()=>{
          next();
        },2000)
        console.log('修改' ,data )
      }
      else{
        setTimeout(()=>{
          next( uuid() );
        },2000)
        console.log('删除' ,data )
      }
      setTimeout(()=>{
        restore();
      },2000)
    }
    remove( data , next  , restore ){
      console.log( data)
      /*if(false){
        restore();
      }*/
      setTimeout(()=>{
        next();
      },2000)

      //restore(); 还原不作操作
    }
    change( data ){
      console.log( data )
    }
    allowDrag(model) {
      if (model.name === 'Node 0-1') {
        // can't be dragged
        return false;
      }
      // can be dragged
      return true;
    }
    allowDrop(model) {
      if (model.name === 'Node 2-2') {
        // can't be placed
        return false;
      }
      // can be placed
      return true;
    }


    mounted() {  // Vue 的 mounted 初始化回调
        this.nestable = this.$refs.nestable;
    }
  }
</script>

<style lang="scss" scoped>

</style>
