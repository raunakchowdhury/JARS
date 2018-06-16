import React, { Component } from 'react';
import './App.css';
import FormExample from './FormExample.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">  
          <h1 className="App-title">Photo Quizlet <small> by JARS </small></h1>
        </div>
        <p className="App-form"> 
        </p>
        <FormExample/>
        </div>
    );
  }
}


export default App;
