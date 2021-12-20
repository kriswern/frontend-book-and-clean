import axios from "axios";

const LOGIN_REST_API_URL = "http://localhost:8080/login";

class LoginService {
  verifyLogin(userData) {
    return axios.post(LOGIN_REST_API_URL, userData);
  }
}

export default new LoginService();
