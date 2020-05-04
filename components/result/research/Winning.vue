<template>
  <center>
    <div>
      <el-container>
        <el-header height>
          <Header></Header>
        </el-header>
      </el-container>
      <el-button class="new-button" label="操作" align="center" v-if="showButton"
                 :style="{color:'#198ce9','cursor':'pointer'}"
                 type="primary" @click="toAddPage()"
      ><span style="color: black">新增</span></el-button>
      <label style="margin-left: 700px">获奖名称：</label><el-input style="width: 15%;" v-model="WinningName"></el-input>
      <el-button type="primary" @click="getData">搜索</el-button>
      <el-table :data="listDate" style="margin-top: 20px;overflow: auto;max-height: 600px;" stripe>

        <el-table-column prop="winningName"   label="获奖名称"  align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="winningDetails"label="获奖介绍"  align="center">
        </el-table-column>
        <!--        <el-table-column prop="image" label="图片" min-width="20%" >-->
        <!--        </el-table-column>-->
        <el-table-column prop="winningIme" label="照片"   align="center" show-overflow-tooltip>
          <!-- 图片的显示 -->
          <div   slot-scope="scope" style="text-align: center">
            <img :src="scope.row.winningIme"  min-width="100" height="100" />
          </div>
        </el-table-column>

        <!--        <el-table-column  label="操作" show-overflow-tooltip>-->
        <!--        </el-table-column>-->
        <el-table-column label="操作"  align="center" show-overflow-tooltip v-if="showButton">
          <template slot-scope="scope" >
            <el-button class="new-button" label="操作" align="center" v-if="showButton"
                       :style="{color:'#198ce9','cursor':'pointer'}"
                       type="primary" @click="toPage(scope.row)"
            ><span style="color: black">编辑</span></el-button>

            <el-button class="new-button"  label="操作" align="center" v-if="showButton"
                       :style="{color:'#198ce9','cursor':'pointer'}"
                       type="primary"  @click="getId(scope.row.id)"
            ><span style="color: black">删除</span></el-button>
            <el-dialog title="是否确认删除" :visible.sync="dialogFormVisible" :append-to-body="true"  @closed="handleClose">
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSave(scope.row)">确 定</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>

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
  </center>
</template>

<script>
  import axios from "axios";

  export default {
    data() {
      return {
        currentPage1:1,
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
        WinningName:"",
        page: 1,
        total:0,
        delid:''
      };
    },
    methods: {

      async getData () {
        var id = getQueryString("id");

        let { data } = await axios({
          withCredentials: false,
          method: 'post',
          url: `http://localhost:8080/api/researchwinning/getAllWinning`,
          data:{
            "id": id,
            "WinningName": this.WinningName,
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
        this.$router.push('/kejiresult/Winning/WinningEdit?id=' + ev.id)
      },
      dateFormat(row, column, cellValue) {
        return cellValue ? fecha.format(new Date(cellValue), 'YYYY-MM-DD') : '';
      },
      getId(ev){
        this.delid = ev;
        this.dialogFormVisible = true
      },
      toAddPage(ev){
        this.$router.push("/kejiresult/Winning/WinningAdd")
      },
      goEdit() {
        this.$router.push('/kejiresult/Winning/WinningEdit?id=' + this.id)
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
        let {data} = axios({
          withCredentials: false,
          method: 'post',
          url: `http://localhost:8080/api/researchwinning/deleteById`,
          data: {
            "id": this.delid
          }
        })
        this.dialogFormVisible = false
        this.$router.go(0);
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
  .el-aside {
    padding-left: 20px;
  }
  .el-main {
    margin-right: 20px;
    width: 100%;
  }
</style>
