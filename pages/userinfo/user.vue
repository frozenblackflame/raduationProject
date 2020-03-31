<template>
  <center>
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
  import Main from "../../components/userinfo/UserPage"
  export default {
    components: {
      Header,
      Main
    }
  };
</script>
<style>
</style>
