<template>
  <div class="article-item">
    <el-collapse class="box-card" @change="handleChange">
      <el-collapse-item name="item">
        <template slot="title">
          {{ title }}
          <span
            class="hidden-xs-only"
            v-if="brief"
            style="color: #909399; margin-left:20px;"
          >
            {{ brief }}
          </span>
          <span style="margin-left:auto;">
            <Tag :showType="showType" :tags="tags" :type="type" />
          </span>
        </template>
        <div>
          <Markdown :article_content="article_content" :toolbarsFlag="false" />
          <el-row type="flex" justify="end">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-divider content-position="right">{{
                updateAt_str
              }}</el-divider>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import Tag from "./tag";
import Markdown from "@/components/article/markdown";
import moment from "moment";

export default {
  data() {
    return {
      article_content: ""
    };
  },
  components: {
    Tag,
    Markdown
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
    },
    updateAt_str: function() {
      return moment(this.updateAt).fromNow();
    }
  },
  methods: {
    async getContent() {
      let self = this;
      try {
        self.article_content = (await self.$axios.get(self.doc)).data;
      } catch (e) {
        ctx.error({ statusCode: 404, message: "Post not found" });
      }
    },
    handleChange(val) {
      if (val[0] === "item") this.getContent();
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
      default: ""
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
    },
    doc: {
      type: String,
      default: ""
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

.article-item .v-note-wrapper {
  min-height: 0;
}

.article-item .el-collapse-item__arrow {
  margin-left: 0;
}

.article-item .el-collapse-item__content {
  padding: 0;
}
</style>
