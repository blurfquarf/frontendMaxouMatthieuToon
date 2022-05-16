import React, {Component} from "react";
import personService from "../services/person.service";
import HomeStudentToegewezen from "./HomeStudentToegewezen.component";
import store from "../store";
import HomeStudentNietToegewezen from "../components/homeStudentNietToegewezen.component";

class homeStudentToewijzing extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: [],
        }
    }

    componentDidMount() {
        const state = store.getState();
        personService.getUser(state.auth.user.email).then(
            response => {
                this.setState({
                    user: response.data,
                })
            },
            error => {
                this.setState({
                    user:
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
            {this.state.user.heeftDefinitiefOnderwerp && <HomeStudentToegewezen />}
            {!this.state.user.heeftDefinitiefOnderwerp && <HomeStudentNietToegewezen />}
        </div>);
    }
}
export default homeStudentToewijzing;