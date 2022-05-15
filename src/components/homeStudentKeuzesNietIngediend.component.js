import React, {Component} from "react";
import {Link} from "react-router-dom";

class homeStudentKeuzesNietingediend extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <header>
                <h4>You haven't submitted your Top 3 yet!</h4>
                <Link className="btn btn-primary link-btn" to="/topSubjects"> Submit your Top 3 now!</Link>
            </header>
        </div>);
    }
}
export default homeStudentKeuzesNietingediend;