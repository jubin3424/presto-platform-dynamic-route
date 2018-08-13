<template>
  <div>
    <div class="container">
      <h1 style="text-align: center">TokenRegister</h1>
      <el-form class="token-register-form">
        <el-form-item label="TokenName">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="Type"><br>
          <el-radio v-model="type" label="ICO">ICO</el-radio>
          <el-radio v-model="type" label="DAICO">DAICO</el-radio>
        </el-form-item>
        <div style="text-align: center;">
          <el-button @click="addToken">Register</el-button>
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
        type: '',
        selectedFile: ''
      }
    },
    methods: {
      async addToken() {
        if (confirm('토큰을 추가하시겠습니까?')) {
          await this.$axios.$post('/api/tokens/new',
            {name: this.name, type: this.type})
            .then((response) => {
              console.log(response.message)
              this.$router.push('/tokensale')
            })
            .catch((response) => {
              alert('오류가 발생했습니다')
            })
        }
      },
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
</style>
