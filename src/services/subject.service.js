import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));

class SubjectService{
    postSubject(title,description,campussen,copromotoren,bedrijf,promotor,opleiding,email) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken},
            params: {mail: email}
        };

        const data = {
            name: title,
            description: description,
            campussen: campussen,
            copromotoren: copromotoren,
            bedrijf: bedrijf,
            promotor: promotor,
            opleidingen: opleiding,
        }

        return axios.post("http://localhost:8080/api/v1/subject", data, config);
    }

    getOneSubject(name){
        return axios.get('http://localhost:8080/api/v1/subject/subjectdetails', {
            headers: {'Authorization': "Bearer " + user.accessToken},
            params: { subjectName: name }
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

        const data = {};

        return axios.post("http://localhost:8080/api/v1/subject/approved",data, config);
    }

    postRGGSubject(title) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken},
            params: {subjectName : title}
        };

        const data = {};

        return axios.post("http://localhost:8080/api/v1/subject/reedsgoedgekeurd",data, config);
    }

    getTargetSubjects(mail) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken },
            params: { mail : mail }
        };

        return axios.get("http://localhost:8080/api/v1/subject/targetsubjects", config);
    }

    //subjects per promotor
    getSperPro(mail) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken },
            params: { mail : mail }
        };

        return axios.get("http://localhost:8080/api/v1/subject/subjectsprom", config);
    }


    getBedrijfSubjects(mail) {
        const config = {
            headers: {Authorization: "Bearer " + user.accessToken},
            params: {mail: mail}
        };

        return axios.get("http://localhost:8080/api/v1/subject/onderwerpperbedrijf", config);
    }

    //alle bedrijven
    getBedrijven() {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken },
        }

        return axios.get("http://localhost:8080/api/v1/subject/bedrijven", config);
    }



    ///////////////////////COORDINATOR

    //met promotor
    getSubject(email){
        return axios.get('http://localhost:8080/api/v1/subject/prosub', {
            headers: {'Authorization': "Bearer " + user.accessToken},
            params: {mail: email}
        });
    }



    getSubjectsNoPro(email) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken },
            params: {mail: email}
        }

        return axios.get("http://localhost:8080/api/v1/subject/noproforu", config);
    }

    postPromotor(name, email) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken},
            params: {subjectName : name, mail : email}
        };

        const data = {};

        return axios.post("http://localhost:8080/api/v1/subject/pro",data, config);
    }



    ///////////////////////////////////////////////////


    //////PROMOTOR
    getAllSubsPerPro(email) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken },
            params: {mail: email}
        }

        return axios.get("http://localhost:8080/api/v1/subject/allsubsperpro", config);
    }



    /////////STUDENT
    //studentkeuzes, map met als int keuznr en ernaast onderwerp
    getAllKeuzes(email) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken },
            params: {mail: email}
        }

        return axios.get("http://localhost:8080/api/v1/subject/allkeuzesstudent", config);
    }

    //student toegewezen onderwerp
    getGekregen(email) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken },
            params: {mail: email}
        }

        return axios.get("http://localhost:8080/api/v1/subject/gekregensubj", config);
    }


    ////////BEDRIJF
    //studenten die onderwerp bij dit bedrijf hebben, vorm Map<User, Subject>
    getStudMetBedrijf(email) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken },
            params: {mail: email}
        }

        return axios.get("http://localhost:8080/api/v1/subject/getstudentenmetjouwsubjects", config);
    }


    //COORDINATOR
    //alle target en approved onderwerpen los van beschikbaarheid
    getAll(email) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken },
            params: {mail: email}
        }

        return axios.get("http://localhost:8080/api/v1/subject/getAllTargetSubs", config);
    }

    getTargetSubsStuds(email) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken },
            params: {mail: email}
        }

        return axios.get("http://localhost:8080/api/v1/subject/getTSubForS", config);
    }



}




export default new SubjectService();
