var express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router(),
    Trivia = require('../models/trivia');

// GET question - returns a single trivia question
router.get('/question', function(req, res) {
	// Gets a random question by counting the number of total documents in the Trivia collection
	Trivia.count({}, function(err, c) {
		if(err) {
			console.log('Probably no questions in the db');
			console.log(err);
		} 
		else {
			console.log('count in database is: ' + c);
			var randomId = Math.floor(Math.random() *(c-1)+1);
		}
	});
	console.log('Random answer id retrieved: ' + randomId);
	Trivia.findOne({'answerid' : randomId}, 'question', function(err, trivia) {
		if (err) throw err;
		console.log(trivia.question);
	});
});

// POST question - creates a new trivia question
//   -Grabs user field data then queries database for a count of total documents in the collection
//   -Increments the document count by 1 and assigns it as answer id of the question
//   -Writes question to database
router.post('/question', function(req, res) {
	var question = req.body.question,
	    answer = req.body.answer,
	    count = 0;
	
	    Trivia.count({}, function(err, c) {
		    if(err) {
			    console.log(err);
		    } 
		    else {
			    count = c + 1;
			    newTrivia = new Trivia({
				question: question,
				answer: answer,
				answerid: count
			   });
		    }
	    });
	
	newTrivia.save(function(err) {
		if(err) throw err;
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
// 	var foo = client.mget('right', 'wrong');
// 	console.log(foo);
});

module.exports = router;
