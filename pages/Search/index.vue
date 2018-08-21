<template>
    <div>
      <el-form>
        <el-form-item label="TokenName">
          <el-input v-model="tokenName" placeholder="Search Token"></el-input>
        </el-form-item>
        <el-button @click="searchToken">검색</el-button>
      </el-form>
    </div>
</template>

<script>
  export default {
    name: "index",
    data () {
      return {
        tokenName: ''
      }
    },
    methods: {
      searchToken() {
        if (this.tokenName.length < 2){
          alert('두 글자 이상 입력해주십시오')
          return false
        }
        this.$router.push('/search/' + this.tokenName)
      },
    }
  }
</script>

<style scoped>

</style>
