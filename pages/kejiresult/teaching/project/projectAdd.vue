<template>
  <div>

    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="主持人">
        <el-input type="textarea" v-model="form.host"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input type="textarea" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="类别">
        <el-input type="textarea" v-model="form.type"></el-input>
      </el-form-item>
      <el-form-item label="起止日期">
        <el-date-picker
          v-model="form.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <!--      <el-form-item label="图片路径">-->
      <!--        <el-input v-model="form.imageUrl"></el-input>-->
      <!--      </el-form-item>-->
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
          host: '',
          delivery: false,
          type: '',
          time:[],
        }
      }
    },
    methods: {
      async editResults() {
        console.log(this.form.time)
        axios({
          withCredentials: false,
          method: 'post',
          url: `http://localhost:8080/api/teachingproject/insertTeachingproject`,
          data: {
            "name": this.form.name,
            "host": this.form.host,
            "time1": this.form.time[0],
            "time2": this.form.time[1],
            "type":this.form.type
          }
        }).then((res) => {
          console.log(res.code)
          this.$router.push("/result/research/teaching/project")
        })
      },
      goBack(){
        this.$router.push("/result/research/teaching/project")
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

