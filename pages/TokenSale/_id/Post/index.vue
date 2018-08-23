<template>
    <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item :title="'공지사항 작성'+'('+$route.params.id+')'" name="1">
          <div class="post_form">
            <el-form>
              <el-form-item label="User" style="margin-bottom: 0.3rem;"><br>
                <el-input v-model="user" class="title-input" placeholder="아이디를 입력해주세요."></el-input>
              </el-form-item>
              <el-form-item label="Title" style="margin-bottom: 0.3rem;"><br>
                <el-input v-model="title" class="title-input" placeholder="제목을 입력해주세요."></el-input>
              </el-form-item>
              <el-form-item label="Content">
                <el-input type="textarea" :rows="6" v-model="postContent" placeholder="내용을 입력해주세요."></el-input>
              </el-form-item>
              <el-button @click="addNotice">Register</el-button>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>

      <div v-if="posts.length > 0">
        <div v-for="(post, index) in posts" :key="index">
          <div class="post">
            <div class="title">
              <span style="cursor: pointer;" @click="seeDetail(post._id)">{{ post.title }}</span>
            </div>

            <span>By </span>
            <span class="written_by">{{ post.user }}</span>
            <span class="post_date">{{ post.created_at | moment2 }}</span>
            <hr style="border-color: ghostwhite; color: ghostwhite; opacity: 0.3; margin-top: 1.2rem;">
          </div>
        </div>
      </div>
      <div v-else>
        <h1>등록된 공지사항이 없습니다.</h1>
      </div>
    </div>
</template>

<script>
  let moment = require('moment')
  export default {
    name: "index",
    data () {
      return {
        posts: '',
        user: '',
        title: '',
        postContent: '',
        activeNames: [],
        token: this.$route.params.id
      }
    },
    created () {
      this.getPosts()
    },
    methods: {
      async refreshPosts () {
        await this.getPosts()
      },
      async getPosts () {
        const getPosts = await this.$axios.$get(`/api/posts/${this.$route.params.id}`)
        this.posts = getPosts.posts
      },
      async addNotice () {
        if (confirm('공지사항을 등록하시겠습니까?')) {
          await this.$axios.$post('/api/posts/new',
            { token: this.token, user: this.user, title: this.title, content: this.postContent})
            .then((response) => {
              console.log(response.message)
              this.user = ""
              this.title = ""
              this.postContent = ""
            })
            .catch((response) => {
              alert('오류가 발생했습니다.')
            })
          await this.refreshPosts()
        }
      },
      seeDetail (id) {
        this.$router.push('/TokenSale/'+this.token+'/'+'Post/'+id)
      }
    },
    filters: {
      moment(date) {
        return moment(date).format('YYYY-MM-DD h:mm:ss a')
      },
      moment2(date) {
        return moment(date).format('MMM DD. YYYY')
      }
    }
  }
</script>

<style scoped>
  .title {
    font-size: 17px;
    margin-bottom: 5px;
    margin-top: 1.5rem;
  }
  .written_by {
    color: #6464f5;
    font-size: 14px;
    font-weight: 600;
    margin-right: 10px;
  }
  .post_date {
    font-size: 14px;
    color: #7f828b;
  }
  /*post form*/
  .post_form {
    width: 70%;
  }
  .title-input {
    width: 70%;
  }
</style>
