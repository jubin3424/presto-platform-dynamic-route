<template>
    <div>
      <div class="whatsnew">
        <div class="whatsnew2">What's New</div>
      </div>
        <!--<div class="news_title">What's New</div>-->
      <div class="container">

        <nuxt/>

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
    /*background-image: url("../static/img/back.png");*/
    background-size: cover;
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
    padding-left: 1.7rem;
    font-size: 2rem;
    font-weight: 500;
    /*height: 20vh;*/
    /*font-size: 3rem;*/
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
