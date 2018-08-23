<template>
  <div>
    <nuxt/>
  </div>
</template>

<script>
  let moment = require('moment')
  export default {
    name: "index.vue",
    data () {
      return {
        Q: true,
        D: false,
        P: false,
        content: '',
        comments: '',
        posts: '',
        answerArea: '',
        num: '',
        nonActive: 'nonActive',
        textarea: '',
        isShow: false,
        title: '',
        postContent: '',
        token: this.$route.params.id,
        user: '',
        activeNames: [],
      }
    },
    created () {
      this.getComments()
      this.getPosts()
    },
    methods: {
      moment () {
        return moment()
      },
      async getComments () {
        const getComments = await this.$axios.$get(`/api/comments/${this.$route.params.id}`)
        this.comments = getComments.comments
      },
      async refreshComments () {
        await this.getComments()
      },
      async refreshPosts () {
        await this.getPosts()
      },
      async getPosts () {
        const getPosts = await this.$axios.$get(`/api/posts/${this.$route.params.id}`)
        this.posts = getPosts.posts
      },
      async addComment () {
        if (confirm('질문을 등록하시겠습니까?')) {
          await this.$axios.$post('/api/comments/new',
            { user: '너와나의갭', content: this.content, token: this.$route.params.id})
            .then((response) => {
              console.log(response.message)
              this.content = ''
            })
            .catch((response) => {
              alert('오류가 발생했습니다.')
            })
          await this.refreshComments()
          this.$message({
            message: '성공적으로 등록되었습니다.',
            type: 'success'
          })
        }
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
      async deleteComment (id) {
        if (confirm('댓글을 삭제하시겠습니까?')) {
          await this.$axios.$delete('/api/comments/delete/' + id, {id: id})
            .then((response) => {
              alert(response.message)
            })
            .catch((response) => {
              alert(response)
            })
          await this.refreshComments()
          this.$message({
            message: '성공적으로 삭제되었습니다.',
            type: 'error'
          })
        }
      },
      async answerSubmit(comment_id) {
        if (confirm('답변을 등록하시겠습니까?')) {
          await this.$axios.$put('/api/comments/answer/' + comment_id,
            {answered_by: '담당자', content: this.answerArea})
            .then((response) => {
              alert(response.message)
              this.answerArea = ''
            })
            .catch((response) => {
              alert('오류가 발생했습니다')
            })
          await this.refreshComments()
          this.num = ''
        }
      },
      showAnswerForm(index) {
        this.num = index
      },
      showQ (name) {
        this.$router.push(name+'/Question')
        this.Q = true
        this.D = false
        this.P = false
      },
      showD () {
        this.Q = false
        this.D = true
        this.P = false
      },
      showP () {
        this.Q = false
        this.D = false
        this.P = true
      },
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
  .answered {
    font-size: 0.8rem;
    margin-left: 10px;
    color: palevioletred;
    /*background-color: palevioletred;*/
    /*border-radius: 5px;*/
    /*padding: 5px;*/
  }
  .unanswered {
    font-size: 0.8rem;
    margin-left: 10px;
    color: cornflowerblue;
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
  .answerBox {
    background-color: #f5f5f5;
    margin-top: 0.7rem;
    padding: 1rem 1rem 1rem 0.7rem
  }
  .answer_writer {
    font-size: 1.1rem;
    font-weight: bolder;
    color: mediumpurple;
    margin-left: 2px;
  }
  .answer_contents {
    padding-top: 0.2rem;
    padding-left: 1.3rem;
  }
  .nonActive {
    display: none;
  }
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
