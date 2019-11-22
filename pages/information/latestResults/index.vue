<template>
  <center>
    <div style="width: 80%;">
      <el-container>
        <el-header height>
          <Header></Header>
        </el-header>
        <el-main>
          <div class="imagepage">
            <h1>这里是内容展示页面，可以随便修改这里的文章。</h1>
            <h1>最新成果</h1>
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
</style>