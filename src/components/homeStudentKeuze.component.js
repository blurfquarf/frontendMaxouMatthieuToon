import React, {Component} from "react";
import personService from "../services/person.service";
import HomeStudentKeuzesIngediend from "./homeStudentKeuzesIngediend.component";
import store from "../store";
import HomeStudentKeuzesNietIngediend from "../components/homeStudentKeuzesNietIngediend.component";

class homeStudentIndienen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            keuzesIngediend: false,
        }
    }

    componentDidMount() {
        const state = store.getState();
        personService.getKeuzesIngediend(state.auth.user.email).then(
            response => {
                this.setState({
                    keuzesIngediend: response.data,
                })
            },
            error => {
                this.setState({
                    keuzesIngediend:
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
            {this.state.keuzesIngediend && <HomeStudentKeuzesIngediend />}
            {!this.state.keuzesIngediend && <HomeStudentKeuzesNietIngediend />}
        </div>);
    }

}
export default homeStudentIndienen;