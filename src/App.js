
import './App.css';

import Layout from './components/Layout';

import CustomerPage from './components/Pages/customerPage/CustomerPage'
import CleanerPage from './components/Pages/cleanerPage/CleanerPage';
import Login from './components/login/Login';
import { useEffect, useState } from 'react/cjs/react.development';
import AdminPage from './components/Pages/adminPage/AdminPage';

// should proberly be activeuser


export default function App() {
  const pageComponents = {
    login: Login,
    cleaner: <CleanerPage/>,
    customer: <CustomerPage/>,
    admin: AdminPage,
  }
 
  const [activeUser, setActiveUser] = useState()
  const [activePage, setActivePage] = useState();

 
  
  useEffect (() => { 
    if (activeUser !== undefined){
      alert(activeUser.type);
    
     if (activeUser.type in pageComponents){
       alert("in true")
      
      setActivePage( pageComponents[activeUser.type])
     }else{
       alert("in false");
      setActivePage((<Login handleUserChange = {handleUserChange}/>))
     }
      
     
      
    
    }
  },[activeUser])

  function handleUserChange(userData){
    
   setActiveUser({type: userData});
  }
  
  alert(activePage);
  return (
   <Layout>
     {activePage ? (
       {activePage}
     ):(
      <Login handleUserChange = {handleUserChange}/>
     )

     }
     
    
   </Layout>
  );
}


