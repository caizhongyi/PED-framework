<template>
    <div>
        <i-row>
            <i-col span="4">
                <i-tree :data="data1" @on-select-change="change"></i-tree>
            </i-col>
            <i-col span="20">
                <designer ref="design"></designer>
            </i-col>
        </i-row>
    </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from "nuxt-property-decorator";
  import Designer from "~/components/g-designer/index";

  @Component({
    components: {
      Designer
    }
  })
  export default class marquee extends Vue {
    data = [
      { active: true, id: "1" },
      { active: false, id: "2" },
      { active: true, id: "3" },
      { active: false, id: "4" },
      { active: true, id: "5" },
      { active: true, id: "6" }
    ];
    data1 = [
      {
        title: "parent 1",
        expand: true,
        children: [
          {
            title: "parent 1-1",
            expand: true,
            children: [
              {
                title: "leaf 1-1-1"
              },
              {
                title: "leaf 1-1-2"
              }
            ]
          },
          {
            title: "parent 1-2",
            expand: true,
            children: [
              {
                title: "leaf 1-2-1"
              },
              {
                title: "leaf 1-2-1"
              }
            ]
          }
        ]
      }
    ];

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

    change(e) {
     /* let p : any =  this.$refs.design;
      p.design.empty().createR(   e[0].nodeKey  ,10 )*/
    }

    mounted() {

    }
  }
</script>

<style lang="scss" scoped>

</style>
