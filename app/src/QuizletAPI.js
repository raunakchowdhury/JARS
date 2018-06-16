import React, { Component } from 'react';

const api = 'https://api.quizlet.com/2.0/';
const defaultQuery = '';

class QuizletAPI extends Component{
  constructor(props){
    super(props);

    this.state = {
      hits : []
    };
  }

  componentDidMount(){
      fetch(api + defaultQuery) //fetch from api
      .then(response => { //set a new var to the json output of the query
        if (response.ok){
          response = response.json();
          console.log(response);
          return response;
        }
        else {
          throw new Error ('Blame Jason for all bugs');
        }
      })
      .then(data => this.setState({ hits: data.hits })); //then set the hits var to the json stuff
  }

}
