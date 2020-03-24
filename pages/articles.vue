<template>
  <div>
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="18" :lg="16">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="文章 Articles" name="1">
            <div>
              比学习笔记深入，自己对一些技术的理解
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
    <ArticleList
      :showContentSearch="true"
      :showTagsSearch="true"
      :articles="articles"
      :showSide="false"
    />
  </div>
</template>

<script>
import ArticleList from "@/components/article/list";
export default {
  components: {
    ArticleList
  },
  data() {
    return {
      activeNames: ["1"]
    };
  },
  async asyncData(ctx) {
    const res = await ctx.$axios.get("/api/articles/type", {
      params: {
        type: "文章"
      }
    });
    return {
      articles: res.data
    };
  }
};
</script>

<style></style>
