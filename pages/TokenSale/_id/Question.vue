<template>
    <div>
      <h1>Question</h1>
      <!--<h1>{{ $route.params.id }} Question</h1>-->
      <!--<el-form>-->
        <!--<el-input-->
          <!--type="textarea"-->
          <!--:rows="3"-->
          <!--placeholder="질문을 입력해주세요."-->
          <!--v-model="content"-->
          <!--style="width: 85%;">-->
        <!--</el-input>-->
        <!--<el-button @click="addComment" style="float: right; margin-top: 1rem;" class="hidden-xs-only">제출</el-button>-->
        <!--<el-button @click="addComment" style="float: right; margin-left: 2px; width: 14%;-->
        <!--padding-top: 29px; padding-bottom: 29px; padding-left: 12px;" class="hidden-sm-and-up">제출</el-button>-->
      <!--</el-form>-->
      <!--<div v-if="comments.length > 0">-->
        <!--<div v-for="(comment, index) in comments" :key=index class="comment">-->
          <!--<span class="comment_writer">{{ comment.user }}</span>-->
          <!--<span v-if="comment.answer[0] && comment.answer[0].content" class="answered">Answered</span>-->
          <!--<span v-else class="unanswered">Unanswered</span>-->
          <!--<span class="comment_date">-->
            <!--{{ comment.created_at | moment }}<br>-->
          <!--</span>-->
          <!--<div class="comment_contents">{{ comment.content }}</div>-->
          <!--<div style="text-align: right; margin-bottom: 5px;">-->
            <!--<span @click="deleteComment(comment._id)">-->
                <!--<i class="fas fa-trash-alt" style="cursor: pointer;"></i>-->
              <!--</span>-->
            <!--<span @click="showAnswerForm(index)">-->
                  <!--<i class="fab fa-replyd"></i>-->
                <!--</span>-->
          <!--</div>-->
          <!--<div v-bind:class="[{ activeReply: num === index }, { nonActive: num !== index }]">-->
            <!--<div class="answer-part">-->
              <!--<el-form>-->
                <!--<el-input-->
                  <!--type="textarea"-->
                  <!--:rows="2"-->
                  <!--:placeholder="comment.user+'님에게 답변을 해주세요.'"-->
                  <!--v-model="answerArea" style="width: 80%;"></el-input>-->
                <!--<el-button @click="answerSubmit(comment._id)" style="width: 19%; float: right; padding: 20px 13px 18px 13px;">등록</el-button>-->
              <!--</el-form>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div v-if="comment.answer[0] && comment.answer[0].content" class="answerBox">-->
            <!--ㄴ-->
            <!--<span class="answer_writer">{{ comment.answer[0].answered_by }}</span>-->
            <!--<span class="comment_date">-->
                <!--{{ comment.answer[0].answered_written_at | moment }}</span><br>-->
            <!--<div class="answer_contents">-->
              <!--<pre>{{ comment.answer[0].content }}</pre></div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div v-else>-->
        <!--<h4 style="color: palevioletred; margin-bottom: 0;">*Caution*</h4>-->
        <!--<h2 style="margin-top: 0;">There is no Comment</h2>-->
      <!--</div>-->
    </div>
</template>

<script>
    export default {
        name: "Question"
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
</style>
