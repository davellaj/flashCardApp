import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const dictionarySchema = new Schema({
  english: {type: String, required: true},
  german: {type: String, required: true}
})

const Dictionary = mongoose.model('dictionary', dictionarySchema);
module.exports = Dictionary;


// another way to write a schema
// const dictionarySchema = mongoose.Schema({
//   english: {type: String, required: true},
//   german: {type: String, required: true}
// });
// module.exports = mongoose.model('Dictionary', dictionarySchema)
