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
import ShowSubject from "./components/show-subject.component";
// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRouteStudent from "./components/ProtectedRouteStudent";
import protectedRouteBedrijf from "./components/ProtectedRouteBedrijf";
import protectedRouteCoordinator from "./components/ProtectedRouteCoordinator";
import protectedRoutePromotor from "./components/ProtectedRoutePromotor";
import JudgeSubject from "./components/judgeSubjects.component";
import subjectDetails from "./components/subjectDetails.component";
import TopSubjects from "./components/topSubjects.component";
import ProtectedRouteBedrijf from "./components/ProtectedRouteBedrijf";
import AddSubjectBedrijf from "./components/add-subject-bedrijf.component";
import ProtectedRoutePromotor from "./components/ProtectedRoutePromotor";
import listSubjectsPromotor from "./components/ListSubjectsPromotor.component";
import SubjectDetailsPromotor from "./components/subjectDetailsPromotor.component";
import ProtectedRouteCoordinator from "./components/ProtectedRouteCoordinator";
import StudentToewijzing from "./components/studentToewijzing.component";


import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';
import {RiMenuLine} from "react-icons/all";



//indienen als promotor
const indienenPromotorStart = new Date(2022, 2, 8);
const indienenPromotorEind = new Date(2022, 3, 30);

//goedkeuren
const goedkeurenStart = indienenPromotorStart;
const goedkeurenEind = new Date(2022, 3, 31);

//keuzeStudent
const keuzeStudentStart = new Date(2022, 4, 1);
const keuzeStudentEind = new Date(2022, 4, 30);

//boost
const boostStart = new Date(2022, 5, 1);
const boostEind = new Date(2022, 5, 15);

//finaletoewijzing
const toewijzingStart = new Date(2022, 5, 16);
const toewijzingEind = new Date(2022, 5, 20);



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
    console.log("user", user);

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
            <Link to={"/"} className="navbar-brand ">
              KU LEUVEN
            </Link>

            <input type="checkbox" id="toggler" />
            <label htmlFor="toggler"><RiMenuLine/></label>

            <div className="navbar-nav mr-auto menu">
              <ul className="nav-list">
                <li className="nav-item">
                  <Link to={"/home"} className="nav-link">
                    Home
                  </Link>
                </li>

                {showCoordinatorBoard && (
                    <li className="nav-item">
                      <Link to={"/studentToewijzing"} className="nav-link">
                        Student toewijzing
                      </Link>
                    </li>
                )}

                {showCoordinatorBoard && (
                    <li className="nav-item">
                      <Link to={"/judgeSubjects"} className="nav-link">
                        Subjects
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
                      <Link to={"/subjects"} className="nav-link">
                        Subjects
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

                {showBedrijfBoard && (
                    <li className="nav-item">
                      <Link to={"/addSubjectBedrijf"} className="nav-link">
                        Add subject
                      </Link>
                    </li>
                )}

                {showPromotorBoard && (
                    <li className="nav-item">
                      <Link to={`/listSubjectsPromotor/${this.props.user.username}`} className="nav-link">
                        Boost Students
                      </Link>
                    </li>
                )}
              </ul>

            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto menu">
                <ul className="nav-list">
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
                </ul>
              </div>
            ) : (
              <div className="navbar-nav ml-auto menu">
                <ul className="nav-list">
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
                </ul>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />

              <Route exact path="/user" component={BoardUser} />
              <ProtectedRouteStudent exact path="/student" component={BoardStudent} />
              <Route exact path="/promotor" component={BoardPromotor} />
              <Route exact path="/bedrijf" component={BoardBedrijf} />
              <Route exact path="/coordinator" component={BoardCoordinator} />
              <ProtectedRoute exact path="/addsubject" component={AddSubject} />
              <ProtectedRoute exact path="/subjects" component={ShowSubject} />
              <ProtectedRoute exact path="/judgeSubjects" component={JudgeSubject} />
              <Route exact path="/subjectDetails/:name" component={subjectDetails} />
              <ProtectedRouteStudent exact path="/topSubjects" component={TopSubjects} />
              <ProtectedRouteBedrijf exact path="/addSubjectBedrijf" component={AddSubjectBedrijf} />
              <ProtectedRoutePromotor exact path="/listSubjectsPromotor/:name" component={listSubjectsPromotor} />
              <ProtectedRoutePromotor exact path="/subjectDetailsPromotor/:id" component={SubjectDetailsPromotor} />
              <ProtectedRouteCoordinator exact path="/studentToewijzing" component={StudentToewijzing}/>

            </Switch>
          </div>
          {/* <AuthVerify logOut={this.logOut}/> */}
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const {user} = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
