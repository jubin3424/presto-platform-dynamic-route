let mongoose = require('mongoose')
let Schema = mongoose.Schema

let CommentSchema = new Schema({
  user: String,
  token: String,
  content: String,
  created_at: Date,
  answer: [{
    content: String,
    answered_by: String,
    answered_written_at: Date
  }]
})

let Comment = mongoose.model("Comment", CommentSchema)

module.exports = Comment
