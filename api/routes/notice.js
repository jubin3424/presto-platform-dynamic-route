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

router.get('/notices/:id', (req, res) => {
  Notice.findById(req.params.id, 'user title content created_at comments', (error, notice) => {
    if (error) { console.error(error)}
    res.send({ notice: notice })
  })
})

router.post('/notices/new', (req, res) => {
  let user = req.body.user
  let title = req.body.title
  let content = req.body.content
  let new_notice = new Notice({
    user: user,
    title: title,
    content: content,
    created_at: new Date()
  })
  new_notice.save((error) => {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: '공지사항이 등록되었습니다.'
    })
  })
})

module.exports = router
