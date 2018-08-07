<template>
    <div>
        <label v-for="value of data" :class="{ active: value.id == selected.id}">
            <input type="radio" name="a" @change="change(value)" >
        </label>
        <button type="button" @click="click()">{{ name }}</button>
      <!--  <i-button>click</i-button>-->
        <marquee behavior="" direction="">
            <span>aaaaaaaaaaaaaaaaaaaaa</span>
            <span>bbbbbbbbbbbbbbbbbbbbb</span>
            <span>aaaaaaaaaaaaaaaaaaaaa</span>
            <span>bbbbbbbbbbbbbbbbbbbbb</span>
        </marquee>
    </div>
</template>

<script lang="ts">
  import {
    Component,
    Prop,
    Vue,
    Watch,
    Model
  } from "nuxt-property-decorator"
  import { State } from "vuex-class"

  @Component
  export default class Page1 extends Vue {
    data = [
      {active: true, id: '1'},
      {active: false, id: '2'},
      {active: true, id: '3'},
      {active: false, id: '4'},
      {active: true, id: '5'},
      {active: true, id: '6'}
    ]

    selected = {
      id : 0,
      active : true,
    }
    name = 'aa';
    head (){
      return {
        title : "page" ,
        meta : [
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
        }
    }
    @Watch('selected', {deep: true})
    onChangeData(val) {
      console.log(val)
    }

    change(o) {
      this.selected = o;
    }

    mounted() {
      console.log(this.$route)
      console.log(this.$router)
    }

    click() {
      console.log(this.data)
    }
  }
</script>

<style lang="stylus" scoped>

</style>
