const { Router } = require('express')
const router = Router()

let Comment = require('../../models/comment')

router.get('/comments', (req, res) => {
  Comment.find({}, 'user token content created_at answer',
    (error, comments) => {
    if (error) {
      console.error(error)
    }
    res.send({
      comments: comments
    })
    }).sort({_id: -1})
})

router.get('/comments/:token', (req, res) => {
  Comment.find({'token': req.params.token}, 'user content created_at answer',
    (error, comments) => {
    if (error) {
      console.error(error)
    }
    res.send({
      comments: comments
    })
    }).sort({_id: -1})
})

router.post('/comments/new', (req, res) => {
  let user = req.body.user
  let token  = req.body.token
  let content = req.body.content
  let created_at = new Date()
  let new_comment = new Comment({
    user: user,
    content: content,
    token: token,
    created_at: created_at,
    answer: [{
      content: '',
      answered_by: '',
      answered_written_at: ''
    }],
  })
  new_comment.save((error) => {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Comment saved successfully'
    })
  })
})

router.delete('/comments/delete/:id', (req, res) => {
  Comment.remove({
    _id: req.params.id
  }, (error) => {
    if (error)
      res.send(error)
    res.send({
      success: true,
      message: '삭제하였습니다.'
    })
  })
})

router.put('/comments/answer/:id', (req, res) => {
  Comment.findById(req.params.id, 'answer', (error, comment) => {
    if (error) { console.log(error)}
    console.log(comment)
    comment.answer[0].content = req.body.content
    comment.answer[0].answered_by = req.body.answered_by
    comment.answer[0].answered_written_at = new Date()
    comment.save((error) => {
      if (error) { console.log(error)}
      res.send({
        success: true,
        message: 'Answer registered'
      })
    })
  })
})

module.exports = router
