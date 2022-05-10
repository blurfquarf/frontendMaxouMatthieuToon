import React, { Component } from "react";
import subjectService from "../services/subject.service";
import {
    Card, CardText, CardBody,
    CardTitle, Container, Row, Col, ListGroup, ListGroupItem
} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom";
import {HiLocationMarker} from "react-icons/hi";
import {BsFillPersonFill, BsPersonSquare} from "react-icons/all";


export default class ShowSubject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: []
        };
    }

    componentDidMount(){
        subjectService.getSubject().then(
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
        console.log("content: ", content);

        return (
            <div>
                <Row xs={2} className="center-content">
                    <Col>
                        <h1>Subjects</h1>
                    </Col>
                    <Col>
                        <div style={{float: "right"}}>
                            <Link className="btn btn-primary link-btn" to="/topSubjects">Submit Top 3</Link>
                        </div>
                    </Col>
                </Row>
                <div className="subject-wrapper">
                    {content.map(content => {
                        let campussen;
                        if(content.campussen.length != 0){
                            campussen = (<ListGroupItem>
                                <Row xs={2}>
                                    <Col className="col-1"><HiLocationMarker /></Col>
                                    <Col style={{display:"flex"}}>
                                        <ul>
                                            {content.campussen.map(function(d, idx){
                                                return (<li key={idx}  className="campus-li">{d.name}</li>)
                                            })}
                                        </ul>
                                    </Col>
                                </Row>
                            </ListGroupItem>)
                        }
                        let copromotoren;
                        if(content.copromotoren.length !=0){
                            copromotoren = (<ListGroupItem>
                                <Row xs={2}>
                                    <Col className="col-1"><BsFillPersonFill/> </Col>
                                    <Col>
                                        <ul>
                                            {content.copromotoren.map(function(d, idx){
                                                return (<li key={idx}  className="campus-li">{d.name}</li>)
                                            })}
                                        </ul>
                                    </Col>
                                </Row>
                            </ListGroupItem>)
                        }
                        return (
                            <div key={content.id} >
                                <Card className="subject-card">
                                    <CardBody>
                                        <CardTitle tag="h5">{content.name}</CardTitle>
                                        <CardText>
                                            {content.description}
                                        </CardText>
                                    </CardBody>
                                    <ListGroup className="list-group-flush">
                                        {campussen}
                                        <ListGroupItem><BsPersonSquare />{content.promotor}</ListGroupItem>
                                        {copromotoren}
                                    </ListGroup>
                                    <Link to={`/subjectDetails/${content.id}`} className="btn btn-primary">Details</Link>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}