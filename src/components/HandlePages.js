import Login from "./login/Login";
import CleanerPage from "./Pages/cleanerPage/CleanerPage"
import CustomerPage from "./Pages/customerPage/CustomerPage";
import AdminPage from "./Pages/adminPage/AdminPage";
import TokenService from "../services/TokenService"
import { useEffect, useState } from 'react/cjs/react.development';
import jwt from 'jwt-decode';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export default function HandlePages() {
    const pageComponents = {
        login: Login,
        cleaner: <CleanerPage/>,
        customer: <CustomerPage/>,
        admin: <AdminPage/>,
      }
     
      const [activeUser, setActiveUser] = useState()
      const [activePage, setActivePage] = useState(<Login handleUserChange = {handleUserChange}/>);
    
     useEffect(() => {
         const role = TokenService.getRoleFromToken()
         if(role !== undefined) {
             setActiveUser({type: role})
         }
     },[])
      
      useEffect (() => { 
        if (activeUser !== undefined){
            (activeUser.type in pageComponents) ? 
                setActivePage(pageComponents[activeUser.type]) :
                setActivePage((<Login handleUserChange = {handleUserChange}/>))
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
                  <Route path = "/login" component = {Login}/>  
                  <Route path = "/adminPage" component = {AdminPage}/>  
                  <Route path = "/customerPage" component = {CustomerPage}/>  
                  <Route path = "/cleanerPage" component = {CleanerPage}/>  
                </Switch>
                
              </div>
          
         
      )


}