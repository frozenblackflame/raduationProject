<template>
  <center>
    <div style="width: 80%;">
      <el-container>
        <el-header height>
          <el-page-header @back="goBack" content="科技成果"></el-page-header>
        </el-header>
        <el-main>
          <div>
            <el-table :data="listDate" stripe>
  
              <el-table-column prop="title" width="500px" label="标题" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="time" label="日期" align="center" show-overflow-tooltip></el-table-column>
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
      </el-container>
    </div>
  </center>
</template>

<script>
export default {
  data() {
    return {
      listDate: [{ title: "灵云全智能能力平台系统软件", time: "2019-5-2" ,url:"./"}]
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    toPage(ev){
      this.$router.push(ev.url)
  }
  },
  
};
</script>

<style>
.el-page-header__left .el-icon-back,
.el-page-header__title,
.el-page-header__content {
  font-size: 50px;
}
.el-page-header__content,
.el-page-header__title {
  padding-top: 10px;
}
.el-page-header__left::after {
  height: 50px;
}
</style>