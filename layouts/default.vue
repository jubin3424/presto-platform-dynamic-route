<template>
  <div>
    <div class="header">
      <nuxt-link to="/"><h1 style="color: mediumpurple">Header</h1></nuxt-link>
      <nuxt-link to="/tokensale">TokenSale</nuxt-link>&nbsp;&nbsp;
      <nuxt-link to="/tokensale">TokenSale</nuxt-link>&nbsp;&nbsp;
      <nuxt-link to="/tokensale">TokenSale</nuxt-link>
    </div>
    <nuxt/>
    <div class="footer">
      <h1>Footer</h1>
    </div>
  </div>
</template>

<style>
  html {
    font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }
  .header {
    color: mediumpurple;
    top: 0;
    text-align: center;
    padding-bottom: 5px;
    border-bottom: 1px dashed salmon;
  }
  .footer {
    bottom: 0;
    text-align: center;
    border-top: 1px dashed saddlebrown;
  }
  a {
    text-decoration: none;
    color: palevioletred;
  }
</style>

