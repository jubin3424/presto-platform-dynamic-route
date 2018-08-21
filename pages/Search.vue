<template>
  <div class="container">
    <div class="searchFixed">
      <h1 style="display: inline-block; margin-bottom: 0;">
        <span class="el-icon-search"></span>&nbsp;Search</h1>&nbsp;&nbsp;
      <h3 style="display: inline-block;
                 color: dimgray; margin-bottom: 0;">찾으시는 토큰을 검색해보세요!</h3>
    </div>
    <div class="search-form">
      <nuxt-child></nuxt-child>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Search"
  }
</script>

<style scoped>
  .container {
    width: 80%;
    margin: auto auto 3rem;
  }
  .searchFixed {
    background-color: #f7f8fb;
    padding-bottom: 1.5rem;
    padding-left: 0.9rem;
  }
  @media(max-width: 768px) {
    .container {
      width: 100%;
      margin-bottom: 1rem;
    }
  }
</style>
