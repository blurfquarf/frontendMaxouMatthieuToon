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



class homeStudent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: [],
            keuzesIngediend: false,
            keuzes: "",
        };
    }

    componentDidMount() {
        const state = store.getState();
        console.log()
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
                console.log(response.data[1]);
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
        //indienen als promotor/student
        const indienenPromotorStart = new Date(2022, 2, 8);
        const indienenPromotorEind = new Date(2022, 3, 30);



        //onderwerpen indienen van indienenpromotorstart tot goedkeureneind
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


        ///////////////////////////////////////////////////////////////
        //const currentDate = new Date(2022, 5, 20);
        const currentDate = new Date(2022, 4, 4);
        ///////////////////////////////////////////////////////////////

        let subjects;
        console.log(indienenPromotorStart <= currentDate && currentDate <= goedkeurenEind);
        if(indienenPromotorStart <= currentDate && currentDate <= goedkeurenEind){
            subjects=(<HomeStudentIndienen />);
        }
        else if(keuzeStudentStart<=currentDate && currentDate <=keuzeStudentEind) {
            subjects = (<HomeStudentKeuze />);
        }
        return(<div>
            {subjects}
        </div>);
    }
}

export default homeStudent;
