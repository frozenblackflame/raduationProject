<template >
  <center id="poster">
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
