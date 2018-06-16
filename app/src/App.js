import React, { Component } from 'react';
import './App.css';
import FormExample from './FormExample.js';

class App extends Component {
  constructor(props){
  super(props);

  this.state = {
    pic: '',
    subject: ''
  }
  this.updateState = this.updateState.bind(this);
  this.updateState2 = this.updateState2.bind(this);
  }

  updateState(e) {
    this.setState({pic: e.target.value});
  }

  updateState2(e) {
    this.setState({subject: e.target.value});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">  
          <h1 className="App-title"> Quizlet <small> by JARS </small></h1>
        </div>

        <form className="main-form" method="get">
        Subject Here: <input type="text" name="getSubject" value={this.state.subject} onChange = {this.updateState2}/>
      <br/> <br/>
      Text Here: <input type="text" name="getText" value={this.state.pic} onChange = {this.updateState}/>
      <br/> <br/>
      <button type="submit">Submit</button>
      {console.log(this.state.pic)}
      {console.log(this.state.subject)}
        </form>

        </div>
    );
  }
}


export default App;
