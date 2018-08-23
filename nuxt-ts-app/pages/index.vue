<template>

  <div>

    <div class="box" v-draggable="{ trigger : '.box' ,  body: '.box'}">drag</div>

    <button type="button" @click="goto()">link</button>

    <h1 class="header">Nuxt TypeScript Starter</h1>
    <div class="cards">
    </div>

</div>

</template>

<script lang="ts">
import {
  Component,
  Vue
} from "nuxt-property-decorator"
import { State } from "vuex-class"
import Card from "~/components/card.vue"
import DragBlock from "~/components/drag-block/index.vue"

@Component({
  components: {
    Card ,
    DragBlock ,
  }
})
export default class extends Vue {
  scrollToTop = true
  @State people
 /* get name (): boolean {
    return this.title + this.text
  }*/
  mounted() {
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
<style scoped>
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