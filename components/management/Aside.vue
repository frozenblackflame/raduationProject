<template>
  <div class="menu_left">
    <el-menu
      :default-active="this.$route.path"
      router
      class="el-menu-vertical"
      @select="handleSelect"
      background-color="#20258b"
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
        { menu: "实验室规定" ,path:"/management/Regulation"},
        { menu: "实验室管理员" ,path:"/management/administrator"}
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