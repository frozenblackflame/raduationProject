<template>

  <div>
    <!--    <button  @click='login' class="button button-caution">点我</button>-->
<!--    <h1>{{ msg }}</h1>-->
    <el-carousel trigger="hover" type="card">
      <el-carousel-item v-for="item in indexList" :key="item.title">
        <nuxt-link :to="item.url">
          <div class="a"></div>
          <div class="title">{{ item.title }}</div>
          <img :src="item.imgUrl" class="header-img">
        </nuxt-link>
      </el-carousel-item>
    </el-carousel>
    <el-row>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="card_title">新闻资讯</span>
            <nuxt-link to="/information/news/list" style="float: right; padding: 3px 0" type="text">更多>>></nuxt-link>
          </div>
          <div v-for="(o,index) in news" :key="index" class="text item">
            <!-- <a :href="o.url">{{o.text }}</a> -->
            <nuxt-link :to="'/information/news?id=' + o.id">{{ o.newsTitle}}</nuxt-link>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="card_title">公告展示</span>
            <nuxt-link to="/information/announcement/list" style="float: right; padding: 3px 0" type="text">更多>>>
            </nuxt-link>
          </div>
          <div v-for="(o,index) in anno" :key="index" class="text item">
            <nuxt-link :to="'/information/announcement?id=' + o.id">{{ o.annoTitle }}</nuxt-link>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="card_title">最新成果</span>
            <nuxt-link to="/information/latestResults/list" style="float: right; padding: 3px 0" type="text">更多>>></nuxt-link>
          </div>
          <div v-for="(o,index) in results" :key="index" class="text item">
            <nuxt-link :to="'/information/latestResults?id=' + o.id">{{ o.resultsTitle}}</nuxt-link>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="card_title">科技成果</span>
            <nuxt-link to="/information/technologicalAchievements/list" style="float: right; padding: 3px 0" type="text">更多>>></nuxt-link>
          </div>
          <div v-for="(o,index) in results1" :key="index" class="text item">
            <nuxt-link :to="'/information/technologicalAchievements?id='+ o.id">{{ o.resultsTitle}}</nuxt-link>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<script>

  import axios from 'axios'

  export default {
    data(){
      return{
        msg : "Hello world",
        indexList: "",
        results: "",
        results1: "",
        news: "",
        anno: ""
      }
    },
    methods: {
      async getData () {
        let { data } = await axios({
          withCredentials: false,
          method: 'get',
          url: `http://localhost:8080/api/results/index`
        })
        this.msg = data.msg
        this.indexList = data.extend.maps.indexList
        this.results = data.extend.maps.resultList
        this.results1 = data.extend.maps.resultList1
        this.anno = data.extend.maps.anno
        this.news = data.extend.maps.news
      }
    },
    created () {
      this.getData ()
    }
  }
  //
  // export default {
  //   // components: {
  //   //   Main
  //   // },
  //   data(){
  //     return{
  //       result : ''
  //     }
  //   },
  //   methods: {
  //     async login () {
  //       axios({
  //         withCredentials: true,
  //         method: 'post',
  //         url: `http://localhost:8080/api/results/getResults`,
  //       }).then((res) => {
  //         console.log(res.code)
  //         this.$router.push('/show')
  //       })
  //     }
  //   }
  // data() {
  //   return {
  //     images: [
  //       { href: require("../static/bimg1.jpg"), title: "新闻资讯", url: "/information/news/" },
  //       { href: require("../static/bimg2.jpg"), title: "公告展示", url: "/information/announcement/" },
  //       { href: require("../static/bimg3.jpg"), title: "最新成果", url: "/information/latestResults/" },
  //       { href: require("../static/bimg4.jpg"), title: "科技成果", url: "/information/technologicalAchievements/" }
  //     ],
  //     echnology: [
  //       { text: "科技成果1", url: "/information/technologicalAchievements/" },
  //       { text: "科技成果2", url: "/information/technologicalAchievements/" },
  //       { text: "科技成果3", url: "/information/technologicalAchievements/" },
  //       { text: "科技成果4", url: "/information/technologicalAchievements/" }
  //     ],
  //     newest: [
  //       { text: "最新成果1", url: "/information/latestResults/" },
  //       { text: "最新成果2", url: "/information/latestResults/" },
  //       { text: "最新成果3", url: "/information/latestResults/" },
  //       { text: "最新成果4", url: "/information/latestResults/" }
  //     ],
  //     news: [
  //       { text: "新闻资讯1", url: "/information/news/" },
  //       { text: "新闻资讯2", url: "/information/news/" },
  //       { text: "新闻资讯3", url: "/information/news/" },
  //       { text: "新闻资讯4", url: "/information/news/" }
  //     ],
  //     bulletin: [
  //       { text: "公告1", url: "/information/announcement/" },
  //       { text: "公告2", url: "/information/announcement/" },
  //       { text: "公告3", url: "/information/announcement/" },
  //       { text: "公告4", url: "/information/announcement/" }
  //     ]
  //   };
  // },
  // }
  // ;
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
    left: 240px;
    font-size: 20px;
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

  a {
    text-decoration: none;
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

  .el-card__header {
    height: 35px;
    padding-top: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }

  .card_title {
    width: 35%;
  }

  .el-main {
    padding-bottom: 0px;
  }
  .header-img{
    width: 300px;
    height: 300px;
  }
</style>
