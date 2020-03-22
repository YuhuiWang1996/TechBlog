<template>
  <div class="container">
    <el-row type="flex" justify="center">
      <el-col :span="16" style="text-align:center;">
        <h1 v-if="error.statusCode === 404">
          <el-alert
            title="404 页面无法访问"
            :description="desc"
            :closable="false"
            type="warning"
            center
            show-icon
          >
          </el-alert>
        </h1>
        <h1 v-else>
          <el-alert title="应用发生错误异常" type="error" center show-icon>
          </el-alert>
        </h1>
        <nuxt-link to="/">返 回 首 页</nuxt-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ["error"],
  computed: {
    desc() {
      return (
        "The requested URL " +
        this.$route.path +
        " was not found on this server."
      );
    }
  }
};
</script>
