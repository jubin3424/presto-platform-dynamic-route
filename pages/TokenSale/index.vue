<template>
    <div>
      <div class="container">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="8" v-for="(token, index) in tokens" :key="index">
            <el-card :body-style="{ padding: '0rem' }">
              <el-row :gutter="10">
                <el-col :span="24">
                  <img :src="getImageUrl(token.imageUrl)" class="image" style="height: 250px">
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
                <el-progress :width="100" :show-text="false" :percentage="parseInt(cal(token.token_purchased, token.total_amount))"
                             style="padding-top: 5px; padding-bottom: 5px;"></el-progress>
                <span style="font-size: 0.9rem; color: gray">
                  {{ cal(token.token_purchased, token.total_amount) }}%
                </span>
                <div class="bottom clearfix">
                  <div class="time">발행일자: {{ token.registered_at | moment }}</div>
                  <el-button class="button" @click="goToPage(token.name)">둘러보기
                  </el-button>
                  <el-button @click="deleteToken(token._id)">삭제하기</el-button>
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
      async refreshTokens () {
        await this.getTokens()
      },
      async deleteToken(id) {
        await this.$axios.$delete('/api/tokens/delete/' + id, {id: id})
          .then((response) => {
            alert(response.message)
          })
          .catch((response) => {
            alert(response)
          })
        await this.refreshTokens()
      },
      getImageUrl (name) {
        try {
          return require(`../../upload/${name}`)
        } catch(e) {
          return require('../../static/img/no_image.png')
        }
      },
      cal(tp, ta) {
        return ((tp/ta)*100).toFixed(2)
      },
      async goToPage(name) {
        await this.$router.push('/TokenSale/'+name)
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
    margin-top: 7px;
  }
  @media(max-width: 768px) {
    .container {
      width: 100%;
    }
  }
</style>
