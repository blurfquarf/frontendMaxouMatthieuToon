import {Component} from "react";
import React from "react";
import subjectService from "../services/subject.service";
import {
    Card, CardBody, CardText, CardTitle,
    Col,
    Container, ListGroup, ListGroupItem, Row
} from 'reactstrap';
import {BsPersonSquare} from "react-icons/all";
import {HiLocationMarker} from "react-icons/hi";
import {Link} from "react-router-dom";


export default class subjectDetails extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            content : [],
        };
    }

    componentDidMount(){
        console.log("params.name", this.props.match.params.name);
        subjectService.getOneSubject(this.props.match.params.name).then(
            response => {
                this.setState({
                    content: response.data,
                });
                console.log("response: ", response.data);
                console.log("params.name", this.props.match.params);
                console.log("subject: ", this.state.subject);
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
    }

    render () {
        const {content} = this.state;
        console.log("content", content);
        return(
            <div className="center-content">
                {content.map(subject => {
                    console.log(subject);
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
                                    <ul>
                                        {subject.copromotoren.map(function(d, idx){
                                            return (<li key={idx}  className="campus-li">{d.name}</li>)
                                        })}
                                    </ul>
                                </div>)
                    }
                    else {
                        copromotoren = (
                            <div>
                                <p>There are no co-promotors for this subject</p>
                            </div>
                        )
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
                        </Container>
                    );
                })}
            </div>
        );
    }
}