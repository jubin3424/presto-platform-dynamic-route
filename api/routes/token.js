const { Router } = require('express')
const router = Router()

let Token = require('../../models/token')

const multer = require('multer')

let _storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './upload')
  },
  filename(req, file, cb) {
    cb(null, file.originalname)
  }
})

let upload = multer({storage: _storage})


router.get('/tokens', (req, res) => {
  Token.find({}, 'name type registered_at total_amount token_purchased imageUrl',
    (error, tokens) => {
    if (error) {
      console.error(error)
    }
    res.send({
      tokens: tokens
    })
    }).sort({_id: -1})
})

router.get('/tokens/:name', (req, res) => {
  Token.find({'name': req.params.name}, 'name type registered_at total_amount token_purchased imageUrl',
    (error, token) => {
    if (error) {
      console.error(error)
    }
    res.send({
      token: token
    })
    })
})

router.get('/tokens/search/:name', (req, res) => {
  Token.find({name: { $regex: req.params.name, '$options': 'i'}}, 'name type registered_at total_amount token_purchased imageUrl',
    (error, token) => {
      if (error) {
        console.error(error)
      }
      res.send({
        token: token
      })
    })
})

router.post('/tokens/new', upload.any(), (req, res) => {
  let name = req.body.name
  let type = req.body.type
  let total_amount = req.body.total_amount
  let new_token = new Token({
    name: name,
    type: type,
    registered_at: new Date(),
    total_amount: total_amount,
    token_purchased: 0,
    imageUrl: ''
  })
  new_token.save((error) => {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Token saved Successfully'
    })
  })
})

router.put('/tokens/purchase/:token', (req, res) => {
  Token.findOne({'name': req.params.token}, 'token_purchased', (error, token) => {
    if (error) { console.log(error) }
    console.log(token)
    token.token_purchased = token.token_purchased + req.body.token_purchased
    token.save((error) => {
      if (error) { console.log(error) }
      res.send({
        success: true,
        message: 'Token Purchased Successfully'
      })
    })
  })
})

router.delete('/tokens/delete/:id', (req, res) => {
  Token.remove({
    _id: req.params.id
  }, (error) => {
    if (error)
      res.send(error)
    res.send({
      success: true,
      message: '해당 토큰을 삭제하였습니다'
    })
  })
})
module.exports = router
