import "../../css/login.css";
import { useEffect, useState } from "react";
import LoginService from "../../services/LoginService";
import { useHistory } from "react-router-dom"
export default function Login(props) {
  const [formData, setFormData] = useState();
  const [userData, setUserData] = useState();

  const history = useHistory();
 
  function handleSubmit(e) {
    e.preventDefault();
    const email = document.getElementById("inputEmail").value;
    const password = document.getElementById("inputPassword").value;
    setFormData({ username: email, password: password });
  }
  useEffect(() => {
    if (formData !== undefined) {
      getLoginResponse();
    }
  }, [formData]);

 
  useEffect(() => {
    if (userData !== undefined) {
      props.handleUserChange(userData);
    }
  }, [userData]);

  function getLoginResponse() {
    LoginService.verifyLogin(formData).then((response) => {
      setUserData(response.data);
    });
  }
  return (  
   
    <div class="login_form_container">
      <div class="card">
        <div class="card-header text-center">Login</div>
        <form class="card-body">
          <div class="form-group">
            <label for="inputEmail">Email address</label>
            <input
              type="email"
              class="form-control"
              id="inputEmail"
              aria-describedby="emailHelp"
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class="form-group mt-2">
            <label for="inputPassword">Password</label>
            <input
              type="password"
              class="form-control"
              id="inputPassword"
              placeholder="Password"
              required
            />
          </div>
          <div class= "login_button_box">
          <button class="submit_button"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </button>
          <button class="register_button" onClick={()=>history.push("/register")}> Register </button>

          </div>
          
        </form>
        <div>
        
        </div>
      </div>
    </div>   
   
  );
}
