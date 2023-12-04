<template>
  <body id="poster">
    <el-form class="login-container" label-position="left" label-width="0px">
      <h3 class="login-title">
        Login System
      </h3>
      <el-form-item label="">
        <el-input type="text" v-model="loginForm.username" autocomplete="off" placeholder="Account"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="Password"></el-input>
      </el-form-item>
      <el-form-item style="width: 100%;">
        <el-button type="primary" style="width: 100%;background: #505458;border: none;" @click="login()">Login</el-button>
      </el-form-item>
      <el-form-item style="width: 100%;">
        <el-button style="width: 100%;" @click="toRegister">Register</el-button>
      </el-form-item>
    </el-form>
  </body>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      }
    }
  },
  created() {

  },
  methods: {
    login() {
      this.axios.post("http://localhost:2333/user/login", this.loginForm).then((res) => {
        let data = res.data;
        if (res.status == 200) {
          if(data.result =='success') {
            this.$message({
              message: 'Login Success!',
              type: 'success'
            });
            console.log(data);
            this.loginForm.user_id = data.id;
            localStorage.setItem('user', JSON.stringify(this.loginForm));
            this.loginForm = {};
            this.$router.push("/");
          } else if (data.result == 'not exist') {
            this.loginForm = {};
            this.$message({
              message: 'User does not exist, please try again!',
              type: 'error'
            });
          } else if (data.result == 'password incorrect') {
            this.loginForm.password = '';
            this.$message({
              message: 'Password incorrect, please try again!',
              type: 'warning'
            });
          }
        } else {
          this.loginForm = {};
          this.$message({
            message: 'Network error, login failure!',
            type: 'error'
          });
        }
      });
    },
    toRegister() {
      this.$router.push({path: '/Register'});
    }
  }
}
</script>

<style>
  #poster {
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body {
    margin: 0;
    padding: 0;
  }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #EAEAEA;
    box-shadow: 0 0 25px #CAC6C6;
  }
  .login-title {
    margin: 0 auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>
