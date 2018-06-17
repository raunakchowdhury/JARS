import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      text: '',
      picture: '',
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

  updateState3 = e => {
    this.setState({picture: e.target.value});
    console.log(e.target.value);
  }

  updateText = () => {
    this.setState({isText:true,isPicture:false});
  }

  updatePic = () => {
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
    document.getElementById('writeto').innerHTML = '';
    this.resetState();
    var theState = this.state;
    var searchGoogle = function (query) {
      var api_key = "AIzaSyC0CzzGJTnT6-eG-4Bsb-9XUH_kyqjlvPA";
      var toSearch = "https://www.googleapis.com/customsearch/v1?key=" + api_key + "&cx=009860273137102557130:i_4fb9pope0&q="+encodeURI(query);
      var request = require('request');
      request(toSearch, function (error, response, body) {
        console.log(body);
        var results = JSON.parse(body).items;
        //console.log(results);
        var allDefs = theState.answers;
        var client_id = 'auZgDjSJ9E';
        for (var i = 0; i < results.length; i++) {
          var aLink = results[i].link;
          var id = aLink.split("/")[3];
          console.log(results);
          console.log(results[i].link);
          const api_link = 'https://api.quizlet.com/2.0/sets/' + id + '?client_id='+ client_id +'&whitespace=1';
          request(api_link, function (error, response, body) {

            var terms = JSON.parse(body).terms;
            if (terms != undefined) {
              document.getElementById('writeto').innerHTML += '<ul>';
              for (var j = 0; j < terms.length; j++) {
                //console.log(terms[j].term.toLowerCase() + ", " + query.toLowerCase());
                if (terms[j].term.toLowerCase().includes(query.toLowerCase())){
                  allDefs.push(terms[j].definition);
                  console.log(terms[j].definition);
                  document.getElementById('writeto').innerHTML += '<li>' + terms[j].definition + '</li>'+ '<a href="' + aLink + '">Link to Quizlet</a>';
                }
              }
              document.getElementById('writeto').innerHTML += '</ul>';
              theState.answers = allDefs;
            }

            /*JSON.parse(body).terms.map(aterm=>{
            if (aterm.term.toLowerCase()===theState.text.toLowerCase()){
            console.log('aterm.definition');
            theState.answers.push(aterm.definition);
          }
        })*/ // Print the HTML for the Google homepage.
      });
    }
    console.log(allDefs);

    return allDefs;
  });
}
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
        <h1 className="App-title"> Quizlet <small> by JARS </small></h1>
        </div>

        <form className="main-form" method="get">
        <input type="radio" name="season" value="winter" onChange={this.updateText}/>
        Text Only
        <br/>
        <input type="radio" name="season" value="spring" onChange = {this.updatePic}/>

        Picture Only
        {this.drawInputs()}
        </form>
        <button type="submit" onClick={this.process}>Submit</button>
        <button type="submit" onClick={this.formToOCR}>Submit</button>
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
      var getBase64 = function(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          //console.log('hi'+reader.result);
          //return reader.result.slice(',')[1];
          //var file = (document.getElementById("picture").files[0]);//"http://d2jaiao3zdxbzm.cloudfront.net/wp-content/uploads/figure-65.png";
          //var img = getBase64(file); // prints the base64 string
          var img = reader.result;//.split(',')[1];
          console.log(img);
          var key = "e920e09f4f88957";
          var end_url = "https://api.ocr.space/parse/image";
          var data = {
              apikey: key,
              base64Image : img,
          }
          console.log(data);
          var request = require('request');
          request.post({url:end_url, form:data}, function (err, httpResponse, body) {
                console.log(err, body, httpResponse, 'hello');
                console.log('hi');
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
