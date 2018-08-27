<template>
  <section class="container">
    <div>
      <div class="carousel-container">
        <no-ssr>
        <carousel :perPage="1">
          <slide v-for="(item, index) in tableData" :key="index">
            <img :src="item.main"><div class="centered">PRST Token Newly Released!</div>
          </slide>
        </carousel>
        </no-ssr>
      </div>

      <!--<div class="newly-arrived">-->
        <!--&lt;!&ndash;<h1 class="main_title">New Arrival</h1>&ndash;&gt;-->
        <!--<el-carousel :interval="10000" type="card" style="height: 500px;">-->
          <!--<el-carousel-item v-for="(item, index) in tableData" :key="index" style="height: 500px;">-->
            <!--<h3 style="text-align: center;">-->
              <!--<img :src="item.main" style="background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), 45% 58%"></h3>-->
          <!--</el-carousel-item>-->
        <!--</el-carousel>-->
      <!--</div>-->

      <h1 class="title">
        presto-platform-dynamic
      </h1>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
    </div>
  </section>
</template>

<script>
  import { Carousel, Slide } from 'vue-carousel'
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
      }]
    }
  },
  components: {
    Carousel,
    Slide
  }
}
</script>

<style scoped>
.container {
  /*margin-top: 2vh;*/
  justify-content: center;
  align-items: center;
  text-align: center;
}
.carousel-container {
  position: relative;
  text-align: center;
  color: white
}
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 4.5rem;
}
.VueCarousel-slide{
  height: 90vh;
}
.VueCarousel-slide img {
  width: 100%;
  height: 100%;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

@media(max-width: 768px) {
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
}
</style>

