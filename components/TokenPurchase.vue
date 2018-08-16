<template>
  <div class="container">
    <h2 style="text-align: center;">{{ this.value }} Purchase Page</h2>
    <div class="token-counter">
      <el-form class="purchase-form">
        <el-form-item label="TokenName"><br>
          <el-select v-model="value" disabled :placeholder="value">
            <el-option v-for="(token, index) in tokens"
                       :key="index"
                       :label="token.name"
                       :value="token.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Amount(1000단위)"><br>
          <el-slider
            v-model="amount"
            show-input>
          </el-slider>
          <el-input v-model="total" style="margin-top: 7px;"></el-input>
        </el-form-item>
        <el-button @click="purchaseToken(getCurrentToken())">구입하기</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TokenPurchase",
    data () {
      return {
        tokens: '',
        value: this.$route.params.id,
        amount: 0,
        total: '',
        getName: ''
      }
    },
    created () {
      this.getTokens()
    },
    methods: {
      async getTokens () {
        const getTokens = await this.$axios.$get('/api/tokens')
        this.tokens = getTokens.tokens
      },
      async purchaseToken(token_name) {
        if (confirm('토큰을 구매하시겠습니까?')) {
          await this.$axios.$put('/api/tokens/purchase/' + token_name,
            {token_purchased: this.total})
            .then((response) => {
              alert(response.message)
            })
            .catch((response) => {
              alert('오류가 발생했습니다')
            })
        }
        this.$router.push({name: 'Complete'})
      },
      getCurrentToken() {
        return this.value
      }
    },
    watch: {
      amount () {
        this.total = this.amount*1000
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 100%;
    margin: auto;
  }
  .purchase-form {
    width: 90%;
    margin: auto;
  }
</style>
