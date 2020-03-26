<template>
  <div>
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="18" :lg="16">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="学习笔记 Study Notes" name="1">
            <div>
              学习过程中的整理与总结，理解而不是搬运。
            </div>
            <div>
              类似教程，又像是cheatsheet。
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
    <ArticleList
      :showContentSearch="true"
      :showTagsSearch="true"
      :articles="articles"
      :showSide="true"
      :types="[
        { title: 'JavaScript', tags: ['JS'] },
        { title: 'JS设计模式', tags: ['JS', '设计模式'] },
        { title: '网络相关', tags: ['HTTP'] },
        { title: 'Web前端性能优化', tags: ['前端性能优化'] }
      ]"
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
        type: "学习笔记"
      }
    });
    return {
      articles: res.data
    };
  }
};
</script>

<style scoped></style>
