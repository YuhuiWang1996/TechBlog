<template>
  <div>
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="18" :lg="16">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="杂记 Stories" name="1">
            <div>
              记录平凡生活中的平凡事
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
        type: "杂记"
      }
    });
    return {
      articles: res.data
    };
  }
};
</script>

<style></style>
