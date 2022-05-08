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
                <div >
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
                    <Row xs={3} className="center-content">
                        {content.filter((content) => content.approved === true).map(content => {
                            return (
                                <Col>
                                    <Card key={content.id}>
                                        <CardBody>
                                            <CardTitle tag="h5">{content.name}</CardTitle>
                                            <CardText>
                                                {content.description}
                                            </CardText>
                                        </CardBody>
                                        <ListGroup className="list-group-flush">
                                            <ListGroupItem><HiLocationMarker /> {content.campussen}</ListGroupItem>
                                            <ListGroupItem><BsPersonSquare /> {content.promotor}</ListGroupItem>
                                            <ListGroupItem><BsFillPersonFill /> {content.copromotoren}</ListGroupItem>
                                        </ListGroup>
                                        <Link to={`/subjectDetails/${content.id}`} className="btn btn-primary">Details</Link>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                </div>
            </div>
        );
    }
}