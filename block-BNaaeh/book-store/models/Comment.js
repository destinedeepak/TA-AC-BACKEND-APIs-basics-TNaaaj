var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  content:{type: String, required: true},
  book: {type:Schema.Types.ObjectId, ref:'Book'}
}, {timestamps: true})

module.exports = mongoose.model('Comment', commentSchema);