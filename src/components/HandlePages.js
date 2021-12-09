import Login from "./login/Login";
import CleanerPage from "./Pages/cleanerPage/CleanerPage"
import CustomerPage from "./Pages/customerPage/CustomerPage";
import AdminPage from "./Pages/adminPage/AdminPage";
import { useEffect, useState } from 'react/cjs/react.development';
import jwt from 'jwt-decode';

export default function HandlePages() {
    const pageComponents = {
        login: Login,
        cleaner: <CleanerPage/>,
        customer: <CustomerPage/>,
        admin: <AdminPage/>,
      }
     
      const [activeUser, setActiveUser] = useState()
      const [activePage, setActivePage] = useState(<Login handleUserChange = {handleUserChange}/>);
    
     
      
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
          console.log(decodedToken.sub)
       setActiveUser({type: decodedToken.roles[0]});
      }
      
      

      return(
          <div>
              {activePage}
          </div>
         
      )


}