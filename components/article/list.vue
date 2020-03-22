<template>
  <div>
    <div v-if="showTagsSearch" style="display: block; margin-top:10px;">
      <span style="float: right; line-height:32px;">
        <el-tag type="info">标签查询</el-tag>
      </span>
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
      <el-button v-else class="button-new-tag" size="small" @click="showInput">
        + 标签
      </el-button>
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
        :key="article.id"
        :title="article.title"
        :brief="article.brief"
        :title_en="article.title_en"
        :tags="article.tags"
        :type="article.type"
      />
    </div>
  </div>
</template>

<script>
import ArticleItem from "@/components/article/item.vue";
export default {
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      curr_articles: this.articles
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
    }
  },
  watch: {
    dynamicTags(newVal) {
      let self = this;
      console.log(newVal);
      self.curr_articles = self.articles.filter(article => {
        for (let i = 0; i < newVal.length; i++) {
          if (!article.tags.includes(newVal[i])) return false;
        }
        return true;
      });
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
