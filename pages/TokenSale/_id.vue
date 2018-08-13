<template>
    <div>
      <div class="container">
        <div class="coinName">{{ name }}</div>
        <img :src="imageUrl" style="margin-top: 1rem;">
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
        imageUrl: this.getImageUrl()
      }
    },
    methods: {
      getImageUrl () {
        try {
          return require(`../../static/img/${this.$route.params.id}.png`)
        } catch(e) {
          return require('../../static/img/no_image.png')
        }
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 60%;
    margin: auto;
  }
  .coinName {
    font-size: 2rem;
    font-style: italic;
    text-decoration: underline;
    text-decoration-style: wavy;
  }
  .btmPart {
    margin-top: 1rem;
    margin-bottom: 3rem;
  }
</style>
