import './css/Layout.css'
import TokenService from './services/TokenService';
import { useEffect, useState } from 'react/cjs/react.development';
import jwt from 'jwt-decode';
import { useHistory } from "react-router-dom"
import { BrowserRouter as Router,Switch,Route, Link} from "react-router-dom";
import Booking from './components/booking/CleanerBooking';
import Bookings from './components/booking/Bookings';
import NewBooking from './components/booking/NewBooking';
import Login from './components/login/Login';
import Layout from "./components/Layout"
import UserNav from "./components/Pages/userNav"
import RegisterForm from './components/register/RegisterForm';
import CleanerBooking from './components/booking/CleanerBooking';


export default function App() {
  const history = useHistory()
   
  const [activeUser, setActiveUser] = useState()

   const userRoutes = new Map([
     ["admin", ["/admin/bookings", "/admin/newbooking", "/admin/register" ]],
     ["customer", ["/customer/bookings", "/customer/newbooking"]],
     ["cleaner", ["/cleaner/bookings"]],
   ]);
 
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
 
   if (!activeUser) return <Login handleUserChange= {handleUserChange}/> 

  return (
   <Layout>
      <UserNav
        routes={userRoutes.get(activeUser.type)}
      />  
     <Switch>
                <Route path = "/login" render = {() => <Login handleUserChange= {handleUserChange}/>}/>  
                <Route path="/admin/bookings" exact component={Bookings} />
                <Route path="/admin/newbooking" component={NewBooking} />
                <Route path="/admin/register" component={RegisterForm} />

                <Route path="/customer/bookings" component={Bookings} />
                <Route path="/customer/newbooking" component={NewBooking} />

                <Route path="/cleaner/bookings" component = {Bookings} />
                </Switch>
   </Layout>
  );
}


