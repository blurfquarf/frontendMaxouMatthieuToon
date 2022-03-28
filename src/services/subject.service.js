import axios from 'axios';


class SubjectService{

    addSubject(title, description) {
        const data= {
            title: title,
            description: description
        };
        return axios.post("http://localhost:8080/api/v1/subject", data);
    }

}

export default new SubjectService();