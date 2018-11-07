<template>

    <div>
        <div class="tabs clearfix">
            <div class="tabs-nav-item" v-for="(item,key) in items" :key="key" :class="{ active : key == currentIndex }" @click="change(key)">{{ item.name }}</div>
        </div>
        <div class="tabs-content">
            {{ content  }}
            {{ new Date().getTime() | formatDate }}
        </div>
        <button type="button" @click="click()">click</button>
        <div v-for="item in obj">{{item}}</div>
    </div>

</template>

<script lang="ts">
  import {
    Component,
    Vue,
    Prop
  } from "nuxt-property-decorator"
  import { State ,Mutation ,Action ,Getter } from "vuex-class"

  @Component({
    components: {
    }
  })
  export default class Index extends Vue {
    items = [
      { name: 'item1' , content : 'content1'},
      { name: 'item2' , content : 'content2'},
      { name: 'item3' , content : 'content3'},
      ];
    obj = {
      a: 1,
      b: 2,
      c: 3,
    } ;
    content:any = '';
    currentIndex :any = 0;

    @Prop({ default : 0 }) index : any ;

    change( index ){
      this.currentIndex = index;
      this.content =  this.items[this.currentIndex].content;
      this.$emit('changed', index );
    }
    click(){
      this.obj.b = 10 ;
    }
    mounted(){
      this.change( this.index )
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