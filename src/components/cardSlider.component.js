import {Card, CardBody, CardText, CardTitle, Col, ListGroup, ListGroupItem, Row} from "reactstrap";
import {BsPersonSquare, FaGraduationCap, IoPersonCircle} from "react-icons/all";
import {HiLocationMarker} from "react-icons/hi";
import {Link} from "react-router-dom";
import React, {Component} from "react";

class cardSlider extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        let c =0;
        if(this.props.cards.length == 0){
            return (<div >
                <p>No subjects available.</p>
            </div>)
        }
        else{
            return (
                <div className="small-cards-slider">
                    {
                        this.props.cards.map((card) => {

                            let student;
                            if(this.props.students != null && this.props.students.length != 0){
                                console.log("card student",this.props.students);
                                student=(<ListGroupItem>
                                    <Row xs={2}>
                                        <Col className="col-1"><IoPersonCircle/></Col>
                                        <Col style={{display: "flex"}} className="col-10">
                                            <p>{this.props.students[c]}</p>
                                        </Col>
                                    </Row>
                                </ListGroupItem>);
                            }
                            let opleiding;
                            console.log("opleidingen", card.opleidingen);
                            let cte =0;
                            if(card.opleidingen != null){
                                opleiding =(<ListGroupItem>
                                    <Row xs={2}>
                                        <Col className="col-1"><FaGraduationCap/></Col>
                                        <Col style={{display: "flex"}} className="col-10">
                                            {card.opleidingen.map(opleiding => {
                                                cte= cte+1;
                                                if(cte == 1) {
                                                    return(<p style={{textAlign:"left"}} key={opleiding.id}>{opleiding.name}</p>);
                                                }
                                                else{
                                                    return(<p style={{textAlign:"left"}} key={opleiding.id}>/ {opleiding.name}</p>);
                                                }


                                            })}
                                        </Col>
                                    </Row>
                                </ListGroupItem>);
                            }
                            let promotor;
                            if(card.promotor != null){
                                promotor = (<ListGroupItem>
                                    <Row xs={2}>
                                        <Col className="col-1"><BsPersonSquare/></Col>
                                        <Col style={{display: "flex"}} className="col-10">
                                            <p style={{textAlign:"left"}}>{card.promotor.username}</p>
                                        </Col>
                                    </Row>
                                </ListGroupItem>);
                            }
                            else {
                                promotor = (<ListGroupItem>
                                    <Row xs={2}>
                                        <Col className="col-1"><BsPersonSquare/></Col>
                                        <Col style={{display: "flex"}} className="col-10">
                                            <p style={{textAlign:"left"}}>no promotor available yet</p>
                                        </Col>
                                    </Row>
                                </ListGroupItem>);
                            }
                            return (<Card key={card.id} className="small-card small-cards-container" style={{textAlign:"center"}}>
                                <CardBody>
                                    <CardTitle tag="h5">{card.name}</CardTitle>
                                    <CardText>
                                        {card.description}
                                    </CardText>
                                </CardBody>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>
                                        <Row xs={2}>
                                            <Col className="col-1"><HiLocationMarker/></Col>
                                            <Col style={{display: "flex"}} className="col-10">
                                                <ul className="campus-ul">
                                                    {card.campussen.map(function (d, idx) {
                                                        return (<li key={idx} style={{listStyleType:"none"}}>{d.name}</li>)
                                                    })}
                                                </ul>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                    {promotor}
                                    {opleiding}
                                    {student}
                                </ListGroup>
                                <Link to={`/subjectDetails/${card.name}`} className="btn btn-primary">Details</Link>
                            </Card>)
                            c=c+1;
                        })
                    }
                </div>
            );
        }
    }

}
export default cardSlider;