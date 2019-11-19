<template>
  <div class="menu_left">
    <el-menu
      default-active="1"
      class="el-menu-vertical"
      @select="handleSelect"
      background-color="#20258b"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item v-for="(menu, index) in menus" :key="index" :index="index">
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
        { menu: "实验室概况" },
        { menu: "实验室介绍" },
        { menu: "实验室领导介绍" },
        { menu: "行政机构介绍" }
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