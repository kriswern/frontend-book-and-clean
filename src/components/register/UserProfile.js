import React, { useState } from "react";
import { useEffect } from "react";
import TokenService from "../../services/TokenService";
import CustomerService from "../../services/CustomerService";
import CleanerService from "../../services/CleanerService";
import "../../css/userProfile.css";

export default function UserProfile({ logout }) {
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
        }).catch(error => logout(true));
      } else if (role === "cleaner") {
        CleanerService.getUserByMail().then((res) => {
          console.log(res.data);
          setUser(res.data);
        }).catch(error => logout(true));
      }
    }
    getUserByMail();
  }, [role, logout]);

  return (
    <div className="container">
      <div className="card bg-dark text-white text-left p-3 w-50">
        <div className="header">Profile</div>
        <div className="card-body">
          <h5 className="card-title">Name : {user.name}</h5>
          <br />
          <h5 className="card-title">Address : {user.address}</h5>
          <br />
          <h5 className="card-title">Email : {email}</h5>
          <br />
          <h5 className="card-title">User type : {role}</h5>
          <br />
        </div>
      </div>
    </div>
  );
}
