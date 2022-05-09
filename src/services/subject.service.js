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

    putProSubject(title, proMail) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken}
        };

        const data = {
            subjectName: title,
            mail: proMail
        }

        return axios.put("http://localhost:8080/api/v1/subject/pro", data, config);
    }

    putCampusSubject(campussen, title) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken}
        };

        const data = {
            subject: title,
            campussen: campussen
        }

        return axios.put("http://localhost:8080/api/v1/subject/campus", data, config);
    }

    putCoProSubject(coProMail, title) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken}
        };

        const data = {
            subjectName: title,
            copromail: coProMail
        }

        return axios.put("http://localhost:8080/api/v1/subject/copro", data, config);
    }

    postApprovedSubject(title) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken},
            params: {subjectName : title}
        };
        console.log("subjectservice, post approve", title);
        const data = {

        }

        return axios.post("http://localhost:8080/api/v1/subject/approved", data, config);
    }

    postRGGSubject(title) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken},
            params: {subjectName : title}
        };

        const data = {
        }

        return axios.post("http://localhost:8080/api/v1/subject/reedsgoedgekeurd", data, config);
    }

}

export default new SubjectService();
