const { Router } = require('express')
const router = Router()

let Post = require('../../models/post')

router.get('/posts', (req, res) => {
  Post.find({}, 'user token title content created_at comments',
    (error, posts) => {
    if (error) {
      console.error(error)
    }
    res.send({
      posts: posts
    })
    }).sort({_id: -1})
})

router.get('/posts/:token', (req, res) => {
  Post.find({'token': req.params.token}, 'user token title content created_at comments',
    (error, posts) => {
    if (error) { console.error(error)
    }
    res.send({
      posts: posts
    })
    }).sort({_id: -1})
})

router.get('/posts/get/:id', (req, res) => {
  Post.findById(req.params.id, 'user token title content created_at comments', (error, post) => {
    if (error) { console.error(error); }
    res.send({post: post})
  })
})

router.post('/posts/new', (req, res) => {
  let user = req.body.user
  let token = req.body.token
  let title = req.body.title
  let content = req.body.content
  let created_at = new Date()
  let new_post = new Post({
    user: user,
    token: token,
    title: title,
    content: content,
    created_at: created_at,
    comments: [{
      text: '',
      commented_by: ''
    }]
  })
  new_post.save((error) => {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully'
    })
  })
})

module.exports = router
