<template>
  <center>
    <div style="width: 80%;height:100%">
      <el-container>
        <!--        <el-header height>-->
        <!--          <el-page-header @back="goBack" content="详情页面"></el-page-header>-->
        <!--        </el-header>-->
        <!--        <el-divider></el-divider>-->
        <el-main style="width: 80%;height: 800px;background-color: #F5F5F5;">
          <div class="imagepage">
            <h1 class="title-style">科研项目</h1>
            <el-divider></el-divider>
            <h4 class="content-style">{{content}}</h4>
<!--            <h4 class="time-style"><span>发表时间：</span>{{createTime}}</h4>-->
            <!--            <el-divider></el-divider>-->
            <!--            <h3>{{image}}</h3>-->
            <!--            <img :src="image" class="image" />-->
            <!--            <el-divider></el-divider>-->
          </div>

        </el-main>
        <el-button type="primary" icon="el-icon-edit" class="opertion-button1" v-if="showButton" @click="goEdit"></el-button>
      </el-container>
    </div>


  </center>
</template>

<script>
  import axios from "axios";

  export default {
    data() {
      return {
        // image: require("../../../static/shiyanshi.png")
        // title: "",
        id: "",
        content: "",
        image: "",
        createTime: "",
        role: "admin",
        showButton: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
      };
    },
    methods: {
      async getData() {
        // var id = getQueryString("id");
        //
        // console.log(id)
        let {data} = await axios({
          withCredentials: false,
          method: 'post',
          url: `http://localhost:8080/api/teachingproject/getProject`,
          // data: {
          //   "id": id
          // }
        })
        this.content = data.extend.results[0].project
        this.id = data.extend.results[0].id
        // var time1 = data.extend.results[0].createTime;
        // this.createTime = time1.split("T")[0]
        // console.log(this.title)
        if (localStorage.getItem("role") === "admin") {
          this.showButton = true;
        } else {
          this.showButton = false;
        }
      },
      goBack() {
        this.$router.go(-1)
      },
      goEdit() {
        this.$router.push('/kejiresult/project/edit?id=' + this.id)
      }
    },
    created() {
      this.getData()
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
  .image {
    width: 200px;
    height: 200px;
    position: relative;
    top: 30px;
  }
  .opertion-button1{
    width: 60px;
    height: 50px;
    position: relative;
    left: 100px;
    top: 20px;
  }
  .opertion-button2{
    width: 60px;
    height: 50px;
    position: relative;
    left: 170px;
    top: -30px;
  }
  .imagepage {
    width: 100%;
    height: 80%;
    display: block;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .el-page-header__left .el-icon-back,
  .el-page-header__title,
  .el-page-header__content {
    font-size: 20px;
  }
  .title-style{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 40px;
  }
  .content-style{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","宋体",Arial,sans-serif;
    font-size: 15px;
    position: relative;
    top: 20px;
    text-align: left;
    white-space:pre-wrap;
  }
  .time-style{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 15px;
    position: relative;
    top: 200px;
  }
  .el-page-header__content,.el-page-header__title{
    padding-top: 10px;
  }
  .el-page-header__left::after {
    height: 50px;
  }
  body{
    background: #062d68 url(http://www.qnlm.ac/common/css/web/v3/../../../img/web/v3/bg_conlong2.jpg?1106) no-repeat center -450px/100%;
  }
</style>
