import React, { Component } from 'react';

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

//Get google stuff
var searchGoogle = function (query) {
    var api_key = "AIzaSyDQgwH5iRsL6J7w88aocaYKBfjQ54NVt8s";
    var toSearch = "https://www.googleapis.com/customsearch/v1?key=" + api_key + "&cx=009860273137102557130:i_4fb9pope0&q="+encodeURI(query);
    var request = require('request');
    request(toSearch, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });
}
