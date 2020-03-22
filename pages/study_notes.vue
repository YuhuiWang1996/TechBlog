<template>
  <div>
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="18" :lg="16">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="学习笔记 Study Notes" name="1">
            <div>
              类似教程，又像是cheatsheet，记录学习过程
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="18" :lg="16">
        <ArticleList
          :showContentSearch="true"
          :showTagsSearch="true"
          :articles="articles"
        />
      </el-col>
    </el-row>
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
        type: "学习笔记"
      }
    });
    return {
      articles: res.data
    };
  }
};
</script>

<style></style>
