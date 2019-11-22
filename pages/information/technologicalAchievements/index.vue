<template>
  <center>
    <div style="width: 80%;">
      <el-container>
        <el-header height>
          <el-page-header @back="goBack" content="详情页面"></el-page-header>
        </el-header>
        <el-main>
          <div class="imagepage">
            <h1>这里是内容展示页面，可以随便修改这里的文章。</h1>
            <h1>科研成果</h1>
            <h3>这里可以展示图片</h3>
            <img :src="image" class="image" />
          </div>
        </el-main>
      </el-container>
    </div>
  </center>
</template>

<script>
export default {
  data() {
    return {
      image: require("../../../static/shiyanshi.png")
    };
  },
  methods: {
    goBack() {
      console.log("go back");
    }
  }
};
</script>

<style>
.image {
  width: 500px;
  height: 500px;
}
.imagepage {
  width: 100%;
}
.el-page-header__left .el-icon-back,
.el-page-header__title,
.el-page-header__content {
  font-size: 50px;
}
.el-page-header__content,.el-page-header__title{
 padding-top: 10px;
}
.el-page-header__left::after {
  height: 50px;
}
</style>