// Assignment4 app.js
// Authors: Bryan Bonner & Patrick Ryan

// Dependencies found in package.json
const express = require('express'),
      expressValidator = require('express-validator'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      mongo = require('mongodb'),
      path = require('path'),
      exphbs = require('express-handlebars');

// Create our Routes & Schema vars
var routes = require('./routes/index'),
    trivia = require('./routes/trivias'),
    Trivia = require('./models/trivia');

// Initialize our Express app
var app = express();

// Set view path directory
app.set('views', path)
app.set('views', path.join(__dirname, 'views'));

// Set public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set our view engine as handlebars - layout will be our template layout
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// Body Parser for JSON & URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Connect to the DB
mongoose.connect('mongodb://assign4:assign4@ds017672.mlab.com:17672/assign4');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Successfully connected to Database");
});




// Set our routes
app.use('/', routes);
app.use('/trivia', trivia);

// Listen @ localhost:3000
app.listen(3000);
console.log('Listening on port 3000');
