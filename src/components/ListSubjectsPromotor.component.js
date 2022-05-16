import React, { Component } from "react";
import subjectService from "../services/subject.service";
import {
    Card, CardText, CardBody,
    CardTitle, Container, Row, Col, ListGroup, ListGroupItem
} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom";
import {BsFillPersonFill, BsPeopleFill} from "react-icons/all";
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
        subjectService.getSperPro(state.auth.user.email).then(
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

    render() {
        const {content} = this.state;
        return (
            <Container>
                <h2 style={{textAlign:"center"}}>You can boost students for these subjects:</h2>
                <Row xs={3} className="center-content">
                    {content.map(subject => {
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
                                    <Link to={`/subjectDetailsPromotor/${subject.name}`} className="btn btn-primary judge-subjects-btn">Details</Link>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        );
    }
}