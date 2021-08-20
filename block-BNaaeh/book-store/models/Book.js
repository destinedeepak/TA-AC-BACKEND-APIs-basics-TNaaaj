var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
  title:{type: String, required: true},
  comment: [{type:Schema.Types.ObjectId, ref:'Comment'}]
}, {timestamps: true})

module.exports = mongoose.model('Book', bookSchema);