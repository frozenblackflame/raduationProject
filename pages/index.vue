<template>
  <div id="index">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>

      <el-main>Main</el-main>

      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import Header from "~/components/Header";

export default {
  components: {
    Header
  }
};
</script>

<style>
</style>