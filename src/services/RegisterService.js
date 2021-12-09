import axios from "axios";
import TokenService from "../services/TokenService"

const USER_REGISTER_REST_API_URL = 'http://localhost:8080/register'


class RegisterService{

    registerUser(registerForm) {
    console.log(registerForm)
    const header = TokenService.getTokenHeader()
    if(header !== undefined){
      axios.post(USER_REGISTER_REST_API_URL, registerForm, header).then((response) => {
        if(response.status === 200) {
          return true;
        }
      });
    }
  }
}

export default new RegisterService();