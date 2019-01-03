<template>
  <Dropdown @on-click="handleClick" transfer :placement="placement">
    <a class="drop-menu-a" type="text"  @mouseover="handleMousemove($event, children)" :style="{textAlign: !hideTitle ? 'left' : ''}">
      <i-icon size="large"  :type="parentItem.icon"/><span class="menu-title" v-if="!hideTitle">{{ showTitle(parentItem) }}</span>
      <Icon style="float: right;" v-if="!hideTitle" type="ios-arrow-forward" :size="16"/>
    </a>
    <DropdownMenu slot="list">
      <template v-for="child in children"  v-if="child.isshow != false">
        <collapsed-menu v-if="showChildren(child)" icon-size="large" :name="getNameOrHref(child , false ,name)" :parent-item="child" :key="`drop-${child.name}`"></collapsed-menu>
        <DropdownItem v-else :key="`drop-${child.name}`" :name="getNameOrHref(child , false ,name)"><i-icon size="large" :type="child.icon"/><span class="menu-title">{{ showTitle(child) }}</span></DropdownItem>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>
<script lang="ts">

import { Component, Prop, Vue,Watch,Model} from "nuxt-property-decorator"
import mixin from './mixin'

@Component({})
export default class CollapsedMenu  extends mixin {
 // mixins: [ mixin, itemMixin ],
  @Prop({ default : false , type : Boolean }) hideTitle : any  ;
  @Prop() name: any;
  @Prop() parentItem: any;
  placement =  'right-end';

  get parentName () {
    return this.parentItem.name
  }
  get children () {
    return this.parentItem.children;
  }
  handleClick (name) {
    this.$router.push(name);
  }
  handleMousemove (event, children) {
    const { pageY } = event
    const height = children.length * 38
    const isOverflow = pageY + height < window.innerHeight
    this.placement = isOverflow ? 'right-start' : 'right-end'
  }
  mounted(){
  }
}
</script>
