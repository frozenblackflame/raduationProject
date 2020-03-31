<template>
  <div>

    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="机构介绍">
        <el-input type="textarea" v-model="form.desc" id="content"></el-input>
      </el-form-item>
<!--      <el-form-item label="图片路径">-->
<!--        <el-input v-model="form.imageUrl"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="editResults"><span style="color: black">立即修改</span></el-button>
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
          url: `http://localhost:8080/api/agencies/getAgenciesById`,
          data:{
            "id": getQueryString("id")
          }
        })
        this.desc = data.extend.results.agenciesIntroduce;
        // this.imgUrl = data.extend.results[0].annoImg;
        console.log(this.desc)
        document.getElementById("content").value = this.desc
        // document.getElementById("img").value = this.imgUrl

        console.log(this.name)
      },
      async editResults() {
        // console.log(this.form.name)
        // console.log(this.form.desc)
        // console.log(this.form.imageUrl)
        axios({
          withCredentials: false,
          method: 'post',
          url: `http://localhost:8080/api/agencies/updateAgencies`,
          data: {
            "id": getQueryString("id"),
            // "title": this.form.name,
            "content": this.form.desc,
            "imgUrl": this.form.imageUrl
          }
        }).then((res) => {
          console.log(res.code)
          this.$router.push("/laboratory/mechanism?id=" + getQueryString("id"))
        })
      },
      goBack(){
        this.$router.push("/laboratory/mechanism?id=" + getQueryString("id"))
      }
    },
    created () {
      this.getData ()
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
