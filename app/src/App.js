import React, { Component } from 'react';
import './App.css';
import FormStuff from './FormStuff.js';
import './api.js';

class App extends Component {
  constructor(props){
  super(props);

  this.state = {
    text: '',
    subject: '',
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
        <FormStuff/>
        </form>
        <br/><br/>

<button type="submit" onClick={this.shout}>Submit</button>
        </div>
    );
  }
}


export default App;
