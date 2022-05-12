import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  render() {
    return (
        <header className="jumbotron">
          <h3>Welkom op het thesisplatform! Kijk gerust even rond!</h3>
        </header>



    );
  }
}
