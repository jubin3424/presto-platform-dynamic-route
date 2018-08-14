<template>
    <div>
      <div class="container">
        <el-row :gutter="20">
          <el-col :span="8" v-for="(token, index) in tokens" :key="index">
            <el-card :body-style="{ padding: '0rem' }">
              <el-row :gutter="10">
                <el-col :span="24">
                  <img :src="getImageUrl(token.name)" class="image" style="">
                </el-col>
                <el-col :span="24">
                  <span style="float: right; margin-right: 5px; font-size: 0.6rem; color: crimson">{{ token.type }}</span>
                  <div style="padding-top: 10px; padding-left: 0.8rem;">
                    <div class="main-token-title">{{ token.name }}</div>
                    <div class="sub-token-title">World Most Best Token Ever</div>
                  </div>
                </el-col>
              </el-row>
              <div style="padding: 10px 0.8rem 0.8rem;">
                <span style="font-size: 0.9rem; color: gray">진행률</span>
                <el-progress :percentage="token.progress"></el-progress>
                <div class="bottom clearfix">
                  <div class="time">{{ token.registered_at | moment }}</div>
                  <el-button class="button">
                    <nuxt-link :to="'tokensale/' + token.name">둘러보기</nuxt-link>
                  </el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

      </div>
    </div>
</template>

<script>
  let moment = require('moment')
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
      moment () {
        return moment()
      },
      async getTokens () {
        const getTokens = await this.$axios.$get('/api/tokens')
        this.tokens = getTokens.tokens
      },
      getImageUrl (name) {
        try {
          return require(`../../static/img/${name}.png`)
        } catch(e) {
          return require('../../static/img/no_image.png')
        }
      }
    },
    filters: {
      moment(date) {
        return moment(date).format('YYYY. MM. DD')
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 80%;
    margin: auto;
  }
  a {
    text-decoration: none;
    color: cornflowerblue;
  }
  .el-card {
    margin-bottom: 1.3rem;
  }
  .main-token-title {
    font-size: 1.5rem;
    font-weight: bolder;
  }
  .sub-token-title {
    font-size: 0.5rem;
  }
  .time {
    font-size: 13px;
    color: #999;
    margin-bottom: 7px;
  }
</style>
