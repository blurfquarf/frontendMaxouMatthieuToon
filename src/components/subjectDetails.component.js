import {Component} from "react";
import React from "react";

export default class subjectDetails extends Component {

    render () {
        console.log(this.props.name);
        return(
            <h1>{this.props.name}</h1>
        );
    }
}