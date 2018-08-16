<template>
  <div>
    <div class="container">
      <div class="thanks-box">
        <h1 style="text-align: center;">Thanks For Purchasing our Token!</h1>
      </div>
      <div style="text-align: center;">
      <el-button>
        <nuxt-link :to="{name: 'TokenSale'}">토큰세일 페이지로</nuxt-link>
      </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Complete"
  }
</script>

<style scoped>
  .container {
    width: 70%;
    padding-top: 1rem;
    margin: auto auto 3rem;
  }
  .thanks-box {
    background-color: whitesmoke;
  }
  a {
    color: black;
  }
</style>
