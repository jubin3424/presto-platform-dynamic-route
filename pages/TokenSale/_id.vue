<template>
    <div>
      <div class="container">
        <div class="coinName" @click="getTokenInfo">{{ this.tokenInfo.name }}</div>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" style="overflow: hidden;">
            <img :src="getImageUrl(this.tokenInfo.imageUrl)" style="margin-top: 1rem; height: 390px;">
          </el-col>
          <el-col :xs="24" :sm="12">
            <div class="token-market">
              <token></token>
            </div>
          </el-col>
        </el-row>
        <div class="btmPart">
          <el-button style="margin-right: 1rem;" @click="showQ(name)">문의사항</el-button>
          <el-button style="margin-right: 1rem;" @click="showD(name)">세부사항</el-button>
          <el-button @click="showP(name)">공지사항</el-button>
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
        imagePath: '',
        imageUrl: this.getImageUrl(),
        tokenInfo: '',
      }
    },
    created () {
      this.getTokenInfo()
      this.getImageUrl()
    },
    methods: {
      getImageUrl (name) {
        try {
          return require(`../../upload/${name}`)
        } catch(e) {
          return require('../../static/img/no_image.png')
        }
      },
      async getTokenInfo () {
        const getTokens = await this.$axios.$get('/api/tokens/' + this.name)
        this.tokenInfo = getTokens.token[0]
        this.imagePath = this.tokenInfo.imageUrl
      },
      showQ (name) {
        this.$router.push('/TokenSale/'+name+'/Question')
      },
      showD (name) {
        this.$router.push('/TokenSale/'+name+'/Detail')
      },
      showP (name) {
        this.$router.push('/TokenSale/'+name+'/Post')
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
