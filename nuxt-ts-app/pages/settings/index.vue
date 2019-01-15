<template>
    <div>
        <auto-table ref="table"
                    v-model="data"
                    url="/api/account/list"
                    :exp="{ filename : 'filename '}"
                    method="get"
                    :columns="columns"
                    :form-view-model="formViewModel"
                    :form-model="formModel"
                    :form-default-data="formDefaultData"
                    :search-model="searchModel"
                    :params="params"
                    @search-submit="searchSubmit"
                    @edit-submit="editSubmit"
                    @edit-cancel="editCancel">
            <template slot="modal-footer">
                <i-button type="default" :loading="buttonLoading">账号解锁</i-button>
            </template>
        </auto-table> <!-- 自定义组件 ~/components/auto-table.vue -->
        <ajax :loading="ajaxLoading" ref="ajax"></ajax>
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch, Model } from "nuxt-property-decorator";
  //@Component  @Prop @Watch @Model 装饰器，对变量或方法进行装饰成Vue特定功能变量或方法
  import { State, Getter, Action, Mutation, namespace } from "vuex-class";  // Vue store 全局定义，例如用户信息等全局都需要用的
  import AutoTable from "~/components/auto-table";  // 自定义组件目录
  import Ajax from "~/components/ajax";  // 自定义组件目录
  import uuid from "uuid/v1";  // 自定义组件目录
  import AutoForm from "~/components/auto-form/index";
  import filters from "~/filters/index";

  declare var jQuery;
  //组件声名
  @Component({
    components: {
      AutoTable, Ajax, AutoForm //自定义组件
    }
  })
  export default class User extends Vue {    //  typescript 创建类继成 Vue
    searchModel: any = [
      { field: "username", label: "", placeholder: "输入名称进行查找", type: "input" }
    ];
    table: any;
    data: any = [];
    value: any = 2; // 变量声明 ，any是无类型。 可以 object Array function boolean等类型
    ajaxLoading: any = true;
    params: any = {};
    // form = {
    // user : ''
    // };
    // firstName : any  = 'cai' ; //typescript中支持 private、public、protected
    // lastName : any  = 'zhongyi' ;
    modal1: boolean = false;
    current: any = {};
    buttonLoading = false;
    @Prop({ default: 1 }) settings: any;  // 只能单项绑定（组件内不能对其值更改）
    @Model() model: any; // 当作为组件引用时 v-model 值， 双项绑定（组件内可改变其值）

    @State user: any; // 全局 store 中的变量
    @Mutation stateMutation: any; // 全局  store 中的方法

    @Watch("value") // 相当于Vue 中的 watch bb变量

    onChangeModel(value) {   // 函数名自定义
      console.log(value);
    }

    //
    // get name(){
    //   return this.firstName +  this.lastName ;  // 想当于vue computed
    // }
    // async submit(){
    //   let table:any = this.$refs.table;   // this.$refs.table  标签的ref table , typescript是强类型为了避免麻烦直接定义为any类型;
    //   table.change({ current : parseInt(this.form.user), ...this.form });
    //   //  let res = await this.get({ current : parseInt(this.form.user), ...this.form });
    //
    // }
    /*  set name( value ){
        this._name = value;
        return 'set:' +  this._name  ;
      }*/

    //变量定义
    formDefaultData = {
      status : 1
    }
    formModel = [
      {
        field: "username",
        type: "input",
        label: "用户名",
        required: true,
        rule: [{ type: "string", message: "请输入用户名", required: true }]
      },
      {
        field: "password", type: "password", label: "新密码", required: true, rule: [
          { type: "string", message: "请输入密码", required: true },
          {
            validator: (rule, value, callback) => {
              let table: any = this.$refs.table;
              table.form.validateField("password");
              if (value === "") {
                callback(new Error("请输入密码"));
              } else if (value !== table.formData["confirmPassword"]) {
                callback(new Error("两次输入的密码不一致!"));
              } else {
                callback();
              }
            }
          }
        ]
      },
      {
        field: "confirmPassword", type: "password", label: "确认密码", required: true, rule: [
          { type: "string", message: "请输入确认密码", required: true },
          {
            validator: (rule, value, callback) => {
              let table: any = this.$refs.table;
              table.form.validateField("confirmPassword");
              if (value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value !== table.formData.password) {

                callback(new Error("两次输入的密码不一致!"));
              } else {
                callback();
              }
              /* // 模拟异步验证效果
               setTimeout(() => {
                 if (!Number.isInteger(value)) {
                   callback(new Error('Please enter a numeric value'));
                 } else {
                   if (value < 18) {
                     callback(new Error('Must be over 18 years of age'));
                   } else {
                     callback();
                   }
                 }
               }, 1000);*/
            }
          }
        ]
      },
      {
        field: "roleids",
        label: "角色",
        type: "select",
        multiple: true,
        required: true,
        data: [
          { text: "超级管理员", value: "1" },
          { text: "设备管理_垃圾箱", value: "2" },
          { text: "设备管理_签到", value: "3" }
        ]
      },
      {
        field: "address",
        label: "归属区域",
        required: true,
        type: "tree",
        data: [
          {
            id: 0,
            title: "中国电信学院北京校区",
            expand: true,
            children: [
              {
                title: "学生公寓",
                id: 0,
                expand: false,
                children: [
                  {
                    id: 0,
                    title: " 一号楼宿舍",
                    expand: false,
                    children: [
                      {
                        id: 0,
                        title: "1层"
                      },
                      {
                        id: 1,
                        title: "2层"
                      },
                      {
                        id: 2,
                        title: "3层"
                      },
                      {
                        id: 3,
                        title: "4层"
                      },
                      {
                        id: 4,
                        title: "5层"
                      }
                    ]
                  },
                  {
                    id: 1,
                    title: "二号楼宿舍",
                    expand: false,
                    children: [
                      {
                        id: 0,
                        title: "1层"
                      },
                      {
                        id: 1,
                        title: "2层"
                      },
                      {
                        id: 2,
                        title: "3层"
                      },
                      {
                        id: 3,
                        title: "4层"
                      },
                      {
                        id: 4,
                        title: "5层"
                      }
                    ]
                  }
                ]
              },
              {
                id: 1,
                title: "中国电信学院上海校区",
                expand: false,
                children: [
                  {
                    id: 0,
                    title: "教学区",
                    expand: false,
                    children: [
                      {
                        id: 0,
                        title: "电信南研楼",
                        expand: false,
                        children: [
                          {
                            id: 0,
                            title: "1层"
                          },
                          {
                            id: 1,
                            title: "2层"
                          },
                          {
                            id: 2,
                            title: "3层"
                          }
                        ]
                      },
                      {
                        id: 1,
                        title: "上海校区停车场"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 1,
            title: "北京科技职业学院"
          }
        ]
      },
      { field: "mobile", type: "input", label: "电话", required: true },
      { field: "email", type: "input", label: "邮箱", required: true },
      {
        field: "status",
        label: "状态",
        type: "radio",
        data: [{ text: "启用", value: 1 }, { text: "禁用", value: 0 }]
      }
    ];
    formViewModel = [
      { field: "username", type: "input", label: "用户名", required: true },
      {
        field: "address",
        label: "归属区域",
        required: true,
        type: "tree",
        data: [
          {
            id: 0,
            title: "中国电信学院北京校区",
            expand: true,
            children: [
              {
                title: "学生公寓",
                id: 0,
                expand: false,
                children: [
                  {
                    id: 0,
                    title: " 一号楼宿舍",
                    expand: false,
                    children: [
                      {
                        id: 0,
                        title: "1层"
                      },
                      {
                        id: 1,
                        title: "2层"
                      },
                      {
                        id: 2,
                        title: "3层"
                      },
                      {
                        id: 3,
                        title: "4层"
                      },
                      {
                        id: 4,
                        title: "5层"
                      }
                    ]
                  },
                  {
                    id: 1,
                    title: "二号楼宿舍",
                    expand: false,
                    children: [
                      {
                        id: 0,
                        title: "1层"
                      },
                      {
                        id: 1,
                        title: "2层"
                      },
                      {
                        id: 2,
                        title: "3层"
                      },
                      {
                        id: 3,
                        title: "4层"
                      },
                      {
                        id: 4,
                        title: "5层"
                      }
                    ]
                  }
                ]
              },
              {
                id: 1,
                title: "中国电信学院上海校区",
                expand: false,
                children: [
                  {
                    id: 0,
                    title: "教学区",
                    expand: false,
                    children: [
                      {
                        id: 0,
                        title: "电信南研楼",
                        expand: false,
                        children: [
                          {
                            id: 0,
                            title: "1层"
                          },
                          {
                            id: 1,
                            title: "2层"
                          },
                          {
                            id: 2,
                            title: "3层"
                          }
                        ]
                      },
                      {
                        id: 1,
                        title: "上海校区停车场"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 1,
            title: "北京科技职业学院"
          }
        ]
      },
      { field: "mobile", type: "input", label: "电话", required: true },
      { field: "email", type: "input", label: "邮箱", required: true },
      {
        field: "status",
        label: "状态",
        type: "radio",
        data: [{ text: "启用", value: "启用" }, { text: "禁用", value: "禁用" }]
      },
      { field: "last-ip", type: "input", label: "最后登录IP" },
      { field: "last-time", type: "input", label: "最后登录时间" }
    ];

    columns = [
      {
        type: "selection",
        width: 60,
        align: "center"
      },
      {
        title: "用户名",
        key: "username",
        sortable: true
      },
      {
        title: "用户组",
        key: "roles",
        render: (h, params) => {
          let table: any = this.$refs.table;
          if (typeof params.row.roles === "string") {
            params.row.roles = params.row.roles.split(",");
            table.value[params.index].roles = params.row.roles;
          }
          let arr: any = [];
          for (var i = 0; i < params.row.roles.length; i++) {
            let props = {
              color: "success"
            };
            arr.push(h("Tag", {
              props: props
            }, params.row.roles[i]));
          }
          return h("div", arr);
        }
      },
      {
        title: "注册时间",
        key: "create_time",
        render: (h, params) => {
          var time = filters.formatDate(new Date());
          return h("div", time);
        }
      },
      {
        title: "邮箱",
        key: "email"
      },
      {
        title: "联系电话",
        key: "mobile",
        render: (h, params) => {
          var mobile = params.row.mobile.replace(params.row.mobile.substring(3, 7), "XXXX");
          return h("div", mobile);
        }
      },
      {
        title: "状态",
        key: "status"
      },
      {
        title: "操作", key: "action", width: 250, align: "center",
        render: (h, params) => {
          let table: any = this.$refs.table;
          return h("div", [
            table.getViewControl(h, params),
            // table.getEditControl(h, params),
            h("Button", {
              props: {
                type: "primary",
                icon: "md-eye",
                size: "small"
              },
              on: {
                click: () => {
                  this.getRole(() => {
                    table.edit(params.index);
                  });
                }
              }
            }, "修改"),
            table.getRemoveControl(h, params)
          ]);
        }
      }
      // {
      //   title: '操作',
      //   key: 'action',
      //   width: 250,
      //   align: 'center',
      //   render: (h, params) => {
      //     return h('div', [
      //       h('Button', {
      //         props: {
      //           type: 'primary',
      //           size: 'small'
      //         },
      //         style: {
      //           marginRight: '5px'
      //         },
      //         on: {
      //           click: () => {
      //             let table:any = this.$refs.table;
      //             table.edit( params.index );
      //             //this.show(params.index)
      //           }
      //         }
      //       }, '查看'),
      //       h('Button', {
      //         props: {
      //           type: 'primary',
      //           size: 'small'
      //         },
      //         style: {
      //           marginRight: '5px'
      //         },
      //         on: {
      //           click: () => {
      //             let table:any = this.$refs.table;
      //             table.edit( params.index );
      //             //this.show(params.index)
      //           }
      //         }
      //       }, '编辑'),
      //       h('Button', {
      //         props: {
      //           type: 'error',
      //           size: 'small'
      //         },
      //         on: {
      //           click: () => {
      //             let table:any = this.$refs.table;
      //             table.delete( params.index );
      //            // this.remove(params.index)
      //           }
      //         }
      //       }, '删除')
      //     ]);
      //   }
      // }
    ];

    //过虑器 可以在filters目录下创全局/过虑器
    filters() {
      return {
        status(val) {
          return val == 1 ? "正常" : "异常";
        }
      };
    }

    exportData() {
      let table: any = this.$refs.table;   // this.$refs.table  标签的ref table , typescript是强类型为了避免麻烦直接定义为any类型;
      table.exportData();
    }

    async getRole(callback) {   // async 异步声明
      let ajax: any = this.$refs.ajax;
      let res = await ajax.get("/api/role/list", { source_type: 1 });  // await 异步调用  es6写法
      let data: any = res.paging.data;
      this.formModel[3]["data"] = data;
      callback && callback();
    }

    submitSearch(data) {
      console.log(data);
    }

    show(index = 0) {  //函数定义  index = 0 为默认参数值
      let table: any = this.$refs.table;
      this.current = table.data[index];
      this.modal1 = true;
    }

    searchSubmit(data) {
      console.log(data);
    }

    //提交修改
    editSubmit(data, next, restore) {
      setTimeout(() => {
        if (data.id == null) {
          data.id = uuid();
          next(data.id);
        }
        else {
          next();
        }
      }, 1000);
      // restore() 什么都不做
    }

    //取消修改
    editCancel(data) {
      console.log(data);
    }

    remove(index) {
      let table: any = this.$refs.table;
      table.data.splice(index, 1);
    }

    // 页面 head 中文件内容
    head() {
      return {
        title: "page",
        meta: [
          {
            hid: "description",
            name: "description",
            content: "Nuxt.js project"
          },
          {
            hid: "keyword",
            name: "keyword",
            content: "Nuxt.js project"
          }
        ]
      };
    }


    mounted() {  // Vue 的 mounted 初始化回调
      let _this = this;
      // jQuery('.class').netstable();
      this.table = this.$refs.table;
    }

  }
</script>

<style lang="scss" scoped>
    .viewport {
        font-size: 1rem;
    }
</style>
