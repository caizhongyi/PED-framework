<template>

    <div>
        {{ total  }}
        <ul>
            <li v-for="item in shops">
                {{ item.name }}
                <button type="button" @click="up(item)">+</button>
                <input type="text" v-model="item.count">
                <button type="button" @click="down(item)">-</button>
            </li>
        </ul>
    </div>

</template>

<script lang="ts">
  import {
    Component,
    Vue,
    Prop,
    Watch
  } from "nuxt-property-decorator"
  import { State ,Mutation ,Action ,Getter } from "vuex-class"

  @Component({
    components: {
    }
  })
  export default class  extends Vue {
    shops = [
      { id : 1 , name : '2222' , count : 1 },
      { id : 2 , name : '2222' , count : 2 },
      { id : 3 , name : '2222' , count : 1 },
    ]
    total = 0 ;
    @Watch('shops',{ immediate : true })
    onChange( val ){
      this.total = 0;
      for( let item of val ){
        this.total += parseInt(item.count)
      }
    }

    up(item){
        item.count += 1;
        this.shops.push();
    }
    down(item){
      item.count -= 1;
      this.shops.push();
    }
    mounted(){
    }
  }
</script>
<style lang="scss" scoped>
    .tabs-nav-item{
        text-align: center;
        border: 1px solid #ddd;
        float: left;
        padding: 10px;
        margin-bottom: -1px;
        &.active{
            background: #eee;
            color: #000;
        }
    }

    .tabs-content{
        border: 1px solid #ddd;
        padding: 20px;
    }

</style>