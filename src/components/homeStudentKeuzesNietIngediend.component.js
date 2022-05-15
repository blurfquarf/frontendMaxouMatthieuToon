import React, {Component} from "react";
import {Link} from "react-router-dom";

class homeStudentKeuzesNietingediend extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <header className="jumbotron">
                <h4 style={{textAlign:"center"}}>You haven't submitted your Top 3 yet!  <Link className="btn btn-primary link-btn" to="/topSubjects"> Submit your Top 3 now!</Link></h4>
            </header>
        </div>);
    }
}
export default homeStudentKeuzesNietingediend;