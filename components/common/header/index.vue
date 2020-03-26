<template>
  <el-row>
    <el-col :xs="24" :sm="24" :md="8" :lg="8">
      <div class="header-content logo">
        <p>王 宇 辉 <span>Yuhui Wang</span></p>
        <p>前 端 进 阶 之 路</p>
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :md="16" :lg="16">
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
          <el-menu-item index="study_notes">
            <nuxt-link to="/study_notes">学习笔记</nuxt-link>
          </el-menu-item>
          <el-menu-item index="notes">
            <nuxt-link to="/notes">便签</nuxt-link>
          </el-menu-item>
          <el-menu-item index="articles">
            <nuxt-link to="/articles">文章</nuxt-link>
          </el-menu-item>
          <el-menu-item index="stories">
            <nuxt-link to="/stories">杂记</nuxt-link>
          </el-menu-item>
          <el-menu-item index="/contact">
            <nuxt-link to="/contact">互动</nuxt-link>
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
      if (this.$route.path.indexOf("/articles") > -1) {
        return "articles";
      }
      if (this.$route.path.indexOf("/study_notes") > -1) {
        return "study_notes";
      }
      if (this.$route.path.indexOf("/stories") > -1) {
        return "stories";
      }
      if (this.$route.path.indexOf("/notes") > -1) {
        return "notes";
      }
      return this.$route.path;
    }
  }
};
</script>

<style scoped>
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
.el-menu-item > a {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
