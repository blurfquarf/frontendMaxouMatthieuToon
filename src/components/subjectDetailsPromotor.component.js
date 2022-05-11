import {Component} from "react";
import React from "react";
import subjectService from "../services/subject.service";
import {
    Col,
    Container, ListGroupItem, Row
} from 'reactstrap';
import {BsPeopleFill} from "react-icons/all";

export default class subjectDetailsPromotor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content : [],
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
    }

    render () {
        const {content} = this.state;
        console.log(content);
        return(
            <div className="center-content">
                {content.filter((content) => content.id == this.props.match.params.id).map(content => {
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
                                <ul>
                                    {content.copromotoren.map(function(d, idx){
                                        return (<li key={idx}  className="campus-li">{d.name}</li>)
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
                    if(content.gekozen != 0) {
                        studenten = (<div style={{display:"flex"}}>
                                <p>{content.gekozen}</p>
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