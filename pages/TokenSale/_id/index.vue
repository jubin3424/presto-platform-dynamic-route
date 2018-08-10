<template>
  <div>
    <el-button style="margin-right: 1rem;" @click="showQ">문의사항</el-button>
    <el-button @click="showD">세부사항</el-button>
    <div v-if="Q">
      <h1>{{ $route.params.id }} Question</h1>
    </div>
    <div v-if="D">
      <h1>{{ $route.params.id }} Detail</h1>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index.vue",
    data () {
      return {
        Q: true,
        D: false
      }
    },
    methods: {
      showQ () {
        this.Q = true
        this.D = false
      },
      showD () {
        this.Q = false
        this.D = true
      }
    }
  }
</script>

<style scoped>

</style>
