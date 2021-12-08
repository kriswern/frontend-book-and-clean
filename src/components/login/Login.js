import "../../css/login.css";
import { useEffect, useState, createContext, useContext } from "react";
import LoginService from "../../services/LoginService";
import { UserContext } from "../UserContext";
export default function Login(props) {
  const message = useContext(UserContext);
  const [formData, setFormData] = useState() 
  const [success, setSuccess] = useState();
  const [userData, setUserData] = useState();



function handleSubmit () {
  props.handleUserChange("customer");
 // s et form data here should work
  
   
 }
useEffect(() => {
  
  if(formData !== undefined){
    alert(formData);
    
    LoginService.verifyLogin(formData).then((Response) =>{
      setUserData(Response)
      
    })} 
 
}, [formData]);

useEffect(() => {
  
  if(userData !== undefined){
    
    alert(userData)
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
          " onClick = {() => handleSubmit()}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
