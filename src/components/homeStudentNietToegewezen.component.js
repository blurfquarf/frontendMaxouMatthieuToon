import React, {Component} from "react";
import {Link} from "react-router-dom";

class homeStudentNietToegewezen extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <header>
                <h4>The coordinator hasn't assigned you a subject yet!</h4>
            </header>
        </div>);
    }

}
export default homeStudentNietToegewezen;