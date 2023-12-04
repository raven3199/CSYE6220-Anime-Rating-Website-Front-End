<template>
  <el-header>
    <el-row type="flex" justify="center" style="line-height: 60px;">
      <el-col :span="8">
        <el-button plain class="header-button" @click="toUpload">Upload Anime</el-button>
      </el-col>
      <el-col :span="8">
        <h1 style="margin: 0; color: white;">Anime Rating Website</h1>
      </el-col>
      <el-col :span="8">
        <el-button plain v-if="user==null" class="header-button" @click="toLogin">Login</el-button>
        <el-button plain v-if="user!=null" class="header-button" @click="toLogout">Log Out</el-button>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      user: null
    }
  },
  methods: {
    toLogin() {
      this.$router.push({path: '/Login'});
    },
    toUpload() {
      if(this.user == null) {
        this.$message({
          message: 'Please login first!',
          type: 'warning'
        });
      } else {
        this.$router.push({path: '/Upload'});
      }
    },
    toLogout() {
      localStorage.removeItem('user');
      this.user = null;
      this.$message({
        message: 'Log Out Success!',
        type: 'success'
      });
    }
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
  }
}
</script>

<style>
.el-header {
  background-color: #FB7299;
  text-align: center;
  line-height: 60px;
}
.header-button {
  background-color: #FB7299;
  border: none;
  color: white;
  font-size: 20px;
  height: 60px;
}
</style>
