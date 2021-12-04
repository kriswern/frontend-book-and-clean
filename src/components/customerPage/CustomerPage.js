import { useState } from "react";
import "../../css/customerPage.css";
import CustomerPageNav from "./CustomerPageNav";
import AllBookings from "./AllBookingsTab"
import AddBookingTab from "./AddBookingTab";

export default function CustomerPage (){

    const tabsRoute = new Map([
        ["ALL_BOOKINGS",AllBookings],
        ["ADD_BOOKING",AddBookingTab],
    ]);
 
    const [navOpen, setNavOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(AllBookings);

    function openOrCloseNav(){
        (navOpen === false) ? setNavOpen(true) : setNavOpen(false);
        
    }
    function changeTab (tab){
        (tabsRoute.has(tab)) ? setActiveTab(tabsRoute.get(tab)) : setActiveTab(AllBookings); // all bookings are default
   }
   
    return(
    <div className = "pageWrapper">
        <CustomerPageNav
        navOpen = {navOpen}
        openOrCloseNav = {openOrCloseNav}
        changeTab = {changeTab}
        />
        <div className = "activeTabWindow">
         {activeTab}
        </div>
    </div>


    )
}
