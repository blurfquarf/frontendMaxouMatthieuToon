import React, { Component } from "react";
import subjectService from "../services/subject.service";
import {connect} from "react-redux";

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
            <div>
                <ul>
                    {content.map(content => <div>{content.name} {content.description}</div>)}

                </ul>
            </div>
        )
}
}