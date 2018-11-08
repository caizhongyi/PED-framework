<template>
    <div>
        <Row>
            <Button type="primary" class="pull-right">新增应用</Button>
        </Row>
        <Row>
            <Col span="6" v-for="(item,index) in data" :key="index">
                <div class="img-box">
                    <div class="img-box-img" :style="{backgroundImage:'url(' + item.backgroundImage + ')'}" alt=""></div>
                    <div class="img-box-detail">
                        {{ item.name }}
                        <Button type="error" size="small" @click="deleteItem(index)">删除</Button>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch, Model } from "nuxt-property-decorator";
  //@Component  @Prop @Watch @Model 装饰器，对变量或方法进行装饰成Vue特定功能变量或方法
  import { State, Getter, Action, Mutation, namespace } from "vuex-class";  // Vue store 全局定义，例如用户信息等全局都需要用的

  //组件声名
  @Component({
    components: {}
  })
  export default class AppManage extends Vue {    //  typescript 创建类继成 Vue
    data = [
      { id: "1", backgroundImage: "/img/51.png", name: "【小区】智慧小区1"},
      { id: "2", backgroundImage: "/img/51.png", name: "【小区】智慧小区2"},
      { id: "3", backgroundImage: "/img/51.png", name: "【小区】智慧小区3"},
      { id: "4", backgroundImage: "/img/51.png", name: "【小区】智慧小区4"},
      { id: "5", backgroundImage: "/img/51.png", name: "【小区】智慧小区5"},
    ];

    deleteItem(index){
      this.data.splice(index,1);
    }

    mounted() {  // Vue 的 mounted 初始化回调

    }
  }
</script>

<style lang="scss" scoped>

</style>
