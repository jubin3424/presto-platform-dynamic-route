let mongoose = require('mongoose')
let Schema = mongoose.Schema

let PostSchema = new Schema({
  user: String,
  token: String,
  title: String,
  content: String,
  comments: [{
    text: String,
    commented_by: String,
    written_at: Date
  }],
  created_at: Date
})

let Post = mongoose.model("Post", PostSchema)

module.exports = Post
