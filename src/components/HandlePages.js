import Login from "./login/Login";
import CleanerPage from "./Pages/cleanerPage/CleanerPage"
import CustomerPage from "./Pages/customerPage/CustomerPage";
import AdminPage from "./Pages/adminPage/AdminPage";
import TokenService from "../services/TokenService"
import { useEffect, useState } from 'react/cjs/react.development';
import jwt from 'jwt-decode';
import { useHistory } from "react-router-dom"
import { BrowserRouter as Router,Switch,Route,} from "react-router-dom";

export default function HandlePages() {
    const history = useHistory()
   
     
      const [activeUser, setActiveUser] = useState()
    
     useEffect(() => {
         const role = TokenService.getRoleFromToken()
         if(role !== undefined) {
             setActiveUser({type: role})
         }else{
            history.push("/login");
         }
     },[])
      useEffect (() => { 
        if (activeUser !== undefined){
            history.push("/" + activeUser.type)
        }
      },[activeUser])
    
      function handleUserChange(userData){
          const token = userData.jwt
          localStorage.setItem('access_token', token);
          const decodedToken = jwt(token);
       setActiveUser({type: decodedToken.roles[0]});
      }
      
      
     
      return(
        
              <div>
                <Switch>
                  <Route path = "/login" render = {() => <Login handleUserChange= {handleUserChange}/>}/>  
                  <Route path = "/admin" component = {AdminPage}/>  
                  <Route path = "/customer" component = {CustomerPage}/>  
                  <Route path = "/cleaner" component = {CleanerPage}/>  
                </Switch>
                
              </div>
          
         
      )


}