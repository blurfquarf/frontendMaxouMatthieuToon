import React, { Component } from "react";
import subjectService from "../services/subject.service";
import {
    Card, CardText, CardBody,
    CardTitle, Button, Container, Row, Col
} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import {judgeSubject} from "../actions/judgeSubject";

export default class JudgeSubject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: []
        };
        this.rejectSubject = this.rejectSubject.bind(this);
        this.approveSubject = this.approveSubject.bind(this);
        this.handleSubject = this.handleSubject.bind(this);
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

    rejectSubject() {
        this.setState({
            approved: false,
        }, () => console.log("approved:", this.state.approved));
    }

    approveSubject() {
        this.setState({
            approved: true,
        }, () => console.log("approved:", this.state.approved));
    }

    handleSubject(bool) {
        if(bool){
            this.approveSubject();
        }
        else {
            this.rejectSubject();
        }
        judgeSubject(this.state.title, this.state.description, this.state.approved,this.state.campus,true,this.state.promotor);

    }

    render() {
        const {content} = this.state;
        console.log("content",content)
        return (
            <Container >
                <Row xs={3} className="center-content">
                    {content.filter((content) => content.reedsGoedgekeurd === false).map(content => {
                        return (
                            <Col>
                                <Card key={content.id}>
                                    <CardBody>
                                        <CardTitle tag="h5">{content.name}</CardTitle>
                                        <CardText>
                                            {content.description}
                                        </CardText>
                                        <Button onClick={() => this.handleSubject(true)} className="btn btn-success">Approve</Button>
                                        <Button onClick={() => this.handleSubject(false)} className="btn btn-danger">Reject</Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        );
    }

}