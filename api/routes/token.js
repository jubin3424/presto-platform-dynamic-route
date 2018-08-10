const { Router } = require('express')
const router = Router()

let Token = require('../../models/token')

router.get('/tokens', (req, res) => {
  Token.find({}, 'name type registered_at',
    (error, tokens) => {
    if (error) {
      console.error(error)
    }
    res.send({
      tokens: tokens
    })
    }).sort({_id: -1})
})

router.post('/tokens/new', (req, res) => {
  let name = req.body.name
  let type = req.body.type
  let new_token = new Token({
    name: name,
    type: type,
    registered_at: new Date()
  })
  new_token.save((error) => {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Token saved Sucessfully'
    })
  })
})

module.exports = router
