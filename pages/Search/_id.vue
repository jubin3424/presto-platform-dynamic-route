<template>
  <div>
    <h3>
      <span class="searchParam">{{ tokenName }}</span>로 검색하신 결과입니다.
    </h3>
    <el-row :gutter="20">
      <div v-if="token">
        <div v-for="(token, index) in token" :key="index">
          <el-col :xs="24" :sm="6">
            <div class="item">
              <img :src="getImageUrl(token.imageUrl)"
                   style="width: 130px; height: 130px; cursor: pointer;" @click="goTo(token.name)">
              <div style="margin-top: 2px; font-size: 0.5rem; color: cornflowerblue">{{ token.type }}</div>
              <div style="margin-top: 2px; font-size: 1.1rem; cursor: pointer;" @click="goTo(token.name)">{{ token.name }}</div>
              <div style="font-size: 0.7rem; color: gray; margin-top: 3px;">{{ token.registered_at | moment }}</div>
            </div>
          </el-col>
        </div>
      </div>
      <div v-else>
        <h2>There is no {{ tokenName }} results</h2>
      </div>
    </el-row>
  </div>
</template>

<script>
  let moment= require('moment')
  export default {
    name: "_id",
    data () {
      return {
        tokenName: this.$route.params.id,
        token: ''
      }
    },
    created () {
      let name = this.tokenName
      this.$axios.$get(`/api/tokens/search/${name}`)
        .then((response) => {
          this.token = response.token
        })
    },
    methods: {
      moment () {
        return moment()
      },
      getImageUrl (name) {
        try {
          return require(`../../upload/${name}`)
        } catch(e) {
          return require('../../static/img/no_image.png')
        }
      },
      goTo (name) {
        this.$router.push('/TokenSale/' + name)
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
  .searchParam {
    color: #47494e;
    font-style: italic;
    margin-right: 5px;
  }
  .item {
    text-align: center;
  }
</style>
