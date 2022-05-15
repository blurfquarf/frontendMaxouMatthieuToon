import React, { Component } from "react";

import UserService from "../services/user.service";
import store from "../store";
import subjectService from "../services/subject.service";
import CardSlider from "../components/cardSlider.component";
import dateService from "../services/dateService";

const indienfase = dateService.getIndienfase();
const geenfase = dateService.getGeenFase();
const toewijsfase = dateService.getToewijzingFase();
const goedkeurfase = dateService.getGoedkeurfase();
const keuzefase =dateService.getKeuzefase();
const boostfase = dateService.getBoostFase();

class homePromotor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: [],
        };
    }

    componentDidMount() {
        const state = store.getState();
        subjectService.getAllSubsPerPro(state.auth.user.email).then(
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
                    <h2>Approved subjects:</h2>
                    <CardSlider cards={this.state.content.filter(subject => subject.nietMeerBeschikbaar === false)}/>
                </div>}
            </div>);
        }
        else {
            subjects = (<div>
                <header className="jumbotron">
                    <h4>You currently have no subjects assigned.</h4>
                </header>
            </div>)
        }
        return (
            <div>
                <h2>Notifications:</h2>
                {(!geenfase) ? <header className="jumbotron">
                    {(indienfase) && <h4>You can submit subjects now.</h4>}
                    {(keuzefase) && <h4>Students can now submit their choices.</h4>}
                    {(boostfase) && <h4>You can now boost students for subjects.</h4>}
                    {(toewijsfase) &&  <h4>Students can now be assigned to subjects.</h4>}
                    </header>
                    : <header className="jumbotron">
                        <h4>You can submit subjects starting from 8/02 until 30/3.</h4>
                    </header>}
                { subjects}
            </div>
        );
    }
}

export default homePromotor;
