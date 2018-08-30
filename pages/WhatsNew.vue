<template>
    <div>
      <div class="whatsnew">
        <!--<div class="whatsnew2">What's New</div>-->
      </div>
        <div class="news_title">What's New</div>
      <div class="container">

        <div v-if="posts && posts.length > 0">
          <div v-for="(post, index) in posts" :key="index">
            <div class="post">
              <div class="title">
              <span style="cursor: pointer;" @click="seeDetail(post._id)">{{ post.title }}
                <span style="font-size: 0.9rem;">({{ post.comments && post.comments.length }})</span>
                </span>
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
  export default {
    name: "WhatsNew",
    data () {
      return {
        posts: '',
        user: '',
        title: '',
      }
    }
  }
</script>

<style scoped>
  .whatsnew {
    background-image: url('../static/img/coin/office_back.jpg');
    background-size: cover;
    height: 20vh;
    font-size: 3rem;
    color: white;
  }
  .whatsnew2 {
    padding-top: 10vh;
    padding-left: 2rem;
  }
  .container {
    width: 90%;
    margin: auto;
    margin-bottom: 3rem;
  }
  .news_title {
    font-size: 2rem;
    padding-top: 1.5rem;
    padding-bottom: 1rem;
    padding-left: 3rem;
    border-bottom: 1px solid #dbe1ec;
    font-weight: 500;
  }
  @media(max-width: 768px) {
    .whatsnew {
      height: 15vh;
    }
    .whatsnew2 {
      padding-top: 5vh;
    }
  }
</style>
