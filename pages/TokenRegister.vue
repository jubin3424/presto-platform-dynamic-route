<template>
  <div>
    <div class="container">
      <h1 style="text-align: center">TokenRegister</h1>
      <el-form class="token-register-form">
        <el-form-item label="TokenName">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="TotalGenerated">
          <el-input v-model="total_amount"></el-input>
        </el-form-item>
        <el-form-item label="Type"><br>
          <el-radio v-model="type" label="ICO">ICO</el-radio>
          <el-radio v-model="type" label="DAICO">DAICO</el-radio>
        </el-form-item>

        <el-upload
          list-type="picture-card"
          action="http://127.0.0.1:3000/api/upload"
          ref="upload"
          :on-preview="handlePictureCardPreview"
          multiple :limit="1"
          :on-remove="handleRemove"
          :auto-upload="false"
          :data="this.namelist">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl">
        </el-dialog><br>

        <div>
          <el-button @click="addToken(getName())">Register</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TokenRegister",
    data() {
      return {
        name: '',
        total_amount: '',
        type: '',
        dialogImageUrl: '',
        dialogVisible: false,
        namelist: []
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      async addToken(name) {
        if (confirm('토큰을 추가하시겠습니까?')) {
          await this.$axios.$post('/api/tokens/new',
            {name: this.name, total_amount: this.total_amount, type: this.type})
            .then((response) => {
              console.log(response.message)
              this.namelist.push(name)
              this.$refs.upload.submit()
              this.$router.push('/TokenSale')
            })
            .catch((response) => {
              alert('오류가 발생했습니다')
            })
        }
      },
      getName() {
        return this.name
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 60%;
    margin: auto;
    margin-bottom: 3rem;
  }
  .token-register-form {
    width: 60%;
    margin: auto;
  }
  @media(max-width: 768px) {
    .container {
      width: 100%;
    }
    .token-register-form {
      width: 90%;
      margin: auto;
    }
  }
</style>
