<template>
    <div>
        <page-table ref="table"
                    url="/api/role/list"
                    v-model="data"
                    :exp="{ filename : 'filename '}"
                    method="get"
                    :columns="columns"
                    :form-view-model="formViewModel"
                    :form-model="formModel"
                    :search-model="searchModel"
                    :params="params"
                    @search-submit="searchSubmit"
                    @edit-submit="editSubmit"
                    @edit-cancel="editCancel"></page-table> <!-- 自定义组件 ~/components/page-table.vue -->

        <Modal :width="500" :title="`【${rolename}】权限分配`" v-model="showRootData" @on-ok="submit" @on-cancel="fail">
            <dync-form :model="formRoot" :label-width="80" :submit-button="false" ref="forms">
                <template slot slot-scope="props"></template>
            </dync-form>
        </Modal>
        <ajax :loading="ajaxLoading" ref="ajax"></ajax>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch, Model} from "nuxt-property-decorator"
    //@Component  @Prop @Watch @Model 装饰器，对变量或方法进行装饰成Vue特定功能变量或方法
    import {State, Getter, Action, Mutation, namespace} from "vuex-class"  // Vue store 全局定义，例如用户信息等全局都需要用的
    import PageTable from "~/components/page-table";  // 自定义组件目录
    import Ajax from "~/components/ajax";  // 自定义组件目录
    import uuid from "uuid/v1";  // 自定义组件目录
    import DyncForm from "~/components/dync-form/index";
    import TreeChecked from "~/utils/index";
    declare var jQuery;
    //组件声名
    @Component({
        components: {
            PageTable, Ajax, DyncForm  //自定义组件
        }
    })
    export default class Role extends Vue {    //  typescript 创建类继成 Vue
        data: any = [];
        searchModel: any = [
            {field: 'role', label: '', placeholder: '输入用户组名进行查找', type: 'input'},
        ];
        table: any;
        value: any = 2; // 变量声明 ，any是无类型。 可以 object Array function boolean等类型
        params = {current: 1};
        form = {
            user: ''
        };
        formRoot: any = [
            {
                field: "root",
                label: "归属区域",
                required: true,
                type: "tree",
                data: [
                    {
                        id: 0,
                        title: '首页',
                    },
                    {
                        id: 1,
                        title: '地图'
                    },
                    {
                        id: 2,
                        title: '小区首页'
                    },
                    {
                        id: 3,
                        title: '居民首页'
                    },
                    {
                        id: 4,
                        title: '大屏'
                    },
                    {
                        id: 5,
                        title: "社区服务",
                        expand: false,
                        children: [
                            {
                                title: "自助缴费",
                                id: 0,
                            },
                            {
                                id: 1,
                                title: '投诉建议'
                            },
                            {
                                id: 2,
                                title: '物业报修'
                            },
                            {
                                id: 3,
                                title: '物业公告'
                            },
                            {
                                id: 4,
                                title: '居民诉求'
                            },
                        ]
                    },
                    {
                        id: 6,
                        title: '设备管理'
                    }
                ]
            },
        ];
        modal1: boolean = false;
        current: any = {};
        @Prop({default: 1}) settings: object;  // 只能单项绑定（组件内不能对其值更改）
        @Model() model: any; // 当作为组件引用时 v-model 值， 双项绑定（组件内可改变其值）

        @State user: any; // 全局 store 中的变量
        @Mutation stateMutation: any; // 全局  store 中的方法

        @Watch('value') // 相当于Vue 中的 watch bb变量
        onChangeModel(value) {   // 函数名自定义
            console.log(value)
        }
        ajaxLoading:any=false;
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

        formModel = [
            {field: 'rolename', type: 'input', label: "角色名称", required: true},
            {
                field: "description",
                label: "角色描述",
                type: "textarea",
                autosize: {minRows: 2, maxRows: 5},
                placeholder: "描述"
            },
        ]
        formViewModel = this.formModel;
        showRootData = false;
        rolename:any = '';

        columns = [
            {
                title: 'id',
                key: 'id',
                sortable: true
            },
            {
                title: '用户组',
                key: 'rolename',
            },
            {
                title: '描述',
                key: 'description',
            },
            {
                title: '操作', key: 'action', width: 300, align: 'center',
                render: (h, params) => {
                    let table: any = this.$refs.table;
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                        }, [h('router-link', {
                            props: {
                                to: '../settings/user'
                            },
                        }, '用户')
                        ]),
                        table.getViewControl(h, params),
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            on: {
                                click: (e) => {
                                    console.log('this', this.showRootData, params.row)
                                    // this.showRootData = true;
                                    this.rootAssign(params);
                                    console.log('this', this.showRootData)
                                }
                            }
                        }, '权限分配'),

                        // table.getEditControl(h, params),
                        table.getRemoveControl(h, params),
                    ]);
                }
            }
        ]

        //过虑器 可以在filters目录下创全局/过虑器
        filters() {
            return {
                status(val) {
                    return val == 1 ? '正常' : '异常'
                }
            }
        }

        exportData() {
            let table: any = this.$refs.table;   // this.$refs.table  标签的ref table , typescript是强类型为了避免麻烦直接定义为any类型;
            table.exportData();
        }

        async get(params = {current: 1}) {   // async 异步声明
            let ajax: any = this.$refs.ajax;
            let res = await ajax.get('/api/role/list', params);  // await 异步调用  es6写法
        }

        submitSearch(data) {
            console.log(data)
        }

        show(index = 0) {  //函数定义  index = 0 为默认参数值
            let table: any = this.$refs.table;
            this.current = table.data[index];
            this.modal1 = true;
        }

        searchSubmit(data) {
            console.log(data)
        }

        //提交修改
        editSubmit(data) {
            setTimeout(() => {
                if (!data.id) {
                    data.id = uuid();
                    this.table.data.push(data);
                }
                this.table.modal = false;
            }, 1000)
            console.log(data);
        }

        //取消修改
        editCancel(data) {
            console.log(data);
        }

        //权限分配
        async rootAssign(data) {
            let ajax: any = this.$refs.ajax;
            let res = await ajax.get('/api/role/privilege', {id:data.row.id});  // await 异步调用  es6写法
            this.rolename = data.row.rolename;
          //  console.log(TreeChecked.setTreeChecked(res.data.menu,res.data.chchecked));
            this.formRoot[0]['data']= TreeChecked.setTreeChecked(res.data.menu,res.data.chchecked);
            this.showRootData = true;
        }

        submit() {

        }

        fail() {

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
