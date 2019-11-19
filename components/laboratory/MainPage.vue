<template>
  <div class="imagepage">
    <h1>这里是内容展示页面，可以随便修改这里的文件。</h1>
    <h3>这里可以展示图片</h3>
    <img :src="image" class="image" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: require("../../static/shiyanshi.png")
    };
  }
};
</script>

<style>
.image {
  width: 500px;
  height: 500px;
}
.imagepage{
  width: 100%;
}
</style>