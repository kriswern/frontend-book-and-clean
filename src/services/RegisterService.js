import axios from "axios";

const USER_REGISTER_REST_API_URL = 'http://localhost:8080/register'


class RegisterService{

    registerUser(registerForm) {
    console.log(registerForm)
    axios.post(USER_REGISTER_REST_API_URL, registerForm).then((response) => {
      if(response.status === 201) {
        alert("Welcome "+ registerForm.name +" you are registered !" );
        return true;
      }else if(response.status === 208){
        alert("Error..... "+registerForm.email+ " email Id is already registered. " );
        return true;
      }
    });
  }
}

export default new RegisterService();