<template>

  <div>

    <div class="box" v-draggable="{ trigger : '.box' ,  body: '.box'}">drag</div>

    <button type="button" @click="goto()">link</button>

    <h1 class="header">Nuxt TypeScript Starter</h1>
    <div class="cards">
    </div>
    <loading v-model="loadingVisible"></loading>
</div>

</template>

<script lang="ts">
import {
  Component,
  Vue
} from "nuxt-property-decorator"
import { State ,Mutation ,Action ,Getter } from "vuex-class"
import Loading from "~/components/loading.vue"
import DragBlock from "~/components/drag-block/index.vue"

@Component({
  components: {
    DragBlock ,
    Loading ,
  }
})
export default class extends Vue {
  scrollToTop = true;
  loadingVisible = false;
  @State people;
  @Mutation setPeople;
 /* get name (): boolean {
    return this.title + this.text
  }*/
  mounted() {
    this.setPeople([1,2]);
    console.log(this.people);
    /*this.$router.push({
      name:'login'
    })*/
  }
  goto(){
    this.$router.push({
      name:'page1',
      query : { id : "1" , value : "0" }
    })
  }
}
</script>
<style lang="scss" scoped>
.header {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana,
    sans-serif;
}

.cards {
  display: flex;
  flex-wrap: wrap;
}
.box{
  width: 100px;
  height: 100px;
  background: red;
}
</style>