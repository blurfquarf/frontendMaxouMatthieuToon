import React, { Component } from "react";
import subjectService from "../services/subject.service";
import "bootstrap/dist/css/bootstrap.min.css";
import {Card, CardBody, CardText, CardTitle, Col, ListGroup, ListGroupItem, Row} from "reactstrap";
import {Link} from "react-router-dom";
import {HiLocationMarker} from "react-icons/hi";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-select";
import CheckButton from "react-validation/build/button";
import {addSubject} from "../actions/addsubject";
import makeAnimated from "react-select/animated";
import {BsFillPersonFill, BsPersonSquare} from "react-icons/all";


const CardContainer = (props) => (
    <div className="small-cards-slider">
        {
            props.cards.map((card) => (
                <Card key={card.id} className="small-card small-cards-container">
                    <CardBody>
                        <CardTitle tag="h5">{card.name}</CardTitle>
                        <CardText>
                            {card.description}
                        </CardText>
                    </CardBody>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>
                            <Row xs={2}>
                                <Col className="col-1"><HiLocationMarker /></Col>
                                <Col style={{display:"flex"}}>
                                    <ul>
                                        {card.campussen.map(function(d, idx){
                                            return (<li key={idx}  className="campus-li">{d.name}</li>)
                                        })}
                                    </ul>
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem><BsPersonSquare />{card.promotor}</ListGroupItem>
                    </ListGroup>
                    <Link to={`/subjectDetails/${card.id}`} className="btn btn-primary">Details</Link>
                </Card>
            ))
        }
        {console.log("props.cards:", props.cards)}
    </div>
);

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default class TopSubjects extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeSubject1 = this.onChangeSubject1.bind(this);
        this.onChangeSubject2 = this.onChangeSubject2.bind(this);
        this.onChangeSubject3 = this.onChangeSubject3.bind(this);

        this.state = {
            content: [],
            subject1: "",
            subject2:"",
            subject3:"",
        };
    }

    onChangeSubject1 = (selectedOption) => {
        console.log(selectedOption);
        this.setState({
            subject1: selectedOption,
        });
    }

    onChangeSubject2 = (selectedOption) => {
        console.log(selectedOption);
        this.setState({
            subject1: selectedOption,
        });
    }

    onChangeSubject3 = (selectedOption) => {
        console.log(selectedOption);
        this.setState({
            subject1: selectedOption,
        });
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

    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            successful: false,
        });

        this.form.validateAll();
        const { dispatch } = this.props;

        if (this.checkBtn.context._errors.length === 0) {
            this.props
                .dispatch(
                    addSubject(this.state.title, this.state.description, false, this.state.campus, false, this.state.promotor)
                )
                .then(() => {
                    this.setState({
                        successful: true,
                    });
                })
                .catch(() => {
                    this.setState({
                        successful: false,
                    });
                });
        }
    }


    render() {
        const {content} = this.state;
        console.log("content:",content);
        const { message } = this.props;
        const animatedComponents = makeAnimated();

        return (
            <div className="container">
                <div>
                    <CardContainer cards={content}/>
                </div>

                <div style={{marginTop:"2rem"}}>
                    <h1>Add Subject</h1>
                    <Form
                        onSubmit={this.handleSubmit}
                        ref={(c) => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="subject1">First Choice</label>
                                    <Select
                                        components={animatedComponents}
                                        closeMenuOnSelect={false}
                                        className="basic-single-select"
                                        name="subject1"
                                        value={this.state.subject1}
                                        onChange={this.onChangeSubject1}
                                        validations={[required]}
                                        options={content}
                                        getOptionLabel={(option) => option.name}
                                        getOptionValue={(option) => option.name}
                                        classNamePrefix="select"
                                        defaultOptions={false}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject2">Second Choice</label>
                                    <Select
                                        components={animatedComponents}
                                        closeMenuOnSelect={true}
                                        className="basic-single-select"
                                        name="subject2"
                                        value={this.state.subject2}
                                        onChange={this.onChangeSubject2}
                                        validations={[required]}
                                        options={content}
                                        getOptionLabel={(option) => option.name}
                                        getOptionValue={(option) => option.name}
                                        classNamePrefix="select"
                                        isMulti
                                        defaultOptions={false}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject3">Third Choice</label>
                                    <Select
                                        components={animatedComponents}
                                        closeMenuOnSelect={true}
                                        className="basic-single-select"
                                        name="subject3"
                                        value={this.state.subject3}
                                        onChange={this.onChangeSubject3}
                                        validations={[required]}
                                        options={content}
                                        getOptionLabel={(option) => option.name}
                                        getOptionValue={(option) => option.name}
                                        classNamePrefix="select"
                                        defaultOptions={false}
                                    />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Submit Preferences</button>
                                </div>
                            </div>
                        )}
                        {message && (
                            <div className="form-group">
                                <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={(c) => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>


            </div>
        );
    }
}