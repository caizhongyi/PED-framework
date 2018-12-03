<template>
    <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
        <FormItem prop="userName">
            <i-input v-model="form.userName" size="large" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
            </i-input>
        </FormItem>
        <FormItem prop="password">
            <i-input type="password" size="large" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="16" type="ios-lock"></Icon>
        </span>
            </i-input>
        </FormItem>
        <FormItem>
            <i-row>
                <i-col span="12">
                    <i-checkbox size="large" v-model="remember" label="记住密码">记住密码</i-checkbox>
                </i-col>
                <i-col span="12" class="text-right">
                    <router-link to="/">忘记密码</router-link>
                </i-col>
            </i-row>
        </FormItem>
        <FormItem>
            <Button @click="handleSubmit" :loading="loading" type="primary" size="large" long>登录</Button>
        </FormItem>
    </Form>
</template>
<script>
  import cookie from "js-cookie";

  export default {
    name: "LoginForm",
    props: {
      userNameRules: {
        type: Array,
        default: () => {
          return [
            { required: true, message: "账号不能为空", trigger: "blur" }
          ];
        }
      },
      passwordRules: {
        type: Array,
        default: () => {
          return [
            { required: true, message: "密码不能为空", trigger: "blur" }
          ];
        }
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        remember: false,
        form: {
          userName: "super_admin",
          password: ""
        }
      };
    },
    computed: {
      rules() {
        return {
          userName: this.userNameRules,
          password: this.passwordRules
        };
      }
    },
    mounted() {
      let password = localStorage.getItem("password");
      let rememberPassword = localStorage.getItem("rememberPassword");
      if ( password ) {
        this.form.password = password;
      }
      if ( rememberPassword ) {
        this.remember = Boolean(rememberPassword);
      }
    },
    methods: {

      handleSubmit() {
        this.$refs.loginForm.validate((valid) => {
          localStorage.setItem("rememberPassword", this.remember);

          if (this.remember) {
            localStorage.setItem("password", this.form.password );
          }
          else {
            localStorage.setItem("password", "");
          }

          if (valid) {
            this.$emit("on-success-valid", {
              userName: this.form.userName,
              password: this.form.password
            });
          }
        });
      }
    }
  };
</script>
