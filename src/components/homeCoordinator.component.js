import React, { Component } from "react";

import store from "../store";
import subjectService from "../services/subject.service";
import CardSlider from "../components/cardSlider.component";
import dateService from "../services/dateService";

const indienfase = dateService.getIndienfase();
const geenfase = dateService.getGeenFase();
const toewijsfase = dateService.getToewijzingFase();
const keuzefase =dateService.getKeuzefase();
const boostfase = dateService.getBoostFase();
const goedkeurfase = dateService.getGoedkeurfase();


class homeCoordinator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: [],
            contentNotApproved: [],
        };
    }

    componentDidMount() {
        const state = store.getState();
        subjectService.getAll(state.auth.user.email).then(
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
        subjectService.getSubject(state.auth.user.email).then(
            response => {
                this.setState({
                    contentNotApproved: response.data,
                });
            },
            error => {
                this.setState({
                    contentNotApproved:
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
        if(this.state.content.length != 0){
            subjects = (<div>
                {toewijsfase && <div style={{marginTop:"1rem", marginBottom:"1rem"}}>
                    <h2>Students have been assigned to the following subjects:</h2>
                    <CardSlider cards={this.state.content.filter(subject => subject.nietMeerBeschikbaar === true)}/>
                </div> }
                {(!geenfase) && <div style={{marginTop:"1rem", marginBottom:"1rem"}}>
                    <h2>Your approved subjects:</h2>
                    <CardSlider cards={this.state.content.filter(subject => subject.nietMeerBeschikbaar === false)}/>
                </div>}
            </div>);
        }
        return (
            <div>
                <div>
                    <h2>Notifications:</h2>
                    {(!geenfase) ? <header className="jumbotron">
                            {(goedkeurfase && !keuzefase) && <h4>There are {this.state.contentNotApproved.length} subjects up for approval.</h4>}
                            {(keuzefase && !goedkeurfase) && <h4>Students can now submit their choices.</h4>}
                            {(boostfase) && <h4>Students can now be boosted by promotors.</h4>}
                            {(toewijsfase) &&  <h4>There are {this.state.content.filter(subject => (subject.approved=== true && subject.nietMeerBeschikbaar === false)).length} subjects that aren't assigned to a student yet.</h4>}
                        </header>
                        : <header className="jumbotron">
                            <h4>The platform will open on 8/02.</h4>
                        </header>}
                </div>
                {subjects}
            </div>
        );
    }
}

export default homeCoordinator;
