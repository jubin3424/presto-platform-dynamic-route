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
      <div class="comment">
        <div style="border-bottom: 1px solid silver; padding-bottom: 3px;">
          댓글 <span style="color: mediumpurple">1</span>
        </div>
        <div class="comment-form">
          <el-form>
            <el-input type="textarea" :rows="5" placeholder="댓글을 남겨주세요"></el-input>
            <div style="position: absolute; bottom: 1rem; right: 1rem;">
              <el-button style="border-radius: 20px;">확인</el-button>
            </div>
          </el-form>
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
        textarea: ''
      }
    },
    created () {
      this.getDetail()
    },
    methods: {
      moment() {
        return moment()
      },
      async getDetail() {
        const getTokens = await this.$axios.$get('/api/posts/get/' + this.id)
        this.detail = getTokens.post
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
</style>
