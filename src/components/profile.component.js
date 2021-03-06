import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
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
                  Profile
              </h2>
        </header>
        <div style={{textAlign:"center"}}>
            <h3>
                <strong>Welcome {currentUser.username}!</strong>
            </h3>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>

            <ul className="campus-ul">
                {currentUser.roles &&
                    currentUser.roles.map((role, index) => <li className="campus-li" key={index} style={{textAlign:"center"}}><strong>Permissions:</strong>{role}</li>)}
            </ul></div>

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
