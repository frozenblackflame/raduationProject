<template>
  <center id="poster">
    <el-scrollbar wrap-class="list" view-style="font-weight: bold;" view-class="view-box" :native="false" >
    <el-header height class="heard">
      <Header></Header>
    </el-header>
    <div style="width: 80%;margin-top: 20px;background-color:#F5F5F5">
      <el-scrollbar wrap-class="list" view-style="font-weight: bold;" view-class="view-box" :native="false">
      <el-container>
        <el-header height>
          <el-page-header @back="goBack" content="返回首页"></el-page-header>
          <div>
            <el-button type="primary" icon="el-icon-edit"  v-if="showButton" @click="goEdit"></el-button>
            <el-button type="primary" icon="el-icon-delete"  v-if="showButton"  @click="dialogFormVisible = true"></el-button>
            <!--          <el-button type="primary" icon="el-icon-download"   @click="printOut()"></el-button>-->
          </div>
        </el-header>
        <el-divider></el-divider>
        <el-main id="getPdf">

          <div class="imagepage">
            <div>
              <h1 class="title-style">{{title}}</h1>
            </div>
            <el-divider></el-divider>
            <div>
              <h4 class="content-style">{{content}}</h4>
            </div>
            <div>
              <!--            <h3>{{image}}</h3>-->
              <img :src="image" class="image" />
              <el-divider></el-divider>
              <h4 class="time-style"><span>发表时间：</span>{{createTime}}</h4>
              <div>
                <el-dialog title="是否删除" :visible.sync="dialogFormVisible"  @closed="handleClose" :modal-append-to-body='false'>
                  <el-form :model="form" :rules="rules" ref="ruleForm">
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleSave">确 定</el-button>
                  </div>
                </el-dialog>
              </div>
            </div>
          </div>

        </el-main>

        <el-dialog title="是否确认删除" :visible.sync="dialogFormVisible"  @closed="handleClose">
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleSave">确 定 </el-button>
          </div>
        </el-dialog>
      </el-container>
      </el-scrollbar>
    </div>
    </el-scrollbar>

  </center>
</template>

<script>
  import axios from "axios";
  import html2Canvas from 'html2canvas'
  import JsPDF from 'jspdf'
  import Header from "~/components/Header";

  export default {
    components: {
      Header
    },
    data() {
      return {
        // image: require("../../../static/shiyanshi.png")
        title: "",
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
        var id = getQueryString("id");

        console.log(id)
        let {data} = await axios({
          withCredentials: false,
          method: 'post',
          url: `http://localhost:8080/api/results/getResultByIdSort1`,
          data: {
            "id": id
          }
        })
        // alert(data.extend.results[0].id)
        this.image = data.extend.results[0].resultsImg
        this.title = data.extend.results[0].resultsTitle
        this.content = data.extend.results[0].resultsContent
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
        this.$router.push("/")
      },
      goEdit(){
        this.$router.push('/article/edit?id='+ getQueryString("id"))
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
        var id = getQueryString("id");
        let {data} = axios({
          withCredentials: false,
          method: 'post',
          url: `http://localhost:8080/api/results/deleteResults`,
          data: {
            "id": id
          }
        })
        this.dialogFormVisible = false
        this.$router.push('/information/latestResults/list');
      },
      printOut(name) {
        let shareContent = document.getElementById("getPdf"),//需要截图的包裹的（原生的）DOM 对象
          width = shareContent.clientWidth, //获取dom 宽度
          height = shareContent.clientHeight, //获取dom 高度
          canvas = document.createElement("canvas"), //创建一个canvas节点
          scale = 1; //定义任意放大倍数 支持小数
        canvas.width = width * scale; //定义canvas 宽度 * 缩放
        canvas.height = height * scale; //定义canvas高度 *缩放
        canvas.style.width = shareContent.clientWidth * scale + "px";
        canvas.style.height = shareContent.clientHeight * scale + "px";
        canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
        let opts = {
          scale: scale, // 添加的scale 参数
          canvas: canvas, //自定义 canvas
          logging: false, //日志开关，便于查看html2canvas的内部执行流程
          width: width, //dom 原始宽度
          height: height,
          useCORS: true, // 【重要】开启跨域配置
        };

        html2Canvas(shareContent, opts).then(() => {
          var contentWidth = canvas.width;
          var contentHeight = canvas.height;
          //一页pdf显示html页面生成的canvas高度;
          var pageHeight = (contentWidth / 592.28) * 841.89;
          //未生成pdf的html页面高度
          var leftHeight = contentHeight;
          //页面偏移
          var position = 0;
          //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          var imgWidth = 595.28;
          var imgHeight = (592.28 / contentWidth) * contentHeight;
          var pageData = canvas.toDataURL("image/jpeg", 1.0);
          var PDF = new JsPDF("", "pt", "a4");
          if (leftHeight < pageHeight) {
            PDF.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
          } else {
            while (leftHeight > 0) {
              console.log(pageData)
              PDF.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
              leftHeight -= pageHeight;
              position -= 841.89;
              if (leftHeight > 0) {
                PDF.addPage();
              }
            }
          }
          PDF.save(this.title + ".pdf"); // 这里是导出的文件名
        });
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
    width: 50%;
    height: 30%;
    position: relative;
    top: 30px;
    margin-top: 30px;
    /*padding-bottom: 250px;*/
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
    text-align: left;
    white-space:pre-wrap;
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
    /*position: fixed;*/
  }
  /*.v-modal{*/
  /*  background: none;*/
  /*}*/
  .list {
    max-height: 1000px;
  }
  .heard{
    width: 82%;
  }
</style>
