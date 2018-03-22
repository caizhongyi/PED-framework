<template>
    <div id="app">
        <img src="./assets/logo.png">
        <router-view/>
    </div>
</template>

<script lang="ts" >
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import 'jquery'

    @Component
    export default class App extends Vue {

    }
    //
    // window.history.pushState({}, "title", "#");
    // window.addEventListener("popstate", function(e) {
    //   location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc414efbcad7bb44d&redirect_uri=http%3A%2F%2Fwx.fjykt.com%2F%2FStore%2FGgk%2Findex%2Fid%2F456&response_type=code&scope=snsapi_base&state=#wechat_redirect';
    // }, false);
</script>

<style lang="stylus" scoped>
    /*@import "ts.stylus";*/

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
