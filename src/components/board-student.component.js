import React, { Component } from "react";


export default class BoardStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }


  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Welkom Student</h3>
        </header>
      </div>
    );
  }
}
