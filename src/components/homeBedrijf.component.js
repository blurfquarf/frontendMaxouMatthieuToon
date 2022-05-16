import React, { Component } from "react";
import store from "../store";
import subjectService from "../services/subject.service";
import HomeBedrijfSubjects from "./homeBedrijfSubjects.component";

class homeBedrijf extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contentToegewezen: [],
            contentApproved: [],
        };
    }

    componentDidMount() {
        const state = store.getState();
        subjectService.getStudMetBedrijf(state.auth.user.email).then(
            response => {
                this.setState({
                    contentToegewezen: response.data,
                });
            },
            error => {
                this.setState({
                    contentToegewezen:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            });
        subjectService.getAllForBedrijf(state.auth.user.email).then(
            response => {
                this.setState({
                    contentApproved: response.data,
                });
            },
            error => {
                this.setState({
                    contentApproved:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            });
    }

    render() {
        return(<div>
            <HomeBedrijfSubjects subjectsToegewezen={this.state.contentToegewezen} subjectsApproved={this.state.contentApproved} />
        </div>);


    }
}

export default homeBedrijf;
