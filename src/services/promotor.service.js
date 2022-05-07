import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));

class PromotorService{

    getPromotor(){
        return axios.get('http://localhost:8080/api/v1/person', {
            headers: {
                'Authorization': "Bearer " + user.accessToken}
        });
    }



}

export default new PromotorService();
