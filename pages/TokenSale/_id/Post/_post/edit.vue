<template>
    <div>
      <h1>공지 수정하기</h1>
      <div class="post_form">
        <el-form>
          <el-form-item label="User" style="margin-bottom: 0.3rem;"><br>
            <el-input v-model="user" class="title-input" :disabled="true" :placeholder="detail.user"></el-input>
          </el-form-item>
          <el-form-item label="Title" style="margin-bottom: 0.3rem;"><br>
            <el-input v-model="title" class="title-input"></el-input>
          </el-form-item>
          <el-form-item label="Content">
            <el-input type="textarea" :rows="6" v-model="content"></el-input>
          </el-form-item>
          <el-button @click="editNotice(id)">Register</el-button>
        </el-form>
      </div>
    </div>
</template>

<script>
  export default {
    name: "edit",
    data () {
      return {
        id: this.$route.params.post,
        detail: '',
        title: '',
        content: '',
        token: ''
      }
    },
    created () {
      this.getThisPost()
    },
    methods: {
      async getThisPost() {
        const getInfo = await this.$axios.$get('/api/posts/get/' + this.id)
        this.detail = getInfo.post
        this.title = this.detail.title
        this.content = this.detail.content
        this.token = this.detail.token
      },
      async editNotice(id) {
        this.$axios.$put('/api/posts/edit/' + id, {title: this.title, content: this.content})
          .then((response) => {
            alert(response.message)
            this.$router.push('/TokenSale/' + this.token + '/Post/' + this.id)
          })
          .catch((response) => {
            alert('오류가 발생했습니다.')
          })
      }
    }
  }
</script>

<style scoped>

</style>
