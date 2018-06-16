var request = require('request');
request('https://api.quizlet.com/2.0/search/sets?access_token=TRNZtNH9vnHg4XdTd9cQyj7CR29VN5SJNd6EcFbE&whitespace=1&q=spanish&term=silla', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
