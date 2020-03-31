<template>
  <center id="poster">
  <el-form class="login-container" label-position="left" label-width="0px">
    <h3 class="login_title">系统登录</h3>
    <el-form-item>
      <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>

    <el-form-item>
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>

    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" @click="userLogin">登录</el-button>
    </el-form-item>
  </el-form>
  </center>
</template>


<script>
  import axios from "axios"

  export default {
    data() {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        responseResult: []
      }
    },
    methods: {
      async userLogin() {
        axios({
          withCredentials: false,
          method: 'post',
          url: `http://localhost:8080/api/user/login`,
          data: {
            "username": this.loginForm.username,
            "password": this.loginForm.password
          }
        }).then((res) => {
          console.log(res)
          console.log(res.data.code)
          if (res.data.code === 100){
            localStorage.setItem("role",res.data.extend.user.role);
            localStorage.setItem("username",res.data.extend.user.adminname);
            localStorage.setItem("id",res.data.extend.user.id);

            this.$router.push("/")
          }else {
            alert("用户名或者密码错误")
          }

        })
      }
    }
  }
</script>

<style>
  #poster {
    background-image:url("../../static/bimg1.jpg");
    background-repeat: no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
    padding: 0;
  }

  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }


</style>
