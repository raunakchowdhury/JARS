import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      text: '',
      isText: true,
      isPicture: false,
      answers: [],
    }
  }

  updateState = e => {
    this.setState({text: e.target.value});
  }

  updateState2= e => {
    this.setState({subject: e.target.value});
  }

  updateText = () => {
    {this.setState({text: ""})}
    this.setState({isText:true,isPicture:false});
  }

  updatePic = () => {
    {this.setState({text: ""})}
    this.setState({isPicture:true,isText:false});
  }

  resetState = () => {
    this.setState({
      isText: true,
      isPicture: false,
      answers: [],
    });
  }

  //  shout(){
  //fetch the image / text
  //  Api.process('spanish','silla');
  //}
  process = () => {
    if (this.state.isPicture){
      this.formToOCR();
    }
    document.getElementById('writeto').innerHTML = '';
    this.resetState();
    var theState = this.state;
    var realThis = this;
    var searchGoogle = query => {
      var api_key = "AIzaSyBnUY5eUJkAcN43eBY3fxiTuKHLWHT8HHM";
      var toSearch = "https://www.googleapis.com/customsearch/v1?key=" + api_key + "&cx=009860273137102557130:i_4fb9pope0&q="+encodeURI(query);
      var request = require('request');
      var allDefs = theState.answers;
      request(toSearch, function (error, response, body) {
        var bigResults = JSON.parse(body);
        if ("items" in bigResults){
          var results = bigResults.items;
        var client_id = 'auZgDjSJ9E';
        for (var i = 0; i < results.length; i++) {
          console.log(results);
          let aLink = results[i].link;
          var id = aLink.split("/")[3];
          const api_link = 'https://api.quizlet.com/2.0/sets/' + id + '?client_id='+ client_id +'&whitespace=1';
          request(api_link, function (error, response, body) {
            var urllink =JSON.parse(body).url;
            var allTerms = JSON.parse(body).terms;
            if (allTerms !== undefined && allTerms.length !== 0 ) {
              document.getElementById('writeto').innerHTML += '<ul>';
              for (var j = 0; j < allTerms.length; j++) {
                //console.log(terms[j].term.toLowerCase() + ", " + query.toLowerCase());
                if (allTerms[j].term.toLowerCase().includes(query.toLowerCase())){
                  allDefs.push(allTerms[j].definition);
                  document.getElementById('writeto').innerHTML += '<li>' + allTerms[j].definition + '</li>'+ '<a href="' + urllink + '">Link to Quizlet</a>';
                }
              }
              document.getElementById('writeto').innerHTML += '</ul>';
              theState.answers = allDefs;
            }
      });
    }
  } else if (allDefs.length === 0){
    document.getElementById('writeto').innerHTML += '<li> Could not find anything related to your topic</li>';
  }
   
    return allDefs;
  });
}
console.log(this.state.text);
searchGoogle(this.state.text);

//this.setState({text:"",subject:"",answers=[]});
/*var request = require('request');
const api_link = 'https://api.quizlet.com/2.0/search/sets?client_id=auZgDjSJ9E&whitespace=1';
const link = '&q=' + this.state.subject + '&term=' + this.state.text;
const url = encodeURI(api_link + link);
console.log(url);
request(url, function (error, response, body) {
console.log('error:', error); // Print the error if one occurred
console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
console.log('body:', body); // Print the HTML for the Google homepage.
searchGoogle(this.state.text);
}*/
};

drawInputs = () => {
  if (this.state.isText){

    return (<div><br/> <br/>
      <p>Text Here:</p> <input type="text" name="getText" value={this.state.text} onChange = {this.updateState}/>
      <br/><br/></div>);
    }
    else {
      return (<div><br/> <br/>
        
        <input type="file" id="picture" name="picture"
        accept=".jpg, .jpeg, .png" value = {this.state.picture} onChange = {this.updateState3}/>

        <br/><br/></div>);
      }

    }


    render() {

      return (
        
        <div className="App">
        <div className="App-header">
        <h1 className="App-title"> Info Box :) <small> by JARS </small></h1>
        </div>
        <p>
          For text option, type in the text, press submit, and wait for the answer(s) to appear.
        </p>
        <p>
          For picture option, put in a clear picture option with text and press submit for the text of the picture to appear.
          Then, press submit again after the text appears in the text box and wait for answer(s) to appear. 
          Note: If the text does not appear, then there is no answer found for the certain input.
        </p>
        <form className="main-form" id="main" method="get">
       
        <input type="radio" name="season" value="winter" onChange={this.updateText}/>
        Text Only
        <br/>
        <input type="radio" name="season" value="spring" onChange = {this.updatePic}/>

        Picture Only
        {this.drawInputs()}
        </form>
        <button type="submit" onClick={this.process}>Submit</button>
        <br/><br/><br/>
        <div id="writeto"/>
        </div>
      );
    }

   /* getBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        console.log(reader.result);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
   }
  */


    formToOCR = () => {
      var thisThing = this;
      var getBase64 = function(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          //console.log('hi'+reader.result);
          //return reader.result.slice(',')[1];
          //var file = (document.getElementById("picture").files[0]);//"http://d2jaiao3zdxbzm.cloudfront.net/wp-content/uploads/figure-65.png";
          //var img = getBase64(file); // prints the base64 string
          var img = reader.result;//.split(',')[1];
          var key = "e920e09f4f88957";
          var end_url = "https://api.ocr.space/parse/image";
          var data = {
              apikey: key,
              base64Image : img,
          }
          var request = require('request');
          request.post({url:end_url, form:data}, function (err, httpResponse, body) {
            var results = JSON.parse(body);
            if (results !== undefined && results.length !== 0){
              thisThing.setState({text:JSON.parse(body).ParsedResults[0].ParsedText});
              var txt = JSON.parse(body).ParsedResults[0].ParsedText;
              console.log("txt:" + txt);

              thisThing.setState({text: txt.trim().toLowerCase()});
              console.log(thisThing);
            }
      });
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
     }
     var file = (document.getElementById("picture").files[0]);//"http://d2jaiao3zdxbzm.cloudfront.net/wp-content/uploads/figure-65.png";
     getBase64(file); // prints the base64 string

        /*var file = (document.getElementById("picture").files[0]);//"http://d2jaiao3zdxbzm.cloudfront.net/wp-content/uploads/figure-65.png";
        var img = getBase64(file); // prints the base64 string
        var key = "e920e09f4f88957";
        var end_url = "https://api.ocr.space/parse/image";
        var data = {
            apikey: key,
            base64Image : img
        }
        var request = require('request');
        request.post({url:end_url, form:data}, function (err, httpResponse, body) {
              console.log(err, body);
    });*/
  }
}
  export default App;