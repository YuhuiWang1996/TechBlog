<template>
  <div>
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="18" :lg="16">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="关于我 About me" name="1">
            <div>
              目前纽约大学研一，专业计算机科学
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ["1"]
    };
  }
};
</script>

<style></style>
