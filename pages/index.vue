<template>
  <div>
    <el-row :gutter="10" type="flex" justify="center">
      <el-col class="hidden-md-and-up">
        <el-card :body-style="{ padding: '10px' }">
          <el-row type="flex" justify="space-around">
            <el-col :xs="4" :sm="4">
              <el-avatar :size="50" src="/img/profile-square.jpg"></el-avatar>
            </el-col>
            <el-col :xs="16" :sm="16">
              <div style="padding: 14px;">
                <div>
                  {{ intro }}
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="16" :lg="14">
        <ArticleList :showType="true" :articles="articles" />
      </el-col>
      <el-col class="hidden-sm-and-down" :md="6" :lg="4">
        <el-card :body-style="{ padding: '0px' }">
          <img
            width="100%"
            src="@/assets/img/profile-square.jpg"
            class="image"
          />
          <div style="padding: 14px;">
            <div>{{ intro }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ArticleItem from "@/components/article/item.vue";
import ArticleList from "@/components/article/list.vue";
export default {
  components: {
    ArticleItem,
    ArticleList
  },
  data() {
    return {
      intro: "欢迎来到我的博客~"
    };
  },
  async asyncData(ctx) {
    const res = await ctx.$axios.get("/api/articles/all");
    return {
      articles: res.data
    };
  }
};
</script>

<style></style>
