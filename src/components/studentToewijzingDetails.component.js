import {Component} from "react";
import React from "react";
import subjectService from "../services/subject.service";
import {
    Col,
    Container, Row
} from 'reactstrap';
import personService from "../services/person.service";
import Select from "react-select";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import {connect} from "react-redux";
import makeAnimated from "react-select/animated";

class studentToewijzingDetails extends Component {
    constructor(props) {
        super(props);
        this.onChangeStudent = this.onChangeStudent.bind(this);
        this.state = {
            content: [],
            studenten: [],
            boostedStudenten: [],
            student: "",
            studentMail: "",
            submitted: false,
            successful: false,
            nietMeerBeschikbaar: false,
            toegewezenStudent: "",
            keuzes: [],
            kiezers1: [],
            kiezers2: [],
            kiezers3: [],
        };
    }


    onChangeStudent = (selectedOption) => {
        this.setState({
            student: selectedOption,
            studentMail: selectedOption.email,
            toegewezenStudent: selectedOption.username,
        });
    }

    componentDidMount() {
        subjectService.getOneSubject(this.props.match.params.name).then(
            response => {
                this.setState({
                    content: response.data,
                    nietMeerBeschikbaar: response.data[0].nietMeerBeschikbaar,
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
        personService.getSperSub(this.props.match.params.name).then(
            response => {
                this.setState({
                    studenten: response.data,
                });
            },
            error => {
                this.setState({
                    studenten:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
        personService.getToegewezenStudent(this.props.match.params.name).then(
            response => {
                this.setState({
                    toegewezenStudent: response.data,
                });
            },
            error => {
                this.setState({
                    toegewezenStudent:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }


    handleToewijzing(event, subjectName, email) {
        event.preventDefault();
        personService.postToewijzing(subjectName, email).then(() => {
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

    render() {
        const animatedComponents = makeAnimated();
        const {message} = this.props;

        return (<div className="center-content">
            {this.state.content.map(content => {
                let campussen;
                if (content.campussen.length != 0) {
                    campussen = (
                        <div style={{display: "flex"}}>
                            <ul className="campus-ul">
                                {content.campussen.map(function (d, idx) {
                                    return (<li key={idx} className="campus-li">{d.name}</li>)
                                })}
                            </ul>
                        </div>)
                }
                let copromotoren;
                if (content.copromotoren.length != 0) {
                    copromotoren = (
                        <div style={{display: "flex"}}>
                            <ul className="campus-ul">
                                {content.copromotoren.map(function (d, idx) {
                                    return (<li key={idx} className="campus-li">{d.username}</li>)
                                })}
                            </ul>
                        </div>)
                } else {
                    copromotoren = (
                        <div>
                            <p>There are no co-promotors for this subject.</p>
                        </div>
                    )
                }
                let contentStud;
                let studenten;
                const keuzes = [];
                let kiezers1 = [];
                let kiezers2 = [];
                let kiezers3 = [];
                for(let i=0, keys=Object.keys(this.state.studenten), ii=keys.length; i<ii; i++){
                    keuzes[keys[i]] = this.state.studenten[keys[i]];
                    for(let j=1; j<keuzes.length; j++){
                        if(j==1){
                            kiezers1 = keuzes[j];
                        }
                        if(j==2){
                            kiezers2 = keuzes[j];
                        }
                        if(j==3) {
                            kiezers3 = keuzes[j];
                        }
                    }
                }
                if (!this.state.submitted && !this.state.nietMeerBeschikbaar && (kiezers1.length !== 0 || kiezers2.length !== 0 || kiezers3.length !== 0)) {
                    contentStud = [...kiezers1, ...kiezers2, ...kiezers3];

                    studenten = (<div style={{justifyContent: "center", textAlign: "center"}}>
                        <h3>Gekozen door:</h3>
                        <div>
                            <div>
                                <h5>1e keuze</h5>
                                <div>
                                    {kiezers1.map(student => {
                                        let boosted;
                                        if (student.geboostVoor.find(subject => subject.name == this.props.match.params.name) != null) {
                                            boosted = (
                                                <p>Boosted</p>
                                            );
                                        } else {
                                            boosted = (
                                                <p>Not Boosted</p>
                                            );
                                        }
                                        return (<Row xs={3} key={student.id} style={{backgroundColor: "lightgrey"}}>
                                            <Col className="col-4 BoostStudentView">
                                                <p>{student.username}</p>
                                            </Col>
                                            <Col className="col-4 BoostStudentView">
                                                <p>{student.opleiding.name}</p>
                                            </Col>
                                            <Col className="col-4">
                                                {boosted}
                                            </Col>
                                        </Row>);
                                    })}
                                </div>
                            </div>
                            <div>
                                <h5>2e keuze</h5>
                                <div>
                                    {kiezers2.map(student => {
                                        let boosted;
                                        if (student.geboostVoor.find(subject => subject.name == this.props.match.params.name) != null) {
                                            boosted = (
                                                <p>Boosted</p>
                                            );
                                        } else {
                                            boosted = (
                                                <p>Not Boosted</p>
                                            );
                                        }
                                        return (<Row xs={3} key={student.id} style={{backgroundColor: "lightgrey"}}>
                                            <Col className="col-4 BoostStudentView">
                                                <p>{student.username}</p>
                                            </Col>
                                            <Col className="col-4 BoostStudentView">
                                                <p>{student.opleiding.name}</p>
                                            </Col>
                                            <Col className="col-4">
                                                {boosted}
                                            </Col>
                                        </Row>);
                                    })}
                                </div>
                            </div>
                            <div>
                                <h5>3e keuze</h5>
                                <div>
                                    {kiezers3.map(student => {
                                        let boosted;
                                        if (student.geboostVoor.find(subject => subject.name == this.props.match.params.name) != null) {
                                            boosted = (
                                                <p>Boosted</p>
                                            );
                                        } else {
                                            boosted = (
                                                <p>Not Boosted</p>
                                            );
                                        }
                                        return (<Row xs={3} key={student.id} style={{backgroundColor: "lightgrey"}}>
                                            <Col className="col-4 BoostStudentView">
                                                <p>{student.username}</p>
                                            </Col>
                                            <Col className="col-4 BoostStudentView">
                                                <p>{student.opleiding.name}</p>
                                            </Col>
                                            <Col className="col-4">
                                                {boosted}
                                            </Col>
                                        </Row>);
                                    })}
                                </div>
                            </div>
                        </div>
                        <div>
                            <Form
                                onSubmit={(event) => this.handleToewijzing(event, this.props.match.params.name, this.state.studentMail)}
                                ref={(c) => {
                                    this.form = c;
                                }}
                            >
                                {!this.state.successful && (
                                    <div>
                                        <div className="form-group">
                                            <label htmlFor="toegewezenStudent">Student:</label>
                                            <Select
                                                components={animatedComponents}
                                                closeMenuOnSelect={true}
                                                className="basic-multi-select"
                                                name="opleidingen"
                                                value={this.state.student}
                                                onChange={this.onChangeStudent}
                                                options={contentStud}
                                                getOptionLabel={(option) => option.username}
                                                getOptionValue={(option) => option.email}
                                                classNamePrefix="select"
                                                defaultOptions={false}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <button className="btn btn-primary btn-block">Add</button>
                                        </div>
                                    </div>
                                )}
                                {message && (
                                    <div className="form-group">
                                        <div
                                            className={this.state.successful ? "alert alert-success" : "alert alert-danger"}
                                            role="alert">
                                            {message}
                                        </div>
                                    </div>
                                )}
                                <CheckButton
                                    style={{display: "none"}}
                                    ref={(c) => {
                                        this.checkBtn = c;
                                    }}
                                />
                            </Form>
                        </div>
                    </div>);

                } else if ((this.state.submitted && this.state.successful) || this.state.nietMeerBeschikbaar) {
                    studenten = (<div>
                        <h5>This subject is assigned to {this.state.toegewezenStudent}</h5>
                    </div>);
                } else {
                    studenten = (<div>
                        <h3>Gekozen door:</h3>
                        <div>
                            <p>This subject isn't chosen by a student yet.</p>
                        </div>
                    </div>);
                }
                return (<Container key={content.id} style={{margin: "10px", paddingBottom: "30px"}}>
                    <div>
                        <h1 className="subj-details-title">{content.name}</h1>

                    </div>
                    <div>
                        <h3>Description</h3>
                        <p>{content.description}</p>
                    </div>
                    <div>
                        <h3>Campuses</h3>
                        {campussen}
                    </div>
                    <div>
                        <h3>Promotor</h3>
                        <p>{content.promotor.username}</p>
                    </div>
                    <div>
                        <h3>Co-promotors</h3>
                        {copromotoren}
                    </div>
                    {studenten}
                </Container>)
            })}
        </div>);
    }
}

function mapStateToProps(state) {
    const { message } = state.message;
    return {
        message,
    };
}

export default connect(mapStateToProps)(studentToewijzingDetails);
