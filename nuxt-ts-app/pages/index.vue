<template>

  <section>
    <button type="button" @click="goto()">link</button>
    <h1 class="header">Nuxt TypeScript Starter</h1>
    <div class="cards">
      <Card v-for="person in people" :key="person.id" :person="person"></Card>
    </div>
  </section>

</template>

<script lang="ts">
import {
  Component,
  Vue
} from "nuxt-property-decorator"
import { State } from "vuex-class"
import Card from "~/components/card.vue"

@Component({
  components: {
    Card
  }
})
export default class extends Vue {
  scrollToTop = true
  @State people
  //layout = 'default'

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
</style>