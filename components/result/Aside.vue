<template>
  <div class="menu_left">
<el-scrollbar>
    <el-menu
      :default-active="this.$route.path"
      router
      class="el-menu-vertical"
      @select="handleSelect"
      background-color="#8968CD"
      text-color="#fff"
      style="border-right: 0;"
      active-text-color="#ffd04b"
    >
        <el-submenu index="1">
        <template slot="title">科研成果</template>
          <el-menu-item index="*">科研项目</el-menu-item>
          <el-menu-item index="*">科研获奖</el-menu-item>
          <el-menu-item index="*">发明专利</el-menu-item>
          <el-submenu index="1-1">
            <template slot="title">科研反哺教学</template>
            <el-menu-item index="*">教改项目</el-menu-item>
            <el-menu-item index="*">竞赛获奖</el-menu-item>
            <el-menu-item index="*">教改论文</el-menu-item>
          </el-submenu>
        </el-submenu>
      <el-menu-item v-for="(menu, index) in menus" :key="index" :index="menu.path">
        <span slot="title">{{menu.menu}}</span>
      </el-menu-item>
    </el-menu>
</el-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        { menu: "国际标准" ,path:"/result/International"},
        { menu: "科研论文" ,path:"/result/article"}
      ]
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  select() {}
};
</script>

<style>
  .menu{
    padding-left: 0px;
  }
  .el-menu-item{
    padding-left: 20px;
  }
</style>
