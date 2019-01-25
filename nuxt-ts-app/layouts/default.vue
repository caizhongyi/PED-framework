<template>
    <div class="layout">
        <Layout class="layout">
            <Header>
                <Row>
                    <Col span="20">
                        <Menu mode="horizontal" class="clearfix" :active-name="headMenuActiveName" @on-select="turnToPage">
                            <div class="layout-logo inline-group">
                                <span>智慧校园SAAS管理平台</span>
                                <a href="javascript:void(0)" @click="collapsedChange">
                                    <Icon type="md-menu"/>
                                </a>
                            </div>
                            <div class="layout-nav">

                                <MenuItem :name="`/${item.name == 'index' ? '' : item.name }`" v-for="(item,key) in menu" :key="key" v-if="item.isshow != false">
                                    <Icon :type="item.icon"></Icon>
                                    {{ item.title }}
                                </MenuItem>
                            </div>
                        </Menu>
                    </Col>
                    <Col span="4">
                        <div class="pull-right">
                            <Dropdown size="large" trigger="click" @on-click="logout">
                                <a href="javascript:;">
                                    <Icon type="md-person" size="16"></Icon> &nbsp; 用户名
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
                    </Col>
                </Row>
            </Header>
                <Layout class="ivu-layout-has-sider nt-main">
                    <Sider v-if="siderVisible" hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed"
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
                                    <Icon :type="item.icon || ''"/>
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
                                        <Icon size="large" :type="item.icon || (item.children && item.children[0].icon)"/>
                                    </a>
                                </Tooltip>
                            </template>
                        </div>
                    </Sider>

                    <Layout class="nt-wrapper layout">
                        <Breadcrumb class="nt-breadcrumb" v-if="breadcrumbVisible">
                            <BreadcrumbItem v-for="(item,key) in breadCrumbList" :key="key"> {{ item.title }} </BreadcrumbItem>
                        </Breadcrumb>
                        <Content class="nt-content">
                            <nuxt/>
                        </Content>
                    </Layout>
                </Layout>
        </Layout>
        <ajax ref="ajax"></ajax>
    </div>
</template>

<script lang="ts">

  import { Component, Prop, Watch } from "nuxt-property-decorator";
  import { State, Mutation } from "vuex-class";
  import _ from "underscore";
  import mixin from "~/components/menu/mixin";
  import sideMenuItem from "~/components/menu/side-menu-item.vue";
  import CollapsedMenu from "~/components/menu/collapsed-menu.vue";
  import Ajax from "~/components/ajax/index.vue";
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