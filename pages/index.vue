<template>
  <el-row :gutter="15" type="flex" justify="center">
    <el-col :span="12">
      <ArticleItem
        v-for="article in articles"
        :key="article.id"
        :title="article.title"
        :brief="article.brief"
        :title_en="article.title_en"
        :tags="article.tags"
      />
    </el-col>
    <el-col :span="4">
      <el-card :body-style="{ padding: '0px' }">
        <img width="100%" src="@/assets/img/profile-square.jpg" class="image" />
        <div style="padding: 14px;">
          <div>
            欢迎来到我的博客~
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import ArticleItem from "@/components/article/item.vue";
export default {
  async asyncData(ctx) {
    const res = await ctx.$axios.get("/api/articles/all");
    return {
      articles: res.data
    };
  },
  components: {
    ArticleItem
  }
};
</script>

<style></style>
