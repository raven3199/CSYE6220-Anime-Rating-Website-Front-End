<template>
  <body>
    <el-row>
      <h1>Upload Anime</h1>
    </el-row>
    <el-row>
      <h3 style="color: darkgray;margin-top: 0;">Please enter necessary information</h3>
    </el-row>

    <el-row type="flex" justify="center" style="margin-top: 20px;">
      <el-col :span="18">
        <el-form ref="form" :model="form" label-width="200px" id="upload-form">
          <el-form-item label="Anime name" >
            <el-input v-model="form.anime_name" placeholder="Please enter the name of the anime"></el-input>
          </el-form-item>

          <el-form-item label="Update day">
            <el-radio-group style="width: 100%;" v-model="form.update_day">
              <el-radio-button label=7>Sunday</el-radio-button>
              <el-radio-button label=1>Monday</el-radio-button>
              <el-radio-button label=2>Tuesday</el-radio-button>
              <el-radio-button label=3>Wednesday</el-radio-button>
              <el-radio-button label=4>Thursday</el-radio-button>
              <el-radio-button label=5>Friday</el-radio-button>
              <el-radio-button label=6>Saturday</el-radio-button>
            </el-radio-group>
          </el-form-item>

<!--          <el-form-item label="Picture">-->
<!--            <input type="file" @change="handleFileChange" />-->
<!--          </el-form-item>-->

          <el-form-item label="Picture">
            <el-upload action=''
                       :on-change="getFile"
                       :limit="1"
                       list-type="picture"
                       :auto-upload="false">
              <el-button size="small" type="primary">Please select only one picture</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">Upload</el-button>
            <el-button>Cancel</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

  </body>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          anime_name: '',
          update_day: 7,
          img_type: '',
          img_content: ''
        },
      }
    },
    methods: {
      onSubmit() {
        if(this.form.anime_name.trim() == '') {
          this.$message({
            message: 'Please enter the name of the Anime!',
            type: 'error'
          });
        } else if(this.form.img_content == '') {
          this.$message({
            message: 'Please upload one picture of this Anime!',
            type: 'error'
          });
        } else {
          this.axios.post("http://localhost:2333/anime/add", this.form).then((res) => {
            let data = res.data;
            if (res.status == 200) {
              this.form = {};
              this.$message({
                message: 'Upload Anime Success!',
                type: 'success'
              });
              this.$router.push("/");
            } else {
              this.form = {};
              this.$message({
                message: 'Network error, login failure!',
                type: 'error'
              });
            }
          });
        }
        console.log('submit!');
      },
      getFile(file, fileList) {
        this.getBase64(file.raw).then(res => {
          console.log(res);
          let parts = res.split(';base64,');
          let content = parts[1];
          let imageType = parts[0].split('/')[1];

          this.form.img_type = imageType;
          this.form.img_content = content;
          console.log(this.form);
        });
      },
      getBase64(file) {
        return new Promise(function(resolve, reject) {
          let reader = new FileReader();
          let imgResult = "";
          reader.readAsDataURL(file);
          reader.onload = function() {
            imgResult = reader.result;
          };
          reader.onerror = function(error) {
            reject(error);
          };
          reader.onloadend = function() {
            resolve(imgResult);
          };
        });
      },
      // handleFileChange(event) {
      //   const file = event.target.files[0];
      //   if (file) {
      //     const reader = new FileReader();
      //     reader.onloadend = () => {
      //       console.log(reader.result);
      //       this.downloadFile(reader.result, "2");
      //     };
      //     reader.readAsDataURL(file);
      //   }
      // },
      // downloadFile(code, fileName) {
      //   let parts = code.split(';base64,');
      //   let content = parts[1];
      //   let imageType = parts[0].split('/')[1];
      //   console.log(imageType);
      //
      //   if(content){
      //     let raw = window.atob(content);
      //     let rawLength = raw.length;
      //     let uInt8Array = new Uint8Array(rawLength);
      //     for(let i = 0; i < rawLength; ++i) {
      //       uInt8Array[i] = raw.charCodeAt(i);
      //     }
      //     let blob = new Blob([uInt8Array], {type:'image/'+imageType});
      //
      //     // Save image
      //     let aLink = document.createElement('a');
      //     let evt = document.createEvent("HTMLEvents");
      //     evt.initEvent("click", true, true);
      //     aLink.download = '../assets/' + fileName + '.' + imageType;
      //     aLink.href = URL.createObjectURL(blob);
      //     aLink.click();
      //   } else {
      //     console.log('Without base64 code');
      //   }
      // }
    }
  }
</script>

<style scoped>
#upload-form >>> .el-form-item__label {
  font-size: 20px;
  font-weight: bold;
}
</style>
