import React, { Component } from "react";

import UserService from "../services/user.service";
import store from "../store";
import subjectService from "../services/subject.service";
import CardSlider from "../components/cardSlider.component";

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
        else {
            subjects = (<div>
                <header className="jumbotron">
                    <h4>You currently have no subjects assigned.</h4>
                </header>
            </div>)
        }
        return (
            <div>
                {subjects}
            </div>
        );
    }
}

export default homePromotor;
