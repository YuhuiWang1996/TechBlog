<template>
  <div>
    <div
      v-if="showTagsSearch || showContentSearch"
      style="display: block; margin-top:10px;"
    >
      <el-row :gutter="10">
        <el-col v-if="showTagsSearch" :xs="12" :sm="14" :md="16" :lg="16">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
          >
            + 标签筛选
          </el-button>
        </el-col>
        <el-col v-if="showContentSearch" :xs="12" :sm="10" :md="8" :lg="8">
          <el-input
            type="text"
            placeholder="关键词搜索"
            v-model="searchText"
            maxlength="20"
            show-word-limit
          ></el-input>
        </el-col>
      </el-row>
    </div>
    <el-alert
      style="margin-top:20px"
      v-if="curr_articles.length === 0"
      title="暂没符合条件的文章"
      type="info"
      :closable="false"
      center
      show-icon
    >
    </el-alert>
    <div v-else>
      <ArticleItem
        v-for="article in curr_articles"
        :showType="showType"
        :key="article.id"
        :title="article.title"
        :brief="article.brief"
        :title_en="article.title_en"
        :tags="article.tags"
        :type="article.type"
        :updateAt="article.updateAt"
      />
    </div>
  </div>
</template>

<script>
import ArticleItem from "@/components/article/item.vue";
export default {
  data() {
    return {
      searchText: "",
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      curr_articles: this.articles,
      activeNames: []
    };
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    updateArticles(tags, keyword) {
      let self = this;
      self.curr_articles = self.articles.filter(article => {
        if (
          article.title.indexOf(keyword) > -1 ||
          article.brief.indexOf(keyword) > -1
        ) {
          for (let i = 0; i < tags.length; i++) {
            if (!article.tags.includes(tags[i])) return false;
          }
          return true;
        }
        return false;
      });
    }
  },
  watch: {
    dynamicTags(newVal) {
      let self = this;
      self.updateArticles(newVal, self.searchText);
    },
    searchText(newVal) {
      let self = this;
      self.updateArticles(self.dynamicTags, newVal);
    }
  },
  components: {
    ArticleItem
  },
  props: {
    articles: {
      type: Array,
      default: []
    },
    showTagsSearch: {
      type: Boolean,
      default: false
    },
    showType: {
      type: Boolean,
      default: false
    },
    showContentSearch: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
