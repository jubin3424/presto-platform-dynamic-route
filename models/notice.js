let mongoose = require('mongoose')
let Schema = mongoose.Schema

let NoticeSchema = new Schema({
  user: String,
  title: String,
  content: String,
  comments: [{
    text: String,
    commented_by: String,
    written_at: Date,
    reply: [{
      text: String,
      replied_by: String,
      replied_when: Date
    }]
  }],
  created_at: Date
})

let Notice = mongoose.model("Notice", NoticeSchema)

module.exports = Notice
