<template>
    <div>
        <label v-for="value of data" :class="{ active: value.id == selected.id}">
            <input type="radio" name="a" @change="change(value)" >
        </label>
        <button type="button" @click="click()">click</button>
        <ve-line :data="chartData" :settings="chartSettings"></ve-line>
    </div>

</template>

<script lang="ts">
  import { Component, Prop, Vue,Watch,Model} from "nuxt-property-decorator"
  import { State,Getter, Action, Mutation,namespace} from "vuex-class"

  import VeLine from 'v-charts/lib/line'

  @Component({
    components: { VeLine }
  })
  export default class charts extends Vue {
    chartSettings = {};
    chartData = {
        columns : ['时间' , '比值', '占比'],
        rows : [
          { '时间' : '2000/1/1', '比值' : 1 , '占比' : 1000 },
          { '时间' : '2000/1/2', '比值' : 12 , '占比' : 34 },
          { '时间' : '2000/1/3', '比值' : 60 , '占比' : 46 },
          { '时间' : '2000/1/4', '比值' : 34 , '占比' : 788 },
        ]
    };
    data = [
      {active: true, id: '1'},
      {active: false, id: '2'},
      {active: true, id: '3'},
      {active: false, id: '4'},
      {active: true, id: '5'},
      {active: true, id: '6'}
    ];

    selected = {
      id : 0,
      active : true,
    }
    head (){
      return {
        title : "图表" ,
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
    }

    click() {
      console.log(this.data)
    }
  }
</script>

<style lang="scss" scoped>

</style>
