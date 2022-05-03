import {Component} from "react";
import React from "react";
import subjectService from "../services/subject.service";
import {
    Container
} from 'reactstrap';

export default class subjectDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content : [],
        };
    }

    componentDidMount(){
        subjectService.getSubject().then(
            response => {
                this.setState({
                    content: response.data,
                });
                console.log("response: ", response.data);
                console.log("props.match.params: ", this.props.match.params);
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


    render () {
        const {content} = this.state;
        return(
            <div>
                {content.find((content) => content.id === this.props.match.params).map(content => {
                    return(
                        <Container>
                            <div key={content.id}>
                                <h1>{content.name}</h1>
                                <h1>test</h1>
                            </div>
                        </Container>
                    );
                })}
            </div>
        );
    }
}