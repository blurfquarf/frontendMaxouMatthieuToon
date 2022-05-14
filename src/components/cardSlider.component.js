import {Card, CardBody, CardText, CardTitle, Col, ListGroup, ListGroupItem, Row} from "reactstrap";
import {BsPersonSquare, FaGraduationCap} from "react-icons/all";
import {HiLocationMarker} from "react-icons/hi";
import {Link} from "react-router-dom";
import React, {Component} from "react";

class cardSlider extends Component{
    constructor(props) {
        super(props);
    }

    render() {
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
                            let opleiding;
                            if(card.opleidingen.length != 0){
                                opleiding =(<ListGroupItem>
                                    <Row xs={2}>
                                        <Col className="col-1"><FaGraduationCap/></Col>
                                        <Col style={{display: "flex"}} className="col-10">
                                            <p>{card.opleidingen[0].name}</p>
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
                                            <p>{card.promotor.username}</p>
                                        </Col>
                                    </Row>
                                </ListGroupItem>);
                            }
                            else {
                                promotor = (<ListGroupItem>
                                    <Row xs={2}>
                                        <Col className="col-1"><BsPersonSquare/></Col>
                                        <Col style={{display: "flex"}} className="col-10">
                                            <p>no promotor available yet</p>
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
                                </ListGroup>
                                <Link to={`/subjectDetails/${card.name}`} className="btn btn-primary">Details</Link>
                            </Card>)
                        })
                    }
                </div>
            );
        }
    }

}
export default cardSlider;