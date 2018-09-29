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
                            <Icon type="md-person"></Icon>用户名
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
                        </div>

                    </i-col>
                </i-row>
            </i-header>
            <i-layout class="ivu-layout-has-sider nt-main">
                <i-sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="nt-sider layout" >
                    <i-menu active-name="1-2"   width="auto" :open-names="['1']" :class="menuitemClasses"
                            @on-select="route">
                        <i-menu-item name="/"><i-icon type="ios-navigate"></i-icon>home</i-menu-item>

                        <i-submenu name="demo">
                            <template slot="title">
                                <i-icon type="ios-analytics"></i-icon>
                                demo
                            </template>
                            <i-menu-item name="/design">design</i-menu-item>
                            <i-menu-item name="/charts">charts</i-menu-item>
                            <i-menu-item name="/marquee">marquee</i-menu-item>
                        </i-submenu>

                        <i-submenu name="menu">
                            <template slot="title">
                                <i-icon type="ios-navigate"></i-icon>
                                MenuGroup
                            </template>
                            <MenuGroup title="Item 1">
                                <MenuItem name="1-1">Option 1</MenuItem>
                                <MenuItem name="1-2">Option 2</MenuItem>
                            </MenuGroup>
                            <MenuGroup title="Item 2">
                                <MenuItem name="1-3">Option 3</MenuItem>
                                <MenuItem name="1-4">Option 4</MenuItem>
                            </MenuGroup>
                        </i-submenu>

                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-filing" />
                                Navigation Two
                            </template>
                            <MenuItem name="2-1">Option 5</MenuItem>
                            <MenuItem name="2-2">Option 6</MenuItem>
                            <Submenu name="3">
                                <template slot="title">Submenu</template>
                                <MenuItem name="3-1">Option 7</MenuItem>
                                <MenuItem name="3-2">Option 8</MenuItem>
                            </Submenu>
                        </Submenu>
                    </i-menu>
                </i-sider>
                <i-layout class="nt-wrapper layout">
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
    middleware = 'auth';
    collapsed = false;
    get menuitemClasses() {
      return [
        "menu-item",
        this.collapsed ? "collapsed-menu" : ""
      ];
    }
    route(name) {
      this.$router.push(name);
    }

    mounted() {

    }
  }
</script>
<style scoped lang="scss">

</style>