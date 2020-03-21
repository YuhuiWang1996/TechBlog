<template>
  <el-container>
    <el-header style="min-height:80px">
      <my-header />
    </el-header>
    <el-container>
      <el-container>
        <el-main>
          <nuxt />
        </el-main>
        <el-footer>
          <my-footer />
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import MyHeader from "@/components/common/header/index.vue";
import MyFooter from "@/components/common/footer/index.vue";
export default {
  components: {
    MyHeader,
    MyFooter
  }
};
</script>

<style></style>
