let mongoose = require('mongoose')
let Schema = mongoose.Schema

let CommentSchema = new Schema({
  user: String,
  token: String,
  content: String,
  created_at: Date,
  answered: {
    type: Boolean,
    default: false
  }
})

let Comment = mongoose.model("Comment", CommentSchema)

module.exports = Comment
