<template>
  <div>
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="18" :lg="16">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="互动 Contact" name="1">
            <div>
              如果你有任何想要讨论的内容，欢迎给我发邮件garywangyh@gmail.com
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="18" :lg="16">
        
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
