<template >
  <center id="poster">
    <el-scrollbar wrap-class="list" view-style="font-weight: bold;" view-class="view-box" :native="false" >
    <div style="width: 80%;">
      <el-container>
        <el-header height>
          <Header></Header>
        </el-header>
        <el-main height>
          <Main></Main>
        </el-main>
      </el-container>
    </div>
    </el-scrollbar>
  </center>
</template>

<script>
import Header from "~/components/Header";
import Main from "../../components/contact/MainPage"
export default {
  components: {
    Header,
    Main
  }
};
</script>

<style>
  #poster {
    background-image:url("/static/index.jpg");
    background-repeat: no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
</style>
