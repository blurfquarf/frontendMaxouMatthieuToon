import React, { Component } from "react";
import subjectService from "../services/subject.service";
import {
    CardText, CardBody,
    CardTitle, Row, Col, ListGroup, ListGroupItem
} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom";
import {HiLocationMarker} from "react-icons/hi";
import {BsFillPersonFill, BsPersonSquare} from "react-icons/all";
import store from "../store";
import dateService from "../services/dateService";


const keuzefase = dateService.getKeuzefase();


export default class ShowSubject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [],
            date:"",
        };
    }

    componentDidMount(){
        const state = store.getState();
        subjectService.getTargetSubsStuds(state.auth.user.email).then(
            response => {
                this.setState({
                    content: response.data
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

    render() {
        const {content} = this.state;

        return (
            <div>
                <Row xs={2} className="center-content">
                    <Col>
                        <h1>Subjects</h1>
                    </Col>
                    {keuzefase && <Col>
                        <div style={{float: "right"}}>
                            <Link className="btn btn-primary link-btn" to="/topSubjects">Submit Top 3</Link>
                        </div>
                    </Col>}
                </Row>
                <div className="subject-wrapper">
                    {content.map(subject => {
                        let campussen;
                        if(subject.campussen.length != 0){
                            campussen = (<ListGroupItem>
                                <Row xs={2}>
                                    <Col className="col-1"><HiLocationMarker /></Col>
                                    <Col style={{display:"flex"}}>
                                        <ul className="campus-ul">
                                            {subject.campussen.map(function(d, idx){
                                                return (<li key={idx}  className="campus-li">{d.name}</li>)
                                            })}
                                        </ul>
                                    </Col>
                                </Row>
                            </ListGroupItem>)
                        }
                        let copromotoren;
                        if(subject.copromotoren.length != 0){
                            copromotoren = (<ListGroupItem>
                                <Row xs={2}>
                                    <Col className="col-1"><BsFillPersonFill/> </Col>
                                    <Col>
                                        <ul className="campus-ul">
                                            {subject.copromotoren.map(function(d, idx){
                                                return (<li key={idx}  className="campus-li">{d.username}</li>)
                                            })}
                                        </ul>
                                    </Col>
                                </Row>
                            </ListGroupItem>)
                        }
                        let promotor;
                        if(subject.promotor != null){
                            promotor = (<ListGroupItem>
                                <Row xs={2}>
                                    <Col className="col-1"><BsPersonSquare/></Col>
                                    <Col style={{display: "flex"}} className="col-10">
                                        <p style={{textAlign:"left"}}>{subject.promotor.username}</p>
                                    </Col>
                                </Row>
                            </ListGroupItem>);
                        }
                        else{
                            promotor = (<ListGroupItem>
                                <Row xs={2}>
                                    <Col className="col-1"><BsPersonSquare/></Col>
                                    <Col style={{display: "flex"}} className="col-10">
                                        <p style={{textAlign:"left"}}>no promotor available yet</p>
                                    </Col>
                                </Row>
                            </ListGroupItem>);
                        }
                        return (
                            <div key={subject.id} >
                                <div className="subject-card">
                                    <CardBody>
                                        <CardTitle tag="h5">{subject.name}</CardTitle>
                                        <CardText>
                                            {subject.description}
                                        </CardText>
                                    </CardBody>
                                    <ListGroup className="list-group-flush">
                                        {campussen}
                                        {promotor}
                                        {copromotoren}
                                    </ListGroup>
                                    <Link to={`/subjectDetails/${subject.name}`} className="btn btn-primary">Details</Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}