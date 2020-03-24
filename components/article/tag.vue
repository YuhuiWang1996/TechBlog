<template>
  <div class="tag_container" style="line-height: 28px;">
    <el-tag
      v-for="(tag, idx) in tags"
      :key="idx"
      class="tags"
      type="success"
      size="small"
      >{{ tag }}</el-tag
    >
    <span v-if="showType">
      <el-tag v-if="type == '学习笔记'" class="tags" type="info" size="small">
        <i class="el-icon-edit"></i>&nbsp;学习笔记
      </el-tag>
      <el-tag v-else-if="type == '文章'" class="tags" size="small">
        <i class="el-icon-document"></i>&nbsp;文章
      </el-tag>
      <el-tag
        v-else-if="type == '杂记'"
        type="warning"
        class="tags"
        size="small"
      >
        <i class="el-icon-news"></i>
        杂记
      </el-tag>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      default: []
    },
    type: {
      type: String,
      default: ""
    },
    showType: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style>
/* 标签响应式布局 */
.tag_container {
  display: block;
  margin-top: 10px;
}

@media screen and (min-width: 768px) {
  .tag_container {
    margin-top: 0;
    float: right;
  }
}
.tags {
  margin-right: 10px;
  vertical-align: top;
}
</style>
