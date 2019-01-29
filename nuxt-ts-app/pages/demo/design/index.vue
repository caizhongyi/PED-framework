<template>
    <div>
        <Row>
            <Col span="4">
                <Tree :data="data1" @on-select-change="change"></Tree>
            </Col>
            <Col span="20">
                <designer ref="design" v-model="designData"></designer>
            </Col>
        </Row>
    </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from "nuxt-property-decorator";
  import Designer from "~/components/g-designer/index.vue";

  @Component({
    components: {
      Designer
    }
  })
  export default class marquee extends Vue {
    designData = [{
      id : 0,
      x : 10 ,
      y : 10 ,
      width : 100,
      height : 100,
      rotate : 0,
      background : 'http://180.106.148.81:18082/schoolbeta/uploads/20181008/714b1b5f-6000-43ec-abde-ad74ce4bda8b.png',
      type : 1,
      hasTip : false,
      target : '',
      name : 'test',
    },
      {
        id : 1,
        x : 100 ,
        y : 100 ,
        width : 100,
        height : 100,
        rotate : 0,
        background : 'http://180.106.148.81:18082/schoolbeta/uploads/20181008/714b1b5f-6000-43ec-abde-ad74ce4bda8b.png',
        type : 1,
        hasTip : false,
        target : '',
        name : 'test',
      }];
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

    change() {
     /* let p : any =  this.$refs.design;
      p.design.empty().createR(   e[0].nodeKey  ,10 )*/
    }

    mounted() {

    }
  }
</script>

<style lang="scss" scoped>

</style>
