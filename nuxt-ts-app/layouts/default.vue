<template>
    <div class="layout">
        <i-layout>
            <i-header>
                <i-row>
                    <i-col span="16">
                        <i-menu mode="horizontal" theme="dark" active-name="1">
                            <div class="layout-logo"></div>
                            <div class="layout-nav">/
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
                        <Icon type="ios-contact-outline" />用户名
                        <Dropdown style="margin-left: 20px">
                            <Button type="primary">
                                下拉菜单
                                <Icon type="ios-arrow-down"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem>驴打滚</DropdownItem>
                                <DropdownItem>炸酱面</DropdownItem>
                                <DropdownItem disabled>豆汁儿</DropdownItem>
                                <DropdownItem>冰糖葫芦</DropdownItem>
                                <DropdownItem divided>北京烤鸭</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </i-col>
                </i-row>
            </i-header>
            <i-layout class="ivu-layout-has-sider">
                <i-sider class="nt-sider" collapsible :collapsed-width="78" v-model="isCollapsed" hide-trigger>
                    <i-menu active-name="1-2" theme="light" width="auto" :open-names="['1']" :class="menuitemClasses"
                            @on-select="route">
                        <i-submenu name="1">
                            <template slot="title">
                                <i-icon type="ios-navigate"></i-icon>
                                Item 1
                            </template>
                            <i-menu-item name="/">home</i-menu-item>
                            <i-menu-item name="/page1">page1</i-menu-item>
                            <i-menu-item name="/design">design</i-menu-item>
                        </i-submenu>
                        <i-submenu name="2">
                            <template slot="title">
                                <i-icon type="ios-keypad"></i-icon>
                                Item 2
                            </template>
                            <i-menu-item name="2-1">Option 1</i-menu-item>
                            <i-menu-item name="2-2">Option 2</i-menu-item>
                        </i-submenu>
                        <i-submenu name="3">
                            <template slot="title">
                                <i-icon type="ios-analytics"></i-icon>
                                Item 3
                            </template>
                            <i-menu-item name="3-1">Option 1</i-menu-item>
                            <i-menu-item name="3-2">Option 2</i-menu-item>
                        </i-submenu>
                    </i-menu>
                </i-sider>
                <i-layout class="nt-wrapper">
                    <i-breadcrumb class="nt-breadcrumb">
                        <i-breadcrumb-item>Home</i-breadcrumb-item>
                        <i-breadcrumb-item>Components</i-breadcrumb-item>
                        <i-breadcrumb-item>Layout</i-breadcrumb-item>
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
  //import locale from '~/node_modules/iview/dist/locale/zh-CN';

  @Component({
    components: {}
  })
  export default class  extends Vue {
    isCollapsed = false;

    get menuitemClasses() {
      return [
        "menu-item",
        this.isCollapsed ? "collapsed-menu" : ""
      ];
    }

    route(name) {
      this.$router.push(name);
    }

    mounted() {

    }
  }
</script>
<style scoped lang="stylus">
    .nt-content {
        background #ffffff
        padding 20px;
    }

    .nt-sider {
        background #fff
    }

    .nt-wrapper{
        padding 20px
    }
    .nt-breadcrumb{
        padding-bottom 20px
    }

    .layout-con {
        height: 100%;
        width: 100%;
    }

    .menu-item span {
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }

    .menu-item i {
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }

    .collapsed-menu span {
        width: 0px;
        transition: width .2s ease;
    }

    .collapsed-menu i {
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }

    .ivu-menu {
        a {
            display block
            color #666
        }
    }

    .page-enter-active, .page-leave-active {
        transition: opacity .5s;
    }

    .page-enter, .page-leave-to {
        opacity: 0;
    }
</style>