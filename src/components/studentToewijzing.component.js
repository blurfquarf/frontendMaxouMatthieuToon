import React, { Component } from "react";
import subjectService from "../services/subject.service";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {Container} from "reactstrap";

class StudentToewijzing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: []
        };
    }

    componentDidMount(){
        console.log("page mounted");
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
        return(
            <Container>
                <h1>student toewijzing</h1>
            </Container>
        );
    }

}

function mapStateToProps(state) {
    const { message } = state.message;
    return {
        message,
    };
}

export default connect(mapStateToProps)(StudentToewijzing);