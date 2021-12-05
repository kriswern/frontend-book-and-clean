import { useState } from "react";
import MyBookings from "./MyBookings";
import ConfirmedBookings from "./ConfirmedBookings";
import UserNav from "../userNav";
import "../../../css/userPage.css";
import "../../../css/userNav.css";
import UnconfirmedBookings from "./UnconfirmedBookings";
export default function CleanerPage () {

    const tabsRoute = new Map([ // add new tabs here 
        ["Bookings",MyBookings],
        ["Confirmed Bookings",ConfirmedBookings],
        ["Unconfirmed bookings", UnconfirmedBookings]
    ]);
 
    const [navOpen, setNavOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(MyBookings); 

    function openOrCloseNav(){
        (navOpen === false) ? setNavOpen(true) : setNavOpen(false);
        
    }
    function changeTab (tab){
        (tabsRoute.has(tab)) ? setActiveTab(tabsRoute.get(tab)) : setActiveTab(MyBookings); // all bookings are default
   }
    return(
        <div className = "pageWrapper">
        <UserNav
        navOpen = {navOpen}
        openOrCloseNav = {openOrCloseNav}
        changeTab = {changeTab}
        tabsRoute = {tabsRoute}
        />
        <div className = "activeTabWindow">
         {activeTab}
        </div>
    </div>
    )
}