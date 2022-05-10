import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));

class SubjectService{
    postSubject(title,description,campussen,copromotoren,bedrijf,promotor) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken}
        };

        const data = {
            name: title,
            description: description,
            campussen: campussen,
            copromotoren: copromotoren,
            bedrijf: bedrijf,
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

    postProSubject(title, proMail) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken},
            params: {subjectName : title, mail:proMail}
        };


        return axios.post("http://localhost:8080/api/v1/subject/pro", config);
    }

    postCampusSubject(campussen, title) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken},
            params : {campussen:campussen, subject: title}
        };

        return axios.post("http://localhost:8080/api/v1/subject/campus", config);
    }

    postCoProSubject(coProMail, title) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken},
            params: {copromail: coProMail, subjectName: title}
        };

        return axios.post("http://localhost:8080/api/v1/subject/copro", config);
    }

    postApprovedSubject(title) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken},
            params: {subjectName : title}
        };

        return axios.post("http://localhost:8080/api/v1/subject/approved", config);
    }

    postRGGSubject(title) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken},
            params: {subjectName : title}
        };

        return axios.post("http://localhost:8080/api/v1/subject/reedsgoedgekeurd", config);
    }

}

export default new SubjectService();
