import React, { Component } from 'react';
import './App.css';

class FormStuff extends Component{
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
    if (this.state.isText){
      return (<div> <input type="radio" name="season" value="winter" onChange={this.updateText}/>
          Text Only
          <br/>
    <input type="radio" name="season" value="spring" onChange = {this.updatePic}/>
  
    Picture Only
    <br/> <br/>
    <p>Subject Here:</p> <input type="text" name="getSubject" value={this.state.subject} onChange = {this.updateState2}/>
      <br/> <br/>
      <p>Text Here:</p> <input type="text" name="getText" value={this.state.text} onChange = {this.updateState}/>
      <br/> <br/></div>);
    }
    else{
      return (<div> <input type="radio" name="season" value="winter" onChange={this.updateText}/>
          Text Only
          <br/>
    <input type="radio" name="season" value="spring" onChange = {this.updatePic}/>
    Picture Only
    <br/> <br/>
    <input type="file" id="picture" name="picture"
          accept=".jpg, .jpeg, .png" value = {this.state.picture} onChange = {this.updateState3}/>
          </div>
);
    }
};
  }


export default FormStuff;