var mongoose = require('mongoose');

// Create a schema
var triviaSchema = new mongoose.Schema({
  question: String,
  answer: String,
  answerId: Number,
  useranswer: String,
  correct: Boolean
});

// Create the mongoose model
var Trivia = module.exports = mongoose.model('Trivia', triviaSchema);
// // Find user by username in our db
// module.exports.getUserByUsername = function(username, callback) {
// 	var query = {username: username};
// 	User.findOne(query, callback);
// }

// Find question by object id in our db
// module.exports.getQuestionById = function(question, callback) {
// 	User.findById(id, callback);
// }
