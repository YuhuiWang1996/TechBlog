<template>
  <div>
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="16" :lg="14">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="便签 Notes" name="1">
            <div>
              比学习笔记更零散，一些独立问题的整理和思考
            </div>
            <div>
              或是一些突发奇想，或是一些<em>TODO list</em>，先记下简单的理解，日后转移到学习笔记或文章中
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
      :types="[]"
      :showContentInList="true"
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
        type: "便签"
      }
    });
    return {
      articles: res.data
    };
  }
};
</script>

<style scoped></style>
