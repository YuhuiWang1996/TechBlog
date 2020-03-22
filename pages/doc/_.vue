<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="18" :lg="16">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ article.title }}</span>
            <Tag :tags="article.tags" :type="article.type" />
          </div>
          <Markdown :article_content="article.article_content" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Markdown from "@/components/article/markdown";
import Tag from "@/components/article/tag";

export default {
  data() {
    return {};
  },
  components: {
    Markdown,
    Tag
  },
  async asyncData(ctx) {
    try {
      const paths = ctx.params.pathMatch.split("/");
      const res = await ctx.$axios.get(
        "/api/articles/title_en/" + paths[paths.length - 1]
      );
      res.data.data.article_content = (
        await ctx.$axios.get(res.data.data.doc)
      ).data;
      return {
        article: res.data.data
      };
    } catch (e) {
      ctx.error({ statusCode: 404, message: "Post not found" });
    }
  }
};
</script>

<style></style>
