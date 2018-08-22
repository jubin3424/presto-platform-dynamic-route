<template>
  <div>
    <el-button style="margin-right: 1rem;" @click="showQ(token)">문의사항</el-button>
    <el-button style="margin-right: 1rem;" @click="showD">세부사항</el-button>
    <el-button @click="showP">공지사항</el-button>
    <nuxt/>
    <div v-if="Q">
      <h1>{{ $route.params.id }} Question</h1>
      <el-form>
        <el-input
          type="textarea"
          :rows="3"
          placeholder="질문을 입력해주세요."
          v-model="content"
          style="width: 85%;">
        </el-input>
        <el-button @click="addComment" style="float: right; margin-top: 1rem;" class="hidden-xs-only">제출</el-button>
        <el-button @click="addComment" style="float: right; margin-left: 2px; width: 14%;
        padding-top: 29px; padding-bottom: 29px; padding-left: 12px;" class="hidden-sm-and-up">제출</el-button>
      </el-form>
      <div v-if="comments.length > 0">
        <div v-for="(comment, index) in comments" :key=index class="comment">
          <span class="comment_writer">{{ comment.user }}</span>
          <span v-if="comment.answer[0] && comment.answer[0].content" class="answered">Answered</span>
          <span v-else class="unanswered">Unanswered</span>
          <span class="comment_date">
            {{ comment.created_at | moment }}<br>
          </span>
          <div class="comment_contents">{{ comment.content }}</div>
          <div style="text-align: right; margin-bottom: 5px;">
            <span @click="deleteComment(comment._id)">
                <i class="fas fa-trash-alt" style="cursor: pointer;"></i>
              </span>
            <span @click="showAnswerForm(index)">
                  <i class="fab fa-replyd"></i>
                </span>
          </div>
          <div v-bind:class="[{ activeReply: num === index }, { nonActive: num !== index }]">
            <div class="answer-part">
              <el-form>
                <el-input
                  type="textarea"
                  :rows="2"
                  :placeholder="comment.user+'님에게 답변을 해주세요.'"
                  v-model="answerArea" style="width: 80%;"></el-input>
                <el-button @click="answerSubmit(comment._id)" style="width: 19%; float: right; padding: 20px 13px 18px 13px;">등록</el-button>
              </el-form>
            </div>
          </div>
          <div v-if="comment.answer[0] && comment.answer[0].content" class="answerBox">
            ㄴ
            <span class="answer_writer">{{ comment.answer[0].answered_by }}</span>
            <span class="comment_date">
                {{ comment.answer[0].answered_written_at | moment }}</span><br>
            <div class="answer_contents">
              <pre>{{ comment.answer[0].content }}</pre></div>
          </div>
        </div>
    </div>
      <div v-else>
        <h4 style="color: palevioletred; margin-bottom: 0;">*Caution*</h4>
        <h2 style="margin-top: 0;">There is no Comment</h2>
      </div>
    </div>
    <div v-if="D">
      <h1>{{ $route.params.id }} Detail</h1>
    </div>
    <div v-if="P">
      <h1 style="display: inline-block;">{{ $route.params.id }} Notice</h1>&nbsp;&nbsp;&nbsp;
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
            <div class="title" style="cursor: pointer;">
              {{ post.title }}
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
