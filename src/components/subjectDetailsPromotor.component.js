import {Component} from "react";
import React from "react";
import subjectService from "../services/subject.service";
import {
    Button,
    Col,
    Container, ListGroupItem, Row
} from 'reactstrap';
import {BsPeopleFill} from "react-icons/all";
import personService from "../services/person.service";

export default class subjectDetailsPromotor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content : [],
            studenten: [],
            boostedStudenten: [],
        };
    }

    componentDidMount(){
        subjectService.getOneSubject(this.props.match.params.name).then(
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
        personService.getSperSub( this.props.match.params.name).then(
            response => {
                this.setState({
                    studenten: response.data,
                })
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
    }



    handleBoost(event, subjectName, email) {
        event.preventDefault();
        personService.postBoostStudent(subjectName, email);
        window.location.reload(false);
    }

    render () {
        return(
            <div className="center-content">
                {this.state.content.map(content => {
                    let campussen;
                    if(content.campussen.length != 0){
                        campussen = (
                            <div style={{display:"flex"}}>
                                <ul className="campus-ul">
                                    {content.campussen.map(function(d, idx){
                                        return (<li key={idx}  className="campus-li">{d.name}</li>)
                                    })}
                                </ul>
                            </div>)
                    }
                    let copromotoren;
                    if(content.copromotoren.length !=0){
                        copromotoren = (
                            <div style={{display:"flex"}}>
                                <ul className="campus-ul">
                                    {content.copromotoren.map(function(d, idx){
                                        return (<li key={idx}  className="campus-li">{d.username}</li>)
                                    })}
                                </ul>
                            </div>)
                    }
                    else {
                        copromotoren = (
                            <div>
                                <p>There are no co-promotors for this subject.</p>
                            </div>
                        )
                    }

                    let studenten;
                    const keuzes = [];
                    let kiezers1 = [];
                    let kiezers2 = [];
                    let kiezers3 = [];
                    for(let i=0, keys=Object.keys(this.state.studenten), ii=keys.length; i<ii; i++){
                        keuzes[keys[i]] = this.state.studenten[keys[i]];
                        console.log("keuzes", keuzes);
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
                    if(kiezers1.length != 0 || kiezers2.length != 0 || kiezers3.length != 0) {
                        studenten = (<div style={{justifyContent:"center", textAlign:"center"}}>
                                <h3>Gekozen door:</h3>
                                <div>
                                    <div>
                                        <h5>1e keuze</h5>
                                        <div>
                                            {kiezers1.map(student => {
                                                let boostButton;
                                                if(student.geboostVoor.find(subject => subject.name == this.props.match.params.name) == null){
                                                    boostButton = (
                                                        <Button onClick={(event) => this.handleBoost(event,this.props.match.params.name, student.email)} className="btn btn-info">Boost</Button>
                                                    );
                                                }
                                                else{
                                                    boostButton = (
                                                        <p>Already Boosted</p>
                                                    );
                                                }
                                                return(<Row xs={3} key={student.id} style={{backgroundColor:"lightgrey"}}>
                                                    <Col className="col-4 BoostStudentView" >
                                                        <p>{student.username}</p>
                                                    </Col>
                                                    <Col className="col-4 BoostStudentView">
                                                        <p>{student.opleiding.name}</p>
                                                    </Col>
                                                    <Col className="col-4">
                                                        {boostButton}
                                                    </Col>
                                                </Row>);
                                            })}
                                        </div>
                                    </div>
                                    <div>
                                        <h5>2e keuze</h5>
                                        <div>
                                            {kiezers2.map(student => {
                                                let boostButton;
                                                if(student.geboostVoor.find(subject => subject.name == this.props.match.params.name) == null){
                                                    boostButton = (
                                                        <Button onClick={(event) => this.handleBoost(event,this.props.match.params.name, student.email)} className="btn btn-info">Boost</Button>
                                                    );
                                                }
                                                else{
                                                    boostButton = (
                                                        <p>Already Boosted</p>
                                                    );
                                                }
                                                return(<Row xs={3} key={student.id} style={{backgroundColor:"lightgrey"}} >
                                                    <Col className="col-4 BoostStudentView">
                                                        <p>{student.username}</p>
                                                    </Col>
                                                    <Col className="col-4 BoostStudentView">
                                                        <p>{student.opleiding.name}</p>
                                                    </Col>
                                                    <Col className="col-4">
                                                        {boostButton}
                                                    </Col>
                                                </Row>);
                                            })}
                                        </div>
                                    </div>
                                    <div>
                                        <h5>3e keuze</h5>
                                        <div>
                                            {kiezers3.map(student => {
                                                let boostButton;
                                                if(student.geboostVoor.find(subject => subject.name == this.props.match.params.name) == null){
                                                    boostButton = (
                                                        <Button onClick={(event) => this.handleBoost(event,this.props.match.params.name, student.email)} className="btn btn-info">Boost</Button>
                                                    );
                                                }
                                                else{
                                                    boostButton = (
                                                        <p>Already Boosted</p>
                                                    );
                                                }
                                                return(<Row xs={3} key={student.id} style={{backgroundColor:"lightgrey"}}>
                                                    <Col className="col-4 BoostStudentView">
                                                        <p>{student.username}</p>
                                                    </Col>
                                                    <Col className="col-4 BoostStudentView">
                                                        <p>{student.opleiding.name}</p>
                                                    </Col>
                                                    <Col className="col-4">
                                                        {boostButton}
                                                    </Col>
                                                </Row>);
                                            })}
                                        </div>
                                    </div>
                                </div>
                        </div>);
                    }
                    else {
                        studenten = (<div >
                            <h3>Gekozen door:</h3>
                            <div>
                                <p>This subject isn't chosen by a student yet.</p>
                            </div>
                        </div>);
                    }


                    return(
                        <Container key={content.id} style={{margin:"10px", paddingBottom:"30px"}}>
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
                        </Container>
                    );
                })}
            </div>
        );
    }}