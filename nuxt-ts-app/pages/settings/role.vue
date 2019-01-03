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
                    @remove="remove"
                    @search-submit="searchSubmit"
                    @edit-submit="editSubmit"
                    @edit-cancel="editCancel"></page-table> <!-- 自定义组件 ~/components/page-table.vue -->

        <Modal :width="500" :title="`【${rolename}】权限分配`" v-model="showRootData" @on-ok="submit" @on-cancel="fail">
            <dync-form :model="formRoot" v-model="formData" :label-width="80" :submit-button="false" ref="forms">
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
        formData: any = {};
        searchModel: any = [
            {field: 'role', label: '', placeholder: '输入用户组名进行查找', type: 'input'},
        ];
        table: any;
        id: any = '';
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
                data: []
            },
        ];
        modal1: boolean = false;
        current: any = {};
        @Prop({default: 1}) settings: any ;  // 只能单项绑定（组件内不能对其值更改）
        @Model() model: any; // 当作为组件引用时 v-model 值， 双项绑定（组件内可改变其值）

        @State user: any; // 全局 store 中的变量
        @Mutation stateMutation: any; // 全局  store 中的方法

        @Watch('value') // 相当于Vue 中的 watch bb变量
        onChangeModel(value) {   // 函数名自定义
            console.log(value)
        }

        ajaxLoading: any = false;
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
            {field: 'rolename', type: 'input', label: "角色名称", required: true ,  rule: [{ required: true, message: "请输入角色名称" }]},
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
        rolename: any = '';

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
                                to: { path: 'user', query: { roleid: params.row.id } }
                            },
                        }, '用户')
                        ]),
                        //table.getViewControl(h, params),
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            on: {
                                click: (e) => {
                                    // console.log('this', this.showRootData, params.row)
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

        async refreshGet(params:any = {page: this.table.page}) {   // async 异步声明
            let ajax: any = this.$refs.ajax;
            let res = await ajax.get('/api/role/list', params);  // await 异步调用  es6写法
            // this.table.reload();
            this.table.value=res.paging.data
            this.table.pageSize=res.paging.pageSize
            this.table.total=res.paging.total
            this.table.page=res.paging.page;
        }


        show(index = 0) {  //函数定义  index = 0 为默认参数值
            let table: any = this.$refs.table;
            this.current = table.data[index];
            this.modal1 = true;
        }

        searchSubmit(data) {
            this.refreshGet({role:data.role})
        }

        //提交修改
        async editSubmit(data, next , restore ) {
            let ajax: any = this.$refs.ajax;
            let res = await ajax.post('/api/role/create', {rolename: data.rolename, description: data.description});  // await 异步调用  es6写法
            if (res.code == '200') {
                // data.id = res.data.id;
                this.refreshGet();
                // this.table.value.unshift(data);
                next();
                this.$Message.success({title: '提示', content: res.message,  duration: 5,closable: true })
            } else {
              restore();
            }
        }

        //取消修改
        editCancel(data) {
            console.log(data);
        }

        //权限分配
        async rootAssign(data) {
            let ajax: any = this.$refs.ajax;
            this.id = data.row.id;
            let res = await ajax.get('/api/role/privilege', {id: data.row.id});  // await 异步调用  es6写法
            this.rolename = data.row.rolename;
            //  console.log(TreeChecked.setTreeChecked(res.data.menu,res.data.chchecked));
            this.formRoot[0]['data'] = TreeChecked.setTreeChecked(res.data.menu, res.data.chchecked);
            this.showRootData = true;
        }

        async submit() {
            let ajax: any = this.$refs.ajax;
            console.log(this.formData)
            let datas = TreeChecked.getTreeChecked(this.formData.root, [], ['id']);
            console.log(datas)
            let res = await ajax.post('/api/role/privilege', {id: this.id, role_nodes: datas, dosubmit: 1});  // await 异步调用  es6写法
            if (res.code == '200') {
                setTimeout(() => {
                    this.$Message.success({title: '提示', content: res.message,  duration: 5,closable: true  })
                }, 500)
            }
        }

        //删除
        async remove(data, next) {
            let ajax: any = this.$refs.ajax;
            let res = await ajax.post('/api/role/delete', {id: data.id});  // await 异步调用  es6写法
            console.log(res);
            if (res.code == '200') {
                this.refreshGet();
                next();
                setTimeout(() => {
                    this.$Message.success({title: '提示', content: res.message,  duration: 5,closable: true })
                }, 500)
            } else {
                this.$Modal.remove();

            }
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
