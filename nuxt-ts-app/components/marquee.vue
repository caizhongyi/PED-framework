<template>
    <div class="marquee-wrap" :style="{ height : height , 'line-height' : height , width : width }">
        <ul class="marquee" :style="{ left : pos + '%',width: (100 * data.length) + '%' }">
            <li v-for="o in data" @click="link(o)">{{ o.name }}</li>
        </ul>
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
  import {Getter, Action, State} from 'vuex-class'

  @Component
  export default class Marquee extends Vue {
    @Prop()
    data = [];
    @Prop()
    height = '30px';
    @Prop()
    width = '100%';
    @Prop()
    interval = 1000;
    // computed
    link( o ) {
        this.$router.push(o.url)
    }
    pos = 0 ;
    // watch
    @Watch('text')
    onChangeText() {
    }

    /*@Model()
    visible: boolean = false;

    @Watch('visible')
    onChangeVisible(val) {
      this.$emit('input', val);
    }*/
    done(){
        if( this.pos <= -100 ){
            this.pos = 0;
            let firstData = this.data[0];
            this.data.splice(0 ,1 );
            this.data.push(firstData);
        }
    }
    mounted() {
      setInterval.call( this, this.done , this.interval );
    }
  }
</script>
<style scoped>
    .marquee-enter-active{
        transition: all .1s ease;
    }
    .marquee-leave-active{
        @extend .marquee-enter-active
    }
    .marquee-enter{

    }
    .marquee-wrap{
        text-align: center;
    }
    .marquee{
        position: relative;
    }
</style>
