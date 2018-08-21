const { Router } = require('express')
const router = Router()
const multer = require('multer')

let Token = require('../../models/token')

let _storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './upload')
  },
  filename(req, file, cb) {
    cb(null, file.originalname)
  }
})

let upload = multer({storage: _storage})

router.post('/upload', upload.any(), (req, res) => {
  Token.findOne({'name': req.body['0']}, 'imageUrl', (error, token) => {
    if (error) {console.log(error)}
    token.imageUrl = req.files[0].originalname
    token.save((error) => {
      if (error) { console.log(error) }
      res.send({
        success: true
      })
    })
  })
})

module.exports = router
