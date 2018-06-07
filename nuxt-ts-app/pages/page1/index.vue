<template>
   <!-- {{data}}-->
  <!--  <label v-for="o in data">
        <input type="radio" v-model="o.active">
    </label>-->

</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component
  export default class Page1 extends Vue {
     data = [
       { active : true , value : '1'},
       { active : false , value : '1'},
       { active : true , value : '1'},
       { active : false , value : '1'},
       { active : true , value : '1'},
       { active : true , value : '1'}
     ]
    mounted(){
        console.log(this.data)
        console.log( this.$route )
        console.log( this.$router )
    }
  }
</script>

<style lang="stylus" scoped>

</style>
