# CPSC-473-Assignment4
Trivia API For Professor Avery's class

Database is connected to MLabs with a prepopulated database

Redis is not functioning quite yet

To Run:
 * Navigate to project directory
 * $npm install
 * $node app.js
 * Go to http://localhost:3000

To Do:
 * Implement Redis to count right & wrong answers
  1. Use client.set to set 'right' and 'wrong' to a count of 0 upon start
  2. Use client.incr to increment right or wrong answer in post /answer
  3. Use client.mget to find 'right' and 'wrong' answer count
 * Correctly send JSON as response
 
Bonus:
 * Make a function in models/trivia.js to return the count the total number of collections
