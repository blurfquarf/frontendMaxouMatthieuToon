import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));

class PersonService {
    getPromotor(){
        return axios.get('http://localhost:8080/api/v1/person', {
            headers: {
                'Authorization': "Bearer " + user.accessToken}
        });
    }

    postTop3(keuze1, keuze2, keuze3,mail){
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken},
            params: {keuze1 : keuze1, keuze2: keuze2, keuze3: keuze3, studentMail:mail}
        }



        return axios.post('http://localhost:8080/api/v1/person/keuzes', {}, config);
    }


    //studenten per subject voor promotor
    getSperSub(subjectName) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken },
            params: { subjectName : subjectName }
        };

        return axios.get("http://localhost:8080/api/v1/person/studentenpersubkeuze", config);
    }


    //subjects voor coordinator
    getSubsPerCoord(mail) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken },
            params: { mail : mail }
        };

        return axios.get("http://localhost:8080/api/v1/subject/subsvoorcoord", config);
    }


    //gebooste studenten per subject voor coordinator
    getBoostedStudCoord(subjectName) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken },
            params: { subjectName : subjectName }
        };

        return axios.get("http://localhost:8080/api/v1/person/boostedstud", config);
    }

    //niet gebooste studenten per subject voor coordinator
    getNONBoostedStudCoord(subjectName) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken },
            params: { subjectName : subjectName }
        };

        return axios.get("http://localhost:8080/api/v1/person/nonboostedstud", config);
    }

    getOpleidingen() {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken },
        }

        return axios.get("http://localhost:8080/api/v1/person/opleidingen", config);
    }

    //aantal stud per subj
    getStudCount(subjectName) {
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken },
            params: { subjectName : subjectName }
        };

        return axios.get("http://localhost:8080/api/v1/person/count", config);
    }

    postBoostStudent(subjectName, studentMail){
        const config = {
            headers: { Authorization: "Bearer " + user.accessToken },
            params: { subjectName : subjectName, studentMail: studentMail }
        };

        const data = {};

        return axios.post("http://localhost:8080/api/v1/person/boost",data, config );
    }

}



export default new PersonService();
