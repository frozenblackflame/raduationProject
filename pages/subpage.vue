<template>
  <center>
    <div style="width: 80%;">
      <el-container>
        <el-header height>
          <Header></Header>
        </el-header>
        <el-container >
          <el-aside >
            <Aside></Aside>
          </el-aside>
          <el-container>
            <el-main height >
            
            </el-main>
          </el-container>
        </el-container>
      </el-container>
    </div>
  </center>
</template>

<script>
import Header from "~/components/Header";
import Aside from "../components/laboratory/Aside";
export default {
  components: { Header, Aside }
};
</script>

<style>
.el-aside{
    padding-left: 20px;
}
.el-main{
margin-right: 20px;
}
</style>