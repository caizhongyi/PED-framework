<template>
    <div>
        <auto-form ref="AutoForm" :model="form" v-model="data"  @success="submit" @fail="fail">
            <template slot="header">Form Header </template>
            <template slot slot-scope="props">
                <FormItem prop="custom" label="自定义" :required="true">
                    <Input v-model="props.data['custom']" placeholder="自定义"></Input>
                </FormItem>
            </template>
            <template slot="footer">Form Footer</template>
        </auto-form>

        <!--<auto-form ref="noSubmitForm" v-model="form" :label-width="80" @success="submit" @fail="fail" :submit-button="null"></auto-form>-->
    </div>
</template>

<script lang="ts">
  import { Component,  Vue } from "nuxt-property-decorator";
  //@Component  @Prop @Watch @Model 装饰器，对变量或方法进行装饰成Vue特定功能变量或方法
 // import { State, Getter, Action, Mutation, namespace } from "vuex-class";  // Vue store 全局定义，例如用户信息等全局都需要用的

  import AutoForm from "~/components/auto-form/index.vue";
  //组件声名
  @Component({
    components: { AutoForm }
  })
  export default class Form extends Vue {    //  typescript 创建类继成 Vue

    data: any = {
    name: "名称",
      email: "",
      date: "2008-3-3",
      datetime: "2008-1-3 12:12:21",
      datetimeRange: ["2018-11-22 00:00:00", "2018-12-29 00:00:00"],
      dateRange: ["2018-11-22", "2018-12-29"],
      City: "beijing",
      upload: [
        {
          "name": "a42bdcc1178e62b4694c830f028db5c0",
          "url": "https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar",
          "status": "finished"
        },
        {
          "name": "bc7521e033abdd1e92222d733590f104",
          "url": "https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar",
          "status": "finished"
        }
      ],
      upload2: [],  //上传必须要有默认值
      interest: ["eat", "sleep"],
      gender: "male"
    };

    form: any = [
      {
        field: "name",
        label: "名称",
        type: "input",
        required: true,
        rule: [
          { required: true, message: "请输入信息"},
          { type: "string", max: 6, message: "小于6个字符" }
        ],
        children: [{
          field: "children",
          label: "children",
          type: "input",
          required: true,
          rule: [{ required: true, message: "请输入信息" }]
        }]
      },
      {
        field: "email",
        label: "email",
        type: "input",
        rule: [{ type: "email", message: "格式错误" }]
      },
      {
        field: "tree",
        label: "tree",
        type: "tree",
        prop : ['id'],
        data: [
          {
            id: 0,
            title: "parent 1",
            expand: true,
            children: [
              {
                title: "parent 1-1",
                id: 1,
                expand: false,
                children: [
                  {
                    title: "leaf 1-1-1"
                  },
                  {
                    title: "leaf 1-1-2"
                  }
                ]
              },
              {
                id: 2,
                title: "parent 1-2",
                expand: false,
                children: [
                  {
                    title: "leaf 1-2-1"
                  },
                  {
                    title: "leaf 1-2-1"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        field: "gender",
        label: "姓别",
        type: "radio",
        data: [{ text: "Male", value: "male" }, { text: "Female", value: "female" }]
      },
      {
        field: "interest",
        label: "interest",
        type: "checkbox",
        data: [{ text: "Eat", value: "eat" }, { text: "Sleep", value: "sleep" }],
        rule: [{ required: true, type: "array", message: "The name cannot be empty"}]
      },
      { field: "date", label: "date", type: "date" },
      { field: "datetime", label: "datetime", type: "datetime" },
      { field: "datetimeRange", label: "datetimeRange", type: "datetimeRange" },
      { field: "dateRange", label: "dateRange", type: "dateRange" },
      {
        field: "upload", label: "upload", length:2, type: "upload", action: "", remove: ( {} , {} , next ) => {
           setTimeout(()=>{
             next(  );
           },1000)
        }, success: ({} , {} , next) => {
          setTimeout(()=>{
            next();
          },1000)
        }
      },
      {
        field: "upload2", label: "upload2", type: "upload", action: "", success: ({} , {} , next) => {
          setTimeout(()=>{
            next( );
          },1000)
        }
      },
      {
        field: "City",
        label: "城市",
        type: "select",
        required: true,
        data: [{ text: "New York", value: "beijing" }, { text: "London", value: "shanghai" }],
        rule: [{ required: true, type: "array", message: "The name cannot be empty", trigger: 'change' }]
      },
      {
        field: "multiple",
        label: "城市",
        type: "select",
        multiple: true,
        required: true,
        data: [{ text: "New York", value: "beijing" }, { text: "London", value: "shanghai" }],
        rule: [{ required: true, type: "array", message: "The name cannot be empty", trigger: 'change' }]
      },
      {
        field: "Age", label: "Age", type: "input", placeholder: "Desc", rule: [
          {
            validator: ({}, value, callback) => {
              if (!value) {
                return callback(new Error("请输入信息"));
              }
              // 模拟异步验证效果
              setTimeout(() => {
                if (!Number.isInteger(value)) {
                  callback(new Error("请输入数值"));
                } else {
                  if (value < 18) {
                    callback(new Error("小于18"));
                  } else {
                    callback();
                  }
                }
              }, 1000);
            }
          }
        ]
      },
      { field: "Desc", label: "描述", type: "textarea", autosize: { minRows: 2, maxRows: 5 }, placeholder: "Desc" },
      {
        field: "custom", label: "Custom", placeholder: "Custom", rule: [
          { required: true, message: "请输入信息"},
          { type: "string", min: 20, message: "最小输入20个字符"}
        ]
      }
    ];
    AutoForm: any;

    submit(data) {
      console.log(data);
      console.log(this.AutoForm.data);
      return this;
    }

    fail(data) {
      console.log(data);
      return this;
    }

    reset() {
      this.AutoForm.reset();
    }

    mounted() {  // Vue 的 mounted 初始化回调
      this.AutoForm = this.$refs.AutoForm;
      //this.data.email = "emal";
    }
  }
</script>

<style lang="scss" scoped>

</style>                          