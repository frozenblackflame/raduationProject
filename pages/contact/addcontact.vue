<template>
  <div>

    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="部门">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="办公地点">
        <el-input v-model="form.imageUrl"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editResults">立即添加</el-button>
        <el-button @click="returnButton">取消</el-button>
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
          url: `http://localhost:8080/api/contact/addContact`,
          data: {
            "name": this.form.name,
            "telephone": this.form.desc,
            "dept": this.form.imageUrl
          }
        }).then((res) => {
          console.log(res.code)
          this.$router.push("/contact/contact")
        })
      },
      returnButton(){
        this.$router.push("/contact/contact")
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
