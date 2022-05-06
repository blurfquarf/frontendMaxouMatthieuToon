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
                console.log("props.match.params.id: ", this.props.match.params.id);
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
            <div className="center-content">
                {content.filter((content) => content.id == this.props.match.params.id).map(content => {
                    return(
                        <Container key={content.id}>
                            <div>
                                <h1 className="subj-details-title">{content.name}</h1>

                            </div>
                            <div className="subj-details-body-div">
                                <p style={{textAlign:"center"}}>{content.description}</p>
                            </div>
                        </Container>
                    );
                })}
            </div>
        );
    }
}