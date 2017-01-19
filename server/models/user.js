import mongoose from 'mongoose';
import Dictionary from './dictionary';

const Schema = mongoose.Schema;
const userSchema = new Schema({
  googleId: String,
  name: Object,
  accessToken: String,
  userName: { type: String, required: true },
  email: Object,
  level: Number,
  questionSet: Number,
  correctCount: Number,
  words: Array,
  dictionary: Array
});

const User = mongoose.model('user', userSchema);
module.exports = User;

//pull 10 quest from database dictionary
//those 10 quest what user working on therefore
// user object has an array that contains pointer to 10 quest
