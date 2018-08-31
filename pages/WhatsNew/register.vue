<template>
    <div>
      <h1>공지사항 등록</h1>
      <div class="post_form">
        <el-form>
          <el-form-item label="User" style="margin-bottom: 0.3rem;"><br>
            <el-input v-model="user" class="title-input" placeholder="아이디를 입력해주세요."></el-input>
          </el-form-item>
          <el-form-item label="Title" style="margin-bottom: 0.3rem;"><br>
            <el-input v-model="title" class="title-input" placeholder="제목을 입력해주세요."></el-input>
          </el-form-item>
          <el-form-item label="Content">
            <el-input type="textarea" :rows="6" v-model="content" placeholder="내용을 입력해주세요."></el-input>
          </el-form-item>
          <el-button @click="addNotice">등록</el-button>
          <el-button @click="$router.go(-1)">취소</el-button>
        </el-form>
      </div>
    </div>
</template>

<script>
  export default {
    name: "register",
    data () {
      return {
        user: '',
        title: '',
        content: ''
      }
    },
    methods: {
      async addNotice () {
        if (confirm('공지사항을 등록하시겠습니까?')) {
          await this.$axios.$post('/api/notices/new',
            { user: this.user, title: this.title, content: this.content })
            .then((response) => {
              alert(response.message)
              this.$router.push('/WhatsNew')
            })
            .catch((response) => {
              alert('오류가 발생했습니다.')
            })
        }
      }
    }
  }
</script>

<style scoped>

</style>
