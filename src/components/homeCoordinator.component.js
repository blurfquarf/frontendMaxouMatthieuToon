import React, { Component } from "react";

import UserService from "../services/user.service";
import store from "../store";
import subjectService from "../services/subject.service";
import CardSlider from "../components/cardSlider.component";

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
                <div style={{marginTop:"1rem", marginBottom:"1rem"}}>
                    <h2>Already assigned subjects:</h2>
                    <CardSlider cards={this.state.content.filter(subject => subject.nietMeerBeschikbaar === true)}/>
                </div>
                <div style={{marginTop:"1rem", marginBottom:"1rem"}}>
                    <h2>Approved subjects:</h2>
                    <CardSlider cards={this.state.content.filter(subject => subject.nietMeerBeschikbaar === false)}/>
                </div>
            </div>);
        }
        return (
            <div>
                <div>
                    <h2>Notifications:</h2>
                    <header className="jumbotron">
                        <h4>There are {this.state.contentNotApproved.length} subjects up for approval.</h4>
                        <h4>There are {this.state.content.filter(subject => (subject.approved=== true && subject.nietMeerBeschikbaar === false)).length} subjects that aren't assigned to a student yet.</h4>
                    </header>

                </div>
                {subjects}
            </div>
        );
    }
}

export default homeCoordinator;
