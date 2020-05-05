<template>
  <div>

    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="论文标题">
        <el-input v-model="form.name" id="name"></el-input>
      </el-form-item>
      <el-form-item label="发表刊物">
        <el-input type="textarea" :autosize="{ minRows: 20, maxRows: 100}" v-model="form.desc" id="content"></el-input>
      </el-form-item>
      <el-form-item label="文件上传">
        <el-upload
          :multiple="false"
          style=" display: inline-block;"
          :limit="1"
          accept=".pdf"
          action="http://localhost:8080/api/gaoshuiping/upLoad"
          :show-file-list="false"
          :file-list="fileList"
          :on-success="onSuccess"
          :on-error="onError"
          :on-progress="onProgress"
          :on-exceed="onExceed"
        >
          <el-button type="primary" >点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editResults">立即修改</el-button>
        <el-button @click="goBack">取消</el-button>
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
          pdfUrl:"",
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          imageUrl: ''
        },
        fileList: [],
      }
    },
    methods: {
      async getData(){
        let { data } = await axios({
          withCredentials: false,
          method: 'post',
          url: `http://localhost:8080/api/gaoshuiping/getGaoById`,
          data:{
            "id": getQueryString("id")
          }
        })
        this.name = data.extend.results.title
        this.desc = data.extend.results.desc;
        // this.imgUrl = data.extend.results.leaderimg;
        console.log(this.desc)
        document.getElementById("content").value = this.desc
        // document.getElementById("img").value = this.imgUrl
        document.getElementById("name").value = this.name
      },
      async editResults() {
        axios({
          withCredentials: false,
          method: 'post',
          url: `http://localhost:8080/api/gaoshuiping/updateGao`,
          data: {
            "id": getQueryString("id"),
            "title": this.form.name,
            "content": this.form.desc,
            "pdfUrl":this.form.pdfUrl,
            "imgUrl": this.form.imageUrl
          }
        }).then((res) => {
          console.log(res.code)
          this.$router.push("/result/article?id=" + getQueryString("id"))
        })
      },
      onSuccess(response, file, fileList) {
        this.form.pdfUrl = response;
        if (this.form.pdfUrl.endsWith(".pdf")){
          this.$message.success("文件上传成功。");
        }else{
          this.$message.error("请上传以.pdf结尾的文件。");
        }
        this.onUpald();
      },
      onError(err, file, fileList){
        this.$message.error("网络错误，文件上传失败。");
        this.onUpald();
      },
      onProgress(event, file, fileList){
        this.$message("文件上传中，请稍后。");
      },
      onExceed(files, fileList){
        this.$message.warning("文件最多只能上传一个。")
      },
      onUpald(){
        // this.$refs.upload.clearFiles();
        this.fileList=[];
      },
      goBack(){
        this.$router.push("/result/article?id=" + getQueryString("id"))
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
  body{
    background: #062d68 url(http://www.qnlm.ac/common/css/web/v3/../../../img/web/v3/bg_conlong2.jpg?1106) no-repeat center -450px/100%;
  }
</style>
