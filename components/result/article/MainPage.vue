<template>
  <div>
    <el-container>
  <el-table :data="listDate" border stripe>
    <el-table-column prop="title" label="文章标题"></el-table-column>
    <el-table-column prop="desc" label="文章详情"></el-table-column>
    <el-table-column prop="createTime" label="日期" :formatter="dateFormat" align="center" show-overflow-tooltip></el-table-column>
    <el-table-column label="操作" show-overflow-tooltip>
      <template slot-scope="scope" >
        <div>
          <el-button  label="操作" align="center" v-if="showButton"
                     :style="{color:'#198ce9','cursor':'pointer'}"
                     type="primary" @click="toPage(scope.row)"
          ><span style="color: black">编辑</span></el-button>
          <el-button type="primary" v-if="showButton"  @click="dialogFormVisible = true"><span style="color: black">删除</span></el-button>
        </div>
        <el-dialog title="是否删除" :visible.sync="dialogFormVisible"  @closed="handleClose">
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
  <el-button class="new-button" label="操作" align="center" v-if="showButton"
             :style="{color:'#198ce9','cursor':'pointer'}"
             type="primary" @click="toAddPage"
  ><span style="color: black">新增</span></el-button>
  </div>

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
        dialogFormVisible: false,
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
</style>
