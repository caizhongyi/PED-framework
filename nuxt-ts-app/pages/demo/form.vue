<template>
     <div>
         <dync-form ref="dyncForm"  v-model="form" :label-width="80" @success="submit" @fail="fail">
             <template slot="header">header</template>
             <template slot slot-scope="props">
                 <FormItem prop="custom" label="自定义" :required="true">
                     <Input v-model="props.data['custom']" placeholder="自定义" ></Input>
                 </FormItem>
             </template>
             <template slot="footer">footer</template>
         </dync-form>

         <!--<dync-form ref="noSubmitForm" v-model="form" :label-width="80" @success="submit" @fail="fail" :submit-button="false"></dync-form>-->
     </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch, Model } from "nuxt-property-decorator";
  //@Component  @Prop @Watch @Model 装饰器，对变量或方法进行装饰成Vue特定功能变量或方法
  import { State, Getter, Action, Mutation, namespace } from "vuex-class";  // Vue store 全局定义，例如用户信息等全局都需要用的

  import DyncForm from "~/components/dync-form";
  //组件声名
  @Component({
    components: { DyncForm }
  })
  export default class  extends Vue {    //  typescript 创建类继成 Vue

    data = {
      name : 1
    }
    form: any = [
      {
        field: "name",
        label: "名称",
        type: "input",
        required: true,
        rule: [{ required: true, message: "The name cannot be empty", trigger: "blur" }],
        children : [{
          field: "children",
          label: "children",
          value: '',
          type: "input",
          required: true,
          rule: [{ required: true, message: "The name cannot be empty", trigger: "blur" }]
        }]
      },
      {
        field: "gender",
        label: "姓别",
        type: "checkbox",
        data: [{ text: "Male", value: "male" }, { text: "Female", value: "female" }]
      },
      {
        field: "interest",
        label: "interest",
        type: "checkbox",
        data: [{ text: "Eat", value: "eat" }, { text: "Sleep", value: "sleep" }]
      },
      { field: "date", label: "date", value: '2008-3-3', type: "date" },
      { field: "datetime", label: "datetime", value:'2008-1-3 12:12:21', type: "datetime" },
      { field: "datetimeRange", label: "datetimeRange", value: '2008-3-3 12:12:21 - 2008-10-3 12:12:21', type: "datetimeRange" },
      { field: "dateRange", label: "dateRange", value: '2008-3-3 - 2008-3-3', type: "dateRange" },
      {
        field: "upload", label: "upload", type: "upload", action: "", remove: (file, item) => {
          item.removeFile(file);
          this.$Message.info("delelte");
        }, success: (res, file) => {
          file.url = "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar";
          file.name = "7eb99afb9d5f317c912f08b5212fd69a";
          this.$Message.info("success");
        }, value: [
          {
            "name": "a42bdcc1178e62b4694c830f028db5c0",
            "url": "https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar"
          },
          {
            "name": "bc7521e033abdd1e92222d733590f104",
            "url": "https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar"
          }
        ]
      },
      {
        field: "upload2", label: "upload2", type: "upload", action: "", success: (res, file) => {
          file.url = "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar";
          file.name = "7eb99afb9d5f317c912f08b5212fd69a";
          this.$Message.info("success");
        }, value: [
          {
            "name": "a42bdcc1178e62b4694c830f028db5c0",
            "url": "https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar"
          },
          {
            "name": "bc7521e033abdd1e92222d733590f104",
            "url": "https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar"
          }
        ]
      },
      {
        field: "City",
        label: "城市",
        value: 'beijing',
        type: "select",
        data: [{ text: ">New York", value: "beijing" }, { text: "London", value: "shanghai" }]
      },
      { field: "Desc", label: "描述", value: '描述', type: "textarea", autosize: { minRows: 2, maxRows: 5 }, placeholder: "Desc" },
      { field: "custom", label: "Custom", value: 'Custom',  placeholder: "Custom", rule: [{ required: true, message: "The name cannot be empty", trigger: "blur" }] },
    ];
    dyncForm : any ;
    submit( data ){
      console.log( data )
      console.log( this.dyncForm.data );
      return this;
    }

    fail( data ){
      console.log( data )
      return this;
    }
    reset(){
      this.dyncForm.reset();
    }
    mounted() {  // Vue 的 mounted 初始化回调
        this.dyncForm = this.$refs.dyncForm;
        //this.dyncForm.value(this.data);
        this.dyncForm.data = this.data;
    }
  }
</script>

<style lang="scss" scoped>

</style>