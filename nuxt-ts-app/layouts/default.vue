<template>
    <div class="layout">
        <i-layout class="layout">
            <i-header>
                <i-row>
                    <i-col span="20">
                        <i-menu mode="horizontal" class="clearfix" active-name="1">
                            <div class="layout-logo">智慧校园SAAS管理平台</div>
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
                    <i-col span="4">
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
                <i-sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed"
                         class="nt-sider layout">
                    <!--  <i-menu ref="menu" :active-name="$route.path"   width="auto" :open-names="openedNames" :class="menuitemClasses"
                              @on-select="route">
                          <i-menu-item  name="/" title="首页"><i-icon type="ios-navigate"></i-icon>首页</i-menu-item>
                          <i-submenu  name="/demo"  title="示例"  >
                              <template slot="title"><i-icon type="ios-analytics"></i-icon> 示例 </template>
                              <i-menu-item name="/demo/charts"  title="图表">图表</i-menu-item>
                              <i-menu-item name="/demo/design"  title="设计">设计</i-menu-item>
                              <i-menu-item name="/demo/marquee"  title="文字滚动">文字滚动</i-menu-item>
                          </i-submenu>
                      </i-menu>-->

                    <Menu ref="menu" v-show="!collapsed" :active-name="$route.path" :open-names="openedNames"
                          :accordion="false" :theme="theme"  @on-select="turnToPage">
                        <template v-for="item in menuList">
                            <template v-if="item.children && item.children.length === 1">
                                <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`"
                                                :name="getNameOrHref(item)" :parent-item="item"></side-menu-item>
                                <menu-item v-else :name="getNameOrHref(item, true)"
                                           :key="`menu-${item.children[0].name}`">
                                    <i-icon :type="item.children[0].icon || ''"/>
                                    <span>{{ showTitle(item.children[0]) }}</span></menu-item>
                            </template>
                            <template v-else>
                                <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`"
                                                :name="getNameOrHref(item)" :parent-item="item"></side-menu-item>
                                <menu-item v-else :name="getNameOrHref(item , false )" :key="`menu-${item.name}`">
                                    <i-icon :type="item.icon || ''"/>
                                    <span>{{ showTitle(item) }}</span></menu-item>
                            </template>
                        </template>
                    </Menu>
                    <!--       <div class="menu-collapsed" v-show="collapsed" :list="menuList">
                               <template v-for="item in menuList">
                                   <collapsed-menu v-if="item.children && item.children.length > 1" @on-click="handleSelect" hide-title :root-icon-size="rootIconSize" :icon-size="iconSize" :theme="theme" :parent-item="item" :key="`drop-menu-${item.name}`"></collapsed-menu>
                                   <Tooltip transfer v-else :content="(item.meta && item.meta.title) || (item.children && item.children[0] && item.children[0].meta.title)" placement="right" :key="`drop-menu-${item.name}`">
                                       <a @click="handleSelect(getNameOrHref(item, true))" class="drop-menu-a" :style="{textAlign: 'center'}"><common-icon :size="rootIconSize" :color="textColor" :type="item.icon || (item.children && item.children[0].icon)"/></a>
                                   </Tooltip>
                               </template>
                           </div>-->

                </i-sider>
                <i-layout class="nt-wrapper layout">
                    <i-breadcrumb class="nt-breadcrumb">
                        <i-breadcrumb-item> 首页</i-breadcrumb-item>
                        <i-breadcrumb-item v-for="(item,key) in breadCrumbList" :key="key">{{ item.title }}
                        </i-breadcrumb-item>
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

  import { Component, Prop, Vue, Watch, Model } from "nuxt-property-decorator";
  import _ from "underscore";
  import mixin from "~/components/menu/mixin";
  import SideMenuItem from "~/components/menu/side-menu-item";
  //import locale from '~/node_modules/iview/dist/locale/zh-CN';

  @Component({
    components: {
      SideMenuItem
    }
  })
  export default class extends mixin {
    middleware = "auth";
    collapsed = false;
    openedNames: any = [];
    breadCrumbList: any = [];
    currentRouteList : any = [];
    theme = "light";
    menuList: any = [
      { name: "", meta: { icon: "ios-book", title: "首页" }, children: [] },
      { name: "baidu", meta: { icon: "ios-book", title: "百度" }, href: "https://www.baidu.com/", children: [] },
      {
        name: "demo", meta: { icon: "ios-book", title: "示例" }, children: [
          { name: "charts", meta: { icon: "ios-book", title: "图表" } },
          { name: "design", meta: { icon: "ios-book", title: "设计器" } }
        ]
      }
    ];

    get menuitemClasses() {
      return [
        "menu-item",
        this.collapsed ? "collapsed-menu" : ""
      ];
    }

    @Watch("$route")
    changeRoute( newRoute: any ) {
        this.getBreadCrumbList(newRoute);
    }

    getBreadCrumbList( newRoute: any ){
      this.breadCrumbList = [];
      this.currentRouteList = newRoute.name.split("-");
      this.getMenuTitle(this.menuList, 0 );
    }
    getMenuTitle(item, index ) {
      let name = this.currentRouteList[index];
      if( !name ) return ;
      for (let o of item) {
        if (o["name"] == name) {
          this.breadCrumbList.push({ name: o.name , title: o['meta'].title });
          if (o.children && o.children.length != 0) {
            this.getMenuTitle(o.children, ++ index);
          }
        }
        else {

        }
      }
    }

    //页面跳转
    turnToPage(name) {
      if (name.indexOf("isTurnByHref_") > -1) {
        window.open(name.split("_")[1]);
        return;
      }
      this.$router.push(name);
    }

    /*  route(name) {
        ////console.log(this.$refs.menu)
        //console.log(this.$route)
        this.breadcrumb = this.getRoute(name);
        this.$router.push(name);
        this.$emit('on-select', name)
      }*/

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

    created() {
      this.openedNames = this.getRoute();
    }

    mounted() {
    }
  }
</script>
<style scoped lang="scss">

</style>