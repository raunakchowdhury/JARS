//import React, { Component } from 'react';

//class Api extends Component{


  function process(topic, text){
    var request = require('request');
    const api_link = 'https://api.quizlet.com/2.0/search/sets?access_token=TRNZtNH9vnHg4XdTd9cQyj7CR29VN5SJNd6EcFbE&whitespace=1';
    const link = '&q=spanish&term=silla';

    request(api_link + link, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });
  }
//}

//export default Api; //exporting product from the "country" Api --> exporting JaSON files
