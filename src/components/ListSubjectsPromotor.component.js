import React, { Component } from "react";
import subjectService from "../services/subject.service";
import {
    Card, CardText, CardBody,
    CardTitle, Container, Row, Col, ListGroup, ListGroupItem, Button
} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom";
import {HiLocationMarker} from "react-icons/hi";
import {BsFillPersonFill, BsPeopleFill, BsPersonSquare} from "react-icons/all";
import store from "../store";


export default class listSubjectsPromotor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: [],
        };
    }

    componentDidMount(){
        const state = store.getState();
        console.log(state.auth);
        subjectService.getSperPro(state.auth.user.email).then(
            response => {
                this.setState({
                    content: response.data,
                });
                console.log(response.data);
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
        console.log("username", this.props);
        return (
            <Container>
                <Row xs={3} className="center-content">
                    {content.map(subject => {
                        console.log("subject", subject);
                        console.log("content", content);
                        let copromotoren;
                        if(subject.copromotoren.length !=0){
                            copromotoren = (<ListGroupItem>
                                <Row xs={2}>
                                    <Col className="col-1"><BsFillPersonFill/></Col>
                                    <Col className="col-10">
                                        <ul className="campus-ul">
                                            {subject.copromotoren.map(function(d, idx){
                                                return (<li key={idx}  className="campus-li">{d.username}</li>)
                                            })}
                                        </ul>
                                    </Col>
                                </Row>
                            </ListGroupItem>)
                        }
                        return (
                            <Col key={subject.id}>
                                <Card className="card cards-container">
                                    <CardBody>
                                        <CardTitle tag="h5">{subject.name}</CardTitle>
                                        <CardText>
                                            {subject.description}
                                        </CardText>
                                    </CardBody>
                                    <ListGroup className="list-group-flush">
                                        {copromotoren}
                                        <ListGroupItem>
                                            <Row xs={2}>
                                                <Col className="col-1"><BsPeopleFill/></Col>
                                                <Col>
                                                    <p>{subject.gekozen}</p>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    </ListGroup>
                                    <Link to={`/subjectDetailsPromotor/${subject.id}`} className="btn btn-primary judge-subjects-btn">Details</Link>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        );
    }
}