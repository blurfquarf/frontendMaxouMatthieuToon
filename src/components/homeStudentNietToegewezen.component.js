import React, {Component} from "react";

class homeStudentNietToegewezen extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <header className="jumbotron">
                <h4>The coordinator hasn't assigned you a subject yet!</h4>
            </header>
        </div>);
    }

}
export default homeStudentNietToegewezen;