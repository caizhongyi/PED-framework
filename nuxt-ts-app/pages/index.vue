<template>
    <div>
        <!-- <button type="button" @click="goto()">link</button>-->
        <!-- <router-link to="/">跳转</router-link>-->

        <!--<loading v-model="loadingVisible"></loading>-->
        <br>
        <br>
        <ajax ref="ajax" :loading="false"></ajax>
    </div>

</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";
  import { State, Mutation, Action, Getter } from "vuex-class";
  import Loading from "~/components/loading.vue";
  import $ from "jquery";
  import Ajax from "~/components/ajax";
  @Component({
    components: {
      Loading,
      Ajax
    }
  })
  export default class Index extends Vue {

    @State userToken;
    @Mutation setUserToken;

    ajax: any;
    scrollToTop = true;
    loadingVisible = false;

    layout() {
    //  return "default-no-slider";
    }

    /* get name (): boolean {
       return this.title + this.text
     }*/
    mounted() {
      this.ajax = this.$refs.ajax;
     /* this.$Modal.confirm({
        content :'aa',
        loading:true,
        onOk :()=>{
          this.$Message.error('请检查表单是否输入正确!');
        }
      })*/
      // let res : any = await this.ajax.post('/api/account/check',{});
      // console.log(res);
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

    changed(index) {
      // console.log(index)
    }

    goto() {
      this.$router.push({
        name: "page1",
        query: { id: "1", value: "0" }
      });
    }
  }
</script>
<style lang="scss" scoped>

</style>