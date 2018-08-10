<template>
    <div>
      <div class="container">
        <span class="coinName">{{ name }}</span>
        <img :src="imageUrl">
        <div class="btmPart">
          <nuxt/>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "_id",
    data () {
      return {
        name: this.$route.params.id,
        imageUrl: require(`../../static/img/${this.$route.params.id}.png`)
      }
    }
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
