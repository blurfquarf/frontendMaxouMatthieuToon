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
import {connect} from "react-redux";
import store from "../store";
import PersonService from "../services/person.service";
import {postTop3} from "../actions/postTop3";
import personService from "../services/person.service";
import CardSlider from "../components/cardSlider.component";


const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

class TopSubjects extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeSubject1 = this.onChangeSubject1.bind(this);
        this.onChangeSubject2 = this.onChangeSubject2.bind(this);
        this.onChangeSubject3 = this.onChangeSubject3.bind(this);

        this.state = {
            content: [],
            subject1: [],
            keuze1:"",
            subject2: [],
            keuze2:"",
            subject3: [],
            keuze3:"",
            successful: false,
            submitted: false,
            keuzesIngediend: false,
        };
    }

    onChangeSubject1 = (selectedOption) => {
        this.setState({
            subject1: selectedOption,
            keuze1: selectedOption.name
        });
    }

    onChangeSubject2 = (selectedOption) => {
        this.setState({
            subject2: selectedOption,
            keuze2: selectedOption.name
        });
    }

    onChangeSubject3 = (selectedOption) => {
        this.setState({
            subject3: selectedOption,
            keuze3: selectedOption.name
        });
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
        personService.getKeuzesIngediend(state.auth.user.email).then(
            response => {
                this.setState({
                    keuzesIngediend: response.data
                });
            },
            error => {
                this.setState({
                    keuzesIngediend:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            });
    }

    handleSubmit(e) {
        const state = store.getState();
        console.log(state);
        e.preventDefault();

        this.setState({
            successful: false,
            submitted:false,
            keuzesIngediend:false,
        });

        this.form.validateAll();
        const { dispatch } = this.props;

        if (this.checkBtn.context._errors.length === 0) {
            this.props
                .dispatch(
                    postTop3(this.state.keuze1, this.state.keuze2, this.state.keuze3, state.auth.user.email)
                )
                .then(() => {
                    this.setState({
                        successful: true,
                        submitted:true,
                        keuzesIngediend: true,
                    });
                })
                .catch(() => {
                    this.setState({
                        successful: false,
                        submitted:false,
                        keuzesIngediend: false,
                    });
                });
        }
    }


    render() {
        const {content} = this.state;
        const { message } = this.props;
        const animatedComponents = makeAnimated();
        const keuzesIngediend = this.state.keuzesIngediend;

        let form;
        if(!keuzesIngediend)
        {
            form = (<div style={{marginTop:"2rem"}}>
                <h1>Top 3 Subjects</h1>
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
                                    closeMenuOnSelect={true}
                                    className="basic-single-select"
                                    name="subject1"
                                    value={this.state.subject1}
                                    onChange={this.onChangeSubject1}
                                    validations={[required]}
                                    options={content.filter(subject => subject.approved &&  subject.name != this.state.keuze2 &&  subject.name != this.state.keuze3)}
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
                                    options={content.filter(subject => subject.approved &&  subject.name != this.state.keuze1 &&  subject.name != this.state.keuze3)}
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.name}
                                    classNamePrefix="select"
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
                                    options={content.filter(subject => subject.approved &&  subject.name != this.state.keuze1 &&  subject.name != this.state.keuze2)}
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
            </div>);
        }
        else{
            form = (<div className="big-card">
                <h2>Your Top 3 subjects were submitted!</h2>
                <p>It is now up to the coordinator to assign you one of the subjects you chose!</p>
            </div>);
        }

        return (
            <div className="container">
                <div>
                    <CardSlider cards={content}/>
                </div>
                <div className="big-card-wrapper">{form}</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { message } = state.message;
    return {
        message,
    };
}

export default connect(mapStateToProps)(TopSubjects);
