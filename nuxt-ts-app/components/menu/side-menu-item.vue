<template>
    <Submenu :name="`/${parentItem.name}`" >
      <template slot="title">
        <i-icon :type="parentItem.icon || ''"/>
        <span>{{ showTitle(parentItem) }}</span>
      </template>
      <template v-for="item in parentItem.children">
        <template v-if="item.children && item.children.length === 1">
          <side-menu-item v-if="showChildren(item)" :name="getNameOrHref(item, true , name)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
          <menu-item v-else :name="getNameOrHref(item, true , name)" :key="`menu-${item.children[0].name}`"><i-icon :type="item.children[0].icon || ''"/><span>{{ showTitle(item.children[0]) }}</span></menu-item>
        </template>
        <template v-else>
          <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :name="getNameOrHref(item, false, name)"  :parent-item="item"></side-menu-item>
          <menu-item v-else :name="getNameOrHref(item , false , name )" :key="`menu-${item.name}`"><i-icon :type="item.icon || ''"/><span>{{ showTitle(item) }}</span></menu-item>
        </template>
      </template>
    </Submenu>
</template>
<script lang="ts">
  import { Component, Prop, Vue,Watch,Model} from "nuxt-property-decorator"
  import mixin from './mixin'

  @Component({})
  export default class  extends mixin {
    @Prop() name:String ;
    @Prop() parentName: String;
    @Prop() parentItem: any;

    mounted() {
    }
  }
</script>
