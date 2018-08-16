<template>
    <div>
      <div class="container">
        <div class="coinName">{{ name }}</div>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" style="overflow: hidden;">
            <img :src="imageUrl" style="margin-top: 1rem; height: 390px;">
          </el-col>
          <el-col :xs="24" :sm="12">
            <div class="token-market">
              <token></token>
            </div>
          </el-col>
        </el-row>
        <div class="btmPart">
          <nuxt/>
        </div>
      </div>
    </div>
</template>

<script>
  import Token from '../../components/TokenPurchase'
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
    },
    components: {
      'token': Token
    }
  }
</script>

<style scoped>
  .container {
    width: 80%;
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
  .token-market {
    background-color: whitesmoke;
    padding: 0.1rem 0.1rem 0rem 0.1rem;
    margin-top: 1rem;
    height:390px;
  }
  @media(max-width: 768px) {
    .container {
      width: 100%;
    }
    .token-market {
      background-color: ghostwhite;
      margin-top: 0.4rem;
    }
  }
</style>
