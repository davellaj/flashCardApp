import mongoose from 'mongoose'

// can we set default values in schema? level defaults to 1
const Schema = mongoose.Schema;
const dictionarySchema = new Schema({
  level: {type: Number, required: true},
  questionSet: {type: Number, required: true},
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
