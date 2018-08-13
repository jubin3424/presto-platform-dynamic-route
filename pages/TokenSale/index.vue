<template>
    <div>
      <div class="container">
        <ul v-for="(token, index) in tokens" :key="index">
          <li><nuxt-link :to="'tokensale/' + token.name">{{ token.name }}</nuxt-link></li>
        </ul>
      </div>
    </div>
</template>

<script>
  export default {
    name: "index",
    data () {
      return {
        tokens: ''
      }
    },
    created () {
      this.getTokens()
    },
    methods: {
      async getTokens () {
        const getTokens = await this.$axios.$get('/api/tokens')
        this.tokens = getTokens.tokens
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 60%;
    margin: auto;
  }
  a {
    text-decoration: none;
    color: cornflowerblue;
  }
</style>
