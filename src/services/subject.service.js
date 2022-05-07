import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));

class SubjectService{
    postSubject(title,description,approved) {

        //console.log(user.accessToken)
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken}
        };

        const data = {
            name: title,
            description: description,
            approved: approved
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

    putApprovedSubject(title) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken}
        };

        const data = {
            subjectName: title
        }

        return axios.put("http://localhost:8080/api/v1/subject/approved", data, config);
    }

    putRGGSubject(title) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken}
        };

        const data = {
            subjectName: title
        }

        return axios.put("http://localhost:8080/api/v1/subject/reedsgoedgekeurd", data, config);
    }

}

export default new SubjectService();
