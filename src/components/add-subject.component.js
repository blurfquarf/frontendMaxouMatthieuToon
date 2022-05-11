import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {connect} from "react-redux";
import React, {Component} from "react";
import { addSubject } from "../actions/addsubject";
import { promotorSubject } from "../actions/promotorSubj";
import { campusSubject } from "../actions/campusSubject";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import autosize from 'autosize';
import {coProsSubject} from "../actions/coProsSubject";
import subjectService from "../services/subject.service";
import CampusService from "../services/campus.service";
import PromotorService from "../services/person.service";
import store from "../store";

class AddSubject extends Component {

    constructor(props) {
        super(props);
        this.handleSubject = this.handleSubject.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCampus = this.onChangeCampus.bind(this);
        this.onChangePromotor = this.onChangePromotor.bind(this);
        this.onChangeCoPros = this.onChangeCoPros.bind(this);
        this.onChangeCompany = this.onChangeCompany.bind(this);

        this.state = {
            title: "",
            description: "",
            approved: false,
            successful: false,
            campus: [],
            promotor: "",
            coPros: [],
            bedrijf:"",
            contentCampus: [],
            contentPromotor: [],
            isSubmitted: false
        };

    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value,
        });
    }

    onChangeCompany(e) {
        this.setState({
            bedrijf: e.target.value,
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value,
        });
    }

    onChangeCampus = (selectedOptions) => {
        console.log(selectedOptions);
        this.setState({
            campus: selectedOptions,
        });
    }


    onChangeCoPros = (selectedOptions) => {
        console.log(selectedOptions);
        this.setState({
            coPros: selectedOptions,
        });
    }

    onChangePromotor = (selectedOption) => {
        this.setState({
            promotor: selectedOption,
        });
    }


    handleSubject(e) {
        e.preventDefault();

        this.setState({
            successful: false,
        });

        this.form.validateAll();
        const { dispatch } = this.props;
        if (this.checkBtn.context._errors.length === 0) {
            this.props
                .dispatch(
                    addSubject(this.state.title, this.state.description, this.state.campus, this.state.coPros,this.state.bedrijf,this.state.promotor)
                )
                .then(() => {
                    this.setState({
                        successful: true,
                        isSubmitted: true
                    });
                })
                .catch(() => {
                    this.setState({
                        successful: false,
                        isSubmitted: false,
                    });
                });
        }
    }

    componentDidMount(){
        autosize(this.textarea);
        CampusService.getCampus().then(
            response => {
                this.setState({
                    contentCampus: response.data
                }, () => {
                    console.log("campussen:", this.state.contentCampus);
                });
            },
            error => {
                this.setState({
                    contentCampus:
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
                }, () => {console.log("promotoren:", this.state.contentPromotor)});
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


    render() {
        const { message } = this.props;

        const animatedComponents = makeAnimated();
        const isSubmitted = this.state.isSubmitted;
        let content;
        if(!isSubmitted) {
            content = (<div className="big-card ">
                <h1>Add Subject</h1>
                <Form
                    onSubmit={this.handleSubject}
                    ref={(c) => {
                        this.form = c;
                    }}
                >
                    {!this.state.successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChangeTitle}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="bedrijf">Company</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="bedrijf"
                                    value={this.state.bedrijf}
                                    onChange={this.onChangeCompany}
                                    required
                                />
                            </div>


                            <div className="form-group">
                                <label htmlFor="campus">Campus</label>
                                <Select
                                    components={animatedComponents}
                                    closeMenuOnSelect={true}
                                    className="basic-multi-select"
                                    name="campus"
                                    value={this.state.campus}
                                    onChange={this.onChangeCampus}
                                    options={this.state.contentCampus}
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.name}
                                    classNamePrefix="select"
                                    isMulti
                                    defaultOptions={false}
                                />
                            </div>


                            <div className="form-group">
                                <label htmlFor="promotor">Promotor (mail-address)</label>
                                <Select
                                    components={animatedComponents}
                                    closeMenuOnSelect={true}
                                    className="basic-multi-select"
                                    name="promotor"
                                    value={this.state.promotor}
                                    onChange={this.onChangePromotor}
                                    options={this.state.contentPromotor}
                                    getOptionLabel={(option) => option.email}
                                    getOptionValue={(option) => option.id}
                                    classNamePrefix="select"
                                    defaultOptions={false}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="coPros">Co-promotors (mail-address)</label>
                                <Select
                                    components={animatedComponents}
                                    closeMenuOnSelect={true}
                                    className="basic-multi-select"
                                    name="coPros"
                                    value={this.state.coPros}
                                    onChange={this.onChangeCoPros}
                                    options={this.state.contentPromotor}
                                    getOptionLabel={(option) => option.email}
                                    getOptionValue={(option) => option.id}
                                    classNamePrefix="select"
                                    isMulti
                                    defaultOptions={false}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChangeDescription}
                                    required
                                    ref={c=>this.textarea=c}
                                />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Add</button>
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
        else {
            content = (
                <div className="big-card">
                    <h2>Your subject was submitted!</h2>
                    <p>It is now up to the coordinator to approve or reject your subject.</p>
                </div>)
        }
        return (
            <div className="big-card-wrapper">{content}</div>
        );
    }
}

function mapStateToProps(state) {
    const { message } = state.message;
    return {
        message,
    };
}

export default connect(mapStateToProps)(AddSubject);
