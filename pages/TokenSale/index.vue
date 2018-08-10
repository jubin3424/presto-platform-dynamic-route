<template>
    <div>
      <div class="container">
        <ul v-for="(coin, index) in coins" :key="index">
          <li><nuxt-link :to="'tokensale/' + coin">{{ coin }}</nuxt-link></li>
        </ul>
      </div>
    </div>
</template>

<script>
  export default {
    name: "index",
    data () {
      return {
        coins: ['JbCoin', 'PRSTCoin', 'CookeCoin']
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
  a {
    text-decoration: none;
    color: cornflowerblue;
  }
</style>
