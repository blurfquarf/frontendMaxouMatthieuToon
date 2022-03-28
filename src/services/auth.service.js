import axios from "axios";


class AuthService {
  login(username, password) {
    return axios
      .post("http://localhost:8080/api/auth/login", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    const data = {
                       username: username,
                       email: email,
                       password: password
                     };
    return axios.post("http://localhost:8080/api/auth/register", data);
  }
}

export default new AuthService();
