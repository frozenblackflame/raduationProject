<template>
  <div class="menu_left">
    <el-menu
      :default-active="this.$route.path"
      router
      class="el-menu-vertical"
      @select="handleSelect"
      background-color="#8968CD"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item v-for="(menu, index) in menus" :key="index" :index="menu.path">
        <span slot="title">{{menu.menu}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        { menu: "实验室介绍", path: "/laboratory/Introduction" },
        { menu: "实验室领导介绍", path: "/laboratory/leadership" },
        { menu: "行政机构介绍", path: "/laboratory/mechanism" }
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
</style>
