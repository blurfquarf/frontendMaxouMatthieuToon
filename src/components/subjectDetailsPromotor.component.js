import {Component} from "react";
import React from "react";
import subjectService from "../services/subject.service";
import {
    Col,
    Container, ListGroupItem, Row
} from 'reactstrap';

export default class subjectDetailsPromotor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content : [],
        };
    }

    componentDidMount(){
        subjectService.getSubject().then(
            response => {
                this.setState({
                    content: response.data,
                });
                console.log("response: ", response.data);
                console.log("props.match.params.id: ", this.props.match.params.id);
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

    render () {
        const {content} = this.state;
        console.log(content);
        return(
            <div className="center-content">
                {content.filter((content) => content.id == this.props.match.params.id).map(content => {
                    let campussen;
                    if(content.campussen.length != 0){
                        campussen = (
                            <div style={{display:"flex"}}>
                                <ul>
                                    {content.campussen.map(function(d, idx){
                                        return (<li key={idx}  className="campus-li">{d.name}</li>)
                                    })}
                                </ul>
                            </div>)
                    }
                    let copromotoren;
                    if(content.copromotoren.length !=0){
                        copromotoren = (
                            <div style={{display:"flex"}}>
                                <ul>
                                    {content.copromotoren.map(function(d, idx){
                                        return (<li key={idx}  className="campus-li">{d.name}</li>)
                                    })}
                                </ul>
                            </div>)
                    }
                    else {
                        copromotoren = (
                            <div>
                                <p>There are no co-promotors for this subject</p>
                            </div>
                        )
                    }
                    return(
                        <Container key={content.id}>
                            <div>
                                <h1 className="subj-details-title">{content.name}</h1>

                            </div>
                            <div>
                                <h3>Description</h3>
                                <p>{content.description}</p>
                            </div>
                            <div>
                                <h3>Campuses</h3>
                                {campussen}
                            </div>
                            <div>
                                <h3>Promotor</h3>
                                <p>{content.promotor}</p>
                            </div>
                            <div>
                                <h3>Co-promotors</h3>
                                {copromotoren}
                            </div>
                        </Container>
                    );
                })}
            </div>
        );
    }
}