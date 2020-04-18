<template>
  <div>

    <el-form ref="form" :model="form" label-width="80px">
      <div style="height: 50px"></div>
      <el-form-item label="国际标准">
        <el-input type="textarea" :autosize="{ minRows: 20, maxRows: 100}" v-model="form.desc" id="content"></el-input>
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
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          imageUrl: ''
        }
      }
    },
    methods: {async getData(){
        let { data } = await axios({
          withCredentials: false,
          method: 'post',
          url: `http://localhost:8080/api/standarddesc/getStandardById`,
          data:{
            "id": getQueryString("id")
          }
        })
        // this.name = data.extend.results.standard
        this.desc = data.extend.results.standard;
        // this.imgUrl = data.extend.results.leaderimg;
        console.log(this.desc)
        document.getElementById("content").value = this.desc
        // document.getElementById("img").value = this.imgUrl
        // document.getElementById("name").value = this.name

        console.log(this.name)
      },
      async editResults() {
        console.log(this.form.desc)
        axios({
          withCredentials: false,
          method: 'post',
          url: `http://localhost:8080/api/standarddesc/updateStandard`,
          data: {
            "id": getQueryString("id"),
            "desc": this.form.desc,
          }
        }).then((res) => {
          console.log(res.code)
          this.$router.push("/result/International?id=" + getQueryString("id"))
        })
      },
      goBack(){
        this.$router.push("/result/International?id=" + getQueryString("id"))
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
