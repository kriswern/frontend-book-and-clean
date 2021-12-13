import "../../css/login.css";
import { useEffect, useState, createContext, useContext } from "react";
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
    <div class="login-form-container">
      <div class="card w-25 align-self-center">
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
          <button
            class="
          "
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </button>
          <h5>OR</h5>          
        </form>
        <div>
        <button onClick={()=>history.push("/register")}> Register </button>
        </div>
      </div>
    </div>   
  );
}
