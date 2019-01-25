
<template>
    <div>
        <div class="login">
            <div class="login-con">
                <Card icon="log-in" title="欢迎登录"  :bordered="false">
                    <div class="form-con">
                        <login-form ref="login" @on-success-valid="handleSubmit" :loading="loading"></login-form>
                        <p class="login-tip">输入任意用户名和密码即可</p>
                    </div>
                </Card>
            </div>
        </div>
        <ajax ref="ajax" :loading="false" @error="ajaxError"></ajax>
    </div>
</template>

<script lang="ts">
  import LoginForm from "~/components/login-form/index.vue";
  import Ajax from "~/components/ajax/index.vue";
  import { State, Mutation } from "vuex-class";
  import { Component, Vue } from "nuxt-property-decorator";
  //import  cookie from "js-cookie";
  import  utils from "~/utils/index";

  @Component({
    components: {
      LoginForm,
      Ajax,
    }
  })
  export default class Login extends Vue {

    @State people;
    @Mutation setUserToken;

    scrollToTop = true;
    loading = false;
    ajax : any ;

    layout() {
      return "empty";
    }

    ajaxError(){
      this.loading = false;
    }

    async handleSubmit() {
      this.ajax  = this.$refs.ajax;
      this.loading = true;
      let query : any = this.$route.query ;
      let login :any = this.$refs.login;

      this.loading = true;
      let res : any = await this.ajax.post('/api/account/login',{
        username : login.form.userName ,
        userpwd : login.form.password
      });

      if( res.code == 200 ){
        this.setUserToken(res.data);
        if( query.ref ){
          this.$router.push(query.ref);
        }
        else{
          utils.loadMenu( this,this.$store.commit );
          this.$router.push("/home");
        }
      }
      this.loading = false;

    }

    /* get name (): boolean {
       return this.title + this.text
     }*/
    mounted() {

    }

  }

</script>

<style lang="scss" scoped>


</style>
