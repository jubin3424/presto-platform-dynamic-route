<template>
  <div>
    <el-button style="margin-right: 1rem;" @click="showQ">문의사항</el-button>
    <el-button @click="showD">세부사항</el-button>
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
      </el-form>
      <div v-if="comments.length > 0">
        <div v-for="(comment, index) in comments" :key=index class="comment">
          <span class="comment_writer">{{ comment.user }}</span>
          <span v-if="comment.answered" class="answered">Answered</span>
          <span v-else class="unanswered">Unanswered</span>
          <span class="comment_date">
            {{ comment.created_at.split('T')[0] }}
            {{ comment.created_at.split('T')[1].slice(0,5) }}<br>
          </span>
          <div class="comment_contents">{{ comment.content }}</div>
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
  </div>
</template>

<script>
  export default {
    name: "index.vue",
    data () {
      return {
        Q: true,
        D: false,
        content: '',
        comments: ''
      }
    },
    created () {
      this.getComments()
    },
    methods: {
      async getComments () {
        const getComments = await this.$axios.$get(`/api/comments/${this.$route.params.id}`)
        this.comments = getComments.comments
      },
      async refreshComments () {
        await this.getComments()
      },
      async addComment () {
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
      },
      showQ () {
        this.Q = true
        this.D = false
      },
      showD () {
        this.Q = false
        this.D = true
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
</style>
