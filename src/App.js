import "./css/Layout.css";
import TokenService from "./services/TokenService";
import { useEffect, useState } from "react/cjs/react.development";
import jwt from "jwt-decode";
import { useHistory } from "react-router-dom";
import { Switch, Route, Link } from "react-router-dom";
import Bookings from "./components/booking/Bookings";
import NewBooking from "./components/booking/NewBooking";
import Login from "./components/login/Login";
import Layout from "./components/Layout";
import UserNav from "./components/Pages/userNav";
import RegisterForm from "./components/register/RegisterForm";
import CustomerBilling from "./components/Pages/adminPage/customerBillingTab/CustomerBilling";
import UserProfile from "./components/register/UserProfile";
import GDPR from "./components/register/GDPR";
import CookieConsent from "react-cookie-consent";

export default function App() {
  const history = useHistory();

  const [activeUser, setActiveUser] = useState();

  const userRoutes = new Map([
    [
      "admin",
      [
        { name: "Bookings", path: "/admin/bookings" },
        { name: "New Booking", path: "/admin/newbooking" },
        { name: "Register User", path: "/admin/register" },
        { name: "Bill Customers", path: "/admin/customerBilling" },
      ],
    ],
    [
      "customer",
      [
        { name: "Bookings", path: "/customer/bookings" },
        { name: "New Booking", path: "/customer/newbooking" },
        { name: "Profile", path: "/customer" },
      ],
    ],
    [
      "cleaner",
      [
        { name: "Bookings", path: "/cleaner/bookings" },
        { name: "Profile", path: "/cleaner" },
      ],
    ],
  ]);

  useEffect(() => {
    const role = TokenService.getRoleFromToken();
    if (role !== undefined) {
      setActiveUser({ type: role });
    } else {
      history.push("/login");
    }
  }, []);

  useEffect(() => {
    if (activeUser !== undefined) {
      history.push("/" + activeUser.type + "/bookings");
    }
  }, [activeUser]);

  function handleUserChange(userData) {
    const token = userData.jwt;
    localStorage.setItem("access_token", token);
    const decodedToken = jwt(token);
    setActiveUser({ type: decodedToken.roles[0] });
  }

  function logout(error) {
      if(error){
        window.alert("You have been logged out, please log in again.")
      }
    setActiveUser();
    localStorage.removeItem("access_token");
    history.push("/login");
  }
  return (
    <Layout>
      <CookieConsent
        debug={true}
        location="top"
        buttonStyle={{ fontWeight: "bold" }}
      >
        This site does not save cookies. See our{" "}
        <Link to={"/gdpr"}>Privacy Policy(GDPR)</Link> for more.{" "}
      </CookieConsent>
      {activeUser && (
        <UserNav routes={userRoutes.get(activeUser.type)} logout={logout} />
      )}
      <Switch>
        <Route path="/login">
          <Login handleUserChange={handleUserChange} />
        </Route>
        <Route path={["/register", "/admin/register"]}>
          <RegisterForm role={activeUser && activeUser.type} />
        </Route>
        <Route path={["/admin/bookings", "/customer/bookings", "/cleaner/bookings"]}>
          <Bookings logout={logout} />
        </Route>
        <Route path={["/admin/newbooking", "/customer/newbooking"]}>
          <NewBooking logout={logout} />
        </Route>
        <Route path="/admin/customerBilling">
          <CustomerBilling logout={logout} />
        </Route>
        <Route path={["/cleaner", "/customer"]}>
          <UserProfile logout={logout} />
        </Route>
        <Route path="/gdpr">
          <GDPR />
        </Route>
      </Switch>
    </Layout>
  );
}
