import React, { Component } from "react";
import subjectService from "../services/subject.service";
import {
    Card, CardText, CardBody,
    CardTitle, Container, Row, Col, ListGroup, ListGroupItem
} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom";
import {HiLocationMarker} from "react-icons/hi";


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
                                            <Link to={`/subjectDetails/${content.id}`} className="btn btn-primary">Details</Link>
                                        </CardBody>
                                        <ListGroup className="list-group-flush">
                                            <ListGroupItem><HiLocationMarker /> {content.campus}</ListGroupItem>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                </div>
            </div>

            /*
            <div>
                <h3>Goedgekeurde onderwerpen</h3>
                <div className="row">
                    {
                        content.map(content => {
                                if (content.approved === true)
                                    return (
                                        <div className="card" style={{width: "18rem", float: "left", margin: "1rem"}}
                                             key={content.id}>
                                            <h5 className="card-title">{content.name}</h5>
                                            <p className="card-text">{content.description}</p>
                                            <a href="#" className="btn btn-primary" style={{width: "5rem"}}>Details</a>
                                        </div>
                                    )
                        })
                    }
                </div>
            </div>
             */
        );
    }
}