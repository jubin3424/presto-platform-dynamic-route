const { Router } = require('express')
const router = Router()

let Notice = require('../../models/notice')

// 리스트 불러오기 위함
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

// Detail 불러오기 위함
router.get('/notices/:id', (req, res) => {
  Notice.findById(req.params.id, 'user title content created_at comments', (error, notice) => {
    if (error) { console.error(error)}
    res.send({ notice: notice })
  })
})

// 새 글 작성
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

// 공지사항 댓글 추가
router.post('/notices/comments/:id', (req, res) => {
  Notice.findByIdAndUpdate(req.params.id, {$push: {
    comments: {text: req.body.text, commented_by: req.body.commented_by,
    written_at: new Date()}}}, (error) => {
    if (error) { console.log(error)}
    res.send({
      success: true,
      message: '댓글이 등록되었습니다.'
    })
  })
})

// 공지사항 댓글 삭제
router.post('/notices/comments/delete/:id', (req, res) => {
  Notice.findByIdAndUpdate(req.params.id, {$pull: {
    comments: { _id: req.body.id }
    }}, (error) => {
    if (error) { console.log(error)}
    res.send({
      success: true,
      message: '댓글이 삭제되었습니다.'
    })
  })
})

// 공지사항 <댓글에 댓글> 삭제
router.post('/notices/reply/delete/:id', (req, res) => {
  const query = 'comments.' + req.body.index + '.reply'
  Notice.findByIdAndUpdate(req.params.id,
    {$pull: {
      [query]: { _id: req.body._id}
      }}, (error) => {
    if (error) { console.log(error) }
    res.send({
      success: true,
      message: '꼬리글이 삭제되었습니다.'
    })
    })
})

// 공지사항 <댓글에 댓글> 추가
router.post('/notices/reply/:id', (req, res) => {
  const query = 'comments.' + req.body.index + '.reply'
  Notice.findOneAndUpdate({
    _id: req.params.id, "comments._id": req.body._id
  }, { $push: {[query]: {"replied_by": req.body.replied_by,
        "text": req.body.text, "replied_when": new Date()}}}, (error) => {
    if (error) { console.log(error) }
    res.send({
      success: true,
      message: '꼬리글이 등록되었습니다.'
    })
  })
})


module.exports = router
