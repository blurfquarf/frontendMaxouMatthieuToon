import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardBedrijf from "./components/board-bedrijf.component";
import BoardStudent from "./components/board-student.component";
import BoardCoordinator from "./components/board-coordinator.component";
import BoardPromotor from "./components/board-promotor.component";
import AddSubject from "./components/add-subject.component";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRouteStudent from "./components/ProtectedRouteStudent";
import protectedRouteBedrijf from "./components/ProtectedRouteBedrijf";
import protectedRouteCoordinator from "./components/ProtectedRouteCoordinator";
import protectedRoutePromotor from "./components/ProtectedRoutePromotor";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showBedrijfBoard: false,
      showPromotorBoard: false,
      showStudentBoard: false,
      showCoordinatorBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showBedrijfBoard: user.roles.includes("ROLE_BEDRIJF"),
        showStudentBoard: user.roles.includes("ROLE_STUDENT"),
        showCoordinatorBoard: user.roles.includes("ROLE_COORDINATOR"),
        showPromotorBoard: user.roles.includes("ROLE_PROMOTOR"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
      showBedrijfBoard: false,
      showPromotorBoard: false,
      showStudentBoard: false,
      showCoordinatorBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showBedrijfBoard, showPromotorBoard,
      showStudentBoard, showCoordinatorBoard} = this.state;

    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand-sm navbar-custom">
            <Link to={"/"} className="navbar-brand">
              KU LEUVEN
            </Link>

            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              {showCoordinatorBoard && (
                  <li className="nav-item">
                    <Link to={"/student toewijzing"} className="nav-link">
                      Student toewijzing
                    </Link>
                  </li>
              )}

              {showStudentBoard && (
                <li className="nav-item">
                  <Link to={"/addSubject"} className="nav-link">
                    Add Subject
                  </Link>
                </li>
              )}

              {showStudentBoard && (
                  <li className="nav-item">
                    <Link to={"/student"} className="nav-link">
                      Student Dashboard
                    </Link>
                  </li>
              )}

              {/*
              {currentUser && (
                <li className="nav-item">
                  <Link to={"/subjects"} className="nav-link">
                    Subjects
                  </Link>
                </li>
              )}
              */}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Registreren als bedrijf
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />

              <Route path="/user" component={BoardUser} />
              <ProtectedRouteStudent path="/student" component={BoardStudent} />
              <Route path="/promotor" component={BoardPromotor} />
              <Route path="/bedrijf" component={BoardBedrijf} />
              <Route path="/coordinator" component={BoardCoordinator} />
              <ProtectedRoute path="/addsubject" component={AddSubject} />
            </Switch>
          </div>

          {/* <AuthVerify logOut={this.logOut}/> */}
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
