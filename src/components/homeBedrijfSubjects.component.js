import React, { Component } from "react";

import UserService from "../services/user.service";
import store from "../store";
import subjectService from "../services/subject.service";
import CardSlider from "../components/cardSlider.component";

class homeBedrijfSubjects extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: [],
        };
    }

    render() {

        let keysTW = Object.keys(this.props.subjectsToegewezen);
        let valuesTW = Object.values(this.props.subjectsToegewezen);

        let valuesApp = Object.values(this.props.subjectsApproved);

        const aantal = valuesTW.length + valuesApp.length;

        return (
            <div>
                <div>
                    <h2>Notifications:</h2>
                    <header className="jumbotron">
                        {valuesTW.length == 1 ? <h4>Your company has been linked to {aantal} subject.</h4>
                            : <h4>Your company has been linked to {aantal} subjects.</h4>}

                        {valuesTW.length == 1 ? <h4>There is already {valuesTW.length} subject assigned to a student.</h4>
                                        : <h4>There are already {valuesTW.length} subjects assigned to students.</h4>}
                    </header>
                </div>
                <div style={{marginTop:"0.5rem"}}>
                    <h4>The following subjects have been assigned to a student.</h4>
                    <CardSlider cards={valuesTW} students={keysTW} />
                </div>
                <div style={{marginTop:"2rem"}}>
                    <h4>The following subjects have been approved but aren't assigned yet.</h4>
                    <CardSlider cards={valuesApp} />
                </div>
            </div>
        );
    }
}

export default homeBedrijfSubjects;
