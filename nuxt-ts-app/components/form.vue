<template>
  <div>
    <Form ref="form" :model="form" :inline="inline">
      <slot name="header"></slot>
      <FormItem v-for="item in data" :prop="item.label">
        <Input type="text" v-model="form[item.field]" :placeholder="item.label"></Input>
      </FormItem>
      <slot></slot>
      <FormItem>
        <Button type="primary" @click="submit()">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script lang="ts">
  import { Component, Model, Prop, Vue, Watch } from "nuxt-property-decorator";
  import Ajax from "./ajax";

  @Component({
    components : { Ajax }
  })
  export default class Form extends Vue {
    @Prop() inline: any ;
    @Prop() form : any ;

    change( params ){

    }

    mounted() {

    }
  }
</script>
<style scoped lang="scss">


</style>
