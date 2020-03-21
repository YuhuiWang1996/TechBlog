<template>
  <el-card class="box-card">
    <div slot="header" class="card-header clearfix">
      <span>
        <nuxt-link v-bind:to="'/articles/' + title_en">{{ title }}</nuxt-link>
      </span>
      <el-tag
        v-for="(tag, idx) in tags"
        :key="idx"
        class="tags"
        type="success"
        size="small"
        >{{ tag }}</el-tag
      >
    </div>
    <div class="text item">
      {{ brief }}
    </div>
  </el-card>
</template>

<script>
export default {
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
    }
  }
};
</script>

<style>
.box-card {
  margin: 15px 0px;
}
.tags {
  float: right;
  margin-right: 10px;
}
.clearfix:after {
  clear: both;
}
</style>
