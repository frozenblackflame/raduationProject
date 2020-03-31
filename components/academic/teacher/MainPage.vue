<template>
  <center>
    <div style="width: 80%;">
      <el-container>
        <el-header height>
          <Header></Header>
        </el-header>
        <el-container>
          <!--          <el-aside width="200px">-->
          <!--            <Aside></Aside>-->
          <!--          </el-aside>-->
          <!--          <el-main>-->
          <!--            <Main></Main>-->
          <!--          </el-main>-->
        </el-container>
      </el-container>
      <el-table :data="listDate" style="padding-left: 0px;margin-top: -20px" stripe>

        <el-table-column prop="teachername" width="200px"  label="教师名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="teacherintroduce" width="200px" label="教师介绍" show-overflow-tooltip>
        </el-table-column>
        <!--        <el-table-column prop="image" label="图片" min-width="20%" >-->
        <!--        </el-table-column>-->
        <el-table-column prop="teacherimg" width="150px" label="照片" show-overflow-tooltip>
          <!-- 图片的显示 -->
          <template   slot-scope="scope">
            <img :src="scope.row.teacherimg"  min-width="70" height="70" />
          </template>
        </el-table-column>

        <!--        <el-table-column  label="操作" show-overflow-tooltip>-->
        <!--        </el-table-column>-->
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope" >
            <el-button class="new-button" label="操作" align="center" v-if="showButton"
                       :style="{color:'#198ce9','cursor':'pointer'}"
                       type="primary" @click="toPage(scope.row)"
            ><span style="color: black">编辑</span></el-button>

            <el-button class="new-button"  label="操作" align="center" v-if="showButton"
                       :style="{color:'#198ce9','cursor':'pointer'}"
                       type="primary" @click="dialogFormVisible = true"
            ><span style="color: black">删除</span></el-button>
            <el-dialog title="是否确认删除" :visible.sync="dialogFormVisible"  @closed="handleClose">
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSave(scope.row)">确 定</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="new-button" label="操作" align="center" v-if="showButton"
                 :style="{color:'#198ce9','cursor':'pointer'}"
                 type="primary" @click="toAddPage()"
      ><span style="color: black">新增</span></el-button>
    </div>
    </div>
  </center>
</template>

<script>
  import axios from "axios";

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
          url: `http://localhost:8080/api/teacher/getAllTeacher`,
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
        this.$router.push('/teacher/teacheredit?id=' + ev.id)
      },
      dateFormat(row, column, cellValue) {
        return cellValue ? fecha.format(new Date(cellValue), 'YYYY-MM-DD') : '';
      },
      toAddPage(ev){
        this.$router.push("/teacher/teacheradd")
      },
      goEdit() {
        this.$router.push('/teacher/teacheredit?id=' + this.id)
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
        var id = ev.id;
        let {data} = axios({
          withCredentials: false,
          method: 'post',
          url: `http://localhost:8080/api/teacher/deleteById`,
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
  .el-aside {
    padding-left: 20px;
  }
  .el-main {
    margin-right: 20px;
    width: 100%;
  }
</style>
