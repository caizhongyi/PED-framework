<template>
    <div class="layout">
        <i-layout class="layout">
            <i-header>
                <i-row>
                    <i-col span="20">
                        <i-menu mode="horizontal" class="clearfix" :active-name="headMenuActiveName" @on-select="turnToPage">
                            <div class="layout-logo inline-group">
                                <span>智慧校园SAAS管理平台</span>
                                <a href="javascript:void(0)" @click="collapsedChange">
                                    <Icon type="md-menu"/>
                                </a>
                            </div>
                            <div class="layout-nav">
                                <i-menu-item :name="`/${item.name == 'index' ? '' : item.name }`" v-for="(item,key) in menu" :key="key" v-if="item.isshow != false">
                                    <i-icon :type="item.icon"></i-icon>
                                    {{ item.title }}
                                </i-menu-item>
                            </div>
                        </i-menu>
                    </i-col>
                    <i-col span="4">
                        <div class="pull-right">
                            <Dropdown size="large" trigger="click" @on-click="logout">
                                <a href="javascript:;">
                                    <Icon type="md-person"></Icon> 用户名
                                    <Icon type="ios-arrow-down"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="/settings/user">
                                        <Icon type="ios-open-outline"/>
                                        修改
                                    </DropdownItem>
                                    <DropdownItem disabled>
                                        <Icon type="md-list-box"/>
                                        个人信息
                                    </DropdownItem>
                                    <DropdownItem divided name="logout">
                                        <Icon type="ios-log-out"/>
                                        退出
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </i-col>
                </i-row>
            </i-header>
                <i-layout class="ivu-layout-has-sider nt-main">
                    <i-sider v-if="siderVisible" hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed"
                             class="nt-sider layout">

                        <Menu ref="siderMenu" v-show="!collapsed" :active-name="menuActiveName" :open-names="openedNames"
                              :accordion="false" :theme="theme" @on-select="turnToPage">
                            <template v-for="(item,key) in menuList"  v-if="item.isshow != false">
                                <side-menu-item v-if="showChildren(item)"
                                                :key="`menu-${item.name}`"
                                                :name="getNameOrHref(item ,false )"
                                                :parent-item="item"
                                ></side-menu-item>
                                <menu-item v-else
                                           :name="getNameOrHref(item , false )"
                                           :key="`menu-${item.name}`"
                                >
                                    <i-icon :type="item.icon || ''"/>
                                    <span>{{ showTitle(item) }}</span>
                                </menu-item>
                            </template>
                        </Menu>
                        <div class="menu-collapsed" v-show="collapsed" :list="menuList">
                            <template v-for="item in menuList"  v-if="item.isshow != false">
                                <collapsed-menu v-if="item.children && item.children.length > 1"
                                                :name="getNameOrHref(item , false)" hide-title root-icon-size="14"
                                                icon-size="large" :parent-item="item"
                                                :key="`drop-menu-${item.name}`"></collapsed-menu>
                                <Tooltip transfer v-else
                                         :content="(item.meta && item.title) || (item.children && item.children[0] && item.children[0].title)"
                                         placement="right" :key="`drop-menu-${item.name}`">
                                    <a @click="turnToPage(getNameOrHref(item, false))" class="drop-menu-a"
                                       :style="{textAlign: 'center'}">
                                        <i-icon size="large" :type="item.icon || (item.children && item.children[0].icon)"/>
                                    </a>
                                </Tooltip>
                            </template>
                        </div>
                    </i-sider>

                    <i-layout class="nt-wrapper layout">
                        <i-breadcrumb class="nt-breadcrumb" v-if="breadcrumbVisible">
                            <i-breadcrumb-item v-for="(item,key) in breadCrumbList" :key="key"> {{ item.title }} </i-breadcrumb-item>
                        </i-breadcrumb>
                        <i-content class="nt-content">
                            <nuxt/>
                        </i-content>
                    </i-layout>
                </i-layout>
        </i-layout>
        <ajax ref="ajax"></ajax>
    </div>
</template>

<script lang="ts">

  import { Component, Prop, Vue, Watch, Model } from "nuxt-property-decorator";
  import { State, Mutation, Action, Getter } from "vuex-class";
  import _ from "underscore";
  import mixin from "~/components/menu/mixin";
  import cookie from "js-cookie";
  import sideMenuItem from "~/components/menu/side-menu-item";
  import CollapsedMenu from "~/components/menu/collapsed-menu";
  import Ajax from "~/components/ajax";
  import util from "~/utils";
  //import locale from '~/node_modules/iview/dist/locale/zh-CN';

  @Component({
    components: {
      sideMenuItem, CollapsedMenu, Ajax
    }
  })
  export default class Default extends mixin {
    @State menu;
    @Prop({ default : true }) siderVisible ;
    @Prop({ default : true }) breadcrumbVisible ;
    @Mutation setUserToken ;

    ajax: any;
    middleware = "auth";
    collapsed = false;
    openedNames: any = [];
    breadCrumbList: any = [];
    theme = "light";
   // @Mutation getMenu;
    menuList:any = [];
    siderMenu : any ;
    headMenuActiveName:any = '';
    menuActiveName:any = '';

    get menuitemClasses() {
      return [
        "menu-item",
        this.collapsed ? "collapsed-menu" : ""
      ];
    }

    @Watch("$route",{ immediate : true })
    changeRoute(newRoute) {
      this.getMenuList(newRoute);
      this.getBreadCrumbList(newRoute);

      this.menuActiveName = this.$route.path;
      this.$nextTick(()=>{
        if(this.siderMenu) this.siderMenu.updateActiveName();
      })
    }

    collapsedChange() {
      this.collapsed = !this.collapsed;
    }

    getBreadCrumbList(newRoute) {
      this.breadCrumbList = [];
      this.headMenuActiveName = '';
      let currentRouteList = newRoute.path.split("/");
      this.getMenuTitle( currentRouteList , 1 , this.menu);
    }

    getMenuTitle( currentRouteList , index , menu ) {
      let menuItem : any = _( menu ).filter(( n )=>{
        currentRouteList[index] = currentRouteList[index] || 'index';
        return currentRouteList[index] == n.sourceName;
      });
      if( menuItem && menuItem.length ){
        this.breadCrumbList.push({ name: menuItem[0].name, title: menuItem[0].title });
        !this.headMenuActiveName && (this.headMenuActiveName = (`/${menuItem[0].name}`));
        this.headMenuActiveName  = this.headMenuActiveName == '/index' ? '/' : this.headMenuActiveName ;
        this.getMenuTitle( currentRouteList , ++index , menuItem[0].children )
      }
      return this;
    }

    getMenuList( route :any ) {
      //控件示例
      let paths = route.path.split('/');
      let name = paths[1] || 'index' ;

      if( !name ) {
         return this;
      }

     /* const names =  name.split('-');
      name = names.length ? names[0] : name;*/

      let filterList : any = _( this.menu ).filter(( n )=>{
         return n.name == name;
      });
      filterList = filterList && filterList[0] ? filterList[0] : null ;
      if( !filterList ) return this;

      this.menuList = filterList.children || [];
      return this;
    }

    //页面跳转
    turnToPage(name) {
      if (name.indexOf("isTurnByHref_") > -1) {
        window.open(name.split("_")[1]);
        return;
      }
      this.$router.push(name);
    }


    getRoute(path = this.$route.path) {
      if (path != "/") {
        let pathArray = path.split("/");
        if (pathArray[0] == "") {
          let p = _(pathArray).filter((n) => {
            return n !== "";
          });

          p = _(p).map((n) => {
            return "/" + n;
          });

          return p;
        }
      }
      else {
        return [""];
      }
    }

    logout(name) {
      if( name == 'logout'){
        this.setUserToken('');
        this.$router.push("/login");
      }
      else
        this.$router.push(name);
      return this;
    }

    created() {
    }

    mounted() {
      this.openedNames = this.getRoute();
      this.ajax = this.$refs.ajax;
      this.siderMenu = this.$refs.siderMenu;
    }
  }
</script>
<style scoped lang="scss">

</style>