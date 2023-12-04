<template>
  <div id="poster">
    <el-form class="register-container" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" label-position="left">
      <h3 class="register-title">
        Register System
      </h3>

      <el-form-item label="" prop="username" >
        <el-input type="text" v-model="ruleForm.username" autocomplete="off" placeholder="Please enter user name" prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="Please enter the password" prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item label="" prop="checkPassword">
        <el-input type="password" v-model="ruleForm.checkPassword" autocomplete="off" placeholder="Please enter the password again" prefix-icon="el-icon-lock"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" style="background: #505458; border: none;" @click="submitForm('ruleForm')">Register</el-button>
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter login name'));
      } else {
        if (this.ruleForm.username !== '') {
          this.$refs.ruleForm.validateField('checkUsername');
        }
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter password'));
      } else {
        if (this.ruleForm.checkPassword !== '') {
          this.$refs.ruleForm.validateField('checkPassword');
        }
        callback();
      }
    };
    var validatePassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter password again'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('Input password different from the former one'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: '',
        password: '',
        checkPassword: '',
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur'},
          { min: 2, max: 12, message: 'The length of login name is 2 ~ 12', trigger: 'blur'}
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' },
          { min: 2, max: 12, message: 'The length of password is 2 ~ 12', trigger: 'blur'}
        ],
        checkPassword: [
          { validator: validatePassword2, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post("http://localhost:2333/user/register", this.ruleForm).then((res) => {
            let data = res.data;
            console.log(res);
            if(res.status == 200) {
              if(data.result == 'success') {
                this.ruleForm = {};
                this.$message({
                  message: 'Register Success!',
                  type: 'success'
                });
                this.$router.push("/Login");
              } else if(data.result == 'already exist') {
                this.ruleForm = {};
                this.$message({
                  message: 'This username has already existed, please try another one!',
                  type: 'warning'
                });
              }
            } else {
              this.ruleForm = {};
              this.$message({
                message: 'Network error, register failure!',
                type: 'error'
              });
            }

          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
    margin: 0;
    padding: 0;
  }
  .register-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #EAEAEA;
    box-shadow: 0 0 25px #CAC6C6;
  }
  .register-title {
    margin: 0 auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>
