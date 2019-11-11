<template>
  <div>
    <el-image style="width:100%; height: 200px" :src="imageurl"></el-image>
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      class="el-menu"
      @select="handleSelect"
      background-color="#20258b"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">实验室概况</template>
        <el-menu-item index="2-1">实验室介绍</el-menu-item>
        <el-menu-item index="2-2">实验室领导介绍</el-menu-item>
        <el-menu-item index="2-3">行政机构介绍</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">学术队伍</template>
        <el-menu-item index="3-1">学术带头人</el-menu-item>
        <el-menu-item index="3-2">骨干教师</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">科技成果</template>
        <el-menu-item index="4-1">科研成果</el-menu-item>
        <el-menu-item index="4-2">国际标准</el-menu-item>
        <el-menu-item index="4-3">高水平文章</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">实验室管理</template>
        <el-menu-item index="5-1">实验室规定</el-menu-item>
        <el-menu-item index="5-2">实验室管理员</el-menu-item>
      </el-submenu>
      <el-menu-item index="6">联系我们</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import lhd from "../static/lhd.png";
import bj02 from "../static/bj02.jpg";
export default {
  data() {
    return {
      activeIndex: "1",
      imageurl: lhd,
      url: bj02
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style>
.el-menu {
  margin-top: 1px;

  /* background-repeat: repeat;
  background-image: url("../static/bj02.jpg"); */
}
</style>