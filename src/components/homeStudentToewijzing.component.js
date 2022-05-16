import React, {Component} from "react";
import HomeStudentToegewezen from "./HomeStudentToegewezen.component";
import store from "../store";
import HomeStudentNietToegewezen from "../components/homeStudentNietToegewezen.component";
import subjectService from "../services/subject.service";

class homeStudentToewijzing extends Component{
    constructor(props) {
        super(props);
        this.state = {
            subject: [],
        }
    }

    componentDidMount() {
        const state = store.getState();
        subjectService.getGekregen(state.auth.user.email).then(
            response => {
                this.setState({
                    subject: response.data,
                })
            },
            error => {
                this.setState({
                    subject:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            });
    }

    render() {
        return (<div>
            {this.props.toegewezen && <HomeStudentToegewezen subject={this.state.subject} />}
            {!this.props.toegewezen && <HomeStudentNietToegewezen />}
        </div>);
    }
}
export default homeStudentToewijzing;