import Login from "./login/Login";
import CleanerPage from "../components/Pages/cleanerPage/CleanerPage"
import CustomerPage from "./Pages/customerPage/CustomerPage";
import AdminPage from "./Pages/adminPage/AdminPage";
import { useEffect, useState } from 'react/cjs/react.development';

export default function HandlePages() {
    const pageComponents = {
        login: Login,
        cleaner: <CleanerPage/>,
        customer: <CustomerPage/>,
        admin: AdminPage,
      }
     
      const [activeUser, setActiveUser] = useState()
      const [activePage, setActivePage] = useState(<Login handleUserChange = {handleUserChange}/>);
    
     
      
      useEffect (() => { 
        if (activeUser !== undefined){
          alert(activeUser.type);
        
         if (activeUser.type in pageComponents){
           alert("in true")
          
          setActivePage(pageComponents[activeUser.type])
         }else{
           alert("in false");
          setActivePage((<Login handleUserChange = {handleUserChange}/>))
         }
          
         
          
        
        }
      },[activeUser])
    
      function handleUserChange(userData){
        // should be gotten from repsonse
       setActiveUser({type: userData});
      }
      
      

      return(
          <div>
              {activePage}
          </div>
         
      )


}