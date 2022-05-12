import {Component} from "react";
import React from "react";
import subjectService from "../services/subject.service";
import {
    Col,
    Container, ListGroupItem, Row
} from 'reactstrap';
import {BsPeopleFill} from "react-icons/all";
import personService from "../services/person.service";

export default class subjectDetailsPromotor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content : [],
            studenten: [],
        };
    }

    componentDidMount(){
        subjectService.getSubject().then(
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
            }
        );
        personService.getSperSub( this.props.match.params.name).then(
            response => {
                this.setState({
                    studenten: response.data,
                }, () => console.log(this.state.studenten));
            },
            error => {
                this.setState({
                    studenten:
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
        console.log(content);
        return(
            <div className="center-content">
                {this.state.content.filter((content) => content.name == this.props.match.params.name).map(content => {
                    let campussen;
                    if(content.campussen.length != 0){
                        campussen = (
                            <div style={{display:"flex"}}>
                                <ul className="campus-ul">
                                    {content.campussen.map(function(d, idx){
                                        return (<li key={idx}  className="campus-li">{d.name}</li>)
                                    })}
                                </ul>
                            </div>)
                    }
                    let copromotoren;
                    if(content.copromotoren.length !=0){
                        copromotoren = (
                            <div style={{display:"flex"}}>
                                <ul className="campus-ul">
                                    {content.copromotoren.map(function(d, idx){
                                        return (<li key={idx}  className="campus-li">{d.username}</li>)
                                    })}
                                </ul>
                            </div>)
                    }
                    else {
                        copromotoren = (
                            <div>
                                <p>There are no co-promotors for this subject.</p>
                            </div>
                        )
                    }
                    let studenten;
                    if(this.state.studenten.size != 0) {
                        const kiezers = [];
                        {for(let i=0, keys=Object.keys(this.state.studenten), ii=keys.length; i<ii; i++){
                            kiezers[keys[i]] = this.state.studenten[keys[i]];
                        }}
                        studenten = (<div style={{display:"flex"}}>
                                <ul className="campus-ul">
                                    {kiezers.map(student => {
                                        return(<li key={student.id} className="campus-li"><h5>{student.username}</h5></li>);
                                    })}
                                </ul>
                            </div>
                        );
                    }
                    else {
                        studenten = (<div>
                                <p>This subject isn't chosen by a student yet.</p>
                            </div>
                        );
                    }

                    return(
                        <Container key={content.id}>
                            <div>
                                <h1 className="subj-details-title">{content.name}</h1>

                            </div>
                            <div>
                                <h3>Description</h3>
                                <p>{content.description}</p>
                            </div>
                            <div>
                                <h3>Campuses</h3>
                                {campussen}
                            </div>
                            <div>
                                <h3>Promotor</h3>
                                <p>{content.promotor.username}</p>
                            </div>
                            <div>
                                <h3>Co-promotors</h3>
                                {copromotoren}
                            </div>
                            <div>
                                <h3>Gekozen door:</h3>
                                {studenten}
                            </div>
                        </Container>
                    );
                })}
            </div>
        );
    }
}