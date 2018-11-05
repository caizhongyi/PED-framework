<template>
    <nuxt/>
</template>

<script lang="ts">

  import { Component, Vue } from "nuxt-property-decorator";
  //import locale from '~/node_modules/iview/dist/locale/zh-CN';

  @Component({
    components: {}
  })
  export default class Empty extends Vue {
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
<style scoped lang="scss">
</style>