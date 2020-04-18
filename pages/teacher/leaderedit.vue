<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="教师名称">
        <el-input type="textarea" v-model="form.name" id="name"></el-input>
      </el-form-item>
      <el-form-item label="教师介绍">
        <el-input type="textarea" :autosize="{ minRows: 20, maxRows: 100}" v-model="form.desc" id="content"></el-input>
      </el-form-item>

      <el-form-item label="图片路径">
        <el-input v-model="form.imageUrl" id="img"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editResults">立即修改</el-button>
        <el-button  @click="goBack">取消</el-button>
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
      async getData(){
        let { data } = await axios({
          withCredentials: false,
          method: 'post',
          url: `http://localhost:8080/api/leader/selectLeaderById`,
          data:{
            "id": getQueryString("id")
          }
        })
        this.name = data.extend.results.leadername
        this.desc = data.extend.results.leaderintroduce;
        this.imgUrl = data.extend.results.leaderimg;
        console.log(this.desc)
        document.getElementById("content").value = this.desc
        document.getElementById("img").value = this.imgUrl
        document.getElementById("name").value = this.name

        console.log(this.name)
      },
      async editResults() {
        // console.log(this.form.name)
        // console.log(this.form.desc)
        // console.log(this.form.imageUrl)
        axios({
          withCredentials: false,
          method: 'post',
          url: `http://localhost:8080/api/leader/updateLeader`,
          data: {
            "id": getQueryString("id"),
            "leader_introduce": this.form.desc,
            "leaderName": this.form.name,
            "leaderImg": this.form.imageUrl
          }
        }).then((res) => {
          console.log(res.code)
          this.$router.push("/academic/leader")
        })
      },
      goBack(){
        this.$router.push("/academic/leader")
      }
    },
    created() {
      this.getData();
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
<style>
  .el-form-item__label{
    color: black;
  }
</style>

