import axios from "axios";
import TokenService from "../services/TokenService";

const USER_REGISTER_REST_API_URL = "http://localhost:8080/register";

class RegisterService {
  registerUser(registerForm) {
    const token = TokenService.getToken();
    console.log(registerForm);
    if (token == null) {
      axios.post(USER_REGISTER_REST_API_URL, registerForm).then((response) => {
        if (response.status === 201) {
          alert("Welcome " + registerForm.name + " you are registered !");
          return true;
        } else if (response.status === 208) {
          alert(
            "Error..... " +
              registerForm.email +
              " email Id is already registered. "
          );
          return false;
        }
      });
    } else {
      const header = TokenService.getTokenHeader();
      console.log(registerForm);
      axios
        .post(USER_REGISTER_REST_API_URL, registerForm, header)
        .then((response) => {
          if (response.status === 201) {
            alert("Welcome " + registerForm.name + " you are registered !");
            return true;
          } else if (response.status === 208) {
            alert(
              "Error..... " +
                registerForm.email +
                " email Id is already registered. "
            );
            return false;
          }
        });
    }
  }
}
export default new RegisterService();
