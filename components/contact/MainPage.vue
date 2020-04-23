<template>
  <div>
  <el-container>


  <el-table :data="listDate" border stripe>
    <el-table-column prop="teachename" label="教师姓名"></el-table-column>
    <el-table-column prop="telephone" label="联系方式"></el-table-column>
    <el-table-column prop="dept" label="部门"></el-table-column>
    <!--    <el-table-column prop="createTime" label="日期" :formatter="dateFormat" align="center" show-overflow-tooltip></el-table-column>-->
    <el-table-column label="操作" v-if="showButton" show-overflow-tooltip>
      <template slot-scope="scope" >
        <el-button class="new-button" label="操作" align="center" v-if="showButton"
                   :style="{color:'#198ce9','cursor':'pointer'}"
                   type="primary" @click="toPage(scope.row)"
        ><span style="color: black">编辑</span></el-button>

        <el-button class="new-button"  label="操作" align="center" v-if="showButton"
                   :style="{color:'#198ce9','cursor':'pointer'}"
                   type="primary" @click="dialogFormVisible = true"
        ><span style="color: black">删除</span></el-button>
        <el-dialog title="是否确认删除" :visible.sync="dialogFormVisible" :append-to-body="true" @closed="handleClose">
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
               type="primary" @click="toAddPage()"
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
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
      };
    },
    methods: {

      async getData () {
        var id = getQueryString("id");

        let { data } = await axios({
          withCredentials: false,
          method: 'post',
          url: `http://localhost:8080/api/contact/getAllContact`,
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
        this.$router.push("/contact/editcontact?id=" + ev.id)
      },
      toAddPage(ev){
        this.$router.push("/contact/addcontact")
      },
      dateFormat(row, column, cellValue) {
        return cellValue ? fecha.format(new Date(cellValue), 'YYYY-MM-DD') : '';
      },
      handleClose () {
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
        var id = ev.id
        let {data} = axios({
          withCredentials: false,
          method: 'post',
          url: `http://localhost:8080/api/contact/deleteById`,
          data: {
            "id": id
          }
        })
        this.dialogFormVisible = false
        this.$router.go(0);
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
