import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getBedrijfBoard() {
    return axios.get(API_URL + "bedrijf", { headers: authHeader() });
  }

  getPromotorBoard() {
    return axios.get(API_URL + "promotor", { headers: authHeader() });
  }

  getStudentBoard() {
    return axios.get(API_URL + "student", { headers: authHeader() });
  }

  getCoordinatorBoard() {
    return axios.get(API_URL + "coordinator", { headers: authHeader() });
  }
}

export default new UserService();
