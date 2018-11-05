
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

/*  import '~/assets/js/jigsaw-random-code/jigsaw.js';

  declare var jigsaw;*/

  @Component({
    components: {
      LoginForm
    }
  })
  export default class Login extends Vue {
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

<style lang="scss">
    .login{
        width: 100%;
        height: 100%;
        background-image: url('../../assets/images/login-bg.jpg');
        background-size: cover;
        background-position: center;
        position: absolute;
        &-con{
            position: absolute;
            right: 160px;
            top: 10%;
            transform: translateY(0);
            width: 300px;
            &-header{
                font-size: 16px;
                font-weight: 300;
                text-align: center;
                padding: 30px 0;
            }
            .form-con{
                padding: 10px 0 0;
            }
            .login-tip{
                font-size: 10px;
                text-align: center;
                color: #c3c3c3;
            }
        }
    }

</style>
