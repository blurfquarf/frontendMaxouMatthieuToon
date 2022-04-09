import React, { Component } from "react";
import subjectService from "../services/subject.service";

export default class ShowSubject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        subjectService.getSubject().then(
            response => {
                this.setState({
                    content: response.data
                });
                console.log(response.data)
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
        return (
            <div className="container">
                {this.state.content.map((item) => (
                    <div>{item}</div>
                ))}
            </div>
        );
    }
}