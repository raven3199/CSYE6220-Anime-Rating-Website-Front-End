<template>
  <el-container>
    <Header></Header>

    <el-main>
      <el-row type="flex" justify="center">
        <el-col :span="21" style="text-align: left;">
          <h3>Daily Broadcast</h3>
        </el-col>
      </el-row>

      <el-row class="week-row" type="flex" justify="center">
        <el-col id="sun" :span="3">
          <el-button class="week-button" style="background-color: #FF1000">Sunday</el-button>
          <div v-for="(anime, index) in sun_list" :key="index">
            <img :src="getImage(anime)" alt="Image" class="image"  @click="toDetail(anime)">
          </div>
        </el-col>

        <el-col id="mon" :span="3">
          <el-button class="week-button" style="background-color: #FF6602">Monday</el-button>
          <div v-for="(anime, index) in mon_list" :key="index">
            <img :src="getImage(anime)" alt="Image" class="image"  @click="toDetail(anime)">
          </div>
        </el-col>

        <el-col id="tue" :span="3">
          <el-button class="week-button" style="background-color: #FF9D02">Tuesday</el-button>
          <div v-for="(anime, index) in tue_list" :key="index">
            <img :src="getImage(anime)" alt="Image" class="image" @click="toDetail(anime)">
          </div>
        </el-col>
        <el-col id="wed" :span="3">
          <el-button class="week-button" style="background-color: #B1DE09">Wednesday</el-button>
          <div v-for="(anime, index) in wed_list" :key="index">
            <img :src="getImage(anime)" alt="Image" class="image" @click="toDetail(anime)">
          </div>
        </el-col>
        <el-col id="thu" :span="3">
          <el-button class="week-button" style="background-color: #54BB21">Thursday</el-button>
          <div v-for="(anime, index) in thu_list" :key="index">
            <img :src="getImage(anime)" alt="Image" class="image" @click="toDetail(anime)">
          </div>
        </el-col>
        <el-col id="fri" :span="3">
          <el-button class="week-button" style="background-color: #0085C7">Friday</el-button>
          <div v-for="(anime, index) in fri_list" :key="index">
            <img :src="getImage(anime)" alt="Image" class="image" @click="toDetail(anime)">
          </div>
        </el-col>
        <el-col id="sat" :span="3">
          <el-button class="week-button" style="background-color: #0454A6">Saturday</el-button>
          <div v-for="(anime, index) in sat_list" :key="index">
            <img :src="getImage(anime)" alt="Image" class="image" @click="toDetail(anime)">
          </div>
        </el-col>
      </el-row>
    </el-main>

    <el-footer>
      <i id="foot-note"> Designed By Rundong Zhang, As CSYE 6220 Project</i>
    </el-footer>
  </el-container>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  name: 'Home',
  components: {Header},
  data() {
    return {
      mon_list: [],
      tue_list: [],
      wed_list: [],
      thu_list: [],
      fri_list: [],
      sat_list: [],
      sun_list: []
    }
  },
  created() {

  },
  methods: {
    toLogin() {
      this.$router.push({path: '/Login'});
    },
    getImage(anime) {
      return anime.img_content;
    },
    toUpload() {
      this.$router.push({path: '/Upload'});
    },
    toDetail(anime) {
      this.$router.push({
        path: `/Detail`,
        query: {param: anime}
      });

    }
  },
  mounted() {
    this.axios.get("http://localhost:2333/anime/all").then((res) => {
      let data = res.data;
      this.mon_list = data[1];
      this.tue_list = data[2];
      this.wed_list = data[3];
      this.thu_list = data[4];
      this.fri_list = data[5];
      this.sat_list = data[6];
      this.sun_list = data[7];
    });
  }
}
</script>

<style scoped>
.el-header {
  background-color: #FB7299;
  text-align: center;
  line-height: 60px;
}
.el-footer {
  margin-top: 20px;
  margin-bottom: 20px;
}
.header-button {
  background-color: #FB7299;
  border: none;
  color: white;
  font-size: 20px;
  height: 60px;
}
.el-main {
  padding: 0;
}
.week-button {
  width: 100%;
  border-radius: 0;
  font-size: 20px;
  font-weight: bold;
  border: none;
  color: white;
  pointer-events:none;
}
.image {
  aspect-ratio: 0.7077;
  width: 100%;
  height: auto;
  display: block;
  cursor: pointer;
}
#foot-note {
  font-size: 16px;
  color: darkgray;
  line-height: 60px;
}

</style>
