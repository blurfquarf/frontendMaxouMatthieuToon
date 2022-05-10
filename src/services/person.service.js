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

        return axios.post("http://localhost:8080/api/v1/person/keuzes", config)
    }



}

export default new PersonService();
