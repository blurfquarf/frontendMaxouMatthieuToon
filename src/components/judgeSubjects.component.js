import React, { Component } from "react";
import subjectService from "../services/subject.service";
import {
    Card, CardText, CardBody,
    CardTitle, Button, Container, Row, Col
} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import {judgeSubject} from "../actions/judgeSubject";
import {RGGSubject} from "../actions/RGGSubject";

export default class JudgeSubject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: []
        };
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

    handleSubject(bool, id) {
        let content = [...this.state.content];
        let subject = {...content[id]};
        subject.approved = bool;
        subject.reedsGoedgekeurd = true;
        content[id] = subject;
        this.setState({content});
        if(bool){
            judgeSubject(subject.approved);
        }
        RGGSubject(subject.reedsGoedgekeurd);
    }

    render() {
        const {content} = this.state;
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
                                        <Button onClick={() => this.handleSubject(true, content.id)} className="btn btn-success">Approve</Button>
                                        <Button onClick={() => this.handleSubject(false, content.id)} className="btn btn-danger">Reject</Button>
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