<template >
  <center>
    <div id="index" style="width: 80%;">
      <el-container>
        <el-container>
          <el-header height>
            <Header></Header>
          </el-header>
          <el-main height>
            <Main></Main>
          </el-main>
          <el-footer height>
            <!-- Footer content -->
          </el-footer>
        </el-container>
      </el-container>
    </div>
  </center>
</template>

<script>
import Header from "~/components/Header";
import Main from "~/components/main";

export default {
  components: {
    Header,
    Main
  }
};
</script>

<style>
</style>