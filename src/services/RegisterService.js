import axios from "axios";

const USER_REGISTER_REST_API_URL = 'http://localhost:8080/register'


class RegisterService{

    registerUser(registerForm) {
    console.log(registerForm)
    axios.post(USER_REGISTER_REST_API_URL, registerForm).then((response) => {
      if(response.status === 200) {
        return true;
      }
    });
  }
}

export default new RegisterService();