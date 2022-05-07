import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));

class CampusService{

    getCampus(){
        return axios.get('http://localhost:8080/api/v1/campus', {
            headers: {
                'Authorization': "Bearer " + user.accessToken}
        });
    }



}

export default new CampusService();
