const { Router } = require('express')
const router = Router()

let Token = require('../../models/token')

router.get('/tokens', (req, res) => {
  Token.find({}, 'name type registered_at total_amount token_purchased',
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
  Token.find({'name': req.params.name}, 'name type registered_at total_amount token_purchased',
    (error, token) => {
    if (error) {
      console.error(error)
    }
    res.send({
      token: token
    })
    })
})

router.post('/tokens/new', (req, res) => {
  let name = req.body.name
  let type = req.body.type
  let total_amount = req.body.total_amount
  let new_token = new Token({
    name: name,
    type: type,
    registered_at: new Date(),
    total_amount: total_amount,
    token_purchased: 0
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
module.exports = router
