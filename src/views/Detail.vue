<template>
  <el-container>
    <Header></Header>

    <el-main>
      <el-row type="flex" justify="center">
        <el-col :span="18" style="text-align: left;">
          <h3>{{anime.anime_name}}</h3>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center" class="main-content">
        <el-col :span="6">
          <img :src="getImageContent()" alt="Image" class="image">
        </el-col>

        <el-col :span="12">
          <el-row class="info-row">
            <i>Anime Name: </i>
            <i class="information">{{anime.anime_name}}</i>
          </el-row>

          <el-row  class="info-row">
            <i>Update Day: </i>
            <i class="information">{{weekday[anime.update_day]}}</i>
          </el-row>

          <el-row  class="info-row">
            <i>Average Score: </i>
            <i class="information">{{score}}</i>
          </el-row>

          <el-row  class="info-row" style="margin-bottom: 40px;">
            <i>Rating Times:</i>
            <i class="information">{{anime.total_times}}</i>
          </el-row>

          <el-row  class="info-row" >
            <i>You will rate how many points?</i>
          </el-row>

          <el-row class="info-row">
            <el-rate v-model="rate_score" :max=10 :colors="rate_colors" @change="makeRate()">
            </el-rate>
          </el-row>
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
  name: 'Detail',
  components: {Header},
  data() {
    return {
      anime: {},
      weekday: {
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
        7: 'Sunday'
      },
      score: 0,
      rate_score: 0,
      rate_colors: {
        5: '#99A9BF',
        9: { value: '#F7BA2A', excluded: true},
        10: '#FF9900'
      },
      operation: {},
      user: {},
      haveRate: false,
      operation_id: null
    }
  },
  created() {
    let param = this.$route.query.param;
    if(param.id != undefined) {
      this.anime = param;
      localStorage.setItem('anime_info', JSON.stringify(this.anime));
    } else {
      this.anime = JSON.parse(localStorage.getItem('anime_info'));
    }

    if(this.anime.total_times!=0) {
      this.score = this.anime.total_credit / this.anime.total_times;
      this.score = this.score.toFixed(1);
    }

    this.user = JSON.parse(localStorage.getItem('user'));
    this.operation.user_id = this.user.user_id;
    this.operation.anime_id = this.anime.id;

    this.axios.post("http://localhost:2333/operation/find", this.operation).then((res) => {
      let data = res.data;
      if(data.exist == "true") {
        this.rate_score = Number(data.rate);
        this.haveRate = true;
        this.operation_id = Number(data.operation_id);
        console.log(this.operation_id);
      }
    })
  },
  methods: {
    getImageContent() {
      return this.anime.img_content;
    },
    makeRate() {
      if(localStorage.getItem('user') == null) {
        this.$message({
          type: 'Warning',
          message: 'Please login first!'
        });
      } else {
        if(this.haveRate == false) {
          this.$confirm('Are you sure to rate this points to this anime?', 'Prompt', {
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            this.operation.user_id = this.user.user_id;
            this.operation.anime_id = this.anime.id;
            this.operation.credit = this.rate_score;

            this.axios.post("http://localhost:2333/operation/rate", this.operation).then((res) => {
              if (res.status == 200) {
                this.$message({
                  type: 'success',
                  message: 'Rating Success!'
                });
                this.operation = {};
                this.$router.push("/");
              } else {
                this.$message({
                  message: 'Network error, login failure!',
                  type: 'error'
                });
                this.operation = {};
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: 'Rating has been canceled'
            });
          });
        } else {
          this.$confirm('You have already made your rating, are you sure to re-rate this anime with new points?', 'Prompt', {
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            this.operation.user_id = this.user.user_id;
            this.operation.anime_id = this.anime.id;
            this.operation.credit = this.rate_score;
            this.operation.id = this.operation_id;

            this.axios.post("http://localhost:2333/operation/update", this.operation).then((res) => {
              if (res.status == 200) {
                this.$message({
                  type: 'success',
                  message: 'Rating Success!'
                });
                this.operation = {};
                this.$router.push("/");
              } else {
                this.$message({
                  message: 'Network error, login failure!',
                  type: 'error'
                });
                this.operation = {};
              }
            })
          })
        }

      }

    }
  },

}
</script>

<style>
#foot-note {
  font-size: 16px;
  color: darkgray;
  line-height: 60px;
}
.el-main {
  padding: 0;
}
.image {
  width: 100%;
  height: auto;
  display: block;
  cursor: pointer;
}
.main-content {
  background: white;
}
.info-row {
  text-align: left;
  margin-left: 100px;
  margin-bottom: 20px;
  font-size: 25px;
}
.el-rate__icon{
  font-size: 35px;
}
.information {
  font-weight: bold;
  font-family: "Times New Roman";
  font-style: normal;
}
</style>
