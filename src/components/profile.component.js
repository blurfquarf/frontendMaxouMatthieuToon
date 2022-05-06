import React, { Component } from "react";
import {Link, Redirect} from 'react-router-dom';
import { connect } from "react-redux";

class Profile extends Component {

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="container">
          <header className="jumbotron">
              <h2>
                  Profiel
              </h2>
        </header>
          <h3>
              <strong>Welkom {currentUser.username}</strong>
          </h3>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <strong>Machtigingen:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);
