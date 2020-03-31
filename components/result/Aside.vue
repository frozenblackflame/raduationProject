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
        { menu: "科研成果" ,path:"/result/research"},
        { menu: "国际标准" ,path:"/result/International"},
        { menu: "高水平文章" ,path:"/result/article"}
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
