<template>
  <center style="height: 100%" id="poster">
    <div style="width: 80%;height:100%;margin-top: 20px;background-color: #F5F5F5">
      <el-container>
        <el-header height>
          <el-page-header @back="goBack" content="返回首页"></el-page-header>
        </el-header>
        <el-divider></el-divider>
        <el-main>
          <div class="imagepage">
            <div>
              <h1 class="title-style">{{title}}</h1>
            </div>

            <el-divider></el-divider>
            <div>
              <h4 class="content-style">{{content}}</h4>
            </div>
            <el-divider></el-divider>
            <!--            <h3>{{image}}</h3>-->
            <img :src="image" class="image" />
            <el-divider></el-divider>
            <h4 class="time-style"><span>发表时间：</span>{{createTime}}</h4>
            <div>
              <el-dialog title="是否确认删除" :visible.sync="dialogFormVisible"  @closed="handleClose" :modal-append-to-body='false'>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="button" @click="handleSave">确 定</el-button>
                </div>
              </el-dialog>
            </div>
          </div>
        </el-main>
        <el-button type="primary" icon="el-icon-edit" class="opertion-button1" v-if="showButton" @click="goEdit"></el-button>
        <el-button type="primary" icon="el-icon-delete" class="opertion-button2" v-if="showButton"  @click="dialogFormVisible = true"></el-button>
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
        title: "",
        content: "",
        image: "",
        createTime: "",
        role: "admin",
        showButton: false,
        dialogFormVisible: false
      };
    },
    methods: {
      async getData() {
        var id = getQueryString("id");

        console.log(id)
        let {data} = await axios({
          withCredentials: false,
          method: 'post',
          url: `http://localhost:8080/api/news/getNewsById`,
          data: {
            "id": id
          }
        })
        // alert(data.extend.results[0].id)
        this.image = data.extend.results[0].newsImg
        this.title = data.extend.results[0].newsTitle
        this.content = data.extend.results[0].newsContent
        var time1 = data.extend.results[0].createTime;
        this.createTime = time1.split("T")[0]
        console.log(this.title)
        if (localStorage.getItem("role") === "admin") {
          this.showButton = true;
        }else {
          this.showButton = false;
        }
      },
      goBack() {
        this.$router.push('/')
      },
      goEdit(){
        this.$router.push('/newsarticle/edit?id='+ getQueryString("id"))
      },
      handleClose () {
        this.form = {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      },
      handleSave(){
        console.log("进入")
        var id = getQueryString("id");
        let {data} = axios({
          withCredentials: false,
          method: 'post',
          url: `http://localhost:8080/api/news/deleteNews`,
          data: {
            "id": id
          }
        })
        this.dialogFormVisible = false
        this.$router.push('/information/news/list');
      },
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
  /*.imagepage {*/
  /*  width: 100%;*/
  /*  display: block;*/
  /*  display: -webkit-box;*/
  /*  -webkit-box-orient: vertical;*/
  /*  -webkit-line-clamp: 2;*/
  /*  overflow: hidden;*/
  /*}*/
  .el-page-header__left .el-icon-back,
  .el-page-header__title,
  .el-page-header__content {
    font-size: 20px;
  }
  .title-style{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 20px;
  }
  .content-style{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 16px;
    position: relative;
    top: 20px;
  }
  .time-style{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 15px;
    position: absolute;
    margin-left: 1200px;
  }
  .el-page-header__content,.el-page-header__title{
    padding-top: 10px;
  }
  .el-page-header__left::after {
    height: 20px;
  }
  html,body,#index{
    height: 100%;
  }
  #poster {
    background-image:url("../../../static/index.jpg");
    background-repeat: no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }

</style>
