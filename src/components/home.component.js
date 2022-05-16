import React, { Component } from "react";

import store from "../store";
import HomePromotor from "../components/homePromotor.component";
import HomeCoordinator from "../components/homeCoordinator.component";
import HomeStudent from "../components/homeStudent.component";
import HomeBedrijf from "./homeBedrijf.component";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
        content: "",
    };
  }

  render() {
      const state = store.getState();
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
      else if(state.auth.user.roles[0] == "ROLE_BEDRIJF") {
          subjects=(<HomeBedrijf />);
      }
      else {
          subjects=(<header className="jumbotron">
              <h3>Welcome to the thesis platform! Feel free to look around!</h3>
          </header>);
      }

    return (
        <div>
            {subjects}
        </div>

    );
  }
}
