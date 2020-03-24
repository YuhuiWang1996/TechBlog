<template>
  <el-row :gutter="10" type="flex" justify="center">
    <el-col
      :xs="24"
      :sm="24"
      :md="fullScreen ? 24 : 14"
      :lg="fullScreen ? 24 : 14"
    >
      <div
        v-if="showTagsSearch || showContentSearch"
        style="display: block; margin-top:10px;"
      >
        <el-row :gutter="10">
          <el-col
            style="line-height: 36px;"
            v-if="showTagsSearch"
            :xs="12"
            :sm="14"
            :md="16"
            :lg="16"
          >
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags_unique"
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
      <el-card
        v-if="showSide"
        class="hidden-md-and-up"
        :body-style="{ padding: '12px 20px' }"
        style="margin-top: 15px;"
        shadow="never"
      >
        <i class="el-icon-s-grid"></i>&nbsp;<strong>分类</strong>&nbsp;&nbsp;
        <el-tag
          v-for="(type, idx) in types"
          :key="idx"
          v-on:click="
            type.tags.every(tag => {
              return dynamicTags.includes(tag);
            })
              ? removeTags(type.tags)
              : dynamicTags.push(...type.tags)
          "
          :type="
            type.tags.every(tag => {
              return dynamicTags.includes(tag);
            })
              ? 'success'
              : 'info'
          "
        >
          {{ type.title }}
        </el-tag>
      </el-card>
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
          :rank="article.rank"
        />
      </div>
    </el-col>
    <el-col
      v-if="showSide"
      class="hidden-sm-and-down"
      :md="4"
      :lg="4"
      style="margin-top:65px; width:250px;"
    >
      <el-card :class="{ 'sidebar-fixed': side_sticky }" style="width: 250px">
        <div slot="header" class="card-header clearfix">
          <i class="el-icon-s-grid"></i>&nbsp;&nbsp;分类
        </div>
        <div
          v-for="(type, idx) in types"
          class="type-container"
          :key="idx"
          v-on:click="
            type.tags.every(tag => {
              return dynamicTags.includes(tag);
            })
              ? removeTags(type.tags)
              : dynamicTags.push(...type.tags)
          "
        >
          <el-tag
            :type="
              type.tags.every(tag => {
                return dynamicTags.includes(tag);
              })
                ? 'success'
                : 'info'
            "
          >
            {{ type.title }}
          </el-tag>
        </div>
      </el-card>
    </el-col>
  </el-row>
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
      activeNames: [],
      curr_articles: this.articles,
      side_sticky: false
    };
  },
  computed: {
    dynamicTags_unique: function() {
      this.dynamicTags = this.uniqueList(this.dynamicTags);
      return this.uniqueList(this.dynamicTags);
    }
  },
  methods: {
    removeTags(tags) {
      for (let tag of tags) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      }
    },

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
        let title = article.title;
        let brief = article.brief;
        if (
          title.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
          brief.toLowerCase().indexOf(keyword.toLowerCase()) > -1
        ) {
          return (
            tags.length == 0 ||
            tags.every(tag => {
              return article.tags.some(atag => {
                return atag.toLowerCase().indexOf(tag.toLowerCase()) > -1;
              });
            })
          );
        }
        return false;
      });
    },
    uniqueList(arr) {
      return Array.from(new Set(arr));
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop >= 298) {
        this.side_sticky = true;
      } else {
        this.side_sticky = false;
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
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
      default: () => []
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
    },
    showSide: {
      type: Boolean,
      default: false
    },
    types: {
      type: Array,
      default: () => []
    },
    fullScreen: {
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
.highlight {
  color: #f56c6c;
}
.clearfix:after {
  clear: both;
}
.card-header {
  font-weight: bold;
}
.type-container {
  margin-top: 10px;
}
.type-container:first-child {
  margin-top: 0;
}
.sidebar-fixed {
  position: fixed;
  top: 10px;
}
</style>
