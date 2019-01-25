<template>
   <div>
       <Tree ref="tree"
             :data="data"
             @on-check-change="checkChange"
             multiple
             empty-text="暂无数据"
             show-checkbox
             v-model="model"
       ></Tree>
       <Button @click="click">GET</Button>
   </div>
</template>

<script lang="ts">
  import { Component,  Vue } from "nuxt-property-decorator";
  //@Component  @Prop @Watch @Model 装饰器，对变量或方法进行装饰成Vue特定功能变量或方法
  //import { State, Getter, Action, Mutation, namespace } from "vuex-class";  // Vue store 全局定义，例如用户信息等全局都需要用的
  import util from "~/utils/index";
  //组件声名
  @Component({
    components: {}
  })
  export default class TreeTest extends Vue {    //  typescript 创建类继成 Vue
    model = [];
    tree :any ;
    data = [];

    checkChange( nodes ){
      console.log( util.getTreeChecked(  nodes , [] , ['id','title'] ))
    }

    click(){
     // let choicesAll = this.tree.getCheckedNodes();
      let choicesAll = this.tree.getCheckedAndIndeterminateNodes();
      console.log( util.getTreeChecked(  choicesAll , [] , ['id','title'] ))
    }
    mounted() {  // Vue 的 mounted 初始化回调
      this.tree = this.$refs.tree;
      let treeData :any  = [
        {
          id: 0,
          title: "node 1",
          expand: true,
          children: [
            {
              title: "node 2",
              id: 1,
              parentId: 0 ,
              expand: false,
              children: [
                {
                  id: 5,
                  title: "node 3"
                },
                {
                  id: 6,
                  title: "node 4"
                }
              ]
            },
            {
              id: 2,
              title: "node 5",
              parentId: 0 ,
              expand: false,
              children: [
                {
                  title: "node 6",
                  id: 3,
                },
                {
                  id: 4,
                  title: "leaf 1-2-1"
                }
              ]
            }
          ]
        }
      ];
      util.setTreeChecked( treeData , [{
        checked : true ,
        expand:true,
        id : 1,
        indeterminate : false,
        nodeKey : 0,
        title : "parent 1",
      }])
      this.data = treeData;
    }
  }
</script>

<style lang="scss" scoped>

</style>
