<template>
    <nuxt/>
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