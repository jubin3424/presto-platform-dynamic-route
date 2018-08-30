const { Router } = require('express')
const router = Router()

let Notice = require('../../models/notice')

router.get('/notices', (req, res) => {
  Notice.find({}, 'user title content created_at comments',
    (error, notices) => {
    if (error) {
      console.error(error)
    }
    res.send({
      notices: notices
    })
    }).sort({_id: -1})
})
