var express = require('express'),
		mongoose = require('mongoose'),
	  router = express.Router(),
    Trivia = require('../models/trivia');

// GET question - returns a single trivia question
router.get('/question', function(req, res) {
		// Gets a random question (only 5 questions in db for now)
		// *Next feature is correctly assigning answerId to questions posted
		var answerid = Math.floor(Math.random() *(6-1)+1);
		console.log('Random answer id: ' + answerid);
		Trivia.findOne({'answerid' : answerid}, 'question', function(err, trivia) {
			if (err) throw err;
			console.log(trivia.question);
		});
	});

// POST question - creates a new trivia question **complete**
router.post('/question', function(req, res) {
		var question = req.body.question,
				answer = req.body.answer,
				newTrivia = new Trivia({
					question: question,
					answer: answer,
				});
				console.log('Question: ' + question + 'Answer: ' + answer);
				newTrivia.save(function(err) {
					if(err) throw err;
						console.log('errors');
				});
				res.send('Question: ' + question + ' Answer: ' + answer);
		});

// POST answer
router.post('/answer', function(req, res) {
		var answerid = req.body.answerid,
				useranswer = req.body.useranswer;

		//Query database for answer based on the answerid and compare it with user
		Trivia.findOne({'answerid' : answerid}, 'answer', function(err, trivia) {
			if (err) throw err;
			if (trivia.answer == useranswer) {
				console.log('correct');
			} else {
				console.log('incorrect');
			}
		});
});

// GET score
router.get('/score', function(req, res) {
	//redis keeps track of score on the post /answer and displays here
	// *Ran out of time
});

module.exports = router;
