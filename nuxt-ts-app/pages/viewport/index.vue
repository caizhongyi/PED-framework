<template>
    <div class="viewport">
        aaa
    </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from "nuxt-property-decorator";

  @Component({
    components: {
    }
  })
  export default class Design extends Vue {

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


    mounted() {

    }
  }
</script>

<style lang="stylus" scoped>
    .viewport{
        font-size 1rem;
    }
</style>
