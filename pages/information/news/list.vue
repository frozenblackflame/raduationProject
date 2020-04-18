<template>
  <center>
    <div style="width: 80%;margin-top: 20px;background-color: #cac6c6">
      <el-container>
        <el-header height>
          <el-page-header @back="goBack" content="新闻列表"></el-page-header>
        </el-header>
        <el-main>
          <label style="margin-left: 700px">新闻标题：</label><el-input style="width: 15%;" v-model="title"></el-input>
          <el-button type="primary" @click="getData">搜索</el-button>
          <div>
            <p>{{id}}</p>
            <el-table :data="listDate" stripe style="margin-top: 20px">

              <el-table-column prop="newsTitle" width="500px" label="标题" show-overflow-tooltip>
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
        <div>
          <el-button  label="操作" align="center" v-if="showButton"
                      :style="{color:'#198ce9','cursor':'pointer',width:'30%'}"
                      type="primary" @click="toAddPage()"
          ><span style="color: black">新增</span></el-button>

          <input style="display:none;" id="up" ref="file" type="file" class="form-control" @change="importFile">
<!--          <el-button type="primary"  v-if="showButton"  align="center" :style="{color:'#198ce9','cursor':'pointer',width:'30%'}" style="margin-top: 20px">-->
<!--            <label for="up">-->
<!--              <span class="importButton" style="color: black">表格导入</span>-->
<!--            </label></el-button>-->
        </div>
      </el-container>
      <el-pagination
        background
        layout="prev, pager, next"
        :total= total
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="7"
      >
      </el-pagination>
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
      showButton: false,
      page:1,
      total:0,
      currentPage1:1,
      title:''
    };
  },
  methods: {

    async getData () {

      let { data } = await axios({
        withCredentials: false,
        method: 'post',
        url: `http://localhost:8080/api/news/getNewsList`,
        data:{
          "title": this.title,
          "page": this.page
        }
      })
      // alert(data.extend.results[0].id)
      this.listDate = data.extend.newList.list
      this.total = data.extend.newList.total
      console.log(this.total)
      if (localStorage.getItem("role") === "admin") {
        this.showButton = true;
      } else {
        this.showButton = false;
      }
    },
    goBack() {
      this.$router.push('/');
    },
    toPage(ev){
      console.log("ev" + ev.id)
      this.$router.push("/information/news?id=" + ev.id)
    },
    toAddPage(ev){
      this.$router.push("/newsarticle/add")
    },
    dateFormat(row, column, cellValue) {
      return cellValue ? fecha.format(new Date(cellValue), 'YYYY-MM-DD') : '';
    },
    handleCurrentChange(val){
      this.page = val
      this.getData()
    },
    importFile(e){
      //声明一个FormDate对象
      let formData = new FormData();
      //把文件信息放入对象中
      let file = e.target.files[0]
      let name = e.target.files[0].name;
      formData.append("file", file,name);
      console.log(file)
      console.log(name)
      axios({
        withCredentials: false,
        method: 'post',
        url: `http://localhost:8080/api/news/addNewsByExcel`,
        data: formData
      }).then(res => {
        document.getElementById('up').value = null;
      if (res.data.code === 100){
        alert("导入成功")
        this.getData()
      }else {
        alert(res.data.msg)
      }
      })


      if (localStorage.getItem("role") === "admin") {
        this.showButton = true;
      }else {
        this.showButton = false;
      }

    },

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
