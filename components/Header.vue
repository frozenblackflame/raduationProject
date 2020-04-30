<template>
  <div>
    <el-image style="width:100%; height: 120px" :src="imageurl"></el-image>
    <el-menu
      :default-active="this.$route.path"
      router
      mode="horizontal"
      class="el-menu"
      @select="handleSelect"
      background-color="#8968CD"
      text-color="#fff"
      style="border-right: 0;"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">实验室概况</template>
        <el-menu-item index="/laboratory/Introduction">实验室介绍</el-menu-item>
        <el-menu-item index="/laboratory/leadership">实验室领导介绍</el-menu-item>
        <el-menu-item index="/laboratory/mechanism">行政机构介绍</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">学术队伍</template>
        <el-menu-item index="/academic/leader">学术带头人</el-menu-item>
        <el-menu-item index="/academic/teacher">骨干教师</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">科技成果</template>
        <el-submenu index="4-1">
        <template slot="title">科研成果</template>
          <el-menu-item index="*">科研项目</el-menu-item>
          <el-menu-item index="*">科研获奖</el-menu-item>
          <el-menu-item index="*">发明专利</el-menu-item>
          <el-submenu index="4-1-1">
            <template slot="title">科研反哺教学</template>
            <el-menu-item index="*">教改项目</el-menu-item>
            <el-menu-item index="*">竞赛获奖</el-menu-item>
            <el-menu-item index="*">教改论文</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="/result/International">国际标准</el-menu-item>
        <el-menu-item index="/result/article">科研论文</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">实验室管理</template>
        <el-menu-item index="/management/Regulation">实验室规定</el-menu-item>
        <el-menu-item index="/management/administrator">实验室管理员</el-menu-item>
      </el-submenu>
      <el-menu-item index="/contact/contact">联系我们</el-menu-item>
      <el-menu-item index="/userlogin/login" v-if="showButton">登录</el-menu-item>
      <el-menu-item index="/userinfo/user" v-if="userButton">用户信息</el-menu-item>
      <el-menu-item  v-if="userButton" @click="loginout">退出登录</el-menu-item>
      <el-menu-item style="position: absolute;top: 0px;left: 1200px"><span>{{headmsg}}</span></el-menu-item>
<!--      <nuxt-link to="">退出登录</nuxt-link>-->
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
      url: bj02,
      showButton: true,
      userButton: false,
      headmsg:"登录状态：未登录"
    }
  },
  methods: {
    async show(){
      console.log(localStorage.getItem("role"));
      if (localStorage.getItem("role")!= null){
        this.showButton = false;
        this.userButton = true;
        this.headmsg = "欢迎您！"  + localStorage.getItem("username")
      }else {
        this.showButton=true;
        this.userButton = false;
      }
    },
    handleSelect(key, keyPath) {
      if (localStorage.getItem("role")!= null){
        this.button = false;
      }else {
        this.button=true;
      }
      console.log(key, keyPath);
    },
    loginout(){
      localStorage.clear();
      // alert("清空缓存")
      this.$router.push("/userlogin/login")
    }
  },
  created() {
    this.show()
  }
};
</script>
<style>
  .el-menu-item,.el-submenu__title{
    font-size: 16px;
  }
</style>
