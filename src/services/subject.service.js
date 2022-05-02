import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));

class SubjectService{
    postSubject(title, description, approved) {

        //console.log(user.accessToken)
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken}
        };

        const data = {
            name: title,
            description: description,
            approved: false
        };

        return axios.post("http://localhost:8080/api/v1/subject", data, config);
    }

    getSubject(){
        return axios.get('http://localhost:8080/api/v1/subject', {
            headers: {
                'Authorization': "Bearer " + user.accessToken}
        });
    }

    putSubject(title, description, approved) {

        const config = {
            headers: { Authorization: "Bearer " + user.accessToken}
        };

        const data = {
            name: title,
            description: description,
            approved: approved
        };

        return axios.put("http://localhost:8080/api/v1/subject", data, config);

    }


}

export default new SubjectService();
