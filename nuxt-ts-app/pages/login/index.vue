<style lang="scss">
    @import './login.scss';
</style>

<template>
    <div class="login">
        <div class="login-con">
            <Card icon="log-in" title="欢迎登录" :bordered="false">
                <div class="form-con">
                    <login-form @on-success-valid="handleSubmit"></login-form>
                    <p class="login-tip">输入任意用户名和密码即可</p>
                </div>
            </Card>
        </div>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
</template>

<script lang="ts">
  import LoginForm from "~/components/login-form";
  import { Component, Vue } from "nuxt-property-decorator";
  import { State } from "vuex-class";

  @Component({
    components: {
      LoginForm
    }
  })
  export default class extends Vue {
    scrollToTop = true;
    spinShow = false;
    layout() {
      return "empty";
    }

    @State people;

    /* get name (): boolean {
       return this.title + this.text
     }*/
    mounted() {
    }

    handleSubmit(e) {
      let _this = this;
      this.spinShow = true;

      setTimeout(()=>{
        _this.spinShow = false;

        if( _this.$route.params.ref ){
          _this.$router.push(_this.$route.params.ref);
        }
        else{
          _this.$router.push("/");
        }
      },1000)
    }
  }

</script>

