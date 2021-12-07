import { useEffect, useState } from "react";
import axios from "axios";
import "../../css/login.css";

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameInput = (e) => {
    setUsername(e.target.value)
}
const passwordInput = (e) => {
  setPassword(e.target.value)
}

const handleSubmit = (e) => {
  e.preventDefault()
  axios.post('http://localhost:8080/login', {
    username: username,
    password: password
  })
  .then(function (response) {
    console.log(response);
    localStorage.setItem("token", response.data.jwt)
  })
  .catch(function (error) {
    console.log(error);
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
              type="text"
              class="form-control"
              id="inputEmail"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={username}
              onChange={usernameInput}
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
              value={password}
              onChange={passwordInput}
              required
            />
          </div>
          <button type="submit" class="btn btn-primary mt-2" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
