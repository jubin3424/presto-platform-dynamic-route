<template>
  <div>
    <div class="post_title">
      <h2>{{ this.detail.title }}</h2>
    </div>
    <div class="post_user">
      by <span style="color: slateblue; font-weight: bolder;">{{ this.detail.user }}</span>
      <span style="color: silver; margin-left: 0.5rem;">{{ this.detail.created_at | moment }}</span>
      <div style="text-align: right">
        <el-button type="text" @click="deletePost(id, detail.token)">삭제</el-button>
        <el-button type="text" @click="editPost(id)">수정</el-button>
      </div>
    </div>
    <div class="post_content">{{ this.detail.content }}
    </div>
    <div style="text-align: right;">
      <el-button type="success" @click="goToList(detail.token)">목록보기</el-button>
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
        <div style="margin-top: 0.6rem">&nbsp;</div>
        <div v-for="(comment, index) in this.detail.comments" :key="index" class="comment">
          <span class="comment_writer" style="font-weight: bolder;">{{ comment.commented_by }}</span>
          <span class="comment_date">
            {{ comment.written_at | moment }}<br>
          </span>
          <div class="comment_contents">{{ comment.text }}</div>

          <span style="border-radius: 10px; border: 1px solid black;
                        font-size: 0.7rem; padding: 5px; margin-top: 1rem;
                        margin-bottom: 1rem; cursor: pointer;" @click="showForm(index)">Reply</span>

          <div style="text-align: right"><i @click="deleteComment(comment._id, id)" class="el-icon-delete"></i></div>

          <!--아래는 v-if로 댓글을 쓴 사람이 아닐 경우 휴지통 아이콘이 안보이므로, 그만큼 위아래 간격을 준다-->
          <!--<div style="height: 10px;"></div>-->

          <div v-bind:class="[{ activeReply: num === index }, { nonActive: num !== index }]">
            <div class="answer-part">
              <el-form>
                <el-input
                  type="textarea"
                  :rows="2"
                  :placeholder="comment.commented_by+'님에게 답변을 해주세요.'"
                  v-model="reply" style="width: 80%;"></el-input>
                <el-button @click="addReply(index, comment._id)" style="width: 19%; float: right; padding: 20px 13px 18px 13px;">등록</el-button>
              </el-form>
            </div>
          </div>

          <!-- Answer Area -->
          <div v-for="(reply, indexy) in comment.reply" :key="indexy" class="comment_box">
            ㄴ
            <div class="reply">
              <span class="comment_writer2">{{ reply.replied_by }}</span>
              <span class="comment_date">{{ reply.replied_when | moment }}</span><br>
              <div class="comment_contents2">{{ reply.text }}</div>
              {{ index }}
              <div style="text-align: right"><i @click="deleteReply(reply._id, comment._id, index)" class="el-icon-delete"></i></div>
            </div>
          </div>

        </div>
      </div>
      <div v-else>
        <h4 style="color: palevioletred; margin-bottom: 0;">*Caution*</h4>
        <h2 style="margin-top: 0;">There is no Comment</h2>
      </div>

    </div>
  </div>
</template>

<script>
  let moment = require('moment')
  export default {
    name: "index",
    data () {
      return {
        id: this.$route.params.post,
        detail: '',
        textarea: '',
        comments: '',
        tokenName: '',
        replies: '',
        num: '',
        reply: '',
        nonActive: 'nonActive'
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
        // this.replies = this.detail
        this.tokenName = this.detail.token
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
          {text: this.textarea, commented_by: '서울개미'})
          .then((response) => {
            alert(response.message)
            this.textarea = ''
          })
          .catch((response) => {
            alert('오류가 발생했습니다')
          })
        await this.refreshDetail()
      },
      // 코멘트에 코멘트 추가하는 부분
      async addReply(index, id) {
        await this.$axios.$post('/api/posts/reply/' + this.id,
          {_id: id, index: index, replied_by: '고양이소년', text: this.reply})
          .then((response) => {
            alert(response.message)
            this.reply = ''
          })
          .catch((response) => {
            alert('오류가 발생했습니다')
          })
        await this.refreshDetail()
      },
      async deletePost(id, token) {
        await this.$axios.$delete('/api/posts/delete/' + id, {id: id})
          .then((response) => {
            alert(response.message)
          })
          .catch((response) => {
            alert(response)
          })
        this.$router.push('/TokenSale/'+token+'/Post')
      },
      async deleteComment(id, postId) {
        await this.$axios.$post('/api/posts/comments/delete/' + postId, {id: id})
          .then((response) => {
            alert(response.message)
          })
          .catch((response) => {
            alert('삭제 실패')
          })
        this.refreshDetail()
      },
      async deleteReply(id, cid, index) {
        await this.$axios.$post('/api/posts/reply/delete/' + this.id,
          { _id: id, cid: cid, index: index })
          .then((response) => {
            alert(response.message)
          })
          .catch((response) => {
            alert('삭제 실패')
          })
        this.refreshDetail()
      },
      editPost() {
        this.$router.push(this.id+'/edit')
      },
      goToList(token) {
        this.$router.push('/TokenSale/' + token + '/Post')
      },
      showForm(index) {
        this.num = index
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
    /*padding-top: 1rem;*/
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
    margin-top: 0.5rem;
    border-top: 1px solid #dbe1ec;
  }
  .comment_date {
    font-size: 0.8rem;
    color: darkgray;
    float: right;
  }
  .comment_contents {
    margin-top: 3px;
    white-space: pre-wrap;
    word-wrap: break-word;
    margin-bottom: 1rem;
  }
  .comment_box {
    background-color: #f5f5f5;
    margin-top: 0.7rem;
    padding: 1rem 1rem 1rem 0.7rem
  }
  .reply {
    display: inline;
  }
  .comment_writer {
    font-size: 1.1rem;
    font-weight: bolder;
    color: mediumpurple;
    margin-left: 2px;
  }
  .comment_writer2 {
    font-size: 1.1rem;
    font-weight: bolder;
    color: cadetblue;
    margin-left: 2px;
  }
  .comment_contents2 {
    padding-top: 0.2rem;
    padding-left: 1.3rem;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  .nonActive {
    display: none;
  }
</style>
