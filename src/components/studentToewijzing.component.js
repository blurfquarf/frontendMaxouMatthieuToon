import React, { Component } from "react";
import subjectService from "../services/subject.service";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {CardBody, CardText, CardTitle, Col, Container, ListGroup, ListGroupItem, Row} from "reactstrap";
import store from "../store";
import {BsFillPersonFill, BsPeopleFill, BsPersonSquare} from "react-icons/all";

class StudentToewijzing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: []
        };
    }

    componentDidMount(){
        const state = store.getState();
        subjectService.getTargetSubjects(state.auth.user.email).then(
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
            <Container>
                <h1>student toewijzing</h1>
                    <div className="subject-wrapper">
                        {content.filter(subject => subject.promotor != null).map(subject => {
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
                            let bedrijf;
                            if(subject.bedrijf != null) {
                                bedrijf = (<ListGroupItem>
                                        <Row xs={2}>
                                            <Col className="col-1"><BsPersonSquare/></Col>
                                            <Col style={{display: "flex"}} className="col-10">
                                                <p>{subject.bedrijf.username}</p>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>);
                            }
                            else {
                                bedrijf = (<ListGroupItem>
                                    <p>This subject is not in cooperation with a company or research group.</p>
                                </ListGroupItem>);
                            }
                            return (
                                <div key={subject.id}>
                                    <div className="subject-card">
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
                                            <ListGroupItem>
                                                <Row xs={2}>
                                                    <Col className="col-1"><BsPersonSquare/></Col>
                                                    <Col style={{display: "flex"}} className="col-10">
                                                        <p>{subject.promotor.username}</p>
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                            {bedrijf}
                                        </ListGroup>
                                        <Link to={`/studentToewijzingDetails/${subject.name}`} className="btn btn-primary judge-subjects-btn">Details</Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
            </Container>
        );
    }

}

function mapStateToProps(state) {
    const { message } = state.message;
    return {
        message,
    };
}

export default connect(mapStateToProps)(StudentToewijzing);