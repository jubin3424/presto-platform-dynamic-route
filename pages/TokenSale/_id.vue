<template>
    <div>
      <div class="container">
        <span class="coinName">{{ $route.params.id }}</span>
        <div class="btmPart">
          <nuxt/>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "_id"
  }
</script>

<style scoped>
  .container {
    width: 60%;
    margin: auto;
    height: 70vh;
  }
  .coinName {
    font-size: 2rem;
    font-style: italic;
    text-decoration: underline;
    text-decoration-style: wavy;
  }
  .btmPart {
    margin-top: 1rem;
  }
</style>
