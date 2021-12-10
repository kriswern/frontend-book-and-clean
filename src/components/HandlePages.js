import Login from "./login/Login";
import TokenService from "../services/TokenService"
import { useEffect, useState } from 'react/cjs/react.development';
import UserNav from "./Pages/userNav";
import jwt from 'jwt-decode';
import { useHistory } from "react-router-dom"
import { BrowserRouter as Router,Switch,Route, Link} from "react-router-dom";
import Bookings from "./booking/Bookings";
import NewBooking from "./booking/NewBooking";
import RegisterForm from "./register/RegisterForm";

export default function HandlePages() {
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
     
      return(

              <div>
                <UserNav
        routes={userRoutes.get(activeUser.type)}
      />
                
                <Switch>
                <Route path = "/login" render = {() => <Login handleUserChange= {handleUserChange}/>}/>  
                <Route path="/admin/bookings" exact component={Bookings} />
                <Route path="/admin/newbooking" component={NewBooking} />
                <Route path="/admin/register" component={RegisterForm} />

                <Route path="/customer/bookings" component={Bookings} />
                <Route path="/customer/newbooking" component={RegisterForm} />

                <Route path="/cleaner/bookings" render = {() => <Bookings/>} />
                </Switch>
                
              </div>
          
         
      )


}