<template>
    <div>
        <dync-form :model="model" :label-width="80" @success="submit" @fail="fail">
            <template slot slot-scope="props">
                <FormItem prop="custom" label="最新心跳包" >
                    心跳时间：2018-11-01 12：34：56
                    <i-input type="textarea" v-model="props.data['custom']" :autosize="{minRows: 5,maxRows: 5}"></i-input>
                </FormItem>
                <FormItem prop="custom1" label="最新告警包" >
                    心跳时间：2018-11-01 12：34：56
                    <i-input type="textarea" v-model="props.data['custom1']" :autosize="{minRows: 5,maxRows: 5}"></i-input>
                </FormItem>
            </template>
        </dync-form>
    </div>
</template>

<script lang="ts">
  import { Component,  Vue  } from "nuxt-property-decorator";
  //@Component  @Prop @Watch @Model 装饰器，对变量或方法进行装饰成Vue特定功能变量或方法
  //import { State, Getter, Action, Mutation, namespace } from "vuex-class";  // Vue store 全局定义，例如用户信息等全局都需要用的

  //组件声名
  @Component({
    components: {}
  })
  export default class Container extends Vue {    //  typescript 创建类继成 Vue
    model: any = [
      {
        field: "sn",
        label: "设备sn",
        type: "input",
        placeholder : '请输入sn号',
        required: true,
        rule: [{ required: true, message: "请输入sn号"}],
      },
      {
        field: "name",
        label: "设备名",
        placeholder : '请输入设备名',
        type: "input",
        data: [{ text: "Male", value: "male" }, { text: "Female", value: "female" }]
      },
      {
        field: "app",
        label: "归属应用",
        placeholder : '请选择归属应用',
        type: "select",
        data: [{ text: "Eat", value: "eat" }, { text: "Sleep", value: "sleep" }]
      },
      {
        field: "type",
        label: "设备类型",
        placeholder : '请选择设备类型',
        type: "select",
        data: [{ text: "Eat", value: "eat" }, { text: "Sleep", value: "sleep" }]
      },
      {
        field: "cj",
        label: "厂家",
        placeholder : '请选择厂家信息',
        type: "select",
        data: [{ text: "Eat", value: "eat" }, { text: "Sleep", value: "sleep" }]
      },
      {
        field: "state",
        label: "状态",
        placeholder : '请选择状态',
        type: "select",
        data: [{ text: "Eat", value: "eat" }, { text: "Sleep", value: "sleep" }]
      },
    ];

    submit(data){
      console.log( data )
    }
    fail(){}

    mounted() {  // Vue 的 mounted 初始化回调

    }
  }
</script>

<style lang="scss" scoped>

</style>
