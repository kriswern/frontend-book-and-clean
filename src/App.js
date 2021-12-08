
import './App.css';

import Layout from './components/Layout';

import CustomerPage from './components/Pages/customerPage/CustomerPage';
import CleanerPage from './components/Pages/cleanerPage/CleanerPage';
import Login from './components/login/Login';
import { useEffect, useState } from 'react/cjs/react.development';
import { UserContext } from './components/UserContext';
import AdminPage from './components/Pages/adminPage/AdminPage';

// should proberly be activeuser


export default function App() {
  const pageComponents = {
    login: <Login handleUserChange = {handleUserChange}/>,
    cleaner: <CleanerPage/>,
    customer: <CustomerPage/>,
    admin: <AdminPage/>,
  }
 
  const [activeUser, setActiveUser] = useState()
  const [activePage, setActivePage] = useState(pageComponents["login"]);

 
  
  useEffect (() => { 
    if (activeUser !== undefined){
      let Page = null;
      (pageComponents[activeUser.type]) ? Page = pageComponents[activeUser.type] :
                                          Page = pageComponents["login"]
      setActivePage(<Page/>)
    }
  },[activeUser])

  function handleUserChange(userData){
    
   setActiveUser({type: userData});
  }
  

  return (
   <Layout>
     <UserContext.Provider value= "activeUser">
     {activePage}
    </UserContext.Provider>
   </Layout>
  );
}


