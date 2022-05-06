import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));

class SubjectService{
    postSubject(title,description,approved,campus,reedsGoedgekeurd,promotor) {

        //console.log(user.accessToken)
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken}
        };

        const data = {
            name: title,
            description: description,
            approved: approved,
            campus: campus,
            reedsGoedgekeurd: reedsGoedgekeurd,
            promotor: promotor,
        }

        return axios.post("http://localhost:8080/api/v1/subject", data, config);
    }

    getSubject(){
        return axios.get('http://localhost:8080/api/v1/subject', {
            headers: {
                'Authorization': "Bearer " + user.accessToken}
        });
    }

}

export default new SubjectService();
