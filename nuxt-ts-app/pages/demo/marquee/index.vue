<template>
    <div class="viewport" style="overflow:hidden; height: 100px" >
        <no-ssr><vue-seamless-scroll  :data="marquee"   class="marquee">
            <Row v-for="o in marquee" :key="o.id">
                <Col span="6"><p>{{ o.name }}</p></Col>
                <Col span="6"><p>{{ o.status  }}</p></Col>
                <Col span="6"><p>{{ o.type }}</p></Col>
                <Col span="6"><p>{{ o.date | formatDate }}</p> </Col>
            </Row>
        </vue-seamless-scroll></no-ssr>
    </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from "nuxt-property-decorator";
  //import vueSeamless from "vue-seamless-scroll";
  import filters from "~/filters/index";

  @Component({
    components: {
     // vueSeamless
    }
  })
  export default class marquee  extends Vue {
    marquee = [
      { id : 1 ,name : 'a' , status : 1 , type : 1 , date : new Date() },
      { id : 2 ,name : 'a' , status : 1 , type : 1 , date : new Date() },
      { id : 3 ,name : 'a' , status : 1 , type : 1 , date : new Date() },
      { id : 4 ,name : 'a' , status : 1 , type : 1 , date : new Date() },
      { id : 5 ,name : 'a' , status : 1 , type : 1 , date : new Date() },
      { id : 6 ,name : 'a' , status : 1 , type : 1 , date : new Date() },
    ]
    filters() {
      return {
        status( val ){
          return val == 1 ? '正常' : '异常'
        }
      }
    }
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
      console.log(filters.formatDate( new Date() , 'YYYY-MM-DD hh:mm:ss'))
    }
  }
</script>

<style lang="scss" scoped>
    .viewport{
        font-size:1rem;
    }
</style>
