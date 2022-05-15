import React, { Component } from "react";
import store from "../store";
import subjectService from "../services/subject.service";
import CardSlider from "../components/cardSlider.component";
import HomeBedrijfSubjects from "./homeBedrijfSubjects.component";

class homeBedrijf extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contentToegewezen: [],
            contentApproved: [],
        };
    }

    componentDidMount() {
        const state = store.getState();
        subjectService.getStudMetBedrijf(state.auth.user.email).then(
            response => {
                this.setState({
                    contentToegewezen: response.data,
                });
            },
            error => {
                this.setState({
                    contentToegewezen:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            });
        subjectService.getAllForBedrijf(state.auth.user.email).then(
            response => {
                this.setState({
                    contentApproved: response.data,
                });
            },
            error => {
                this.setState({
                    contentApproved:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            });
    }

    render() {
        console.log("content1",this.state.contentToegewezen);
        console.log("content2",this.state.contentApproved);
        return(<div>
            <HomeBedrijfSubjects subjectsToegewezen={this.state.contentToegewezen} subjectsApproved={this.state.contentApproved} />
        </div>);

        {/*
        for(const [studentName, subject] of this.state.content.entries()){
            console.log("[studentName, Subject]", studentName, subject);
        }
        let subjects;
        const keuzes = [];
        let kiezers1 = [];
        let kiezers2 = [];
        let kiezers3 = [];
        for(let i=0, keys=Object.keys(this.state.content), ii=keys.length; i<ii; i++){
            keuzes[keys[i]] = this.state.studenten[keys[i]];
            for(let j=1; j<keuzes.length; j++){
                if(j==1){
                    kiezers1 = keuzes[j];
                }
                if(j==2){
                    kiezers2 = keuzes[j];
                }
                if(j==3) {
                    kiezers3 = keuzes[j];
                }
            }
        }
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
        */}
        return (
            <div>
                <div>
                    <h2>Notifications:</h2>
                    <header className="jumbotron">
                        <h4>Bedrijf</h4>
                    </header>

                </div>
            </div>
        );
    }
}

export default homeBedrijf;
