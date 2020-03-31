<template>
  <div>

    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户账号">
        <el-input v-model="form.name" id="name"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input type="textarea" v-model="form.desc" id="content"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.imageUrl" id="img"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editResults">立即修改</el-button>
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
      async getData(){
        let { data } = await axios({
          withCredentials: false,
          method: 'post',
          url: `http://localhost:8080/api/user/getUserById`,
          data:{
            "id": getQueryString("id")
          }
        })
        this.name = data.extend.user[0].usernum
        this.desc = data.extend.user[0].adminname;
        this.imgUrl = data.extend.user[0].userpassword;
        console.log(this.desc)
        document.getElementById("content").value = this.desc
        document.getElementById("img").value = this.imgUrl
        document.getElementById("name").value = this.name

        console.log(this.name)
      },
      async editResults() {
        console.log(this.form.name)
        console.log(this.form.desc)
        console.log(this.form.imageUrl)
        axios({
          withCredentials: false,
          method: 'post',
          url: `http://localhost:8080/api/user/updateUser`,
          data: {
            "id": getQueryString("id"),
            "usernum": this.form.name,
            "adminname": this.form.desc,
            "userpassword": this.form.imageUrl
          }
        }).then((res) => {
          console.log(res.code)
          this.$router.push("/management/administrator")
        })
      },
      returnButton(){
        this.$router.push("/management/administrator")
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
