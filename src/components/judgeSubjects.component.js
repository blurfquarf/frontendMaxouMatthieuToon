import React, { Component } from "react";
import subjectService from "../services/subject.service";
import {
    Card, CardText, CardBody,
    CardTitle, Button, Container, Row, Col, ListGroupItem, ListGroup
} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import {judgeSubject} from "../actions/judgeSubject";
import {RGGSubject} from "../actions/RGGSubject";
import {Link} from "react-router-dom";
import {HiLocationMarker} from "react-icons/hi";
import {BsFillPersonFill, BsPersonSquare} from "react-icons/all";
import {connect} from "react-redux";

class JudgeSubject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: []
        };
        this.handleSubject = this.handleSubject.bind(this);
    }

    componentDidMount(){
        console.log("page mounted");
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

    handleSubject(event, bool, id) {
        event.preventDefault();
        let content = [...this.state.content];
        let subject = {...content[id]};
        subject.approved = bool;
        subject.reedsGoedgekeurd = true;
        content[id] = subject;
        this.setState({content});
        if(bool){
            console.log("approve");
            this.props.dispatch(judgeSubject(subject.name));
        }
        else{
            this.props.dispatch(RGGSubject(subject.name));
        }
    }

    render() {
        const {content} = this.state;
        return (
            <Container fluid>
                <div className="subject-wrapper" >
                    {content.filter((content) => content.reedsGoedgekeurd === false).map(subject => {
                        let campussen;
                        if(subject.campussen.length != 0){
                            campussen = (<ListGroupItem>
                                <Row xs={2}>
                                    <Col className="col-1"><HiLocationMarker /></Col>
                                    <Col style={{display:"flex"}}>
                                        <ul>
                                            {subject.campussen.map(function(d, idx){
                                                return (<li key={idx}  className="campus-li">{d.name}</li>)
                                            })}
                                        </ul>
                                    </Col>
                                </Row>
                            </ListGroupItem>)
                        }
                        let copromotoren;
                        if(subject.copromotoren.length !=0){
                            copromotoren = (<ListGroupItem>
                                <Row xs={2}>
                                    <Col className="col-1"><BsFillPersonFill/> </Col>
                                    <Col>
                                        <ul>
                                            {subject.copromotoren.map(function(d, idx){
                                                return (<li key={idx}  className="campus-li">{d.name}</li>)
                                            })}
                                        </ul>
                                    </Col>
                                </Row>
                            </ListGroupItem>)
                        }
                        return (
                            <div key={subject.id}>
                                <Card className="subject-card">
                                    <CardBody>
                                        <CardTitle tag="h5">{subject.name}</CardTitle>
                                        <CardText>
                                            {subject.description}
                                        </CardText>
                                    </CardBody>
                                    <ListGroup className="list-group-flush">
                                        {campussen}
                                        <ListGroupItem><BsPersonSquare />{content.promotor}</ListGroupItem>
                                        {copromotoren}
                                    </ListGroup>
                                    <Button onClick={(event) => this.handleSubject(event,true, subject.id-1)} className="btn btn-success judge-subjects-btn">Approve</Button>
                                    <Button onClick={(event) => this.handleSubject(event,false, subject.id-1)} className="btn btn-danger judge-subjects-btn">Reject</Button>
                                    <Link to={`/subjectDetails/${subject.id}`} className="btn btn-primary judge-subjects-btn">Details</Link>
                                </Card>
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

export default connect(mapStateToProps)(JudgeSubject);