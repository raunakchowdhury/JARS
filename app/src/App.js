import React, { Component } from 'react';
import './App.css';
import FormExample from './FormExample.js';
import './api.js'

class App extends Component {
  constructor(props){
  super(props);

  this.state = {
    text: '',
    subject: '',
    picture: '',
  }
  this.updateState = this.updateState.bind(this);
  this.updateState2 = this.updateState2.bind(this);
  this.updateState3 = this.updateState3.bind(this);
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

  shout(){
    //fetch the image / text
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="App-title"> Quizlet <small> by JARS </small></h1>
        </div>

        <form className="main-form" method="get">
        <input type="radio" name="season" value="winter" checked/>
          Text Only
          <br/>
    <input type="radio" name="season" value="spring"/>
    Picture Only
    <br/><br/>
        Subject Here: <input type="text" name="getSubject" value={this.state.subject} onChange = {this.updateState2}/>
      <br/> <br/>
      Text Here: <input type="text" name="getText" value={this.state.text} onChange = {this.updateState}/>
      <br/> <br/>
      <input type="file" id="picture" name="picture"
          accept=".jpg, .jpeg, .png" value = {this.state.picture} onChange = {this.updateState3}/>

        </form>
        <br/><br/>

<button type="submit" onClick={this.shout}>Submit</button>
        </div>
    );
  }
}


export default App;
