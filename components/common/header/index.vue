<template>
  <el-row>
    <el-col :span="8">
      <div class="header-content logo">
        <p>王 宇 辉 <span>Yuhui Wang</span></p>
        <p>前 端 进 阶 之 路</p>
      </div>
    </el-col>
    <el-col :span="16">
      <div class="header-content">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
        >
          <el-menu-item index="/">
            <nuxt-link to="/">H O M E</nuxt-link>
          </el-menu-item>
          <el-menu-item index="/about">
            <nuxt-link to="/about">关于我</nuxt-link>
          </el-menu-item>
          <!-- <el-menu-item index="/js">
            <nuxt-link to="/js">JavaScript</nuxt-link>
          </el-menu-item>
          <el-menu-item index="/nodejs">
            <nuxt-link to="/nodejs">NodeJS</nuxt-link>
          </el-menu-item>
          <el-menu-item index="/archives">
            <nuxt-link to="/archives">Archives</nuxt-link>
          </el-menu-item> -->
          <el-menu-item index="articles">
            <nuxt-link to="/articles">文章</nuxt-link>
          </el-menu-item>
        </el-menu>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    activeIndex() {
      if (this.$route.path.indexOf('/articles/') > -1) {
        return 'articles'
      }
      return this.$route.path;
    }
  }
};
</script>

<style>
.header-content {
  height: 100%;
}
.logo {
  text-align: center;
}

.logo > p {
  line-height: 40px;
  margin: 0;
}
.logo > p > span {
  font-size: 18px;
  margin-left: 10px;
  font-weight: lighter;
}
.logo > p:first-child {
  font-size: 24px;
  font-family: "Hiragino Sans GB";
}
.logo > p:nth-child(2) {
  font-size: 18px;
  font-weight: lighter;
}
</style>
