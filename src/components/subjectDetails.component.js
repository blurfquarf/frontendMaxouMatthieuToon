import {Component} from "react";
import React from "react";
import subjectService from "../services/subject.service";
import {
    Col,
    Container, ListGroupItem, Row
} from 'reactstrap';

export default class subjectDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject : [],
        };
    }

    componentDidMount(){
        subjectService.getOneSubject(this.props.match.params.name).then(
            response => {
                this.setState({
                    subject: response.data,
                });
                console.log("response: ", response.data);
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
        const {subject} = this.state;
        console.log(subject);
        return(
            <div className="center-content">
                {subject.map(subject => {
                    let campussen;
                    if(subject.campussen.length != 0){
                        campussen = (
                            <div style={{display:"flex"}}>
                                <ul>
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
                                <p>{subject.promotor}</p>
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