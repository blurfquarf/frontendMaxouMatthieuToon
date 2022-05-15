import React, {Component} from "react";
import subjectService from "../services/subject.service";
import {Card, CardBody, CardText, CardTitle, Col, ListGroup, ListGroupItem, Row} from "reactstrap";
import {HiLocationMarker} from "react-icons/hi";
import {BsFillPersonFill, BsPersonSquare} from "react-icons/all";
import {Link} from "react-router-dom";
import store from "../store";
import personService from "../services/person.service";

class homeStudentToegewezen extends Component{
    constructor(props) {
        super(props);

        this.state ={
            keuzes: [],
            user: [],
        }
    }

    componentDidMount() {
        const state = store.getState();
        subjectService.getAllKeuzes(state.auth.user.email).then(
            response => {
                console.log("resp",response.data[1]);
                this.setState({
                    keuzes: [response.data[1], response.data[2], response.data[3]],
                })
            },
            error => {
                this.setState({
                    keuzes:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            });
        personService.getUser(state.auth.user.email).then(
            response => {
                this.setState({
                    user: response.data,
                })
            },
            error => {
                this.setState({
                    user:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            });
    }

    render() {
        console.log("keuzes",this.state.keuzes);
        let c =0;
        return (<div>
            <h2>Notifications:</h2>
            <header className="jumbotron">
                <h4>You were assigned to the following subject:</h4>
                {this.state.keuzes.filter(subject => subject.name == this.state.user.subject.name).map(keuze => {
                    let campussen;
                    if(keuze.campussen.length != 0){
                        campussen = (<ListGroupItem>
                            <Row xs={2}>
                                <Col className="col-1"><HiLocationMarker /></Col>
                                <Col style={{display:"flex"}}>
                                    <ul className="campus-ul">
                                        {keuze.campussen.map(function(d, idx){
                                            return (<li key={idx}  className="campus-li">{d.name}</li>)
                                        })}
                                    </ul>
                                </Col>
                            </Row>
                        </ListGroupItem>)
                    }
                    let copromotoren;
                    if(keuze.copromotoren.length !=0){
                        copromotoren = (<ListGroupItem>
                            <Row xs={2}>
                                <Col className="col-1"><BsFillPersonFill/> </Col>
                                <Col>
                                    <ul className="campus-ul">
                                        {keuze.copromotoren.map(function(d, idx){
                                            return (<li key={idx}  className="campus-li">{d.username}</li>)
                                        })}
                                    </ul>
                                </Col>
                            </Row>
                        </ListGroupItem>)
                    }
                    let promotor;
                    if(keuze.promotor != null){
                        promotor = (<ListGroupItem><BsPersonSquare />{keuze.promotor.username}</ListGroupItem>);
                    }
                    else{
                        promotor = (<ListGroupItem><BsPersonSquare /><p>no promotor available yet</p></ListGroupItem>);
                    }
                    return(<div key={keuze.id}>
                        <div>
                            <Card className="subject-card">
                                <CardBody>
                                    <CardTitle tag="h5">{keuze.name}</CardTitle>
                                    <CardText>
                                        {keuze.description}
                                    </CardText>
                                </CardBody>
                                <ListGroup className="list-group-flush">
                                    {campussen}
                                    {promotor}
                                    {copromotoren}
                                </ListGroup>
                                <Link to={`/subjectDetails/${keuze.name}`} className="btn btn-primary">Details</Link>
                            </Card>
                        </div>
                    </div>);

                })
                }
            </header>
        </div>);
    }

}
export default homeStudentToegewezen;