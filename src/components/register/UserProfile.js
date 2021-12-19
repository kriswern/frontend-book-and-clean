import React, { useState } from "react";
import { useEffect } from "react";
import TokenService from "../../services/TokenService";
import CustomerService from "../../services/CustomerService";
import CleanerService from "../../services/CleanerService";
import "../../css/userProfile.css";

export default function UserProfile() {
    const [user, setUser] = useState({});
    const [role, setRole] = useState();
    const [email, setEmail] = useState();

    useEffect(() => {
        const role = TokenService.getRoleFromToken();
        const email = TokenService.getNameFromToken();
        if (role !== undefined && email !== undefined) {
            setRole(role);
            setEmail(email);
        }
    }, []);

    useEffect(() => {
        function getUserByMail() {
            if (role === "customer") {
                CustomerService.getUserByMail().then((res) => {
                    console.log(res.data);
                    setUser(res.data);
                });
            } else if (role === "cleaner") {
                CleanerService.getUserByMail().then((res) => {
                    console.log(res.data);
                    setUser(res.data);
                });
            }
        }
        getUserByMail();
    }, [role]); 
  
    return (
      <div class="container">      
        <div class="card bg-dark text-white text-left p-3 w-50" >
            <div class="header">Profile</div>
            <div class="card-body">
                <h5 class="card-title">Name :      {user.name}</h5><br/>
                <h5 class="card-title">Address :   {user.address}</h5><br/>
                <h5 class="card-title">Email :     {email}</h5><br/>
                <h5 class="card-title">User type : {role}</h5><br/>
            </div>
        </div>   
        </div>             
    );
}
