<template>
    <div>
        <nestable ref="nestable" v-model="data" @remove="remove" @submit="submit" @save-order="saveOrder"
                  @change="change" :form-model="formModel"></nestable>
        <ajax :loading="ajaxLoading" ref="ajax"></ajax>
    </div>
</template>

<script lang="ts" type="text/ecmascript-6">
  import { Component,Vue } from "nuxt-property-decorator";
  //@Component  @Prop @Watch @Model 装饰器，对变量或方法进行装饰成Vue特定功能变量或方法
  //import { State, Getter, Action, Mutation, namespace } from "vuex-class";  // Vue store 全局定义，例如用户信息等全局都需要用的
  import Nestable from "~/components/nestable/index.vue";
  import Ajax from "~/components/ajax/index.vue";  // 自定义组件目录
  import utils from "~/utils/index";  // 自定义组件目录
  import AutoForm from "~/components/auto-form/index.vue";
  //组件声名
  @Component({
    components: {
      AutoForm,
      Nestable,
      Ajax
    }
  })
  export default class Menu extends Vue {    //  typescript 创建类继成 Vue
    ajaxLoading = false;
    data = [
      {
        name: "地图",
        id: 3,
        children: []
      },
      {
        name: "小区首页",
        id: 13,
        children: []
      }
      ,
      {
        name: "居民首页",
        id: 14,
        children: []
      },
      {
        name: "大屏",
        id: 15,
        children: []
      },
      {
        name: "社区服务",
        id: 13,
        children: [
          {
            name: "自助缴费",
            id: 4,
            children: []
          },
          {
            name: "投诉建议",
            id: 10,
            children: []
          },
          {
            name: "物业报修",
            id: 14,
            children: []
          },
          {
            name: "物业公告",
            id: 11,
            children: []
          }
        ]
      },
      {
        name: "设备管理",
        id: 14,
        children: []
      }
    ];
    nestable: any;

    formModel = [{
      field: "title",
      label: "名称",
      type: "input",
      required: true,
      rule: [{ required: true, message: "请输入名称" }]
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
        field: "settings",
        label: "图标",
        type: "input"
      },
      {
        field: "isshow",
        label: "是否显示",
        type: "radio",
        data: [{ text: "显示", value: "1" }, { text: "不显示", value: "0" }]
      },
      {
        field: "description",
        label: "描述",
        type: "input"
      },
      {
        field: "listorder",
        label: "排序",
        type: "input"
      }];

    submit(item) {
      console.log(item);
      this.edit(item);
      this.nestable.modal = false;
      setTimeout(() => {
        this.get();
      }, 500);
      this.nestable = this.$refs.nestable;
    }

    async edit(params) {   // async 异步声明
//            console.log(params);
      let ajax: any = this.$refs.ajax;
      let res = await ajax.post("/api/menu/edit", params);  // await 异步调用  es6写法
      utils.loadMenu(this, this.$store.commit);
//            console.log(res);
    }

    saveOrder(data, next) {
      console.log( data )
      setTimeout(() => {
        next();
      }, 500);
      utils.loadMenu(this, this.$store.commit);
    }

    //删除
    remove(item, next) {
      this.delete({ is_ajax: 1, id: item.id }, next);
    }

    async delete(params, next) {   // async 异步声明
      let ajax: any = this.$refs.ajax;
      let res = await ajax.post("/api/menu/delete", params);  // await 异步调用  es6写法
      if (res.code == "200") {
        next();
        utils.loadMenu(this, this.$store.commit);
      } else {
        this.$Modal.remove();
        this.$Modal.error({ title: "提示", content: "有下级菜单", loading: false });
      }
    }

    change() {
//            console.log("111222");
//            console.log(this.data)
    }

/*
    onEdit() {
    }

    onDetail() {
    }

    onTreeDataChange() {

    }*/

    allowDrag(model) {
      if (model.name === "Node 0-1") {
        // can't be dragged
        return false;
      }
      // can be dragged
      return true;
    }

    allowDrop(model) {
      if (model.name === "Node 2-2") {
        // can't be placed
        return false;
      }
      // can be placed
      return true;
    }

  /*  curNodeClicked(model, component) {
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
*/
    async get(params = { is_ajax: 1 }) {   // async 异步声明
//            console.log(params);
      let ajax: any = this.$refs.ajax;
      let res = await ajax.post("/api/menu/list", params);  // await 异步调用  es6写法
      console.log(res);
      this.data = res.data;
    }

    mounted() {  // Vue 的 mounted 初始化回调
      this.get();
      this.nestable = this.$refs.nestable;
    }
  }
</script>

<style lang="scss" scoped>

</style>
