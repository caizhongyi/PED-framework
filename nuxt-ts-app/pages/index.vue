<template>
  <div>
   <!-- <button type="button" @click="goto()">link</button>-->
   <!-- <router-link to="/">跳转</router-link>-->

    <!--<loading v-model="loadingVisible"></loading>-->
    <br>
    <br>
</div>

</template>

<script lang="ts">
import {
  Component,
  Vue
} from "nuxt-property-decorator"
import { State ,Mutation ,Action ,Getter } from "vuex-class"
import Loading from "~/components/loading.vue"

import $ from "jquery"

@Component({
  components: {
    Loading ,
  }
})
export default class Index extends Vue {
  scrollToTop = true;
  loadingVisible = false;
  @State people;
  @Mutation setPeople;
 /* get name (): boolean {
    return this.title + this.text
  }*/
  mounted() {
   // this.setPeople([1,2]);
   // console.log(this.ajax)
   // console.log(this.people)
    //console.log(Vue.filter('formatDate'))
   // console.log(location)
    // this.ajax.post('',{});
    /*this.$router.push({
      name:'login'
    })*/
  }
  changed( index ){
   // console.log(index)
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

</style>