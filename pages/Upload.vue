<template>
    <div class="container">
      <div class="upload-form">
        <h1>Upload Image</h1>
        <el-form method="post" enctype="multipart/form-data">
          <input type="hidden" id="data">
          <el-upload
            list-type="picture-card"
            action="http://127.0.0.1:3000/api/upload"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :data="jubin">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl">
          </el-dialog><br>
        </el-form>
      </div>
    </div>
</template>

<script>
  export default {
    name: "Upload",
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        jubin: ['hello']
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 70%;
    margin: auto
  }
  .upload-form {
    width:70%;
    margin: auto;
    margin-bottom: 2rem;
  }
</style>
