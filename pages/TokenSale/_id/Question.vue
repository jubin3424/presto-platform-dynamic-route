<template>
    <div>
      <h2 style="margin-bottom: 0.5rem;">Ask anything to {{ $route.params.id }} Team</h2>
      <el-form>
        <el-input
          type="textarea"
          :rows="3"
          placeholder="질문을 입력해주세요."
          v-model="content">
        </el-input>
        <el-button @click="addComment" style="float: right; margin-top: 1rem;" class="hidden-xs-only">제출</el-button>
        <el-button @click="addComment" style="float: right; margin-left: 2px; width: 14%;
        padding-top: 29px; padding-bottom: 29px; padding-left: 12px;" class="hidden-sm-and-up">제출</el-button>
      </el-form>
      <div class="below-question">
        <p style="margin-top: 1rem;">* Written questions can not be edited.</p>
        <p>* The questions will be answered directly by the token team.</p>
      </div>
      <div v-if="comments.length > 0">
        <div v-for="(comment, index) in comments" :key=index class="comment">
          <span class="comment_writer" style="font-weight: bolder;">{{ comment.user }}</span>
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
            <div class="answer_contents">{{ comment.answer[0].content }}</div>
          </div>
        </div>
      </div>
      <div v-else>
        <h4 style="color: palevioletred; margin-bottom: 0;">*Caution*</h4>
        <h2 style="margin-top: 0;">There is no Comment</h2>
      </div>
    </div>
</template>

<script>
  let moment = require('moment')
  export default {
    name: "Question",
    data () {
      return {
        content: '',
        comments: '',
        answerArea: '',
        num: '',
        nonActive: 'nonActive',
        textarea: ''
      }
    },
    created () {
      this.getComments()
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
      async addComment () {
        if (confirm('질문을 등록하시겠습니까?')) {
          await this.$axios.$post('/api/comments/new',
            { user: 'shockkyshook', content: this.content, token: this.$route.params.id})
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
    },
    filters: {
      moment(date) {
        return moment(date).format('YYYY-MM-DD h:mm:ss a')
      }
    }
  }
</script>

<style scoped>
  .below-question p {
    margin-top: 0.4rem;
    margin-bottom: 0;
    color: #7f828b;
  }
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
  .comment_contents {
    margin-top: 3px;
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
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  .nonActive {
    display: none;
  }
  @media(min-width: 768px) {
    .el-textarea {
      width: 100%;
    }
  }
  @media(max-width: 768px) {
    .el-textarea {
      width: 85%;
    }
  }
</style>
