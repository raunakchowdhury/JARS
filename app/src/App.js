import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      text: '',
      subject: '',
      picture: '',
      isText: true,
      isPicture: false,
      answers: [],
    }

    this.updateState2 = this.updateState2.bind(this);
    this.updateState3 = this.updateState3.bind(this);

    this.updateText = this.updateText.bind(this);
    this.updatePic = this.updatePic.bind(this);

    this.drawInputs = this.drawInputs.bind(this);
  }

  updateState = e => {
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
  process = () => {
    const theState = this.state;
      var searchGoogle = function (query) {
          var api_key = "AIzaSyDQgwH5iRsL6J7w88aocaYKBfjQ54NVt8s";
          var toSearch = "https://www.googleapis.com/customsearch/v1?key=" + api_key + "&cx=009860273137102557130:i_4fb9pope0&q="+encodeURI(query);
          var request = require('request');
          request(toSearch, function (error, response, body) {
           JSON.parse(body).items.map(item=>{
            var id = item.link.split("/")[3];
            var client_id = 'auZgDjSJ9E';
            const api_link = 'https://api.quizlet.com/2.0/sets/' + id + '?client_id='+ client_id +'&whitespace=1';

            request(api_link, function (error, response, body) {
            JSON.parse(body).terms.map(aterm=>{
              if (aterm.term.toLowerCase()===theState.text.toLowerCase()){
                theState.answers.push(aterm.definition);
              }
            }) // Print the HTML for the Google homepage.
          });
          }); // Print the HTML for the Google homepage.
        });
      }
      searchGoogle(this.state.text);
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

  drawInputs(){
    if (this.state.isText){
      return (<div><br/> <br/>
        <p>Subject Here:</p> <input type="text" name="getSubject" value={this.state.subject} onChange = {this.updateState2}/>
          <br/> <br/>
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
        </div>
    );
  }
}


export default App;
