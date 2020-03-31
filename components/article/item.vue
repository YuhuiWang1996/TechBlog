<template>
  <nuxt-link
    class="article-item"
    v-bind:to="'/doc/' + type_en + '/' + title_en"
  >
    <el-card
      class="box-card"
      shadow="always"
      v-bind:class="{ 'fixed-item': rank === 0 }"
    >
      <div slot="header" class="card-header clearfix">
        <span style="color: #303133; font-weight:bold;">
          {{ title }}
        </span>
        <Tag :showType="showType" :tags="tags" :type="type" />
      </div>
      <div class="text item" style="color: #606266;">
        {{ brief }}
      </div>
      <el-row type="flex" justify="end">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-divider content-position="right">{{ updateAt_str }}</el-divider>
        </el-col>
      </el-row>
    </el-card>
  </nuxt-link>
</template>

<script>
import Tag from "./tag";
import moment from "moment";

export default {
  components: {
    Tag
  },
  computed: {
    type_en: function() {
      let self = this;
      if (self.type === "学习笔记") {
        return "study_notes";
      }
      if (self.type === "文章") {
        return "articles";
      }
      if (self.type === "杂记") {
        return "stories";
      }
      if (self.type === "便签") {
        return "notes";
      }
    },
    updateAt_str: function() {
      return moment(this.updateAt).fromNow();
    }
  },
  props: {
    url: {
      type: String,
      default: "loading ... "
    },
    title: {
      type: String,
      default: "loading ... "
    },
    title_en: {
      type: String,
      default: "/"
    },
    brief: {
      type: String,
      default: "loading ... "
    },
    tags: {
      type: Array,
      default: []
    },
    updateAt: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    showType: {
      type: Boolean,
      default: false
    },
    rank: {
      type: Number,
      default: 10
    }
  }
};
</script>

<style>
.article-item .box-card {
  margin: 15px 0px;
}

.article-item .clearfix:after {
  clear: both;
}

.article-item .el-card__header {
  padding: 18px 20px;
}

.article-item .el-divider {
  background-color: #ebeef5;
}

.article-item .el-divider__text {
  color: #909399;
  font-weight: normal;
}

.article-item .el-card__body {
  padding-bottom: 4px;
}

.article-item .fixed-item:before {
  position: absolute;
  content: "";
  border-top: 12px solid rgb(102, 177, 255);
  border-right: 12px solid transparent;
}

.article-item .is-always-shadow {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
}

.article-item .is-always-shadow:hover {
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.14);
}
</style>
