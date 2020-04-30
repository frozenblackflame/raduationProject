<template>
  <div>
    <el-button class="new-button" label="操作" align="center" v-if="showButton"
               :style="{color:'#198ce9','cursor':'pointer'}"
               type="primary" @click="toAddPage"
    >
      <span style="color: black">新增</span></el-button>
    <label style="margin-left: 700px">文章名称：</label><el-input style="width: 15%;" v-model="articlename"></el-input>
    <el-button type="primary" @click="getData">搜索</el-button>
    <el-container>
      <el-table :data="listDate" border stripe style="pxoverflow: auto;max-height: 650px;margin-top: 20px;">
        <el-table-column label="论文标题">
          <template slot-scope="scope">
            <a href="/" target="_blank" class="buttonText">{{scope.row.title}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="论文详情"></el-table-column>
        <el-table-column prop="createTime" label="发表日期" :formatter="dateFormat" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip v-if="showButton">
          <template slot-scope="scope" >
            <div>
              <el-row>
                <el-button  label="操作" align="center" v-if="showButton"
                            :style="{color:'#198ce9','cursor':'pointer'}"
                            type="primary" @click="toPage(scope.row)"
                >
                  <span style="color: black">编辑</span>

                </el-button>

                <el-button style="margin-right: 10px"  type="primary" v-if="showButton"  @click="dialogFormVisible = true"><span style="color: black;">删除</span></el-button>

              </el-row>
            </div>
            <el-dialog title="是否删除" :visible.sync="dialogFormVisible" :append-to-body="true" @closed="handleClose">
              <el-form :model="form" :rules="rules" ref="ruleForm">
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSave(scope.row)">确 定</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </el-container>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="7"
    >
    </el-pagination>
  </div>

</template>
<script>
  import axios from "axios";
  import fecha from "fecha";

  export default {
    data() {
      return {
        id: "",
        showButton: false,
        dialogFormVisible: false,
        articlename:'',
        page:1,
        total:0,
        currentPage1:1,
        fileList:[],

      };
    },
    methods: {

      async getData () {
        var id = getQueryString("id");

        let { data } = await axios({
          withCredentials: false,
          method: 'post',
          url: `http://localhost:8080/api/gaoshuiping/getAllGao`,
          data:{
            "id": id,
            "articlename":this.articlename,
            "page": this.page
          }
        })
        // alert(data.extend.results[0].id)
        this.listDate = data.extend.results.list
        this.total = data.extend.results.total
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
        this.$router.push("/gao/gaoedit?id=" + ev.id)
      },
      dateFormat(row, column, cellValue) {
        return cellValue ? fecha.format(new Date(cellValue), 'YYYY-MM-DD') : '';
      },
      handleClose() {
        this.$refs.ruleForm.resetFields()
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
      handleSave(ev) {
        var id = ev.id;
        let {data} = axios({
          withCredentials: false,
          method: 'post',
          url: `http://localhost:8080/api/gaoshuiping/deleteGao`,
          data: {
            "id": id
          }
        })
        this.$router.go(0)
      },
      toAddPage(){
        this.$router.push("/gao/gaoadd")
      },
      handleCurrentChange(val){
        this.page = val;
        this.getData()
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
  body{
    background: #062d68 url(http://www.qnlm.ac/common/css/web/v3/../../../img/web/v3/bg_conlong2.jpg?1106) no-repeat center -450px/100%;
  }
</style>

