import "../../css/login.css";
import { useEffect, useState, createContext, useContext } from "react";
import LoginService from "../../services/LoginService";
export default function Login(props) {

  const [formData, setFormData] = useState() 
  const [success, setSuccess] = useState();
  const [userData, setUserData] = useState();



function handleSubmit (e) {
  e.preventDefault();
  const email = document.getElementById("inputEmail").value;
  const password = document.getElementById("inputPassword").value;
  setFormData({email:email,password:password})
  //props.handleUserChange();
 // s et form data here should work
  
   
 }
useEffect(() => {
  
  if(formData !== undefined){
    alert("change form data");
    getLoginResponse();
   } 
 
}, [formData]);

function getLoginResponse() {
  LoginService.verifyLogin(formData).then((response) =>{
    alert("inside response");
    setUserData(response.data);
    
  })
}
useEffect(() => {
  
  if(userData !== undefined){
    props.handleUserChange(userData)
   
    } 
 
}, [userData]);
console.log(success);
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
          <button  class="
          " onClick = {(e) => handleSubmit(e)}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
