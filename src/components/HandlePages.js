import Login from "./login/Login";
import CleanerPage from "./Pages/cleanerPage/CleanerPage"
import CustomerPage from "./Pages/customerPage/CustomerPage";
import AdminPage from "./Pages/adminPage/AdminPage";
import { useEffect, useState } from 'react/cjs/react.development';

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
       setActiveUser({type: userData});
      }
      
      

      return(
          <div>
              {activePage}
          </div>
         
      )


}