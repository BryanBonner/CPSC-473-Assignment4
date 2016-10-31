var express = require('express'),
	  router = express.Router();

router.get('/', function(req, res) {
		console.log('get request');
		res.render('index');
});

module.exports = router;
