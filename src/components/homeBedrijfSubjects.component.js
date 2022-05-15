import React, { Component } from "react";

import UserService from "../services/user.service";
import store from "../store";
import subjectService from "../services/subject.service";
import CardSlider from "../components/cardSlider.component";
import dateService from "../services/dateService";

const indienfase = dateService.getIndienfase();
const geenfase = dateService.getGeenFase();
const toewijsfase = dateService.getToewijzingFase();

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
        console.log("valuesTW:", valuesTW);

        const aantal = valuesTW.length + valuesApp.length;

        return (
            <div>
                <div>
                    <h2>Notifications:</h2>
                    {(!geenfase) ? <header className="jumbotron">
                        {(aantal == 1 && !toewijsfase) ? <h4>Your company has submitted {aantal} subject.</h4>
                            : <h4>Your company has submitted {aantal} subjects.</h4>}

                        {toewijsfase && <div>
                            {valuesTW.length == 1 ? <h4>There is {valuesTW.length} subject assigned to a student.</h4>
                                : <h4>There are {valuesTW.length} subjects assigned to students.</h4>}
                        </div>}


                    </header>
                    : <header className="jumbotron">
                            <h4>You can submit subjects starting from 8/02 until 30/3.</h4>
                        </header>}
                </div>
                {(valuesTW.length != 0 && toewijsfase ) && <div style={{marginTop:"0.5rem"}}>
                    <h4>The following subjects have been assigned to a student.</h4>
                    <CardSlider cards={valuesTW} students={keysTW} />
                </div>}
                {(valuesApp.length != 0 && !geenfase) && <div style={{marginTop:"2rem"}}>
                    <h4>The following subjects have been approved but aren't assigned yet.</h4>
                    <CardSlider cards={valuesApp} />
                </div>}
            </div>
        );
    }
}

export default homeBedrijfSubjects;
