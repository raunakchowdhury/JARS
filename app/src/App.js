import React, { Component } from 'react';
import './App.css';
import FormStuff from './FormStuff.js';
import Api from './Api.js';

class App extends Component {
  constructor(props){
  super(props);

  this.state = {
    text: 'spanish',
    subject: 'silla',
    picture: '',
    isText: true,
    isPicture: false,
  }

  this.updateState = this.updateState.bind(this);
  this.updateState2 = this.updateState2.bind(this);
  this.updateState3 = this.updateState3.bind(this);

  this.updateText = this.updateText.bind(this);
  this.updatePic = this.updatePic.bind(this);
  }

  updateState(e) {
    this.setState({text: e.target.value});
  }

  updateState2(e) {
    this.setState({subject: e.target.value});
  }

  updateState3(e) {
    this.setState({picture: e.target.value});
  }

updateText(){
  this.setState({isText:true,isPicture:false});
}

updatePic(){
  this.setState({isPicture:true,isText:false});
}

//  shout(){
    //fetch the image / text
  //  Api.process('spanish','silla');
  //}
  process(){
    var request = require('request');
    const api_link = 'https://api.quizlet.com/2.0/search/sets?client_id=auZgDjSJ9E&whitespace=1';
    const link = '&q=' + this.state.subject + '&term=' + this.state.text;

    request(api_link + link, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="App-title"> Quizlet <small> by JARS </small></h1>
        </div>

        <form className="main-form" method="get">
        <FormStuff/>
        </form>
        <br/><br/>

<button type="submit" onClick={this.process}>Submit</button>
        </div>
    );
  }
}


export default App;
