import mongoose from 'mongoose'

const dictionarySchema = mongoose.Schema({
  english: {type: String, required: true},
  german: {type: String, required: true}
});
module.exports = mongoose.model('Dictionary', dictionarySchema)
