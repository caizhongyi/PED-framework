<template>
  <div class="layout">
    <layout>
      <header>
        <menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <menu-item name="1">
              <icon type="ios-navigate"></icon>
              Item 1
            </menu-item>
            <menu-item name="2">
              <icon type="ios-keypad"></icon>
              Item 2
            </menu-item>
            <menu-item name="3">
              <icon type="ios-analytics"></icon>
              Item 3
            </menu-item>
            <menu-item name="4">
              <icon type="ios-paper"></icon>
              Item 4
            </menu-item>
          </div>
        </menu>
      </header>
      <layout>
        <slider hide-trigger :style="{background: '#fff'}">
          <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                Item 1
              </template>
              <MenuItem name="1-1">Option 1</MenuItem>
              <MenuItem name="1-2">Option 2</MenuItem>
              <MenuItem name="1-3">Option 3</MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>
                Item 2
              </template>
              <MenuItem name="2-1">Option 1</MenuItem>
              <MenuItem name="2-2">Option 2</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                Item 3
              </template>
              <MenuItem name="3-1">Option 1</MenuItem>
              <MenuItem name="3-2">Option 2</MenuItem>
            </Submenu>
          </Menu>
        </slider>
        <layout :style="{padding: '0 24px 24px'}">
          <breadcrumb :style="{margin: '24px 0'}">
            <breadcrumb-item>Home</breadcrumb-item>
            <breadcrumb-item>Components</breadcrumb-item>
            <breadcrumb-item>Layout</breadcrumb-item>
          </breadcrumb>
          <content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <nuxt/>
          </content>
        </layout>
      </layout>
    </layout>
  </div>

</template>

<script lang="ts">
  import {
    Component,
    Vue
  } from "nuxt-property-decorator"
  // import iView from '~/node_modules/iview/dist/iview';
  // import locale from '../src/locale/lang/en-US';
  //import locale from '~/node_modules/iview/dist/locale/zh-CN';
  import iView from 'iview';
  import 'iview/dist/styles/iview.css'

  Vue.use(iView);

  @Component({
    components : { }
  })
  export default class Default extends Vue {}
</script>
