import React, { Component } from "react";

import UserService from "../services/user.service";
import store from "../store";
import subjectService from "../services/subject.service";
import CardSlider from "../components/cardSlider.component";
import personService from "../services/person.service";
import {Card, CardBody, CardText, CardTitle, Col, ListGroup, ListGroupItem, Row} from "reactstrap";
import {Link} from "react-router-dom";
import {HiLocationMarker} from "react-icons/hi";
import {BsFillPersonFill, BsPersonSquare} from "react-icons/all";
import HomeStudentIndienen from "./homeStudentIndienen.component";
import HomeStudentKeuze from "./homeStudentKeuze.component";
import HomeStudentToewijzing from "./homeStudentToewijzing.component";

import dateService from "../services/dateService";


///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


const indienfase = dateService.getIndienfase();
const goedkeurfase = dateService.getGoedkeurfase();
const keuzefase = dateService.getKeuzefase();
const boostfase = dateService.getBoostFase();
const toewijzingsfase = dateService.getToewijzingFase();


class homeStudent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: [],
            keuzesIngediend: false,
            keuzes: "",
            toegewezen: false,
        };
    }

    componentDidMount() {
        const state = store.getState();
        subjectService.getGekregen(state.auth.user.email).then(
            response => {
                this.setState({
                    content: response.data,
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            });
        personService.getHeeftDefinitiefOnderwerp(state.auth.user.email).then(
            response => {
                this.setState({
                    toegewezen: response.data,
                })
            },
            error => {
                this.setState({
                    toegewezen:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            });
        personService.getKeuzesIngediend(state.auth.user.email).then(
            response => {
                this.setState({
                    keuzesIngediend: response.data,
                })
            },
            error => {
                this.setState({
                    keuzesIngediend:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            });
        subjectService.getAllKeuzes(state.auth.user.email).then(
            response => {
                this.setState({
                    keuzes: [response.data[1], response.data[2], response.data[3]],
                })
            },
            error => {
                this.setState({
                    keuzes:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            });
    }

    render() {
        let subjects;
        if(indienfase || goedkeurfase){
            subjects=(<HomeStudentIndienen />);
        }
        else if(keuzefase) {
            subjects = (<HomeStudentKeuze />);
        }
        else if(boostfase) {
            subjects =(<div>
                <h2>Notifications:</h2>
                <header className="jumbotron">
                    <h4>It is up to the promotor to boost you for one of your choices!</h4>
                </header>
            </div>);
        }
        else if(toewijzingsfase){
            subjects=(<HomeStudentToewijzing toegewezen={this.state.toegewezen}/>);
        }
        else {
            subjects =(<div>
                <h2>Notifications:</h2>
                <header className="jumbotron">
                    <h4>The platform is closed now, come back on 8/2 to submit a subject.</h4>
                </header>
            </div>);
        }
        return(<div>
            {subjects}
        </div>);
    }
}

export default homeStudent;
