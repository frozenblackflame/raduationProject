<template>
  <div>

    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="专利名称">
        <el-input type="textarea" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="专利号">
        <el-input type="textarea" :autosize="{ minRows: 20, maxRows: 100}" v-model="form.details"></el-input>
      </el-form-item>

      <el-form-item label="图片路径">
        <el-input v-model="form.imageUrl"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editResults">立即添加</el-button>
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
         details:'',
          imageUrl: ''
        }
      }
    },
    methods: {
      async editResults() {
        // console.log(this.form.name)
        // console.log(this.form.desc)
        // console.log(this.form.imageUrl)
        axios({
          withCredentials: false,
          method: 'post',
          url: `http://localhost:8080/api/patent/insertPatent`,
          data: {
            "patentName": this.form.name,
            "patentDetails": this.form.details,
            "patentImg": this.form.imageUrl
          }
        }).then((res) => {
          console.log(res.code)
          this.$router.push("/result/research/patent")
        })
      },
      goBack(){
        this.$router.push("/result/research/patent")
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
<style>
  .el-form-item__label{
    color: black;
  }
  body{
    background: #062d68 url(http://www.qnlm.ac/common/css/web/v3/../../../img/web/v3/bg_conlong2.jpg?1106) no-repeat center -450px/100%;
  }
</style>

