import "../../css/login.css";
import { useEffect, useState } from "react";
import LoginService from "../../services/LoginService";
import { useHistory } from "react-router-dom";

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
      LoginService.verifyLogin(formData).then((response) => {
        setUserData(response.data);
      }).catch(error => {
        document.getElementById("inputEmail").value = ""
        document.getElementById("inputPassword").value = ""
      });
    }
  }, [formData]);

  useEffect(() => {
    if (userData !== undefined) {
      props.handleUserChange(userData);
    }
  }, [userData, props]);

  return (
    <div className="login_form_container">
      <div className="card">
        <div className="card-header text-center">Login</div>
        <form className="card-body">
          <div className="form-group">
            <label htmlFor="inputEmail">Email address</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="someone@example.com"
              aria-describedby="emailHelp"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group mt-2">
            <label htmlFor="inputPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Password"
              required
            />
          </div>
          <div className="login_button_box">
            <button className="submit_button" onClick={(e) => handleSubmit(e)}>
              Submit
            </button>
            <button
              className="register_button"
              onClick={() => history.push("/register")}
            >
              {" "}
              Register{" "}
            </button>
          </div>
        </form>
        <div></div>
      </div>
    </div>
  );
}
