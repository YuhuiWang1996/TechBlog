<template>
  <el-card class="box-card">
    <div slot="header" class="card-header clearfix">
      <span>
        <nuxt-link v-bind:to="'/doc/' + type_en + '/' + title_en">{{
          title
        }}</nuxt-link>
      </span>
      <Tag :tags="tags" :type="type" />
    </div>
    <div class="text item">
      {{ brief }}
    </div>
  </el-card>
</template>

<script>
import Tag from "./tag";

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
    type: {
      type: String,
      default: ""
    }
  }
};
</script>

<style>
.box-card {
  margin: 15px 0px;
}

.clearfix:after {
  clear: both;
}
</style>
