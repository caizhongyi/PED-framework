<template>
  <div class="layout">
    <i-layout>
      <i-header>
        <i-menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <i-menu-item name="1">
              <i-icon type="ios-navigate"></i-icon>
              Item 1
            </i-menu-item>
            <i-menu-item name="2">
              <i-icon type="ios-keypad"></i-icon>
              Item 2
            </i-menu-item>
            <i-menu-item name="3">
              <i-icon type="ios-analytics"></i-icon>
              Item 3
            </i-menu-item>
            <i-menu-item name="4">
              <i-icon type="ios-paper"></i-icon>
              Item 4
            </i-menu-item>
          </div>
        </i-menu>
      </i-header>
      <i-layout>
        <div hide-trigger :style="{background: '#fff'}">
          <i-menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
            <i-submenu name="1">
              <template slot="title">
                <i-icon type="ios-navigate"></i-icon>
                Item 1
              </template>
              <i-menu-item name="1-1">Option 1</i-menu-item>
              <i-menu-item name="1-2">Option 2</i-menu-item>
              <i-menu-item name="1-3">Option 3</i-menu-item>
            </i-submenu>
            <i-submenu name="2">
              <template slot="title">
                <i-icon type="ios-keypad"></i-icon>
                Item 2
              </template>
              <i-menu-item name="2-1">Option 1</i-menu-item>
              <i-menu-item name="2-2">Option 2</i-menu-item>
            </i-submenu>
            <i-submenu name="3">
              <template slot="title">
                <i-icon type="ios-analytics"></i-icon>
                Item 3
              </template>
              <i-menu-item name="3-1">Option 1</i-menu-item>
              <i-menu-item name="3-2">Option 2</i-menu-item>
            </i-submenu>
          </i-menu>
        </div>
        <i-layout :style="{padding: '0 24px 24px'}">
          <i-breadcrumb :style="{margin: '24px 0'}">
            <i-breadcrumb-item>Home</i-breadcrumb-item>
            <i-breadcrumb-item>Components</i-breadcrumb-item>
            <i-breadcrumb-item>Layout</i-breadcrumb-item>
          </i-breadcrumb>
          <i-content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <nuxt/>
          </i-content>
        </i-layout>
      </i-layout>
    </i-layout>
  </div>

</template>

<script lang="ts">

  import {
    Component,
    Vue
  } from "nuxt-property-decorator"
  //import locale from '~/node_modules/iview/dist/locale/zh-CN';

  @Component({
    components : {}
  })
  export default class Default extends Vue {}
</script>
