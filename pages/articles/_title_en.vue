<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="16">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ title }}</span>
            <el-tag
              v-for="(tag, idx) in tags"
              :key="idx"
              class="tags"
              type="success"
              size="small"
              >{{ tag }}</el-tag
            >
          </div>
          <Markdown :doc="doc" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Markdown from "@/components/article/markdown";

export default {
  data() {
    return {
      title: "",
      tags: [],
      doc: ""
    };
  },
  components: {
    Markdown
  },
  async mounted() {
    let self = this;
    const paths = self.$route.path.split("/");
    const res = await self.$axios.get(
      "/api/articles/title_en/" + paths[paths.length - 1]
    );
    const data = res.data.data;
    self.title = data.title;
    self.tags = data.tags;
    self.doc = data.doc;
  }
};
</script>

<style></style>
