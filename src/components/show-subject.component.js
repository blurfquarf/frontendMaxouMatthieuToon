import React, { Component } from "react";
import subjectService from "../services/subject.service";
import {connect} from "react-redux";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";

export default class ShowSubject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: []
        };
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


    render() {
        const {content} = this.state;
        console.log(content)
        return (
            <Container>
                <Row xs={3}>
                    {content.filter((content) => content.approved === true).map(content => {
                        return (
                            <Col>
                                <Card>
                                    <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap"/>
                                    <CardBody>
                                        <CardTitle tag="h5">{content.title}</CardTitle>
                                        <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                                        <CardText>
                                            {content.description}
                                        </CardText>
                                        <Button>Button</Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>

            /*
            <div>
                <h3>Goedgekeurde onderwerpen</h3>
                <div className="row">
                    {
                        content.map(content => {
                                if (content.approved === true)
                                    return (
                                        <div className="card" style={{width: "18rem", float: "left", margin: "1rem"}}
                                             key={content.id}>
                                            <h5 className="card-title">{content.name}</h5>
                                            <p className="card-text">{content.description}</p>
                                            <a href="#" className="btn btn-primary" style={{width: "5rem"}}>Details</a>
                                        </div>
                                    )
                        })
                    }
                </div>
            </div>
             */
        );
    }
}