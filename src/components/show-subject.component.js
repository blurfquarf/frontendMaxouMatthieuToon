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
                <h3>Goedgekeurde onderwerpen</h3>
                <div className="row">
                    {
                        content.map(content => {
                                if (content.approved === true)
                                    return (
                                        <div className="card" style={{width: "18rem", float: "left", margin: "5rem"}}
                                             key={content.id}>
                                            <h5 className="card-title">{content.name}</h5>
                                            <p className="card-text">{content.description}</p>
                                        </div>
                                    )
                            }
                        )
                    }
                </div>
            </div>
        );
    }
}