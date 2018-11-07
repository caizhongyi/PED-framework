<template>
    <div>
        <div class="col-sm-12">
            <div class="ibox float-e-margins">
                <div class="ibox-content radius-5 clearfix">
                    <div class="dd pull-left padding20" id="nestable" style="width: 60%;border-right: 1px solid lightgray;overflow: auto;">
                        <no-ssr>
                            <vue-drag-tree :data='data' :allowDrag='allowDrag' :allowDrop='allowDrop'  @current-node-clicked='curNodeClicked' @drag="dragHandler" @drag-enter="dragEnterHandler" @drag-leave="dragLeaveHandler" @drag-over="dragOverHandler" @drag-end="dragEndHandler" @drop="dropHandler">
                            </vue-drag-tree>
                        </no-ssr>
                    </div>
                    <div class="info_area pull-left padding20" style="width: 40%;">
                        <div class="info_title clearfix">
                            <span id="title">菜单管理</span>
                            <i id="del_icon" data-id='' class="fa fa-trash pull-right" onclick="deleteMenu()"></i>
                        </div>
                        <div class="info_body marginTop10">
                            <div class="form-group">
                                <label>菜单名:</label>
                                <input type="text" id="menu_name" placeholder="请输入菜单名称" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>菜单链接:</label>
                                <input type="text" id="menu_href" placeholder="请输入菜单链接" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>FontAwesome图标:</label>
                                <input type="text" id="menu_icon" placeholder="菜单图标：如user" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>是否显示:</label>
                                <label class="marginRight10"><input id="yes" type="radio" name="menu_isshow" class="i-checks" value="1">是</label>
                                <label class="marginRight10"><input id="no" type="radio" name="menu_isshow" class="i-checks" value="0">否</label>
                            </div>
                            <div class="form-group">
                                <input type="hidden" id="menu_id">
                                <button class="btn btn-primary" onclick="save()" data-action="save-all" >保存</button>
                                <button class="btn btn-danger" onclick="window.location.reload()" data-action="cancel-all">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ajax ref="ajax"></ajax>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch, Model } from "nuxt-property-decorator";
    //@Component  @Prop @Watch @Model 装饰器，对变量或方法进行装饰成Vue特定功能变量或方法
    import { State, Getter, Action, Mutation, namespace } from "vuex-class";  // Vue store 全局定义，例如用户信息等全局都需要用的
    import Ajax from "~/components/ajax";  // 自定义组件目录
    import $ from 'jquery'
    // 自定义组件目录
    //组件声名
    @Component({
        components: { Ajax}
    })
    export default class  extends Vue {    //  typescript 创建类继成 Vue
        data = [
            {
                name: 'Node 0-0',
                id: 0,
                children: [
                    {
                        name: 'Node 1-1',
                        id: 3,
                        children: [
                            {
                                name: 'Node 2-1',
                                id: 4,
                                children: []
                            },
                            {
                                name: 'Node 2-2',
                                id: 10,
                                children: []
                            }
                        ]
                    },
                    {
                        name: 'Node 1-2',
                        id: 13,
                        children: []
                    }
                ]
            },
            {
                name: 'Node 0-1',
                id: 14,
                children: []
            }
        ];
        async get( params =  { is_ajax: 1 } ){   // async 异步声明
            let ajax:any = this.$refs.ajax;
            let res = await  ajax.get('http://localhost/saasportal/public/index.php?_url=admin/menu/list&menuid=7&is_ajax=1' , params);  // await 异步调用  es6写法
            console.log(res)
            console.log(this.data)
            this.data=res;
        }

        mounted() {  // Vue 的 mounted 初始化回调
            this.get();

        }
        allowDrag(model, component) {
            if (model.name === 'Node 0-1') {
                // can't be dragged
                return false;
            }
            // can be dragged
            return true;
        };
        allowDrop(model, component) {
            if (model.name === 'Node 2-2') {
                // can't be placed
                return false;
            }
            // can be placed
            return true;
        };

        curNodeClicked(model, component) {
             // console.log('curNodeClicked', model, component);
            $('#menu_id').val(model.id);
            $('#menu_name').val(model.name.trim());
            $('#menu_href').val(model.url)


        };
        dragHandler(model, component, e) {
            // console.log('dragHandler: ', model, component, e);

        };
        dragEnterHandler(model, component, e) {

            // console.log('dragEnterHandler: ', model, component, e);
        };
        dragLeaveHandler(model, component, e) {
            // console.log('dragLeaveHandler: ', model, component, e);
        };
        dragOverHandler(model, component, e) {
            // console.log('dragOverHandler: ', model, component, e);
        };
        dragEndHandler(model, component, e) {
            // console.log('dragEndHandler: ', model, component, e);
        };
        dropHandler(model, component, e) {
            // console.log('dropHandler: ', model, component, e);
        }

    }
</script>

<style lang="scss" scoped>

</style>
