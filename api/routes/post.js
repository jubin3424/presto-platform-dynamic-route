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
    created_at: created_at
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

router.put('/posts/edit/:id', (req, res) => {
  Post.findById(req.params.id, 'title content created_at', (error, post) => {
    if (error) { console.log(error) }
    post.title = req.body.title
    post.content = req.body.content
    post.created_at = new Date()
    post.save((error) => {
      if (error) { console.log(error) }
      res.send({
        success: true,
        message: 'Edited Successfully'
      })
    })
  })
})

// 아래는 한 개의 코멘트만 받을 때 쓸 수 있겠다. (문의사항 코멘트는 이 코드로 되어있음)
// router.put('/posts/comment/:id', (req, res) => {
//   Post.findById(req.params.id, 'comments', (error, post) => {
//     if (error) { console.log(error)}
//     console.log(post)
//     post.comments[0].text = req.body.text
//     post.comments[0].commented_by = req.body.commented_by
//     post.comments[0].written_at = new Date()
//     post.save((error) => {
//       if (error) { console.log(error)}
//       res.send({
//         success: true,
//         message: 'Comment registered'
//       })
//     })
//   })
// })

router.post('/posts/comments/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, {$push: {
    comments: {text: req.body.text, commented_by: req.body.commented_by,
    written_at: new Date()}}}, (error, post) => {
    if (error) { console.log(error)}
    res.send({
      success: true,
      message: 'Comment registered'
    })
    })
  })

// 삭제는 원래 post지만, nested object를 삭제하기 위해 부모 id가 필요... post로 전달하고 pull로 빼냄
router.post('/posts/comments/delete/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, {$pull: {
    comments: { _id: req.body.id }
    }}, (error) => {
    if (error) { console.log(error)}
    res.send({
      success: true,
      message: '댓글이 삭제되었습니다.'
    })
  })
})

router.put('/posts/edit/:id', (req, res) => {
  Post.findById(req.params.id, 'title content created_at', (error, post) => {
    if (error) { console.log(error) }
    post.title = req.body.title
    post.content = req.body.content
    post.created_at = new Date()

    post.save((error) => {
      if (error) { console.log(error) }
      res.send({
        success: true,
        message: 'Post Edited Successfully'
      })
    })
  })
})

router.delete('/posts/delete/:id', (req, res) => {
  Post.remove({
    _id: req.params.id
  }, (error) => {
    if (error)
      res.send(error)
    res.send({
      success: true,
      message: 'Post deleted Successfully'
    })
  })
})

// 공지사항 댓글 추가
router.post('/posts/reply/:id', (req, res) => {
  const query = 'comments.'+req.body.index+'.reply'
  Post.findOneAndUpdate({
    _id: req.params.id, "comments._id": req.body._id
  }, { $push: {[query]: {"replied_by": req.body.replied_by,
        "text": req.body.text, "replied_when": new Date()}}}, (error) => {
    if (error) { console.log(error)}
    res.send({
      success: true,
      message: 'Reply registered'
    })
  })
})

// 공지사항 댓글 삭제
router.post('/posts/reply/delete/:id', (req, res) => {
  const query = 'comments.'+req.body.index+'.reply'
  Post.findByIdAndUpdate(req.params.id,
    {$pull: {
      [query]: {  _id: req.body._id }
    }}, (error) => {
    if (error) { console.log(error)}
    res.send({
      success: true,
      message: '댓글이 삭제되었습니다.'
    })
  })
})

module.exports = router
