import {Component, useState} from 'react';
import axios from 'axios';
/*

const API_URL = "http://localhost:8080/api/v1/subject/";

class AddSubject extends Component {

    const [data, setData] = useState({
        name:"",
        description:""
    })

    function handleFormSubject(e) {
        const newdata={...data};
        newdata[e.target.id] = e.target.value;
        setData(newdata);
    }

    function submitFormSubject(e) {
        e.preventDefault();
        const article = {
            name: data.title,
            description: data.description
        }
        axios.post(API_URL ,article)
            .then(res => {
                console.log(res.data);
            })
    }

    return (
        <div>
            <h2>Add a new Subject!</h2>
            <form onSubmit={(e)=>submitFormSubject(e)}>
                <label>Subject title:</label>
                <input  type="text"
                        required
                        placeholder="Title"
                        onChange={(e)=>handleFormSubject(e)}
                        id="title"
                        value={data.title}
                />
                <label>Subject Description:</label>
                <input  type="text"
                        required
                        placeholder="Description"
                        onChange={(e)=>handleFormSubject(e)}
                        id="description"
                        value={data.description}
                />
                {/*
                <label>Promotor:</label>
                <input  type="text"
                        required
                />
                <label>Company:</label>
                <input  type="text"
                        required
                />
                */


   /*             <button>Submit</button>
            </form>
        </div>
    )
}

export default AddSubject;
*/