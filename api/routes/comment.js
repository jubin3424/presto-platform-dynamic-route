const { Router } = require('express')
const router = Router()

let Comment = require('../../models/comment')

router.get('/comments', (req, res) => {
  Comment.find({}, 'user token content created_at answered',
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
  Comment.find({'token': req.params.token}, 'user content created_at answered',
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
  let answered = false

  let new_comment = new Comment({
    user: user,
    content: content,
    token: token,
    created_at: created_at,
    answered: answered
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

module.exports = router
