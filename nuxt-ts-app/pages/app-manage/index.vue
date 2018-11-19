<template>
    <div>
        <Row>
            <Button type="primary" class="pull-right" @click="addApp()">新增应用</Button>
        </Row>
        <Row>
            <Col span="6" v-for="(item,index) in appData" :key="index">
                <div class="img-box">
                    <div class="img-box-img" :style="{backgroundImage:'url(' + item.backgroundImage + ')'}" alt=""></div>
                    <div class="img-box-detail">
                        {{ item.name }}
                        <Button type="error" size="small" @click="deleteApp(index)">删除</Button>
                    </div>
                </div>
            </Col>
        </Row>
        <Modal :width="500" title="新增应用" v-model="showAppData"  @on-ok="submit" @on-cancel="fail">
            <dync-form :model="form" :label-width="80" :submit-button="false" ref="forms">
                <template slot slot-scope="props"> </template>
            </dync-form>
        </Modal>
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
    dyncForm:any;
    appData = [
      { backgroundImage: "img/51.png", name: "【小区】智慧小区1"},
      { backgroundImage: "img/51.png", name: "【小区】智慧小区2"},
      { backgroundImage: "img/51.png", name: "【小区】智慧小区3"},
      { backgroundImage: "img/51.png", name: "【小区】智慧小区4"},
      { backgroundImage: "img/51.png", name: "【小区】智慧小区5"},
    ];

    form: any = [
      {
        field: "name",
        label: "名称",
        value: '',
        type: "input",
        required: true,
        rule: [{ required: true, message: "The name cannot be empty", trigger: "blur" }]
      },
      {
        field: "backgroundImage",
        label: "图片路径",
        value: '',
        type: "input",
        required: true,
        rule: [{ required: true, message: "The name cannot be empty", trigger: "blur" }]
      }
    ];


    showAppData = false;

    deleteApp(index){
      this.appData.splice(index,1);
    }
    addApp(){
      this.showAppData = true;
    }
    submit(){
      let f :any = this.$refs.forms;
      console.log(f.data);
      let a:any = {...f.data};
      this.appData.push(a);
      f.reset();
    }
    fail(){

    }
    reset(){
      this.dyncForm.reset();
    }
    mounted() {  // Vue 的 mounted 初始化回调
      this.dyncForm = this.$refs.forms;
    }
  }
</script>

<style lang="scss" scoped>

</style>
