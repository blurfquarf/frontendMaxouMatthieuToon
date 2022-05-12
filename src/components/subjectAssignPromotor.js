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
import store from "../store";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import personService from "../services/person.service";
import PromotorService from "../services/person.service";

class subjectAssignPromotor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: [],
            contentPromotor: [],
        };
        this.handleSubject = this.handleSubject.bind(this);
        this.onChangePromotor = this.onChangePromotor.bind(this);
    }

    onChangePromotor = (selectedOption, name) => {
        let content = [...this.state.content];
        let subject = content.find(subject => subject.name == name);
        subject.promotor = selectedOption;
        this.setState({content});
    }


    componentDidMount(){
        const state = store.getState();
        subjectService.getSubjectsNoPro(state.auth.user.email).then(
            response => {
                this.setState({
                    content: response.data
                }, () => console.log(response.data));
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
        PromotorService.getPromotor().then(
            response => {
                this.setState({
                    contentPromotor: response.data
                });
            },
            error => {
                this.setState({
                    contentPromotor:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    addPromotor(event, name) {
        event.preventDefault();
        const state = store.getState();
        subjectService.postPromotor(name, state.auth.user.email);
        window.location.reload(false);
    }

    handleSubject(event, bool, id) {
        event.preventDefault();
        let content = [...this.state.content];
        let subject = content.find(subject => subject.id == id);
        subject.approved = bool;
        subject.reedsGoedgekeurd = true;
        console.log(id);
        console.log(subject);
        this.setState({content});
        if(bool){
            console.log("approve");
            subjectService.postApprovedSubject(subject.name);
        }
        else{
            subjectService.postRGGSubject(subject.name);
        }
    }

    render() {
        const {content} = this.state;
        const animatedComponents = makeAnimated();
        return (
            <Container fluid>
                <div className="subject-wrapper" >
                    {content.map(subject => {
                        let campussen;
                        if(subject.campussen.length != 0){
                            campussen = (<ListGroupItem>
                                <Row xs={2}>
                                    <Col className="col-1"><HiLocationMarker /></Col>
                                    <Col style={{display:"flex"}} className="col-10">
                                        <ul>
                                            {subject.campussen.map(function(d, idx){
                                                return (<li key={idx}  className="campus-li">{d.name}</li>)
                                            })}
                                        </ul>
                                    </Col>
                                </Row>
                            </ListGroupItem>);
                        }
                        let copromotoren;
                        if(subject.copromotoren.length !=0){
                            copromotoren = (<ListGroupItem>
                                <Row xs={2}>
                                    <Col className="col-1"><BsFillPersonFill/> </Col>
                                    <Col className="col-10">
                                        <ul>
                                            {subject.copromotoren.map(function(d, idx){
                                                return (<li key={idx}  className="campus-li">{d.username}</li>)
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
                                        {copromotoren}
                                    </ListGroup>
                                    <Select
                                        components={animatedComponents}
                                        closeMenuOnSelect={true}
                                        className="basic-multi-select"
                                        name="promotor"
                                        value={this.state.content.promotor}
                                        onChange={(selectedOption) => this.onChangePromotor(selectedOption, subject.name)}
                                        options={this.state.contentPromotor}
                                        getOptionLabel={(option) => option.username}
                                        getOptionValue={(option) => option.email}
                                        classNamePrefix="select"
                                        defaultOptions={false}
                                    />
                                    <Button onClick={(event) => this.addPromotor(event, subject.name)} className="btn btn-primary">Add!</Button>
                                    <Link to={`/subjectDetails/${subject.name}`} className="btn btn-primary judge-subjects-btn">Details</Link>
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

export default connect(mapStateToProps)(subjectAssignPromotor);