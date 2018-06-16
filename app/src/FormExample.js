import React, { Component } from 'react';
import {form,FormGroup,ControlLabel,FormControl} from 'react-bootstrap';
import base64Img from 'base64-img';
import axios from 'axios';

var options =  { 
    apikey: 'fca5393dd988957',
    language: 'eng', // Português
    filetype: 'PNG',
    isOverlayRequired: true,
    base64Image: '',
  };
  const imageFile = "imageFile.png";

class FormExample extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: ''
    };
  }

  handleChange(e) {
    this.setState({ value: e.target.value});
  }


  fetchThing(){
    return fetch('https://api.ocr.space/parse/image', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    apikey: 'fca5393dd988957',
    language: 'eng',
    filetype: 'PNG',
    isOverlayRequired: true,
    file: 'imageFile.png',
  })
}) 
  }

  render() {
    return (
      <form>
        <FormGroup
          controlId="formBasicText"
        >
          <FormControl
            type="file"
            value={this.state.value}
            placeholder="Enter Image"
            onChange={this.handleChange}
          />
        </FormGroup>
         <button type="button" onClick={this.fetchThing}>Submit</button>
      </form>
    );
  }
}

export default FormExample;