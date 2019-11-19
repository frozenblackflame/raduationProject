<template>
  <div>
    <el-carousel trigger="hover" type="card">
      <el-carousel-item v-for="item in images" :key="item.title">
        <a :href="item.url">
          <div class="a"></div>
          <div class="title">{{ item.title }}</div>
          <img :src="item.href" />
        </a>
      </el-carousel-item>
    </el-carousel>
    <el-row>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="card_title">新闻资讯</span>
            <el-button style="float: right; padding: 3px 0" type="text">更多>>></el-button>
          </div>
          <div v-for="o in news" :key="o" class="text item">
            <a :href="o.url">{{o.text }}</a>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="card_title">公告展示</span>
            <el-button style="float: right; padding: 3px 0" type="text">更多>>></el-button>
          </div>
          <div v-for="o in bulletin" :key="o" class="text item">
            <a :href="o.url">{{o.text }}</a>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="card_title">最新成果</span>
            <el-button style="float: right; padding: 3px 0" type="text">更多>>></el-button>
          </div>
          <div v-for="o in newest" :key="o" class="text item">
            <a :href="o.url">{{o.text }}</a>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="card_title">科技成果</span>
            <el-button style="float: right; padding: 3px 0" type="text">更多>>></el-button>
          </div>
          <div v-for="o in echnology" :key="o" class="text item">
            <a :href="o.url">{{o.text }}</a>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        { href: require("../static/bimg1.jpg"), title: "新闻资讯", url: "#" },
        { href: require("../static/bimg2.jpg"), title: "公告展示", url: "#" },
        { href: require("../static/bimg3.jpg"), title: "最新成果", url: "#" },
        { href: require("../static/bimg4.jpg"), title: "科技成果", url: "#" }
      ],
      echnology: [
        { text: "科技成果1", url: "#" },
        { text: "科技成果2", url: "#" },
        { text: "科技成果3", url: "#" },
        { text: "科技成果4", url: "#" }
      ],
      newest: [
        { text: "最新成果1", url: "#" },
        { text: "最新成果2", url: "#" },
        { text: "最新成果3", url: "#" },
        { text: "最新成果4", url: "#" }
      ],
      news: [
        { text: "新闻资讯1", url: "#" },
        { text: "新闻资讯2", url: "#" },
        { text: "新闻资讯3", url: "#" },
        { text: "新闻资讯4", url: "#" }
      ],
      bulletin: [
        { text: "公告1", url: "#" },
        { text: "公告2", url: "#" },
        { text: "公告3", url: "#" },
        { text: "公告4", url: "#" }
      ]
    };
  }
};
</script>

<style>
.a1 {
  position: absolute;
  top: 245px;
  left: 5px;
  height: 40px;
  width: 150px;
  opacity: 0.4;
  border: none;
  background-color: black;
  text-align: center;
}
.title {
  position: absolute;
  top: 250px;
  left: 12px;
  font-size: 25px;
  color: white;
  opacity: 0.8;
  border: none;
  background-color: black;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.clearfix {
  width: 100%;
  background-image: url("../static/bj03.gif");
  background-repeat: repeat;
}
.box-card {
  width: 97%;

}
.card_title {
  float: left;
  padding: 3px;
  font-size: 18px;
  color: white;
  background-image: url("../static/bk_04.jpg");
}
.el-row {
  margin-bottom: 20px;
}
.el-card__header{
  height: 35px;
  padding-top: 0px;
  padding-left: 0px;
  padding-right: 0px;
}
.card_title{
  width: 35%;
}
</style>