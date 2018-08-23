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
    </div>
</template>

<script>
  let moment = require('moment')
  export default {
    name: "_post",
    data () {
      return {
        id: this.$route.params.post,
        detail: ''
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
  }
</style>
