<template>
    <div>
      <div style="float: right"><nuxt-link to="WhatsNew/register">등록</nuxt-link></div>
      <div v-if="notices && notices.length > 0">
        <div v-for="(notice, index) in notices" :key="index">
          <div class="post">
            <div class="title">
              <span style="cursor: pointer;" @click="seeDetail(notice._id)">{{ notice.title }}
                <span style="font-size: 0.9rem;">({{ notice.comments && notice.comments.length }})</span>
                </span>
            </div>

            <span>By </span>
            <span class="written_by">{{ notice.user }}</span>
            <span class="post_date">{{ notice.created_at | moment }}</span>
            <hr style="border-color: ghostwhite; color: ghostwhite; opacity: 0.3; margin-top: 1.2rem;">
          </div>
        </div>
      </div>
      <div v-else>
        <h1>등록된 공지사항이 없습니다.</h1>
      </div>
    </div>
</template>

<script>
  let moment = require('moment')
  export default {
    name: "index",
    data () {
      return {
        notices: '',
        user: '',
        title: '',
      }
    },
    created () {
      this.getNotices()
    },
    methods: {
      moment () {
        return moment()
      },
      async getNotices () {
        const getNotices = await this.$axios.$get('/api/notices')
        this.notices = getNotices.notices
      }
    },
    filters: {
      moment(date) {
        return moment(date).format('MMM DD. YYY')
      }
    }
  }
</script>

<style scoped>
  .title {
    font-size: 17px;
    margin-bottom: 5px;
    margin-top: 1.5rem;
  }
  .written_by {
    color: #6464f5;
    font-size: 14px;
    font-weight: 600;
    margin-right: 10px;
  }
  .post_date {
    font-size: 14px;
    color: #7f828b;
  }
  @media(max-width: 768px) {
  }
</style>
