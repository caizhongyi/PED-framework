<template>
    <div class="layout">
        <i-layout class="layout">
            <i-header>
                <i-row>
                    <i-col span="16">
                            <i-menu mode="horizontal"  active-name="1">
                            <div class="layout-logo"></div>
                            <div class="layout-nav">
                                <i-menu-item name="1">
                                    <i-icon type="ios-navigate"></i-icon>
                                    Item 1
                                </i-menu-item>
                                <i-menu-item name="2">
                                    <i-icon type="ios-keypad"></i-icon>
                                    Item 2
                                </i-menu-item>
                                <i-menu-item name="3">
                                    <i-icon type="ios-analytics"></i-icon>
                                    Item 3
                                </i-menu-item>
                                <i-menu-item name="4">
                                    <i-icon type="ios-paper"></i-icon>
                                    Item 4
                                </i-menu-item>
                            </div>

                        </i-menu>
                    </i-col>
                    <i-col span="8">
                        <div class="pull-right">
                            <Dropdown style="margin-left: 20px">
                                <Button type="primary">
                                    <Icon type="md-person"></Icon>
                                    用户名
                                    <Icon type="ios-arrow-down"></Icon>
                                </Button>
                                <DropdownMenu slot="list">
                                    <DropdownItem>修改</DropdownItem>
                                    <DropdownItem disabled>个人信息</DropdownItem>
                                    <DropdownItem divided>退出</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>

                    </i-col>
                </i-row>
            </i-header>
            <i-layout class="ivu-layout-has-sider nt-main">
                <i-sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="nt-sider layout" >
                    <i-menu ref="menu" :active-name="$route.path"   width="auto" :open-names="openedNames" :class="menuitemClasses"
                            @on-select="route">
                 <!--       <div v-for="item in menuData" >
                            <i-menu-item v-if="!item['children']" :name="item.url" :title="item.name"><i-icon type="ios-navigate"></i-icon>首页</i-menu-item>
                            <i-submenu  v-else :name="item.url" :title="item.name">
                                <template slot="title"> <i-icon type="ios-analytics"></i-icon> {{ item.name }} </template>
                                <div v-for="subItem in item.children" >
                                    <i-menu-item :name="item.url"  :title="item.name">{{ item.name }}</i-menu-item>
                                    <i-submenu  v-else :name="item.url" :title="item.name">
                                        <template slot="title"><i-icon type="ios-analytics"></i-icon> {{ item.name }}</template>
                                        <div v-for="subItem in item" >
                                            <i-menu-item :name="item.url"  :title="item.name">{{ item.name }}</i-menu-item>
                                        </div>
                                    </i-submenu>
                                        &lt;!&ndash;   <i-menu-group :title="item.name">
                                               <i-menu-item  :name="item.url" v-for="">Option 1</i-menu-item>
                                               <i-menu-item  name="1-2">Option 2</i-menu-item>
                                           </i-menu-group>&ndash;&gt;
                                </div>

                             &lt;!&ndash;   <i-menu-group :title="item.name">
                                    <i-menu-item  :name="item.url" v-for="">Option 1</i-menu-item>
                                    <i-menu-item  name="1-2">Option 2</i-menu-item>
                                </i-menu-group>&ndash;&gt;

                            </i-submenu>
                        </div>-->


                    </i-menu>
                </i-sider>
                <i-layout class="nt-wrapper layout">
                    <i-breadcrumb class="nt-breadcrumb">
                        <i-breadcrumb-item > Home </i-breadcrumb-item>
                        <i-breadcrumb-item v-for="(item,key) in breadcrumb"  :key="key">{{ item }}</i-breadcrumb-item>
                    </i-breadcrumb>
                    <i-content class="nt-content">
                        <nuxt/>
                    </i-content>
                </i-layout>
            </i-layout>
        </i-layout>
    </div>

</template>

<script lang="ts">

  import { Component, Vue } from "nuxt-property-decorator";
  import _ from "underscore";
  //import locale from '~/node_modules/iview/dist/locale/zh-CN';

  @Component({
    components: {}
  })
  export default class  extends Vue {
    middleware = 'auth';
    collapsed = false;
    openedNames:any = [];
    breadcrumb:any = [];
    a = '';
    menuData:any = [
      {  name : '首页' , url : '/' , icon : 'ios-navigate'},
      {  name : '示例' , url : 'demo', children : [ {  name : '图表' , url : '/demo/charts' }, {  name : '设计' , url : '/demo/design' }, {  name : '文字滚动' , url : '/demo/marquee' }] },
      {  name : '组' , children : [
        [{ name : '组1' , url : '/'},{ name : '组1' , url : '/'}],
        [{ name : '组2' , url : '/'},{ name : '组2' , url : '/'}],
        [],
        ]}
    ];
    get menuitemClasses() {
      return [
        "menu-item",
        this.collapsed ? "collapsed-menu" : ""
      ];
    }


    route(name) {
      console.log(this.$refs.menu)
      console.log(this.$route)
      this.breadcrumb = this.getRoute(name);
      this.$router.push(name);
    }

    getRoute( path = this.$route.path ){
      if( path != '/' ){
        let pathArray = path.split('/');
        if( pathArray[0] == ''){
          let p = _(pathArray).filter((n)=>{
            return n !== "";
          })
          return p;
        }
      }
      else{
        return ['Home'];
      }
    }

    getBreadcrumb(){

    }

    created(){
      this.openedNames = this.getRoute();

    }

    mounted() {
    }
  }
</script>
<style scoped lang="scss">

</style>