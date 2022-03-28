/*

import React, {Component} from 'react';
import axios from 'axios';
import {addSubject} from '../actions/addsubject';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";


const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

//const API_URL = "http://localhost:8080/api/v1/subject/";
const user = JSON.parse(sessionStorage.getItem('user'));
console.log(parseJwt(user.accessToken));


const token = parseJwt(user.accessToken);
class AddSubject extends Component {
    constructor(props) {
        super(props);

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.submitFormSubject = this.submitFormSubject.bind(this);

        this.state = {
            title: "",
            description: "",
            successful: false
        };
    }

    onChangeTitle(e){
        this.setState({
            title: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    submitFormSubject(e) {
        e.preventDefault();

        const SubjectFormData = new FormData();
        SubjectFormData.append("title", this.state.title)
        SubjectFormData.append("description", this.state.description)

        try{
            const response = axios({
                method: "post",
                url: "http://localhost:8080/api/v1/subject/",
                data: SubjectFormData,
                headers: { "content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`                },
            });
        } catch(error){
            console.log(error)
        }
        /*
        this.setState({
            successful: false,
        });
        this.state
            .dispatch(
                addSubject(this.state.title, this.state.description)
            )
            .then(() => {
                this.setState({
                    successful: true,
                });
            })
            .catch(() => {
                this.setState({
                    successful: false,
                });
            });

        /*const article = {
            title: e.target.title,
            description: e.target.title
        }
        axios.post(API_URL, article)
            .then(res => {
                console.log(res.data);
            })*/

    /*

    }

    render() {

        return (
            <div>
                <h2>Add a new Subject!</h2>
                <form onSubmit={(e) => this.submitFormSubject(e)}
                      ref={(c) => {
                          this.form = c;
                      }}>

                    <label>Subject title:</label>
                    <input type="text"
                           required
                           placeholder="Title"
                           className="form-control"
                           name="title"
                           onChange={(e) => this.onChangeTitle(e)}
                           defaultValue={this.state.title}
                    />
                    <label>Subject Description:</label>
                    <input type="text"
                           required
                           placeholder="Description"
                           className="form-control"
                           name="description"
                           onChange={(e) => this.onChangeDescription(e)}
                           defaultValue={this.state.description}
                    />
                    {/*
                    <label>Promotor:</label>
                    <input type="text"
                           required
                    />
                    <label>Company:</label>
                    <input type="text"
                           required
                    />*/
    /*
                    <button>Submit</button>
                    <CheckButton
                        style={{ display: "none" }}
                        ref={(c) => {
                            this.checkBtn = c;
                        }}
                    />
                </form>
            </div>

        );
    }
}

export default AddSubject;*/