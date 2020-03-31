<template>
  <center>
    <div style="width: 80%;margin-top: 20px;background-color: #cac6c6">
      <el-container>
        <el-header height>
          <el-page-header @back="goBack" content="公告列表"></el-page-header>
        </el-header>
        <el-main>
          <div>
            <p>{{id}}</p>
            <el-table :data="listDate" stripe>

              <el-table-column prop="annoTitle" width="500px" label="标题" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="createTime" label="日期" :formatter="dateFormat" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column  label="查看详情" align="center" show-overflow-tooltip>
                <template slot-scope="scope" >
                  <el-button
                    :style="{color:'#198ce9','cursor':'pointer'}"
                    type="text"
                    @click="toPage(scope.row)"
                  >查看详情</el-button>
                </template>
              </el-table-column>

            </el-table>
          </div>
        </el-main>
        <el-button class="new-button" label="操作" align="center" v-if="showButton"
                   :style="{color:'#198ce9','cursor':'pointer'}"
                   type="primary" @click="toAddPage()"
        ><span style="color: black">新增</span></el-button>
      </el-container>
    </div>
  </center>
</template>

<script>
  import axios from "axios";
  import fecha from "fecha";

  export default {
    data() {
      return {
        listDate: [{ title: "习近平总书记前往甘肃考察，为何要来这所学校？", time: "2019-5-2" ,url:"./"}],
        id: "",
        showButton: false
      };
    },
    methods: {

      async getData () {
        var id = getQueryString("id");

        let { data } = await axios({
          withCredentials: false,
          method: 'post',
          url: `http://localhost:8080/api/announcement/getAnnouncementById`,
          data:{
            "id": id
          }
        })
        // alert(data.extend.results[0].id)
        this.listDate = data.extend.results
        if (localStorage.getItem("role") === "admin") {
          this.showButton = true;
        } else {
          this.showButton = false;
        }
      },
      goBack() {
        this.$router.go(-1);
      },
      toPage(ev){
        console.log(ev.id)
        this.$router.push("/information/announcement?id=" + ev.id)
      },
      toAddPage(ev){
        this.$router.push("/annoariticle/add")
      },
      dateFormat(row, column, cellValue) {
        return cellValue ? fecha.format(new Date(cellValue), 'YYYY-MM-DD') : '';
      }

    },
    created () {
      this.getData ()
    }
  };
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
  .el-page-header__left .el-icon-back,
  .el-page-header__title,
  .el-page-header__content{
    font-size: 20px;
  }
  .el-page-header__title {
    padding-top: -10px;
  }
  .el-page-header__left::after {
    height: 20px;
  }
</style>
