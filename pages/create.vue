<template>
  <el-row :gutter="10" type="flex" justify="center">
    <el-col :xs="24" :sm="24" :md="6" :lg="6">
      <el-form
        :model="articleForm"
        :rules="rules"
        ref="articleForm"
        label-width="100px"
      >
        <el-form-item label="提交密码" prop="post_pwd">
          <el-input v-model="articleForm.post_pwd" show-password></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="英文标题" prop="title_en">
          <el-input v-model="articleForm.title_en"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="articleForm.type">
            <el-option label="便签" value="便签"></el-option>
            <el-option label="学习笔记" value="学习笔记"></el-option>
            <el-option label="文章" value="文章"></el-option>
            <el-option label="杂记" value="杂记"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="首页显示" prop="showInHome">
          <el-switch v-model="articleForm.showInHome"></el-switch>
        </el-form-item>
        <el-form-item label="列表显示" prop="showInArticles">
          <el-switch v-model="articleForm.showInArticles"></el-switch>
        </el-form-item>
        <el-form-item label="简介" prop="brief">
          <el-input type="textarea" v-model="articleForm.brief"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-tag
            :key="tag"
            v-for="tag in articleForm.tags"
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
            >+ New Tag</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('articleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('articleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :xs="24" :sm="24" :md="16" :lg="16">
      <div class="article_main">
        <no-ssr>
          <mavon-editor
            ref="md"
            @imgAdd="$imgAdd"
            :subfield="true"
            :toolbars="markdownOption"
            v-model="articleForm.content"
          />
        </no-ssr>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      inputVisible: false,
      inputValue: "",
      articleForm: {
        post_pwd: "",
        title: "",
        title_en: "",
        brief: "",
        type: "",
        tags: [],
        showInHome: false,
        showInArticles: true,
        content: ""
      },
      rules: {
        post_pwd: [
          { required: true, message: "请输入提交密码", trigger: "blur" }
        ],
        title: [{ required: true, message: "请输入中文标题", trigger: "blur" }],
        title_en: [
          { required: true, message: "请输入英文名称", trigger: "blur" }
        ],
        brief: [{ required: true, message: "请输入简介", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "change" }]
      },
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        // readmodel: true, // 沉浸式阅读
        // htmlcode: true, // 展示html源码
        // help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        // save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true // 单双栏模式
        // preview: true // 预览
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios({
            url: "/api/articles/create",
            method: "post",
            data: this.articleForm
          })
            .then(res => {
              if (res.data.code === -1) {
                this.$message.error({
                  showClose: true,
                  message: res.data.msg
                });
                return false;
              } else {
                this.$message({
                  showClose: true,
                  message: "创建成功",
                  type: "success"
                });
                this.resetForm(formName);
              }
            })
            .catch(e => {
              console.log(e);
              return false;
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClose(tag) {
      this.articleForm.tags.splice(this.articleForm.tags.indexOf(tag), 1);
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
        this.articleForm.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },

    $imgAdd(pos, $file) {
      var formdata = new FormData();
      formdata.append("image", $file);
      this.$axios({
        url: "/api/articles/addImg",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        this.$refs.md.$img2Url(pos, res.data.data.filePath);
      });
    }
  }
};
</script>

<style>
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
</style>
