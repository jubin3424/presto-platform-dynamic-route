<template>
  <section class="container">
    <div>
      <div class="carousel-container">
      <el-carousel :interval="10000" arrow="always">
        <el-carousel-item v-for="(item, index) in tableData" :key="index">
          <span>{{ item.name }}</span>
        </el-carousel-item>
      </el-carousel>
      </div>

      <el-row style="margin-top: 2.5rem;">
        <el-col :xs="2" :sm="2">&nbsp;</el-col>
        <el-col :xs="20" :sm="20">
          <div style="margin-bottom: 1.5rem;">
            <span class="etc">
              <h2 class="subtitle">Presto</h2>
              is a <b>token sale platform</b> with smart contract generator
              that follows <b>DAICO model</b> to protect investors, and to reduce the cost of
              the token sale process.
            </span>
          </div>
          <span style="border-radius: 10px; border: 1px solid black; padding: 6px; background-color: ghostwhite">
            SignUp
          </span>
        </el-col>
        <el-col :xs="2" :sm="2">&nbsp;</el-col>
      </el-row>

      <div style="background-color: #dbe1ec; padding-top: 1rem; padding-bottom: 1rem; margin-top: 2.5rem;">
        <el-row>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="20" class="hottest">
            <div class="subtitle">
              Hottest Tokens
            </div>
              <div v-for="(token, index) in tokens" :key="index">
                <el-col :xs="24" :sm="6">
                  <div class="item">
                    <img :src="getImageUrl(token.imageUrl)" class="searchImage"
                         style="cursor: pointer; border-radius: 15px;" @click="goTo(token.name)">
                    <div class="type">{{ token.type }}</div>
                    <div class="name" @click="goTo(token.name)">{{ token.name }}</div>
                    <div class="registered_at">{{ token.registered_at | moment }}</div>
                  </div>
                </el-col>
              </div>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
        </el-row>
      </div>

      <div style="margin-bottom: 1rem;">&nbsp;</div>

    </div>
  </section>
</template>

<script>
  let moment = require('moment')
  export default {
    data () {
      return {
        selected: 0,
        tableData: [{
          name: 'aelf',
          main: require('../static/img/coin/office_back.jpg')
        }, {
          name: 'root',
          main: require('../static/img/coin/back2.jpg')
        }],
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
          return require(`../upload/${name}`)
        } catch(e) {
          return require('../static/img/no_image.png')
        }
      },
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
  /*margin-top: 2vh;*/
  /*justify-content: center;*/
  /*align-items: center;*/
  /*text-align: center;*/
}
.carousel-container {
  text-align: center;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  margin-top: 0;
}

.el-carousel__item span {
  color: white;
  font-size: 5rem;
  opacity: 0.75;
  line-height: 270px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-image: url("../static/img/coin/office_back.jpg");
  background-size: cover;
}

.el-carousel__item:nth-child(2n+1) {
  background-image: url("../static/img/coin/back2.jpg");
  background-size: cover;
}

.etc {
  font-size: 1.2rem;
  line-height: 1.5rem;
}
.searchImage {
  width: 130px;
  height: 130px;
}
.item {
  margin-top: 1.5rem;
  text-align: center;
}
.type {
  margin-top: 2px;
  font-size: 0.5rem;
  color: cornflowerblue;
}
.name {
  margin-top: 2px; font-size: 1.1rem; cursor: pointer;
}
.registered_at {
  font-size: 0.7rem; color: gray; margin-top: 3px;
}
@media(max-width: 768px) {
  .el-carousel {
    height: 60vh;
  }
  .el-carousel__item {
    height: 60vh;
  }
  .VueCarousel-slide{
    height: 60vh;
  }
  .VueCarousel-slide img {
    width: 100%;
    height: 100%;
  }
  .centered {
    font-size: 3rem;
  }
  .item img {
    width: 100%;
  }
  .hottest {
    text-align: center;
    margin: auto;
  }
}
</style>

