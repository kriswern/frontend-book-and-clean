import { useState } from "react";
import "../../../css/userPage.css";
import CustomerPageNav from "../userNav";
import AllBookings from "./AllBookingsTab"
import AddBookingTab from "./AddBookingTab";

export default function CustomerPage (){

    const tabsRoute = new Map([ // add new tabs here 
        ["all Bookings",AllBookings],
        ["add Booking",AddBookingTab],
    ]);
   
   
    const [navOpen, setNavOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(AllBookings);

    function openOrCloseNav(){
        (navOpen === false) ? setNavOpen(true) : setNavOpen(false);
        
    }
    function changeTab (tab){
        console.log(tab);
        (tabsRoute.has(tab)) ? setActiveTab(tabsRoute.get(tab)) : setActiveTab(AllBookings); // all bookings are default
   }
   
    return(
    <div className = "pageWrapper">
        <CustomerPageNav
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
