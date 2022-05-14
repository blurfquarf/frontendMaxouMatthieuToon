import React, { Component } from "react";

import UserService from "../services/user.service";
import store from "../store";
import HomePromotor from "../components/homePromotor.component";
import HomeCoordinator from "../components/homeCoordinator.component";
import HomeStudent from "../components/homeStudent.component";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
        content: "",
    };
  }

  render() {
      const state = store.getState();
      console.log(state);
      let subjects;
      if(state.auth.user.roles[0] == "ROLE_PROMOTOR"){
          subjects = (<HomePromotor />);
      }
      else if(state.auth.user.roles[0] == "ROLE_COORDINATOR") {
          subjects =(<HomeCoordinator />);
      }
      else if(state.auth.user.roles[0] == "ROLE_STUDENT") {
          subjects=(<HomeStudent />);
      }

    return (
        <div>
            <header className="jumbotron">
                <h3>Welkom op het thesisplatform! Kijk gerust even rond! Voor u gelden voorlopig onderstaande zaken:</h3>
            </header>
            {subjects}
        </div>

    );
  }
}
