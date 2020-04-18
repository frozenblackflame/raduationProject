<template>
  <div>

    <el-form ref="form" :model="form" label-width="80px" >
      <el-form-item label="文章标题">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="图片路径">
        <el-input v-model="form.imageUrl"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editResults">立即修改</el-button>
        <el-button @click="goback">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import axios from "axios"

  export default {
    // components: {
    //   Main
    // },
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          imageUrl: ''
        }
      }
    },
    methods: {
      async editResults() {
        console.log(this.form.name)
        console.log(this.form.desc)
        console.log(this.form.imageUrl)
        axios({
          withCredentials: false,
          method: 'post',
          url: `http://localhost:8080/api/results/insertResults`,
          data: {
            "sort": getQueryString("sort"),
            "title": this.form.name,
            "content": this.form.desc,
            "imgUrl": this.form.imageUrl
          }
        }).then((res) => {
          console.log(res.code)
          this.$router.push("/information/technologicalAchievements/list");
        })
      },
      goback(){
        this.$router.push("/information/technologicalAchievements/list");
      }
    }
  }
  function getQueryString(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var q = window.location.pathname.substr(1).match(reg_rewrite);
    if(r != null){
      return unescape(r[2]);
    }else if(q != null){
      return unescape(q[2]);
    }else{
      return null;
    }
  }
</script>
