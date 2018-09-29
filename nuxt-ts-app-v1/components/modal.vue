<template>
  <div class="card">
    <h2> </h2>
    <img :src="'https://robohash.org/' + person.first_name + '_' + person.last_name" />
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
import { Getter, Action , State } from 'vuex-class'

@Component({})
export default class  extends Vue {
  /* @Prop({ default: '' })
 @Getter('checkoutStatus') checkoutStatus: CheckoutStatus
 text: string

 // store
 @userState userId

 // computed
 get name (): boolean {
   return this.title + this.text
 }

 // watch
 @Watch('text')
 onChangeText () { }*/

  /*
  // v-model 默认值
  @Prop()
  value: boolean = false;

  @Watch('value')
  onChangeValue( val ) {
    this.visible = val;
  }*/

  @Model()
  visible:boolean = false;

  @Watch('visible')
  onChangeVisible( val ) {
    this.$emit('input', val);
  }
  mounted() {
  }
}
</script>
<style scoped>
.card {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana,
    sans-serif;
  padding: 1rem;
  margin: 0.25rem;
  border: 0.25rem solid gainsboro;
}
</style>
