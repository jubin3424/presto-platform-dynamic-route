<template>
    <div>
      <div class="post_title">
        <h2>{{ this.detail.title }}</h2>
      </div>
      <div class="post_user">
        by <span style="color: slateblue; font-weight: bolder;">{{ this.detail.user }}</span>
        <span style="color: silver; margin-left: 0.5rem;">{{ this.detail.created_at | moment }}</span>
      </div>
      <div class="post_content">{{ this.detail.content }}
      </div>
      <div style="text-align: right;">
        <el-button type="success" @click="$router.go(-1)">목록보기</el-button>
      </div>
      <div class="comment_part">
        <div style="border-bottom: 1px solid silver; padding-bottom: 3px;">
          댓글 <span style="color: mediumpurple">{{ this.detail.comments && this.detail.comments.length }}</span>
        </div>
        <div class="comment-form">
          <el-form>
            <el-input type="textarea" v-model="textarea" :rows="5" placeholder="댓글을 남겨주세요"></el-input>
            <div style="position: absolute; bottom: 1rem; right: 1rem;">
              <el-button @click="addComments" style="border-radius: 20px;">확인</el-button>
            </div>
          </el-form>
        </div>

        <div v-if="this.detail.comments && this.detail.comments.length > 0">
          <div v-for="(comment, index) in this.detail.comments" :key=index class="comment">
            <span class="comment_writer" style="font-weight: bolder;">{{ comment.commented_by }}</span>
            <span class="comment_date">
            {{ comment.written_at | moment }}<br>
          </span>
            <div class="comment_contents">{{ comment.text }}</div>
            </div>
          </div>
        <div v-else>
          <h4 style="color: palevioletred; margin-bottom: 0;">*Caution*</h4>
          <h2 style="margin-top: 0;">There is no Comment</h2>
          {{ this.detail.comments }}
        </div>

      </div>
    </div>
</template>

<script>
  let moment = require('moment')
  export default {
    name: "_post",
    data () {
      return {
        id: this.$route.params.post,
        detail: '',
        textarea: '',
        comments: ''
      }
    },
    created () {
      this.getDetail()
    },
    methods: {
      moment() {
        return moment()
      },
      async refreshDetail(){
        await this.getDetail()
      },
      async getDetail() {
        const getTokens = await this.$axios.$get('/api/posts/get/' + this.id)
        this.detail = getTokens.post
      },
      async addComment() {
        await this.$axios.$put('/api/posts/comment/' + this.id,
          {text: this.textarea, commented_by: '꼬맹이'})
          .then((response) => {
            alert(response.message)
            this.textarea = ''
          })
          .catch((response) => {
            alert('오류가 발생했습니다')
          })
        await this.refreshDetail()
      },
      async addComments() {
        await this.$axios.$post('/api/posts/comments/' + this.id,
          {text: this.textarea, commented_by: '꼬맹이'})
          .then((response) => {
            alert(response.message)
            this.textarea = ''
          })
          .catch((response) => {
            alert('오류가 발생했습니다')
          })
        await this.refreshDetail()
      }
    },
    filters: {
      moment(date) {
        return moment(date).format('MMM DD. YYYY')
      }
    }
  }
</script>

<style scoped>
  .post_user {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid silver;
  }
  .post_content {
    padding-top: 1rem;
    white-space: pre-wrap;
    word-wrap: break-word;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid silver;
  }
  .comment-form {
    margin-top: 1rem;
    position: relative;
  }
  .comment {
    padding-top: 0.8rem;
    margin-top: 1.1rem;
    border-top: 1px solid #dbe1ec;
  }
  .comment_date {
    font-size: 0.8rem;
    color: darkgray;
    float: right;
  }
  .comment_contents {
    margin-top: 3px;
  }
</style>
