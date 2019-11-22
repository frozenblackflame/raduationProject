<template>
  <center>
    <div style="width: 80%;">
      <el-container>
        <el-header height>
          <Header></Header>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <Aside></Aside>
          </el-aside>
          <el-main>
            <Main></Main>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </center>
</template>

<script>
import Header from "../../components/Header";
import Aside from "../../components/academic/Aside";
import Main from "../../components/academic/teacher/MainPage";
export default {
  components: { Header, Aside, Main }
};
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