var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    redis = require('redis'),
    client = redis.createClient(),
    router = express.Router(),
    Trivia = require('../models/trivia');

var jsonParser = bodyParser.json();


// Log successful redis connection & set 'right' and 'wrong key' values to 0
client.on('connect', function() {
    console.log('Redis Connected');
});

client.set('right', 0);
client.set('wrong', 0);
// GET question - returns a single trivia question
router.get('/question', jsonParser, function(req, res) {
	// Gets a random question by counting the number of total documents in
<<<<<<< HEAD
  //    the Trivia collection

  Trivia.count({}, function(err, c) {
=======
	//  the Trivia collection
	Trivia.count({}, function(err, c) {
>>>>>>> origin/master
		if(err) {
			console.log('Probably no questions in the db');
			console.log(err);
		}
		else {

			var randomId = Math.floor(Math.random() *(c-1)+1);
<<<<<<< HEAD
      Trivia.findOne({'answerid' : randomId}, 'question', function(err, trivia) {
        if (err) throw err;
        console.log({question: trivia.question});
        currentQuestion = trivia.question;
        res.json({'question': trivia.question});
      });
=======
			Trivia.findOne({'answerid' : randomId}, 'question', function(err, trivia) {
				if (err) throw err;
				console.log(trivia.question);
				res.json('question: ' + trivia.question + 'Answer Id: ' + randomId);
			});
>>>>>>> origin/master
		}
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
<<<<<<< HEAD

      //counts the total documents in our collection
      Trivia.count({}, function(err, c) {
=======
	
	Trivia.count({}, function(err, c) {
>>>>>>> origin/master
		    if(err) {
			    console.log(err);
		    }
		    else {
			    count = c + 1;
			    var newTrivia = new Trivia({
				    question: question,
				    answer: answer,
				    answerid: count
			    });
			    newTrivia.save(function(err) {
				    if(err) throw err;
			    });
			    res.json('question: ' + question + 'Answer: ' + answer + 'Answer Id: '
				     + count);
		    }
      });
});

// POST answer
router.post('/answer', function(req, res) {
	//var answerid = req.body.answerid, //we need to query for the answerid based on question
	    var useranswer = req.body.useranswer,
        //we need to get the question to know which question to query for the id
          answerid;
          console.log(currentQuestion);
  Trivia.findOne({'question' : question}, 'answerid', function(err, trivia) {
  		if (err) throw err;
      console.log(trivia.answerid);
  });
	//Query database for answer based on the answerid and compare it with user
	Trivia.findOne({'answerid' : answerid}, 'answer', function(err, trivia) {
		if (err) throw err;
		if (trivia.answer == useranswer) {
      console.log('correct');
			client.incr('right');
      res.json({'correct': 'true'});
		} else {
			console.log('incorrect');
			client.incr('wrong');
      res.json({'correct': 'false'});
		}
	});
});

// GET score - TODO: use mget and get reply as callback
router.get('/score', function(req, res) {
  var rightAnswers = client.get('right'),
      wrongAnswers = client.get('wrong'),
      result = {'right': rightAnswers, 'wrong': wrongAnswers};
      res.json(result);
});

module.exports = router;
