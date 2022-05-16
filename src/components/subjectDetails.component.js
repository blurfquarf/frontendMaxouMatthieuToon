import {Component} from "react";
import React from "react";
import subjectService from "../services/subject.service";
import {Container} from 'reactstrap';
import personService from "../services/person.service";

export default class subjectDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content : [],
            student:"",
        };
    }

    componentDidMount(){
        subjectService.getOneSubject(this.props.match.params.name).then(
            response => {
                this.setState({
                    content: response.data,
                });
            },
            error => {
                this.setState({
                    subject:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
        personService.getToegewezenStudent(this.props.match.params.name).then(
            response => {
                this.setState({
                    student: response.data,
                });
            },
            error => {
                this.setState({
                    student:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render () {
        const {content} = this.state;
        return(
            <div className="center-content">
                {content.map(subject => {
                    let campussen;
                    if(subject.campussen.length != 0){
                        campussen = (
                            <div style={{display:"flex"}}>
                                <ul className="campus-ul">
                                    {subject.campussen.map(function(d, idx){
                                        return (<li key={idx}  className="campus-li">{d.name}</li>)
                                    })}
                                </ul>
                            </div>)
                    }
                    let copromotoren;
                    if(subject.copromotoren.length !=0){
                        copromotoren = (
                                <div style={{display:"flex"}}>
                                    <ul className="campus-ul">
                                        {subject.copromotoren.map(function(d, idx){
                                            return (<li key={idx}  className="campus-li">{d.username}</li>)
                                        })}
                                    </ul>
                                </div>);
                    }
                    else {
                        copromotoren = (
                            <div>
                                <p>There are no co-promotors for this subject</p>
                            </div>
                        );
                    }
                    let promotor;
                    if(subject.promotor != null){
                        promotor = (<div>
                            <p>{subject.promotor.username}</p>
                        </div>);
                    }
                    else {
                        promotor = (<div>
                            <p>no promotor available yet</p>
                        </div>);
                    }
                    let opleiding;
                    if(subject.opleidingen != null){
                        opleiding =(<div>
                            <ul className="campus-ul">
                                {subject.opleidingen.map(function(d, idx){
                                    return (<li key={idx}  className="campus-li">{d.name}</li>)
                                })}
                            </ul>
                        </div>);
                    }
                    let Toegewezenstudent;
                    if(this.state.student != null) {
                        Toegewezenstudent=(<div>
                            <h3>Assigned student:</h3>
                            <p>{this.state.student}</p>
                        </div>);
                    }
                    else {
                        Toegewezenstudent=(<div>
                            <h3>This subject isn't assigned to a student yet.</h3>
                        </div>);
                    }

                    return(
                        <Container key={subject.id}>
                            <div>
                                <h1 className="subj-details-title">{subject.name}</h1>
                            </div>
                            <div>
                                <h3>Description</h3>
                                <p>{subject.description}</p>
                            </div>
                            <div>
                                <h3>Campuses</h3>
                                {campussen}
                            </div>
                            <div>
                                <h3>Promotor</h3>
                                {promotor}
                            </div>
                            <div>
                                <h3>Co-promotors</h3>
                                {copromotoren}
                            </div>
                            <div>
                                <h3>Education:</h3>
                                {opleiding}
                            </div>
                            {Toegewezenstudent}
                        </Container>
                    );
                })}
            </div>
        );
    }
}